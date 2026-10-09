import assert from "node:assert/strict";
import test from "node:test";
import express, { type Express } from "express";
import { createCoachAccessRouter } from "./coach-access.js";
import { createTrackerRouter } from "./tracker.js";
import { createRequireStaff, createRequireTrackerAccess, type TrackerRole } from "../middlewares/requireStaff.js";
import type { TrackerState } from "../lib/club-locker.js";
import { createSetupRouter, emptySetup } from "../lib/weekly-setup.js";

async function withServer(app: Express, run: (url: string) => Promise<void>) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

function account(id: string, role: string | null = null, verified = true) {
  return {
    id, firstName: "Test", lastName: "Coach", banned: false, locked: false,
    publicMetadata: { role, unrelated: "preserve" } as Record<string, unknown>,
    emailAddresses: [{ emailAddress: `${id}@example.com`, verification: { status: verified ? "verified" : "unverified" } }],
  };
}

function fixture() {
  const users = [account("user_staff", "staff"), account("user_coach", "coach"), account("user_new"), account("user_unverified", null, false)];
  let caller: string | null = "user_staff";
  const find = (id: string) => {
    const user = users.find((item) => item.id === id);
    if (!user) throw new Error("Not found");
    return user;
  };
  const getRole = async (id: string): Promise<TrackerRole | null> => {
    const user = find(id);
    if (user.banned || user.locked) return null;
    return user.publicMetadata.role === "staff" || user.publicMetadata.role === "coach" ? user.publicMetadata.role : null;
  };
  const staff = createRequireStaff({ getUserId: () => caller, isApprovedStaff: async (id) => await getRole(id) === "staff" });
  const tracker = createRequireTrackerAccess({ getUserId: () => caller, getRole });
  const app = express();
  app.use(express.json());
  app.use(createCoachAccessRouter({
    authorizeStaff: staff, authorizeTracker: tracker, isConfiguredStaff: () => false,
    directory: {
      list: async (offset) => ({ data: users.slice(offset, offset + 2), totalCount: users.length }),
      findByEmail: async (email) => users.filter((item) => item.emailAddresses.some((address) => address.emailAddress === email)),
      get: async (id) => find(id),
      setRole: async (id, role) => { find(id).publicMetadata.role = role; },
    },
  }));
  return { app, users, staff, tracker, caller: (id: string | null) => { caller = id; } };
}

test("coach approval requires a verified existing account and preserves unrelated metadata", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    const approve = (email: string) => fetch(`${url}/coach-access`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
    });
    assert.equal((await approve("bad")).status, 400);
    assert.equal((await approve("missing@example.com")).status, 404);
    assert.equal((await approve("user_unverified@example.com")).status, 404);
    assert.equal((await approve("user_staff@example.com")).status, 409);
    const response = await approve(" USER_NEW@EXAMPLE.COM ");
    assert.equal(response.status, 200);
    assert.equal((await response.json() as { id: string }).id, "user_new");
    assert.deepEqual(f.users[2].publicMetadata, { role: "coach", unrelated: "preserve" });
    const list = await (await fetch(`${url}/coach-access`)).json() as { coaches: Array<{ id: string }> };
    assert.deepEqual(list.coaches.map((item: { id: string }) => item.id), ["user_coach", "user_new"]);
    f.caller("user_new");
    assert.deepEqual(await (await fetch(`${url}/tracker/access`)).json(), { role: "coach" });
  });
});

test("only staff can manage coach approvals and revocation takes effect on the next request", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    f.caller(null);
    assert.equal((await fetch(`${url}/tracker/access`)).status, 401);
    f.caller("user_new");
    assert.equal((await fetch(`${url}/tracker/access`)).status, 403);
    f.caller("user_coach");
    const access = await fetch(`${url}/tracker/access`);
    assert.equal(access.headers.get("cache-control"), "no-store");
    assert.equal(access.status, 200);
    for (const method of ["GET", "POST", "DELETE"]) {
      const path = method === "DELETE" ? "/coach-access/user_new" : "/coach-access";
      assert.equal((await fetch(`${url}${path}`, { method })).status, 403);
    }
    f.caller("user_staff");
    assert.equal((await fetch(`${url}/coach-access/user_staff`, { method: "DELETE" })).status, 409);
    assert.equal((await fetch(`${url}/coach-access/user_coach`, { method: "DELETE" })).status, 204);
    assert.equal(f.users[1].publicMetadata.unrelated, "preserve");
    f.caller("user_coach");
    assert.equal((await fetch(`${url}/tracker/access`)).status, 403);
  });
});

test("blocked accounts and configured staff cannot be granted or stripped of coach access", async () => {
  const f = fixture();
  f.users[2].banned = true;
  await withServer(f.app, async (url) => {
    const response = await fetch(`${url}/coach-access`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "user_new@example.com" }),
    });
    assert.equal(response.status, 409);
    assert.equal(f.users[2].publicMetadata.role, null);
  });
  const app = express();
  app.use(express.json());
  app.use(createCoachAccessRouter({
    authorizeStaff: f.staff,
    isConfiguredStaff: () => true,
    directory: {
      list: async () => ({ data: [f.users[1]], totalCount: 1 }),
      findByEmail: async () => [f.users[1]],
      get: async () => f.users[1],
      setRole: async () => { assert.fail("Configured staff must never be modified"); },
    },
  }));
  await withServer(app, async (url) => {
    assert.equal((await fetch(`${url}/coach-access/user_coach`, { method: "DELETE" })).status, 409);
    assert.equal((await fetch(`${url}/coach-access`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "user_coach@example.com" }) })).status, 409);
    assert.deepEqual(await (await fetch(`${url}/coach-access`)).json(), { coaches: [] });
  });
});

test("coach access permits feedback on all completed matches but forbids tracker administration", async () => {
  const f = fixture();
  f.caller("user_coach");
  const state: TrackerState = {
    players: [{ id: "player-1", name: "Player One", shareToken: "a".repeat(43) }],
    coaches: [{ id: "another-coach", name: "Another Coach" }],
    matches: [{
      id: "completed", externalId: null, playerId: "player-1", opponent: "Opponent",
      startsAt: "2026-10-10T09:00:00.000Z", endsAt: "2026-10-10T10:00:00.000Z",
      venue: "Venue", court: "1", coachId: "another-coach", status: "completed", result: "3–1", report: null,
    }],
    branding: { name: "StaitSquash", logoPath: null },
    lastUpdatedAt: "2026-10-10T10:00:00.000Z", source: "club-locker",
    refreshHealth: {
      consecutiveFailures: 0, alertThreshold: 3, firstFailureAt: null, lastFailureAt: null,
      alertSentAt: null, failureAlertClaimedAt: null, pendingRecoveries: [], recoveryClaim: null,
    },
  };
  let uploads = 0;
  f.app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => { Object.assign(state, next); },
    authorizeStaff: f.staff, authorizeTracker: f.tracker,
    objectStorage: {
      saveObject: async () => { uploads++; },
      getObject: async () => ({} as never),
      deleteObject: async () => undefined,
    },
  }));
  const original = structuredClone(state);
  f.app.use(createSetupRouter({
    getSetup: async () => emptySetup(),
    saveSetup: async () => assert.fail("Coach must not change setup"),
    getKnownPlayers: async () => [],
    getCoaches: async () => [],
    applyTournamentCoach: async () => assert.fail("Coach must not change assignments"),
    authorizeStaff: f.staff,
  }));
  await withServer(f.app, async (url) => {
    const board = await (await fetch(`${url}/tracker`)).json() as TrackerState;
    assert.equal(board.matches[0].coachId, "another-coach");
    assert.equal(board.players[0].shareToken, "");
    assert.equal(state.players[0].shareToken, original.players[0].shareToken);
    assert.equal((await fetch(`${url}/tracker/health`)).status, 200);
    for (const [method, path] of [
      ["PATCH", "/matches/completed"], ["PUT", "/tracker/settings"],
      ["POST", "/tracker/refresh"], ["POST", "/tracker/recover"],
      ["POST", "/tracker/players/player-1/share-token"], ["DELETE", "/tracker/players/player-1"],
      ["POST", "/tracker/logo"], ["DELETE", "/tracker/logo"],
      ["GET", "/tracker/setup"], ["PUT", "/tracker/setup"],
      ["POST", "/tracker/setup/check"], ["GET", "/tracker/setup/players"],
      ["GET", "/tracker/setup/search"],
    ]) assert.equal((await fetch(`${url}${path}`, { method })).status, 403, `${method} ${path}`);
    assert.deepEqual(state, original);
    const upload = await fetch(`${url}/matches/completed/report/audio`, { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "test audio" });
    assert.equal(upload.status, 200);
    const { objectPath } = await upload.json() as { objectPath: string };
    assert.equal(uploads, 1);
    const saved = await fetch(`${url}/matches/completed/report`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observations: ["Good movement", "Watch the backhand", "Stay patient"], transcript: "Well played", audioPath: objectPath }),
    });
    assert.equal(saved.status, 200);
    assert.equal(state.matches[0].report?.audioPath, objectPath);
    assert.equal(state.matches[0].coachId, "another-coach");
    assert.equal(state.matches[0].result, "3–1");
    state.matches[0].status = "upcoming";
    assert.equal((await fetch(`${url}/matches/completed/report/audio`, { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "test" })).status, 400);
    assert.equal((await fetch(`${url}/matches/completed/report`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ observations: ["One", "Two", "Three"] }) })).status, 400);
    f.caller("user_staff");
    assert.equal((await fetch(`${url}/coach-access/user_coach`, { method: "DELETE" })).status, 204);
    f.caller("user_coach");
    assert.equal((await fetch(`${url}/tracker`)).status, 403);
    assert.equal((await fetch(`${url}/matches/completed/report`, { method: "PUT" })).status, 403);
    assert.equal((await fetch(`${url}/matches/completed/report/audio`, { method: "POST" })).status, 403);
  });
});

test("account lookup and authorization failures fail closed", async () => {
  const app = express();
  app.use(createCoachAccessRouter({
    authorizeTracker: createRequireTrackerAccess({ getUserId: () => "user_coach", getRole: async () => { throw new Error("Unavailable"); } }),
    authorizeStaff: (_req, _res, next) => next(),
    directory: {
      list: async () => { throw new Error("Unavailable"); },
      get: async () => { throw new Error("Unavailable"); },
      findByEmail: async () => { throw new Error("Unavailable"); },
      setRole: async () => assert.fail("Unavailable account must never be modified"),
    },
  }));
  await withServer(app, async (url) => {
    assert.equal((await fetch(`${url}/tracker/access`)).status, 503);
    assert.equal((await fetch(`${url}/coach-access`)).status, 503);
  });
});
