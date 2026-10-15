import type { Coach, Match, Player } from '@workspace/api-client-react';
import { formatDay, formatTime, zoneLabel, EASTERN } from './match-time';

const SYSTEM_COACH_IDS = ['unassigned', 'not-coaching'];
const DAY = 86_400_000;

export type Tally = { name: string; coached: number; virtual: number };
export type MatchLine = { when: string; player: string; opponent: string; virtual: boolean };
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
      byPlayer: [] as Tally[], byCoach: [] as Tally[], sheets: [] as CoachSheet[], unassigned: 0, notPlayed: 0,
    };
    if (!finished) {
      events.push({ ...base, finished: false, opensOn: opensAt !== null ? formatDay(new Date(opensAt).toISOString(), 'UTC') : null });
      continue;
    }

    const byPlayer = new Map<string, Tally>();
    const byCoach = new Map<string, Tally>();
    const sheets = new Map<string, { name: string; rows: Array<MatchLine & { at: number }> }>();
    let unassigned = 0;
    let notPlayed = 0;
    for (const match of group) {
      if (match.status !== 'completed') { notPlayed += 1; continue; }
      if (match.coachId === 'unassigned') { unassigned += 1; continue; }
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
      const sheet = sheets.get(match.coachId) ?? { name: coachName.get(match.coachId) ?? 'Unknown coach', rows: [] };
      sheet.rows.push({
        at: Date.parse(match.startsAt),
        when: `${formatDay(match.startsAt, EASTERN)} ${formatTime(match.startsAt, EASTERN)} ${zoneLabel(match.startsAt, EASTERN)}`,
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
      unassigned,
      notPlayed,
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

export function describeLine(line: MatchLine): string {
  return `${line.when}  ${line.player} vs ${line.opponent || 'opponent TBD'} (${line.virtual ? 'virtual' : 'in person'})`;
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
      ...sheet.matches.map((line) => `    ${describeLine(line)}`),
    ]),
    ...(event.unassigned ? [`  ${event.unassigned} played ${event.unassigned === 1 ? 'match has' : 'matches have'} no coach decision`] : []),
    ...(event.notPlayed ? [`  ${event.notPlayed} ${event.notPlayed === 1 ? 'match was' : 'matches were'} not played and not counted`] : []),
  ].join('\n')).join('\n\n');
}
