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

router.post("/tracker/refresh", async (_req, res): Promise<void> => {
  const state = await getState();
  state.lastUpdatedAt = new Date().toISOString();
  await saveState(state);
  res.json(RefreshTrackerResponse.parse(state));
});

export default router;