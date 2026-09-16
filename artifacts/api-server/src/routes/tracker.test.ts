import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import { createTrackerRouter } from "./tracker.ts";
import type { TrackerState } from "../lib/club-locker.ts";

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
    pendingRecovery: null,
  },
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