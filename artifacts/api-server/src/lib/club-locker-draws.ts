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
        timeZone,
      );
      if (!startsAt) continue;

      const sides = [
        { side: "H" as const, id: memberId(match.wid1), name: text(match.hplayer1), other: text(match.vplayer1) },
        { side: "V" as const, id: memberId(match.oid1), name: text(match.vplayer1), other: text(match.hplayer1) },
      ];
      const completed = text(match.Status).toUpperCase() !== "S";
      const { venue, court } = courtAndVenue(match, tournament.venueName, venueCodes);

      for (const { side, id, name, other } of sides) {
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

async function loadTournamentDraws(
  tournamentId: string,
  fetchJson: (path: string) => Promise<unknown>,
): Promise<TournamentDraws> {
  const id = encodeURIComponent(tournamentId);
  const tournament = (await fetchJson(`tournaments/${id}`)) as {
    Tournament_Name?: unknown;
    Checks_To?: unknown;
    venues?: Array<{ ClubId?: unknown; IsMain?: unknown }>;
  };

  let venueName = text(tournament.Tournament_Name) || `Tournament ${tournamentId}`;
  const mainClub =
    tournament.venues?.find((venue) => venue.IsMain) ?? tournament.venues?.[0];
  const clubId = memberId(mainClub?.ClubId);
  if (clubId) {
    try {
      const club = (await fetchJson(`res/clubs/${clubId}`)) as { name?: unknown };
      venueName = text(club.name) || venueName;
    } catch {
      // The tournament name is a reasonable venue label if the club lookup fails.
    }
  }

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
    config.tournamentIds.map((id) => loadTournamentDraws(id, fetchJson)),
  );
  return drawsToFeed(tournaments, config.rosterIds, config.timeZone);
}
