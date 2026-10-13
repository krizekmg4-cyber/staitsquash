import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import test from "node:test";
import express from "express";
import { createTrackerRouter, parsePersistedTrackerState } from "./tracker.js";
import type { TrackerState } from "../lib/club-locker.js";

test("coaches can save and reload one comment, transcript-only and voice-only reports without losing legacy reports", async () => {
  const token = "a".repeat(43);
  const voicePath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  let state: TrackerState = {
    players: [{ id: "player-1", name: "Test Player", shareToken: token }],
    coaches: [{ id: "coach-1", name: "Test Coach" }],
    branding: { name: "StaitSquash", logoPath: null },
    matches: [{
      id: "completed-1", externalId: null, playerId: "player-1", opponent: "Opponent",
      startsAt: "2026-10-10T15:00:00Z", endsAt: "2026-10-10T15:45:00Z",
      venue: "Test Venue", court: "1", coachId: "coach-1", status: "completed", result: "3-1",
      report: { matchId: "completed-1", observations: ["First", "Second", "Third"], transcript: null, audioPath: null, updatedAt: "2026-10-10T16:00:00Z" },
    }],
    lastUpdatedAt: "2026-10-10T16:00:00Z", source: "club-locker",
    refreshHealth: { consecutiveFailures: 0, alertThreshold: 3, firstFailureAt: null, lastFailureAt: null, alertSentAt: null, failureAlertClaimedAt: null, pendingRecoveries: [], recoveryClaim: null },
  };
  let writes = 0;
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.log = { error() {}, warn() {}, info() {} } as unknown as typeof req.log;
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => {
      parsePersistedTrackerState(state);
      return structuredClone(state);
    },
    saveState: async (next) => {
      parsePersistedTrackerState(next);
      state = structuredClone(next);
      writes += 1;
    },
    authorizeTracker: (_req, res, next) => { res.locals.trackerRole = "coach"; next(); },
    objectStorage: {
      getObject: async (path) => {
        assert.equal(path, voicePath);
        return {} as never;
      },
      saveObject: async () => undefined,
      deleteObject: async () => undefined,
    },
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const save = (body: unknown) => fetch(`${base}/matches/completed-1/report`, {
    method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
  try {
    const original = structuredClone(state);
    for (const body of [
      { observations: [], transcript: null, audioPath: null },
      { observations: ["   "], transcript: "  " },
      { observations: ["1", "2", "3", "4"] },
      { observations: [], audioPath: "/unsafe/audio.webm" },
    ]) {
      assert.equal((await save(body)).status, 400);
      assert.equal(writes, 0);
      assert.deepEqual(state, original);
    }

    for (const body of [
      { observations: ["  Good movement  "], transcript: null, audioPath: null },
      { observations: [], transcript: "  Keep moving forward  ", audioPath: null },
      { observations: [], transcript: null, audioPath: voicePath },
    ]) {
      const response = await save(body);
      assert.equal(response.status, 200);
      const report = await response.json() as { observations: string[]; transcript: string | null; audioPath: string | null };
      assert.deepEqual(report.observations, body.observations.map((item) => item.trim()));
      assert.equal(report.transcript, body.transcript?.trim() || null);
      assert.equal(report.audioPath, body.audioPath);
      for (const path of ["/tracker", `/players/${token}/tracker`]) {
        const reload = await fetch(`${base}${path}`);
        assert.equal(reload.status, 200);
        const board = await reload.json() as { matches: Array<{ report: typeof report }> };
        assert.deepEqual(board.matches[0].report, report);
      }
    }
    assert.equal(writes, 3);
    assert.deepEqual(original.matches[0].report?.observations, ["First", "Second", "Third"]);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
