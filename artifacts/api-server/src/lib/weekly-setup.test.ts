import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import {
  applyReports,
  coachDefaults,
  createSetupRouter,
  emptySetup,
  isActive,
  normalizeSetup,
  parseTournamentRef,
  setupToDrawsConfig,
  type SetupTournament,
  type WeeklySetup,
} from "./weekly-setup.ts";
import { applyTournamentCoach, type TrackerState } from "./club-locker.ts";

const tournament = (overrides: Partial<SetupTournament> = {}): SetupTournament => ({
  id: "19518",
  name: null,
  dates: null,
  city: null,
  timeZone: "America/New_York",
  endsOn: null,
  coachId: "unassigned",
  coachMode: "in-person",
  check: null,
  ...overrides,
});

test("reads a tournament number from a link, a path or the bare number", () => {
  assert.equal(parseTournamentRef("https://www.clublocker.com/tournaments/19518"), "19518");
  assert.equal(parseTournamentRef("clublocker.com/tournaments/19518/draws?x=1"), "19518");
  assert.equal(parseTournamentRef(" 19518 "), "19518");
  assert.equal(parseTournamentRef("#19518"), "19518");
  assert.equal(parseTournamentRef("arlen specter"), null);
  assert.equal(parseTournamentRef(""), null);
});

test("events tuck away three days after they end", () => {
  const event = tournament({ endsOn: "2026-10-04" });
  assert.equal(isActive(event, new Date("2026-10-07T12:00:00Z")), true);
  assert.equal(isActive(event, new Date("2026-10-09T12:00:00Z")), false);
  assert.equal(isActive(tournament({ endsOn: null }), new Date("2030-01-01T00:00:00Z")), true);
});

test("an unreadable setup becomes empty and bad entries are skipped", () => {
  assert.deepEqual(normalizeSetup(null), emptySetup());
  const setup = normalizeSetup({
    tournaments: [{ id: "19518", coachId: "alex", coachMode: "virtual", timeZone: "Mars/Base" }, { id: "abc" }, { id: "19518" }],
    followedPlayerIds: ["111", "111", "x", 222],
  });
  assert.equal(setup.tournaments.length, 1);
  assert.equal(setup.tournaments[0]?.coachId, "alex");
  assert.equal(setup.tournaments[0]?.coachMode, "virtual");
  assert.equal(setup.tournaments[0]?.timeZone, "America/New_York");
  assert.deepEqual(setup.followedPlayerIds, ["111"]);
});

test("a setup with tournaments beats the Replit settings, and zones travel with it", () => {
  const setup: WeeklySetup = {
    tournaments: [
      tournament({ id: "100", timeZone: "America/Los_Angeles", endsOn: "2026-10-04" }),
      tournament({ id: "200", endsOn: "2026-01-01" }),
    ],
    followedPlayerIds: ["111"],
  };
  const config = setupToDrawsConfig(setup, { CLUB_LOCKER_TOURNAMENT_IDS: "999", CLUB_LOCKER_PLAYER_IDS: "222" }, new Date("2026-10-03T00:00:00Z"));
  assert.deepEqual(config?.tournamentIds, ["100"]);
  assert.deepEqual([...(config?.rosterIds ?? [])].sort(), ["111"]);
  assert.equal(config?.timeZones?.["100"], "America/Los_Angeles");

  const fallback = setupToDrawsConfig(emptySetup(), { CLUB_LOCKER_TOURNAMENT_IDS: "999", CLUB_LOCKER_PLAYER_IDS: "222" });
  assert.deepEqual(fallback?.tournamentIds, ["999"]);
  assert.deepEqual([...(fallback?.rosterIds ?? [])], ["222"]);
  assert.equal(setupToDrawsConfig(emptySetup(), {}), null);
});

test("only tournaments with a decided coach produce defaults", () => {
  const defaults = coachDefaults({
    tournaments: [tournament({ id: "1", coachId: "alex", coachMode: "virtual" }), tournament({ id: "2" })],
    followedPlayerIds: [],
  });
  assert.deepEqual(defaults, { "1": { coachId: "alex", coachMode: "virtual" } });
});

test("refresh findings are folded into the saved setup", () => {
  const next = applyReports(
    { tournaments: [tournament()], followedPlayerIds: [] },
    [{
      id: "19518",
      info: { name: "Arlen", dates: "Oct 3-4", city: "Philadelphia", timeZone: "America/New_York", endsOn: "2026-10-04" },
      check: { state: "ready", message: "ok", playersFound: 2, matches: 3 },
    }],
    new Date("2026-10-02T12:00:00Z"),
  );
  assert.equal(next.tournaments[0]?.name, "Arlen");
  assert.equal(next.tournaments[0]?.check?.playersFound, 2);
  assert.equal(next.tournaments[0]?.check?.checkedAt, "2026-10-02T12:00:00.000Z");
});

const baseState = (): TrackerState => ({
  players: [{ id: "p1", name: "P One" }],
  coaches: [{ id: "alex", name: "Alex" }, { id: "nico", name: "Nico" }, { id: "unassigned", name: "Unassigned" }, { id: "not-coaching", name: "Not coaching" }],
  matches: ["a", "b", "c", "d"].map((letter, index) => ({
    id: `m-${letter}`,
    externalId: `19518:${index}:p1`,
    playerId: "p1",
    opponent: "Opp",
    startsAt: `2026-10-0${3 + index}T14:00:00.000Z`,
    endsAt: `2026-10-0${3 + index}T14:45:00.000Z`,
    venue: "V",
    court: "Court 1",
    coachId: letter === "a" ? "unassigned" : letter === "b" ? "alex" : letter === "c" ? "nico" : "not-coaching",
    ...(letter === "d" ? { teammates: true } : {}),
    status: "upcoming" as const,
    result: null,
    report: null,
  })),
  lastUpdatedAt: "2026-10-02T12:00:00.000Z",
  source: "club-locker",
  refreshHealth: { consecutiveFailures: 0, alertThreshold: 3, firstFailureAt: null, lastFailureAt: null, alertSentAt: null, failureAlertClaimedAt: null, pendingRecoveries: [], recoveryClaim: null },
});

test("a tournament's new coach reaches undecided and previous-coach matches only", () => {
  const next = applyTournamentCoach(baseState(), "19518", { coachId: "nico", coachMode: "virtual" }, "alex");
  const by = Object.fromEntries(next.matches.map((match) => [match.id, match]));
  assert.equal(by["m-a"]?.coachId, "nico");
  assert.equal(by["m-a"]?.coachMode, "virtual");
  assert.equal(by["m-b"]?.coachId, "nico");
  assert.equal(by["m-c"]?.coachId, "nico");
  assert.equal(by["m-c"]?.coachMode, undefined);
  assert.equal(by["m-d"]?.coachId, "not-coaching");
  const other = applyTournamentCoach(baseState(), "99999", { coachId: "nico", coachMode: "in-person" }, null);
  assert.equal(other.matches[0]?.coachId, "unassigned");
});

async function withRouter(
  state: { setup: WeeklySetup },
  fetchJson: (path: string) => Promise<unknown>,
  applied: unknown[],
  run: (base: string) => Promise<void>,
): Promise<void> {
  const app = express();
  app.use(createSetupRouter({
    getSetup: async () => structuredClone(state.setup),
    saveSetup: async (setup) => { state.setup = structuredClone(setup); },
    getKnownPlayers: async () => [{ id: "111", name: "Known Kid" }],
    getCoaches: async () => [{ id: "alex", name: "Alex" }, { id: "nico", name: "Nico" }],
    applyTournamentCoach: async (...args) => { applied.push(args); },
    authorizeStaff: (_req, _res, next) => next(),
    fetchJson,
    now: () => new Date("2026-10-02T12:00:00Z"),
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

const draw = (id: string, hName: string, vName: string, hId: number, vId: number, time = "09:00 AM") => ({
  ResultID: id, Status: "S", SinglesDoubles: "s", hplayer1: hName, vplayer1: vName, wid1: hId, oid1: vId,
  matchdate: "10/03/2026", StartTime: time, CourtNumber: 2,
});

const fakeClubLocker = (path: string): Promise<unknown> => {
  const table: Record<string, unknown> = {
    "tournaments/19518": { Tournament_Id: 19518, Tournament_Name: "Arlen Silver", Start_Date: "2026-10-03T00:00:00", End_Date: "2026-10-04T00:00:00", venues: [{ ClubId: 7, IsMain: true }] },
    "res/clubs/7": { name: "Arlen Center", City: "Philadelphia", lat: "39.95", lng: "-75.18" },
    "tournaments/19518/divisionsandsections": [{ divisionId: 3, sections: [] }],
    "tournaments/19518/division/3/draws": [{ matches: [draw("1", "Kid, Known", "Other, Sam", 111, 222), draw("2", "Pal, Pat", "Rival, Ray", 333, 444, "10:00 AM")] }],
  };
  return path in table ? Promise.resolve(table[path]) : Promise.reject(new Error(`HTTP 404 for ${path}`));
};

test("check explains a tournament in plain words, and rejects a bad number", async () => {
  await withRouter({ setup: { tournaments: [], followedPlayerIds: ["111"] } }, fakeClubLocker, [], async (base) => {
    const ok = await fetch(`${base}/tracker/setup/check`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: "https://clublocker.com/tournaments/19518" }) });
    assert.equal(ok.status, 200);
    const body = await ok.json() as { name: string; dates: string; city: string; timeZone: string; check: { state: string; playersFound: number; matches: number } };
    assert.equal(body.name, "Arlen Silver");
    assert.equal(body.dates, "Oct 3-4");
    assert.equal(body.city, "Philadelphia");
    assert.equal(body.timeZone, "America/New_York");
    assert.equal(body.check.state, "ready");
    assert.equal(body.check.playersFound, 1);
    assert.equal(body.check.matches, 1);

    const bad = await fetch(`${base}/tracker/setup/check`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: "77777777" }) });
    assert.equal(bad.status, 422);
    assert.match(((await bad.json()) as { error: string }).error, /no tournament numbered 77777777/);

    const junk = await fetch(`${base}/tracker/setup/check`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: "hello" }) });
    assert.equal(junk.status, 400);
  });
});

test("players in a draw can be searched by name", async () => {
  await withRouter({ setup: emptySetup() }, fakeClubLocker, [], async (base) => {
    const all = await (await fetch(`${base}/tracker/setup/players?tournament=19518`)).json() as { drawPosted: boolean; players: Array<{ id: string; name: string }> };
    assert.equal(all.drawPosted, true);
    assert.deepEqual(all.players.map((player) => player.name), ["Known Kid", "Pat Pal", "Ray Rival", "Sam Other"]);
    const found = await (await fetch(`${base}/tracker/setup/players?tournament=19518&q=ray`)).json() as { players: Array<{ id: string }> };
    assert.deepEqual(found.players.map((player) => player.id), ["444"]);
  });
});

test("saving the setup validates coaches, applies a changed coach, and keeps hidden old events", async () => {
  const state = { setup: { tournaments: [tournament({ id: "5", endsOn: "2026-09-01", name: "Old event" })], followedPlayerIds: [] } as WeeklySetup };
  const applied: unknown[] = [];
  await withRouter(state, fakeClubLocker, applied, async (base) => {
    const put = (body: unknown) => fetch(`${base}/tracker/setup`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

    assert.equal((await put({ tournaments: [{ id: "19518", coachId: "ghost" }], followedPlayerIds: [] })).status, 400);
    assert.equal((await put({ tournaments: [{ id: "x" }], followedPlayerIds: [] })).status, 400);
    assert.equal((await put({ tournaments: [{ id: "19518", coachId: "alex", timeZone: "Mars/Base" }], followedPlayerIds: [] })).status, 400);

    const first = await put({ tournaments: [{ id: "19518", coachId: "alex", coachMode: "virtual", name: "Arlen Silver", endsOn: "2026-10-04" }], followedPlayerIds: ["111", "abc"] });
    assert.equal(first.status, 200);
    const shown = await first.json() as { tournaments: Array<{ id: string }>; followedPlayers: Array<{ id: string; name: string | null }> };
    assert.deepEqual(shown.tournaments.map((item) => item.id), ["19518"]);
    assert.deepEqual(shown.followedPlayers, [{ id: "111", name: "Known Kid" }]);
    assert.deepEqual(applied, [["19518", { coachId: "alex", coachMode: "virtual" }, null]]);
    assert.deepEqual(state.setup.tournaments.map((item) => item.id).sort(), ["19518", "5"]);

    applied.length = 0;
    assert.equal((await put({ tournaments: [{ id: "19518", coachId: "alex", coachMode: "virtual" }], followedPlayerIds: ["111"] })).status, 200);
    assert.deepEqual(applied, []);

    assert.equal((await put({ tournaments: [{ id: "19518", coachId: "nico", coachMode: "in-person" }], followedPlayerIds: ["111"] })).status, 200);
    assert.deepEqual(applied, [["19518", { coachId: "nico", coachMode: "in-person" }, "alex"]]);
  });
});
