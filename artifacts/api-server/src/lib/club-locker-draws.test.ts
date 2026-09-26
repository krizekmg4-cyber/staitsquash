import assert from "node:assert/strict";
import test from "node:test";
import {
  courtAndVenue,
  displayName,
  drawsConfigFromEnv,
  drawsToFeed,
  fetchClubLockerDraws,
  localStartToIso,
  parseVenueCodes,
  resultFor,
  type DrawMatch,
  type TournamentDraws,
} from "./club-locker-draws.ts";
import { mergeClubLockerFeed, parseClubLockerFeed, type TrackerState } from "./club-locker.ts";

// Shapes mirror api.ussquash.com draw records; players are made up.
const draw = (overrides: DrawMatch = {}): DrawMatch => ({
  ResultID: 5001,
  Status: "S",
  SinglesDoubles: "s",
  hplayer1: "Rivera, Sam ",
  vplayer1: "Okafor, Theo ",
  wid1: 111,
  oid1: 222,
  matchdate: "09/26/2026",
  StartTime: "11:30 AM",
  CourtNumber: "4",
  courtName: null,
  winner: "H",
  Score: "",
  ...overrides,
});

const tournament = (matches: DrawMatch[], overrides: Partial<TournamentDraws> = {}): TournamentDraws => ({
  tournamentId: "19515",
  venueName: "Brunswick School",
  venueCodes: null,
  matches,
  ...overrides,
});

const roster = new Set(["111"]);

test("formats Club Locker last-first names", () => {
  assert.equal(displayName("Rivera, Sam "), "Sam Rivera");
  assert.equal(displayName("Madonna"), "Madonna");
});

test("resolves wall-clock start times into the tournament timezone", () => {
  assert.equal(localStartToIso("09/26/2026", "11:30 AM", "America/New_York"), "2026-09-26T11:30:00-04:00");
  assert.equal(localStartToIso("12/20/2025", "08:00 AM", "America/New_York"), "2025-12-20T08:00:00-05:00");
  assert.equal(localStartToIso("12/20/2025", "12:05 PM", "America/Los_Angeles"), "2025-12-20T12:05:00-08:00");
  assert.equal(localStartToIso("12/20/2025", "12:40 AM", "America/New_York"), "2025-12-20T00:40:00-05:00");
  assert.equal(localStartToIso("", "11:30 AM", "America/New_York"), null);
  assert.equal(localStartToIso("09/26/2026", "", "America/New_York"), null);
});

test("maps prefixed court codes to the venue listed on the tournament", () => {
  const codes = parseVenueCodes("ASC=Specter Center,   PEN=University of Pennsylvania, VAR=SCH(Vare)");
  assert.deepEqual(courtAndVenue(draw({ CourtNumber: "VAR1" }), "Main", codes), { venue: "SCH(Vare)", court: "Court 1" });
  assert.deepEqual(courtAndVenue(draw({ CourtNumber: "PEN12" }), "Main", codes), { venue: "University of Pennsylvania", court: "Court 12" });
  assert.deepEqual(courtAndVenue(draw({ CourtNumber: "4" }), "Main", codes), { venue: "Main", court: "Court 4" });
  assert.deepEqual(courtAndVenue(draw({ CourtNumber: "4", courtName: "Glass Court" }), "Main", codes), { venue: "Main", court: "Glass Court" });
  assert.deepEqual(courtAndVenue(draw({ CourtNumber: null }), "Main", codes), { venue: "Main", court: "Court TBA" });
});

test("writes results from the tracked player's side", () => {
  const played = draw({ Status: "C", winner: "V", Score: "11-2,11-5,11-5" });
  assert.equal(resultFor(played, "V"), "Won 3–0 (11-2, 11-5, 11-5)");
  assert.equal(resultFor(played, "H"), "Lost 0–3 (2-11, 5-11, 5-11)");

  const fiveGames = draw({ Status: "C", winner: "H", Score: "12-10,13-11,5-11,6-11,11-9" });
  assert.equal(resultFor(fiveGames, "H"), "Won 3–2 (12-10, 13-11, 5-11, 6-11, 11-9)");

  assert.equal(resultFor(draw({ Status: "DF", winner: "H", Score: "11-0,11-0,11-0" }), "V"), "Lost by default");
  assert.equal(resultFor(draw({ Status: "RE", winner: "H", Score: "11-4,3-2" }), "H"), "Won 1–0 (11-4, 3-2), opponent retired");
});

test("keeps only roster singles matches that have a start time", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw(),
        draw({ ResultID: 5002, wid1: 333, oid1: 444, hplayer1: "Other, Kid", vplayer1: "Another, Kid" }),
        draw({ ResultID: 5003, SinglesDoubles: "d" }),
        draw({ ResultID: 5004, StartTime: null, matchdate: "09/27/2026" }),
      ]),
    ],
    roster,
    "America/New_York",
  );

  assert.deepEqual(feed.matches, [
    {
      externalId: "19515:5001:111",
      playerId: "111",
      playerName: "Sam Rivera",
      opponent: "Theo Okafor",
      startsAt: "2026-09-26T11:30:00-04:00",
      endsAt: "2026-09-26T16:15:00.000Z",
      venue: "Brunswick School",
      court: "Court 4",
      status: "upcoming",
      result: null,
    },
  ]);
  assert.deepEqual(feed.players, [{ id: "111", name: "Sam Rivera" }]);
});

test("tracks roster players on the visitor side and shows pending opponents", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw({ wid1: 999, oid1: 111, hplayer1: "Okafor, Theo", vplayer1: "Rivera, Sam" }),
        draw({ ResultID: 5010, StartTime: "02:25 PM", wid1: 111, oid1: -1, hplayer1: "Rivera, Sam", vplayer1: null }),
      ]),
    ],
    roster,
    "America/New_York",
  );

  assert.deepEqual(
    feed.matches.map((match) => [match.opponent, match.startsAt]),
    [
      ["Theo Okafor", "2026-09-26T11:30:00-04:00"],
      ["To be decided", "2026-09-26T14:25:00-04:00"],
    ],
  );
});

test("marks played matches completed with the result", () => {
  const feed = drawsToFeed(
    [tournament([draw({ Status: "C", winner: "H", Score: "11-7,11-9,11-4" })])],
    roster,
    "America/New_York",
  );
  assert.equal(feed.matches[0]?.status, "completed");
  assert.equal(feed.matches[0]?.result, "Won 3–0 (11-7, 11-9, 11-4)");
});

test("shortens estimated finish times so a player's matches never overlap", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw({ ResultID: 1, StartTime: "08:00 AM" }),
        draw({ ResultID: 2, StartTime: "08:35 AM" }),
        draw({ ResultID: 3, StartTime: "08:35 AM" }),
      ]),
    ],
    roster,
    "America/New_York",
  );

  assert.deepEqual(
    feed.matches.map((match) => [match.externalId, match.endsAt]),
    [
      ["19515:1:111", "2026-09-26T12:35:00.000Z"],
      ["19515:2:111", "2026-09-26T13:20:00.000Z"],
    ],
  );
  assert.doesNotThrow(() => parseClubLockerFeed(feed));
});

test("tracks two roster players meeting each other as two cards", () => {
  const feed = drawsToFeed([tournament([draw()])], new Set(["111", "222"]), "America/New_York");
  assert.deepEqual(
    feed.matches.map((match) => [match.playerId, match.opponent]).sort(),
    [
      ["111", "Theo Okafor"],
      ["222", "Sam Rivera"],
    ],
  );
});

test("reads tournaments, roster and timezone from the environment", () => {
  assert.equal(drawsConfigFromEnv({}), null);
  const config = drawsConfigFromEnv({
    CLUB_LOCKER_TOURNAMENT_IDS: "19515, 19516",
    CLUB_LOCKER_PLAYER_IDS: "111,222 ,",
  });
  assert.deepEqual(config?.tournamentIds, ["19515", "19516"]);
  assert.deepEqual([...(config?.rosterIds ?? [])], ["111", "222"]);
  assert.equal(config?.timeZone, "America/New_York");
});

test("loads every division of a tournament through the public endpoints", async () => {
  const requested: string[] = [];
  const responses: Record<string, unknown> = {
    "tournaments/19515": {
      Tournament_Name: "2026 Brunswick School Junior Silver",
      Checks_To: null,
      venues: [{ ClubId: 1639, IsMain: true }],
    },
    "res/clubs/1639": { name: "Brunswick School" },
    "tournaments/19515/divisionsandsections": [
      { divisionId: 3, sections: [] },
      { divisionId: 4, sections: [] },
    ],
    "tournaments/19515/division/3/draws": [{ matches: [draw()] }],
    "tournaments/19515/division/4/draws": [
      { matches: [draw({ ResultID: 6001, StartTime: "03:00 PM", Status: "C", winner: "V", Score: "11-9,11-9,11-9" })] },
    ],
  };

  const feed = await fetchClubLockerDraws(
    { tournamentIds: ["19515"], rosterIds: roster, timeZone: "America/New_York" },
    async (path) => {
      requested.push(path);
      if (!(path in responses)) throw new Error(`Unexpected ${path}`);
      return responses[path];
    },
  );

  assert.equal(feed.matches.length, 2);
  assert.equal(feed.matches[0]?.venue, "Brunswick School");
  assert.equal(feed.matches[1]?.result, "Lost 0–3 (9-11, 9-11, 9-11)");
  assert.ok(requested.includes("tournaments/19515/division/4/draws"));
});

test("refuses to load draws without a roster", async () => {
  await assert.rejects(
    fetchClubLockerDraws(
      { tournamentIds: ["19515"], rosterIds: new Set(), timeZone: "America/New_York" },
      async () => ({}),
    ),
    /CLUB_LOCKER_PLAYER_IDS/,
  );
});

const baseState = (matches: TrackerState["matches"]): TrackerState => ({
  players: [{ id: "111", name: "Sam Rivera" }],
  coaches: [{ id: "unassigned", name: "Unassigned" }],
  matches,
  lastUpdatedAt: "2026-09-26T08:00:00-04:00",
  source: "club-locker",
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
});

test("a result recorded in Club Locker closes out an open match", () => {
  const upcoming = drawsToFeed([tournament([draw()])], roster, "America/New_York");
  const merged = mergeClubLockerFeed(baseState([]), parseClubLockerFeed(upcoming));
  const assigned = {
    ...merged,
    matches: merged.matches.map((match) => ({ ...match, coachId: "alex" })),
  };

  const played = drawsToFeed(
    [tournament([draw({ Status: "C", winner: "H", Score: "11-5,11-6,11-7" })])],
    roster,
    "America/New_York",
  );
  const closed = mergeClubLockerFeed(assigned, parseClubLockerFeed(played));

  assert.equal(closed.matches[0]?.status, "completed");
  assert.equal(closed.matches[0]?.result, "Won 3–0 (11-5, 11-6, 11-7)");
  assert.equal(closed.matches[0]?.coachId, "alex");
});

test("a result staff already entered is never overwritten by Club Locker", () => {
  const played = parseClubLockerFeed(
    drawsToFeed(
      [tournament([draw({ Status: "C", winner: "H", Score: "11-5,11-6,11-7" })])],
      roster,
      "America/New_York",
    ),
  );
  const existing = mergeClubLockerFeed(baseState([]), played);
  const staffEdited = {
    ...existing,
    matches: existing.matches.map((match) => ({ ...match, result: "Won 3–0, great focus" })),
  };

  const merged = mergeClubLockerFeed(staffEdited, played);
  assert.equal(merged.matches[0]?.result, "Won 3–0, great focus");
});
