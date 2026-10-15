import type { Coach, Match, Player } from '@workspace/api-client-react';
import { formatDay, formatInputDate, formatTime, zoneLabel, EASTERN } from './match-time';

const SYSTEM_COACH_IDS = ['unassigned', 'not-coaching'];
const DAY = 86_400_000;

export type Tally = { name: string; coached: number; virtual: number };
export type MatchLine = { when: string; startsAt: string; venue: string; player: string; opponent: string; virtual: boolean };
export type VenueSummary = { venue: string; total: number; byCoach: Tally[]; byPlayer: Tally[] };
export type CoachSheet = { name: string; coached: number; virtual: number; matches: MatchLine[] };
export type TournamentInfo = { id: string; name: string; endsOn: string | null };
export type EventSummary = {
  key: string;
  title: string;
  /** False while the tournament is still going: no numbers are shown or counted. */
  finished: boolean;
  /** For a tournament still going, the day its summary opens, e.g. "Mon 19 Oct". */
  opensOn: string | null;
  byPlayer: Tally[];
  byCoach: Tally[];
  sheets: CoachSheet[];
  /** Played matches with a coach, all coaches together. */
  total: number;
  /** First and last match of the tournament, ISO. */
  firstAt: string;
  lastAt: string;
  /** Each venue of a tournament played at more than one place, with its own totals. */
  venues: VenueSummary[];
  /** Played matches nobody decided a coach for, so someone can fix them. */
  unassignedLines: MatchLine[];
  /** Played matches nobody decided a coach for. */
  unassigned: number;
  /** Matches that never got played (withdrawn, defaulted). Not counted. */
  notPlayed: number;
};

const blank = (name: string): Tally => ({ name, coached: 0, virtual: 0 });

/** The summary opens at noon UTC the day after the tournament's last day: Monday morning for a Sunday finish. */
const opensAtFor = (endsOn: string | null) => {
  if (!endsOn) return null;
  const end = Date.parse(`${endsOn}T00:00:00Z`);
  return Number.isNaN(end) ? null : end + DAY + 12 * 3_600_000;
};

/**
 * One summary per tournament, and only once it is over. While a tournament is still going it appears as a
 * single line with no counts, so nothing is totalled before it happens. Once it is over only matches that
 * were played count: Virtual is the subset watched remotely.
 */
export function summarizeCoaching(
  matches: Match[],
  players: Player[],
  coaches: Coach[],
  tournaments: TournamentInfo[] = [],
  now: Date = new Date(),
): EventSummary[] {
  const playerName = new Map(players.map((player) => [player.id, player.name]));
  const coachName = new Map(coaches.map((coach) => [coach.id, coach.name]));
  const tournamentById = new Map(tournaments.map((tournament) => [tournament.id, tournament]));

  const groups = new Map<string, Match[]>();
  for (const match of matches) {
    const tournamentId = match.externalId?.split(':')[0] || null;
    const key = tournamentId ? `t:${tournamentId}` : `v:${match.venue}`;
    groups.set(key, [...(groups.get(key) ?? []), match]);
  }

  const events: Array<EventSummary & { first: number }> = [];
  for (const [key, group] of groups) {
    const tournament = key.startsWith('t:') ? tournamentById.get(key.slice(2)) : undefined;
    const first = Math.min(...group.map((match) => Date.parse(match.startsAt)));
    const last = Math.max(...group.map((match) => Date.parse(match.startsAt)));
    const opensAt = opensAtFor(tournament?.endsOn ?? null);
    // Without an end date, fall back to what the matches say: all played, or the last one is a day old.
    const finished = opensAt !== null
      ? now.getTime() >= opensAt
      : group.every((match) => match.status === 'completed') || now.getTime() >= last + DAY;
    const base = {
      key,
      title: tournament?.name ?? group[0].venue,
      first,
      byPlayer: [] as Tally[], byCoach: [] as Tally[], sheets: [] as CoachSheet[], venues: [] as VenueSummary[], unassignedLines: [] as MatchLine[], unassigned: 0, notPlayed: 0, total: 0,
      firstAt: new Date(first).toISOString(), lastAt: new Date(last).toISOString(),
    };
    if (!finished) {
      events.push({ ...base, finished: false, opensOn: opensAt !== null ? formatDay(new Date(opensAt).toISOString(), 'UTC') : null });
      continue;
    }

    const byPlayer = new Map<string, Tally>();
    const byCoach = new Map<string, Tally>();
    const sheets = new Map<string, { name: string; rows: Array<MatchLine & { at: number }> }>();
    const unassignedLines: MatchLine[] = [];
    const venueMaps = new Map<string, { byCoach: Map<string, Tally>; byPlayer: Map<string, Tally> }>();
    let notPlayed = 0;
    for (const match of group) {
      if (match.status !== 'completed') { notPlayed += 1; continue; }
      const lineFor = (virtual: boolean): MatchLine => ({
        when: `${formatDay(match.startsAt, EASTERN)} ${formatTime(match.startsAt, EASTERN)} ${zoneLabel(match.startsAt, EASTERN)}`,
        startsAt: new Date(match.startsAt).toISOString(),
        venue: match.venue,
        player: playerName.get(match.playerId) ?? 'Unknown player',
        opponent: match.opponent,
        virtual,
      });
      if (match.coachId === 'unassigned') { unassignedLines.push(lineFor(false)); continue; }
      if (SYSTEM_COACH_IDS.includes(match.coachId)) continue;
      const virtual = match.coachMode === 'virtual';
      const add = (map: Map<string, Tally>, id: string, name: string) => {
        const tally = map.get(id) ?? blank(name);
        tally.coached += 1;
        if (virtual) tally.virtual += 1;
        map.set(id, tally);
      };
      add(byPlayer, match.playerId, playerName.get(match.playerId) ?? 'Unknown player');
      add(byCoach, match.coachId, coachName.get(match.coachId) ?? 'Unknown coach');
      const venueMap = venueMaps.get(match.venue) ?? { byCoach: new Map<string, Tally>(), byPlayer: new Map<string, Tally>() };
      venueMaps.set(match.venue, venueMap);
      const addVenue = (map: Map<string, Tally>, id: string, name: string) => {
        const tally = map.get(id) ?? blank(name);
        tally.coached += 1;
        if (virtual) tally.virtual += 1;
        map.set(id, tally);
      };
      addVenue(venueMap.byPlayer, match.playerId, playerName.get(match.playerId) ?? 'Unknown player');
      addVenue(venueMap.byCoach, match.coachId, coachName.get(match.coachId) ?? 'Unknown coach');
      const sheet = sheets.get(match.coachId) ?? { name: coachName.get(match.coachId) ?? 'Unknown coach', rows: [] };
      sheet.rows.push({
        at: Date.parse(match.startsAt),
        when: `${formatDay(match.startsAt, EASTERN)} ${formatTime(match.startsAt, EASTERN)} ${zoneLabel(match.startsAt, EASTERN)}`,
        startsAt: new Date(match.startsAt).toISOString(),
        venue: match.venue,
        player: playerName.get(match.playerId) ?? 'Unknown player',
        opponent: match.opponent,
        virtual,
      });
      sheets.set(match.coachId, sheet);
    }
    const order = (a: Tally, b: Tally) => b.coached - a.coached || a.name.localeCompare(b.name);
    events.push({
      ...base,
      finished: true,
      opensOn: null,
      byPlayer: [...byPlayer.values()].sort(order),
      byCoach: [...byCoach.values()].sort(order),
      sheets: [...sheets.values()]
        .map((sheet) => {
          const lines = sheet.rows.sort((a, b) => a.at - b.at).map(({ at: _at, ...line }) => line);
          return { name: sheet.name, coached: lines.length, virtual: lines.filter((line) => line.virtual).length, matches: lines };
        })
        .sort((a, b) => b.coached - a.coached || a.name.localeCompare(b.name)),
      venues: venueMaps.size > 1
        ? [...venueMaps.entries()].map(([venue, maps]) => {
            const byCoachRows = [...maps.byCoach.values()].sort(order);
            return { venue, total: byCoachRows.reduce((sum, tally) => sum + tally.coached, 0), byCoach: byCoachRows, byPlayer: [...maps.byPlayer.values()].sort(order) };
          }).sort((a, b) => a.venue.localeCompare(b.venue))
        : [],
      unassignedLines: unassignedLines.sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
      unassigned: unassignedLines.length,
      notPlayed,
      total: [...byCoach.values()].reduce((sum, tally) => sum + tally.coached, 0),
    });
  }
  // Finished tournaments first, newest on top; ones still going after them.
  return events
    .sort((a, b) => Number(b.finished) - Number(a.finished) || (a.finished ? b.first - a.first : a.first - b.first))
    .map(({ first: _first, ...event }) => event);
}

const times = (count: number) => (count === 1 ? 'once' : `${count} times`);

export function describeTally(tally: Tally): string {
  const parts = [`coached ${times(tally.coached)}`];
  if (tally.virtual) parts.push(`${tally.virtual} virtually`);
  return `${tally.name}: ${parts.join(', ')}`;
}

export function describeLine(line: MatchLine, showVenue = false): string {
  return `${line.when}  ${line.player} vs ${line.opponent || 'opponent TBD'} (${line.virtual ? 'virtual' : 'in person'})${showVenue ? `, ${line.venue}` : ''}`;
}

export const stillGoingText = (event: EventSummary) =>
  `${event.title}: still going. The summary opens ${event.opensOn ? `${event.opensOn}, the morning after the last day` : 'once the tournament is over'}.`;

/** Plain text for pasting into an email. Tournaments still going are left out. */
export function summaryText(events: EventSummary[]): string {
  return events.filter((event) => event.finished).map((event) => [
    event.title,
    'By player',
    ...event.byPlayer.map((tally) => `  ${describeTally(tally)}`),
    'By coach',
    ...event.byCoach.map((tally) => `  ${describeTally(tally)}`),
    '',
    'Matches coached, by coach',
    ...event.sheets.flatMap((sheet) => [
      `  ${sheet.name}: ${sheet.coached} ${sheet.coached === 1 ? 'match' : 'matches'}${sheet.virtual ? `, ${sheet.virtual} virtual` : ''}`,
      ...sheet.matches.map((line) => `    ${describeLine(line, event.venues.length > 1)}`),
    ]),
    ...(event.venues.length ? ['', 'By venue', ...event.venues.flatMap((venue) => [`  ${venue.venue}: ${venue.total} ${venue.total === 1 ? 'match' : 'matches'}`, ...venue.byCoach.map((tally) => `    ${describeTally(tally)}`)])] : []),
    ...(event.unassigned ? ['', `  ${event.unassigned} played ${event.unassigned === 1 ? 'match has' : 'matches have'} no coach decision:`, ...event.unassignedLines.map((line) => `    ${describeLine(line, true)}`)] : []),
    ...(event.notPlayed ? [`  ${event.notPlayed} ${event.notPlayed === 1 ? 'match was' : 'matches were'} not played and not counted`] : []),
  ].join('\n')).join('\n\n');
}


/**
 * Put the permanent record together with the live board: matches the board still has come first, and
 * played matches only the record remembers (a removed kid, an old tournament) are added behind them, with
 * their names and tournament, so a summary never loses history.
 */
export function withArchive(
  matches: Match[],
  players: Player[],
  coaches: Coach[],
  tournaments: TournamentInfo[],
  rows: ArchiveRow[],
): { matches: Match[]; players: Player[]; coaches: Coach[]; tournaments: TournamentInfo[] } {
  const liveKeys = new Set(matches.map((match) => match.externalId ?? `local:${match.id}`));
  const playerIds = new Set(players.map((player) => player.id));
  const coachIds = new Set(coaches.map((coach) => coach.id));
  const tournamentIds = new Set(tournaments.map((tournament) => tournament.id));
  const extraMatches: Match[] = [];
  const extraPlayers: Player[] = [];
  const extraCoaches: Coach[] = [];
  const extraTournaments: TournamentInfo[] = [];
  for (const row of rows) {
    if (!playerIds.has(row.playerId)) { playerIds.add(row.playerId); extraPlayers.push({ id: row.playerId, name: row.playerName } as Player); }
    if (!coachIds.has(row.coachId)) { coachIds.add(row.coachId); extraCoaches.push({ id: row.coachId, name: row.coachName } as Coach); }
    if (row.tournamentId && !tournamentIds.has(row.tournamentId)) {
      tournamentIds.add(row.tournamentId);
      extraTournaments.push({ id: row.tournamentId, name: row.tournamentName, endsOn: row.tournamentEndsOn });
    }
    if (liveKeys.has(row.matchKey)) continue;
    extraMatches.push({
      id: row.matchKey,
      externalId: row.matchKey.startsWith('local:') ? null : row.matchKey,
      playerId: row.playerId,
      opponent: row.opponentName,
      startsAt: row.startsAt,
      endsAt: row.startsAt,
      venue: row.venue,
      court: '',
      coachId: row.coachId,
      status: 'completed',
      ...(row.timeZone ? { timeZone: row.timeZone } : {}),
      ...(row.coachMode === 'virtual' ? { coachMode: 'virtual' as const } : {}),
    } as Match);
  }
  return {
    matches: [...matches, ...extraMatches],
    players: [...players, ...extraPlayers],
    coaches: [...coaches, ...extraCoaches],
    tournaments: [...tournaments, ...extraTournaments],
  };
}

/** A row of the permanent coaching record, as the server sends it. */
export type ArchiveRow = {
  matchKey: string; tournamentId: string | null; tournamentName: string; tournamentEndsOn: string | null; venue: string;
  timeZone: string | null; startsAt: string; playerId: string; playerName: string; opponentName: string; opponentId: string | null;
  coachId: string; coachName: string; coachMode: string | null;
};

export type ReportLine = { tournament: string; venue: string; startsAt: string; day: string; player: string; opponent: string; coach: string; virtual: boolean };

/** Every counted match of the finished tournaments, flattened for ranges, totals and the spreadsheet. */
export function reportLines(events: EventSummary[]): ReportLine[] {
  return events.filter((event) => event.finished).flatMap((event) => event.sheets.flatMap((sheet) => sheet.matches.map((line) => ({
    tournament: event.title,
    venue: line.venue,
    startsAt: line.startsAt,
    day: formatInputDate(line.startsAt, EASTERN).slice(0, 10),
    player: line.player,
    opponent: line.opponent,
    coach: sheet.name,
    virtual: line.virtual,
  })))).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Keep the lines whose match day falls in the range (inclusive). Empty bounds are open. */
export const linesInRange = (lines: ReportLine[], from: string, to: string) =>
  lines.filter((line) => (!from || line.day >= from) && (!to || line.day <= to));

export function totalsBy(lines: ReportLine[], key: 'coach' | 'player'): Tally[] {
  const map = new Map<string, Tally>();
  for (const line of lines) {
    const tally = map.get(line[key]) ?? blank(line[key]);
    tally.coached += 1;
    if (line.virtual) tally.virtual += 1;
    map.set(line[key], tally);
  }
  return [...map.values()].sort((a, b) => b.coached - a.coached || a.name.localeCompare(b.name));
}

const csvCell = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

/** One row per match, for Karen's spreadsheet or accounting software. Times are Eastern. */
export function reportCsv(lines: ReportLine[]): string {
  const header = ['Tournament', 'Venue', 'Date', 'Time (ET)', 'Player', 'Opponent', 'Coach', 'Coaching'];
  const rows = lines.map((line) => [
    line.tournament, line.venue, line.day, formatTime(line.startsAt, EASTERN), line.player, line.opponent, line.coach, line.virtual ? 'virtual' : 'in person',
  ]);
  return [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
}

export function reportText(lines: ReportLine[], from: string, to: string): string {
  const range = from || to ? `${from || 'start'} to ${to || 'today'}` : 'all tournaments';
  const part = (title: string, rows: Tally[]) => [title, ...rows.map((tally) => `  ${describeTally(tally)}`)];
  return [`Coaching report, ${range}: ${lines.length} ${lines.length === 1 ? 'match' : 'matches'}`, ...part('By coach', totalsBy(lines, 'coach')), ...part('By player', totalsBy(lines, 'player'))].join('\n');
}
