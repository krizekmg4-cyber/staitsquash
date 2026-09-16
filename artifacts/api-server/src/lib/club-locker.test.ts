import assert from "node:assert/strict";
import test from "node:test";
import {
  clearRefreshFailures,
  getRefreshRecovery,
  mergeClubLockerFeed,
  parseClubLockerFeed,
  recordRefreshFailure,
  refreshTrackerState,
  type ClubLockerFeed,
  type TrackerState,
} from "./club-locker.ts";

const incoming = (
  externalId: string,
  overrides: Partial<ClubLockerFeed["matches"][number]> = {},
): ClubLockerFeed["matches"][number] => ({
  externalId,
  playerId: "player-1",
  opponent: "Original opponent",
  startsAt: "2026-09-16T14:30:00-04:00",
  endsAt: "2026-09-16T15:15:00-04:00",
  venue: "Original venue",
  court: "Court 1",
  ...overrides,
});

const storedMatch = (
  externalId: string,
  overrides: Partial<TrackerState["matches"][number]> = {},
): TrackerState["matches"][number] => ({
  id: `stored-${externalId}`,
  externalId,
  playerId: "player-1",
  opponent: "Original opponent",
  startsAt: "2026-09-16T14:30:00-04:00",
  endsAt: "2026-09-16T15:15:00-04:00",
  venue: "Original venue",
  court: "Court 1",
  coachId: "coach-1",
  status: "upcoming",
  result: null,
  report: null,
  ...overrides,
});

const stateWith = (...matches: TrackerState["matches"]): TrackerState => ({
  players: [{ id: "player-1", name: "Player One" }],
  coaches: [{ id: "coach-1", name: "Coach One" }],
  matches,
  lastUpdatedAt: "2026-09-15T12:00:00-04:00",
  source: "club-locker",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 3,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
  },
});

test("adds new external match IDs with stable IDs and safe defaults", () => {
  const result = mergeClubLockerFeed(stateWith(), {
    matches: [incoming("new/id")],
  });

  assert.equal(result.matches.length, 1);
  assert.deepEqual(result.matches[0], {
    id: `club-locker:${Buffer.from("new/id").toString("base64url")}`,
    externalId: "new/id",
    playerId: "player-1",
    opponent: "Original opponent",
    startsAt: "2026-09-16T14:30:00-04:00",
    endsAt: "2026-09-16T15:15:00-04:00",
    venue: "Original venue",
    court: "Court 1",
    coachId: "unassigned",
    status: "upcoming",
    result: null,
    report: null,
  });
});

test("updates schedule fields while preserving coach work and match history", () => {
  const report = {
    matchId: "stored-existing",
    observations: ["Keep width"],
    transcript: "Coach notes",
    updatedAt: "2026-09-16T18:00:00Z",
  };
  const original = storedMatch("existing", {
    id: "stored-existing",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report,
  });

  const result = mergeClubLockerFeed(stateWith(original), {
    matches: [
      incoming("existing", {
        opponent: "Changed opponent",
        startsAt: "2026-09-17T10:00:00-04:00",
        endsAt: "2026-09-17T10:45:00-04:00",
        venue: "Changed venue",
        court: "Court 7",
        status: "upcoming",
        result: null,
      }),
    ],
  });

  assert.deepEqual(result.matches[0], {
    ...original,
    opponent: "Changed opponent",
    startsAt: "2026-09-17T10:00:00-04:00",
    endsAt: "2026-09-17T10:45:00-04:00",
    venue: "Changed venue",
    court: "Court 7",
  });
  assert.equal(result.matches[0]?.coachId, "coach-1");
  assert.equal(result.matches[0]?.status, "completed");
  assert.equal(result.matches[0]?.result, "Won 3-1");
  assert.equal(result.matches[0]?.report, report);
});

test("removes missing upcoming matches but retains completed and reported matches", () => {
  const upcoming = storedMatch("removed-upcoming");
  const completed = storedMatch("removed-completed", {
    status: "completed",
    result: "Lost 1-3",
  });
  const reported = storedMatch("removed-reported", {
    report: {
      matchId: "stored-removed-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z",
    },
  });

  const result = mergeClubLockerFeed(
    stateWith(upcoming, completed, reported),
    { matches: [] },
  );

  assert.deepEqual(
    result.matches.map((match) => match.externalId),
    ["removed-completed", "removed-reported"],
  );
});

test("rejects duplicate external match IDs", () => {
  assert.throws(
    () =>
      parseClubLockerFeed({
        matches: [incoming("duplicate"), incoming("duplicate")],
      }),
    /duplicate match ID "duplicate"/,
  );
});

test("rejects matches whose end time is not after the start time", () => {
  for (const endsAt of [
    "2026-09-16T14:30:00-04:00",
    "2026-09-16T14:29:59-04:00",
  ]) {
    assert.throws(
      () =>
        parseClubLockerFeed({
          matches: [incoming("impossible-time", { endsAt })],
        }),
      /must end after it starts/,
    );
  }
});

test("rejects conflicting duplicate player IDs", () => {
  assert.throws(
    () =>
      parseClubLockerFeed({
        matches: [],
        players: [
          { id: "player-1", name: "Player One" },
          { id: "player-1", name: "Different Player" },
        ],
      }),
    /conflicting names for player ID "player-1"/,
  );
});

test("allows identical duplicate player records", () => {
  const feed = parseClubLockerFeed({
    matches: [],
    players: [
      { id: "player-1", name: "Player One" },
      { id: "player-1", name: "Player One" },
    ],
  });

  assert.equal(feed.players?.length, 2);
});

test("invalid feeds never persist a replacement state", async () => {
  const original = stateWith(storedMatch("existing"));
  let persisted = false;

  await assert.rejects(
    refreshTrackerState(
      async () => original,
      async () => parseClubLockerFeed({ matches: [{ externalId: "broken" }] }),
      async () => {
        persisted = true;
      },
    ),
    /invalid startsAt/,
  );

  assert.equal(persisted, false);
  assert.equal(original.matches[0]?.opponent, "Original opponent");
});

test("schedule and player conflicts never change stored tracker state", async () => {
  const invalidFeeds = [
    {
      matches: [
        incoming("existing", {
          opponent: "Changed opponent",
          endsAt: "2026-09-16T14:30:00-04:00",
        }),
      ],
    },
    {
      matches: [
        incoming("existing", {
          opponent: "Changed opponent",
        }),
      ],
      players: [
        { id: "player-1", name: "Player One" },
        { id: "player-1", name: "Different Player" },
      ],
    },
  ];

  for (const invalidFeed of invalidFeeds) {
    const original = stateWith(storedMatch("existing"));
    const snapshot = structuredClone(original);
    let persisted = false;

    await assert.rejects(
      refreshTrackerState(
        async () => original,
        async () => parseClubLockerFeed(invalidFeed),
        async () => {
          persisted = true;
        },
      ),
    );

    assert.equal(persisted, false);
    assert.deepEqual(original, snapshot);
  }
});

test("unavailable feeds leave stored tracker state unchanged", async () => {
  const original = stateWith(storedMatch("existing"));
  let persisted = false;

  await assert.rejects(
    refreshTrackerState(
      async () => original,
      async () => {
        throw new Error("Club Locker returned HTTP 503");
      },
      async () => {
        persisted = true;
      },
    ),
    /HTTP 503/,
  );

  assert.equal(persisted, false);
  assert.equal(original.matches[0]?.opponent, "Original opponent");
});

test("counts consecutive refresh failures and preserves alert state", () => {
  const first = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z",
  );
  first.refreshHealth.alertSentAt = "2026-09-16T12:01:00.000Z";
  const second = recordRefreshFailure(
    first,
    2,
    "2026-09-16T12:05:00.000Z",
  );

  assert.deepEqual(second.refreshHealth, {
    consecutiveFailures: 2,
    alertThreshold: 2,
    firstFailureAt: "2026-09-16T12:00:00.000Z",
    lastFailureAt: "2026-09-16T12:05:00.000Z",
    alertSentAt: "2026-09-16T12:01:00.000Z",
  });
});

test("successful refresh clears the failure condition", () => {
  const failing = recordRefreshFailure(stateWith(), 2);
  const healthy = clearRefreshFailures(failing, 4);

  assert.deepEqual(healthy.refreshHealth, {
    consecutiveFailures: 0,
    alertThreshold: 4,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
  });
});

test("reports recovery details only after an alerted failure", () => {
  const normalSuccess = getRefreshRecovery(
    stateWith(),
    "2026-09-16T12:10:00.000Z",
  );
  assert.equal(normalSuccess, null);

  const failing = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z",
  );
  const alerted = recordRefreshFailure(
    failing,
    2,
    "2026-09-16T12:05:00.000Z",
  );
  alerted.refreshHealth.alertSentAt = "2026-09-16T12:05:00.000Z";

  assert.deepEqual(
    getRefreshRecovery(alerted, "2026-09-16T12:20:00.000Z"),
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T12:00:00.000Z",
      recoveredAt: "2026-09-16T12:20:00.000Z",
      outageDurationMs: 20 * 60_000,
    },
  );
});