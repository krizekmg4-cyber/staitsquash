import express, { Router, type IRouter, type RequestHandler } from "express";
import {
  checkTournament,
  listTournamentPlayers,
  loadTournamentDraws,
  searchTournaments,
  type ClubLockerDrawsConfig,
  type TournamentCheck,
  type TournamentReport,
} from "./club-locker-draws.js";
import type { TournamentCoachDefaults } from "./club-locker.js";

/**
 * The weekly setup Alex does without opening Replit: which tournaments to
 * follow, which kids, and which coach covers each tournament. It lives in its
 * own database row so it can never disturb the match data.
 */
export type SetupTournament = {
  id: string;
  name: string | null;
  dates: string | null;
  city: string | null;
  timeZone: string;
  endsOn: string | null;
  /** "unassigned" means a coach has not been decided yet. */
  coachId: string;
  coachMode: "in-person" | "virtual";
  check: (TournamentCheck & { checkedAt: string }) | null;
};

export type WeeklySetup = {
  tournaments: SetupTournament[];
  followedPlayerIds: string[];
  /** Kids staff removed from the board; the Replit setting must not bring them back. */
  removedPlayerIds: string[];
};

export const US_TIME_ZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Phoenix",
  "America/Los_Angeles",
] as const;

/** Events stay on screen this long after their last day, then tuck away. */
const KEEP_AFTER_EVENT_DAYS = 3;

export const emptySetup = (): WeeklySetup => ({ tournaments: [], followedPlayerIds: [], removedPlayerIds: [] });

/** Accepts a Club Locker link, "tournaments/19518", or just the number. */
export function parseTournamentRef(input: string): string | null {
  const text = input.trim();
  const fromLink = /tournaments?\/(\d{1,8})/i.exec(text);
  if (fromLink) return fromLink[1] ?? null;
  const bare = /^#?(\d{1,8})$/.exec(text);
  return bare ? (bare[1] ?? null) : null;
}

export function isActive(tournament: SetupTournament, now: Date = new Date()): boolean {
  if (!tournament.endsOn) return true;
  const end = Date.parse(`${tournament.endsOn}T00:00:00Z`);
  if (Number.isNaN(end)) return true;
  return now.getTime() <= end + (1 + KEEP_AFTER_EVENT_DAYS) * 86_400_000;
}

const isString = (value: unknown): value is string => typeof value === "string";

function readCheck(raw: unknown): SetupTournament["check"] {
  const check = raw as Record<string, unknown> | null | undefined;
  return check && isString(check.checkedAt) && isString(check.message) && isString(check.state)
    ? {
        checkedAt: check.checkedAt,
        state: check.state as TournamentCheck["state"],
        message: check.message,
        playersFound: Number(check.playersFound) || 0,
        matches: Number(check.matches) || 0,
      }
    : null;
}

/** Read a stored setup row defensively; anything unreadable becomes empty. */
export function normalizeSetup(raw: unknown): WeeklySetup {
  if (!raw || typeof raw !== "object") return emptySetup();
  const value = raw as { tournaments?: unknown; followedPlayerIds?: unknown; removedPlayerIds?: unknown };
  const tournaments: SetupTournament[] = [];
  if (Array.isArray(value.tournaments)) {
    for (const item of value.tournaments as Array<Record<string, unknown>>) {
      if (!item || !isString(item.id) || !/^\d{1,8}$/.test(item.id)) continue;
      if (tournaments.some((existing) => existing.id === item.id)) continue;
      tournaments.push({
        id: item.id,
        name: isString(item.name) ? item.name : null,
        dates: isString(item.dates) ? item.dates : null,
        city: isString(item.city) ? item.city : null,
        timeZone:
          isString(item.timeZone) && (US_TIME_ZONES as readonly string[]).includes(item.timeZone)
            ? item.timeZone
            : "America/New_York",
        endsOn: isString(item.endsOn) ? item.endsOn : null,
        coachId: isString(item.coachId) && item.coachId ? item.coachId : "unassigned",
        coachMode: item.coachMode === "virtual" ? "virtual" : "in-person",
        check: readCheck(item.check),
      });
    }
  }
  const followed = Array.isArray(value.followedPlayerIds)
    ? [...new Set((value.followedPlayerIds as unknown[]).filter(isString).filter((id) => /^\d{1,10}$/.test(id)))]
    : [];
  const removed = Array.isArray(value.removedPlayerIds)
    ? [...new Set((value.removedPlayerIds as unknown[]).filter(isString).filter((id) => /^\d{1,10}$/.test(id)))].filter((id) => !followed.includes(id))
    : [];
  return { tournaments, followedPlayerIds: followed, removedPlayerIds: removed };
}

/**
 * What a refresh should read. A setup with tournaments wins over the
 * environment; otherwise the Replit settings keep working as before.
 */
export function setupToDrawsConfig(
  setup: WeeklySetup,
  env: NodeJS.ProcessEnv = process.env,
  now: Date = new Date(),
): ClubLockerDrawsConfig | null {
  const list = (value: string | undefined) =>
    (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  const active = setup.tournaments.filter((tournament) => isActive(tournament, now));
  const tournamentIds = active.length ? active.map((tournament) => tournament.id) : list(env["CLUB_LOCKER_TOURNAMENT_IDS"]);
  if (tournamentIds.length === 0) return null;
  return {
    tournamentIds,
    // Once tournaments are set up in the app, its own list of kids is the whole
    // roster; the Replit setting is only the starting point before that.
    rosterIds: new Set(
      (active.length ? setup.followedPlayerIds : [...setup.followedPlayerIds, ...list(env["CLUB_LOCKER_PLAYER_IDS"])]).filter(
        (id) => !setup.removedPlayerIds.includes(id),
      ),
    ),
    timeZone: env["CLUB_LOCKER_TIMEZONE"]?.trim() || "America/New_York",
    timeZones: Object.fromEntries(active.map((tournament) => [tournament.id, tournament.timeZone])),
  };
}

export function coachDefaults(setup: WeeklySetup): TournamentCoachDefaults {
  return Object.fromEntries(
    setup.tournaments
      .filter((tournament) => tournament.coachId !== "unassigned")
      .map((tournament) => [tournament.id, { coachId: tournament.coachId, coachMode: tournament.coachMode }]),
  );
}

/** Fold a refresh's per-tournament findings back into the saved setup. */
export function applyReports(setup: WeeklySetup, reports: TournamentReport[], now: Date = new Date()): WeeklySetup {
  const byId = new Map(reports.map((report) => [report.id, report]));
  return {
    ...setup,
    tournaments: setup.tournaments.map((tournament) => {
      const report = byId.get(tournament.id);
      if (!report) return tournament;
      return {
        ...tournament,
        name: report.info?.name ?? tournament.name,
        dates: report.info?.dates ?? tournament.dates,
        city: report.info?.city ?? tournament.city,
        endsOn: report.info?.endsOn ?? tournament.endsOn,
        check: { ...report.check, checkedAt: now.toISOString() },
      };
    }),
  };
}

type StaffCoach = { id: string; name: string };

export type SetupRouterDependencies = {
  getSetup: () => Promise<WeeklySetup>;
  saveSetup: (setup: WeeklySetup) => Promise<void>;
  /** Names of players the tracker already knows, by US Squash ID. */
  getKnownPlayers: () => Promise<Array<{ id: string; name: string }>>;
  /** Real coaches the tracker offers; used to validate a tournament's coach. */
  getCoaches: () => Promise<StaffCoach[]>;
  /** Give existing matches of a tournament its newly chosen coach. */
  applyTournamentCoach: (
    tournamentId: string,
    next: { coachId: string; coachMode: "in-person" | "virtual" },
    previousCoachId: string | null,
  ) => Promise<void>;
  authorizeStaff: RequestHandler;
  fetchJson?: (path: string) => Promise<unknown>;
  now?: () => Date;
};

export function createSetupRouter(dependencies: SetupRouterDependencies): IRouter {
  const router: IRouter = Router();
  const { authorizeStaff } = dependencies;
  const clock = dependencies.now ?? (() => new Date());
  const json = express.json();

  async function view(setup: WeeklySetup) {
    const known = new Map((await dependencies.getKnownPlayers()).map((player) => [player.id, player.name]));
    const now = clock();
    return {
      tournaments: setup.tournaments.filter((tournament) => isActive(tournament, now)),
      followedPlayers: setup.followedPlayerIds.map((id) => ({ id, name: known.get(id) ?? null })),
    };
  }

  router.get("/tracker/setup", authorizeStaff, async (_req, res): Promise<void> => {
    res.json(await view(await dependencies.getSetup()));
  });

  router.put("/tracker/setup", authorizeStaff, json, async (req, res): Promise<void> => {
    const body = req.body as { tournaments?: unknown; followedPlayerIds?: unknown } | undefined;
    if (!body || !Array.isArray(body.tournaments) || !Array.isArray(body.followedPlayerIds)) {
      res.status(400).json({ error: "Send tournaments and followedPlayerIds" });
      return;
    }
    const coaches = new Set((await dependencies.getCoaches()).map((coach) => coach.id));
    coaches.add("unassigned");
    coaches.add("not-coaching");
    const previous = await dependencies.getSetup();
    const previousById = new Map(previous.tournaments.map((tournament) => [tournament.id, tournament]));

    const incoming: SetupTournament[] = [];
    for (const item of body.tournaments as Array<Record<string, unknown>>) {
      const id = isString(item?.id) ? item.id : "";
      if (!/^\d{1,8}$/.test(id)) {
        res.status(400).json({ error: `"${id}" is not a Club Locker tournament number` });
        return;
      }
      if (incoming.some((existing) => existing.id === id)) continue;
      const coachId = isString(item.coachId) && item.coachId ? item.coachId : "unassigned";
      if (!coaches.has(coachId)) {
        res.status(400).json({ error: `Unknown coach for tournament ${id}` });
        return;
      }
      const timeZone = isString(item.timeZone) ? item.timeZone : "";
      if (timeZone && !(US_TIME_ZONES as readonly string[]).includes(timeZone)) {
        res.status(400).json({ error: `Unsupported time zone for tournament ${id}` });
        return;
      }
      const known = previousById.get(id);
      incoming.push({
        id,
        name: isString(item.name) ? item.name : (known?.name ?? null),
        dates: isString(item.dates) ? item.dates : (known?.dates ?? null),
        city: isString(item.city) ? item.city : (known?.city ?? null),
        endsOn: isString(item.endsOn) ? item.endsOn : (known?.endsOn ?? null),
        timeZone: timeZone || known?.timeZone || "America/New_York",
        coachId,
        coachMode: item.coachMode === "virtual" ? "virtual" : "in-person",
        check: readCheck(item.check) ?? known?.check ?? null,
      });
    }
    const followed = normalizeSetup({ followedPlayerIds: body.followedPlayerIds }).followedPlayerIds;

    // Tournaments tucked away by age stay stored, so editing the visible list
    // never erases them.
    const now = clock();
    const hidden = previous.tournaments.filter(
      (tournament) => !isActive(tournament, now) && !incoming.some((item) => item.id === tournament.id),
    );
    const next: WeeklySetup = {
      tournaments: [...incoming, ...hidden],
      followedPlayerIds: followed,
      removedPlayerIds: previous.removedPlayerIds.filter((id) => !followed.includes(id)),
    };
    await dependencies.saveSetup(next);

    for (const tournament of incoming) {
      const before = previousById.get(tournament.id);
      if (before && before.coachId === tournament.coachId && before.coachMode === tournament.coachMode) continue;
      if (tournament.coachId === "unassigned" && !before) continue;
      await dependencies.applyTournamentCoach(
        tournament.id,
        { coachId: tournament.coachId, coachMode: tournament.coachMode },
        before ? before.coachId : null,
      );
    }
    res.json(await view(next));
  });

  router.post("/tracker/setup/check", authorizeStaff, json, async (req, res): Promise<void> => {
    const ref = isString((req.body as { ref?: unknown } | undefined)?.ref)
      ? (req.body as { ref: string }).ref
      : "";
    const id = parseTournamentRef(ref);
    if (!id) {
      res.status(400).json({ error: "Paste a Club Locker tournament link or number" });
      return;
    }
    const setup = await dependencies.getSetup();
    try {
      const draws = await loadTournamentDraws(id, dependencies.fetchJson ?? defaultFetchJson, "America/New_York");
      const check = checkTournament(draws, new Set(setup.followedPlayerIds), draws.info.timeZone);
      res.json({
        id,
        name: draws.info.name,
        dates: draws.info.dates,
        city: draws.info.city,
        timeZone: draws.info.timeZone,
        endsOn: draws.info.endsOn,
        check: { ...check, checkedAt: clock().toISOString() },
      });
    } catch (error) {
      res.status(422).json({ error: error instanceof Error ? error.message : "Club Locker could not be reached" });
    }
  });

  router.get("/tracker/setup/search", authorizeStaff, async (req, res): Promise<void> => {
    const q = isString(req.query["q"]) ? req.query["q"] : "";
    try {
      res.json({ results: await searchTournaments(q, clock(), dependencies.fetchJson ?? defaultFetchJson) });
    } catch {
      res.status(502).json({ error: "Club Locker's tournament list could not be reached. Paste the tournament number instead." });
    }
  });

  router.get("/tracker/setup/players", authorizeStaff, async (req, res): Promise<void> => {
    const id = isString(req.query["tournament"]) ? parseTournamentRef(req.query["tournament"]) : null;
    if (!id) {
      res.status(400).json({ error: "Choose a tournament first" });
      return;
    }
    const q = isString(req.query["q"]) ? req.query["q"].toLowerCase().trim() : "";
    try {
      const draws = await loadTournamentDraws(id, dependencies.fetchJson ?? defaultFetchJson, "America/New_York");
      const everyone = listTournamentPlayers(draws);
      const matching = q ? everyone.filter((player) => player.name.toLowerCase().includes(q)) : everyone;
      res.json({
        drawPosted: everyone.length > 0,
        total: everyone.length,
        players: matching.slice(0, 30),
      });
    } catch (error) {
      res.status(422).json({ error: error instanceof Error ? error.message : "Club Locker could not be reached" });
    }
  });

  return router;
}

async function defaultFetchJson(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`https://api.ussquash.com/resources/${path}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Club Locker returned HTTP ${response.status} for ${path}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
