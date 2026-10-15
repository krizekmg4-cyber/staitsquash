import type { ClubLockerFeed, ClubLockerMatch } from "./club-locker.js";

// Club Locker's public website reads tournament data from these endpoints.
// They are undocumented, so every field below is read defensively.
const CLUB_LOCKER_API = "https://api.ussquash.com/resources";

// Club Locker publishes start times only. Tournaments slot matches roughly
// 35-45 minutes apart, so a match is assumed to last this long unless the
// player's next match starts sooner.
const ASSUMED_MATCH_MINUTES = 45;

export type DrawMatch = {
  ResultID?: unknown;
  Status?: unknown;
  SinglesDoubles?: unknown;
  hplayer1?: unknown;
  vplayer1?: unknown;
  wid1?: unknown;
  oid1?: unknown;
  matchdate?: unknown;
  StartTime?: unknown;
  CourtNumber?: unknown;
  courtName?: unknown;
  winner?: unknown;
  Score?: unknown;
};

export type TournamentDraws = {
  tournamentId: string;
  venueName: string;
  // "PEN=University of Pennsylvania, VAR=SCH(Vare)" style court-prefix map
  // used by multi-venue tournaments.
  venueCodes: string | null;
  matches: DrawMatch[];
  // Where the tournament is played, so match times are read in the right zone.
  timeZone?: string;
  info?: TournamentInfo;
};

export type TournamentInfo = {
  name: string;
  dates: string | null;
  city: string | null;
  timeZone: string;
  /** "2026-10-04": the last day of the event, used to tuck old events away. */
  endsOn: string | null;
};

export type TournamentCheck = {
  state: "ready" | "no-draw" | "no-players" | "error";
  message: string;
  playersFound: number;
  matches: number;
};

type RosterMatch = ClubLockerMatch & { playerName: string };

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const memberId = (value: unknown): string =>
  typeof value === "number" && value > 0
    ? String(value)
    : typeof value === "string" && /^\d+$/.test(value.trim())
      ? value.trim()
      : "";

/** "Chen, Casper " -> "Casper Chen" */
export function displayName(lastFirst: string): string {
  const [last, first] = lastFirst.split(",").map((part) => part.trim());
  return first ? `${first} ${last}` : last;
}

export function parseVenueCodes(value: string | null): Map<string, string> {
  const codes = new Map<string, string>();
  for (const entry of (value ?? "").split(",")) {
    const [code, name] = entry.split("=").map((part) => part.trim());
    if (code && name) codes.set(code.toUpperCase(), name);
  }
  return codes;
}

/** "VAR1" -> SCH(Vare), Court 1; "4" -> main venue, Court 4. */
export function courtAndVenue(
  match: DrawMatch,
  venueName: string,
  venueCodes: Map<string, string>,
): { venue: string; court: string } {
  const named = text(match.courtName);
  const code = text(match.CourtNumber);
  const prefixed = /^([A-Za-z]+)\s*(\d+)$/.exec(code);
  if (prefixed) {
    const venue = venueCodes.get(prefixed[1].toUpperCase());
    if (venue) return { venue, court: named || `Court ${prefixed[2]}` };
  }
  if (named) return { venue: venueName, court: named };
  if (/^\d+$/.test(code)) return { venue: venueName, court: `Court ${code}` };
  return { venue: venueName, court: code || "Court TBA" };
}

function timeZoneOffsetMinutes(utcMillis: number, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(utcMillis))
      .map((part) => [part.type, part.value]),
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return Math.round((asUtc - utcMillis) / 60_000);
}

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Club Locker gives "09/26/2026" and "11:30 AM" with no timezone. The tracker
 * requires an explicit offset, so resolve the wall-clock time in the
 * tournament's timezone: "2026-09-26T11:30:00-04:00".
 */
export function localStartToIso(
  matchDate: string,
  startTime: string,
  timeZone: string,
): string | null {
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(matchDate.trim());
  const time = /^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/.exec(startTime.trim());
  if (!date || !time) return null;

  const [month, day, year] = [Number(date[1]), Number(date[2]), Number(date[3])];
  let hour = Number(time[1]) % 12;
  if (time[3].toUpperCase() === "PM") hour += 12;
  const minute = Number(time[2]);

  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  let offset = timeZoneOffsetMinutes(wallClock, timeZone);
  offset = timeZoneOffsetMinutes(wallClock - offset * 60_000, timeZone);

  const sign = offset < 0 ? "-" : "+";
  const absolute = Math.abs(offset);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
}

/**
 * Club Locker scores are written winner-first ("11-2,11-5,11-5"). Turn them
 * into the tracked player's view: "Won 3–0 (11-2, 11-5, 11-5)".
 */
export function resultFor(
  match: DrawMatch,
  side: "H" | "V",
): string | null {
  const status = text(match.Status).toUpperCase();
  const winner = text(match.winner).toUpperCase();
  if (winner !== "H" && winner !== "V") return null;
  const won = winner === side;

  if (status === "DF") return won ? "Won by default" : "Lost by default";

  const games = text(match.Score)
    .split(",")
    .map((game) => /^(\d+)-(\d+)$/.exec(game.trim()))
    .filter((game): game is RegExpExecArray => game !== null)
    .map((game) => (won ? [game[1], game[2]] : [game[2], game[1]]));
  // A game counts once someone reaches 9+ with a two-point lead, so the
  // unfinished game of a retirement is shown but not counted.
  const finished = games
    .map(([a, b]) => [Number(a), Number(b)])
    .filter(([a, b]) => Math.max(a, b) >= 9 && Math.abs(a - b) >= 2);
  const ours = finished.filter(([a, b]) => a > b).length;
  const theirs = finished.length - ours;
  const score = games.length
    ? ` ${ours}–${theirs} (${games.map(([a, b]) => `${a}-${b}`).join(", ")})`
    : "";
  const retired = status === "RE" ? (won ? ", opponent retired" : ", retired") : "";
  return `${won ? "Won" : "Lost"}${score}${retired}`;
}

/**
 * Turn Club Locker tournament draws into the tracker's schedule feed, keeping
 * only singles matches for players on the roster that have a start time.
 */
export function drawsToFeed(
  tournaments: TournamentDraws[],
  rosterIds: ReadonlySet<string>,
  timeZone: string,
): ClubLockerFeed {
  const found: RosterMatch[] = [];

  for (const tournament of tournaments) {
    const venueCodes = parseVenueCodes(tournament.venueCodes);
    for (const match of tournament.matches) {
      if (text(match.SinglesDoubles).toLowerCase() === "d") continue;
      const resultId = memberId(match.ResultID) || text(match.ResultID);
      if (!resultId) continue;
      const startsAt = localStartToIso(
        text(match.matchdate),
        text(match.StartTime),
        tournament.timeZone ?? timeZone,
      );
      if (!startsAt) continue;

      const sides = [
        { side: "H" as const, id: memberId(match.wid1), name: text(match.hplayer1), other: text(match.vplayer1), otherId: memberId(match.oid1) },
        { side: "V" as const, id: memberId(match.oid1), name: text(match.vplayer1), other: text(match.hplayer1), otherId: memberId(match.wid1) },
      ];
      const completed = text(match.Status).toUpperCase() !== "S";
      const { venue, court } = courtAndVenue(match, tournament.venueName, venueCodes);

      for (const { side, id, name, other, otherId } of sides) {
        if (!id || !name || !rosterIds.has(id)) continue;
        if (completed && !other) continue;
        found.push({
          externalId: `${tournament.tournamentId}:${resultId}:${id}`,
          playerId: id,
          playerName: displayName(name),
          opponent: other ? displayName(other) : "To be decided",
          startsAt,
          endsAt: startsAt,
          venue,
          court,
          status: completed ? "completed" : "upcoming",
          result: completed ? resultFor(match, side) : null,
          ...(otherId && rosterIds.has(otherId) ? { teammates: true } : {}),
        });
      }
    }
  }

  // Estimate finish times without letting a player's matches overlap, which
  // the tracker rejects. Same-start duplicates are dropped for the same reason.
  const byPlayer = new Map<string, RosterMatch[]>();
  for (const match of found) {
    byPlayer.set(match.playerId, [...(byPlayer.get(match.playerId) ?? []), match]);
  }
  const matches: ClubLockerMatch[] = [];
  for (const playerMatches of byPlayer.values()) {
    playerMatches.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
    const kept = playerMatches.filter(
      (match, index) =>
        index === 0 ||
        Date.parse(match.startsAt) > Date.parse(playerMatches[index - 1].startsAt),
    );
    kept.forEach((match, index) => {
      const start = Date.parse(match.startsAt);
      const next = kept[index + 1];
      const end = Math.min(
        start + ASSUMED_MATCH_MINUTES * 60_000,
        next ? Date.parse(next.startsAt) : Infinity,
      );
      matches.push({ ...match, endsAt: new Date(end).toISOString() });
    });
  }

  const players = [...new Map(found.map((match) => [match.playerId, match.playerName]))]
    .map(([id, name]) => ({ id, name }));
  return { matches, players };
}

export type ClubLockerDrawsConfig = {
  tournamentIds: string[];
  rosterIds: ReadonlySet<string>;
  timeZone: string;
  /** Per-tournament zone overrides, keyed by tournament number. */
  timeZones?: Record<string, string>;
};

/** Read tournament IDs, roster and timezone from the environment. */
export function drawsConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): ClubLockerDrawsConfig | null {
  const list = (value: string | undefined) =>
    (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  const tournamentIds = list(env["CLUB_LOCKER_TOURNAMENT_IDS"]);
  if (tournamentIds.length === 0) return null;
  return {
    tournamentIds,
    rosterIds: new Set(list(env["CLUB_LOCKER_PLAYER_IDS"])),
    timeZone: env["CLUB_LOCKER_TIMEZONE"]?.trim() || "America/New_York",
  };
}

async function getJson(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${CLUB_LOCKER_API}/${path}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Club Locker returned HTTP ${response.status} for ${path}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10-03T00:00:00" and "2026-10-04T00:00:00" -> "Oct 3-4". */
export function formatTournamentDates(start: unknown, end: unknown): string | null {
  const parse = (value: unknown) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text(value));
    return match ? { month: Number(match[2]) - 1, day: Number(match[3]) } : null;
  };
  const from = parse(start);
  const to = parse(end) ?? from;
  if (!from || !to) return null;
  if (from.month === to.month && from.day === to.day) return `${MONTHS[from.month]} ${from.day}`;
  if (from.month === to.month) return `${MONTHS[from.month]} ${from.day}-${to.day}`;
  return `${MONTHS[from.month]} ${from.day} - ${MONTHS[to.month]} ${to.day}`;
}

/**
 * Club Locker gives a venue's coordinates but no time zone. Longitude bands
 * are right for almost every US club and staff can change the zone by hand.
 */
export function timeZoneFromCoordinates(lat: number, lng: number): string | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < 18 || lat > 72 || lng > -66 || lng < -170) return null;
  if (lng >= -85) return "America/New_York";
  if (lng >= -102) return "America/Chicago";
  if (lat > 31 && lat < 37 && lng >= -115 && lng < -109) return "America/Phoenix";
  if (lng >= -115) return "America/Denver";
  return "America/Los_Angeles";
}

export async function loadTournamentDraws(
  tournamentId: string,
  fetchJson: (path: string) => Promise<unknown>,
  fallbackTimeZone = "America/New_York",
  overrideTimeZone?: string,
): Promise<TournamentDraws & { info: TournamentInfo }> {
  const id = encodeURIComponent(tournamentId);
  let tournament: {
    Tournament_Id?: unknown;
    Tournament_Name?: unknown;
    Checks_To?: unknown;
    Start_Date?: unknown;
    End_Date?: unknown;
    Site_City?: unknown;
    venues?: Array<{ ClubId?: unknown; IsMain?: unknown }>;
  };
  try {
    tournament = (await fetchJson(`tournaments/${id}`)) as typeof tournament;
  } catch {
    throw new Error(`Club Locker has no tournament numbered ${tournamentId}. Check the number or link.`);
  }
  if (!tournament || (!memberId(tournament.Tournament_Id) && !text(tournament.Tournament_Name))) {
    throw new Error(`Club Locker has no tournament numbered ${tournamentId}. Check the number or link.`);
  }

  const tournamentName = text(tournament.Tournament_Name) || `Tournament ${tournamentId}`;
  let venueName = tournamentName;
  let city = text(tournament.Site_City) || null;
  let detectedZone: string | null = null;
  const mainClub =
    tournament.venues?.find((venue) => venue.IsMain) ?? tournament.venues?.[0];
  const clubId = memberId(mainClub?.ClubId);
  if (clubId) {
    try {
      const club = (await fetchJson(`res/clubs/${clubId}`)) as {
        name?: unknown;
        City?: unknown;
        lat?: unknown;
        lng?: unknown;
      };
      venueName = text(club.name) || venueName;
      city = city ?? (text(club.City) || null);
      detectedZone = timeZoneFromCoordinates(Number(club.lat), Number(club.lng));
    } catch {
      // The tournament name is a reasonable venue label if the club lookup fails.
    }
  }
  const timeZone = overrideTimeZone || detectedZone || fallbackTimeZone;

  const divisions = await fetchJson(`tournaments/${id}/divisionsandsections`);
  if (!Array.isArray(divisions)) {
    throw new Error(`Club Locker tournament ${tournamentId} has no division list`);
  }
  const divisionIds = [
    ...new Set(divisions.map((division) => memberId(division?.divisionId)).filter(Boolean)),
  ];
  const sections = await Promise.all(
    divisionIds.map((divisionId) => fetchJson(`tournaments/${id}/division/${divisionId}/draws`)),
  );
  const matches = sections.flatMap((draw) =>
    Array.isArray(draw)
      ? draw.flatMap((section) =>
          Array.isArray(section?.matches) ? (section.matches as DrawMatch[]) : [],
        )
      : [],
  );

  return {
    tournamentId,
    venueName,
    venueCodes: text(tournament.Checks_To) || null,
    matches,
    timeZone,
    info: {
      name: tournamentName,
      dates: formatTournamentDates(tournament.Start_Date, tournament.End_Date),
      city,
      timeZone,
      endsOn: /^\d{4}-\d{2}-\d{2}/.exec(text(tournament.End_Date))?.[0] ?? null,
    },
  };
}

/** What Alex sees under a tournament: is the draw out, and are our kids in it. */
export function checkTournament(
  draws: TournamentDraws,
  rosterIds: ReadonlySet<string>,
  timeZone: string,
): TournamentCheck {
  const everyone = draws.matches.length;
  const feed = drawsToFeed([draws], rosterIds, timeZone);
  const present = new Set<string>();
  for (const match of draws.matches) {
    for (const id of [memberId(match.wid1), memberId(match.oid1)]) {
      if (id && rosterIds.has(id)) present.add(id);
    }
  }
  const playersFound = present.size;
  if (everyone === 0) {
    return {
      state: "no-draw",
      message: "The draw is not posted yet. Check back once the draw is made.",
      playersFound: 0,
      matches: 0,
    };
  }
  if (rosterIds.size === 0) {
    return {
      state: "ready",
      message: "The draw is posted. Add your players to see their matches.",
      playersFound: 0,
      matches: 0,
    };
  }
  if (playersFound === 0) {
    return {
      state: "no-players",
      message: "The draw is posted but none of your players are in it. Check the player IDs.",
      playersFound: 0,
      matches: 0,
    };
  }
  const scheduled = feed.matches.length;
  return {
    state: "ready",
    message:
      scheduled > 0
        ? `The draw is posted. ${playersFound} of your players found, ${scheduled} matches scheduled.`
        : `The draw is posted. ${playersFound} of your players found. Match times are not published yet.`,
    playersFound,
    matches: scheduled,
  };
}

export async function fetchClubLockerDraws(
  config: ClubLockerDrawsConfig,
  fetchJson: (path: string) => Promise<unknown> = getJson,
): Promise<ClubLockerFeed> {
  if (config.rosterIds.size === 0) {
    throw new Error("Add US Squash player IDs to CLUB_LOCKER_PLAYER_IDS");
  }
  const tournaments = await Promise.all(
    config.tournamentIds.map((id) =>
      loadTournamentDraws(id, fetchJson, config.timeZone, config.timeZones?.[id]),
    ),
  );
  return drawsToFeed(tournaments, config.rosterIds, config.timeZone);
}

export type TournamentReport = {
  id: string;
  info: TournamentInfo | null;
  check: TournamentCheck;
};

/**
 * Like fetchClubLockerDraws, but one tournament failing never blocks the
 * others: it reports each tournament's status so staff can see which one.
 * Throws only if every tournament failed.
 */
export async function fetchClubLockerDrawsDetailed(
  config: ClubLockerDrawsConfig,
  fetchJson: (path: string) => Promise<unknown> = getJson,
): Promise<{ feed: ClubLockerFeed; reports: TournamentReport[] }> {
  const loaded = await Promise.all(
    config.tournamentIds.map(async (id) => {
      try {
        const draws = await loadTournamentDraws(id, fetchJson, config.timeZone, config.timeZones?.[id]);
        return { id, draws, error: null as string | null };
      } catch (error) {
        return {
          id,
          draws: null,
          error: error instanceof Error ? error.message : "Club Locker could not be reached",
        };
      }
    }),
  );
  const good = loaded.flatMap((item) => (item.draws ? [item.draws] : []));
  if (good.length === 0 && loaded.length > 0) {
    throw new Error(loaded[0]?.error ?? "Club Locker could not be reached");
  }
  const reports: TournamentReport[] = loaded.map((item) =>
    item.draws
      ? {
          id: item.id,
          info: item.draws.info,
          check: checkTournament(item.draws, config.rosterIds, config.timeZone),
        }
      : {
          id: item.id,
          info: null,
          check: {
            state: "error" as const,
            message: item.error ?? "Club Locker could not be reached",
            playersFound: 0,
            matches: 0,
          },
        },
  );
  const feed = config.rosterIds.size
    ? drawsToFeed(good, config.rosterIds, config.timeZone)
    : { matches: [], players: [] };
  return { feed, reports };
}

/** Everyone in a tournament's singles draws, so staff can pick their kids by name. */
export function listTournamentPlayers(
  draws: TournamentDraws,
): Array<{ id: string; name: string }> {
  const found = new Map<string, string>();
  for (const match of draws.matches) {
    if (text(match.SinglesDoubles).toLowerCase() === "d") continue;
    const sides: Array<[string, string]> = [
      [memberId(match.wid1), text(match.hplayer1)],
      [memberId(match.oid1), text(match.vplayer1)],
    ];
    for (const [id, name] of sides) {
      if (id && name && !found.has(id)) found.set(id, displayName(name));
    }
  }
  return [...found].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
}

export type TournamentSearchHit = {
  id: string;
  name: string;
  dates: string | null;
  city: string | null;
  level: string | null;
};

const LIST_PATH = "tournaments?TopRecords=300&ngbId=10000&OrganizerType=1&Sanctioned=1&Status=1&State=0";

/** Search Club Locker's public tournament list by name or city, upcoming events only. */
export async function searchTournaments(
  query: string,
  now: Date = new Date(),
  fetchJson: (path: string) => Promise<unknown> = getJson,
): Promise<TournamentSearchHit[]> {
  const list = await fetchJson(LIST_PATH);
  if (!Array.isArray(list)) return [];
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const day = 86_400_000;
  const parse = (value: unknown) => {
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(text(value));
    return match ? Date.UTC(Number(match[3]), Number(match[1]) - 1, Number(match[2])) : null;
  };
  const hits: Array<TournamentSearchHit & { start: number }> = [];
  for (const item of list as Array<Record<string, unknown>>) {
    const id = memberId(item.TournamentID);
    const start = parse(item.StartDate);
    const end = parse(item.EndDate) ?? start;
    if (!id || start === null || end === null) continue;
    if (end < now.getTime() - day || start > now.getTime() + 28 * day) continue;
    const name = text(item.TournamentName);
    const city = text(item.SiteCity) || null;
    const haystack = `${name} ${city ?? ""} ${text(item.EventType)}`.toLowerCase();
    if (!tokens.every((token) => haystack.includes(token))) continue;
    const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
    hits.push({
      id,
      name,
      dates: formatTournamentDates(iso(start), iso(end)),
      city,
      level: text(item.EventType) || null,
      start,
    });
  }
  return hits
    .sort((a, b) => a.start - b.start || a.name.localeCompare(b.name))
    .slice(0, 15)
    .map(({ start: _start, ...hit }) => hit);
}
