import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import {
  createTrackerRouter,
  isLogoImage,
  parsePersistedTrackerState,
  recoverInvalidTrackerState,
  type RunRecoveryTransaction,
} from "./tracker.ts";
import type { TrackerState } from "../lib/club-locker.ts";
import { createRequireStaff } from "../middlewares/requireStaff.ts";
import { getClerkProxyHost } from "../middlewares/clerkProxyMiddleware.ts";

const healthyState = (): TrackerState => ({
  players: [{ id: "player-1", name: "Player One", shareToken: "a".repeat(43) }],
  coaches: [{ id: "coach-1", name: "Coach One" }],
  branding: { name: "StaitSquash", logoPath: null },
  matches: [],
  lastUpdatedAt: "2026-09-16T12:00:00.000Z",
  source: "club-locker",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 1,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null,
  },
});

test("logo validation checks actual bytes rather than claimed MIME type", () => {
  assert.equal(isLogoImage(Buffer.from("not an image"), "image/png"), false);
  assert.equal(
    isLogoImage(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), "image/png"),
    true,
  );
  assert.equal(isLogoImage(Buffer.alloc(5 * 1024 * 1024 + 1), "image/png"), false);
});

test("staff routes distinguish anonymous, unapproved, and approved accounts", async () => {
  const cases: Array<[string | null, boolean, number]> = [
    [null, false, 401],
    ["user_unapproved", false, 403],
    ["user_staff", true, 200],
  ];

  for (const [userId, approved, expectedStatus] of cases) {
    const state = healthyState();
    const app = express();
    app.use(express.json());
    app.use(createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async () => undefined,
      authorizeStaff: createRequireStaff({
        getUserId: () => userId,
        isApprovedStaff: async (candidate) => candidate === "user_staff" && approved,
      }),
    }));
    const server = app.listen(0, "127.0.0.1");
    await new Promise<void>((resolve, reject) => {
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const address = server.address();
    assert(address && typeof address !== "string");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/tracker`);
      assert.equal(response.status, expectedStatus);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => error ? reject(error) : resolve()),
      );
    }
  }
});

test("tracker recovery requires approved staff and records their identity", async () => {
  const calls: Array<{ actorId: string; reason: string }> = [];
  for (const [userId, approved, expectedStatus] of [
    [null, false, 401],
    ["user_unapproved", false, 403],
    ["user_staff", true, 200],
  ] as const) {
    const app = express();
    app.use(express.json());
    app.use(createTrackerRouter({
      getState: async () => healthyState(),
      saveState: async () => undefined,
      authorizeStaff: createRequireStaff({
        getUserId: () => userId,
        isApprovedStaff: async () => approved,
      }),
      recoverInvalidState: async (request) => {
        calls.push(request);
        return {
          outcome: "recovered",
          backupId: "backup-1",
          recoveredAt: "2026-09-16T12:00:00.000Z",
        };
      },
    }));
    const server = app.listen(0, "127.0.0.1");
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const address = server.address();
    assert(address && typeof address !== "string");
    try {
      const response = await fetch(
        `http://127.0.0.1:${address.port}/tracker/recover`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ reason: "Restore service after validation failure" }),
        },
      );
      assert.equal(response.status, expectedStatus);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => error ? reject(error) : resolve()),
      );
    }
  }
  assert.deepEqual(calls, [{
    actorId: "user_staff",
    reason: "Restore service after validation failure",
  }]);
});

test("tracker recovery validates its audit reason and refuses valid snapshots", async () => {
  let recoveryCalls = 0;
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = { info() {}, warn() {}, error() {} } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => healthyState(),
    saveState: async () => undefined,
    authorizeStaff: (_req, res, next) => {
      res.locals.staffUserId = "user_staff";
      next();
    },
    recoverInvalidState: async () => {
      recoveryCalls += 1;
      return { outcome: "valid" };
    },
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const base = `http://127.0.0.1:${address.port}/tracker/recover`;
    const invalidReason = await fetch(base, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason: "too short" }),
    });
    assert.equal(invalidReason.status, 400);
    assert.equal(recoveryCalls, 0);

    const validSnapshot = await fetch(base, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason: "Operator confirmed rejected saved data" }),
    });
    assert.equal(validSnapshot.status, 409);
    assert.match(
      String((await validSnapshot.json() as { error: string }).error),
      /current tracker snapshot is valid/,
    );
    assert.equal(recoveryCalls, 1);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("tracker recovery preserves the rejected snapshot before reset and audit", async () => {
  type RecoveryStorage = {
    row: { id: string; data: unknown } | undefined;
    backups: Array<{
      id: string;
      rejectedData: unknown;
      rejectionDetails: string;
    }>;
    audits: Array<{
      backupId: string;
      actorId: string;
      reason: string;
    }>;
  };
  const storage: RecoveryStorage = {
    row: {
      id: "main",
      data: {
        players: "rejected",
        diagnosticMarker: "keep-for-investigation",
      },
    },
    backups: [],
    audits: [],
  };
  const runTransaction: RunRecoveryTransaction = async (operation) => {
    const working = structuredClone(storage);
    const result = await operation({
      loadForUpdate: async () => working.row,
      insertBackup: async (backup) => {
        working.backups.push({
          id: backup.id,
          rejectedData: structuredClone(backup.rejectedData),
          rejectionDetails: backup.rejectionDetails,
        });
      },
      replaceState: async (replacement) => {
        assert(working.row);
        working.row.data = structuredClone(replacement.data);
      },
      insertAudit: async (audit) => {
        working.audits.push({
          backupId: audit.backupId,
          actorId: audit.actorId,
          reason: audit.reason,
        });
      },
    });
    Object.assign(storage, working);
    return result;
  };
  const result = await recoverInvalidTrackerState({
    actorId: "user_staff",
    reason: "Snapshot validation blocked staff access",
  }, runTransaction);
  assert.equal(result.outcome, "recovered");
  assert.equal(storage.backups.length, 1);
  assert.deepEqual(storage.backups[0]?.rejectedData, {
    players: "rejected",
    diagnosticMarker: "keep-for-investigation",
  });
  assert.match(
    storage.backups[0]?.rejectionDetails ?? "",
    /Stored tracker snapshot is invalid/,
  );
  assert(storage.row);
  assert.doesNotThrow(() => parsePersistedTrackerState(storage.row!.data));
  assert.deepEqual(storage.audits, [{
    backupId:
      result.outcome === "recovered" ? result.backupId : "unreachable",
    actorId: "user_staff",
    reason: "Snapshot validation blocked staff access",
  }]);
});

test("tracker recovery transaction rolls back if audit persistence fails", async () => {
  const originalData = {
    players: "rejected",
    diagnosticMarker: "must-survive",
  };
  const storage = {
    row: { id: "main", data: structuredClone(originalData) as unknown },
    backupCount: 0,
  };
  const runTransaction: RunRecoveryTransaction = async (operation) => {
    const working = structuredClone(storage);
    const result = await operation({
      loadForUpdate: async () => working.row,
      insertBackup: async () => {
        working.backupCount += 1;
      },
      replaceState: async (replacement) => {
        working.row.data = structuredClone(replacement.data);
      },
      insertAudit: async () => {
        throw new Error("audit unavailable");
      },
    });
    Object.assign(storage, working);
    return result;
  };
  await assert.rejects(
    recoverInvalidTrackerState({
      actorId: "user_staff",
      reason: "Snapshot validation blocked staff access",
    }, runTransaction),
    /audit unavailable/,
  );
  assert.deepEqual(storage.row.data, originalData);
  assert.equal(storage.backupCount, 0);
});

test("tracker recovery core refuses valid and missing locked snapshots", async () => {
  for (const [row, expected] of [
    [{ id: "main", data: healthyState() }, "valid"],
    [undefined, "missing"],
  ] as const) {
    let writeCount = 0;
    const runTransaction: RunRecoveryTransaction = async (operation) =>
      operation({
        loadForUpdate: async () => row,
        insertBackup: async () => { writeCount += 1; },
        replaceState: async () => { writeCount += 1; },
        insertAudit: async () => { writeCount += 1; },
      });
    const result = await recoverInvalidTrackerState({
      actorId: "user_staff",
      reason: "Snapshot validation blocked staff access",
    }, runTransaction);
    assert.equal(result.outcome, expected);
    assert.equal(writeCount, 0);
  }
});

test("tracker recovery returns a safe response when its transaction fails", async () => {
  const errors: unknown[] = [];
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = {
      info() {},
      warn() {},
      error(value: unknown) { errors.push(value); },
    } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => healthyState(),
    saveState: async () => undefined,
    authorizeStaff: (_req, res, next) => {
      res.locals.staffUserId = "user_staff";
      next();
    },
    recoverInvalidState: async () => {
      throw new Error("database unavailable");
    },
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/tracker/recover`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reason: "Snapshot validation blocked staff access",
        }),
      },
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Tracker recovery could not be completed safely",
    });
    assert.equal(errors.length, 1);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("Clerk proxy ignores spoofed forwarded hosts", () => {
  const previousDomains = process.env.REPLIT_DOMAINS;
  const previousNodeEnvironment = process.env.NODE_ENV;
  process.env.REPLIT_DOMAINS = "tracker.example.com";
  process.env.NODE_ENV = "production";
  try {
    assert.equal(
      getClerkProxyHost({
        headers: {
          host: "tracker.example.com",
          "x-forwarded-host": "attacker.example",
        },
      }),
      "tracker.example.com",
    );
    assert.equal(
      getClerkProxyHost({
        headers: {
          host: "attacker.example",
          "x-forwarded-host": "attacker.example",
        },
      }),
      undefined,
    );
  } finally {
    if (previousDomains === undefined) delete process.env.REPLIT_DOMAINS;
    else process.env.REPLIT_DOMAINS = previousDomains;
    if (previousNodeEnvironment === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnvironment;
  }
});

test("persisted tracker validation identifies malformed nested records", () => {
  const validState = healthyState();
  validState.branding = { name: "StaitSquash", logoPath: null };
  validState.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "match-1",
      observations: ["Strong length.", "Recovered well.", "Stayed composed."],
      transcript: null,
      audioPath: null,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];
  validState.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T09:00:00.000Z",
    recoveredAt: "2026-09-16T09:10:00.000Z",
    outageDurationMs: 600_000,
  }];

  const corruptions: Array<[string, (snapshot: Record<string, any>) => void, RegExp]> = [
    ["match", (snapshot) => {
      snapshot.matches[0].startsAt = "not-a-date";
    }, /matches\.0\.startsAt/],
    ["report", (snapshot) => {
      snapshot.matches[0].report.observations = "not-an-array";
    }, /matches\.0\.report\.observations/],
    ["person", (snapshot) => {
      snapshot.players[0].name = 42;
    }, /players\.0\.name/],
    ["branding", (snapshot) => {
      snapshot.branding.logoPath = "/unsafe/logo.png";
    }, /branding\.logoPath/],
    ["refresh health", (snapshot) => {
      snapshot.refreshHealth.consecutiveFailures = -1;
    }, /refreshHealth\.consecutiveFailures/],
    ["recovery", (snapshot) => {
      snapshot.refreshHealth.pendingRecoveries[0].failedAttempts = 0;
    }, /refreshHealth\.pendingRecoveries\.0\.failedAttempts/],
  ];

  for (const [name, corrupt, expectedPath] of corruptions) {
    const snapshot = structuredClone(validState) as unknown as Record<string, any>;
    corrupt(snapshot);
    assert.throws(
      () => parsePersistedTrackerState(snapshot),
      (error: Error) => {
        assert.match(error.message, /Stored tracker snapshot is invalid/);
        assert.match(error.message, /Repair or replace the "main" tracker_state record/);
        assert.match(error.message, expectedPath, name);
        return true;
      },
    );
  }
});

test("persisted tracker validation identifies inconsistent related records", () => {
  const validState = healthyState();
  validState.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "match-1",
      observations: ["Strong length.", "Recovered well.", "Stayed composed."],
      transcript: null,
      audioPath: null,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];

  const inconsistencies: Array<[
    string,
    (snapshot: Record<string, any>) => void,
    RegExp,
    RegExp,
  ]> = [
    ["missing player", (snapshot) => {
      snapshot.matches[0].playerId = "missing-player";
    }, /matches\.0\.playerId/, /Match "match-1" references missing player "missing-player"/],
    ["missing coach", (snapshot) => {
      snapshot.matches[0].coachId = "missing-coach";
    }, /matches\.0\.coachId/, /Match "match-1" references missing coach "missing-coach"/],
    ["mismatched report", (snapshot) => {
      snapshot.matches[0].report.matchId = "match-2";
    }, /matches\.0\.report\.matchId/, /Report matchId "match-2" does not match containing match "match-1"/],
    ["end before start", (snapshot) => {
      snapshot.matches[0].endsAt = "2026-09-16T09:59:59.000Z";
    }, /matches\.0\.endsAt/, /Match "match-1" endsAt must be after startsAt/],
    ["end equal to start", (snapshot) => {
      snapshot.matches[0].endsAt = snapshot.matches[0].startsAt;
    }, /matches\.0\.endsAt/, /Match "match-1" endsAt must be after startsAt/],
  ];

  for (const [name, corrupt, expectedPath, expectedConflict] of inconsistencies) {
    const snapshot = structuredClone(validState) as unknown as Record<string, any>;
    corrupt(snapshot);
    assert.throws(
      () => parsePersistedTrackerState(snapshot),
      (error: Error) => {
        assert.match(error.message, /Stored tracker snapshot is invalid/);
        assert.match(error.message, expectedPath, name);
        assert.match(error.message, expectedConflict, name);
        return true;
      },
    );
  }
});

async function withTrackerServer(
  state: TrackerState,
  run: (url: string) => Promise<void>,
): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = {
      info() {},
      warn() {},
      error() {},
    } as unknown as typeof req.log;
    next();
  });
  app.use(
    createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        state = structuredClone(next);
      },
      authorizeStaff: (_req, _res, next) => next(),
    }),
  );

  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("player tracker returns only the requested player's matches and assigned coaches", async () => {
  const state = healthyState();
  state.players = [
    { id: "player-1", name: "Player One", shareToken: "a".repeat(43) },
    { id: "player-2", name: "Player Two", shareToken: "b".repeat(43) },
  ];
  state.coaches = [
    { id: "coach-1", name: "Coach One" },
    { id: "coach-2", name: "Coach Two" },
    { id: "coach-private", name: "Private Coach" },
  ];
  state.branding = { name: "StaitSquash", logoPath: null };
  state.matches = [
    {
      id: "player-1-match",
      externalId: null,
      playerId: "player-1",
      opponent: "Visible Opponent",
      startsAt: "2026-09-17T10:00:00.000Z",
      endsAt: "2026-09-17T10:45:00.000Z",
      venue: "Visible Venue",
      court: "1",
      coachId: "coach-1",
      status: "upcoming",
      result: null,
      report: null,
    },
    {
      id: "player-1-second-match",
      externalId: null,
      playerId: "player-1",
      opponent: "Second Visible Opponent",
      startsAt: "2026-09-18T10:00:00.000Z",
      endsAt: "2026-09-18T10:45:00.000Z",
      venue: "Visible Venue",
      court: "2",
      coachId: "coach-2",
      status: "upcoming",
      result: null,
      report: null,
    },
    {
      id: "player-2-private-match",
      externalId: null,
      playerId: "player-2",
      opponent: "Private Opponent",
      startsAt: "2026-09-17T11:00:00.000Z",
      endsAt: "2026-09-17T11:45:00.000Z",
      venue: "Private Venue",
      court: "3",
      coachId: "coach-private",
      status: "upcoming",
      result: null,
      report: null,
    },
  ];

  await withTrackerServer(state, async (url) => {
    const response = await fetch(`${url}/players/${"a".repeat(43)}/tracker`);
    assert.equal(response.status, 200);
    const body = await response.json() as {
      player: { id: string };
      matches: Array<{ id: string; playerId: string }>;
      coaches: Array<{ id: string }>;
      players?: unknown;
    };

    assert.equal(body.player.id, "player-1");
    assert.deepEqual(body.matches.map((match) => match.id), [
      "player-1-match",
      "player-1-second-match",
    ]);
    assert.ok(body.matches.every((match) => match.playerId === "player-1"));
    assert.deepEqual(body.coaches.map((coach) => coach.id), ["coach-1", "coach-2"]);
    assert.equal(body.players, undefined);
    assert.doesNotMatch(JSON.stringify(body), /shareToken/);
    assert.doesNotMatch(JSON.stringify(body), /Player Two|Private Opponent|Private Coach|Private Venue/);
  });
});

test("unknown player tracker links return a safe not-found response", async () => {
  await withTrackerServer(healthyState(), async (url) => {
    const response = await fetch(`${url}/players/${"z".repeat(43)}/tracker`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Player link not found" });
  });
});

test("rotating a player share token immediately revokes the old link", async () => {
  const state = healthyState();
  const oldToken = state.players[0]!.shareToken!;

  await withTrackerServer(state, async (url) => {
    const rotatedResponse = await fetch(
      `${url}/tracker/players/player-1/share-token`,
      { method: "POST" },
    );
    assert.equal(rotatedResponse.status, 200);
    const rotatedPlayer = await rotatedResponse.json() as {
      id: string;
      shareToken: string;
    };
    assert.equal(rotatedPlayer.id, "player-1");
    assert.notEqual(rotatedPlayer.shareToken, oldToken);
    assert.ok(rotatedPlayer.shareToken.length >= 32);

    const oldLinkResponse = await fetch(`${url}/players/${oldToken}/tracker`);
    assert.equal(oldLinkResponse.status, 404);

    const newLinkResponse = await fetch(
      `${url}/players/${rotatedPlayer.shareToken}/tracker`,
    );
    assert.equal(newLinkResponse.status, 200);
  });
});

test("refresh route sends matching failure and recovery webhook payloads once", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    threshold: process.env["CLUB_LOCKER_ALERT_THRESHOLD"],
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const webhookPayloads: Record<string, unknown>[] = [];
  let scheduleFails = true;

  process.env["CLUB_LOCKER_ALERT_THRESHOLD"] = "1";
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      if (scheduleFails) return new Response("unavailable", { status: 503 });
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };

  try {
    await withTrackerServer(healthyState(), async (url) => {
      const failure = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(failure.status, 502);
      assert.equal(webhookPayloads.length, 1);

      const failurePayload = webhookPayloads[0]!;
      assert.equal(failurePayload.event, "club-locker-refresh-failing");
      assert.equal(failurePayload.consecutiveFailures, 1);
      assert.match(String(failurePayload.text), /failed 1 consecutive times/);
      assert.equal(typeof failurePayload.lastFailureAt, "string");

      const repeatedFailure = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(repeatedFailure.status, 502);
      assert.equal(webhookPayloads.length, 1);

      scheduleFails = false;
      const recovery = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(recovery.status, 200);
      assert.equal(webhookPayloads.length, 2);

      const recoveryPayload = webhookPayloads[1]!;
      assert.equal(recoveryPayload.event, "club-locker-refresh-recovered");
      assert.equal(recoveryPayload.failedAttempts, 2);
      assert.equal(typeof recoveryPayload.outageDurationMs, "number");
      assert.equal(typeof recoveryPayload.outageStartedAt, "string");
      assert.equal(typeof recoveryPayload.recoveredAt, "string");
      assert.equal(
        recoveryPayload.outageDurationMs,
        Date.parse(String(recoveryPayload.recoveredAt)) -
          Date.parse(String(recoveryPayload.outageStartedAt)),
      );
      assert.match(String(recoveryPayload.text), /2 failed attempts\./);

      const normalSuccess = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(normalSuccess.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_ALERT_THRESHOLD: originalEnvironment.threshold,
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("refresh route records feed merge rejection as a refresh failure", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    threshold: process.env["CLUB_LOCKER_ALERT_THRESHOLD"],
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const state = healthyState();
  state.matches = [{
    id: "local-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Local opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null,
  }];
  let webhookRequests = 0;

  process.env["CLUB_LOCKER_ALERT_THRESHOLD"] = "1";
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    if (String(input) === "https://schedule.test/feed") {
      return Response.json({
        matches: [{
          externalId: "external-match",
          playerId: "player-1",
          opponent: "Imported opponent",
          startsAt: "2026-09-16T10:30:00.000Z",
          endsAt: "2026-09-16T11:15:00.000Z",
          venue: "Venue",
          court: "Court 2",
        }],
      });
    }
    webhookRequests += 1;
    return new Response(null, { status: 204 });
  };

  try {
    await withTrackerServer(state, async (url) => {
      const response = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(response.status, 502);
      assert.match(
        String((await response.json() as { error: string }).error),
        /overlapping a retained match/,
      );

      const health = await originalFetch(`${url}/tracker/health`);
      assert.equal(health.status, 200);
      assert.equal(
        (await health.json() as { consecutiveFailures: number })
          .consecutiveFailures,
        1,
      );
      assert.equal(webhookRequests, 1);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_ALERT_THRESHOLD: originalEnvironment.threshold,
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("refresh route succeeds while a recovery webhook is retried until delivered", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const recovery = {
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T11:50:00.000Z",
    recoveredAt: "2026-09-16T12:00:00.000Z",
    outageDurationMs: 10 * 60_000,
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [recovery];
  const webhookPayloads: Record<string, unknown>[] = [];
  let webhookFails = true;

  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: webhookFails ? 503 : 204 });
    }
    return originalFetch(input, init);
  };

  try {
    await withTrackerServer(state, async (url) => {
      const failedDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(failedDelivery.status, 200);
      const failedDeliveryBody = await failedDelivery.json() as {
        refreshHealth: { pendingRecoveryNotices: number };
      };
      assert.equal(
        failedDeliveryBody.refreshHealth.pendingRecoveryNotices,
        1,
      );
      assert.equal(webhookPayloads.length, 1);
      assert.equal(webhookPayloads[0]?.event, "club-locker-refresh-recovered");
      assert.equal(webhookPayloads[0]?.failedAttempts, recovery.failedAttempts);

      webhookFails = false;
      const successfulRetry = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(successfulRetry.status, 200);
      const successfulRetryBody = await successfulRetry.json() as {
        refreshHealth: { pendingRecoveryNotices: number };
      };
      assert.equal(
        successfulRetryBody.refreshHealth.pendingRecoveryNotices,
        0,
      );
      assert.equal(webhookPayloads.length, 2);
      assert.deepEqual(webhookPayloads[1], webhookPayloads[0]);

      const afterDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(afterDelivery.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("tracker health reports queued recovery notice count", async () => {
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 60_000,
    },
    {
      failedAttempts: 1,
      outageStartedAt: "2026-09-16T11:00:00.000Z",
      recoveredAt: "2026-09-16T11:05:00.000Z",
      outageDurationMs: 5 * 60_000,
    },
  ];

  await withTrackerServer(state, async (url) => {
    const response = await fetch(`${url}/tracker`);
    assert.equal(response.status, 200);
    const body = await response.json() as {
      refreshHealth: { pendingRecoveryNotices: number };
    };
    assert.equal(
      body.refreshHealth.pendingRecoveryNotices,
      2,
    );
  });
});

test("refresh route delivers queued recoveries once in incident order", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 60_000,
    },
    {
      failedAttempts: 3,
      outageStartedAt: "2026-09-16T11:00:00.000Z",
      recoveredAt: "2026-09-16T11:15:00.000Z",
      outageDurationMs: 15 * 60_000,
    },
  ];
  const webhookPayloads: Record<string, unknown>[] = [];

  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };

  try {
    await withTrackerServer(state, async (url) => {
      const recovery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(recovery.status, 200);
      assert.deepEqual(
        webhookPayloads.map((payload) => payload.outageStartedAt),
        ["2026-09-16T10:00:00.000Z", "2026-09-16T11:00:00.000Z"],
      );

      const afterDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      assert.equal(afterDelivery.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("overlapping refresh requests deliver a queued recovery exactly once", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 60_000,
    },
  ];
  const webhookPayloads: Record<string, unknown>[] = [];
  let releaseWebhook!: () => void;
  const webhookBlocked = new Promise<void>((resolve) => {
    releaseWebhook = resolve;
  });
  let markWebhookStarted!: () => void;
  const webhookStarted = new Promise<void>((resolve) => {
    markWebhookStarted = resolve;
  });

  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      markWebhookStarted();
      await webhookBlocked;
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };

  try {
    await withTrackerServer(state, async (url) => {
      const firstRefresh = originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });
      await webhookStarted;
      const secondRefresh = originalFetch(`${url}/tracker/refresh`, {
        method: "POST",
      });

      await new Promise((resolve) => setTimeout(resolve, 20));
      assert.equal(webhookPayloads.length, 1);

      releaseWebhook();
      const responses = await Promise.all([firstRefresh, secondRefresh]);
      assert.deepEqual(responses.map((response) => response.status), [200, 200]);
      assert.equal(webhookPayloads.length, 1);

      const bodies = await Promise.all(
        responses.map(async (response) => response.json() as Promise<{
          refreshHealth: { pendingRecoveryNotices: number };
        }>),
      );
      assert.deepEqual(
        bodies.map((body) => body.refreshHealth.pendingRecoveryNotices),
        [0, 0],
      );
    });
  } finally {
    releaseWebhook();
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("slow schedule and webhook requests do not delay match edits", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"],
  };
  const state = healthyState();
  state.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null,
  }];
  state.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T09:00:00.000Z",
    recoveredAt: "2026-09-16T09:10:00.000Z",
    outageDurationMs: 10 * 60_000,
  }];

  let releaseSchedule!: () => void;
  const scheduleBlocked = new Promise<void>((resolve) => {
    releaseSchedule = resolve;
  });
  let markScheduleStarted!: () => void;
  const scheduleStarted = new Promise<void>((resolve) => {
    markScheduleStarted = resolve;
  });
  let releaseWebhook!: () => void;
  const webhookBlocked = new Promise<void>((resolve) => {
    releaseWebhook = resolve;
  });
  let markWebhookStarted!: () => void;
  const webhookStarted = new Promise<void>((resolve) => {
    markWebhookStarted = resolve;
  });

  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      markScheduleStarted();
      await scheduleBlocked;
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      markWebhookStarted();
      await webhookBlocked;
      return new Response(null, { status: 204 });
    }
    return originalFetch(input);
  };

  try {
    await withTrackerServer(state, async (url) => {
      const refresh = originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      await scheduleStarted;

      const editDuringSchedule = await originalFetch(`${url}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 2" }),
      });
      assert.equal(editDuringSchedule.status, 200);

      releaseSchedule();
      await webhookStarted;

      const editDuringWebhook = await originalFetch(`${url}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 3" }),
      });
      assert.equal(editDuringWebhook.status, 200);

      releaseWebhook();
      assert.equal((await refresh).status, 200);
    });
  } finally {
    releaseSchedule();
    releaseWebhook();
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("overlapping match edit and report save preserve both changes", async () => {
  let state = healthyState();
  state.matches = [
    {
      id: "match-1",
      externalId: null,
      playerId: "player-1",
      opponent: "Opponent",
      startsAt: "2026-09-16T10:00:00.000Z",
      endsAt: "2026-09-16T10:45:00.000Z",
      venue: "Venue",
      court: "Court 1",
      coachId: "coach-1",
      status: "completed",
      result: "Won 3-1",
      report: null,
    },
  ];

  let releaseFirstSave!: () => void;
  const firstSaveBlocked = new Promise<void>((resolve) => {
    releaseFirstSave = resolve;
  });
  let markFirstSaveStarted!: () => void;
  const firstSaveStarted = new Promise<void>((resolve) => {
    markFirstSaveStarted = resolve;
  });
  let saveCount = 0;

  const app = express();
  app.use(express.json());
  app.use(
    createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        saveCount += 1;
        if (saveCount === 1) {
          markFirstSaveStarted();
          await firstSaveBlocked;
        }
        state = structuredClone(next);
      },
      objectStorage: {
        saveObject: async () => undefined,
        getObject: async () => ({}) as never,
        deleteObject: async () => undefined,
      },
      authorizeStaff: (_req, _res, next) => next(),
    }),
  );

  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;

  try {
    const edit = fetch(`${url}/matches/match-1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ court: "Court 2" }),
    });
    await firstSaveStarted;

    const report = fetch(`${url}/matches/match-1/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: [
          "Controlled the middle well.",
          "Consistently recovered to the T.",
          "Kept good width under pressure.",
        ],
        transcript: "Stayed composed in the long rallies.",
        audioPath: "/objects/uploads/123e4567-e89b-12d3-a456-426614174000",
      }),
    });

    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(saveCount, 1);

    releaseFirstSave();
    const responses = await Promise.all([edit, report]);
    assert.deepEqual(responses.map((response) => response.status), [200, 200]);
    assert.equal(saveCount, 2);
    assert.equal(state.matches[0]?.court, "Court 2");
    assert.equal(
      state.matches[0]?.report?.observations[0],
      "Controlled the middle well.",
    );
    assert.equal(
      state.matches[0]?.report?.audioPath,
      "/objects/uploads/123e4567-e89b-12d3-a456-426614174000",
    );
  } finally {
    releaseFirstSave();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});

test("independent API instances coordinate overlapping tracker writes", async () => {
  let state = healthyState();
  state.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null,
  }];

  let transactionQueue = Promise.resolve();
  const mutateState = async <T,>(
    operation: (
      loadState: () => Promise<TrackerState>,
      saveState: (next: TrackerState) => Promise<void>,
    ) => Promise<T>,
  ): Promise<T> => {
    const previous = transactionQueue;
    let release!: () => void;
    transactionQueue = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await operation(
        async () => structuredClone(state),
        async (next) => {
          state = structuredClone(next);
        },
      );
    } finally {
      release();
    }
  };

  const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        state = structuredClone(next);
      },
      mutateState,
      authorizeStaff: (_req, _res, next) => next(),
    }));
    return app;
  };
  const servers = [createApp().listen(0, "127.0.0.1"), createApp().listen(0, "127.0.0.1")];
  await Promise.all(servers.map((server) => new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  })));
  const urls = servers.map((server) => {
    const address = server.address();
    assert(address && typeof address !== "string");
    return `http://127.0.0.1:${address.port}`;
  });

  try {
    const [edit, report] = await Promise.all([
      fetch(`${urls[0]}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 2" }),
      }),
      fetch(`${urls[1]}/matches/match-1/report`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observations: ["Strong length.", "Recovered to the T.", "Stayed composed."],
          transcript: "Good work under pressure.",
        }),
      }),
    ]);

    assert.deepEqual([edit.status, report.status], [200, 200]);
    assert.equal(state.matches[0]?.court, "Court 2");
    assert.equal(state.matches[0]?.report?.transcript, "Good work under pressure.");
  } finally {
    await Promise.all(servers.map((server) => new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    )));
  }
});

test("saving tracker settings deletes the replaced logo only after persistence", async () => {
  const previousLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: previousLogoPath };
  const events: string[] = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      events.push("persist");
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        events.push(`delete:${path}`);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: { name: "Club", logoPath: replacementLogoPath },
      }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(events, ["persist", `delete:${previousLogoPath}`]);
    assert.equal(state.branding?.logoPath, replacementLogoPath);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("replaced logo cleanup rechecks state after a concurrent settings save", async () => {
  const originalLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: originalLogoPath };
  let releaseFirstSave!: () => void;
  const firstSaveBlocked = new Promise<void>((resolve) => {
    releaseFirstSave = resolve;
  });
  let markFirstSaveStarted!: () => void;
  const firstSaveStarted = new Promise<void>((resolve) => {
    markFirstSaveStarted = resolve;
  });
  let saveCount = 0;
  const deleted: string[] = [];
  let markSecondRequestEntered!: () => void;
  const secondRequestEntered = new Promise<void>((resolve) => {
    markSecondRequestEntered = resolve;
  });
  let settingsRequestCount = 0;
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    if (req.method === "PUT" && req.path === "/tracker/settings") {
      settingsRequestCount += 1;
      if (settingsRequestCount === 2) markSecondRequestEntered();
    }
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      saveCount += 1;
      if (saveCount === 1) {
        markFirstSaveStarted();
        await firstSaveBlocked;
      }
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const saveSettings = (logoPath: string) => fetch(
    `http://127.0.0.1:${address.port}/tracker/settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: { name: "Club", logoPath },
      }),
    },
  );
  try {
    const firstSave = saveSettings(replacementLogoPath);
    await firstSaveStarted;
    const concurrentSave = saveSettings(originalLogoPath);
    await secondRequestEntered;
    releaseFirstSave();
    assert.equal((await firstSave).status, 200);
    assert.equal((await concurrentSave).status, 200);
    assert.equal(state.branding?.logoPath, originalLogoPath);
    assert.deepEqual(deleted, [replacementLogoPath]);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("unused logo cleanup retains the logo referenced by saved settings", async () => {
  const referencedLogoPath = "/objects/uploads/logos/11111111-1111-4111-8111-111111111111";
  const unusedLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: referencedLogoPath };
  const deleted: string[] = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => undefined,
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const cleanup = (objectPath: string) => fetch(`http://127.0.0.1:${address.port}/tracker/logo`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ objectPath }),
  });
  try {
    assert.equal((await cleanup(referencedLogoPath)).status, 204);
    assert.deepEqual(deleted, []);
    assert.equal((await cleanup(unusedLogoPath)).status, 204);
    assert.deepEqual(deleted, [unusedLogoPath]);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("replaced legacy logo cleanup retains an object still referenced by a coach report", async () => {
  const sharedObjectPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: sharedObjectPath };
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["First.", "Second.", "Third."],
      transcript: null,
      audioPath: sharedObjectPath,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];
  const deleted: string[] = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: {
          name: "Club",
          logoPath: "/objects/uploads/logos/22222222-2222-4222-8222-222222222222",
        },
      }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(deleted, []);
    assert.equal(state.matches[0]?.report?.audioPath, sharedObjectPath);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("failed tracker settings persistence retains the previously saved logo", async () => {
  const previousLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: previousLogoPath };
  const deleted: string[] = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => {
      throw new Error("database unavailable");
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: {
          name: "Club",
          logoPath: "/objects/uploads/logos/22222222-2222-4222-8222-222222222222",
        },
      }),
    });
    assert.equal(response.status, 500);
    assert.deepEqual(deleted, []);
    assert.equal(state.branding.logoPath, previousLogoPath);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("coach report audio upload stores bytes and returns its object path", async () => {
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null,
  }];
  const audio = Buffer.from("recorded voice note");
  const saved: Array<{ path: string; bytes: Buffer; contentType: string }> = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => undefined,
    objectStorage: {
      saveObject: async (path, bytes, contentType) => {
        saved.push({ path, bytes, contentType });
      },
      getObject: async () => {
        throw new Error("not used");
      },
      deleteObject: async () => undefined,
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: audio },
    );
    assert.equal(response.status, 200);
    const body = await response.json() as { objectPath: string };
    assert.match(body.objectPath, /^\/objects\/uploads\/[0-9a-f-]+$/);
    assert.equal(saved.length, 1);
    assert.equal(saved[0]?.path, body.objectPath);
    assert.deepEqual(saved[0]?.bytes, audio);
    assert.equal(saved[0]?.contentType, "audio/webm");
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});

test("audio upload removes only expired voice notes not referenced by current reports", async () => {
  const referencedPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const orphanedPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Stayed composed."],
      transcript: null,
      audioPath: referencedPath,
      updatedAt: "2026-09-15T10:00:00.000Z",
    },
  }];
  const deleted: string[] = [];
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = { error: () => undefined } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => undefined,
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      listVoiceNotesOlderThan: async () => [referencedPath, orphanedPath],
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "new note" },
    );
    assert.equal(response.status, 200);
    assert.deepEqual(deleted, [orphanedPath]);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("unfinished voice note cleanup failures are logged without failing upload", async () => {
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null,
  }];
  const logged: Array<[unknown, string]> = [];
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = {
      error: (details: unknown, message: string) => logged.push([details, message]),
    } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => undefined,
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      listVoiceNotesOlderThan: async () => {
        throw new Error("storage unavailable");
      },
      deleteObject: async () => undefined,
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "new note" },
    );
    assert.equal(response.status, 200);
    assert.equal(logged[0]?.[1], "Could not find unfinished coach voice notes");
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("replacing report audio deletes the previous object after persistence", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementAudioPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];
  const events: string[] = [];
  const storedObjects = new Set([previousAudioPath, replacementAudioPath]);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = { error: () => undefined } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      events.push("persist");
      Object.assign(state, structuredClone(next));
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async (path) => {
        if (!storedObjects.has(path)) throw new Error("not found");
        return {} as never;
      },
      deleteObject: async (path) => {
        events.push(`delete:${path}`);
        storedObjects.delete(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: replacementAudioPath,
      }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(events, ["persist", `delete:${previousAudioPath}`]);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);

    const staleResponse = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observations: ["Stale edit.", "Recovered to the T.", "Stayed composed."],
          audioPath: previousAudioPath,
        }),
      },
    );
    assert.equal(staleResponse.status, 400);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);
    assert.equal(storedObjects.has(replacementAudioPath), true);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("failed report persistence retains the previous voice note", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];
  const deleted: string[] = [];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => {
      throw new Error("database unavailable");
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async (path) => {
        deleted.push(path);
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: "/objects/uploads/22222222-2222-4222-8222-222222222222",
      }),
    });
    assert.equal(response.status, 500);
    assert.deepEqual(deleted, []);
    assert.equal(state.matches[0]?.report?.audioPath, previousAudioPath);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("voice note cleanup failure is logged without failing the saved report", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementAudioPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z",
    },
  }];
  const logged: Array<[unknown, string]> = [];
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = {
      error: (details: unknown, message: string) => logged.push([details, message]),
    } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      Object.assign(state, structuredClone(next));
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async () => {
        throw new Error("storage unavailable");
      },
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: replacementAudioPath,
      }),
    });
    assert.equal(response.status, 200);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);
    assert.equal(logged.length, 1);
    assert.equal(logged[0]?.[1], "Could not remove replaced coach voice note");
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("normal successful refresh sends no staff webhook", async () => {
  const originalFetch = globalThis.fetch;
  const originalScheduleUrl = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  const originalWebhookUrl = process.env["STAFF_ALERT_WEBHOOK_URL"];
  let webhookRequests = 0;

  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    if (String(input) === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    webhookRequests += 1;
    return new Response(null, { status: 204 });
  };

  try {
    await withTrackerServer(healthyState(), async (url) => {
      const response = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(response.status, 200);
      assert.equal(webhookRequests, 0);
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalScheduleUrl === undefined) delete process.env["CLUB_LOCKER_SCHEDULE_URL"];
    else process.env["CLUB_LOCKER_SCHEDULE_URL"] = originalScheduleUrl;
    if (originalWebhookUrl === undefined) delete process.env["STAFF_ALERT_WEBHOOK_URL"];
    else process.env["STAFF_ALERT_WEBHOOK_URL"] = originalWebhookUrl;
  }
});
test("coach mode: a new coach resets to in-person, Virtual sticks, and removed coaches fall back to Unassigned", async () => {
  let state = healthyState();
  state.coaches = [
    { id: "coach-1", name: "Coach One" },
    { id: "coach-2", name: "Coach Two" },
  ];
  state.matches = [
    {
      id: "match-1",
      externalId: null,
      playerId: "player-1",
      opponent: "Opponent",
      startsAt: "2026-09-16T10:00:00.000Z",
      endsAt: "2026-09-16T10:45:00.000Z",
      venue: "Venue",
      court: "Court 1",
      coachId: "coach-1",
      status: "upcoming",
      result: null,
      report: null,
    },
  ];
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => undefined,
      getObject: async () => ({}) as never,
      deleteObject: async () => undefined,
    },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  const send = (method: string, path: string, body: unknown) =>
    fetch(`${base}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  try {
    assert.equal((await send("PATCH", "/matches/match-1", { coachMode: "virtual" })).status, 200);
    assert.equal(state.matches[0]?.coachMode, "virtual");
    assert.equal(state.matches[0]?.coachId, "coach-1");

    assert.equal((await send("PATCH", "/matches/match-1", { coachId: "coach-2" })).status, 200);
    assert.equal(state.matches[0]?.coachId, "coach-2");
    assert.equal(state.matches[0]?.coachMode, undefined);

    await send("PATCH", "/matches/match-1", { coachMode: "virtual" });
    assert.equal(state.matches[0]?.coachMode, "virtual");

    const saved = await send("PUT", "/tracker/settings", {
      coaches: [{ id: "coach-1", name: "Coach One" }],
      branding: { name: "StaitSquash", logoPath: null },
    });
    assert.equal(saved.status, 200);
    assert.deepEqual(
      state.coaches.map((coach) => coach.id),
      ["coach-1", "unassigned", "not-coaching"],
    );
    assert.equal(state.matches[0]?.coachId, "unassigned");
    assert.equal(state.matches[0]?.coachMode, undefined);

    assert.equal((await send("PATCH", "/matches/match-1", { coachId: "not-coaching" })).status, 200);
    assert.equal(state.matches[0]?.coachId, "not-coaching");
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});

test("removing a player deletes their matches, stops following them, and 404s for unknown players", async () => {
  let state = healthyState();
  state.players = [
    { id: "p1", name: "Kid One", shareToken: "a".repeat(43) },
    { id: "p2", name: "Kid Two", shareToken: "b".repeat(43) },
  ];
  const match = (id: string, playerId: string) => ({
    id,
    externalId: null,
    playerId,
    opponent: "Opp",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "V",
    court: "Court 1",
    coachId: "coach-1",
    status: "upcoming" as const,
    result: null,
    report: null,
  });
  state.matches = [match("m1", "p1"), match("m2", "p1"), match("m3", "p2")];
  let setup = { tournaments: [], followedPlayerIds: ["p1", "p2"] };
  const app = express();
  app.use(express.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => { state = structuredClone(next); },
    getSetup: async () => structuredClone(setup),
    saveSetup: async (next) => { setup = structuredClone(next) as typeof setup; },
    objectStorage: { saveObject: async () => undefined, getObject: async () => ({}) as never, deleteObject: async () => undefined },
    authorizeStaff: (_req, _res, next) => next(),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  const address = server.address();
  assert(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  try {
    const gone = await fetch(`${base}/tracker/players/p1`, { method: "DELETE" });
    assert.equal(gone.status, 200);
    assert.deepEqual(state.players.map((player) => player.id), ["p2"]);
    assert.deepEqual(state.matches.map((item) => item.id), ["m3"]);
    assert.deepEqual(setup.followedPlayerIds, ["p2"]);
    assert.equal((await fetch(`${base}/tracker/players/nobody`, { method: "DELETE" })).status, 404);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
