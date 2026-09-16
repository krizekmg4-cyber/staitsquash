// src/lib/club-locker.test.ts
import assert from "node:assert/strict";
import test from "node:test";

// src/lib/club-locker.ts
function cloneTrackerState(state) {
  return {
    players: state.players.map((player) => ({ ...player })),
    coaches: state.coaches.map((coach) => ({ ...coach })),
    branding: state.branding ? { ...state.branding } : void 0,
    matches: state.matches.map(cloneTrackerMatch),
    lastUpdatedAt: state.lastUpdatedAt,
    source: state.source,
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries
      )
    }
  };
}
function freezeTrackerState(state) {
  for (const player of state.players) Object.freeze(player);
  Object.freeze(state.players);
  for (const coach of state.coaches) Object.freeze(coach);
  Object.freeze(state.coaches);
  if (state.branding) Object.freeze(state.branding);
  for (const match of state.matches) {
    if (match.report) {
      Object.freeze(match.report.observations);
      Object.freeze(match.report);
    }
    Object.freeze(match);
  }
  Object.freeze(state.matches);
  for (const recovery of state.refreshHealth.pendingRecoveries) {
    Object.freeze(recovery);
  }
  Object.freeze(state.refreshHealth.pendingRecoveries);
  Object.freeze(state.refreshHealth);
  return Object.freeze(state);
}
function cloneRefreshRecoveries(recoveries) {
  return recoveries.map((recovery) => ({ ...recovery }));
}
function getRefreshRecovery(state, recoveredAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const { alertSentAt, consecutiveFailures, firstFailureAt } = state.refreshHealth;
  if (alertSentAt === null || consecutiveFailures === 0 || firstFailureAt === null) {
    return null;
  }
  return {
    failedAttempts: consecutiveFailures,
    outageStartedAt: firstFailureAt,
    recoveredAt,
    outageDurationMs: Math.max(
      0,
      Date.parse(recoveredAt) - Date.parse(firstFailureAt)
    )
  };
}
function clearRefreshFailures(state, alertThreshold, recoveredAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const replacement = cloneTrackerState(state);
  const pendingRecoveries = replacement.refreshHealth.pendingRecoveries;
  const recovery = getRefreshRecovery(state, recoveredAt);
  if (recovery) pendingRecoveries.push(recovery);
  return {
    ...replacement,
    refreshHealth: {
      consecutiveFailures: 0,
      alertThreshold,
      firstFailureAt: null,
      lastFailureAt: null,
      alertSentAt: null,
      failureAlertClaimedAt: null,
      pendingRecoveries,
      recoveryClaim: null
    }
  };
}
function clearPendingRecovery(state) {
  const replacement = cloneTrackerState(state);
  return {
    ...replacement,
    refreshHealth: {
      ...replacement.refreshHealth,
      pendingRecoveries: replacement.refreshHealth.pendingRecoveries.slice(1)
    }
  };
}
function recordRefreshFailure(state, alertThreshold, failedAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const replacement = cloneTrackerState(state);
  return {
    ...replacement,
    refreshHealth: {
      consecutiveFailures: state.refreshHealth.consecutiveFailures + 1,
      alertThreshold,
      firstFailureAt: state.refreshHealth.firstFailureAt ?? failedAt,
      lastFailureAt: failedAt,
      alertSentAt: state.refreshHealth.alertSentAt,
      failureAlertClaimedAt: state.refreshHealth.failureAlertClaimedAt,
      pendingRecoveries: replacement.refreshHealth.pendingRecoveries,
      recoveryClaim: replacement.refreshHealth.recoveryClaim
    }
  };
}
function cloneTrackerMatch(match) {
  return {
    ...match,
    report: match.report === null ? null : {
      ...match.report,
      observations: [...match.report.observations]
    }
  };
}
function readRequiredString(value, field, index) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return value.trim();
}
function parseClubLockerFeed(value) {
  if (!value || typeof value !== "object" || !Array.isArray(value.matches)) {
    throw new Error("The Club Locker response does not contain a matches array");
  }
  const raw = value;
  const seen = /* @__PURE__ */ new Set();
  const matches = raw.matches.map((match, index) => {
    const externalId = readRequiredString(match.externalId, "externalId", index);
    if (seen.has(externalId)) {
      throw new Error(`Club Locker returned duplicate match ID "${externalId}"`);
    }
    seen.add(externalId);
    const startsAt = readRequiredString(match.startsAt, "startsAt", index);
    const endsAt = readRequiredString(match.endsAt, "endsAt", index);
    if (Number.isNaN(Date.parse(startsAt)) || Number.isNaN(Date.parse(endsAt))) {
      throw new Error(`Match ${index + 1} has an invalid start or end time`);
    }
    if (Date.parse(endsAt) <= Date.parse(startsAt)) {
      throw new Error(`Match ${index + 1} must end after it starts`);
    }
    if (match.status != null && match.status !== "upcoming" && match.status !== "completed") {
      throw new Error(`Match ${index + 1} has an invalid status`);
    }
    return {
      externalId,
      playerId: readRequiredString(match.playerId, "playerId", index),
      playerName: typeof match.playerName === "string" ? match.playerName.trim() : void 0,
      opponent: readRequiredString(match.opponent, "opponent", index),
      startsAt,
      endsAt,
      venue: readRequiredString(match.venue, "venue", index),
      court: readRequiredString(match.court, "court", index),
      status: match.status === "upcoming" || match.status === "completed" ? match.status : void 0,
      result: typeof match.result === "string" || match.result === null ? match.result : void 0
    };
  });
  const matchesByPlayer = /* @__PURE__ */ new Map();
  for (const match of matches) {
    const playerMatches = matchesByPlayer.get(match.playerId) ?? [];
    playerMatches.push(match);
    matchesByPlayer.set(match.playerId, playerMatches);
  }
  for (const [playerId, playerMatches] of matchesByPlayer) {
    playerMatches.sort(
      (left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt)
    );
    for (let index = 1; index < playerMatches.length; index += 1) {
      const previous = playerMatches[index - 1];
      const current = playerMatches[index];
      if (Date.parse(current.startsAt) < Date.parse(previous.endsAt)) {
        throw new Error(
          `Club Locker returned overlapping matches for player ID "${playerId}"`
        );
      }
    }
  }
  const playerNamesById = /* @__PURE__ */ new Map();
  const players = Array.isArray(raw.players) ? raw.players.map((player, index) => {
    if (!player || typeof player !== "object") {
      throw new Error(`Player ${index + 1} is invalid`);
    }
    const item = player;
    const id = readRequiredString(item.id, "player id", index);
    const name = readRequiredString(item.name, "player name", index);
    const existingName = playerNamesById.get(id);
    if (existingName !== void 0 && existingName !== name) {
      throw new Error(
        `Club Locker returned conflicting names for player ID "${id}"`
      );
    }
    playerNamesById.set(id, name);
    return { id, name };
  }) : void 0;
  for (const match of matches) Object.freeze(match);
  Object.freeze(matches);
  if (players) {
    for (const player of players) Object.freeze(player);
    Object.freeze(players);
  }
  return Object.freeze({ matches, players });
}
function mergeClubLockerFeed(state, feed) {
  const currentByExternalId = new Map(
    state.matches.filter(
      (match) => match.externalId !== null
    ).map((match) => [match.externalId, match])
  );
  const incomingByExternalId = new Map(
    feed.matches.map((match) => [match.externalId, match])
  );
  const importedIds = new Set(feed.matches.map((match) => match.externalId));
  const locallyRetained = state.matches.filter(
    (match) => (match.externalId === null || !importedIds.has(match.externalId)) && (match.externalId === null || match.status === "completed" || match.report !== null)
  );
  for (const incoming2 of feed.matches) {
    const overlapsRetainedMatch = locallyRetained.some(
      (retainedMatch) => retainedMatch.playerId === incoming2.playerId && Date.parse(incoming2.startsAt) < Date.parse(retainedMatch.endsAt) && Date.parse(retainedMatch.startsAt) < Date.parse(incoming2.endsAt)
    );
    if (overlapsRetainedMatch) {
      throw new Error(
        `Club Locker returned a match overlapping a retained match for player ID "${incoming2.playerId}"`
      );
    }
  }
  const retained = state.matches.filter(
    (match) => match.externalId === null || importedIds.has(match.externalId) || match.status === "completed" || match.report !== null
  ).map((match) => {
    const incoming2 = match.externalId === null ? void 0 : incomingByExternalId.get(match.externalId);
    return incoming2 ? {
      ...cloneTrackerMatch(match),
      playerId: incoming2.playerId,
      opponent: incoming2.opponent,
      startsAt: incoming2.startsAt,
      endsAt: incoming2.endsAt,
      venue: incoming2.venue,
      court: incoming2.court
    } : cloneTrackerMatch(match);
  });
  for (const incoming2 of feed.matches) {
    const existing = currentByExternalId.get(incoming2.externalId);
    if (existing) continue;
    retained.push({
      id: `club-locker:${Buffer.from(incoming2.externalId).toString("base64url")}`,
      externalId: incoming2.externalId,
      playerId: incoming2.playerId,
      opponent: incoming2.opponent,
      startsAt: incoming2.startsAt,
      endsAt: incoming2.endsAt,
      venue: incoming2.venue,
      court: incoming2.court,
      coachId: "unassigned",
      status: incoming2.status ?? "upcoming",
      result: incoming2.result ?? null,
      report: null
    });
  }
  const playersById = new Map(
    state.players.map((player) => [player.id, { ...player }])
  );
  for (const player of feed.players ?? []) {
    playersById.set(player.id, { ...player });
  }
  for (const match of feed.matches) {
    if (!playersById.has(match.playerId)) {
      playersById.set(match.playerId, {
        id: match.playerId,
        name: match.playerName || match.playerId
      });
    }
  }
  return {
    branding: state.branding ? { ...state.branding } : void 0,
    coaches: state.coaches.map((coach) => ({ ...coach })),
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries
      )
    },
    players: [...playersById.values()],
    matches: retained,
    lastUpdatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    source: "club-locker"
  };
}
async function refreshTrackerState(loadState, loadFeed, persistState, alertThreshold = 3) {
  const feed = parseClubLockerFeed(await loadFeed());
  const state = clearRefreshFailures(
    mergeClubLockerFeed(await loadState(), feed),
    alertThreshold
  );
  await persistState(state);
  return state;
}

// src/lib/club-locker.test.ts
var incoming = (externalId, overrides = {}) => ({
  externalId,
  playerId: "player-1",
  opponent: "Original opponent",
  startsAt: "2026-09-16T14:30:00-04:00",
  endsAt: "2026-09-16T15:15:00-04:00",
  venue: "Original venue",
  court: "Court 1",
  ...overrides
});
var storedMatch = (externalId, overrides = {}) => ({
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
  ...overrides
});
var stateWith = (...matches) => ({
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
    pendingRecoveries: []
  }
});
test("adds new external match IDs with stable IDs and safe defaults", () => {
  const result = mergeClubLockerFeed(stateWith(), {
    matches: [incoming("new/id")]
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
    report: null
  });
});
test("updates schedule fields while preserving coach work and match history", () => {
  const report = {
    matchId: "stored-existing",
    observations: ["Keep width"],
    transcript: "Coach notes",
    updatedAt: "2026-09-16T18:00:00Z"
  };
  const original = storedMatch("existing", {
    id: "stored-existing",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report
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
        result: null
      })
    ]
  });
  assert.deepEqual(result.matches[0], {
    ...original,
    opponent: "Changed opponent",
    startsAt: "2026-09-17T10:00:00-04:00",
    endsAt: "2026-09-17T10:45:00-04:00",
    venue: "Changed venue",
    court: "Court 7"
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
    result: "Lost 1-3"
  });
  const reported = storedMatch("removed-reported", {
    report: {
      matchId: "stored-removed-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z"
    }
  });
  const result = mergeClubLockerFeed(
    stateWith(upcoming, completed, reported),
    { matches: [] }
  );
  assert.deepEqual(
    result.matches.map((match) => match.externalId),
    ["removed-completed", "removed-reported"]
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
        updatedAt: "2026-09-16T18:00:00Z"
      }
    })
  ];
  for (const retained of retainedMatches) {
    const state = stateWith(retained);
    const snapshot = structuredClone(state);
    assert.throws(
      () => mergeClubLockerFeed(state, {
        matches: [
          incoming("new-match", {
            startsAt: "2026-09-16T15:00:00-04:00",
            endsAt: "2026-09-16T15:45:00-04:00"
          })
        ]
      }),
      /overlapping a retained match for player ID "player-1"/
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
        endsAt: "2026-09-16T16:00:00-04:00"
      })
    ]
  });
  assert.deepEqual(
    result.matches.map((match) => match.externalId),
    ["completed", "next-match"]
  );
});
test("rejects duplicate external match IDs", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [incoming("duplicate"), incoming("duplicate")]
    }),
    /duplicate match ID "duplicate"/
  );
});
test("rejects matches whose end time is not after the start time", () => {
  for (const endsAt of [
    "2026-09-16T14:30:00-04:00",
    "2026-09-16T14:29:59-04:00"
  ]) {
    assert.throws(
      () => parseClubLockerFeed({
        matches: [incoming("impossible-time", { endsAt })]
      }),
      /must end after it starts/
    );
  }
});
test("rejects zero-length matches expressed with different timezone offsets", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [
        incoming("zero-length-cross-offset", {
          startsAt: "2026-09-16T14:30:00-04:00",
          endsAt: "2026-09-16T11:30:00-07:00"
        })
      ]
    }),
    /must end after it starts/
  );
});
test("rejects a negative one-second duration across timezone offsets", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [
        incoming("negative-cross-offset", {
          startsAt: "2026-09-16T14:30:00-04:00",
          endsAt: "2026-09-16T11:29:59-07:00"
        })
      ]
    }),
    /must end after it starts/
  );
});
test("allows a positive duration across timezone offsets", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("positive-cross-offset", {
        startsAt: "2026-09-16T14:30:00-04:00",
        endsAt: "2026-09-16T11:30:01-07:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 1);
});
test("rejects overlapping matches for the same player", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [
        incoming("later", {
          startsAt: "2026-09-16T15:00:00-04:00",
          endsAt: "2026-09-16T15:45:00-04:00"
        }),
        incoming("earlier", {
          startsAt: "2026-09-16T14:30:00-04:00",
          endsAt: "2026-09-16T15:15:00-04:00"
        })
      ]
    }),
    /overlapping matches for player ID "player-1"/
  );
});
test("allows back-to-back matches at an equivalent instant across timezone offsets", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("first", {
        startsAt: "2026-09-16T14:30:00-04:00",
        endsAt: "2026-09-16T15:15:00-04:00"
      }),
      incoming("back-to-back", {
        startsAt: "2026-09-16T12:15:00-07:00",
        endsAt: "2026-09-16T13:00:00-07:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 2);
});
test("rejects a one-second overlap across timezone offsets", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [
        incoming("first", {
          startsAt: "2026-09-16T14:30:00-04:00",
          endsAt: "2026-09-16T15:15:00-04:00"
        }),
        incoming("overlap", {
          startsAt: "2026-09-16T12:14:59-07:00",
          endsAt: "2026-09-16T13:00:00-07:00"
        })
      ]
    }),
    /overlapping matches for player ID "player-1"/
  );
});
test("allows same-time matches across timezone offsets for different players", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("first", {
        startsAt: "2026-09-16T14:30:00-04:00",
        endsAt: "2026-09-16T15:15:00-04:00"
      }),
      incoming("other-player", {
        playerId: "player-2",
        startsAt: "2026-09-16T11:30:00-07:00",
        endsAt: "2026-09-16T12:15:00-07:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 2);
});
test("allows back-to-back matches and overlaps for different players", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("first"),
      incoming("back-to-back", {
        startsAt: "2026-09-16T15:15:00-04:00",
        endsAt: "2026-09-16T16:00:00-04:00"
      }),
      incoming("other-player", {
        playerId: "player-2",
        startsAt: "2026-09-16T14:45:00-04:00",
        endsAt: "2026-09-16T15:30:00-04:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 3);
});
test("rejects conflicting duplicate player IDs", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [],
      players: [
        { id: "player-1", name: "Player One" },
        { id: "player-1", name: "Different Player" }
      ]
    }),
    /conflicting names for player ID "player-1"/
  );
});
test("allows identical duplicate player records", () => {
  const feed = parseClubLockerFeed({
    matches: [],
    players: [
      { id: "player-1", name: "Player One" },
      { id: "player-1", name: "Player One" }
    ]
  });
  assert.equal(feed.players?.length, 2);
});
test("parsed feeds reject runtime mutation of match collections", () => {
  const feed = parseClubLockerFeed({
    matches: [incoming("existing")]
  });
  const mutableMatches = feed.matches;
  assert.throws(() => mutableMatches.push(incoming("new-match")), TypeError);
  assert.equal(feed.matches.length, 1);
  assert.equal(feed.matches[0]?.externalId, "existing");
});
test("parsed feeds reject runtime mutation of match fields", () => {
  const feed = parseClubLockerFeed({
    matches: [incoming("existing")]
  });
  const mutableMatch = feed.matches[0];
  assert.throws(() => {
    mutableMatch.opponent = "Changed opponent";
  }, TypeError);
  assert.equal(feed.matches[0]?.opponent, "Original opponent");
});
test("parsed feeds reject runtime mutation of player records", () => {
  const feed = parseClubLockerFeed({
    matches: [],
    players: [{ id: "player-1", name: "Player One" }]
  });
  const mutablePlayer = feed.players?.[0];
  assert.throws(() => {
    mutablePlayer.name = "Changed player";
  }, TypeError);
  assert.equal(feed.players?.[0]?.name, "Player One");
});
test("loaded tracker snapshots are deeply frozen at runtime", () => {
  const loaded = stateWith(storedMatch("existing", {
    report: {
      matchId: "stored-existing",
      observations: ["Keep width"],
      transcript: "Coach notes",
      updatedAt: "2026-09-16T18:00:00Z"
    }
  }));
  loaded.branding = { name: "Club", logoPath: "/objects/uploads/00000000-0000-0000-0000-000000000000" };
  loaded.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T12:00:00.000Z",
    recoveredAt: "2026-09-16T12:10:00.000Z",
    outageDurationMs: 10 * 6e4
  }];
  const snapshot = freezeTrackerState(loaded);
  const mutations = [
    () => snapshot.matches[0].opponent = "Changed",
    () => snapshot.matches[0].report.observations.push("Changed"),
    () => snapshot.players[0].name = "Changed",
    () => snapshot.coaches[0].name = "Changed",
    () => snapshot.branding.name = "Changed",
    () => snapshot.refreshHealth.consecutiveFailures = 9,
    () => snapshot.refreshHealth.pendingRecoveries[0].failedAttempts = 9
  ];
  for (const mutate of mutations) assert.throws(mutate, TypeError);
});
test("mutable tracker replacements are detached from frozen loaded snapshots", () => {
  const loaded = stateWith(storedMatch("existing", {
    report: {
      matchId: "stored-existing",
      observations: ["Keep width"],
      transcript: "Coach notes",
      updatedAt: "2026-09-16T18:00:00Z"
    }
  }));
  loaded.branding = { name: "Club", logoPath: "/objects/uploads/00000000-0000-0000-0000-000000000000" };
  loaded.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T12:00:00.000Z",
    recoveredAt: "2026-09-16T12:10:00.000Z",
    outageDurationMs: 10 * 6e4
  }];
  const snapshot = freezeTrackerState(loaded);
  const replacement = cloneTrackerState(snapshot);
  replacement.matches[0].report.observations.push("Changed");
  replacement.players[0].name = "Changed";
  replacement.coaches[0].name = "Changed";
  replacement.branding.name = "Changed";
  replacement.refreshHealth.consecutiveFailures = 9;
  replacement.refreshHealth.pendingRecoveries[0].failedAttempts = 9;
  assert.equal(snapshot.matches[0].report.observations.length, 1);
  assert.equal(snapshot.players[0].name, "Player One");
  assert.equal(snapshot.coaches[0].name, "Coach One");
  assert.equal(snapshot.branding.name, "Club");
  assert.equal(snapshot.refreshHealth.consecutiveFailures, 0);
  assert.equal(snapshot.refreshHealth.pendingRecoveries[0].failedAttempts, 2);
});
test("mutable replacement players do not share validated feed records", () => {
  const feed = parseClubLockerFeed({
    matches: [],
    players: [{ id: "player-2", name: "Player Two" }]
  });
  const result = mergeClubLockerFeed(stateWith(), feed);
  const replacementPlayer = result.players.find(
    (player) => player.id === "player-2"
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
      }
    ),
    /invalid startsAt/
  );
  assert.equal(persisted, false);
  assert.equal(original.matches[0]?.opponent, "Original opponent");
});
test("retained-match overlaps never mutate or persist tracker state", async () => {
  const original = stateWith(
    storedMatch("completed", { status: "completed" })
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
            endsAt: "2026-09-16T15:45:00-04:00"
          })
        ]
      }),
      async () => {
        persisted = true;
      }
    ),
    /overlapping a retained match/
  );
  assert.equal(persisted, false);
  assert.deepEqual(original, snapshot);
});
test("rescheduled imported matches cannot overlap absent saved history across timezone offsets", async () => {
  const reportedMatch = storedMatch("reported", {
    report: {
      matchId: "stored-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z"
    }
  });
  const absentSavedMatches = [
    storedMatch("completed", { status: "completed", result: "Won 3-1" }),
    reportedMatch
  ];
  for (const absentSavedMatch of absentSavedMatches) {
    const imported = storedMatch("existing", {
      coachId: "coach-1",
      result: "Local result"
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
              startsAt: "2026-09-16T12:14:59-07:00",
              endsAt: "2026-09-16T13:00:00-07:00",
              venue: "Changed venue",
              court: "Court 7"
            })
          ]
        }),
        async () => {
          persisted = true;
        }
      ),
      /overlapping a retained match for player ID "player-1"/
    );
    assert.equal(persisted, false);
    assert.deepEqual(original, snapshot);
    assert.equal(original.matches[0]?.coachId, "coach-1");
    assert.equal(original.matches[0]?.result, "Local result");
  }
});
test("rescheduled imported matches can start at an equivalent boundary instant across timezone offsets", async () => {
  const reportedMatch = storedMatch("reported", {
    report: {
      matchId: "stored-reported",
      observations: ["Good recovery"],
      transcript: null,
      updatedAt: "2026-09-16T18:00:00Z"
    }
  });
  const absentSavedMatches = [
    storedMatch("completed", { status: "completed", result: "Won 3-1" }),
    reportedMatch
  ];
  for (const absentSavedMatch of absentSavedMatches) {
    const imported = storedMatch("existing", {
      coachId: "coach-1",
      result: "Local result"
    });
    const original = stateWith(imported, absentSavedMatch);
    const snapshot = structuredClone(original);
    let persisted = null;
    const refreshed = await refreshTrackerState(
      async () => original,
      async () => ({
        matches: [
          incoming("existing", {
            opponent: "Changed opponent",
            startsAt: "2026-09-16T12:15:00-07:00",
            endsAt: "2026-09-16T13:00:00-07:00",
            venue: "Changed venue",
            court: "Court 7"
          })
        ]
      }),
      async (replacement) => {
        persisted = replacement;
      }
    );
    const refreshedImported = refreshed.matches.find(
      (match) => match.externalId === "existing"
    );
    assert.ok(refreshedImported);
    assert.equal(refreshedImported.startsAt, "2026-09-16T12:15:00-07:00");
    assert.equal(
      Date.parse(refreshedImported.startsAt),
      Date.parse(absentSavedMatch.endsAt)
    );
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
          endsAt: "2026-09-16T14:30:00-04:00"
        })
      ]
    },
    {
      matches: [
        incoming("existing", {
          opponent: "Changed opponent"
        })
      ],
      players: [
        { id: "player-1", name: "Player One" },
        { id: "player-1", name: "Different Player" }
      ]
    },
    {
      matches: [
        incoming("existing", {
          opponent: "Changed opponent"
        }),
        incoming("overlap", {
          startsAt: "2026-09-16T15:00:00-04:00",
          endsAt: "2026-09-16T15:45:00-04:00"
        })
      ]
    }
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
        }
      )
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
      }
    ),
    /HTTP 503/
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
        updatedAt: "2026-09-16T18:00:00Z"
      }
    })
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
            court: "Court 7"
          })
        ]
      }),
      async () => {
        throw new Error("Persistence unavailable");
      }
    ),
    /Persistence unavailable/
  );
  assert.deepEqual(original, snapshot);
});
test("counts consecutive refresh failures and preserves alert state", () => {
  const first = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z"
  );
  first.refreshHealth.alertSentAt = "2026-09-16T12:01:00.000Z";
  const second = recordRefreshFailure(
    first,
    2,
    "2026-09-16T12:05:00.000Z"
  );
  assert.deepEqual(second.refreshHealth, {
    consecutiveFailures: 2,
    alertThreshold: 2,
    firstFailureAt: "2026-09-16T12:00:00.000Z",
    lastFailureAt: "2026-09-16T12:05:00.000Z",
    alertSentAt: "2026-09-16T12:01:00.000Z",
    pendingRecoveries: []
  });
});
test("successful refresh clears the failure condition and queues its recovery", () => {
  const failing = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z"
  );
  failing.refreshHealth.alertSentAt = "2026-09-16T12:01:00.000Z";
  const healthy = clearRefreshFailures(
    failing,
    4,
    "2026-09-16T12:20:00.000Z"
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
      outageDurationMs: 20 * 6e4
    }]
  });
});
test("successful refresh preserves pending recoveries until delivery succeeds", () => {
  const pending = {
    failedAttempts: 3,
    outageStartedAt: "2026-09-16T12:00:00.000Z",
    recoveredAt: "2026-09-16T12:20:00.000Z",
    outageDurationMs: 20 * 6e4
  };
  const state = stateWith();
  state.refreshHealth.pendingRecoveries = [pending];
  const retried = clearRefreshFailures(
    state,
    3,
    "2026-09-16T12:30:00.000Z"
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
    outageDurationMs: 20 * 6e4
  }];
  const replacement = recordRefreshFailure(
    loaded,
    3,
    "2026-09-16T12:30:00.000Z"
  );
  assert.notEqual(
    replacement.refreshHealth.pendingRecoveries[0],
    loaded.refreshHealth.pendingRecoveries[0]
  );
  replacement.refreshHealth.pendingRecoveries[0].failedAttempts = 4;
  assert.equal(loaded.refreshHealth.pendingRecoveries[0].failedAttempts, 3);
});
test("back-to-back alerted outages queue recoveries in order", () => {
  const firstOutage = recordRefreshFailure(
    stateWith(),
    1,
    "2026-09-16T12:00:00.000Z"
  );
  firstOutage.refreshHealth.alertSentAt = "2026-09-16T12:00:00.000Z";
  const firstRecovery = clearRefreshFailures(
    firstOutage,
    1,
    "2026-09-16T12:10:00.000Z"
  );
  const secondOutage = recordRefreshFailure(
    firstRecovery,
    1,
    "2026-09-16T12:20:00.000Z"
  );
  secondOutage.refreshHealth.alertSentAt = "2026-09-16T12:20:00.000Z";
  const secondRecovery = clearRefreshFailures(
    secondOutage,
    1,
    "2026-09-16T12:35:00.000Z"
  );
  assert.deepEqual(
    secondRecovery.refreshHealth.pendingRecoveries.map(
      (recovery) => recovery.outageStartedAt
    ),
    ["2026-09-16T12:00:00.000Z", "2026-09-16T12:20:00.000Z"]
  );
  assert.equal(
    clearPendingRecovery(secondRecovery).refreshHealth.pendingRecoveries[0]?.outageStartedAt,
    "2026-09-16T12:20:00.000Z"
  );
});
test("reports recovery details only after an alerted failure", () => {
  const normalSuccess = getRefreshRecovery(
    stateWith(),
    "2026-09-16T12:10:00.000Z"
  );
  assert.equal(normalSuccess, null);
  const failing = recordRefreshFailure(
    stateWith(),
    2,
    "2026-09-16T12:00:00.000Z"
  );
  const alerted = recordRefreshFailure(
    failing,
    2,
    "2026-09-16T12:05:00.000Z"
  );
  alerted.refreshHealth.alertSentAt = "2026-09-16T12:05:00.000Z";
  assert.deepEqual(
    getRefreshRecovery(alerted, "2026-09-16T12:20:00.000Z"),
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T12:00:00.000Z",
      recoveredAt: "2026-09-16T12:20:00.000Z",
      outageDurationMs: 20 * 6e4
    }
  );
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci50ZXN0LnRzIiwgIi4uLy4uL3NyYy9saWIvY2x1Yi1sb2NrZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBhc3NlcnQgZnJvbSBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiO1xuaW1wb3J0IHRlc3QgZnJvbSBcIm5vZGU6dGVzdFwiO1xuaW1wb3J0IHtcbiAgY2xlYXJQZW5kaW5nUmVjb3ZlcnksXG4gIGNsZWFyUmVmcmVzaEZhaWx1cmVzLFxuICBjbG9uZVRyYWNrZXJTdGF0ZSxcbiAgZnJlZXplVHJhY2tlclN0YXRlLFxuICBnZXRSZWZyZXNoUmVjb3ZlcnksXG4gIG1lcmdlQ2x1YkxvY2tlckZlZWQsXG4gIHBhcnNlQ2x1YkxvY2tlckZlZWQsXG4gIHJlY29yZFJlZnJlc2hGYWlsdXJlLFxuICByZWZyZXNoVHJhY2tlclN0YXRlLFxuICB0eXBlIENsdWJMb2NrZXJGZWVkLFxuICB0eXBlIFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQsXG4gIHR5cGUgUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHR5cGUgVHJhY2tlclN0YXRlLFxufSBmcm9tIFwiLi9jbHViLWxvY2tlci50c1wiO1xuXG5mdW5jdGlvbiBsb2FkZWRTdGF0ZUlzRGVlcGx5UmVhZG9ubHkoc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlKTogdm9pZCB7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgTG9hZGVkIG1hdGNoZXMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gIHN0YXRlLm1hdGNoZXNbMF0ub3Bwb25lbnQgPSBcIkNoYW5nZWRcIjtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBMb2FkZWQgcGxheWVycyBtdXN0IGJlIHJlcGxhY2VkIGluc3RlYWQgb2YgbXV0YXRlZC5cbiAgc3RhdGUucGxheWVyc1swXS5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgTG9hZGVkIGNvYWNoZXMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gIHN0YXRlLmNvYWNoZXNbMF0ubmFtZSA9IFwiQ2hhbmdlZFwiO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIExvYWRlZCByZWZyZXNoIGhlYWx0aCBtdXN0IGJlIHJlcGxhY2VkIGluc3RlYWQgb2YgbXV0YXRlZC5cbiAgc3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzICs9IDE7XG59XG5cbnZvaWQgbG9hZGVkU3RhdGVJc0RlZXBseVJlYWRvbmx5O1xuXG5mdW5jdGlvbiBpbmNvbWluZ0ZlZWRJc0RlZXBseVJlYWRvbmx5KGZlZWQ6IFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQpOiB2b2lkIHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBJbmNvbWluZyBtYXRjaGVzIG11c3QgYmUgcmVwbGFjZWQgaW5zdGVhZCBvZiBtdXRhdGVkLlxuICBmZWVkLm1hdGNoZXNbMF0ub3Bwb25lbnQgPSBcIkNoYW5nZWRcIjtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBJbmNvbWluZyBtYXRjaCBjb2xsZWN0aW9ucyBtdXN0IG5vdCBiZSBtdXRhdGVkLlxuICBmZWVkLm1hdGNoZXMucHVzaChpbmNvbWluZyhcIm5ldy1tYXRjaFwiKSk7XG4gIGlmIChmZWVkLnBsYXllcnMpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEluY29taW5nIHBsYXllcnMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gICAgZmVlZC5wbGF5ZXJzWzBdLm5hbWUgPSBcIkNoYW5nZWRcIjtcbiAgfVxufVxuXG52b2lkIGluY29taW5nRmVlZElzRGVlcGx5UmVhZG9ubHk7XG5cbmNvbnN0IGluY29taW5nID0gKFxuICBleHRlcm5hbElkOiBzdHJpbmcsXG4gIG92ZXJyaWRlczogUGFydGlhbDxDbHViTG9ja2VyRmVlZFtcIm1hdGNoZXNcIl1bbnVtYmVyXT4gPSB7fSxcbik6IENsdWJMb2NrZXJGZWVkW1wibWF0Y2hlc1wiXVtudW1iZXJdID0+ICh7XG4gIGV4dGVybmFsSWQsXG4gIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gIG9wcG9uZW50OiBcIk9yaWdpbmFsIG9wcG9uZW50XCIsXG4gIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgdmVudWU6IFwiT3JpZ2luYWwgdmVudWVcIixcbiAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAuLi5vdmVycmlkZXMsXG59KTtcblxuY29uc3Qgc3RvcmVkTWF0Y2ggPSAoXG4gIGV4dGVybmFsSWQ6IHN0cmluZyxcbiAgb3ZlcnJpZGVzOiBQYXJ0aWFsPFRyYWNrZXJTdGF0ZVtcIm1hdGNoZXNcIl1bbnVtYmVyXT4gPSB7fSxcbik6IFRyYWNrZXJTdGF0ZVtcIm1hdGNoZXNcIl1bbnVtYmVyXSA9PiAoe1xuICBpZDogYHN0b3JlZC0ke2V4dGVybmFsSWR9YCxcbiAgZXh0ZXJuYWxJZCxcbiAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgb3Bwb25lbnQ6IFwiT3JpZ2luYWwgb3Bwb25lbnRcIixcbiAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICB2ZW51ZTogXCJPcmlnaW5hbCB2ZW51ZVwiLFxuICBjb3VydDogXCJDb3VydCAxXCIsXG4gIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICBzdGF0dXM6IFwidXBjb21pbmdcIixcbiAgcmVzdWx0OiBudWxsLFxuICByZXBvcnQ6IG51bGwsXG4gIC4uLm92ZXJyaWRlcyxcbn0pO1xuXG5jb25zdCBzdGF0ZVdpdGggPSAoLi4ubWF0Y2hlczogVHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXSk6IFRyYWNrZXJTdGF0ZSA9PiAoe1xuICBwbGF5ZXJzOiBbeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9XSxcbiAgY29hY2hlczogW3sgaWQ6IFwiY29hY2gtMVwiLCBuYW1lOiBcIkNvYWNoIE9uZVwiIH1dLFxuICBtYXRjaGVzLFxuICBsYXN0VXBkYXRlZEF0OiBcIjIwMjYtMDktMTVUMTI6MDA6MDAtMDQ6MDBcIixcbiAgc291cmNlOiBcImNsdWItbG9ja2VyXCIsXG4gIHJlZnJlc2hIZWFsdGg6IHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAzLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgcGVuZGluZ1JlY292ZXJpZXM6IFtdLFxuICB9LFxufSk7XG5cbnRlc3QoXCJhZGRzIG5ldyBleHRlcm5hbCBtYXRjaCBJRHMgd2l0aCBzdGFibGUgSURzIGFuZCBzYWZlIGRlZmF1bHRzXCIsICgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgoKSwge1xuICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcIm5ldy9pZFwiKV0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlcy5sZW5ndGgsIDEpO1xuICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdLCB7XG4gICAgaWQ6IGBjbHViLWxvY2tlcjoke0J1ZmZlci5mcm9tKFwibmV3L2lkXCIpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpfWAsXG4gICAgZXh0ZXJuYWxJZDogXCJuZXcvaWRcIixcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9yaWdpbmFsIG9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjE1OjAwLTA0OjAwXCIsXG4gICAgdmVudWU6IFwiT3JpZ2luYWwgdmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJ1bmFzc2lnbmVkXCIsXG4gICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgcmVzdWx0OiBudWxsLFxuICAgIHJlcG9ydDogbnVsbCxcbiAgfSk7XG59KTtcblxudGVzdChcInVwZGF0ZXMgc2NoZWR1bGUgZmllbGRzIHdoaWxlIHByZXNlcnZpbmcgY29hY2ggd29yayBhbmQgbWF0Y2ggaGlzdG9yeVwiLCAoKSA9PiB7XG4gIGNvbnN0IHJlcG9ydCA9IHtcbiAgICBtYXRjaElkOiBcInN0b3JlZC1leGlzdGluZ1wiLFxuICAgIG9ic2VydmF0aW9uczogW1wiS2VlcCB3aWR0aFwiXSxcbiAgICB0cmFuc2NyaXB0OiBcIkNvYWNoIG5vdGVzXCIsXG4gICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gIH07XG4gIGNvbnN0IG9yaWdpbmFsID0gc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiLCB7XG4gICAgaWQ6IFwic3RvcmVkLWV4aXN0aW5nXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0LFxuICB9KTtcbiAgY29uc3Qgb3JpZ2luYWxTbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgob3JpZ2luYWwpLCB7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMDo0NTowMC0wNDowMFwiLFxuICAgICAgICB2ZW51ZTogXCJDaGFuZ2VkIHZlbnVlXCIsXG4gICAgICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgICAgICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0sIHtcbiAgICAuLi5vcmlnaW5hbCxcbiAgICBvcHBvbmVudDogXCJDaGFuZ2VkIG9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMC0wNDowMFwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE3VDEwOjQ1OjAwLTA0OjAwXCIsXG4gICAgdmVudWU6IFwiQ2hhbmdlZCB2ZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgfSk7XG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlc1swXT8uY29hY2hJZCwgXCJjb2FjaC0xXCIpO1xuICBhc3NlcnQuZXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0/LnN0YXR1cywgXCJjb21wbGV0ZWRcIik7XG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlc1swXT8ucmVzdWx0LCBcIldvbiAzLTFcIik7XG4gIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0/LnJlcG9ydCwgcmVwb3J0KTtcbiAgYXNzZXJ0Lm5vdEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdPy5yZXBvcnQsIHJlcG9ydCk7XG4gIGFzc2VydC5ub3RFcXVhbChyZXN1bHQubWF0Y2hlc1swXT8ucmVwb3J0Py5vYnNlcnZhdGlvbnMsIHJlcG9ydC5vYnNlcnZhdGlvbnMpO1xuICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBvcmlnaW5hbFNuYXBzaG90KTtcbiAgYXNzZXJ0Lm5vdEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdLCBvcmlnaW5hbCk7XG59KTtcblxudGVzdChcInJlbW92ZXMgbWlzc2luZyB1cGNvbWluZyBtYXRjaGVzIGJ1dCByZXRhaW5zIGNvbXBsZXRlZCBhbmQgcmVwb3J0ZWQgbWF0Y2hlc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVwY29taW5nID0gc3RvcmVkTWF0Y2goXCJyZW1vdmVkLXVwY29taW5nXCIpO1xuICBjb25zdCBjb21wbGV0ZWQgPSBzdG9yZWRNYXRjaChcInJlbW92ZWQtY29tcGxldGVkXCIsIHtcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIkxvc3QgMS0zXCIsXG4gIH0pO1xuICBjb25zdCByZXBvcnRlZCA9IHN0b3JlZE1hdGNoKFwicmVtb3ZlZC1yZXBvcnRlZFwiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1yZW1vdmVkLXJlcG9ydGVkXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIkdvb2QgcmVjb3ZlcnlcIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChcbiAgICBzdGF0ZVdpdGgodXBjb21pbmcsIGNvbXBsZXRlZCwgcmVwb3J0ZWQpLFxuICAgIHsgbWF0Y2hlczogW10gfSxcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIHJlc3VsdC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpLFxuICAgIFtcInJlbW92ZWQtY29tcGxldGVkXCIsIFwicmVtb3ZlZC1yZXBvcnRlZFwiXSxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBpbmNvbWluZyBtYXRjaGVzIHRoYXQgb3ZlcmxhcCBsb2NhbGx5IHJldGFpbmVkIG1hdGNoZXNcIiwgKCkgPT4ge1xuICBjb25zdCByZXRhaW5lZE1hdGNoZXMgPSBbXG4gICAgc3RvcmVkTWF0Y2goXCJsb2NhbFwiLCB7IGV4dGVybmFsSWQ6IG51bGwgfSksXG4gICAgc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIgfSksXG4gICAgc3RvcmVkTWF0Y2goXCJyZXBvcnRlZFwiLCB7XG4gICAgICByZXBvcnQ6IHtcbiAgICAgICAgbWF0Y2hJZDogXCJzdG9yZWQtcmVwb3J0ZWRcIixcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJHb29kIHJlY292ZXJ5XCJdLFxuICAgICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxODowMDowMFpcIixcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG5cbiAgZm9yIChjb25zdCByZXRhaW5lZCBvZiByZXRhaW5lZE1hdGNoZXMpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHN0YXRlV2l0aChyZXRhaW5lZCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpO1xuXG4gICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICgpID0+XG4gICAgICAgIG1lcmdlQ2x1YkxvY2tlckZlZWQoc3RhdGUsIHtcbiAgICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgICBpbmNvbWluZyhcIm5ldy1tYXRjaFwiLCB7XG4gICAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTU6MDA6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgL292ZXJsYXBwaW5nIGEgcmV0YWluZWQgbWF0Y2ggZm9yIHBsYXllciBJRCBcInBsYXllci0xXCIvLFxuICAgICk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChzdGF0ZSwgc25hcHNob3QpO1xuICB9XG59KTtcblxudGVzdChcImFsbG93cyBpbmNvbWluZyBtYXRjaGVzIGJhY2stdG8tYmFjayB3aXRoIGxvY2FsbHkgcmV0YWluZWQgbWF0Y2hlc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHJldGFpbmVkID0gc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgocmV0YWluZWQpLCB7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJuZXh0LW1hdGNoXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IHJldGFpbmVkLmVuZHNBdCxcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTY6MDA6MDAtMDQ6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgcmVzdWx0Lm1hdGNoZXMubWFwKChtYXRjaCkgPT4gbWF0Y2guZXh0ZXJuYWxJZCksXG4gICAgW1wiY29tcGxldGVkXCIsIFwibmV4dC1tYXRjaFwiXSxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBkdXBsaWNhdGUgZXh0ZXJuYWwgbWF0Y2ggSURzXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcImR1cGxpY2F0ZVwiKSwgaW5jb21pbmcoXCJkdXBsaWNhdGVcIildLFxuICAgICAgfSksXG4gICAgL2R1cGxpY2F0ZSBtYXRjaCBJRCBcImR1cGxpY2F0ZVwiLyxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBtYXRjaGVzIHdob3NlIGVuZCB0aW1lIGlzIG5vdCBhZnRlciB0aGUgc3RhcnQgdGltZVwiLCAoKSA9PiB7XG4gIGZvciAoY29uc3QgZW5kc0F0IG9mIFtcbiAgICBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgICBcIjIwMjYtMDktMTZUMTQ6Mjk6NTktMDQ6MDBcIixcbiAgXSkge1xuICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAoKSA9PlxuICAgICAgICBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICAgICAgICBtYXRjaGVzOiBbaW5jb21pbmcoXCJpbXBvc3NpYmxlLXRpbWVcIiwgeyBlbmRzQXQgfSldLFxuICAgICAgICB9KSxcbiAgICAgIC9tdXN0IGVuZCBhZnRlciBpdCBzdGFydHMvLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwicmVqZWN0cyB6ZXJvLWxlbmd0aCBtYXRjaGVzIGV4cHJlc3NlZCB3aXRoIGRpZmZlcmVudCB0aW1lem9uZSBvZmZzZXRzXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcInplcm8tbGVuZ3RoLWNyb3NzLW9mZnNldFwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMTozMDowMC0wNzowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgL211c3QgZW5kIGFmdGVyIGl0IHN0YXJ0cy8sXG4gICk7XG59KTtcblxudGVzdChcInJlamVjdHMgYSBuZWdhdGl2ZSBvbmUtc2Vjb25kIGR1cmF0aW9uIGFjcm9zcyB0aW1lem9uZSBvZmZzZXRzXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcIm5lZ2F0aXZlLWNyb3NzLW9mZnNldFwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMToyOTo1OS0wNzowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgL211c3QgZW5kIGFmdGVyIGl0IHN0YXJ0cy8sXG4gICk7XG59KTtcblxudGVzdChcImFsbG93cyBhIHBvc2l0aXZlIGR1cmF0aW9uIGFjcm9zcyB0aW1lem9uZSBvZmZzZXRzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtcbiAgICAgIGluY29taW5nKFwicG9zaXRpdmUtY3Jvc3Mtb2Zmc2V0XCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMTozMDowMS0wNzowMFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDEpO1xufSk7XG5cbnRlc3QoXCJyZWplY3RzIG92ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHRoZSBzYW1lIHBsYXllclwiLCAoKSA9PiB7XG4gIGFzc2VydC50aHJvd3MoXG4gICAgKCkgPT5cbiAgICAgIHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgaW5jb21pbmcoXCJsYXRlclwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE1OjAwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNTo0NTowMC0wNDowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluY29taW5nKFwiZWFybGllclwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgL292ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHBsYXllciBJRCBcInBsYXllci0xXCIvLFxuICApO1xufSk7XG5cbnRlc3QoXCJhbGxvd3MgYmFjay10by1iYWNrIG1hdGNoZXMgYXQgYW4gZXF1aXZhbGVudCBpbnN0YW50IGFjcm9zcyB0aW1lem9uZSBvZmZzZXRzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtcbiAgICAgIGluY29taW5nKFwiZmlyc3RcIiwge1xuICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjE1OjAwLTA0OjAwXCIsXG4gICAgICB9KSxcbiAgICAgIGluY29taW5nKFwiYmFjay10by1iYWNrXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMjoxNTowMC0wNzowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMzowMDowMC0wNzowMFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDIpO1xufSk7XG5cbnRlc3QoXCJyZWplY3RzIGEgb25lLXNlY29uZCBvdmVybGFwIGFjcm9zcyB0aW1lem9uZSBvZmZzZXRzXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcImZpcnN0XCIsIHtcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjE1OjAwLTA0OjAwXCIsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaW5jb21pbmcoXCJvdmVybGFwXCIsIHtcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTI6MTQ6NTktMDc6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEzOjAwOjAwLTA3OjAwXCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAvb3ZlcmxhcHBpbmcgbWF0Y2hlcyBmb3IgcGxheWVyIElEIFwicGxheWVyLTFcIi8sXG4gICk7XG59KTtcblxudGVzdChcImFsbG93cyBzYW1lLXRpbWUgbWF0Y2hlcyBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0cyBmb3IgZGlmZmVyZW50IHBsYXllcnNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJmaXJzdFwiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICAgIH0pLFxuICAgICAgaW5jb21pbmcoXCJvdGhlci1wbGF5ZXJcIiwge1xuICAgICAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMlwiLFxuICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDExOjMwOjAwLTA3OjAwXCIsXG4gICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEyOjE1OjAwLTA3OjAwXCIsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzLmxlbmd0aCwgMik7XG59KTtcblxudGVzdChcImFsbG93cyBiYWNrLXRvLWJhY2sgbWF0Y2hlcyBhbmQgb3ZlcmxhcHMgZm9yIGRpZmZlcmVudCBwbGF5ZXJzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtcbiAgICAgIGluY29taW5nKFwiZmlyc3RcIiksXG4gICAgICBpbmNvbWluZyhcImJhY2stdG8tYmFja1wiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTY6MDA6MDAtMDQ6MDBcIixcbiAgICAgIH0pLFxuICAgICAgaW5jb21pbmcoXCJvdGhlci1wbGF5ZXJcIiwge1xuICAgICAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMlwiLFxuICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjQ1OjAwLTA0OjAwXCIsXG4gICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjMwOjAwLTA0OjAwXCIsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzLmxlbmd0aCwgMyk7XG59KTtcblxudGVzdChcInJlamVjdHMgY29uZmxpY3RpbmcgZHVwbGljYXRlIHBsYXllciBJRHNcIiwgKCkgPT4ge1xuICBhc3NlcnQudGhyb3dzKFxuICAgICgpID0+XG4gICAgICBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICAgICAgbWF0Y2hlczogW10sXG4gICAgICAgIHBsYXllcnM6IFtcbiAgICAgICAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiIH0sXG4gICAgICAgICAgeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIkRpZmZlcmVudCBQbGF5ZXJcIiB9LFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgL2NvbmZsaWN0aW5nIG5hbWVzIGZvciBwbGF5ZXIgSUQgXCJwbGF5ZXItMVwiLyxcbiAgKTtcbn0pO1xuXG50ZXN0KFwiYWxsb3dzIGlkZW50aWNhbCBkdXBsaWNhdGUgcGxheWVyIHJlY29yZHNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW10sXG4gICAgcGxheWVyczogW1xuICAgICAgeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9LFxuICAgICAgeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9LFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLnBsYXllcnM/Lmxlbmd0aCwgMik7XG59KTtcblxudGVzdChcInBhcnNlZCBmZWVkcyByZWplY3QgcnVudGltZSBtdXRhdGlvbiBvZiBtYXRjaCBjb2xsZWN0aW9uc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbaW5jb21pbmcoXCJleGlzdGluZ1wiKV0sXG4gIH0pO1xuICBjb25zdCBtdXRhYmxlTWF0Y2hlcyA9IGZlZWQubWF0Y2hlcyBhcyBDbHViTG9ja2VyRmVlZFtcIm1hdGNoZXNcIl07XG5cbiAgYXNzZXJ0LnRocm93cygoKSA9PiBtdXRhYmxlTWF0Y2hlcy5wdXNoKGluY29taW5nKFwibmV3LW1hdGNoXCIpKSwgVHlwZUVycm9yKTtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDEpO1xuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzWzBdPy5leHRlcm5hbElkLCBcImV4aXN0aW5nXCIpO1xufSk7XG5cbnRlc3QoXCJwYXJzZWQgZmVlZHMgcmVqZWN0IHJ1bnRpbWUgbXV0YXRpb24gb2YgbWF0Y2ggZmllbGRzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcImV4aXN0aW5nXCIpXSxcbiAgfSk7XG4gIGNvbnN0IG11dGFibGVNYXRjaCA9IGZlZWQubWF0Y2hlc1swXSBhcyBDbHViTG9ja2VyRmVlZFtcIm1hdGNoZXNcIl1bbnVtYmVyXTtcblxuICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICBtdXRhYmxlTWF0Y2gub3Bwb25lbnQgPSBcIkNoYW5nZWQgb3Bwb25lbnRcIjtcbiAgfSwgVHlwZUVycm9yKTtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlc1swXT8ub3Bwb25lbnQsIFwiT3JpZ2luYWwgb3Bwb25lbnRcIik7XG59KTtcblxudGVzdChcInBhcnNlZCBmZWVkcyByZWplY3QgcnVudGltZSBtdXRhdGlvbiBvZiBwbGF5ZXIgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXSxcbiAgICBwbGF5ZXJzOiBbeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9XSxcbiAgfSk7XG4gIGNvbnN0IG11dGFibGVQbGF5ZXIgPSBmZWVkLnBsYXllcnM/LlswXSBhcyB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9O1xuXG4gIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgIG11dGFibGVQbGF5ZXIubmFtZSA9IFwiQ2hhbmdlZCBwbGF5ZXJcIjtcbiAgfSwgVHlwZUVycm9yKTtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQucGxheWVycz8uWzBdPy5uYW1lLCBcIlBsYXllciBPbmVcIik7XG59KTtcblxudGVzdChcImxvYWRlZCB0cmFja2VyIHNuYXBzaG90cyBhcmUgZGVlcGx5IGZyb3plbiBhdCBydW50aW1lXCIsICgpID0+IHtcbiAgY29uc3QgbG9hZGVkID0gc3RhdGVXaXRoKHN0b3JlZE1hdGNoKFwiZXhpc3RpbmdcIiwge1xuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJzdG9yZWQtZXhpc3RpbmdcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiS2VlcCB3aWR0aFwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IFwiQ29hY2ggbm90ZXNcIixcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDE4OjAwOjAwWlwiLFxuICAgIH0sXG4gIH0pKTtcbiAgbG9hZGVkLmJyYW5kaW5nID0geyBuYW1lOiBcIkNsdWJcIiwgbG9nb1BhdGg6IFwiL29iamVjdHMvdXBsb2Fkcy8wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIiB9O1xuICBsb2FkZWQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyA9IFt7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MTA6MDAuMDAwWlwiLFxuICAgIG91dGFnZUR1cmF0aW9uTXM6IDEwICogNjBfMDAwLFxuICB9XTtcblxuICBjb25zdCBzbmFwc2hvdCA9IGZyZWV6ZVRyYWNrZXJTdGF0ZShsb2FkZWQpO1xuICBjb25zdCBtdXRhdGlvbnMgPSBbXG4gICAgKCkgPT4gKChzbmFwc2hvdC5tYXRjaGVzIGFzIFRyYWNrZXJTdGF0ZVtcIm1hdGNoZXNcIl0pWzBdIS5vcHBvbmVudCA9IFwiQ2hhbmdlZFwiKSxcbiAgICAoKSA9PiAoKHNuYXBzaG90Lm1hdGNoZXNbMF0hLnJlcG9ydCEub2JzZXJ2YXRpb25zIGFzIHN0cmluZ1tdKS5wdXNoKFwiQ2hhbmdlZFwiKSksXG4gICAgKCkgPT4gKChzbmFwc2hvdC5wbGF5ZXJzIGFzIFRyYWNrZXJTdGF0ZVtcInBsYXllcnNcIl0pWzBdIS5uYW1lID0gXCJDaGFuZ2VkXCIpLFxuICAgICgpID0+ICgoc25hcHNob3QuY29hY2hlcyBhcyBUcmFja2VyU3RhdGVbXCJjb2FjaGVzXCJdKVswXSEubmFtZSA9IFwiQ2hhbmdlZFwiKSxcbiAgICAoKSA9PiAoKHNuYXBzaG90LmJyYW5kaW5nIGFzIFRyYWNrZXJTdGF0ZVtcImJyYW5kaW5nXCJdKSEubmFtZSA9IFwiQ2hhbmdlZFwiKSxcbiAgICAoKSA9PiAoKHNuYXBzaG90LnJlZnJlc2hIZWFsdGggYXMgVHJhY2tlclN0YXRlW1wicmVmcmVzaEhlYWx0aFwiXSkuY29uc2VjdXRpdmVGYWlsdXJlcyA9IDkpLFxuICAgICgpID0+ICgoc25hcHNob3QucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyBhcyBUcmFja2VyU3RhdGVbXCJyZWZyZXNoSGVhbHRoXCJdW1wicGVuZGluZ1JlY292ZXJpZXNcIl0pWzBdIS5mYWlsZWRBdHRlbXB0cyA9IDkpLFxuICBdO1xuXG4gIGZvciAoY29uc3QgbXV0YXRlIG9mIG11dGF0aW9ucykgYXNzZXJ0LnRocm93cyhtdXRhdGUsIFR5cGVFcnJvcik7XG59KTtcblxudGVzdChcIm11dGFibGUgdHJhY2tlciByZXBsYWNlbWVudHMgYXJlIGRldGFjaGVkIGZyb20gZnJvemVuIGxvYWRlZCBzbmFwc2hvdHNcIiwgKCkgPT4ge1xuICBjb25zdCBsb2FkZWQgPSBzdGF0ZVdpdGgoc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1leGlzdGluZ1wiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJLZWVwIHdpZHRoXCJdLFxuICAgICAgdHJhbnNjcmlwdDogXCJDb2FjaCBub3Rlc1wiLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgfSxcbiAgfSkpO1xuICBsb2FkZWQuYnJhbmRpbmcgPSB7IG5hbWU6IFwiQ2x1YlwiLCBsb2dvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzLzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiIH07XG4gIGxvYWRlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMjoxMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMTAgKiA2MF8wMDAsXG4gIH1dO1xuICBjb25zdCBzbmFwc2hvdCA9IGZyZWV6ZVRyYWNrZXJTdGF0ZShsb2FkZWQpO1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHNuYXBzaG90KTtcblxuICByZXBsYWNlbWVudC5tYXRjaGVzWzBdIS5yZXBvcnQhLm9ic2VydmF0aW9ucy5wdXNoKFwiQ2hhbmdlZFwiKTtcbiAgcmVwbGFjZW1lbnQucGxheWVyc1swXSEubmFtZSA9IFwiQ2hhbmdlZFwiO1xuICByZXBsYWNlbWVudC5jb2FjaGVzWzBdIS5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIHJlcGxhY2VtZW50LmJyYW5kaW5nIS5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcyA9IDk7XG4gIHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0hLmZhaWxlZEF0dGVtcHRzID0gOTtcblxuICBhc3NlcnQuZXF1YWwoc25hcHNob3QubWF0Y2hlc1swXSEucmVwb3J0IS5vYnNlcnZhdGlvbnMubGVuZ3RoLCAxKTtcbiAgYXNzZXJ0LmVxdWFsKHNuYXBzaG90LnBsYXllcnNbMF0hLm5hbWUsIFwiUGxheWVyIE9uZVwiKTtcbiAgYXNzZXJ0LmVxdWFsKHNuYXBzaG90LmNvYWNoZXNbMF0hLm5hbWUsIFwiQ29hY2ggT25lXCIpO1xuICBhc3NlcnQuZXF1YWwoc25hcHNob3QuYnJhbmRpbmchLm5hbWUsIFwiQ2x1YlwiKTtcbiAgYXNzZXJ0LmVxdWFsKHNuYXBzaG90LnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcywgMCk7XG4gIGFzc2VydC5lcXVhbChzbmFwc2hvdC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdIS5mYWlsZWRBdHRlbXB0cywgMik7XG59KTtcblxudGVzdChcIm11dGFibGUgcmVwbGFjZW1lbnQgcGxheWVycyBkbyBub3Qgc2hhcmUgdmFsaWRhdGVkIGZlZWQgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXSxcbiAgICBwbGF5ZXJzOiBbeyBpZDogXCJwbGF5ZXItMlwiLCBuYW1lOiBcIlBsYXllciBUd29cIiB9XSxcbiAgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgoKSwgZmVlZCk7XG4gIGNvbnN0IHJlcGxhY2VtZW50UGxheWVyID0gcmVzdWx0LnBsYXllcnMuZmluZChcbiAgICAocGxheWVyKSA9PiBwbGF5ZXIuaWQgPT09IFwicGxheWVyLTJcIixcbiAgKTtcbiAgYXNzZXJ0Lm9rKHJlcGxhY2VtZW50UGxheWVyKTtcblxuICByZXBsYWNlbWVudFBsYXllci5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIGFzc2VydC5lcXVhbChmZWVkLnBsYXllcnM/LlswXT8ubmFtZSwgXCJQbGF5ZXIgVHdvXCIpO1xufSk7XG5cbnRlc3QoXCJpbnZhbGlkIGZlZWRzIG5ldmVyIHBlcnNpc3QgYSByZXBsYWNlbWVudCBzdGF0ZVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsID0gc3RhdGVXaXRoKHN0b3JlZE1hdGNoKFwiZXhpc3RpbmdcIikpO1xuICBsZXQgcGVyc2lzdGVkID0gZmFsc2U7XG5cbiAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgcmVmcmVzaFRyYWNrZXJTdGF0ZShcbiAgICAgIGFzeW5jICgpID0+IG9yaWdpbmFsLFxuICAgICAgYXN5bmMgKCkgPT4gcGFyc2VDbHViTG9ja2VyRmVlZCh7IG1hdGNoZXM6IFt7IGV4dGVybmFsSWQ6IFwiYnJva2VuXCIgfV0gfSksXG4gICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIHBlcnNpc3RlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICksXG4gICAgL2ludmFsaWQgc3RhcnRzQXQvLFxuICApO1xuXG4gIGFzc2VydC5lcXVhbChwZXJzaXN0ZWQsIGZhbHNlKTtcbiAgYXNzZXJ0LmVxdWFsKG9yaWdpbmFsLm1hdGNoZXNbMF0/Lm9wcG9uZW50LCBcIk9yaWdpbmFsIG9wcG9uZW50XCIpO1xufSk7XG5cbnRlc3QoXCJyZXRhaW5lZC1tYXRjaCBvdmVybGFwcyBuZXZlciBtdXRhdGUgb3IgcGVyc2lzdCB0cmFja2VyIHN0YXRlXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZVdpdGgoXG4gICAgc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIgfSksXG4gICk7XG4gIGNvbnN0IHNuYXBzaG90ID0gc3RydWN0dXJlZENsb25lKG9yaWdpbmFsKTtcbiAgbGV0IHBlcnNpc3RlZCA9IGZhbHNlO1xuXG4gIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgIGFzeW5jICgpID0+ICh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcIm5ldy1tYXRjaFwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE1OjAwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNTo0NTowMC0wNDowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIHBlcnNpc3RlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICksXG4gICAgL292ZXJsYXBwaW5nIGEgcmV0YWluZWQgbWF0Y2gvLFxuICApO1xuXG4gIGFzc2VydC5lcXVhbChwZXJzaXN0ZWQsIGZhbHNlKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChvcmlnaW5hbCwgc25hcHNob3QpO1xufSk7XG5cbnRlc3QoXCJyZXNjaGVkdWxlZCBpbXBvcnRlZCBtYXRjaGVzIGNhbm5vdCBvdmVybGFwIGFic2VudCBzYXZlZCBoaXN0b3J5IGFjcm9zcyB0aW1lem9uZSBvZmZzZXRzXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVwb3J0ZWRNYXRjaCA9IHN0b3JlZE1hdGNoKFwicmVwb3J0ZWRcIiwge1xuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJzdG9yZWQtcmVwb3J0ZWRcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiR29vZCByZWNvdmVyeVwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IG51bGwsXG4gICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxODowMDowMFpcIixcbiAgICB9LFxuICB9KTtcbiAgY29uc3QgYWJzZW50U2F2ZWRNYXRjaGVzID0gW1xuICAgIHN0b3JlZE1hdGNoKFwiY29tcGxldGVkXCIsIHsgc3RhdHVzOiBcImNvbXBsZXRlZFwiLCByZXN1bHQ6IFwiV29uIDMtMVwiIH0pLFxuICAgIHJlcG9ydGVkTWF0Y2gsXG4gIF07XG5cbiAgZm9yIChjb25zdCBhYnNlbnRTYXZlZE1hdGNoIG9mIGFic2VudFNhdmVkTWF0Y2hlcykge1xuICAgIGNvbnN0IGltcG9ydGVkID0gc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiLCB7XG4gICAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICAgIHJlc3VsdDogXCJMb2NhbCByZXN1bHRcIixcbiAgICB9KTtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlV2l0aChpbXBvcnRlZCwgYWJzZW50U2F2ZWRNYXRjaCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUob3JpZ2luYWwpO1xuICAgIGxldCBwZXJzaXN0ZWQgPSBmYWxzZTtcblxuICAgIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgICAgcmVmcmVzaFRyYWNrZXJTdGF0ZShcbiAgICAgICAgYXN5bmMgKCkgPT4gb3JpZ2luYWwsXG4gICAgICAgIGFzeW5jICgpID0+ICh7XG4gICAgICAgICAgbWF0Y2hlczogW1xuICAgICAgICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMjoxNDo1OS0wNzowMFwiLFxuICAgICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMzowMDowMC0wNzowMFwiLFxuICAgICAgICAgICAgICB2ZW51ZTogXCJDaGFuZ2VkIHZlbnVlXCIsXG4gICAgICAgICAgICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcGVyc2lzdGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgICAvb3ZlcmxhcHBpbmcgYSByZXRhaW5lZCBtYXRjaCBmb3IgcGxheWVyIElEIFwicGxheWVyLTFcIi8sXG4gICAgKTtcblxuICAgIGFzc2VydC5lcXVhbChwZXJzaXN0ZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBzbmFwc2hvdCk7XG4gICAgYXNzZXJ0LmVxdWFsKG9yaWdpbmFsLm1hdGNoZXNbMF0/LmNvYWNoSWQsIFwiY29hY2gtMVwiKTtcbiAgICBhc3NlcnQuZXF1YWwob3JpZ2luYWwubWF0Y2hlc1swXT8ucmVzdWx0LCBcIkxvY2FsIHJlc3VsdFwiKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJyZXNjaGVkdWxlZCBpbXBvcnRlZCBtYXRjaGVzIGNhbiBzdGFydCBhdCBhbiBlcXVpdmFsZW50IGJvdW5kYXJ5IGluc3RhbnQgYWNyb3NzIHRpbWV6b25lIG9mZnNldHNcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXBvcnRlZE1hdGNoID0gc3RvcmVkTWF0Y2goXCJyZXBvcnRlZFwiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1yZXBvcnRlZFwiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJHb29kIHJlY292ZXJ5XCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDE4OjAwOjAwWlwiLFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBhYnNlbnRTYXZlZE1hdGNoZXMgPSBbXG4gICAgc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIsIHJlc3VsdDogXCJXb24gMy0xXCIgfSksXG4gICAgcmVwb3J0ZWRNYXRjaCxcbiAgXTtcblxuICBmb3IgKGNvbnN0IGFic2VudFNhdmVkTWF0Y2ggb2YgYWJzZW50U2F2ZWRNYXRjaGVzKSB7XG4gICAgY29uc3QgaW1wb3J0ZWQgPSBzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIsIHtcbiAgICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgICAgcmVzdWx0OiBcIkxvY2FsIHJlc3VsdFwiLFxuICAgIH0pO1xuICAgIGNvbnN0IG9yaWdpbmFsID0gc3RhdGVXaXRoKGltcG9ydGVkLCBhYnNlbnRTYXZlZE1hdGNoKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG4gICAgbGV0IHBlcnNpc3RlZDogVHJhY2tlclN0YXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCByZWZyZXNoVHJhY2tlclN0YXRlKFxuICAgICAgYXN5bmMgKCkgPT4gb3JpZ2luYWwsXG4gICAgICBhc3luYyAoKSA9PiAoe1xuICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgICAgICBvcHBvbmVudDogXCJDaGFuZ2VkIG9wcG9uZW50XCIsXG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEyOjE1OjAwLTA3OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMzowMDowMC0wNzowMFwiLFxuICAgICAgICAgICAgdmVudWU6IFwiQ2hhbmdlZCB2ZW51ZVwiLFxuICAgICAgICAgICAgY291cnQ6IFwiQ291cnQgN1wiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICBhc3luYyAocmVwbGFjZW1lbnQpID0+IHtcbiAgICAgICAgcGVyc2lzdGVkID0gcmVwbGFjZW1lbnQ7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoZWRJbXBvcnRlZCA9IHJlZnJlc2hlZC5tYXRjaGVzLmZpbmQoXG4gICAgICAobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQgPT09IFwiZXhpc3RpbmdcIixcbiAgICApO1xuICAgIGFzc2VydC5vayhyZWZyZXNoZWRJbXBvcnRlZCk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlZnJlc2hlZEltcG9ydGVkLnN0YXJ0c0F0LCBcIjIwMjYtMDktMTZUMTI6MTU6MDAtMDc6MDBcIik7XG4gICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgRGF0ZS5wYXJzZShyZWZyZXNoZWRJbXBvcnRlZC5zdGFydHNBdCksXG4gICAgICBEYXRlLnBhcnNlKGFic2VudFNhdmVkTWF0Y2guZW5kc0F0KSxcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChyZWZyZXNoZWRJbXBvcnRlZC5jb2FjaElkLCBcImNvYWNoLTFcIik7XG4gICAgYXNzZXJ0LmVxdWFsKHJlZnJlc2hlZEltcG9ydGVkLnJlc3VsdCwgXCJMb2NhbCByZXN1bHRcIik7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChwZXJzaXN0ZWQsIHJlZnJlc2hlZCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChvcmlnaW5hbCwgc25hcHNob3QpO1xuICB9XG59KTtcblxudGVzdChcInJlZnJlc2ggdmFsaWRhdGVzIHR5cGVkIGZlZWRzIGJlZm9yZSBtZXJnaW5nIG9yIHBlcnNpc3RpbmcgdGhlbVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGludmFsaWRGZWVkcyA9IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXG4gICAgICAgIGluY29taW5nKFwiZXhpc3RpbmdcIiwge1xuICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXG4gICAgICAgIGluY29taW5nKFwiZXhpc3RpbmdcIiwge1xuICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgcGxheWVyczogW1xuICAgICAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiIH0sXG4gICAgICAgIHsgaWQ6IFwicGxheWVyLTFcIiwgbmFtZTogXCJEaWZmZXJlbnQgUGxheWVyXCIgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXG4gICAgICAgIGluY29taW5nKFwiZXhpc3RpbmdcIiwge1xuICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgfSksXG4gICAgICAgIGluY29taW5nKFwib3ZlcmxhcFwiLCB7XG4gICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNTowMDowMC0wNDowMFwiLFxuICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjQ1OjAwLTA0OjAwXCIsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xuXG4gIGZvciAoY29uc3QgaW52YWxpZEZlZWQgb2YgaW52YWxpZEZlZWRzKSB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZVdpdGgoc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiKSk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUob3JpZ2luYWwpO1xuICAgIGxldCBwZXJzaXN0ZWQgPSBmYWxzZTtcblxuICAgIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgICAgcmVmcmVzaFRyYWNrZXJTdGF0ZShcbiAgICAgICAgYXN5bmMgKCkgPT4gb3JpZ2luYWwsXG4gICAgICAgIGFzeW5jICgpID0+IGludmFsaWRGZWVkLFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcGVyc2lzdGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGFzc2VydC5lcXVhbChwZXJzaXN0ZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBzbmFwc2hvdCk7XG4gIH1cbn0pO1xuXG50ZXN0KFwidW5hdmFpbGFibGUgZmVlZHMgbGVhdmUgc3RvcmVkIHRyYWNrZXIgc3RhdGUgdW5jaGFuZ2VkXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZVdpdGgoc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiKSk7XG4gIGxldCBwZXJzaXN0ZWQgPSBmYWxzZTtcblxuICBhd2FpdCBhc3NlcnQucmVqZWN0cyhcbiAgICByZWZyZXNoVHJhY2tlclN0YXRlKFxuICAgICAgYXN5bmMgKCkgPT4gb3JpZ2luYWwsXG4gICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsdWIgTG9ja2VyIHJldHVybmVkIEhUVFAgNTAzXCIpO1xuICAgICAgfSxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgcGVyc2lzdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKSxcbiAgICAvSFRUUCA1MDMvLFxuICApO1xuXG4gIGFzc2VydC5lcXVhbChwZXJzaXN0ZWQsIGZhbHNlKTtcbiAgYXNzZXJ0LmVxdWFsKG9yaWdpbmFsLm1hdGNoZXNbMF0/Lm9wcG9uZW50LCBcIk9yaWdpbmFsIG9wcG9uZW50XCIpO1xufSk7XG5cbnRlc3QoXCJmYWlsZWQgcGVyc2lzdGVuY2UgbGVhdmVzIHRoZSBsb2FkZWQgdHJhY2tlciBzdGF0ZSB1bmNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlV2l0aChcbiAgICBzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIsIHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgICByZXBvcnQ6IHtcbiAgICAgICAgbWF0Y2hJZDogXCJzdG9yZWQtZXhpc3RpbmdcIixcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJLZWVwIHdpZHRoXCJdLFxuICAgICAgICB0cmFuc2NyaXB0OiBcIkNvYWNoIG5vdGVzXCIsXG4gICAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDE4OjAwOjAwWlwiLFxuICAgICAgfSxcbiAgICB9KSxcbiAgKTtcbiAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUob3JpZ2luYWwpO1xuXG4gIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgIGFzeW5jICgpID0+ICh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcImV4aXN0aW5nXCIsIHtcbiAgICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTdUMTA6MDA6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE3VDEwOjQ1OjAwLTA0OjAwXCIsXG4gICAgICAgICAgICB2ZW51ZTogXCJDaGFuZ2VkIHZlbnVlXCIsXG4gICAgICAgICAgICBjb3VydDogXCJDb3VydCA3XCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGVyc2lzdGVuY2UgdW5hdmFpbGFibGVcIik7XG4gICAgICB9LFxuICAgICksXG4gICAgL1BlcnNpc3RlbmNlIHVuYXZhaWxhYmxlLyxcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBzbmFwc2hvdCk7XG59KTtcblxudGVzdChcImNvdW50cyBjb25zZWN1dGl2ZSByZWZyZXNoIGZhaWx1cmVzIGFuZCBwcmVzZXJ2ZXMgYWxlcnQgc3RhdGVcIiwgKCkgPT4ge1xuICBjb25zdCBmaXJzdCA9IHJlY29yZFJlZnJlc2hGYWlsdXJlKFxuICAgIHN0YXRlV2l0aCgpLFxuICAgIDIsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgKTtcbiAgZmlyc3QucmVmcmVzaEhlYWx0aC5hbGVydFNlbnRBdCA9IFwiMjAyNi0wOS0xNlQxMjowMTowMC4wMDBaXCI7XG4gIGNvbnN0IHNlY29uZCA9IHJlY29yZFJlZnJlc2hGYWlsdXJlKFxuICAgIGZpcnN0LFxuICAgIDIsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjA1OjAwLjAwMFpcIixcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKHNlY29uZC5yZWZyZXNoSGVhbHRoLCB7XG4gICAgY29uc2VjdXRpdmVGYWlsdXJlczogMixcbiAgICBhbGVydFRocmVzaG9sZDogMixcbiAgICBmaXJzdEZhaWx1cmVBdDogXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgICBsYXN0RmFpbHVyZUF0OiBcIjIwMjYtMDktMTZUMTI6MDU6MDAuMDAwWlwiLFxuICAgIGFsZXJ0U2VudEF0OiBcIjIwMjYtMDktMTZUMTI6MDE6MDAuMDAwWlwiLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbXSxcbiAgfSk7XG59KTtcblxudGVzdChcInN1Y2Nlc3NmdWwgcmVmcmVzaCBjbGVhcnMgdGhlIGZhaWx1cmUgY29uZGl0aW9uIGFuZCBxdWV1ZXMgaXRzIHJlY292ZXJ5XCIsICgpID0+IHtcbiAgY29uc3QgZmFpbGluZyA9IHJlY29yZFJlZnJlc2hGYWlsdXJlKFxuICAgIHN0YXRlV2l0aCgpLFxuICAgIDIsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgKTtcbiAgZmFpbGluZy5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gXCIyMDI2LTA5LTE2VDEyOjAxOjAwLjAwMFpcIjtcbiAgY29uc3QgaGVhbHRoeSA9IGNsZWFyUmVmcmVzaEZhaWx1cmVzKFxuICAgIGZhaWxpbmcsXG4gICAgNCxcbiAgICBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICApO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoaGVhbHRoeS5yZWZyZXNoSGVhbHRoLCB7XG4gICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICBhbGVydFRocmVzaG9sZDogNCxcbiAgICBmaXJzdEZhaWx1cmVBdDogbnVsbCxcbiAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGFsZXJ0U2VudEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbe1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDEsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IGZhaWxpbmcucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCxcbiAgICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICAgICAgb3V0YWdlRHVyYXRpb25NczogMjAgKiA2MF8wMDAsXG4gICAgfV0sXG4gIH0pO1xufSk7XG5cbnRlc3QoXCJzdWNjZXNzZnVsIHJlZnJlc2ggcHJlc2VydmVzIHBlbmRpbmcgcmVjb3ZlcmllcyB1bnRpbCBkZWxpdmVyeSBzdWNjZWVkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHBlbmRpbmcgPSB7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IDMsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICAgIG91dGFnZUR1cmF0aW9uTXM6IDIwICogNjBfMDAwLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IHN0YXRlV2l0aCgpO1xuICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3BlbmRpbmddO1xuXG4gIGNvbnN0IHJldHJpZWQgPSBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgICBzdGF0ZSxcbiAgICAzLFxuICAgIFwiMjAyNi0wOS0xNlQxMjozMDowMC4wMDBaXCIsXG4gICk7XG4gIGFzc2VydC5kZWVwRXF1YWwocmV0cmllZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLCBbcGVuZGluZ10pO1xuICBhc3NlcnQubm90RXF1YWwocmV0cmllZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdLCBwZW5kaW5nKTtcblxuICBjb25zdCBkZWxpdmVyZWQgPSBjbGVhclBlbmRpbmdSZWNvdmVyeShyZXRyaWVkKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChkZWxpdmVyZWQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcywgW10pO1xuICBhc3NlcnQuZGVlcEVxdWFsKHJldHJpZWQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcywgW3BlbmRpbmddKTtcbn0pO1xuXG50ZXN0KFwibXV0YWJsZSBmYWlsdXJlIHN0YXRlIGRvZXMgbm90IHNoYXJlIGxvYWRlZCByZWNvdmVyeSBtZXRhZGF0YVwiLCAoKSA9PiB7XG4gIGNvbnN0IGxvYWRlZCA9IHN0YXRlV2l0aCgpO1xuICBsb2FkZWQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyA9IFt7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IDMsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICAgIG91dGFnZUR1cmF0aW9uTXM6IDIwICogNjBfMDAwLFxuICB9XTtcblxuICBjb25zdCByZXBsYWNlbWVudCA9IHJlY29yZFJlZnJlc2hGYWlsdXJlKFxuICAgIGxvYWRlZCxcbiAgICAzLFxuICAgIFwiMjAyNi0wOS0xNlQxMjozMDowMC4wMDBaXCIsXG4gICk7XG4gIGFzc2VydC5ub3RFcXVhbChcbiAgICByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdLFxuICAgIGxvYWRlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdLFxuICApO1xuXG4gIHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0hLmZhaWxlZEF0dGVtcHRzID0gNDtcbiAgYXNzZXJ0LmVxdWFsKGxvYWRlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdIS5mYWlsZWRBdHRlbXB0cywgMyk7XG59KTtcblxudGVzdChcImJhY2stdG8tYmFjayBhbGVydGVkIG91dGFnZXMgcXVldWUgcmVjb3ZlcmllcyBpbiBvcmRlclwiLCAoKSA9PiB7XG4gIGNvbnN0IGZpcnN0T3V0YWdlID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgc3RhdGVXaXRoKCksXG4gICAgMSxcbiAgICBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICApO1xuICBmaXJzdE91dGFnZS5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIjtcbiAgY29uc3QgZmlyc3RSZWNvdmVyeSA9IGNsZWFyUmVmcmVzaEZhaWx1cmVzKFxuICAgIGZpcnN0T3V0YWdlLFxuICAgIDEsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjEwOjAwLjAwMFpcIixcbiAgKTtcbiAgY29uc3Qgc2Vjb25kT3V0YWdlID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgZmlyc3RSZWNvdmVyeSxcbiAgICAxLFxuICAgIFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCIsXG4gICk7XG4gIHNlY29uZE91dGFnZS5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gXCIyMDI2LTA5LTE2VDEyOjIwOjAwLjAwMFpcIjtcbiAgY29uc3Qgc2Vjb25kUmVjb3ZlcnkgPSBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgICBzZWNvbmRPdXRhZ2UsXG4gICAgMSxcbiAgICBcIjIwMjYtMDktMTZUMTI6MzU6MDAuMDAwWlwiLFxuICApO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgc2Vjb25kUmVjb3ZlcnkucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5tYXAoXG4gICAgICAocmVjb3ZlcnkpID0+IHJlY292ZXJ5Lm91dGFnZVN0YXJ0ZWRBdCxcbiAgICApLFxuICAgIFtcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLCBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiXSxcbiAgKTtcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGNsZWFyUGVuZGluZ1JlY292ZXJ5KHNlY29uZFJlY292ZXJ5KS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzWzBdXG4gICAgICA/Lm91dGFnZVN0YXJ0ZWRBdCxcbiAgICBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICApO1xufSk7XG5cbnRlc3QoXCJyZXBvcnRzIHJlY292ZXJ5IGRldGFpbHMgb25seSBhZnRlciBhbiBhbGVydGVkIGZhaWx1cmVcIiwgKCkgPT4ge1xuICBjb25zdCBub3JtYWxTdWNjZXNzID0gZ2V0UmVmcmVzaFJlY292ZXJ5KFxuICAgIHN0YXRlV2l0aCgpLFxuICAgIFwiMjAyNi0wOS0xNlQxMjoxMDowMC4wMDBaXCIsXG4gICk7XG4gIGFzc2VydC5lcXVhbChub3JtYWxTdWNjZXNzLCBudWxsKTtcblxuICBjb25zdCBmYWlsaW5nID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgc3RhdGVXaXRoKCksXG4gICAgMixcbiAgICBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICApO1xuICBjb25zdCBhbGVydGVkID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgZmFpbGluZyxcbiAgICAyLFxuICAgIFwiMjAyNi0wOS0xNlQxMjowNTowMC4wMDBaXCIsXG4gICk7XG4gIGFsZXJ0ZWQucmVmcmVzaEhlYWx0aC5hbGVydFNlbnRBdCA9IFwiMjAyNi0wOS0xNlQxMjowNTowMC4wMDBaXCI7XG5cbiAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICBnZXRSZWZyZXNoUmVjb3ZlcnkoYWxlcnRlZCwgXCIyMDI2LTA5LTE2VDEyOjIwOjAwLjAwMFpcIiksXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEyOjIwOjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDIwICogNjBfMDAwLFxuICAgIH0sXG4gICk7XG59KTsiLCAidHlwZSBUcmFja2VyUGVyc29uID0geyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfTtcblxudHlwZSBUcmFja2VyTWF0Y2ggPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBleHRlcm5hbElkOiBzdHJpbmcgfCBudWxsO1xuICAgIHBsYXllcklkOiBzdHJpbmc7XG4gICAgb3Bwb25lbnQ6IHN0cmluZztcbiAgICBzdGFydHNBdDogc3RyaW5nO1xuICAgIGVuZHNBdDogc3RyaW5nO1xuICAgIHZlbnVlOiBzdHJpbmc7XG4gICAgY291cnQ6IHN0cmluZztcbiAgICBjb2FjaElkOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICAgIHJlc3VsdDogc3RyaW5nIHwgbnVsbDtcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IHN0cmluZztcbiAgICAgIG9ic2VydmF0aW9uczogc3RyaW5nW107XG4gICAgICB0cmFuc2NyaXB0OiBzdHJpbmcgfCBudWxsO1xuICAgICAgYXVkaW9QYXRoPzogc3RyaW5nIHwgbnVsbDtcbiAgICAgIHVwZGF0ZWRBdDogc3RyaW5nO1xuICAgIH0gfCBudWxsO1xuICB9O1xuXG5leHBvcnQgdHlwZSBUcmFja2VyU3RhdGUgPSB7XG4gIHBsYXllcnM6IFRyYWNrZXJQZXJzb25bXTtcbiAgY29hY2hlczogVHJhY2tlclBlcnNvbltdO1xuICBicmFuZGluZz86IHsgbmFtZTogc3RyaW5nOyBsb2dvUGF0aDogc3RyaW5nIHwgbnVsbCB9O1xuICBtYXRjaGVzOiBUcmFja2VyTWF0Y2hbXTtcbiAgbGFzdFVwZGF0ZWRBdDogc3RyaW5nO1xuICBzb3VyY2U6IFwic2FtcGxlXCIgfCBcImNsdWItbG9ja2VyXCI7XG4gIHJlZnJlc2hIZWFsdGg6IFJlZnJlc2hIZWFsdGg7XG59O1xuXG50eXBlIERlZXBSZWFkb25seTxUPiA9IFQgZXh0ZW5kcyAoLi4uYXJnczogbmV2ZXJbXSkgPT4gdW5rbm93blxuICA/IFRcbiAgOiBUIGV4dGVuZHMgcmVhZG9ubHkgKGluZmVyIEl0ZW0pW11cbiAgICA/IHJlYWRvbmx5IERlZXBSZWFkb25seTxJdGVtPltdXG4gICAgOiBUIGV4dGVuZHMgb2JqZWN0XG4gICAgICA/IHsgcmVhZG9ubHkgW0tleSBpbiBrZXlvZiBUXTogRGVlcFJlYWRvbmx5PFRbS2V5XT4gfVxuICAgICAgOiBUO1xuXG5leHBvcnQgdHlwZSBSZWFkb25seVRyYWNrZXJTdGF0ZSA9IERlZXBSZWFkb25seTxUcmFja2VyU3RhdGU+O1xuXG5leHBvcnQgdHlwZSBSZWZyZXNoSGVhbHRoID0ge1xuICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBudW1iZXI7XG4gIGFsZXJ0VGhyZXNob2xkOiBudW1iZXI7XG4gIGZpcnN0RmFpbHVyZUF0OiBzdHJpbmcgfCBudWxsO1xuICBsYXN0RmFpbHVyZUF0OiBzdHJpbmcgfCBudWxsO1xuICBhbGVydFNlbnRBdDogc3RyaW5nIHwgbnVsbDtcbiAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBzdHJpbmcgfCBudWxsO1xuICBwZW5kaW5nUmVjb3ZlcmllczogUmVmcmVzaFJlY292ZXJ5W107XG4gIHJlY292ZXJ5Q2xhaW06IHtcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IHN0cmluZztcbiAgICByZWNvdmVyZWRBdDogc3RyaW5nO1xuICAgIGNsYWltZWRBdDogc3RyaW5nO1xuICB9IHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIFJlZnJlc2hSZWNvdmVyeSA9IHtcbiAgZmFpbGVkQXR0ZW1wdHM6IG51bWJlcjtcbiAgb3V0YWdlU3RhcnRlZEF0OiBzdHJpbmc7XG4gIHJlY292ZXJlZEF0OiBzdHJpbmc7XG4gIG91dGFnZUR1cmF0aW9uTXM6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVRyYWNrZXJTdGF0ZShzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUpOiBUcmFja2VyU3RhdGUge1xuICByZXR1cm4ge1xuICAgIHBsYXllcnM6IHN0YXRlLnBsYXllcnMubWFwKChwbGF5ZXIpID0+ICh7IC4uLnBsYXllciB9KSksXG4gICAgY29hY2hlczogc3RhdGUuY29hY2hlcy5tYXAoKGNvYWNoKSA9PiAoeyAuLi5jb2FjaCB9KSksXG4gICAgYnJhbmRpbmc6IHN0YXRlLmJyYW5kaW5nID8geyAuLi5zdGF0ZS5icmFuZGluZyB9IDogdW5kZWZpbmVkLFxuICAgIG1hdGNoZXM6IHN0YXRlLm1hdGNoZXMubWFwKGNsb25lVHJhY2tlck1hdGNoKSxcbiAgICBsYXN0VXBkYXRlZEF0OiBzdGF0ZS5sYXN0VXBkYXRlZEF0LFxuICAgIHNvdXJjZTogc3RhdGUuc291cmNlLFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgICAgICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZVRyYWNrZXJTdGF0ZShzdGF0ZTogVHJhY2tlclN0YXRlKTogUmVhZG9ubHlUcmFja2VyU3RhdGUge1xuICBmb3IgKGNvbnN0IHBsYXllciBvZiBzdGF0ZS5wbGF5ZXJzKSBPYmplY3QuZnJlZXplKHBsYXllcik7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucGxheWVycyk7XG4gIGZvciAoY29uc3QgY29hY2ggb2Ygc3RhdGUuY29hY2hlcykgT2JqZWN0LmZyZWV6ZShjb2FjaCk7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUuY29hY2hlcyk7XG4gIGlmIChzdGF0ZS5icmFuZGluZykgT2JqZWN0LmZyZWV6ZShzdGF0ZS5icmFuZGluZyk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2Ygc3RhdGUubWF0Y2hlcykge1xuICAgIGlmIChtYXRjaC5yZXBvcnQpIHtcbiAgICAgIE9iamVjdC5mcmVlemUobWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9ucyk7XG4gICAgICBPYmplY3QuZnJlZXplKG1hdGNoLnJlcG9ydCk7XG4gICAgfVxuICAgIE9iamVjdC5mcmVlemUobWF0Y2gpO1xuICB9XG4gIE9iamVjdC5mcmVlemUoc3RhdGUubWF0Y2hlcyk7XG4gIGZvciAoY29uc3QgcmVjb3Zlcnkgb2Ygc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcykge1xuICAgIE9iamVjdC5mcmVlemUocmVjb3ZlcnkpO1xuICB9XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcyk7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aCk7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgcmVjb3ZlcmllczogcmVhZG9ubHkgRGVlcFJlYWRvbmx5PFJlZnJlc2hSZWNvdmVyeT5bXSxcbik6IFJlZnJlc2hSZWNvdmVyeVtdIHtcbiAgcmV0dXJuIHJlY292ZXJpZXMubWFwKChyZWNvdmVyeSkgPT4gKHsgLi4ucmVjb3ZlcnkgfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVmcmVzaFJlY292ZXJ5KFxuICBzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHJlY292ZXJlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuKTogUmVmcmVzaFJlY292ZXJ5IHwgbnVsbCB7XG4gIGNvbnN0IHsgYWxlcnRTZW50QXQsIGNvbnNlY3V0aXZlRmFpbHVyZXMsIGZpcnN0RmFpbHVyZUF0IH0gPVxuICAgIHN0YXRlLnJlZnJlc2hIZWFsdGg7XG4gIGlmIChcbiAgICBhbGVydFNlbnRBdCA9PT0gbnVsbCB8fFxuICAgIGNvbnNlY3V0aXZlRmFpbHVyZXMgPT09IDAgfHxcbiAgICBmaXJzdEZhaWx1cmVBdCA9PT0gbnVsbFxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IGNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBmaXJzdEZhaWx1cmVBdCxcbiAgICByZWNvdmVyZWRBdCxcbiAgICBvdXRhZ2VEdXJhdGlvbk1zOiBNYXRoLm1heChcbiAgICAgIDAsXG4gICAgICBEYXRlLnBhcnNlKHJlY292ZXJlZEF0KSAtIERhdGUucGFyc2UoZmlyc3RGYWlsdXJlQXQpLFxuICAgICksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICBhbGVydFRocmVzaG9sZDogbnVtYmVyLFxuICByZWNvdmVyZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICBjb25zdCBwZW5kaW5nUmVjb3ZlcmllcyA9IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXM7XG4gIGNvbnN0IHJlY292ZXJ5ID0gZ2V0UmVmcmVzaFJlY292ZXJ5KHN0YXRlLCByZWNvdmVyZWRBdCk7XG4gIGlmIChyZWNvdmVyeSkgcGVuZGluZ1JlY292ZXJpZXMucHVzaChyZWNvdmVyeSk7XG4gIHJldHVybiB7XG4gICAgLi4ucmVwbGFjZW1lbnQsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICAgIGFsZXJ0VGhyZXNob2xkLFxuICAgICAgZmlyc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IG51bGwsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgIHJlY292ZXJ5Q2xhaW06IG51bGwsXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUGVuZGluZ1JlY292ZXJ5KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5zbGljZSgxKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgZmFpbGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXBsYWNlbWVudCxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgKyAxLFxuICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICBmaXJzdEZhaWx1cmVBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCA/PyBmYWlsZWRBdCxcbiAgICAgIGxhc3RGYWlsdXJlQXQ6IGZhaWxlZEF0LFxuICAgICAgYWxlcnRTZW50QXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlck1hdGNoID0ge1xuICBleHRlcm5hbElkOiBzdHJpbmc7XG4gIHBsYXllcklkOiBzdHJpbmc7XG4gIHBsYXllck5hbWU/OiBzdHJpbmc7XG4gIG9wcG9uZW50OiBzdHJpbmc7XG4gIHN0YXJ0c0F0OiBzdHJpbmc7XG4gIGVuZHNBdDogc3RyaW5nO1xuICB2ZW51ZTogc3RyaW5nO1xuICBjb3VydDogc3RyaW5nO1xuICBzdGF0dXM/OiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICByZXN1bHQ/OiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlckZlZWQgPSB7XG4gIG1hdGNoZXM6IENsdWJMb2NrZXJNYXRjaFtdO1xuICBwbGF5ZXJzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT47XG59O1xuXG5leHBvcnQgdHlwZSBSZWFkb25seUNsdWJMb2NrZXJGZWVkID0gRGVlcFJlYWRvbmx5PENsdWJMb2NrZXJGZWVkPjtcblxuZnVuY3Rpb24gY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2g6IFJlYWRvbmx5VHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXVtudW1iZXJdKTogVHJhY2tlck1hdGNoIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5tYXRjaCxcbiAgICByZXBvcnQ6XG4gICAgICBtYXRjaC5yZXBvcnQgPT09IG51bGxcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDoge1xuICAgICAgICAgICAgLi4ubWF0Y2gucmVwb3J0LFxuICAgICAgICAgICAgb2JzZXJ2YXRpb25zOiBbLi4ubWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9uc10sXG4gICAgICAgICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB2YWx1ZS50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNsdWJMb2NrZXJGZWVkKHZhbHVlOiB1bmtub3duKTogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCB7XG4gIGlmIChcbiAgICAhdmFsdWUgfHxcbiAgICB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAhQXJyYXkuaXNBcnJheSgodmFsdWUgYXMgeyBtYXRjaGVzPzogdW5rbm93biB9KS5tYXRjaGVzKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgQ2x1YiBMb2NrZXIgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiBhIG1hdGNoZXMgYXJyYXlcIik7XG4gIH1cblxuICBjb25zdCByYXcgPSB2YWx1ZSBhcyB7XG4gICAgbWF0Y2hlczogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+O1xuICAgIHBsYXllcnM/OiB1bmtub3duO1xuICB9O1xuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG1hdGNoZXMgPSByYXcubWF0Y2hlcy5tYXAoKG1hdGNoLCBpbmRleCk6IENsdWJMb2NrZXJNYXRjaCA9PiB7XG4gICAgY29uc3QgZXh0ZXJuYWxJZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5leHRlcm5hbElkLCBcImV4dGVybmFsSWRcIiwgaW5kZXgpO1xuICAgIGlmIChzZWVuLmhhcyhleHRlcm5hbElkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBkdXBsaWNhdGUgbWF0Y2ggSUQgXCIke2V4dGVybmFsSWR9XCJgKTtcbiAgICB9XG4gICAgc2Vlbi5hZGQoZXh0ZXJuYWxJZCk7XG5cbiAgICBjb25zdCBzdGFydHNBdCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5zdGFydHNBdCwgXCJzdGFydHNBdFwiLCBpbmRleCk7XG4gICAgY29uc3QgZW5kc0F0ID0gcmVhZFJlcXVpcmVkU3RyaW5nKG1hdGNoLmVuZHNBdCwgXCJlbmRzQXRcIiwgaW5kZXgpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oRGF0ZS5wYXJzZShzdGFydHNBdCkpIHx8IE51bWJlci5pc05hTihEYXRlLnBhcnNlKGVuZHNBdCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCBzdGFydCBvciBlbmQgdGltZWApO1xuICAgIH1cbiAgICBpZiAoRGF0ZS5wYXJzZShlbmRzQXQpIDw9IERhdGUucGFyc2Uoc3RhcnRzQXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBtdXN0IGVuZCBhZnRlciBpdCBzdGFydHNgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgbWF0Y2guc3RhdHVzICE9IG51bGwgJiZcbiAgICAgIG1hdGNoLnN0YXR1cyAhPT0gXCJ1cGNvbWluZ1wiICYmXG4gICAgICBtYXRjaC5zdGF0dXMgIT09IFwiY29tcGxldGVkXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2ggJHtpbmRleCArIDF9IGhhcyBhbiBpbnZhbGlkIHN0YXR1c2ApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5wbGF5ZXJJZCwgXCJwbGF5ZXJJZFwiLCBpbmRleCksXG4gICAgICBwbGF5ZXJOYW1lOlxuICAgICAgICB0eXBlb2YgbWF0Y2gucGxheWVyTmFtZSA9PT0gXCJzdHJpbmdcIiA/IG1hdGNoLnBsYXllck5hbWUudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgb3Bwb25lbnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5vcHBvbmVudCwgXCJvcHBvbmVudFwiLCBpbmRleCksXG4gICAgICBzdGFydHNBdCxcbiAgICAgIGVuZHNBdCxcbiAgICAgIHZlbnVlOiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gudmVudWUsIFwidmVudWVcIiwgaW5kZXgpLFxuICAgICAgY291cnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5jb3VydCwgXCJjb3VydFwiLCBpbmRleCksXG4gICAgICBzdGF0dXM6XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJ1cGNvbWluZ1wiIHx8IG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIlxuICAgICAgICAgID8gbWF0Y2guc3RhdHVzXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICByZXN1bHQ6XG4gICAgICAgIHR5cGVvZiBtYXRjaC5yZXN1bHQgPT09IFwic3RyaW5nXCIgfHwgbWF0Y2gucmVzdWx0ID09PSBudWxsXG4gICAgICAgICAgPyBtYXRjaC5yZXN1bHRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBtYXRjaGVzQnlQbGF5ZXIgPSBuZXcgTWFwPHN0cmluZywgQ2x1YkxvY2tlck1hdGNoW10+KCk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IHBsYXllck1hdGNoZXMgPSBtYXRjaGVzQnlQbGF5ZXIuZ2V0KG1hdGNoLnBsYXllcklkKSA/PyBbXTtcbiAgICBwbGF5ZXJNYXRjaGVzLnB1c2gobWF0Y2gpO1xuICAgIG1hdGNoZXNCeVBsYXllci5zZXQobWF0Y2gucGxheWVySWQsIHBsYXllck1hdGNoZXMpO1xuICB9XG4gIGZvciAoY29uc3QgW3BsYXllcklkLCBwbGF5ZXJNYXRjaGVzXSBvZiBtYXRjaGVzQnlQbGF5ZXIpIHtcbiAgICBwbGF5ZXJNYXRjaGVzLnNvcnQoXG4gICAgICAobGVmdCwgcmlnaHQpID0+IERhdGUucGFyc2UobGVmdC5zdGFydHNBdCkgLSBEYXRlLnBhcnNlKHJpZ2h0LnN0YXJ0c0F0KSxcbiAgICApO1xuICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBwbGF5ZXJNYXRjaGVzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgcHJldmlvdXMgPSBwbGF5ZXJNYXRjaGVzW2luZGV4IC0gMV07XG4gICAgICBjb25zdCBjdXJyZW50ID0gcGxheWVyTWF0Y2hlc1tpbmRleF07XG4gICAgICBpZiAoRGF0ZS5wYXJzZShjdXJyZW50LnN0YXJ0c0F0KSA8IERhdGUucGFyc2UocHJldmlvdXMuZW5kc0F0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIG92ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHBsYXllciBJRCBcIiR7cGxheWVySWR9XCJgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYXllck5hbWVzQnlJZCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IHBsYXllcnMgPSBBcnJheS5pc0FycmF5KHJhdy5wbGF5ZXJzKVxuICAgID8gcmF3LnBsYXllcnMubWFwKChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghcGxheWVyIHx8IHR5cGVvZiBwbGF5ZXIgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsYXllciAke2luZGV4ICsgMX0gaXMgaW52YWxpZGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5ZXIgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICAgIGNvbnN0IGlkID0gcmVhZFJlcXVpcmVkU3RyaW5nKGl0ZW0uaWQsIFwicGxheWVyIGlkXCIsIGluZGV4KTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHJlYWRSZXF1aXJlZFN0cmluZyhpdGVtLm5hbWUsIFwicGxheWVyIG5hbWVcIiwgaW5kZXgpO1xuICAgICAgICBjb25zdCBleGlzdGluZ05hbWUgPSBwbGF5ZXJOYW1lc0J5SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nTmFtZSAhPT0gdW5kZWZpbmVkICYmIGV4aXN0aW5nTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBjb25mbGljdGluZyBuYW1lcyBmb3IgcGxheWVyIElEIFwiJHtpZH1cImAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJOYW1lc0J5SWQuc2V0KGlkLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHsgaWQsIG5hbWUgfTtcbiAgICAgIH0pXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSBPYmplY3QuZnJlZXplKG1hdGNoKTtcbiAgT2JqZWN0LmZyZWV6ZShtYXRjaGVzKTtcbiAgaWYgKHBsYXllcnMpIHtcbiAgICBmb3IgKGNvbnN0IHBsYXllciBvZiBwbGF5ZXJzKSBPYmplY3QuZnJlZXplKHBsYXllcik7XG4gICAgT2JqZWN0LmZyZWV6ZShwbGF5ZXJzKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHsgbWF0Y2hlcywgcGxheWVycyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ2x1YkxvY2tlckZlZWQoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgZmVlZDogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IGN1cnJlbnRCeUV4dGVybmFsSWQgPSBuZXcgTWFwKFxuICAgIHN0YXRlLm1hdGNoZXNcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChtYXRjaCk6IG1hdGNoIGlzIHR5cGVvZiBtYXRjaCAmIHsgZXh0ZXJuYWxJZDogc3RyaW5nIH0gPT5cbiAgICAgICAgICBtYXRjaC5leHRlcm5hbElkICE9PSBudWxsLFxuICAgICAgKVxuICAgICAgLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbmNvbWluZ0J5RXh0ZXJuYWxJZCA9IG5ldyBNYXAoXG4gICAgZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbXBvcnRlZElkcyA9IG5ldyBTZXQoZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpKTtcbiAgY29uc3QgbG9jYWxseVJldGFpbmVkID0gc3RhdGUubWF0Y2hlcy5maWx0ZXIoXG4gICAgKG1hdGNoKSA9PlxuICAgICAgKG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHwgIWltcG9ydGVkSWRzLmhhcyhtYXRjaC5leHRlcm5hbElkKSkgJiZcbiAgICAgIChtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwpLFxuICApO1xuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IG92ZXJsYXBzUmV0YWluZWRNYXRjaCA9IGxvY2FsbHlSZXRhaW5lZC5zb21lKFxuICAgICAgKHJldGFpbmVkTWF0Y2gpID0+XG4gICAgICAgIHJldGFpbmVkTWF0Y2gucGxheWVySWQgPT09IGluY29taW5nLnBsYXllcklkICYmXG4gICAgICAgIERhdGUucGFyc2UoaW5jb21pbmcuc3RhcnRzQXQpIDwgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLmVuZHNBdCkgJiZcbiAgICAgICAgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLnN0YXJ0c0F0KSA8IERhdGUucGFyc2UoaW5jb21pbmcuZW5kc0F0KSxcbiAgICApO1xuICAgIGlmIChvdmVybGFwc1JldGFpbmVkTWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIGEgbWF0Y2ggb3ZlcmxhcHBpbmcgYSByZXRhaW5lZCBtYXRjaCBmb3IgcGxheWVyIElEIFwiJHtpbmNvbWluZy5wbGF5ZXJJZH1cImAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJldGFpbmVkID0gc3RhdGUubWF0Y2hlc1xuICAgIC5maWx0ZXIoXG4gICAgICAobWF0Y2gpID0+XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHxcbiAgICAgICAgaW1wb3J0ZWRJZHMuaGFzKG1hdGNoLmV4dGVybmFsSWQpIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwsXG4gICAgKVxuICAgIC5tYXAoKG1hdGNoKSA9PiB7XG4gICAgICBjb25zdCBpbmNvbWluZyA9XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGxcbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDogaW5jb21pbmdCeUV4dGVybmFsSWQuZ2V0KG1hdGNoLmV4dGVybmFsSWQpO1xuICAgICAgcmV0dXJuIGluY29taW5nXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2gpLFxuICAgICAgICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICAgICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICAgICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICAgICAgfVxuICAgICAgICA6IGNsb25lVHJhY2tlck1hdGNoKG1hdGNoKTtcbiAgICB9KTtcblxuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY3VycmVudEJ5RXh0ZXJuYWxJZC5nZXQoaW5jb21pbmcuZXh0ZXJuYWxJZCk7XG4gICAgaWYgKGV4aXN0aW5nKSBjb250aW51ZTtcblxuICAgIHJldGFpbmVkLnB1c2goe1xuICAgICAgaWQ6IGBjbHViLWxvY2tlcjoke0J1ZmZlci5mcm9tKGluY29taW5nLmV4dGVybmFsSWQpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpfWAsXG4gICAgICBleHRlcm5hbElkOiBpbmNvbWluZy5leHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICBjb2FjaElkOiBcInVuYXNzaWduZWRcIixcbiAgICAgIHN0YXR1czogaW5jb21pbmcuc3RhdHVzID8/IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogaW5jb21pbmcucmVzdWx0ID8/IG51bGwsXG4gICAgICByZXBvcnQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwbGF5ZXJzQnlJZCA9IG5ldyBNYXAoXG4gICAgc3RhdGUucGxheWVycy5tYXAoKHBsYXllcikgPT4gW3BsYXllci5pZCwgeyAuLi5wbGF5ZXIgfV0pLFxuICApO1xuICBmb3IgKGNvbnN0IHBsYXllciBvZiBmZWVkLnBsYXllcnMgPz8gW10pIHtcbiAgICBwbGF5ZXJzQnlJZC5zZXQocGxheWVyLmlkLCB7IC4uLnBsYXllciB9KTtcbiAgfVxuICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGlmICghcGxheWVyc0J5SWQuaGFzKG1hdGNoLnBsYXllcklkKSkge1xuICAgICAgcGxheWVyc0J5SWQuc2V0KG1hdGNoLnBsYXllcklkLCB7XG4gICAgICAgIGlkOiBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgICAgbmFtZTogbWF0Y2gucGxheWVyTmFtZSB8fCBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYnJhbmRpbmc6IHN0YXRlLmJyYW5kaW5nID8geyAuLi5zdGF0ZS5icmFuZGluZyB9IDogdW5kZWZpbmVkLFxuICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMubWFwKChjb2FjaCkgPT4gKHsgLi4uY29hY2ggfSkpLFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgICAgICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgICksXG4gICAgfSxcbiAgICBwbGF5ZXJzOiBbLi4ucGxheWVyc0J5SWQudmFsdWVzKCldLFxuICAgIG1hdGNoZXM6IHJldGFpbmVkLFxuICAgIGxhc3RVcGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBzb3VyY2U6IFwiY2x1Yi1sb2NrZXJcIixcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gIGxvYWRTdGF0ZTogKCkgPT4gUHJvbWlzZTxSZWFkb25seVRyYWNrZXJTdGF0ZT4sXG4gIGxvYWRGZWVkOiAoKSA9PiBQcm9taXNlPFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQ+LFxuICBwZXJzaXN0U3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuICBhbGVydFRocmVzaG9sZCA9IDMsXG4pOiBQcm9taXNlPFRyYWNrZXJTdGF0ZT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZChhd2FpdCBsb2FkRmVlZCgpKTtcbiAgY29uc3Qgc3RhdGUgPSBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgICBtZXJnZUNsdWJMb2NrZXJGZWVkKGF3YWl0IGxvYWRTdGF0ZSgpLCBmZWVkKSxcbiAgICBhbGVydFRocmVzaG9sZCxcbiAgKTtcbiAgYXdhaXQgcGVyc2lzdFN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHN0YXRlO1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxVQUFVOzs7QUNnRVYsU0FBUyxrQkFBa0IsT0FBMkM7QUFDM0UsU0FBTztBQUFBLElBQ0wsU0FBUyxNQUFNLFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLE9BQU8sRUFBRTtBQUFBLElBQ3RELFNBQVMsTUFBTSxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLEVBQUU7QUFBQSxJQUNwRCxVQUFVLE1BQU0sV0FB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
