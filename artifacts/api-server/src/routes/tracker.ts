import express, { Router, type IRouter, type RequestHandler } from "express";
import { randomBytes, randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import {
  DeleteUnusedTrackerLogoBody,
  GetTrackerResponse,
  PersistedTrackerState,
  GetTrackerHealthResponse,
  GetPlayerTrackerParams,
  GetPlayerTrackerResponse,
  RotatePlayerShareTokenParams,
  RotatePlayerShareTokenResponse,
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
  clearRefreshFailures,
  cloneTrackerState,
  freezeTrackerState,
  applyTournamentCoach,
  mergeClubLockerFeed,
  parseClubLockerFeed,
  recordRefreshFailure,
  type ReadonlyClubLockerFeed,
  type ReadonlyTrackerState,
  type RefreshRecovery,
  type TrackerState,
} from "../lib/club-locker.js";
import {
  drawsConfigFromEnv,
  fetchClubLockerDrawsDetailed,
  type TournamentReport,
} from "../lib/club-locker-draws.js";
import {
  applyReports,
  coachDefaults,
  emptySetup,
  normalizeSetup,
  setupToDrawsConfig,
  type WeeklySetup,
} from "../lib/weekly-setup.js";
import { SCHEDULER_TOKEN } from "../lib/scheduler-token.js";
import { ObjectStorageService } from "../lib/object-storage.js";
import { requireStaff } from "../middlewares/requireStaff.js";

const SYSTEM_COACHES = [
  { id: "unassigned", name: "Unassigned" },
  { id: "not-coaching", name: "Not coaching" },
] as const;

function withSystemCoaches<T extends { id: string; name: string }>(coaches: T[]): Array<T | { id: string; name: string }> {
  const merged: Array<T | { id: string; name: string }> = [...coaches];
  for (const systemCoach of SYSTEM_COACHES) {
    if (!merged.some((coach) => coach.id === systemCoach.id)) merged.push({ ...systemCoach });
  }
  return merged;
}

const INITIAL_STATE: TrackerState = {
  players: [{ id: "cameron-stait", name: "Cameron Stait", shareToken: randomBytes(32).toString("base64url") }],
  coaches: [
    { id: "alex", name: "Alex" },
    { id: "narelle", name: "Narelle" },
    { id: "rob", name: "Rob" },
    { id: "jamie", name: "Jamie" },
    { id: "nico", name: "Nico" },
    { id: "nathan", name: "Nathan" },
    { id: "unassigned", name: "Unassigned" },
    { id: "not-coaching", name: "Not coaching" },
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
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null,
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
  const storedRefreshHealth = state.refreshHealth as
    | (NonNullable<typeof state.refreshHealth> & {
        failureAlertClaimedAt?: string | null;
        recoveryClaim?: {
          outageStartedAt: string;
          recoveredAt: string;
          claimedAt: string;
        } | null;
      })
    | undefined;
  return freezeTrackerState({
    players: state.players.map((player) => ({
      ...player,
      shareToken: player.shareToken ?? randomBytes(32).toString("base64url"),
    })),
    coaches: withSystemCoaches(state.coaches.map((coach) => ({ ...coach }))),
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
          failureAlertClaimedAt:
            storedRefreshHealth?.failureAlertClaimedAt ?? null,
          recoveryClaim: storedRefreshHealth?.recoveryClaim
            ? { ...storedRefreshHealth.recoveryClaim }
            : null,
        }
      : {
          consecutiveFailures: 0,
          alertThreshold,
          firstFailureAt: null,
          lastFailureAt: null,
          alertSentAt: null,
          failureAlertClaimedAt: null,
          pendingRecoveries: [],
          recoveryClaim: null,
        },
  });
}

async function getState(): Promise<ReadonlyTrackerState> {
  const { db, trackerStateTable } = await import("@workspace/db");
  const [row] = await db
    .select()
    .from(trackerStateTable)
    .where(eq(trackerStateTable.id, "main"));

  if (row) {
    const parsed = parsePersistedTrackerState(row.data);
    const normalized = normalizeState(parsed);
    if (parsed.players.some((player) => !player.shareToken)) {
      await saveState(cloneTrackerState(normalized));
    }
    return normalized;
  }

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

async function fetchClubLockerFeed(
  setup: WeeklySetup | null,
): Promise<{ feed: ReadonlyClubLockerFeed; reports: TournamentReport[] }> {
  // A custom feed URL, when set, takes precedence over reading tournament
  // draws directly; the refresh tests rely on this to stub the feed.
  const url = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  const drawsConfig = setup ? setupToDrawsConfig(setup) : drawsConfigFromEnv();
  if (!url && drawsConfig) {
    if (drawsConfig.rosterIds.size === 0) {
      throw new Error("Add the players to follow in Settings, then refresh");
    }
    const { feed, reports } = await fetchClubLockerDrawsDetailed(drawsConfig);
    return { feed: parseClubLockerFeed(feed), reports };
  }
  if (!url) {
    throw new Error(
      "No tournaments are set up yet. Add one in Settings, under This week",
    );
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
    return { feed: parseClubLockerFeed(await response.json()), reports: [] };
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

const NOTIFICATION_CLAIM_LEASE_MS = 30_000;

function isActiveNotificationClaim(claimedAt: string | null | undefined): boolean {
  if (!claimedAt) return false;
  const age = Date.now() - Date.parse(claimedAt);
  return Number.isFinite(age) && age >= 0 && age < NOTIFICATION_CLAIM_LEASE_MS;
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
  objectStorage?: Pick<ObjectStorageService, "saveObject" | "getObject" | "deleteObject"> &
    Partial<Pick<ObjectStorageService, "listVoiceNotesOlderThan">>;
  authorizeStaff?: RequestHandler;
  getSetup?: () => Promise<WeeklySetup>;
  saveSetup?: (setup: WeeklySetup) => Promise<void>;
  recoverInvalidState?: (request: {
    actorId: string;
    reason: string;
  }) => Promise<
    | { outcome: "recovered"; backupId: string; recoveredAt: string }
    | { outcome: "valid" }
    | { outcome: "missing" }
  >;
};

type RecoveryTransaction = {
  loadForUpdate: () => Promise<{ id: string; data: unknown } | undefined>;
  insertBackup: (backup: {
    id: string;
    trackerStateId: string;
    rejectedData: unknown;
    rejectionDetails: string;
    createdAt: Date;
  }) => Promise<void>;
  replaceState: (replacement: {
    trackerStateId: string;
    data: TrackerState;
    updatedAt: Date;
  }) => Promise<void>;
  insertAudit: (audit: {
    id: string;
    trackerStateId: string;
    backupId: string;
    actorId: string;
    reason: string;
    recoveredAt: Date;
  }) => Promise<void>;
};

export type RunRecoveryTransaction = <T>(
  operation: (transaction: RecoveryTransaction) => Promise<T>,
) => Promise<T>;

async function runDatabaseRecoveryTransaction<T>(
  operation: (transaction: RecoveryTransaction) => Promise<T>,
): Promise<T> {
  const {
    db,
    trackerRecoveryAuditTable,
    trackerStateBackupTable,
    trackerStateTable,
  } = await import("@workspace/db");
  return db.transaction(async (transaction) =>
    operation({
      loadForUpdate: async () => {
        const [row] = await transaction
          .select()
          .from(trackerStateTable)
          .where(eq(trackerStateTable.id, "main"))
          .for("update");
        return row;
      },
      insertBackup: async (backup) => {
        await transaction.insert(trackerStateBackupTable).values(backup);
      },
      replaceState: async (replacement) => {
        await transaction
          .update(trackerStateTable)
          .set({
            data: replacement.data,
            updatedAt: replacement.updatedAt,
          })
          .where(eq(trackerStateTable.id, replacement.trackerStateId));
      },
      insertAudit: async (audit) => {
        await transaction.insert(trackerRecoveryAuditTable).values(audit);
      },
    }),
  );
}

export async function recoverInvalidTrackerState({
  actorId,
  reason,
}: {
  actorId: string;
  reason: string;
}, runTransaction: RunRecoveryTransaction = runDatabaseRecoveryTransaction): Promise<
  | { outcome: "recovered"; backupId: string; recoveredAt: string }
  | { outcome: "valid" }
  | { outcome: "missing" }
> {
  return runTransaction(async (transaction) => {
    const row = await transaction.loadForUpdate();
    if (!row) return { outcome: "missing" };
    if (PersistedTrackerState.safeParse(row.data).success) {
      return { outcome: "valid" };
    }

    let rejectionDetails: string;
    try {
      parsePersistedTrackerState(row.data);
      throw new Error("Expected rejected tracker snapshot");
    } catch (error) {
      rejectionDetails =
        error instanceof Error ? error.message : "Unknown validation failure";
    }

    const backupId = randomUUID();
    const auditId = randomUUID();
    const recoveredAt = new Date();
    await transaction.insertBackup({
      id: backupId,
      trackerStateId: row.id,
      rejectedData: row.data,
      rejectionDetails,
      createdAt: recoveredAt,
    });
    await transaction.replaceState({
      trackerStateId: row.id,
      data: structuredClone(INITIAL_STATE),
      updatedAt: recoveredAt,
    });
    await transaction.insertAudit({
      id: auditId,
      trackerStateId: row.id,
      backupId,
      actorId,
      reason,
      recoveredAt,
    });
    return {
      outcome: "recovered",
      backupId,
      recoveredAt: recoveredAt.toISOString(),
    };
  });
}

function trackerResponse(state: ReadonlyTrackerState) {
  const pendingRecoveryNotices =
    state.refreshHealth.pendingRecoveries.length -
    (isActiveNotificationClaim(state.refreshHealth.recoveryClaim?.claimedAt)
      ? 1
      : 0);
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoPath: null },
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveryNotices: Math.max(0, pendingRecoveryNotices),
    },
  };
}

function trackerHealthResponse(state: ReadonlyTrackerState) {
  const pendingRecoveryNotices =
    state.refreshHealth.pendingRecoveries.length -
    (isActiveNotificationClaim(state.refreshHealth.recoveryClaim?.claimedAt)
      ? 1
      : 0);
  return {
    ...state.refreshHealth,
    pendingRecoveryNotices: Math.max(0, pendingRecoveryNotices),
  };
}

function isObjectPathReferenced(state: ReadonlyTrackerState, objectPath: string): boolean {
  return (state.branding?.logoPath ?? null) === objectPath ||
    state.matches.some((match) => match.report?.audioPath === objectPath);
}

export async function getSetupRow(): Promise<WeeklySetup> {
  const { db, trackerStateTable } = await import("@workspace/db");
  const [row] = await db
    .select()
    .from(trackerStateTable)
    .where(eq(trackerStateTable.id, "setup"));
  return row ? normalizeSetup(row.data) : emptySetup();
}

export async function saveSetupRow(setup: WeeklySetup): Promise<void> {
  const { db, trackerStateTable } = await import("@workspace/db");
  await db
    .insert(trackerStateTable)
    .values({ id: "setup", data: setup })
    .onConflictDoUpdate({
      target: trackerStateTable.id,
      set: { data: setup, updatedAt: new Date() },
    });
}

/** Give existing matches of one tournament their newly chosen coach. */
export async function applyTournamentCoachToMatches(
  tournamentId: string,
  next: { coachId: string; coachMode: "in-person" | "virtual" },
  previousCoachId: string | null,
): Promise<void> {
  await mutateStateInTransaction(async (loadLocked, saveLocked) => {
    await saveLocked(applyTournamentCoach(await loadLocked(), tournamentId, next, previousCoachId));
  });
}

export async function knownPlayers(): Promise<Array<{ id: string; name: string }>> {
  return (await getState()).players.map((player) => ({ id: player.id, name: player.name }));
}

export async function knownCoaches(): Promise<Array<{ id: string; name: string }>> {
  return (await getState()).coaches.map((coach) => ({ id: coach.id, name: coach.name }));
}

export function createTrackerRouter(
  dependencies: TrackerRouterDependencies = {
    getState,
    saveState,
    mutateState: mutateStateInTransaction,
    recoverInvalidState: recoverInvalidTrackerState,
    getSetup: getSetupRow,
    saveSetup: saveSetupRow,
  },
): IRouter {
  const router: IRouter = Router();
  const objectStorage = dependencies.objectStorage ?? new ObjectStorageService();
  const authorizeStaff = dependencies.authorizeStaff ?? requireStaff;
  const { getState: loadState, saveState: persistState } = dependencies;
  const recoverRejectedState =
    dependencies.recoverInvalidState ?? recoverInvalidTrackerState;
  let mutationQueue: Promise<void> = Promise.resolve();
  const VOICE_NOTE_CLEANUP_GRACE_MS = 24 * 60 * 60 * 1_000;

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

  async function cleanupUnattachedVoiceNotes(req: express.Request): Promise<void> {
    if (!objectStorage.listVoiceNotesOlderThan) return;
    let candidates: string[];
    try {
      candidates = await objectStorage.listVoiceNotesOlderThan(
        new Date(Date.now() - VOICE_NOTE_CLEANUP_GRACE_MS),
      );
    } catch (error) {
      req.log?.error({ err: error }, "Could not find unfinished coach voice notes");
      return;
    }

    for (const objectPath of candidates) {
      try {
        await coordinateMutation(async (loadLockedState) => {
          if (isObjectPathReferenced(await loadLockedState(), objectPath)) return;
          await objectStorage.deleteObject(objectPath);
        });
      } catch (error) {
        req.log?.error(
          { err: error, objectPath },
          "Could not remove unfinished coach voice note",
        );
      }
    }
  }

  router.get("/tracker", authorizeStaff, async (_req, res): Promise<void> => {
    res.json(GetTrackerResponse.parse(trackerResponse(await loadState())));
  });

  router.get("/tracker/health", authorizeStaff, async (_req, res): Promise<void> => {
    res.json(GetTrackerHealthResponse.parse(trackerHealthResponse(await loadState())));
  });

  router.post("/tracker/recover", authorizeStaff, async (req, res): Promise<void> => {
    const reason =
      typeof req.body?.reason === "string" ? req.body.reason.trim() : "";
    if (reason.length < 10 || reason.length > 500) {
      res.status(400).json({
        error: "Explain the recovery reason in 10 to 500 characters",
      });
      return;
    }
    const actorId = res.locals.staffUserId;
    if (typeof actorId !== "string" || actorId.length === 0) {
      req.log?.error("Approved staff identity was unavailable during recovery");
      res.status(500).json({ error: "Recovery could not identify the staff member" });
      return;
    }

    let result: Awaited<ReturnType<typeof recoverRejectedState>>;
    try {
      result = await recoverRejectedState({ actorId, reason });
    } catch (error) {
      req.log?.error(
        { err: error, actorId },
        "Could not back up and reset rejected tracker snapshot",
      );
      res.status(503).json({
        error: "Tracker recovery could not be completed safely",
      });
      return;
    }
    if (result.outcome === "valid") {
      res.status(409).json({
        error: "Recovery refused because the current tracker snapshot is valid",
      });
      return;
    }
    if (result.outcome === "missing") {
      res.status(409).json({
        error: "Recovery refused because there is no rejected tracker snapshot",
      });
      return;
    }
    req.log?.info(
      { actorId, backupId: result.backupId, reason },
      "Rejected tracker snapshot backed up and reset",
    );
    res.json(result);
  });

  router.get("/players/:shareToken/tracker", async (req, res): Promise<void> => {
    const params = GetPlayerTrackerParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    const state = await loadState();
    const player = state.players.find((item) => item.shareToken === params.data.shareToken);
    if (!player) {
      res.status(404).json({ error: "Player link not found" });
      return;
    }
    const matches = state.matches.filter((match) => match.playerId === player.id);
    const coachIds = new Set(matches.map((match) => match.coachId));
    res.json(GetPlayerTrackerResponse.parse({
      player: { id: player.id, name: player.name },
      matches,
      coaches: state.coaches.filter((coach) => coachIds.has(coach.id)),
      branding: state.branding,
      lastUpdatedAt: state.lastUpdatedAt,
    }));
  });

  router.post("/tracker/players/:playerId/share-token", authorizeStaff, async (req, res): Promise<void> => {
    const params = RotatePlayerShareTokenParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const player = state.players.find((item) => item.id === params.data.playerId);
      if (!player) {
        res.status(404).json({ error: "Player not found" });
        return;
      }
      player.shareToken = randomBytes(32).toString("base64url");
      await saveLockedState(state);
      res.json(RotatePlayerShareTokenResponse.parse(player));
    });
  });

  router.put("/tracker/settings", authorizeStaff, async (req, res): Promise<void> => {
    const body = SaveTrackerSettingsBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    const replacedLogoPath = await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const previousLogoPath = state.branding?.logoPath ?? null;
      const coaches = withSystemCoaches([...body.data.coaches]);
      const coachIds = new Set(coaches.map((coach) => coach.id));
      state.coaches = coaches;
      state.matches = state.matches.map((match) => {
        if (coachIds.has(match.coachId)) return match;
        const { coachMode: _dropped, ...rest } = match;
        return { ...rest, coachId: "unassigned" };
      });
      state.branding = body.data.branding;
      state.lastUpdatedAt = new Date().toISOString();
      await saveLockedState(state);
      res.json(SaveTrackerSettingsResponse.parse(trackerResponse(state)));
      return previousLogoPath && previousLogoPath !== state.branding.logoPath
        ? previousLogoPath
        : null;
    });
    if (replacedLogoPath) {
      await coordinateMutation(async (loadLockedState) => {
        const currentState = await loadLockedState();
        if (isObjectPathReferenced(currentState, replacedLogoPath)) return;
        try {
          await objectStorage.deleteObject(replacedLogoPath);
        } catch (error) {
          req.log.error({ err: error, objectPath: replacedLogoPath }, "Could not delete replaced tracker logo");
        }
      });
    }
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
        const objectPath = `/objects/uploads/logos/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type")!);
        res.json(UploadTrackerLogoResponse.parse({ objectPath }));
      } catch (error) {
        req.log.error({ err: error }, "Could not store tracker logo");
        res.status(500).json({ error: "Could not store tracker logo" });
      }
    },
  );

  router.delete("/tracker/logo", authorizeStaff, async (req, res): Promise<void> => {
    const body = DeleteUnusedTrackerLogoBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState) => {
      const state = await loadLockedState();
      if (!isObjectPathReferenced(state, body.data.objectPath)) {
        await objectStorage.deleteObject(body.data.objectPath);
      }
      res.status(204).end();
    });
  });

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
      // Picking a different coach resets the match to in-person unless the
      // request says otherwise.
      if (body.data.coachId !== undefined && body.data.coachMode === undefined) {
        delete match.coachMode;
      }
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

    const saved = await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return null;
      }
      if (match.status !== "completed") {
        res.status(400).json({ error: "Reports can only be added to completed matches" });
        return null;
      }

      const previousAudioPath = match.report?.audioPath ?? null;
      const nextAudioPath = body.data.audioPath ?? previousAudioPath;
      if (nextAudioPath && nextAudioPath !== previousAudioPath) {
        try {
          await objectStorage.getObject(nextAudioPath);
        } catch (error) {
          req.log.error(
            { err: error, objectPath: nextAudioPath, matchId: params.data.matchId },
            "Could not verify replacement coach voice note",
          );
          res.status(400).json({ error: "The replacement voice note is no longer available" });
          return null;
        }
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
      return {
        report: SaveCoachReportResponse.parse(match.report),
        replacedAudioPath:
          previousAudioPath && previousAudioPath !== match.report.audioPath
            ? previousAudioPath
            : null,
      };
    });
    if (!saved) return;

    if (saved.replacedAudioPath) {
      await coordinateMutation(async (loadLockedState) => {
        const currentState = await loadLockedState();
        const isStillReferenced = currentState.matches.some(
          (match) => match.report?.audioPath === saved.replacedAudioPath,
        );
        if (isStillReferenced) return;

        try {
          await objectStorage.deleteObject(saved.replacedAudioPath!);
        } catch (error) {
          req.log.error(
            { err: error, objectPath: saved.replacedAudioPath, matchId: params.data.matchId },
            "Could not remove replaced coach voice note",
          );
        }
      });
    }
    res.json(saved.report);
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
        await cleanupUnattachedVoiceNotes(req);
      } catch (error) {
        if (res.headersSent) return;
        req.log.error({ err: error }, "Could not store coach voice note");
        res.status(500).json({ error: "Could not store coach voice note" });
      }
    },
  );

  // The built-in timer refreshes without a signed-in person, using a secret
  // that only exists inside this process.
  const authorizeRefresh: RequestHandler = (req, res, next) => {
    if (req.header("x-scheduler-token") === SCHEDULER_TOKEN) {
      next();
      return;
    }
    authorizeStaff(req, res, next);
  };

  router.post("/tracker/refresh", authorizeRefresh, async (req, res): Promise<void> => {
    let setup: WeeklySetup | null = null;
    try {
      setup = (await dependencies.getSetup?.()) ?? null;
    } catch (error) {
      req.log?.warn({ err: error }, "Could not read the weekly setup; using Replit settings");
    }
    const alertThreshold = getAlertThreshold();
    const respondToFailure = async (error: unknown): Promise<void> => {
      const failure = await coordinateMutation(async (loadLockedState, saveLockedState) => {
        const failedState = recordRefreshFailure(
          await loadLockedState(),
          alertThreshold,
        );
        const shouldAlert =
          failedState.refreshHealth.consecutiveFailures >= alertThreshold &&
          failedState.refreshHealth.alertSentAt === null &&
          !isActiveNotificationClaim(
            failedState.refreshHealth.failureAlertClaimedAt,
          );
        const alertClaim = shouldAlert ? new Date().toISOString() : null;
        if (alertClaim) {
          failedState.refreshHealth.failureAlertClaimedAt = alertClaim;
        }
        await saveLockedState(failedState);
        return { failedState, alertClaim };
      });

      req.log.warn(
        {
          err: error,
          consecutiveFailures:
            failure.failedState.refreshHealth.consecutiveFailures,
          alertThreshold,
        },
        "Club Locker refresh failed",
      );

      if (failure.alertClaim) {
        try {
          await alertStaff(failure.failedState, error);
          await coordinateMutation(async (loadLockedState, saveLockedState) => {
            const current = cloneTrackerState(await loadLockedState());
            if (
              current.refreshHealth.failureAlertClaimedAt === failure.alertClaim
            ) {
              current.refreshHealth.alertSentAt = new Date().toISOString();
              current.refreshHealth.failureAlertClaimedAt = null;
              await saveLockedState(current);
            }
          });
          req.log.error(
            {
              consecutiveFailures:
                failure.failedState.refreshHealth.consecutiveFailures,
            },
            "Staff alerted about repeated Club Locker refresh failures",
          );
        } catch (alertError) {
          await coordinateMutation(async (loadLockedState, saveLockedState) => {
            const current = cloneTrackerState(await loadLockedState());
            if (
              current.refreshHealth.failureAlertClaimedAt === failure.alertClaim
            ) {
              current.refreshHealth.failureAlertClaimedAt = null;
              await saveLockedState(current);
            }
          });
          req.log.error(
            { err: alertError },
            "Could not alert staff about refresh failures",
          );
        }
      }

      const message =
        error instanceof Error ? error.message : "Unknown Club Locker error";
      res.status(502).json({ error: `Refresh failed: ${message}` });
    };

    let feed: ReadonlyClubLockerFeed;
    let reports: TournamentReport[] = [];
    try {
      ({ feed, reports } = await fetchClubLockerFeed(setup));
    } catch (error) {
      await respondToFailure(error);
      return;
    }

    let notificationState: ReadonlyTrackerState;
    try {
      notificationState = await coordinateMutation(
        async (loadLockedState, saveLockedState) => {
          const current = await loadLockedState();
          const merged = mergeClubLockerFeed(current, feed, setup ? coachDefaults(setup) : {});
          const state = isActiveNotificationClaim(
            current.refreshHealth.failureAlertClaimedAt,
          )
            ? merged
            : clearRefreshFailures(merged, alertThreshold);
          await saveLockedState(state);
          return state;
        },
      );
    } catch (error) {
      await respondToFailure(error);
      return;
    }

    if (setup && reports.length && dependencies.saveSetup) {
      try {
        await dependencies.saveSetup(applyReports(await (dependencies.getSetup?.() ?? Promise.resolve(setup)), reports));
      } catch (error) {
        req.log?.warn({ err: error }, "Could not save the tournament check results");
      }
    }

    while (true) {
      const claimed = await coordinateMutation(
        async (loadLockedState, saveLockedState) => {
          const current = await loadLockedState();
          const recovery = current.refreshHealth.pendingRecoveries[0];
          if (
            !recovery ||
            current.refreshHealth.consecutiveFailures > 0 ||
            isActiveNotificationClaim(
              current.refreshHealth.recoveryClaim?.claimedAt,
            )
          ) {
            return null;
          }
          const next = cloneTrackerState(current);
          const claimedAt = new Date().toISOString();
          next.refreshHealth.recoveryClaim = {
            outageStartedAt: recovery.outageStartedAt,
            recoveredAt: recovery.recoveredAt,
            claimedAt,
          };
          await saveLockedState(next);
          return { recovery: { ...recovery }, claimedAt };
        },
      );
      if (!claimed) break;

      try {
        await alertStaffOfRecovery(claimed.recovery);
        await coordinateMutation(async (loadLockedState, saveLockedState) => {
          const current = cloneTrackerState(await loadLockedState());
          if (current.refreshHealth.recoveryClaim?.claimedAt !== claimed.claimedAt) {
            return;
          }
          const index = current.refreshHealth.pendingRecoveries.findIndex(
            (item) =>
              item.outageStartedAt === claimed.recovery.outageStartedAt &&
              item.recoveredAt === claimed.recovery.recoveredAt,
          );
          if (index >= 0) current.refreshHealth.pendingRecoveries.splice(index, 1);
          current.refreshHealth.recoveryClaim = null;
          await saveLockedState(current);
        });
          req.log.info(
            {
              failedAttempts: claimed.recovery.failedAttempts,
              outageDurationMs: claimed.recovery.outageDurationMs,
            },
            "Staff alerted that Club Locker refresh recovered",
          );
      } catch (alertError) {
        await coordinateMutation(async (loadLockedState, saveLockedState) => {
          const current = cloneTrackerState(await loadLockedState());
          if (current.refreshHealth.recoveryClaim?.claimedAt === claimed.claimedAt) {
            current.refreshHealth.recoveryClaim = null;
            await saveLockedState(current);
          }
        });
          req.log.error(
            { err: alertError },
            "Could not alert staff about refresh recovery",
          );
        break;
      }
    }

    notificationState = await loadState();
    res.json(
      RefreshTrackerResponse.parse(trackerResponse(notificationState)),
    );
  });

  return router;
}

export default createTrackerRouter();