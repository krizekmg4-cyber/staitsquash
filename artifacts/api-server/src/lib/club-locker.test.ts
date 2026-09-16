import assert from "node:assert/strict";
import test from "node:test";
import {
  clearPendingRecovery,
  clearRefreshFailures,
  getRefreshRecovery,
  mergeClubLockerFeed,
  parseClubLockerFeed,
  recordRefreshFailure,
  refreshTrackerState,
  type ClubLockerFeed,
  type ReadonlyClubLockerFeed,
  type ReadonlyTrackerState,
  type TrackerState,
} from "./club-locker.ts";

function loadedStateIsDeeplyReadonly(state: ReadonlyTrackerState): void {
  // @ts-expect-error Loaded matches must be replaced instead of mutated.
  state.matches[0].opponent = "Changed";
  // @ts-expect-error Loaded players must be replaced instead of mutated.
  state.players[0].name = "Changed";
  // @ts-expect-error Loaded coaches must be replaced instead of mutated.
  state.coaches[0].name = "Changed";
  // @ts-expect-error Loaded refresh health must be replaced instead of mutated.
  state.refreshHealth.consecutiveFailures += 1;
}

void loadedStateIsDeeplyReadonly;

function incomingFeedIsDeeplyReadonly(feed: ReadonlyClubLockerFeed): void {
  // @ts-expect-error Incoming matches must be replaced instead of mutated.
  feed.matches[0].opponent = "Changed";
  // @ts-expect-error Incoming match collections must not be mutated.
  feed.matches.push(incoming("new-match"));
  if (feed.players) {
    // @ts-expect-error Incoming players must be replaced instead of mutated.
    feed.players[0].name = "Changed";
  }
}

void incomingFeedIsDeeplyReadonly;

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
    pendingRecoveries: [],
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
  const originalSnapshot = structuredClone(original);

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
  assert.deepEqual(result.matches[0]?.report, report);
  assert.notEqual(result.matches[0]?.report, report);
  assert.notEqual(result.matches[0]?.report?.observations, report.observations);
  assert.deepEqual(original, originalSnapshot);
  assert.notEqual(result.matches[0], original);
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

test("rejects incoming matches that overlap locally retained matches", () => {
  const retainedMatches = [
    storedMatch("local", { externalId: null }),
    storedMatch("completed", { status: "completed" }),
    storedMatch("reported", {
      report: {
        matchId: "stored-reported",
        observations: ["Good recovery"],
        transcript: null,
        updatedAt: "2026-09-16T18:00:00Z",
      },
    }),
  ];

  for (const retained of retainedMatches) {
    const state = stateWith(retained);
    const snapshot = structuredClone(state);

    assert.throws(
      () =>
        mergeClubLockerFeed(state, {
          matches: [
            incoming("new-match", {
              startsAt: "2026-09-16T15:00:00-04:00",
              endsAt: "2026-09-16T15:45:00-04:00",
            }),
          ],
        }),
      /overlapping a retained match for player ID "player-1"/,
    );
    assert.deepEqual(state, snapshot);
  }
});

test("allows incoming matches back-to-back with locally retained matches", () => {
  const retained = storedMatch("completed", { status: "completed" });

  const result = mergeClubLockerFeed(stateWith(retained), {
    matches: [
      incoming("next-match", {
        startsAt: retained.endsAt,
        endsAt: "2026-09-16T16:00:00-04:00",
      }),
    ],
  });

  assert.deepEqual(
    result.matches.map((match) => match.externalId),
    ["completed", "next-match"],
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

test("rejects overlapping matches for the same player", () => {
  assert.throws(
    () =>
      parseClubLockerFeed({
        matches: [
          incoming("later", {
            startsAt: "2026-09-16T15:00:00-04:00",
            endsAt: "2026-09-16T15:45:00-04:00",
          }),
          incoming("earlier", {
            startsAt: "2026-09-16T14:30:00-04:00",
            endsAt: "2026-09-16T15:15:00-04:00",
          }),
        ],
      }),
    /overlapping matches for player ID "player-1"/,
  );
});

test("allows back-to-back matches and overlaps for different players", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("first"),
      incoming("back-to-back", {
        startsAt: "2026-09-16T15:15:00-04:00",
        endsAt: "2026-09-16T16:00:00-04:00",
      }),
      incoming("other-player", {
        playerId: "player-2",
        startsAt: "2026-09-16T14:45:00-04:00",
        endsAt: "2026-09-16T15:30:00-04:00",
      }),
    ],
  });

  assert.equal(feed.matches.length, 3);
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

test("mutable replacement players do not share validated feed records", () => {
  const feed = parseClubLockerFeed({
    matches: [],
    players: [{ id: "player-2", name: "Player Two" }],
  });

  const result = mergeClubLockerFeed(stateWith(), feed);
  const replacementPlayer = result.players.find(
    (player) => player.id === "player-2",
  );
  assert.ok(replacementPlayer);

  replacementPlayer.name = "Changed";
  assert.equal(feed.players?.[0]?.name, "Player Two");
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

test("retained-match overlaps never mutate or persist tracker state", async () => {
  const original = stateWith(
    storedMatch("completed", { status: "completed" }),
  );
  const snapshot = structuredClone(original);
  let persisted = false;

  await assert.rejects(
    refreshTrackerState(
      async () => original,
      async () => ({
        matches: [
          incoming("new-match", {
            startsAt: "2026-09-16T15:00:00-04:00",
            endsAt: "2026-09-16T15:45:00-04:00",
          }),
        ],
      }),
      async () => {
        persisted = true;
      },
    ),
    /overlapping a retained match/,
  );

  assert.equal(persisted, false);
  assert.deepEqual(original, snapshot);
});

test("rescheduled imported matches cannot overlap absent saved history", async () => {
  const reportedMatch = storedMatch("reported", {
    report: {
      matchId: "stored-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z",
    },
  });
  const absentSavedMatches = [
    storedMatch("completed", { status: "completed", result: "Won 3-1" }),
    reportedMatch,
  ];

  for (const absentSavedMatch of absentSavedMatches) {
    const imported = storedMatch("existing", {
      coachId: "coach-1",
      result: "Local result",
    });
    const original = stateWith(imported, absentSavedMatch);
    const snapshot = structuredClone(original);
    let persisted = false;

    await assert.rejects(
      refreshTrackerState(
        async () => original,
        async () => ({
          matches: [
            incoming("existing", {
              opponent: "Changed opponent",
              startsAt: "2026-09-16T15:00:00-04:00",
              endsAt: "2026-09-16T15:45:00-04:00",
              venue: "Changed venue",
              court: "Court 7",
            }),
          ],
        }),
        async () => {
          persisted = true;
        },
      ),
      /overlapping a retained match for player ID "player-1"/,
    );

    assert.equal(persisted, false);
    assert.deepEqual(original, snapshot);
    assert.equal(original.matches[0]?.coachId, "coach-1");
    assert.equal(original.matches[0]?.result, "Local result");
  }
});

test("rescheduled imported matches can start when absent saved history ends", async () => {
  const reportedMatch = storedMatch("reported", {
    report: {
      matchId: "stored-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z",
    },
  });
  const absentSavedMatches = [
    storedMatch("completed", { status: "completed", result: "Won 3-1" }),
    reportedMatch,
  ];

  for (const absentSavedMatch of absentSavedMatches) {
    const imported = storedMatch("existing", {
      coachId: "coach-1",
      result: "Local result",
    });
    const original = stateWith(imported, absentSavedMatch);
    const snapshot = structuredClone(original);
    let persisted: TrackerState | null = null;

    const refreshed = await refreshTrackerState(
      async () => original,
      async () => ({
        matches: [
          incoming("existing", {
            opponent: "Changed opponent",
            startsAt: absentSavedMatch.endsAt,
            endsAt: "2026-09-16T16:00:00-04:00",
            venue: "Changed venue",
            court: "Court 7",
          }),
        ],
      }),
      async (replacement) => {
        persisted = replacement;
      },
    );

    const refreshedImported = refreshed.matches.find(
      (match) => match.externalId === "existing",
    );
    assert.ok(refreshedImported);
    assert.equal(refreshedImported.startsAt, absentSavedMatch.endsAt);
    assert.equal(refreshedImported.coachId, "coach-1");
    assert.equal(refreshedImported.result, "Local result");
    assert.deepEqual(persisted, refreshed);
    assert.deepEqual(original, snapshot);
  }
});

test("refresh validates typed feeds before merging or persisting them", async () => {
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
    {
      matches: [
        incoming("existing", {
          opponent: "Changed opponent",
        }),
        incoming("overlap", {
          startsAt: "2026-09-16T15:00:00-04:00",
          endsAt: "2026-09-16T15:45:00-04:00",
        }),
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
        async () => invalidFeed,
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

test("failed persistence leaves the loaded tracker state unchanged", async () => {
  const original = stateWith(
    storedMatch("existing", {
      status: "completed",
      result: "Won 3-1",
      report: {
        matchId: "stored-existing",
        observations: ["Keep width"],
        transcript: "Coach notes",
        updatedAt: "2026-09-16T18:00:00Z",
      },
    }),
  );
  const snapshot = structuredClone(original);

  await assert.rejects(
    refreshTrackerState(
      async () => original,
      async () => ({
        matches: [
          incoming("existing", {
            opponent: "Changed opponent",
            startsAt: "2026-09-17T10:00:00-04:00",
            endsAt: "2026-09-17T10:45:00-04:00",
            venue: "Changed venue",
            court: "Court 7",
          }),
        ],
      }),
      async () => {
        throw new Error("Persistence unavailable");
      },
    ),
    /Persistence unavailable/,
  );

  assert.deepEqual(original, snapshot);
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
    pendingRecoveries: [],
  });
});

test("successful refresh clears the failure condition and queues its recovery", () => {
  const failing = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z",
  );
  failing.refreshHealth.alertSentAt = "2026-09-16T12:01:00.000Z";
  const healthy = clearRefreshFailures(
    failing,
    4,
    "2026-09-16T12:20:00.000Z",
  );

  assert.deepEqual(healthy.refreshHealth, {
    consecutiveFailures: 0,
    alertThreshold: 4,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    pendingRecoveries: [{
      failedAttempts: 1,
      outageStartedAt: failing.refreshHealth.firstFailureAt,
      recoveredAt: "2026-09-16T12:20:00.000Z",
      outageDurationMs: 20 * 60_000,
    }],
  });
});

test("successful refresh preserves pending recoveries until delivery succeeds", () => {
  const pending = {
    failedAttempts: 3,
    outageStartedAt: "2026-09-16T12:00:00.000Z",
    recoveredAt: "2026-09-16T12:20:00.000Z",
    outageDurationMs: 20 * 60_000,
  };
  const state = stateWith();
  state.refreshHealth.pendingRecoveries = [pending];

  const retried = clearRefreshFailures(
    state,
    3,
    "2026-09-16T12:30:00.000Z",
  );
  assert.deepEqual(retried.refreshHealth.pendingRecoveries, [pending]);
  assert.notEqual(retried.refreshHealth.pendingRecoveries[0], pending);

  const delivered = clearPendingRecovery(retried);
  assert.deepEqual(delivered.refreshHealth.pendingRecoveries, []);
  assert.deepEqual(retried.refreshHealth.pendingRecoveries, [pending]);
});

test("mutable failure state does not share loaded recovery metadata", () => {
  const loaded = stateWith();
  loaded.refreshHealth.pendingRecoveries = [{
    failedAttempts: 3,
    outageStartedAt: "2026-09-16T12:00:00.000Z",
    recoveredAt: "2026-09-16T12:20:00.000Z",
    outageDurationMs: 20 * 60_000,
  }];

  const replacement = recordRefreshFailure(
    loaded,
    3,
    "2026-09-16T12:30:00.000Z",
  );
  assert.notEqual(
    replacement.refreshHealth.pendingRecoveries[0],
    loaded.refreshHealth.pendingRecoveries[0],
  );

  replacement.refreshHealth.pendingRecoveries[0]!.failedAttempts = 4;
  assert.equal(loaded.refreshHealth.pendingRecoveries[0]!.failedAttempts, 3);
});

test("back-to-back alerted outages queue recoveries in order", () => {
  const firstOutage = recordRefreshFailure(
    stateWith(),
    1,
    "2026-09-16T12:00:00.000Z",
  );
  firstOutage.refreshHealth.alertSentAt = "2026-09-16T12:00:00.000Z";
  const firstRecovery = clearRefreshFailures(
    firstOutage,
    1,
    "2026-09-16T12:10:00.000Z",
  );
  const secondOutage = recordRefreshFailure(
    firstRecovery,
    1,
    "2026-09-16T12:20:00.000Z",
  );
  secondOutage.refreshHealth.alertSentAt = "2026-09-16T12:20:00.000Z";
  const secondRecovery = clearRefreshFailures(
    secondOutage,
    1,
    "2026-09-16T12:35:00.000Z",
  );

  assert.deepEqual(
    secondRecovery.refreshHealth.pendingRecoveries.map(
      (recovery) => recovery.outageStartedAt,
    ),
    ["2026-09-16T12:00:00.000Z", "2026-09-16T12:20:00.000Z"],
  );
  assert.equal(
    clearPendingRecovery(secondRecovery).refreshHealth.pendingRecoveries[0]
      ?.outageStartedAt,
    "2026-09-16T12:20:00.000Z",
  );
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