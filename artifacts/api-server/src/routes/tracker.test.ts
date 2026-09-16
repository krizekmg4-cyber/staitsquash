import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import {
  createTrackerRouter,
  isLogoImage,
  parsePersistedTrackerState,
} from "./tracker.ts";
import type { TrackerState } from "../lib/club-locker.ts";
import { createRequireStaff } from "../middlewares/requireStaff.ts";
import { getClerkProxyHost } from "../middlewares/clerkProxyMiddleware.ts";

const healthyState = (): TrackerState => ({
  players: [{ id: "player-1", name: "Player One" }],
  coaches: [{ id: "coach-1", name: "Coach One" }],
  matches: [],
  lastUpdatedAt: "2026-09-16T12:00:00.000Z",
  source: "club-locker",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 1,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    pendingRecoveries: [],
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