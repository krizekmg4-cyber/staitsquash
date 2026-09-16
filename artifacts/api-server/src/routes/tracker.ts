import express, { Router, type IRouter, type RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import {
  GetTrackerResponse,
  PersistedTrackerState,
  GetTrackerHealthResponse,
  GetPlayerTrackerParams,
  GetPlayerTrackerResponse,
  RefreshTrackerResponse,
  UploadTrackerLogoResponse,
  UploadCoachReportAudioParams,
  UploadCoachReportAudioResponse,
  SaveCoachReportBody,
  SaveCoachReportParams,
  SaveCoachReportResponse,
  SaveTrackerSettingsBody,
  SaveTrackerSettingsResponse,
  UpdateMatchBody,
  UpdateMatchParams,
  UpdateMatchResponse,
  type PersistedTrackerState as PersistedTrackerSnapshot,
} from "@workspace/api-zod";
import {
  clearPendingRecovery,
  cloneTrackerState,
  freezeTrackerState,
  parseClubLockerFeed,
  recordRefreshFailure,
  refreshTrackerState,
  type ReadonlyClubLockerFeed,
  type ReadonlyTrackerState,
  type RefreshRecovery,
  type TrackerState,
} from "../lib/club-locker.js";
import { ObjectStorageService } from "../lib/object-storage.js";
import { requireStaff } from "../middlewares/requireStaff.js";

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
  branding: { name: "StaitSquash", logoPath: null },
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

export function parsePersistedTrackerState(
  value: unknown,
): PersistedTrackerSnapshot {
  const result = PersistedTrackerState.safeParse(value);
  if (result.success) return result.data;

  const details = result.error.issues
    .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
    .join("; ");
  throw new Error(
    `Stored tracker snapshot is invalid. Repair or replace the "main" tracker_state record. Validation errors: ${details}`,
  );
}

function normalizeState(state: PersistedTrackerSnapshot): ReadonlyTrackerState {
  const alertThreshold = getAlertThreshold();
  const storedBranding = state.branding;
  const storedRefreshHealth = state.refreshHealth;
  return freezeTrackerState({
    players: state.players.map((player) => ({ ...player })),
    coaches: state.coaches.map((coach) => ({ ...coach })),
    branding: storedBranding
      ? {
          name: storedBranding.name,
          logoPath: storedBranding.logoPath ?? null,
        }
      : { name: "StaitSquash", logoPath: null },
    matches: state.matches.map((match) => ({
      ...match,
      report: match.report
        ? {
            ...match.report,
            observations: [...match.report.observations],
            audioPath: match.report.audioPath ?? null,
          }
        : null,
    })),
    lastUpdatedAt: state.lastUpdatedAt,
    source: state.source,
    refreshHealth: state.refreshHealth
      ? {
          ...state.refreshHealth,
          firstFailureAt:
            state.refreshHealth.firstFailureAt ??
            (state.refreshHealth.consecutiveFailures > 0
              ? state.refreshHealth.lastFailureAt
              : null),
          pendingRecoveries:
            storedRefreshHealth?.pendingRecoveries?.map((recovery) => ({
              ...recovery,
            })) ??
            (storedRefreshHealth?.pendingRecovery
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
  });
}

async function getState(): Promise<ReadonlyTrackerState> {
  const { db, trackerStateTable } = await import("@workspace/db");
  const [row] = await db
    .select()
    .from(trackerStateTable)
    .where(eq(trackerStateTable.id, "main"));

  if (row) return normalizeState(parsePersistedTrackerState(row.data));

  const [created] = await db
    .insert(trackerStateTable)
    .values({ id: "main", data: INITIAL_STATE })
    .returning();

  return normalizeState(parsePersistedTrackerState(created.data));
}

async function saveState(state: TrackerState): Promise<void> {
  const { db, trackerStateTable } = await import("@workspace/db");
  await db
    .update(trackerStateTable)
    .set({ data: state, updatedAt: new Date() })
    .where(eq(trackerStateTable.id, "main"));
}

type StateMutationOperation<T> = (
  loadState: () => Promise<ReadonlyTrackerState>,
  saveState: (state: TrackerState) => Promise<void>,
) => Promise<T>;

async function mutateStateInTransaction<T>(
  operation: StateMutationOperation<T>,
): Promise<T> {
  const { db, trackerStateTable } = await import("@workspace/db");
  return db.transaction(async (transaction) => {
    await transaction
      .insert(trackerStateTable)
      .values({ id: "main", data: INITIAL_STATE })
      .onConflictDoNothing();

    const [row] = await transaction
      .select()
      .from(trackerStateTable)
      .where(eq(trackerStateTable.id, "main"))
      .for("update");
    if (!row) throw new Error("Tracker state row could not be locked");

    let current = normalizeState(parsePersistedTrackerState(row.data));
    return operation(
      async () => current,
      async (next) => {
        await transaction
          .update(trackerStateTable)
          .set({ data: next, updatedAt: new Date() })
          .where(eq(trackerStateTable.id, "main"));
        current = freezeTrackerState(cloneTrackerState(next));
      },
    );
  });
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

export function isLogoImage(bytes: Buffer, contentType: string): boolean {
  if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024) return false;
  if (contentType === "image/png") {
    return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (contentType === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (contentType === "image/gif") return ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"));
  if (contentType === "image/webp") {
    return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
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
  getState: () => Promise<ReadonlyTrackerState>;
  saveState: (state: TrackerState) => Promise<void>;
  mutateState?: <T>(operation: StateMutationOperation<T>) => Promise<T>;
  objectStorage?: Pick<ObjectStorageService, "saveObject">;
  authorizeStaff?: RequestHandler;
};

function trackerResponse(state: ReadonlyTrackerState) {
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoPath: null },
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length,
    },
  };
}

function trackerHealthResponse(state: ReadonlyTrackerState) {
  return {
    ...state.refreshHealth,
    pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length,
  };
}

export function createTrackerRouter(
  dependencies: TrackerRouterDependencies = {
    getState,
    saveState,
    mutateState: mutateStateInTransaction,
  },
): IRouter {
  const router: IRouter = Router();
  const objectStorage = dependencies.objectStorage ?? new ObjectStorageService();
  const authorizeStaff = dependencies.authorizeStaff ?? requireStaff;
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

  function coordinateMutation<T>(
    operation: StateMutationOperation<T>,
  ): Promise<T> {
    if (dependencies.mutateState) return dependencies.mutateState(operation);
    return serializeMutation(() => operation(loadState, persistState));
  }

  router.get("/tracker", authorizeStaff, async (_req, res): Promise<void> => {
    res.json(GetTrackerResponse.parse(trackerResponse(await loadState())));
  });

  router.get("/tracker/health", authorizeStaff, async (_req, res): Promise<void> => {
    res.json(GetTrackerHealthResponse.parse(trackerHealthResponse(await loadState())));
  });

  router.get("/players/:playerId/tracker", async (req, res): Promise<void> => {
    const params = GetPlayerTrackerParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    const state = await loadState();
    const player = state.players.find((item) => item.id === params.data.playerId);
    if (!player) {
      res.status(404).json({ error: "Player not found" });
      return;
    }
    const matches = state.matches.filter((match) => match.playerId === player.id);
    const coachIds = new Set(matches.map((match) => match.coachId));
    res.json(GetPlayerTrackerResponse.parse({
      player,
      matches,
      coaches: state.coaches.filter((coach) => coachIds.has(coach.id)),
      branding: state.branding,
      lastUpdatedAt: state.lastUpdatedAt,
    }));
  });

  router.put("/tracker/settings", authorizeStaff, async (req, res): Promise<void> => {
    const body = SaveTrackerSettingsBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
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
      await saveLockedState(state);
      res.json(SaveTrackerSettingsResponse.parse(trackerResponse(state)));
    });
  });

  router.post(
    "/tracker/logo",
    authorizeStaff,
    express.raw({ type: ["image/png", "image/jpeg", "image/webp", "image/gif"], limit: "5mb" }),
    async (req, res): Promise<void> => {
      if (!Buffer.isBuffer(req.body) || !isLogoImage(req.body, req.get("content-type") ?? "")) {
        res.status(400).json({ error: "Choose a valid PNG, JPG, WebP, or GIF image up to 5 MB" });
        return;
      }
      try {
        const objectPath = `/objects/uploads/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type")!);
        res.json(UploadTrackerLogoResponse.parse({ objectPath }));
      } catch (error) {
        req.log.error({ err: error }, "Could not store tracker logo");
        res.status(500).json({ error: "Could not store tracker logo" });
      }
    },
  );

  router.patch("/matches/:matchId", authorizeStaff, async (req, res): Promise<void> => {
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

    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return;
      }

      Object.assign(match, body.data);
      state.lastUpdatedAt = new Date().toISOString();
      await saveLockedState(state);
      res.json(UpdateMatchResponse.parse(match));
    });
  });

  router.put("/matches/:matchId/report", authorizeStaff, async (req, res): Promise<void> => {
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

    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
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
        audioPath: body.data.audioPath ?? match.report?.audioPath ?? null,
        updatedAt: new Date().toISOString(),
      };
      state.lastUpdatedAt = new Date().toISOString();
      await saveLockedState(state);
      res.json(SaveCoachReportResponse.parse(match.report));
    });
  });

  router.post(
    "/matches/:matchId/report/audio",
    authorizeStaff,
    express.raw({ type: ["audio/webm", "audio/ogg", "audio/mp4"], limit: "25mb" }),
    async (req, res): Promise<void> => {
      const params = UploadCoachReportAudioParams.safeParse(req.params);
      if (!params.success) {
        res.status(400).json({ error: params.error.message });
        return;
      }
      if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
        res.status(400).json({ error: "Record a voice note before uploading" });
        return;
      }
      const state = await loadState();
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return;
      }
      if (match.status !== "completed") {
        res.status(400).json({ error: "Voice notes can only be added to completed matches" });
        return;
      }
      try {
        const objectPath = `/objects/uploads/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type")!);
        res.json(UploadCoachReportAudioResponse.parse({ objectPath }));
      } catch (error) {
        req.log.error({ err: error }, "Could not store coach voice note");
        res.status(500).json({ error: "Could not store coach voice note" });
      }
    },
  );

  router.post("/tracker/refresh", authorizeStaff, async (req, res): Promise<void> => {
  await coordinateMutation(async (loadLockedState, saveLockedState) => {
  const alertThreshold = getAlertThreshold();
  try {
    const previousState = await loadLockedState();
    const state = await refreshTrackerState(
      async () => previousState,
      fetchClubLockerFeed,
      saveLockedState,
      alertThreshold,
    );
    let notificationState = state;
    while (notificationState.refreshHealth.pendingRecoveries.length > 0) {
      const recovery = notificationState.refreshHealth.pendingRecoveries[0]!;
      try {
        await alertStaffOfRecovery(recovery);
        notificationState = clearPendingRecovery(notificationState);
        await saveLockedState(notificationState);
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
      await loadLockedState(),
      alertThreshold,
    );
    await saveLockedState(failedState);
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
        await saveLockedState(failedState);
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