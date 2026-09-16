import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, trackerStateTable } from "@workspace/db";
import {
  GetTrackerResponse,
  RefreshTrackerResponse,
  SaveCoachReportBody,
  SaveCoachReportParams,
  SaveCoachReportResponse,
  UpdateMatchBody,
  UpdateMatchParams,
  UpdateMatchResponse,
} from "@workspace/api-zod";

type TrackerState = {
  players: Array<{ id: string; name: string }>;
  coaches: Array<{ id: string; name: string }>;
  matches: Array<{
    id: string;
    externalId: string | null;
    playerId: string;
    opponent: string;
    startsAt: string;
    endsAt: string;
    venue: string;
    court: string;
    coachId: string;
    status: "upcoming" | "completed";
    result: string | null;
    report: {
      matchId: string;
      observations: string[];
      transcript: string | null;
      updatedAt: string;
    } | null;
  }>;
  lastUpdatedAt: string;
  source: "sample" | "club-locker";
};

type ClubLockerMatch = {
  externalId: string;
  playerId: string;
  playerName?: string;
  opponent: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  court: string;
  status?: "upcoming" | "completed";
  result?: string | null;
};

type ClubLockerFeed = {
  matches: ClubLockerMatch[];
  players?: Array<{ id: string; name: string }>;
};

const INITIAL_STATE: TrackerState = {
  players: [{ id: "cameron-stait", name: "Cameron Stait" }],
  coaches: [
    { id: "alex", name: "Alex" },
    { id: "narelle", name: "Narelle" },
    { id: "rob", name: "Rob" },
    { id: "nico", name: "Nico" },
    { id: "nathan", name: "Nathan" },
    { id: "unassigned", name: "Unassigned" },
  ],
  matches: [
    {
      id: "match-1",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Ethan Cole",
      startsAt: "2026-09-16T14:30:00-04:00",
      endsAt: "2026-09-16T15:15:00-04:00",
      venue: "Arlen Specter US Squash Center",
      court: "Court 6",
      coachId: "alex",
      status: "upcoming",
      result: null,
      report: null,
    },
    {
      id: "match-2",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Miles Brennan",
      startsAt: "2026-09-17T10:00:00-04:00",
      endsAt: "2026-09-17T10:45:00-04:00",
      venue: "Penn Squash Center",
      court: "Court 3",
      coachId: "unassigned",
      status: "upcoming",
      result: null,
      report: null,
    },
    {
      id: "match-0",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Jordan Lee",
      startsAt: "2026-09-15T09:00:00-04:00",
      endsAt: "2026-09-15T09:42:00-04:00",
      venue: "Arlen Specter US Squash Center",
      court: "Court 2",
      coachId: "narelle",
      status: "completed",
      result: "Won 3–1",
      report: null,
    },
  ],
  lastUpdatedAt: "2026-09-15T12:00:00-04:00",
  source: "sample",
};

async function getState(): Promise<TrackerState> {
  const [row] = await db
    .select()
    .from(trackerStateTable)
    .where(eq(trackerStateTable.id, "main"));

  if (row) return row.data as TrackerState;

  const [created] = await db
    .insert(trackerStateTable)
    .values({ id: "main", data: INITIAL_STATE })
    .returning();

  return created.data as TrackerState;
}

async function saveState(state: TrackerState): Promise<void> {
  await db
    .update(trackerStateTable)
    .set({ data: state, updatedAt: new Date() })
    .where(eq(trackerStateTable.id, "main"));
}

function readRequiredString(
  value: unknown,
  field: string,
  index: number,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return value.trim();
}

function parseClubLockerFeed(value: unknown): ClubLockerFeed {
  if (!value || typeof value !== "object" || !Array.isArray((value as { matches?: unknown }).matches)) {
    throw new Error("The Club Locker response does not contain a matches array");
  }

  const raw = value as {
    matches: Array<Record<string, unknown>>;
    players?: unknown;
  };
  const seen = new Set<string>();
  const matches = raw.matches.map((match, index): ClubLockerMatch => {
    const externalId = readRequiredString(match.externalId, "externalId", index);
    if (seen.has(externalId)) {
      throw new Error(`Club Locker returned duplicate match ID "${externalId}"`);
    }
    seen.add(externalId);

    const startsAt = readRequiredString(match.startsAt, "startsAt", index);
    const endsAt = readRequiredString(match.endsAt, "endsAt", index);
    if (Number.isNaN(Date.parse(startsAt)) || Number.isNaN(Date.parse(endsAt))) {
      throw new Error(`Match ${index + 1} has an invalid start or end time`);
    }
    if (match.status != null && match.status !== "upcoming" && match.status !== "completed") {
      throw new Error(`Match ${index + 1} has an invalid status`);
    }

    return {
      externalId,
      playerId: readRequiredString(match.playerId, "playerId", index),
      playerName: typeof match.playerName === "string" ? match.playerName.trim() : undefined,
      opponent: readRequiredString(match.opponent, "opponent", index),
      startsAt,
      endsAt,
      venue: readRequiredString(match.venue, "venue", index),
      court: readRequiredString(match.court, "court", index),
      status:
        match.status === "upcoming" || match.status === "completed"
          ? match.status
          : undefined,
      result: typeof match.result === "string" || match.result === null ? match.result : undefined,
    };
  });

  const players = Array.isArray(raw.players)
    ? raw.players.map((player, index) => {
        if (!player || typeof player !== "object") {
          throw new Error(`Player ${index + 1} is invalid`);
        }
        const item = player as Record<string, unknown>;
        return {
          id: readRequiredString(item.id, "player id", index),
          name: readRequiredString(item.name, "player name", index),
        };
      })
    : undefined;

  return { matches, players };
}

async function fetchClubLockerFeed(): Promise<ClubLockerFeed> {
  const url = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  if (!url) {
    throw new Error("Club Locker feed is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const token = process.env["CLUB_LOCKER_API_TOKEN"];
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Club Locker returned HTTP ${response.status}`);
    }
    return parseClubLockerFeed(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}

function mergeClubLockerFeed(state: TrackerState, feed: ClubLockerFeed): TrackerState {
  const currentByExternalId = new Map(
    state.matches
      .filter((match): match is typeof match & { externalId: string } => match.externalId !== null)
      .map((match) => [match.externalId, match]),
  );
  const importedIds = new Set(feed.matches.map((match) => match.externalId));
  const retained = state.matches.filter(
    (match) =>
      match.externalId === null ||
      importedIds.has(match.externalId) ||
      match.status === "completed" ||
      match.report !== null,
  );
  const retainedIds = new Set(retained.map((match) => match.id));

  for (const incoming of feed.matches) {
    const existing = currentByExternalId.get(incoming.externalId);
    if (existing) {
      existing.playerId = incoming.playerId;
      existing.opponent = incoming.opponent;
      existing.startsAt = incoming.startsAt;
      existing.endsAt = incoming.endsAt;
      existing.venue = incoming.venue;
      existing.court = incoming.court;
      continue;
    }

    const newMatch: TrackerState["matches"][number] = {
      id: `club-locker:${Buffer.from(incoming.externalId).toString("base64url")}`,
      externalId: incoming.externalId,
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      coachId: "unassigned",
      status: incoming.status ?? "upcoming",
      result: incoming.result ?? null,
      report: null,
    };
    retained.push(newMatch);
    retainedIds.add(newMatch.id);
  }

  const playersById = new Map(state.players.map((player) => [player.id, player]));
  for (const player of feed.players ?? []) playersById.set(player.id, player);
  for (const match of feed.matches) {
    if (!playersById.has(match.playerId)) {
      playersById.set(match.playerId, {
        id: match.playerId,
        name: match.playerName || match.playerId,
      });
    }
  }

  return {
    ...state,
    players: [...playersById.values()],
    matches: retained.filter((match) => retainedIds.has(match.id)),
    lastUpdatedAt: new Date().toISOString(),
    source: "club-locker",
  };
}

const router: IRouter = Router();

router.get("/tracker", async (_req, res): Promise<void> => {
  res.json(GetTrackerResponse.parse(await getState()));
});

router.patch("/matches/:matchId", async (req, res): Promise<void> => {
  const params = UpdateMatchParams.safeParse(req.params);
  const body = UpdateMatchBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const state = await getState();
  const match = state.matches.find((item) => item.id === params.data.matchId);
  if (!match) {
    res.status(404).json({ error: "Match not found" });
    return;
  }

  Object.assign(match, body.data);
  state.lastUpdatedAt = new Date().toISOString();
  await saveState(state);
  res.json(UpdateMatchResponse.parse(match));
});

router.put("/matches/:matchId/report", async (req, res): Promise<void> => {
  const params = SaveCoachReportParams.safeParse(req.params);
  const body = SaveCoachReportBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const state = await getState();
  const match = state.matches.find((item) => item.id === params.data.matchId);
  if (!match) {
    res.status(404).json({ error: "Match not found" });
    return;
  }
  if (match.status !== "completed") {
    res.status(400).json({ error: "Reports can only be added to completed matches" });
    return;
  }

  match.report = {
    matchId: match.id,
    observations: body.data.observations,
    transcript: body.data.transcript ?? null,
    updatedAt: new Date().toISOString(),
  };
  state.lastUpdatedAt = new Date().toISOString();
  await saveState(state);
  res.json(SaveCoachReportResponse.parse(match.report));
});

router.post("/tracker/refresh", async (req, res): Promise<void> => {
  try {
    const state = mergeClubLockerFeed(await getState(), await fetchClubLockerFeed());
    await saveState(state);
    res.json(RefreshTrackerResponse.parse(state));
  } catch (error) {
    req.log.warn({ err: error }, "Club Locker refresh failed");
    const message = error instanceof Error ? error.message : "Unknown Club Locker error";
    res.status(502).json({ error: `Refresh failed: ${message}` });
  }
});

export default router;