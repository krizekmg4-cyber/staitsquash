import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  GetTrackerResponse,
  GetTrackerHealthResponse,
  RefreshTrackerResponse,
  SaveCoachReportBody,
  SaveCoachReportParams,
  SaveCoachReportResponse,
  SaveTrackerSettingsBody,
  SaveTrackerSettingsResponse,
  UpdateMatchBody,
  UpdateMatchParams,
  UpdateMatchResponse,
} from "@workspace/api-zod";
import {
  clearPendingRecovery,
  parseClubLockerFeed,
  recordRefreshFailure,
  refreshTrackerState,
  type ReadonlyClubLockerFeed,
  type RefreshRecovery,
  type TrackerState,
} from "../lib/club-locker.js";

const INITIAL_STATE: TrackerState = {
  players: [{ id: "cameron-stait", name: "Cameron Stait" }],
  coaches: [
    { id: "alex", name: "Alex" },
    { id: "narelle", name: "Narelle" },
    { id: "rob", name: "Rob" },
    { id: "jamie", name: "Jamie" },
    { id: "nico", name: "Nico" },
    { id: "unassigned", name: "Unassigned" },
  ],
  branding: { name: "StaitSquash", logoUrl: null },
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
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 3,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    pendingRecoveries: [],
  },
};

function getAlertThreshold(): number {
  const configured = Number.parseInt(
    process.env["CLUB_LOCKER_ALERT_THRESHOLD"] ?? "",
    10,
  );
  return Number.isInteger(configured) && configured > 0 ? configured : 3;
}

function normalizeState(state: TrackerState): TrackerState {
  const alertThreshold = getAlertThreshold();
  const storedRefreshHealth = state.refreshHealth as TrackerState["refreshHealth"] & {
    pendingRecovery?: RefreshRecovery | null;
    pendingRecoveries?: RefreshRecovery[];
  };
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoUrl: null },
    refreshHealth: state.refreshHealth
      ? {
          ...state.refreshHealth,
          firstFailureAt:
            state.refreshHealth.firstFailureAt ??
            (state.refreshHealth.consecutiveFailures > 0
              ? state.refreshHealth.lastFailureAt
              : null),
          pendingRecoveries:
            storedRefreshHealth.pendingRecoveries?.map((recovery) => ({
              ...recovery,
            })) ??
            (storedRefreshHealth.pendingRecovery
              ? [{ ...storedRefreshHealth.pendingRecovery }]
              : []),
        }
      : {
          consecutiveFailures: 0,
          alertThreshold,
          firstFailureAt: null,
          lastFailureAt: null,
          alertSentAt: null,
          pendingRecoveries: [],
        },
  };
}

async function getState(): Promise<TrackerState> {
  const { db, trackerStateTable } = await import("@workspace/db");
  const [row] = await db
    .select()
    .from(trackerStateTable)
    .where(eq(trackerStateTable.id, "main"));

  if (row) return normalizeState(row.data as TrackerState);

  const [created] = await db
    .insert(trackerStateTable)
    .values({ id: "main", data: INITIAL_STATE })
    .returning();

  return normalizeState(created.data as TrackerState);
}

async function saveState(state: TrackerState): Promise<void> {
  const { db, trackerStateTable } = await import("@workspace/db");
  await db
    .update(trackerStateTable)
    .set({ data: state, updatedAt: new Date() })
    .where(eq(trackerStateTable.id, "main"));
}

async function fetchClubLockerFeed(): Promise<ReadonlyClubLockerFeed> {
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

async function alertStaff(state: TrackerState, error: unknown): Promise<void> {
  const url = process.env["STAFF_ALERT_WEBHOOK_URL"];
  if (!url) {
    throw new Error("STAFF_ALERT_WEBHOOK_URL is not configured");
  }

  const message = error instanceof Error ? error.message : "Unknown Club Locker error";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `StaitSquash alert: Club Locker schedule refresh has failed ${state.refreshHealth.consecutiveFailures} consecutive times. Latest error: ${message}`,
        event: "club-locker-refresh-failing",
        consecutiveFailures: state.refreshHealth.consecutiveFailures,
        lastFailureAt: state.refreshHealth.lastFailureAt,
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Staff alert webhook returned HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

function formatDuration(durationMs: number): string {
  const totalMinutes = Math.max(1, Math.round(durationMs / 60_000));
  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hour${hours === 1 ? "" : "s"}${
    minutes === 0 ? "" : ` ${minutes} minute${minutes === 1 ? "" : "s"}`
  }`;
}

async function alertStaffOfRecovery(
  recovery: RefreshRecovery,
): Promise<void> {
  const url = process.env["STAFF_ALERT_WEBHOOK_URL"];
  if (!url) throw new Error("STAFF_ALERT_WEBHOOK_URL is not configured");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const outageDuration = formatDuration(recovery.outageDurationMs);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `StaitSquash recovery: Club Locker schedule refresh is working again after ${outageDuration} and ${recovery.failedAttempts} failed attempt${recovery.failedAttempts === 1 ? "" : "s"}. The schedule is current.`,
        event: "club-locker-refresh-recovered",
        failedAttempts: recovery.failedAttempts,
        outageDurationMs: recovery.outageDurationMs,
        outageStartedAt: recovery.outageStartedAt,
        recoveredAt: recovery.recoveredAt,
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Staff alert webhook returned HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

type TrackerRouterDependencies = {
  getState: () => Promise<TrackerState>;
  saveState: (state: TrackerState) => Promise<void>;
};

function trackerResponse(state: TrackerState) {
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoUrl: null },
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length,
    },
  };
}

function trackerHealthResponse(state: TrackerState) {
  return {
    ...state.refreshHealth,
    pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length,
  };
}

export function createTrackerRouter(
  dependencies: TrackerRouterDependencies = { getState, saveState },
): IRouter {
  const router: IRouter = Router();
  const { getState: loadState, saveState: persistState } = dependencies;
  let mutationQueue: Promise<void> = Promise.resolve();

  function serializeMutation<T>(operation: () => Promise<T>): Promise<T> {
    const result = mutationQueue.then(operation, operation);
    mutationQueue = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }

  router.get("/tracker", async (_req, res): Promise<void> => {
    res.json(GetTrackerResponse.parse(trackerResponse(await loadState())));
  });

  router.get("/tracker/health", async (_req, res): Promise<void> => {
    res.json(GetTrackerHealthResponse.parse(trackerHealthResponse(await loadState())));
  });

  router.put("/tracker/settings", async (req, res): Promise<void> => {
    const body = SaveTrackerSettingsBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await serializeMutation(async () => {
      const state = await loadState();
      const coaches = [...body.data.coaches];
      if (!coaches.some((coach) => coach.id === "unassigned")) {
        coaches.push({ id: "unassigned", name: "Unassigned" });
      }
      const coachIds = new Set(coaches.map((coach) => coach.id));
      state.coaches = coaches;
      state.matches = state.matches.map((match) => ({
        ...match,
        coachId: coachIds.has(match.coachId) ? match.coachId : "unassigned",
      }));
      state.branding = body.data.branding;
      state.lastUpdatedAt = new Date().toISOString();
      await persistState(state);
      res.json(SaveTrackerSettingsResponse.parse(trackerResponse(state)));
    });
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

    await serializeMutation(async () => {
      const state = await loadState();
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return;
      }

      Object.assign(match, body.data);
      state.lastUpdatedAt = new Date().toISOString();
      await persistState(state);
      res.json(UpdateMatchResponse.parse(match));
    });
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

    await serializeMutation(async () => {
      const state = await loadState();
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
      await persistState(state);
      res.json(SaveCoachReportResponse.parse(match.report));
    });
  });

  router.post("/tracker/refresh", async (req, res): Promise<void> => {
  await serializeMutation(async () => {
  const alertThreshold = getAlertThreshold();
  try {
    const previousState = await loadState();
    const state = await refreshTrackerState(
      async () => previousState,
      fetchClubLockerFeed,
      persistState,
      alertThreshold,
    );
    let notificationState = state;
    while (notificationState.refreshHealth.pendingRecoveries.length > 0) {
      const recovery = notificationState.refreshHealth.pendingRecoveries[0]!;
      try {
        await alertStaffOfRecovery(recovery);
        notificationState = clearPendingRecovery(notificationState);
        await persistState(notificationState);
        req.log.info(
          {
            failedAttempts: recovery.failedAttempts,
            outageDurationMs: recovery.outageDurationMs,
          },
          "Staff alerted that Club Locker refresh recovered",
        );
      } catch (alertError) {
        req.log.error(
          { err: alertError },
          "Could not alert staff about refresh recovery",
        );
        break;
      }
    }
    res.json(RefreshTrackerResponse.parse(trackerResponse(notificationState)));
  } catch (error) {
    const failedState = recordRefreshFailure(
      await loadState(),
      alertThreshold,
    );
    await persistState(failedState);
    req.log.warn(
      {
        err: error,
        consecutiveFailures: failedState.refreshHealth.consecutiveFailures,
        alertThreshold,
      },
      "Club Locker refresh failed",
    );

    const shouldAlert =
      failedState.refreshHealth.consecutiveFailures >= alertThreshold &&
      failedState.refreshHealth.alertSentAt === null;
    if (shouldAlert) {
      try {
        await alertStaff(failedState, error);
        failedState.refreshHealth.alertSentAt = new Date().toISOString();
        await persistState(failedState);
        req.log.error(
          { consecutiveFailures: failedState.refreshHealth.consecutiveFailures },
          "Staff alerted about repeated Club Locker refresh failures",
        );
      } catch (alertError) {
        req.log.error({ err: alertError }, "Could not alert staff about refresh failures");
      }
    }

    const message = error instanceof Error ? error.message : "Unknown Club Locker error";
    res.status(502).json({ error: `Refresh failed: ${message}` });
  }
  });
  });

  return router;
}

export default createTrackerRouter();