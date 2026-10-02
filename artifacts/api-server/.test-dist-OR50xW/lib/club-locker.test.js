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
  if (state.refreshHealth.recoveryClaim) {
    Object.freeze(state.refreshHealth.recoveryClaim);
  }
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
      recoveryClaim: replacement.refreshHealth.recoveryClaim
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
function readTimestampWithTimezone(value, field, index) {
  const timestamp = readRequiredString(value, field, index);
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(timestamp)) {
    throw new Error(
      `Match ${index + 1} ${field} must include an explicit timezone`
    );
  }
  if (Number.isNaN(Date.parse(timestamp))) {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return timestamp;
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
    const startsAt = readTimestampWithTimezone(match.startsAt, "startsAt", index);
    const endsAt = readTimestampWithTimezone(match.endsAt, "endsAt", index);
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
var SAMPLE_PLAYER_ID = "cameron-stait";
function withoutSampleDraw(state) {
  const matches = state.matches.filter(
    (match) => !(match.externalId === null && match.playerId === SAMPLE_PLAYER_ID)
  );
  const players = matches.some((match) => match.playerId === SAMPLE_PLAYER_ID) ? state.players : state.players.filter((player) => player.id !== SAMPLE_PLAYER_ID);
  return { ...state, matches, players };
}
function mergeClubLockerFeed(loadedState, feed) {
  const state = withoutSampleDraw(loadedState);
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
    const adoptResult = incoming2?.status === "completed" && match.status === "upcoming";
    return incoming2 ? {
      ...cloneTrackerMatch(match),
      playerId: incoming2.playerId,
      opponent: incoming2.opponent,
      startsAt: incoming2.startsAt,
      endsAt: incoming2.endsAt,
      venue: incoming2.venue,
      court: incoming2.court,
      ...adoptResult ? { status: "completed", result: incoming2.result ?? null } : {}
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
    playersById.set(player.id, {
      ...player,
      shareToken: playersById.get(player.id)?.shareToken
    });
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
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null
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
test("accepts match times with UTC markers and numeric timezone offsets", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("utc-time", {
        startsAt: "2026-09-16T18:30:00Z",
        endsAt: "2026-09-16T19:15:00Z"
      }),
      incoming("offset-time", {
        playerId: "player-2",
        startsAt: "2026-09-17T10:00:00+05:30",
        endsAt: "2026-09-17T10:45:00+05:30"
      })
    ]
  });
  assert.equal(feed.matches.length, 2);
});
test("rejects match times without an explicit timezone", () => {
  for (const [field, value] of [
    ["startsAt", "2026-09-16T14:30:00"],
    ["endsAt", "2026-09-16T15:15:00"]
  ]) {
    assert.throws(
      () => parseClubLockerFeed({
        matches: [incoming(`timezone-free-${field}`, { [field]: value })]
      }),
      new RegExp(`${field} must include an explicit timezone`)
    );
  }
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
test("allows back-to-back matches spanning a daylight-saving fall-back transition", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("before-fall-back", {
        startsAt: "2026-11-01T01:15:00-04:00",
        endsAt: "2026-11-01T01:15:00-05:00"
      }),
      incoming("after-fall-back", {
        startsAt: "2026-11-01T01:15:00-05:00",
        endsAt: "2026-11-01T02:00:00-05:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 2);
  assert.equal(
    Date.parse(feed.matches[0].endsAt),
    Date.parse(feed.matches[1].startsAt)
  );
});
test("allows back-to-back matches spanning a daylight-saving spring-forward transition", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("before-spring-forward", {
        startsAt: "2026-03-08T01:15:00-05:00",
        endsAt: "2026-03-08T03:15:00-04:00"
      }),
      incoming("after-spring-forward", {
        startsAt: "2026-03-08T03:15:00-04:00",
        endsAt: "2026-03-08T04:00:00-04:00"
      })
    ]
  });
  assert.equal(feed.matches.length, 2);
  assert.equal(
    Date.parse(feed.matches[0].endsAt),
    Date.parse(feed.matches[1].startsAt)
  );
});
test("rejects a real overlap during the repeated daylight-saving hour", () => {
  assert.throws(
    () => parseClubLockerFeed({
      matches: [
        incoming("spans-fall-back", {
          startsAt: "2026-11-01T01:30:00-04:00",
          endsAt: "2026-11-01T01:30:00-05:00"
        }),
        incoming("repeated-hour-overlap", {
          startsAt: "2026-11-01T01:15:00-05:00",
          endsAt: "2026-11-01T02:00:00-05:00"
        })
      ]
    }),
    /overlapping matches for player ID "player-1"/
  );
});
test("keeps different-player matches independent across daylight-saving fall-back", () => {
  const feed = parseClubLockerFeed({
    matches: [
      incoming("spans-fall-back", {
        startsAt: "2026-11-01T01:30:00-04:00",
        endsAt: "2026-11-01T01:30:00-05:00"
      }),
      incoming("other-player-repeated-hour", {
        playerId: "player-2",
        startsAt: "2026-11-01T01:15:00-05:00",
        endsAt: "2026-11-01T02:00:00-05:00"
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
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null
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
    failureAlertClaimedAt: null,
    pendingRecoveries: [{
      failedAttempts: 1,
      outageStartedAt: failing.refreshHealth.firstFailureAt,
      recoveredAt: "2026-09-16T12:20:00.000Z",
      outageDurationMs: 20 * 6e4
    }],
    recoveryClaim: null
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci50ZXN0LnRzIiwgIi4uLy4uL3NyYy9saWIvY2x1Yi1sb2NrZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBhc3NlcnQgZnJvbSBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiO1xuaW1wb3J0IHRlc3QgZnJvbSBcIm5vZGU6dGVzdFwiO1xuaW1wb3J0IHtcbiAgY2xlYXJQZW5kaW5nUmVjb3ZlcnksXG4gIGNsZWFyUmVmcmVzaEZhaWx1cmVzLFxuICBjbG9uZVRyYWNrZXJTdGF0ZSxcbiAgZnJlZXplVHJhY2tlclN0YXRlLFxuICBnZXRSZWZyZXNoUmVjb3ZlcnksXG4gIG1lcmdlQ2x1YkxvY2tlckZlZWQsXG4gIHBhcnNlQ2x1YkxvY2tlckZlZWQsXG4gIHJlY29yZFJlZnJlc2hGYWlsdXJlLFxuICByZWZyZXNoVHJhY2tlclN0YXRlLFxuICB0eXBlIENsdWJMb2NrZXJGZWVkLFxuICB0eXBlIFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQsXG4gIHR5cGUgUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHR5cGUgVHJhY2tlclN0YXRlLFxufSBmcm9tIFwiLi9jbHViLWxvY2tlci50c1wiO1xuXG5mdW5jdGlvbiBsb2FkZWRTdGF0ZUlzRGVlcGx5UmVhZG9ubHkoc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlKTogdm9pZCB7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgTG9hZGVkIG1hdGNoZXMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gIHN0YXRlLm1hdGNoZXNbMF0ub3Bwb25lbnQgPSBcIkNoYW5nZWRcIjtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBMb2FkZWQgcGxheWVycyBtdXN0IGJlIHJlcGxhY2VkIGluc3RlYWQgb2YgbXV0YXRlZC5cbiAgc3RhdGUucGxheWVyc1swXS5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgTG9hZGVkIGNvYWNoZXMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gIHN0YXRlLmNvYWNoZXNbMF0ubmFtZSA9IFwiQ2hhbmdlZFwiO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIExvYWRlZCByZWZyZXNoIGhlYWx0aCBtdXN0IGJlIHJlcGxhY2VkIGluc3RlYWQgb2YgbXV0YXRlZC5cbiAgc3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzICs9IDE7XG59XG5cbnZvaWQgbG9hZGVkU3RhdGVJc0RlZXBseVJlYWRvbmx5O1xuXG5mdW5jdGlvbiBpbmNvbWluZ0ZlZWRJc0RlZXBseVJlYWRvbmx5KGZlZWQ6IFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQpOiB2b2lkIHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBJbmNvbWluZyBtYXRjaGVzIG11c3QgYmUgcmVwbGFjZWQgaW5zdGVhZCBvZiBtdXRhdGVkLlxuICBmZWVkLm1hdGNoZXNbMF0ub3Bwb25lbnQgPSBcIkNoYW5nZWRcIjtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBJbmNvbWluZyBtYXRjaCBjb2xsZWN0aW9ucyBtdXN0IG5vdCBiZSBtdXRhdGVkLlxuICBmZWVkLm1hdGNoZXMucHVzaChpbmNvbWluZyhcIm5ldy1tYXRjaFwiKSk7XG4gIGlmIChmZWVkLnBsYXllcnMpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEluY29taW5nIHBsYXllcnMgbXVzdCBiZSByZXBsYWNlZCBpbnN0ZWFkIG9mIG11dGF0ZWQuXG4gICAgZmVlZC5wbGF5ZXJzWzBdLm5hbWUgPSBcIkNoYW5nZWRcIjtcbiAgfVxufVxuXG52b2lkIGluY29taW5nRmVlZElzRGVlcGx5UmVhZG9ubHk7XG5cbmNvbnN0IGluY29taW5nID0gKFxuICBleHRlcm5hbElkOiBzdHJpbmcsXG4gIG92ZXJyaWRlczogUGFydGlhbDxDbHViTG9ja2VyRmVlZFtcIm1hdGNoZXNcIl1bbnVtYmVyXT4gPSB7fSxcbik6IENsdWJMb2NrZXJGZWVkW1wibWF0Y2hlc1wiXVtudW1iZXJdID0+ICh7XG4gIGV4dGVybmFsSWQsXG4gIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gIG9wcG9uZW50OiBcIk9yaWdpbmFsIG9wcG9uZW50XCIsXG4gIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgdmVudWU6IFwiT3JpZ2luYWwgdmVudWVcIixcbiAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAuLi5vdmVycmlkZXMsXG59KTtcblxuY29uc3Qgc3RvcmVkTWF0Y2ggPSAoXG4gIGV4dGVybmFsSWQ6IHN0cmluZyxcbiAgb3ZlcnJpZGVzOiBQYXJ0aWFsPFRyYWNrZXJTdGF0ZVtcIm1hdGNoZXNcIl1bbnVtYmVyXT4gPSB7fSxcbik6IFRyYWNrZXJTdGF0ZVtcIm1hdGNoZXNcIl1bbnVtYmVyXSA9PiAoe1xuICBpZDogYHN0b3JlZC0ke2V4dGVybmFsSWR9YCxcbiAgZXh0ZXJuYWxJZCxcbiAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgb3Bwb25lbnQ6IFwiT3JpZ2luYWwgb3Bwb25lbnRcIixcbiAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICB2ZW51ZTogXCJPcmlnaW5hbCB2ZW51ZVwiLFxuICBjb3VydDogXCJDb3VydCAxXCIsXG4gIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICBzdGF0dXM6IFwidXBjb21pbmdcIixcbiAgcmVzdWx0OiBudWxsLFxuICByZXBvcnQ6IG51bGwsXG4gIC4uLm92ZXJyaWRlcyxcbn0pO1xuXG5jb25zdCBzdGF0ZVdpdGggPSAoLi4ubWF0Y2hlczogVHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXSk6IFRyYWNrZXJTdGF0ZSA9PiAoe1xuICBwbGF5ZXJzOiBbeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9XSxcbiAgY29hY2hlczogW3sgaWQ6IFwiY29hY2gtMVwiLCBuYW1lOiBcIkNvYWNoIE9uZVwiIH1dLFxuICBtYXRjaGVzLFxuICBsYXN0VXBkYXRlZEF0OiBcIjIwMjYtMDktMTVUMTI6MDA6MDAtMDQ6MDBcIixcbiAgc291cmNlOiBcImNsdWItbG9ja2VyXCIsXG4gIHJlZnJlc2hIZWFsdGg6IHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAzLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbXSxcbiAgICByZWNvdmVyeUNsYWltOiBudWxsLFxuICB9LFxufSk7XG5cbnRlc3QoXCJhZGRzIG5ldyBleHRlcm5hbCBtYXRjaCBJRHMgd2l0aCBzdGFibGUgSURzIGFuZCBzYWZlIGRlZmF1bHRzXCIsICgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgoKSwge1xuICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcIm5ldy9pZFwiKV0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlcy5sZW5ndGgsIDEpO1xuICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdLCB7XG4gICAgaWQ6IGBjbHViLWxvY2tlcjoke0J1ZmZlci5mcm9tKFwibmV3L2lkXCIpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpfWAsXG4gICAgZXh0ZXJuYWxJZDogXCJuZXcvaWRcIixcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9yaWdpbmFsIG9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjE1OjAwLTA0OjAwXCIsXG4gICAgdmVudWU6IFwiT3JpZ2luYWwgdmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJ1bmFzc2lnbmVkXCIsXG4gICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgcmVzdWx0OiBudWxsLFxuICAgIHJlcG9ydDogbnVsbCxcbiAgfSk7XG59KTtcblxudGVzdChcInVwZGF0ZXMgc2NoZWR1bGUgZmllbGRzIHdoaWxlIHByZXNlcnZpbmcgY29hY2ggd29yayBhbmQgbWF0Y2ggaGlzdG9yeVwiLCAoKSA9PiB7XG4gIGNvbnN0IHJlcG9ydCA9IHtcbiAgICBtYXRjaElkOiBcInN0b3JlZC1leGlzdGluZ1wiLFxuICAgIG9ic2VydmF0aW9uczogW1wiS2VlcCB3aWR0aFwiXSxcbiAgICB0cmFuc2NyaXB0OiBcIkNvYWNoIG5vdGVzXCIsXG4gICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gIH07XG4gIGNvbnN0IG9yaWdpbmFsID0gc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiLCB7XG4gICAgaWQ6IFwic3RvcmVkLWV4aXN0aW5nXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0LFxuICB9KTtcbiAgY29uc3Qgb3JpZ2luYWxTbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgob3JpZ2luYWwpLCB7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMDo0NTowMC0wNDowMFwiLFxuICAgICAgICB2ZW51ZTogXCJDaGFuZ2VkIHZlbnVlXCIsXG4gICAgICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgICAgICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0sIHtcbiAgICAuLi5vcmlnaW5hbCxcbiAgICBvcHBvbmVudDogXCJDaGFuZ2VkIG9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMC0wNDowMFwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE3VDEwOjQ1OjAwLTA0OjAwXCIsXG4gICAgdmVudWU6IFwiQ2hhbmdlZCB2ZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgfSk7XG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlc1swXT8uY29hY2hJZCwgXCJjb2FjaC0xXCIpO1xuICBhc3NlcnQuZXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0/LnN0YXR1cywgXCJjb21wbGV0ZWRcIik7XG4gIGFzc2VydC5lcXVhbChyZXN1bHQubWF0Y2hlc1swXT8ucmVzdWx0LCBcIldvbiAzLTFcIik7XG4gIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0Lm1hdGNoZXNbMF0/LnJlcG9ydCwgcmVwb3J0KTtcbiAgYXNzZXJ0Lm5vdEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdPy5yZXBvcnQsIHJlcG9ydCk7XG4gIGFzc2VydC5ub3RFcXVhbChyZXN1bHQubWF0Y2hlc1swXT8ucmVwb3J0Py5vYnNlcnZhdGlvbnMsIHJlcG9ydC5vYnNlcnZhdGlvbnMpO1xuICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBvcmlnaW5hbFNuYXBzaG90KTtcbiAgYXNzZXJ0Lm5vdEVxdWFsKHJlc3VsdC5tYXRjaGVzWzBdLCBvcmlnaW5hbCk7XG59KTtcblxudGVzdChcInJlbW92ZXMgbWlzc2luZyB1cGNvbWluZyBtYXRjaGVzIGJ1dCByZXRhaW5zIGNvbXBsZXRlZCBhbmQgcmVwb3J0ZWQgbWF0Y2hlc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVwY29taW5nID0gc3RvcmVkTWF0Y2goXCJyZW1vdmVkLXVwY29taW5nXCIpO1xuICBjb25zdCBjb21wbGV0ZWQgPSBzdG9yZWRNYXRjaChcInJlbW92ZWQtY29tcGxldGVkXCIsIHtcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIkxvc3QgMS0zXCIsXG4gIH0pO1xuICBjb25zdCByZXBvcnRlZCA9IHN0b3JlZE1hdGNoKFwicmVtb3ZlZC1yZXBvcnRlZFwiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1yZW1vdmVkLXJlcG9ydGVkXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIkdvb2QgcmVjb3ZlcnlcIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChcbiAgICBzdGF0ZVdpdGgodXBjb21pbmcsIGNvbXBsZXRlZCwgcmVwb3J0ZWQpLFxuICAgIHsgbWF0Y2hlczogW10gfSxcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIHJlc3VsdC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpLFxuICAgIFtcInJlbW92ZWQtY29tcGxldGVkXCIsIFwicmVtb3ZlZC1yZXBvcnRlZFwiXSxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBpbmNvbWluZyBtYXRjaGVzIHRoYXQgb3ZlcmxhcCBsb2NhbGx5IHJldGFpbmVkIG1hdGNoZXNcIiwgKCkgPT4ge1xuICBjb25zdCByZXRhaW5lZE1hdGNoZXMgPSBbXG4gICAgc3RvcmVkTWF0Y2goXCJsb2NhbFwiLCB7IGV4dGVybmFsSWQ6IG51bGwgfSksXG4gICAgc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIgfSksXG4gICAgc3RvcmVkTWF0Y2goXCJyZXBvcnRlZFwiLCB7XG4gICAgICByZXBvcnQ6IHtcbiAgICAgICAgbWF0Y2hJZDogXCJzdG9yZWQtcmVwb3J0ZWRcIixcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJHb29kIHJlY292ZXJ5XCJdLFxuICAgICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxODowMDowMFpcIixcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG5cbiAgZm9yIChjb25zdCByZXRhaW5lZCBvZiByZXRhaW5lZE1hdGNoZXMpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHN0YXRlV2l0aChyZXRhaW5lZCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpO1xuXG4gICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICgpID0+XG4gICAgICAgIG1lcmdlQ2x1YkxvY2tlckZlZWQoc3RhdGUsIHtcbiAgICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgICBpbmNvbWluZyhcIm5ldy1tYXRjaFwiLCB7XG4gICAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTU6MDA6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgL292ZXJsYXBwaW5nIGEgcmV0YWluZWQgbWF0Y2ggZm9yIHBsYXllciBJRCBcInBsYXllci0xXCIvLFxuICAgICk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChzdGF0ZSwgc25hcHNob3QpO1xuICB9XG59KTtcblxudGVzdChcImFsbG93cyBpbmNvbWluZyBtYXRjaGVzIGJhY2stdG8tYmFjayB3aXRoIGxvY2FsbHkgcmV0YWluZWQgbWF0Y2hlc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHJldGFpbmVkID0gc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGF0ZVdpdGgocmV0YWluZWQpLCB7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJuZXh0LW1hdGNoXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IHJldGFpbmVkLmVuZHNBdCxcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTY6MDA6MDAtMDQ6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgcmVzdWx0Lm1hdGNoZXMubWFwKChtYXRjaCkgPT4gbWF0Y2guZXh0ZXJuYWxJZCksXG4gICAgW1wiY29tcGxldGVkXCIsIFwibmV4dC1tYXRjaFwiXSxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBkdXBsaWNhdGUgZXh0ZXJuYWwgbWF0Y2ggSURzXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcImR1cGxpY2F0ZVwiKSwgaW5jb21pbmcoXCJkdXBsaWNhdGVcIildLFxuICAgICAgfSksXG4gICAgL2R1cGxpY2F0ZSBtYXRjaCBJRCBcImR1cGxpY2F0ZVwiLyxcbiAgKTtcbn0pO1xuXG50ZXN0KFwiYWNjZXB0cyBtYXRjaCB0aW1lcyB3aXRoIFVUQyBtYXJrZXJzIGFuZCBudW1lcmljIHRpbWV6b25lIG9mZnNldHNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJ1dGMtdGltZVwiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTg6MzA6MDBaXCIsXG4gICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE5OjE1OjAwWlwiLFxuICAgICAgfSksXG4gICAgICBpbmNvbWluZyhcIm9mZnNldC10aW1lXCIsIHtcbiAgICAgICAgcGxheWVySWQ6IFwicGxheWVyLTJcIixcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMCswNTozMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMDo0NTowMCswNTozMFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDIpO1xufSk7XG5cbnRlc3QoXCJyZWplY3RzIG1hdGNoIHRpbWVzIHdpdGhvdXQgYW4gZXhwbGljaXQgdGltZXpvbmVcIiwgKCkgPT4ge1xuICBmb3IgKGNvbnN0IFtmaWVsZCwgdmFsdWVdIG9mIFtcbiAgICBbXCJzdGFydHNBdFwiLCBcIjIwMjYtMDktMTZUMTQ6MzA6MDBcIl0sXG4gICAgW1wiZW5kc0F0XCIsIFwiMjAyNi0wOS0xNlQxNToxNTowMFwiXSxcbiAgXSBhcyBjb25zdCkge1xuICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAoKSA9PlxuICAgICAgICBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICAgICAgICBtYXRjaGVzOiBbaW5jb21pbmcoYHRpbWV6b25lLWZyZWUtJHtmaWVsZH1gLCB7IFtmaWVsZF06IHZhbHVlIH0pXSxcbiAgICAgICAgfSksXG4gICAgICBuZXcgUmVnRXhwKGAke2ZpZWxkfSBtdXN0IGluY2x1ZGUgYW4gZXhwbGljaXQgdGltZXpvbmVgKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcInJlamVjdHMgbWF0Y2hlcyB3aG9zZSBlbmQgdGltZSBpcyBub3QgYWZ0ZXIgdGhlIHN0YXJ0IHRpbWVcIiwgKCkgPT4ge1xuICBmb3IgKGNvbnN0IGVuZHNBdCBvZiBbXG4gICAgXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgXCIyMDI2LTA5LTE2VDE0OjI5OjU5LTA0OjAwXCIsXG4gIF0pIHtcbiAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgKCkgPT5cbiAgICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgICAgbWF0Y2hlczogW2luY29taW5nKFwiaW1wb3NzaWJsZS10aW1lXCIsIHsgZW5kc0F0IH0pXSxcbiAgICAgICAgfSksXG4gICAgICAvbXVzdCBlbmQgYWZ0ZXIgaXQgc3RhcnRzLyxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcInJlamVjdHMgemVyby1sZW5ndGggbWF0Y2hlcyBleHByZXNzZWQgd2l0aCBkaWZmZXJlbnQgdGltZXpvbmUgb2Zmc2V0c1wiLCAoKSA9PiB7XG4gIGFzc2VydC50aHJvd3MoXG4gICAgKCkgPT5cbiAgICAgIHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgaW5jb21pbmcoXCJ6ZXJvLWxlbmd0aC1jcm9zcy1vZmZzZXRcIiwge1xuICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTE6MzA6MDAtMDc6MDBcIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIC9tdXN0IGVuZCBhZnRlciBpdCBzdGFydHMvLFxuICApO1xufSk7XG5cbnRlc3QoXCJyZWplY3RzIGEgbmVnYXRpdmUgb25lLXNlY29uZCBkdXJhdGlvbiBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0c1wiLCAoKSA9PiB7XG4gIGFzc2VydC50aHJvd3MoXG4gICAgKCkgPT5cbiAgICAgIHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgaW5jb21pbmcoXCJuZWdhdGl2ZS1jcm9zcy1vZmZzZXRcIiwge1xuICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTE6Mjk6NTktMDc6MDBcIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIC9tdXN0IGVuZCBhZnRlciBpdCBzdGFydHMvLFxuICApO1xufSk7XG5cbnRlc3QoXCJhbGxvd3MgYSBwb3NpdGl2ZSBkdXJhdGlvbiBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0c1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXG4gICAgICBpbmNvbWluZyhcInBvc2l0aXZlLWNyb3NzLW9mZnNldFwiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6MzA6MDAtMDQ6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTE6MzA6MDEtMDc6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXMubGVuZ3RoLCAxKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBvdmVybGFwcGluZyBtYXRjaGVzIGZvciB0aGUgc2FtZSBwbGF5ZXJcIiwgKCkgPT4ge1xuICBhc3NlcnQudGhyb3dzKFxuICAgICgpID0+XG4gICAgICBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICAgICAgbWF0Y2hlczogW1xuICAgICAgICAgIGluY29taW5nKFwibGF0ZXJcIiwge1xuICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNTowMDowMC0wNDowMFwiLFxuICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBpbmNvbWluZyhcImVhcmxpZXJcIiwge1xuICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIC9vdmVybGFwcGluZyBtYXRjaGVzIGZvciBwbGF5ZXIgSUQgXCJwbGF5ZXItMVwiLyxcbiAgKTtcbn0pO1xuXG50ZXN0KFwiYWxsb3dzIGJhY2stdG8tYmFjayBtYXRjaGVzIGF0IGFuIGVxdWl2YWxlbnQgaW5zdGFudCBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0c1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXG4gICAgICBpbmNvbWluZyhcImZpcnN0XCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICAgICAgfSksXG4gICAgICBpbmNvbWluZyhcImJhY2stdG8tYmFja1wiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTI6MTU6MDAtMDc6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTM6MDA6MDAtMDc6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXMubGVuZ3RoLCAyKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBhIG9uZS1zZWNvbmQgb3ZlcmxhcCBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0c1wiLCAoKSA9PiB7XG4gIGFzc2VydC50aHJvd3MoXG4gICAgKCkgPT5cbiAgICAgIHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgaW5jb21pbmcoXCJmaXJzdFwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluY29taW5nKFwib3ZlcmxhcFwiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEyOjE0OjU5LTA3OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMzowMDowMC0wNzowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgL292ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHBsYXllciBJRCBcInBsYXllci0xXCIvLFxuICApO1xufSk7XG5cbnRlc3QoXCJhbGxvd3Mgc2FtZS10aW1lIG1hdGNoZXMgYWNyb3NzIHRpbWV6b25lIG9mZnNldHMgZm9yIGRpZmZlcmVudCBwbGF5ZXJzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtcbiAgICAgIGluY29taW5nKFwiZmlyc3RcIiwge1xuICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjE1OjAwLTA0OjAwXCIsXG4gICAgICB9KSxcbiAgICAgIGluY29taW5nKFwib3RoZXItcGxheWVyXCIsIHtcbiAgICAgICAgcGxheWVySWQ6IFwicGxheWVyLTJcIixcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMTozMDowMC0wNzowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMjoxNTowMC0wNzowMFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDIpO1xufSk7XG5cbnRlc3QoXCJhbGxvd3MgYmFjay10by1iYWNrIG1hdGNoZXMgc3Bhbm5pbmcgYSBkYXlsaWdodC1zYXZpbmcgZmFsbC1iYWNrIHRyYW5zaXRpb25cIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJiZWZvcmUtZmFsbC1iYWNrXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0xMS0wMVQwMToxNTowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0xMS0wMVQwMToxNTowMC0wNTowMFwiLFxuICAgICAgfSksXG4gICAgICBpbmNvbWluZyhcImFmdGVyLWZhbGwtYmFja1wiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMTEtMDFUMDE6MTU6MDAtMDU6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMTEtMDFUMDI6MDA6MDAtMDU6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXMubGVuZ3RoLCAyKTtcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIERhdGUucGFyc2UoZmVlZC5tYXRjaGVzWzBdIS5lbmRzQXQpLFxuICAgIERhdGUucGFyc2UoZmVlZC5tYXRjaGVzWzFdIS5zdGFydHNBdCksXG4gICk7XG59KTtcblxudGVzdChcImFsbG93cyBiYWNrLXRvLWJhY2sgbWF0Y2hlcyBzcGFubmluZyBhIGRheWxpZ2h0LXNhdmluZyBzcHJpbmctZm9yd2FyZCB0cmFuc2l0aW9uXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtcbiAgICAgIGluY29taW5nKFwiYmVmb3JlLXNwcmluZy1mb3J3YXJkXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wMy0wOFQwMToxNTowMC0wNTowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wMy0wOFQwMzoxNTowMC0wNDowMFwiLFxuICAgICAgfSksXG4gICAgICBpbmNvbWluZyhcImFmdGVyLXNwcmluZy1mb3J3YXJkXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wMy0wOFQwMzoxNTowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wMy0wOFQwNDowMDowMC0wNDowMFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlcy5sZW5ndGgsIDIpO1xuICBhc3NlcnQuZXF1YWwoXG4gICAgRGF0ZS5wYXJzZShmZWVkLm1hdGNoZXNbMF0hLmVuZHNBdCksXG4gICAgRGF0ZS5wYXJzZShmZWVkLm1hdGNoZXNbMV0hLnN0YXJ0c0F0KSxcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBhIHJlYWwgb3ZlcmxhcCBkdXJpbmcgdGhlIHJlcGVhdGVkIGRheWxpZ2h0LXNhdmluZyBob3VyXCIsICgpID0+IHtcbiAgYXNzZXJ0LnRocm93cyhcbiAgICAoKSA9PlxuICAgICAgcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcInNwYW5zLWZhbGwtYmFja1wiLCB7XG4gICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTExLTAxVDAxOjMwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0xMS0wMVQwMTozMDowMC0wNTowMFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluY29taW5nKFwicmVwZWF0ZWQtaG91ci1vdmVybGFwXCIsIHtcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMTEtMDFUMDE6MTU6MDAtMDU6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTExLTAxVDAyOjAwOjAwLTA1OjAwXCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAvb3ZlcmxhcHBpbmcgbWF0Y2hlcyBmb3IgcGxheWVyIElEIFwicGxheWVyLTFcIi8sXG4gICk7XG59KTtcblxudGVzdChcImtlZXBzIGRpZmZlcmVudC1wbGF5ZXIgbWF0Y2hlcyBpbmRlcGVuZGVudCBhY3Jvc3MgZGF5bGlnaHQtc2F2aW5nIGZhbGwtYmFja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXG4gICAgICBpbmNvbWluZyhcInNwYW5zLWZhbGwtYmFja1wiLCB7XG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMTEtMDFUMDE6MzA6MDAtMDQ6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMTEtMDFUMDE6MzA6MDAtMDU6MDBcIixcbiAgICAgIH0pLFxuICAgICAgaW5jb21pbmcoXCJvdGhlci1wbGF5ZXItcmVwZWF0ZWQtaG91clwiLCB7XG4gICAgICAgIHBsYXllcklkOiBcInBsYXllci0yXCIsXG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMTEtMDFUMDE6MTU6MDAtMDU6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMTEtMDFUMDI6MDA6MDAtMDU6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXMubGVuZ3RoLCAyKTtcbn0pO1xuXG50ZXN0KFwiYWxsb3dzIGJhY2stdG8tYmFjayBtYXRjaGVzIGFuZCBvdmVybGFwcyBmb3IgZGlmZmVyZW50IHBsYXllcnNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW1xuICAgICAgaW5jb21pbmcoXCJmaXJzdFwiKSxcbiAgICAgIGluY29taW5nKFwiYmFjay10by1iYWNrXCIsIHtcbiAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNToxNTowMC0wNDowMFwiLFxuICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxNjowMDowMC0wNDowMFwiLFxuICAgICAgfSksXG4gICAgICBpbmNvbWluZyhcIm90aGVyLXBsYXllclwiLCB7XG4gICAgICAgIHBsYXllcklkOiBcInBsYXllci0yXCIsXG4gICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTQ6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MzA6MDAtMDQ6MDBcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXMubGVuZ3RoLCAzKTtcbn0pO1xuXG50ZXN0KFwicmVqZWN0cyBjb25mbGljdGluZyBkdXBsaWNhdGUgcGxheWVyIElEc1wiLCAoKSA9PiB7XG4gIGFzc2VydC50aHJvd3MoXG4gICAgKCkgPT5cbiAgICAgIHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgICAgICBtYXRjaGVzOiBbXSxcbiAgICAgICAgcGxheWVyczogW1xuICAgICAgICAgIHsgaWQ6IFwicGxheWVyLTFcIiwgbmFtZTogXCJQbGF5ZXIgT25lXCIgfSxcbiAgICAgICAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiRGlmZmVyZW50IFBsYXllclwiIH0sXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAvY29uZmxpY3RpbmcgbmFtZXMgZm9yIHBsYXllciBJRCBcInBsYXllci0xXCIvLFxuICApO1xufSk7XG5cbnRlc3QoXCJhbGxvd3MgaWRlbnRpY2FsIGR1cGxpY2F0ZSBwbGF5ZXIgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBwYXJzZUNsdWJMb2NrZXJGZWVkKHtcbiAgICBtYXRjaGVzOiBbXSxcbiAgICBwbGF5ZXJzOiBbXG4gICAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiIH0sXG4gICAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgYXNzZXJ0LmVxdWFsKGZlZWQucGxheWVycz8ubGVuZ3RoLCAyKTtcbn0pO1xuXG50ZXN0KFwicGFyc2VkIGZlZWRzIHJlamVjdCBydW50aW1lIG11dGF0aW9uIG9mIG1hdGNoIGNvbGxlY3Rpb25zXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtpbmNvbWluZyhcImV4aXN0aW5nXCIpXSxcbiAgfSk7XG4gIGNvbnN0IG11dGFibGVNYXRjaGVzID0gZmVlZC5tYXRjaGVzIGFzIENsdWJMb2NrZXJGZWVkW1wibWF0Y2hlc1wiXTtcblxuICBhc3NlcnQudGhyb3dzKCgpID0+IG11dGFibGVNYXRjaGVzLnB1c2goaW5jb21pbmcoXCJuZXctbWF0Y2hcIikpLCBUeXBlRXJyb3IpO1xuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzLmxlbmd0aCwgMSk7XG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXNbMF0/LmV4dGVybmFsSWQsIFwiZXhpc3RpbmdcIik7XG59KTtcblxudGVzdChcInBhcnNlZCBmZWVkcyByZWplY3QgcnVudGltZSBtdXRhdGlvbiBvZiBtYXRjaCBmaWVsZHNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZCh7XG4gICAgbWF0Y2hlczogW2luY29taW5nKFwiZXhpc3RpbmdcIildLFxuICB9KTtcbiAgY29uc3QgbXV0YWJsZU1hdGNoID0gZmVlZC5tYXRjaGVzWzBdIGFzIENsdWJMb2NrZXJGZWVkW1wibWF0Y2hlc1wiXVtudW1iZXJdO1xuXG4gIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgIG11dGFibGVNYXRjaC5vcHBvbmVudCA9IFwiQ2hhbmdlZCBvcHBvbmVudFwiO1xuICB9LCBUeXBlRXJyb3IpO1xuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzWzBdPy5vcHBvbmVudCwgXCJPcmlnaW5hbCBvcHBvbmVudFwiKTtcbn0pO1xuXG50ZXN0KFwicGFyc2VkIGZlZWRzIHJlamVjdCBydW50aW1lIG11dGF0aW9uIG9mIHBsYXllciByZWNvcmRzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtdLFxuICAgIHBsYXllcnM6IFt7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiIH1dLFxuICB9KTtcbiAgY29uc3QgbXV0YWJsZVBsYXllciA9IGZlZWQucGxheWVycz8uWzBdIGFzIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH07XG5cbiAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgbXV0YWJsZVBsYXllci5uYW1lID0gXCJDaGFuZ2VkIHBsYXllclwiO1xuICB9LCBUeXBlRXJyb3IpO1xuICBhc3NlcnQuZXF1YWwoZmVlZC5wbGF5ZXJzPy5bMF0/Lm5hbWUsIFwiUGxheWVyIE9uZVwiKTtcbn0pO1xuXG50ZXN0KFwibG9hZGVkIHRyYWNrZXIgc25hcHNob3RzIGFyZSBkZWVwbHkgZnJvemVuIGF0IHJ1bnRpbWVcIiwgKCkgPT4ge1xuICBjb25zdCBsb2FkZWQgPSBzdGF0ZVdpdGgoc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1leGlzdGluZ1wiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJLZWVwIHdpZHRoXCJdLFxuICAgICAgdHJhbnNjcmlwdDogXCJDb2FjaCBub3Rlc1wiLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgfSxcbiAgfSkpO1xuICBsb2FkZWQuYnJhbmRpbmcgPSB7IG5hbWU6IFwiQ2x1YlwiLCBsb2dvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzLzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiIH07XG4gIGxvYWRlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMjoxMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMTAgKiA2MF8wMDAsXG4gIH1dO1xuXG4gIGNvbnN0IHNuYXBzaG90ID0gZnJlZXplVHJhY2tlclN0YXRlKGxvYWRlZCk7XG4gIGNvbnN0IG11dGF0aW9ucyA9IFtcbiAgICAoKSA9PiAoKHNuYXBzaG90Lm1hdGNoZXMgYXMgVHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXSlbMF0hLm9wcG9uZW50ID0gXCJDaGFuZ2VkXCIpLFxuICAgICgpID0+ICgoc25hcHNob3QubWF0Y2hlc1swXSEucmVwb3J0IS5vYnNlcnZhdGlvbnMgYXMgc3RyaW5nW10pLnB1c2goXCJDaGFuZ2VkXCIpKSxcbiAgICAoKSA9PiAoKHNuYXBzaG90LnBsYXllcnMgYXMgVHJhY2tlclN0YXRlW1wicGxheWVyc1wiXSlbMF0hLm5hbWUgPSBcIkNoYW5nZWRcIiksXG4gICAgKCkgPT4gKChzbmFwc2hvdC5jb2FjaGVzIGFzIFRyYWNrZXJTdGF0ZVtcImNvYWNoZXNcIl0pWzBdIS5uYW1lID0gXCJDaGFuZ2VkXCIpLFxuICAgICgpID0+ICgoc25hcHNob3QuYnJhbmRpbmcgYXMgVHJhY2tlclN0YXRlW1wiYnJhbmRpbmdcIl0pIS5uYW1lID0gXCJDaGFuZ2VkXCIpLFxuICAgICgpID0+ICgoc25hcHNob3QucmVmcmVzaEhlYWx0aCBhcyBUcmFja2VyU3RhdGVbXCJyZWZyZXNoSGVhbHRoXCJdKS5jb25zZWN1dGl2ZUZhaWx1cmVzID0gOSksXG4gICAgKCkgPT4gKChzbmFwc2hvdC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzIGFzIFRyYWNrZXJTdGF0ZVtcInJlZnJlc2hIZWFsdGhcIl1bXCJwZW5kaW5nUmVjb3Zlcmllc1wiXSlbMF0hLmZhaWxlZEF0dGVtcHRzID0gOSksXG4gIF07XG5cbiAgZm9yIChjb25zdCBtdXRhdGUgb2YgbXV0YXRpb25zKSBhc3NlcnQudGhyb3dzKG11dGF0ZSwgVHlwZUVycm9yKTtcbn0pO1xuXG50ZXN0KFwibXV0YWJsZSB0cmFja2VyIHJlcGxhY2VtZW50cyBhcmUgZGV0YWNoZWQgZnJvbSBmcm96ZW4gbG9hZGVkIHNuYXBzaG90c1wiLCAoKSA9PiB7XG4gIGNvbnN0IGxvYWRlZCA9IHN0YXRlV2l0aChzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIsIHtcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IFwic3RvcmVkLWV4aXN0aW5nXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIktlZXAgd2lkdGhcIl0sXG4gICAgICB0cmFuc2NyaXB0OiBcIkNvYWNoIG5vdGVzXCIsXG4gICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxODowMDowMFpcIixcbiAgICB9LFxuICB9KSk7XG4gIGxvYWRlZC5icmFuZGluZyA9IHsgbmFtZTogXCJDbHViXCIsIGxvZ29QYXRoOiBcIi9vYmplY3RzL3VwbG9hZHMvMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCIgfTtcbiAgbG9hZGVkLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbe1xuICAgIGZhaWxlZEF0dGVtcHRzOiAyLFxuICAgIG91dGFnZVN0YXJ0ZWRBdDogXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEyOjEwOjAwLjAwMFpcIixcbiAgICBvdXRhZ2VEdXJhdGlvbk1zOiAxMCAqIDYwXzAwMCxcbiAgfV07XG4gIGNvbnN0IHNuYXBzaG90ID0gZnJlZXplVHJhY2tlclN0YXRlKGxvYWRlZCk7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc25hcHNob3QpO1xuXG4gIHJlcGxhY2VtZW50Lm1hdGNoZXNbMF0hLnJlcG9ydCEub2JzZXJ2YXRpb25zLnB1c2goXCJDaGFuZ2VkXCIpO1xuICByZXBsYWNlbWVudC5wbGF5ZXJzWzBdIS5uYW1lID0gXCJDaGFuZ2VkXCI7XG4gIHJlcGxhY2VtZW50LmNvYWNoZXNbMF0hLm5hbWUgPSBcIkNoYW5nZWRcIjtcbiAgcmVwbGFjZW1lbnQuYnJhbmRpbmchLm5hbWUgPSBcIkNoYW5nZWRcIjtcbiAgcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzID0gOTtcbiAgcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXSEuZmFpbGVkQXR0ZW1wdHMgPSA5O1xuXG4gIGFzc2VydC5lcXVhbChzbmFwc2hvdC5tYXRjaGVzWzBdIS5yZXBvcnQhLm9ic2VydmF0aW9ucy5sZW5ndGgsIDEpO1xuICBhc3NlcnQuZXF1YWwoc25hcHNob3QucGxheWVyc1swXSEubmFtZSwgXCJQbGF5ZXIgT25lXCIpO1xuICBhc3NlcnQuZXF1YWwoc25hcHNob3QuY29hY2hlc1swXSEubmFtZSwgXCJDb2FjaCBPbmVcIik7XG4gIGFzc2VydC5lcXVhbChzbmFwc2hvdC5icmFuZGluZyEubmFtZSwgXCJDbHViXCIpO1xuICBhc3NlcnQuZXF1YWwoc25hcHNob3QucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzLCAwKTtcbiAgYXNzZXJ0LmVxdWFsKHNuYXBzaG90LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0hLmZhaWxlZEF0dGVtcHRzLCAyKTtcbn0pO1xuXG50ZXN0KFwibXV0YWJsZSByZXBsYWNlbWVudCBwbGF5ZXJzIGRvIG5vdCBzaGFyZSB2YWxpZGF0ZWQgZmVlZCByZWNvcmRzXCIsICgpID0+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoe1xuICAgIG1hdGNoZXM6IFtdLFxuICAgIHBsYXllcnM6IFt7IGlkOiBcInBsYXllci0yXCIsIG5hbWU6IFwiUGxheWVyIFR3b1wiIH1dLFxuICB9KTtcblxuICBjb25zdCByZXN1bHQgPSBtZXJnZUNsdWJMb2NrZXJGZWVkKHN0YXRlV2l0aCgpLCBmZWVkKTtcbiAgY29uc3QgcmVwbGFjZW1lbnRQbGF5ZXIgPSByZXN1bHQucGxheWVycy5maW5kKFxuICAgIChwbGF5ZXIpID0+IHBsYXllci5pZCA9PT0gXCJwbGF5ZXItMlwiLFxuICApO1xuICBhc3NlcnQub2socmVwbGFjZW1lbnRQbGF5ZXIpO1xuXG4gIHJlcGxhY2VtZW50UGxheWVyLm5hbWUgPSBcIkNoYW5nZWRcIjtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQucGxheWVycz8uWzBdPy5uYW1lLCBcIlBsYXllciBUd29cIik7XG59KTtcblxudGVzdChcImludmFsaWQgZmVlZHMgbmV2ZXIgcGVyc2lzdCBhIHJlcGxhY2VtZW50IHN0YXRlXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZVdpdGgoc3RvcmVkTWF0Y2goXCJleGlzdGluZ1wiKSk7XG4gIGxldCBwZXJzaXN0ZWQgPSBmYWxzZTtcblxuICBhd2FpdCBhc3NlcnQucmVqZWN0cyhcbiAgICByZWZyZXNoVHJhY2tlclN0YXRlKFxuICAgICAgYXN5bmMgKCkgPT4gb3JpZ2luYWwsXG4gICAgICBhc3luYyAoKSA9PiBwYXJzZUNsdWJMb2NrZXJGZWVkKHsgbWF0Y2hlczogW3sgZXh0ZXJuYWxJZDogXCJicm9rZW5cIiB9XSB9KSxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgcGVyc2lzdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKSxcbiAgICAvaW52YWxpZCBzdGFydHNBdC8sXG4gICk7XG5cbiAgYXNzZXJ0LmVxdWFsKHBlcnNpc3RlZCwgZmFsc2UpO1xuICBhc3NlcnQuZXF1YWwob3JpZ2luYWwubWF0Y2hlc1swXT8ub3Bwb25lbnQsIFwiT3JpZ2luYWwgb3Bwb25lbnRcIik7XG59KTtcblxudGVzdChcInJldGFpbmVkLW1hdGNoIG92ZXJsYXBzIG5ldmVyIG11dGF0ZSBvciBwZXJzaXN0IHRyYWNrZXIgc3RhdGVcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlV2l0aChcbiAgICBzdG9yZWRNYXRjaChcImNvbXBsZXRlZFwiLCB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiB9KSxcbiAgKTtcbiAgY29uc3Qgc25hcHNob3QgPSBzdHJ1Y3R1cmVkQ2xvbmUob3JpZ2luYWwpO1xuICBsZXQgcGVyc2lzdGVkID0gZmFsc2U7XG5cbiAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgcmVmcmVzaFRyYWNrZXJTdGF0ZShcbiAgICAgIGFzeW5jICgpID0+IG9yaWdpbmFsLFxuICAgICAgYXN5bmMgKCkgPT4gKHtcbiAgICAgICAgbWF0Y2hlczogW1xuICAgICAgICAgIGluY29taW5nKFwibmV3LW1hdGNoXCIsIHtcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTU6MDA6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE1OjQ1OjAwLTA0OjAwXCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgcGVyc2lzdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKSxcbiAgICAvb3ZlcmxhcHBpbmcgYSByZXRhaW5lZCBtYXRjaC8sXG4gICk7XG5cbiAgYXNzZXJ0LmVxdWFsKHBlcnNpc3RlZCwgZmFsc2UpO1xuICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBzbmFwc2hvdCk7XG59KTtcblxudGVzdChcInJlc2NoZWR1bGVkIGltcG9ydGVkIG1hdGNoZXMgY2Fubm90IG92ZXJsYXAgYWJzZW50IHNhdmVkIGhpc3RvcnkgYWNyb3NzIHRpbWV6b25lIG9mZnNldHNcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXBvcnRlZE1hdGNoID0gc3RvcmVkTWF0Y2goXCJyZXBvcnRlZFwiLCB7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcInN0b3JlZC1yZXBvcnRlZFwiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJHb29kIHJlY292ZXJ5XCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDE4OjAwOjAwWlwiLFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBhYnNlbnRTYXZlZE1hdGNoZXMgPSBbXG4gICAgc3RvcmVkTWF0Y2goXCJjb21wbGV0ZWRcIiwgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIsIHJlc3VsdDogXCJXb24gMy0xXCIgfSksXG4gICAgcmVwb3J0ZWRNYXRjaCxcbiAgXTtcblxuICBmb3IgKGNvbnN0IGFic2VudFNhdmVkTWF0Y2ggb2YgYWJzZW50U2F2ZWRNYXRjaGVzKSB7XG4gICAgY29uc3QgaW1wb3J0ZWQgPSBzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIsIHtcbiAgICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgICAgcmVzdWx0OiBcIkxvY2FsIHJlc3VsdFwiLFxuICAgIH0pO1xuICAgIGNvbnN0IG9yaWdpbmFsID0gc3RhdGVXaXRoKGltcG9ydGVkLCBhYnNlbnRTYXZlZE1hdGNoKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG4gICAgbGV0IHBlcnNpc3RlZCA9IGZhbHNlO1xuXG4gICAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgICByZWZyZXNoVHJhY2tlclN0YXRlKFxuICAgICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgICAgYXN5bmMgKCkgPT4gKHtcbiAgICAgICAgICBtYXRjaGVzOiBbXG4gICAgICAgICAgICBpbmNvbWluZyhcImV4aXN0aW5nXCIsIHtcbiAgICAgICAgICAgICAgb3Bwb25lbnQ6IFwiQ2hhbmdlZCBvcHBvbmVudFwiLFxuICAgICAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEyOjE0OjU5LTA3OjAwXCIsXG4gICAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEzOjAwOjAwLTA3OjAwXCIsXG4gICAgICAgICAgICAgIHZlbnVlOiBcIkNoYW5nZWQgdmVudWVcIixcbiAgICAgICAgICAgICAgY291cnQ6IFwiQ291cnQgN1wiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBwZXJzaXN0ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgKSxcbiAgICAgIC9vdmVybGFwcGluZyBhIHJldGFpbmVkIG1hdGNoIGZvciBwbGF5ZXIgSUQgXCJwbGF5ZXItMVwiLyxcbiAgICApO1xuXG4gICAgYXNzZXJ0LmVxdWFsKHBlcnNpc3RlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwob3JpZ2luYWwsIHNuYXBzaG90KTtcbiAgICBhc3NlcnQuZXF1YWwob3JpZ2luYWwubWF0Y2hlc1swXT8uY29hY2hJZCwgXCJjb2FjaC0xXCIpO1xuICAgIGFzc2VydC5lcXVhbChvcmlnaW5hbC5tYXRjaGVzWzBdPy5yZXN1bHQsIFwiTG9jYWwgcmVzdWx0XCIpO1xuICB9XG59KTtcblxudGVzdChcInJlc2NoZWR1bGVkIGltcG9ydGVkIG1hdGNoZXMgY2FuIHN0YXJ0IGF0IGFuIGVxdWl2YWxlbnQgYm91bmRhcnkgaW5zdGFudCBhY3Jvc3MgdGltZXpvbmUgb2Zmc2V0c1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlcG9ydGVkTWF0Y2ggPSBzdG9yZWRNYXRjaChcInJlcG9ydGVkXCIsIHtcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IFwic3RvcmVkLXJlcG9ydGVkXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIkdvb2QgcmVjb3ZlcnlcIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgfSxcbiAgfSk7XG4gIGNvbnN0IGFic2VudFNhdmVkTWF0Y2hlcyA9IFtcbiAgICBzdG9yZWRNYXRjaChcImNvbXBsZXRlZFwiLCB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiwgcmVzdWx0OiBcIldvbiAzLTFcIiB9KSxcbiAgICByZXBvcnRlZE1hdGNoLFxuICBdO1xuXG4gIGZvciAoY29uc3QgYWJzZW50U2F2ZWRNYXRjaCBvZiBhYnNlbnRTYXZlZE1hdGNoZXMpIHtcbiAgICBjb25zdCBpbXBvcnRlZCA9IHN0b3JlZE1hdGNoKFwiZXhpc3RpbmdcIiwge1xuICAgICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgICByZXN1bHQ6IFwiTG9jYWwgcmVzdWx0XCIsXG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZVdpdGgoaW1wb3J0ZWQsIGFic2VudFNhdmVkTWF0Y2gpO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gc3RydWN0dXJlZENsb25lKG9yaWdpbmFsKTtcbiAgICBsZXQgcGVyc2lzdGVkOiBUcmFja2VyU3RhdGUgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0IHJlZnJlc2hlZCA9IGF3YWl0IHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgIGFzeW5jICgpID0+ICh7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBpbmNvbWluZyhcImV4aXN0aW5nXCIsIHtcbiAgICAgICAgICAgIG9wcG9uZW50OiBcIkNoYW5nZWQgb3Bwb25lbnRcIixcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTI6MTU6MDAtMDc6MDBcIixcbiAgICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEzOjAwOjAwLTA3OjAwXCIsXG4gICAgICAgICAgICB2ZW51ZTogXCJDaGFuZ2VkIHZlbnVlXCIsXG4gICAgICAgICAgICBjb3VydDogXCJDb3VydCA3XCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIGFzeW5jIChyZXBsYWNlbWVudCkgPT4ge1xuICAgICAgICBwZXJzaXN0ZWQgPSByZXBsYWNlbWVudDtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hlZEltcG9ydGVkID0gcmVmcmVzaGVkLm1hdGNoZXMuZmluZChcbiAgICAgIChtYXRjaCkgPT4gbWF0Y2guZXh0ZXJuYWxJZCA9PT0gXCJleGlzdGluZ1wiLFxuICAgICk7XG4gICAgYXNzZXJ0Lm9rKHJlZnJlc2hlZEltcG9ydGVkKTtcbiAgICBhc3NlcnQuZXF1YWwocmVmcmVzaGVkSW1wb3J0ZWQuc3RhcnRzQXQsIFwiMjAyNi0wOS0xNlQxMjoxNTowMC0wNzowMFwiKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBEYXRlLnBhcnNlKHJlZnJlc2hlZEltcG9ydGVkLnN0YXJ0c0F0KSxcbiAgICAgIERhdGUucGFyc2UoYWJzZW50U2F2ZWRNYXRjaC5lbmRzQXQpLFxuICAgICk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlZnJlc2hlZEltcG9ydGVkLmNvYWNoSWQsIFwiY29hY2gtMVwiKTtcbiAgICBhc3NlcnQuZXF1YWwocmVmcmVzaGVkSW1wb3J0ZWQucmVzdWx0LCBcIkxvY2FsIHJlc3VsdFwiKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHBlcnNpc3RlZCwgcmVmcmVzaGVkKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKG9yaWdpbmFsLCBzbmFwc2hvdCk7XG4gIH1cbn0pO1xuXG50ZXN0KFwicmVmcmVzaCB2YWxpZGF0ZXMgdHlwZWQgZmVlZHMgYmVmb3JlIG1lcmdpbmcgb3IgcGVyc2lzdGluZyB0aGVtXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgaW52YWxpZEZlZWRzID0gW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgICAgb3Bwb25lbnQ6IFwiQ2hhbmdlZCBvcHBvbmVudFwiLFxuICAgICAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgICAgb3Bwb25lbnQ6IFwiQ2hhbmdlZCBvcHBvbmVudFwiLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICBwbGF5ZXJzOiBbXG4gICAgICAgIHsgaWQ6IFwicGxheWVyLTFcIiwgbmFtZTogXCJQbGF5ZXIgT25lXCIgfSxcbiAgICAgICAgeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIkRpZmZlcmVudCBQbGF5ZXJcIiB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgaW5jb21pbmcoXCJleGlzdGluZ1wiLCB7XG4gICAgICAgICAgb3Bwb25lbnQ6IFwiQ2hhbmdlZCBvcHBvbmVudFwiLFxuICAgICAgICB9KSxcbiAgICAgICAgaW5jb21pbmcoXCJvdmVybGFwXCIsIHtcbiAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE1OjAwOjAwLTA0OjAwXCIsXG4gICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG5cbiAgZm9yIChjb25zdCBpbnZhbGlkRmVlZCBvZiBpbnZhbGlkRmVlZHMpIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlV2l0aChzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIpKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG4gICAgbGV0IHBlcnNpc3RlZCA9IGZhbHNlO1xuXG4gICAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgICByZWZyZXNoVHJhY2tlclN0YXRlKFxuICAgICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgICAgYXN5bmMgKCkgPT4gaW52YWxpZEZlZWQsXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBwZXJzaXN0ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgYXNzZXJ0LmVxdWFsKHBlcnNpc3RlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwob3JpZ2luYWwsIHNuYXBzaG90KTtcbiAgfVxufSk7XG5cbnRlc3QoXCJ1bmF2YWlsYWJsZSBmZWVkcyBsZWF2ZSBzdG9yZWQgdHJhY2tlciBzdGF0ZSB1bmNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlV2l0aChzdG9yZWRNYXRjaChcImV4aXN0aW5nXCIpKTtcbiAgbGV0IHBlcnNpc3RlZCA9IGZhbHNlO1xuXG4gIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gICAgICBhc3luYyAoKSA9PiBvcmlnaW5hbCxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2x1YiBMb2NrZXIgcmV0dXJuZWQgSFRUUCA1MDNcIik7XG4gICAgICB9LFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICBwZXJzaXN0ZWQgPSB0cnVlO1xuICAgICAgfSxcbiAgICApLFxuICAgIC9IVFRQIDUwMy8sXG4gICk7XG5cbiAgYXNzZXJ0LmVxdWFsKHBlcnNpc3RlZCwgZmFsc2UpO1xuICBhc3NlcnQuZXF1YWwob3JpZ2luYWwubWF0Y2hlc1swXT8ub3Bwb25lbnQsIFwiT3JpZ2luYWwgb3Bwb25lbnRcIik7XG59KTtcblxudGVzdChcImZhaWxlZCBwZXJzaXN0ZW5jZSBsZWF2ZXMgdGhlIGxvYWRlZCB0cmFja2VyIHN0YXRlIHVuY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsID0gc3RhdGVXaXRoKFxuICAgIHN0b3JlZE1hdGNoKFwiZXhpc3RpbmdcIiwge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICAgIHJlcG9ydDoge1xuICAgICAgICBtYXRjaElkOiBcInN0b3JlZC1leGlzdGluZ1wiLFxuICAgICAgICBvYnNlcnZhdGlvbnM6IFtcIktlZXAgd2lkdGhcIl0sXG4gICAgICAgIHRyYW5zY3JpcHQ6IFwiQ29hY2ggbm90ZXNcIixcbiAgICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTg6MDA6MDBaXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICApO1xuICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbCk7XG5cbiAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgcmVmcmVzaFRyYWNrZXJTdGF0ZShcbiAgICAgIGFzeW5jICgpID0+IG9yaWdpbmFsLFxuICAgICAgYXN5bmMgKCkgPT4gKHtcbiAgICAgICAgbWF0Y2hlczogW1xuICAgICAgICAgIGluY29taW5nKFwiZXhpc3RpbmdcIiwge1xuICAgICAgICAgICAgb3Bwb25lbnQ6IFwiQ2hhbmdlZCBvcHBvbmVudFwiLFxuICAgICAgICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMDowMDowMC0wNDowMFwiLFxuICAgICAgICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTdUMTA6NDU6MDAtMDQ6MDBcIixcbiAgICAgICAgICAgIHZlbnVlOiBcIkNoYW5nZWQgdmVudWVcIixcbiAgICAgICAgICAgIGNvdXJ0OiBcIkNvdXJ0IDdcIixcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQZXJzaXN0ZW5jZSB1bmF2YWlsYWJsZVwiKTtcbiAgICAgIH0sXG4gICAgKSxcbiAgICAvUGVyc2lzdGVuY2UgdW5hdmFpbGFibGUvLFxuICApO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwob3JpZ2luYWwsIHNuYXBzaG90KTtcbn0pO1xuXG50ZXN0KFwiY291bnRzIGNvbnNlY3V0aXZlIHJlZnJlc2ggZmFpbHVyZXMgYW5kIHByZXNlcnZlcyBhbGVydCBzdGF0ZVwiLCAoKSA9PiB7XG4gIGNvbnN0IGZpcnN0ID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgc3RhdGVXaXRoKCksXG4gICAgMixcbiAgICBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICApO1xuICBmaXJzdC5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gXCIyMDI2LTA5LTE2VDEyOjAxOjAwLjAwMFpcIjtcbiAgY29uc3Qgc2Vjb25kID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgZmlyc3QsXG4gICAgMixcbiAgICBcIjIwMjYtMDktMTZUMTI6MDU6MDAuMDAwWlwiLFxuICApO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoc2Vjb25kLnJlZnJlc2hIZWFsdGgsIHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAyLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAyLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICAgIGxhc3RGYWlsdXJlQXQ6IFwiMjAyNi0wOS0xNlQxMjowNTowMC4wMDBaXCIsXG4gICAgYWxlcnRTZW50QXQ6IFwiMjAyNi0wOS0xNlQxMjowMTowMC4wMDBaXCIsXG4gICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbXSxcbiAgICByZWNvdmVyeUNsYWltOiBudWxsLFxuICB9KTtcbn0pO1xuXG50ZXN0KFwic3VjY2Vzc2Z1bCByZWZyZXNoIGNsZWFycyB0aGUgZmFpbHVyZSBjb25kaXRpb24gYW5kIHF1ZXVlcyBpdHMgcmVjb3ZlcnlcIiwgKCkgPT4ge1xuICBjb25zdCBmYWlsaW5nID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgc3RhdGVXaXRoKCksXG4gICAgMixcbiAgICBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICApO1xuICBmYWlsaW5nLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQgPSBcIjIwMjYtMDktMTZUMTI6MDE6MDAuMDAwWlwiO1xuICBjb25zdCBoZWFsdGh5ID0gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gICAgZmFpbGluZyxcbiAgICA0LFxuICAgIFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCIsXG4gICk7XG5cbiAgYXNzZXJ0LmRlZXBFcXVhbChoZWFsdGh5LnJlZnJlc2hIZWFsdGgsIHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiA0LFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbe1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDEsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IGZhaWxpbmcucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCxcbiAgICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICAgICAgb3V0YWdlRHVyYXRpb25NczogMjAgKiA2MF8wMDAsXG4gICAgfV0sXG4gICAgcmVjb3ZlcnlDbGFpbTogbnVsbCxcbiAgfSk7XG59KTtcblxudGVzdChcInN1Y2Nlc3NmdWwgcmVmcmVzaCBwcmVzZXJ2ZXMgcGVuZGluZyByZWNvdmVyaWVzIHVudGlsIGRlbGl2ZXJ5IHN1Y2NlZWRzXCIsICgpID0+IHtcbiAgY29uc3QgcGVuZGluZyA9IHtcbiAgICBmYWlsZWRBdHRlbXB0czogMyxcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMjAgKiA2MF8wMDAsXG4gIH07XG4gIGNvbnN0IHN0YXRlID0gc3RhdGVXaXRoKCk7XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbcGVuZGluZ107XG5cbiAgY29uc3QgcmV0cmllZCA9IGNsZWFyUmVmcmVzaEZhaWx1cmVzKFxuICAgIHN0YXRlLFxuICAgIDMsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjMwOjAwLjAwMFpcIixcbiAgKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChyZXRyaWVkLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsIFtwZW5kaW5nXSk7XG4gIGFzc2VydC5ub3RFcXVhbChyZXRyaWVkLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0sIHBlbmRpbmcpO1xuXG4gIGNvbnN0IGRlbGl2ZXJlZCA9IGNsZWFyUGVuZGluZ1JlY292ZXJ5KHJldHJpZWQpO1xuICBhc3NlcnQuZGVlcEVxdWFsKGRlbGl2ZXJlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLCBbXSk7XG4gIGFzc2VydC5kZWVwRXF1YWwocmV0cmllZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLCBbcGVuZGluZ10pO1xufSk7XG5cbnRlc3QoXCJtdXRhYmxlIGZhaWx1cmUgc3RhdGUgZG9lcyBub3Qgc2hhcmUgbG9hZGVkIHJlY292ZXJ5IG1ldGFkYXRhXCIsICgpID0+IHtcbiAgY29uc3QgbG9hZGVkID0gc3RhdGVXaXRoKCk7XG4gIGxvYWRlZC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMyxcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMjAgKiA2MF8wMDAsXG4gIH1dO1xuXG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgbG9hZGVkLFxuICAgIDMsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjMwOjAwLjAwMFpcIixcbiAgKTtcbiAgYXNzZXJ0Lm5vdEVxdWFsKFxuICAgIHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0sXG4gICAgbG9hZGVkLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0sXG4gICk7XG5cbiAgcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXSEuZmFpbGVkQXR0ZW1wdHMgPSA0O1xuICBhc3NlcnQuZXF1YWwobG9hZGVkLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF0hLmZhaWxlZEF0dGVtcHRzLCAzKTtcbn0pO1xuXG50ZXN0KFwiYmFjay10by1iYWNrIGFsZXJ0ZWQgb3V0YWdlcyBxdWV1ZSByZWNvdmVyaWVzIGluIG9yZGVyXCIsICgpID0+IHtcbiAgY29uc3QgZmlyc3RPdXRhZ2UgPSByZWNvcmRSZWZyZXNoRmFpbHVyZShcbiAgICBzdGF0ZVdpdGgoKSxcbiAgICAxLFxuICAgIFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICk7XG4gIGZpcnN0T3V0YWdlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQgPSBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiO1xuICBjb25zdCBmaXJzdFJlY292ZXJ5ID0gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gICAgZmlyc3RPdXRhZ2UsXG4gICAgMSxcbiAgICBcIjIwMjYtMDktMTZUMTI6MTA6MDAuMDAwWlwiLFxuICApO1xuICBjb25zdCBzZWNvbmRPdXRhZ2UgPSByZWNvcmRSZWZyZXNoRmFpbHVyZShcbiAgICBmaXJzdFJlY292ZXJ5LFxuICAgIDEsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjIwOjAwLjAwMFpcIixcbiAgKTtcbiAgc2Vjb25kT3V0YWdlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQgPSBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiO1xuICBjb25zdCBzZWNvbmRSZWNvdmVyeSA9IGNsZWFyUmVmcmVzaEZhaWx1cmVzKFxuICAgIHNlY29uZE91dGFnZSxcbiAgICAxLFxuICAgIFwiMjAyNi0wOS0xNlQxMjozNTowMC4wMDBaXCIsXG4gICk7XG5cbiAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICBzZWNvbmRSZWNvdmVyeS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLm1hcChcbiAgICAgIChyZWNvdmVyeSkgPT4gcmVjb3Zlcnkub3V0YWdlU3RhcnRlZEF0LFxuICAgICksXG4gICAgW1wiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsIFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCJdLFxuICApO1xuICBhc3NlcnQuZXF1YWwoXG4gICAgY2xlYXJQZW5kaW5nUmVjb3Zlcnkoc2Vjb25kUmVjb3ZlcnkpLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXNbMF1cbiAgICAgID8ub3V0YWdlU3RhcnRlZEF0LFxuICAgIFwiMjAyNi0wOS0xNlQxMjoyMDowMC4wMDBaXCIsXG4gICk7XG59KTtcblxudGVzdChcInJlcG9ydHMgcmVjb3ZlcnkgZGV0YWlscyBvbmx5IGFmdGVyIGFuIGFsZXJ0ZWQgZmFpbHVyZVwiLCAoKSA9PiB7XG4gIGNvbnN0IG5vcm1hbFN1Y2Nlc3MgPSBnZXRSZWZyZXNoUmVjb3ZlcnkoXG4gICAgc3RhdGVXaXRoKCksXG4gICAgXCIyMDI2LTA5LTE2VDEyOjEwOjAwLjAwMFpcIixcbiAgKTtcbiAgYXNzZXJ0LmVxdWFsKG5vcm1hbFN1Y2Nlc3MsIG51bGwpO1xuXG4gIGNvbnN0IGZhaWxpbmcgPSByZWNvcmRSZWZyZXNoRmFpbHVyZShcbiAgICBzdGF0ZVdpdGgoKSxcbiAgICAyLFxuICAgIFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICk7XG4gIGNvbnN0IGFsZXJ0ZWQgPSByZWNvcmRSZWZyZXNoRmFpbHVyZShcbiAgICBmYWlsaW5nLFxuICAgIDIsXG4gICAgXCIyMDI2LTA5LTE2VDEyOjA1OjAwLjAwMFpcIixcbiAgKTtcbiAgYWxlcnRlZC5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gXCIyMDI2LTA5LTE2VDEyOjA1OjAwLjAwMFpcIjtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIGdldFJlZnJlc2hSZWNvdmVyeShhbGVydGVkLCBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiKSxcbiAgICB7XG4gICAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICAgIG91dGFnZVN0YXJ0ZWRBdDogXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MjA6MDAuMDAwWlwiLFxuICAgICAgb3V0YWdlRHVyYXRpb25NczogMjAgKiA2MF8wMDAsXG4gICAgfSxcbiAgKTtcbn0pOyIsICJ0eXBlIFRyYWNrZXJQZXJzb24gPSB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgc2hhcmVUb2tlbj86IHN0cmluZyB9O1xuXG50eXBlIFRyYWNrZXJNYXRjaCA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGV4dGVybmFsSWQ6IHN0cmluZyB8IG51bGw7XG4gICAgcGxheWVySWQ6IHN0cmluZztcbiAgICBvcHBvbmVudDogc3RyaW5nO1xuICAgIHN0YXJ0c0F0OiBzdHJpbmc7XG4gICAgZW5kc0F0OiBzdHJpbmc7XG4gICAgdmVudWU6IHN0cmluZztcbiAgICBjb3VydDogc3RyaW5nO1xuICAgIGNvYWNoSWQ6IHN0cmluZztcbiAgICBzdGF0dXM6IFwidXBjb21pbmdcIiB8IFwiY29tcGxldGVkXCI7XG4gICAgcmVzdWx0OiBzdHJpbmcgfCBudWxsO1xuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogc3RyaW5nO1xuICAgICAgb2JzZXJ2YXRpb25zOiBzdHJpbmdbXTtcbiAgICAgIHRyYW5zY3JpcHQ6IHN0cmluZyB8IG51bGw7XG4gICAgICBhdWRpb1BhdGg/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgdXBkYXRlZEF0OiBzdHJpbmc7XG4gICAgfSB8IG51bGw7XG4gIH07XG5cbmV4cG9ydCB0eXBlIFRyYWNrZXJTdGF0ZSA9IHtcbiAgcGxheWVyczogVHJhY2tlclBlcnNvbltdO1xuICBjb2FjaGVzOiBUcmFja2VyUGVyc29uW107XG4gIGJyYW5kaW5nPzogeyBuYW1lOiBzdHJpbmc7IGxvZ29QYXRoOiBzdHJpbmcgfCBudWxsIH07XG4gIG1hdGNoZXM6IFRyYWNrZXJNYXRjaFtdO1xuICBsYXN0VXBkYXRlZEF0OiBzdHJpbmc7XG4gIHNvdXJjZTogXCJzYW1wbGVcIiB8IFwiY2x1Yi1sb2NrZXJcIjtcbiAgcmVmcmVzaEhlYWx0aDogUmVmcmVzaEhlYWx0aDtcbn07XG5cbnR5cGUgRGVlcFJlYWRvbmx5PFQ+ID0gVCBleHRlbmRzICguLi5hcmdzOiBuZXZlcltdKSA9PiB1bmtub3duXG4gID8gVFxuICA6IFQgZXh0ZW5kcyByZWFkb25seSAoaW5mZXIgSXRlbSlbXVxuICAgID8gcmVhZG9ubHkgRGVlcFJlYWRvbmx5PEl0ZW0+W11cbiAgICA6IFQgZXh0ZW5kcyBvYmplY3RcbiAgICAgID8geyByZWFkb25seSBbS2V5IGluIGtleW9mIFRdOiBEZWVwUmVhZG9ubHk8VFtLZXldPiB9XG4gICAgICA6IFQ7XG5cbmV4cG9ydCB0eXBlIFJlYWRvbmx5VHJhY2tlclN0YXRlID0gRGVlcFJlYWRvbmx5PFRyYWNrZXJTdGF0ZT47XG5cbmV4cG9ydCB0eXBlIFJlZnJlc2hIZWFsdGggPSB7XG4gIGNvbnNlY3V0aXZlRmFpbHVyZXM6IG51bWJlcjtcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcjtcbiAgZmlyc3RGYWlsdXJlQXQ6IHN0cmluZyB8IG51bGw7XG4gIGxhc3RGYWlsdXJlQXQ6IHN0cmluZyB8IG51bGw7XG4gIGFsZXJ0U2VudEF0OiBzdHJpbmcgfCBudWxsO1xuICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0cmluZyB8IG51bGw7XG4gIHBlbmRpbmdSZWNvdmVyaWVzOiBSZWZyZXNoUmVjb3ZlcnlbXTtcbiAgcmVjb3ZlcnlDbGFpbToge1xuICAgIG91dGFnZVN0YXJ0ZWRBdDogc3RyaW5nO1xuICAgIHJlY292ZXJlZEF0OiBzdHJpbmc7XG4gICAgY2xhaW1lZEF0OiBzdHJpbmc7XG4gIH0gfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgUmVmcmVzaFJlY292ZXJ5ID0ge1xuICBmYWlsZWRBdHRlbXB0czogbnVtYmVyO1xuICBvdXRhZ2VTdGFydGVkQXQ6IHN0cmluZztcbiAgcmVjb3ZlcmVkQXQ6IHN0cmluZztcbiAgb3V0YWdlRHVyYXRpb25NczogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVHJhY2tlclN0YXRlKHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgcGxheWVyczogc3RhdGUucGxheWVycy5tYXAoKHBsYXllcikgPT4gKHsgLi4ucGxheWVyIH0pKSxcbiAgICBjb2FjaGVzOiBzdGF0ZS5jb2FjaGVzLm1hcCgoY29hY2gpID0+ICh7IC4uLmNvYWNoIH0pKSxcbiAgICBicmFuZGluZzogc3RhdGUuYnJhbmRpbmcgPyB7IC4uLnN0YXRlLmJyYW5kaW5nIH0gOiB1bmRlZmluZWQsXG4gICAgbWF0Y2hlczogc3RhdGUubWF0Y2hlcy5tYXAoY2xvbmVUcmFja2VyTWF0Y2gpLFxuICAgIGxhc3RVcGRhdGVkQXQ6IHN0YXRlLmxhc3RVcGRhdGVkQXQsXG4gICAgc291cmNlOiBzdGF0ZS5zb3VyY2UsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgLi4uc3RhdGUucmVmcmVzaEhlYWx0aCxcbiAgICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBjbG9uZVJlZnJlc2hSZWNvdmVyaWVzKFxuICAgICAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLFxuICAgICAgKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJlZXplVHJhY2tlclN0YXRlKHN0YXRlOiBUcmFja2VyU3RhdGUpOiBSZWFkb25seVRyYWNrZXJTdGF0ZSB7XG4gIGZvciAoY29uc3QgcGxheWVyIG9mIHN0YXRlLnBsYXllcnMpIE9iamVjdC5mcmVlemUocGxheWVyKTtcbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5wbGF5ZXJzKTtcbiAgZm9yIChjb25zdCBjb2FjaCBvZiBzdGF0ZS5jb2FjaGVzKSBPYmplY3QuZnJlZXplKGNvYWNoKTtcbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5jb2FjaGVzKTtcbiAgaWYgKHN0YXRlLmJyYW5kaW5nKSBPYmplY3QuZnJlZXplKHN0YXRlLmJyYW5kaW5nKTtcbiAgZm9yIChjb25zdCBtYXRjaCBvZiBzdGF0ZS5tYXRjaGVzKSB7XG4gICAgaWYgKG1hdGNoLnJlcG9ydCkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShtYXRjaC5yZXBvcnQub2JzZXJ2YXRpb25zKTtcbiAgICAgIE9iamVjdC5mcmVlemUobWF0Y2gucmVwb3J0KTtcbiAgICB9XG4gICAgT2JqZWN0LmZyZWV6ZShtYXRjaCk7XG4gIH1cbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5tYXRjaGVzKTtcbiAgZm9yIChjb25zdCByZWNvdmVyeSBvZiBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzKSB7XG4gICAgT2JqZWN0LmZyZWV6ZShyZWNvdmVyeSk7XG4gIH1cbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzKTtcbiAgaWYgKHN0YXRlLnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSkge1xuICAgIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltKTtcbiAgfVxuICBPYmplY3QuZnJlZXplKHN0YXRlLnJlZnJlc2hIZWFsdGgpO1xuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lUmVmcmVzaFJlY292ZXJpZXMoXG4gIHJlY292ZXJpZXM6IHJlYWRvbmx5IERlZXBSZWFkb25seTxSZWZyZXNoUmVjb3Zlcnk+W10sXG4pOiBSZWZyZXNoUmVjb3ZlcnlbXSB7XG4gIHJldHVybiByZWNvdmVyaWVzLm1hcCgocmVjb3ZlcnkpID0+ICh7IC4uLnJlY292ZXJ5IH0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZnJlc2hSZWNvdmVyeShcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICByZWNvdmVyZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFJlZnJlc2hSZWNvdmVyeSB8IG51bGwge1xuICBjb25zdCB7IGFsZXJ0U2VudEF0LCBjb25zZWN1dGl2ZUZhaWx1cmVzLCBmaXJzdEZhaWx1cmVBdCB9ID1cbiAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoO1xuICBpZiAoXG4gICAgYWxlcnRTZW50QXQgPT09IG51bGwgfHxcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzID09PSAwIHx8XG4gICAgZmlyc3RGYWlsdXJlQXQgPT09IG51bGxcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZhaWxlZEF0dGVtcHRzOiBjb25zZWN1dGl2ZUZhaWx1cmVzLFxuICAgIG91dGFnZVN0YXJ0ZWRBdDogZmlyc3RGYWlsdXJlQXQsXG4gICAgcmVjb3ZlcmVkQXQsXG4gICAgb3V0YWdlRHVyYXRpb25NczogTWF0aC5tYXgoXG4gICAgICAwLFxuICAgICAgRGF0ZS5wYXJzZShyZWNvdmVyZWRBdCkgLSBEYXRlLnBhcnNlKGZpcnN0RmFpbHVyZUF0KSxcbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgcmVjb3ZlcmVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgY29uc3QgcGVuZGluZ1JlY292ZXJpZXMgPSByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzO1xuICBjb25zdCByZWNvdmVyeSA9IGdldFJlZnJlc2hSZWNvdmVyeShzdGF0ZSwgcmVjb3ZlcmVkQXQpO1xuICBpZiAocmVjb3ZlcnkpIHBlbmRpbmdSZWNvdmVyaWVzLnB1c2gocmVjb3ZlcnkpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IDAsXG4gICAgICBhbGVydFRocmVzaG9sZCxcbiAgICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgbGFzdEZhaWx1cmVBdDogbnVsbCxcbiAgICAgIGFsZXJ0U2VudEF0OiBudWxsLFxuICAgICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUGVuZGluZ1JlY292ZXJ5KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5zbGljZSgxKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgZmFpbGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXBsYWNlbWVudCxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgKyAxLFxuICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICBmaXJzdEZhaWx1cmVBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCA/PyBmYWlsZWRBdCxcbiAgICAgIGxhc3RGYWlsdXJlQXQ6IGZhaWxlZEF0LFxuICAgICAgYWxlcnRTZW50QXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlck1hdGNoID0ge1xuICBleHRlcm5hbElkOiBzdHJpbmc7XG4gIHBsYXllcklkOiBzdHJpbmc7XG4gIHBsYXllck5hbWU/OiBzdHJpbmc7XG4gIG9wcG9uZW50OiBzdHJpbmc7XG4gIHN0YXJ0c0F0OiBzdHJpbmc7XG4gIGVuZHNBdDogc3RyaW5nO1xuICB2ZW51ZTogc3RyaW5nO1xuICBjb3VydDogc3RyaW5nO1xuICBzdGF0dXM/OiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICByZXN1bHQ/OiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlckZlZWQgPSB7XG4gIG1hdGNoZXM6IENsdWJMb2NrZXJNYXRjaFtdO1xuICBwbGF5ZXJzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT47XG59O1xuXG5leHBvcnQgdHlwZSBSZWFkb25seUNsdWJMb2NrZXJGZWVkID0gRGVlcFJlYWRvbmx5PENsdWJMb2NrZXJGZWVkPjtcblxuZnVuY3Rpb24gY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2g6IFJlYWRvbmx5VHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXVtudW1iZXJdKTogVHJhY2tlck1hdGNoIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5tYXRjaCxcbiAgICByZXBvcnQ6XG4gICAgICBtYXRjaC5yZXBvcnQgPT09IG51bGxcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDoge1xuICAgICAgICAgICAgLi4ubWF0Y2gucmVwb3J0LFxuICAgICAgICAgICAgb2JzZXJ2YXRpb25zOiBbLi4ubWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9uc10sXG4gICAgICAgICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB2YWx1ZS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUoXG4gIHZhbHVlOiB1bmtub3duLFxuICBmaWVsZDogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuKTogc3RyaW5nIHtcbiAgY29uc3QgdGltZXN0YW1wID0gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlLCBmaWVsZCwgaW5kZXgpO1xuICBpZiAoIS8oPzpafFsrLV1cXGR7Mn06XFxkezJ9KSQvaS50ZXN0KHRpbWVzdGFtcCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTWF0Y2ggJHtpbmRleCArIDF9ICR7ZmllbGR9IG11c3QgaW5jbHVkZSBhbiBleHBsaWNpdCB0aW1lem9uZWAsXG4gICAgKTtcbiAgfVxuICBpZiAoTnVtYmVyLmlzTmFOKERhdGUucGFyc2UodGltZXN0YW1wKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB0aW1lc3RhbXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNsdWJMb2NrZXJGZWVkKHZhbHVlOiB1bmtub3duKTogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCB7XG4gIGlmIChcbiAgICAhdmFsdWUgfHxcbiAgICB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAhQXJyYXkuaXNBcnJheSgodmFsdWUgYXMgeyBtYXRjaGVzPzogdW5rbm93biB9KS5tYXRjaGVzKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgQ2x1YiBMb2NrZXIgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiBhIG1hdGNoZXMgYXJyYXlcIik7XG4gIH1cblxuICBjb25zdCByYXcgPSB2YWx1ZSBhcyB7XG4gICAgbWF0Y2hlczogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+O1xuICAgIHBsYXllcnM/OiB1bmtub3duO1xuICB9O1xuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG1hdGNoZXMgPSByYXcubWF0Y2hlcy5tYXAoKG1hdGNoLCBpbmRleCk6IENsdWJMb2NrZXJNYXRjaCA9PiB7XG4gICAgY29uc3QgZXh0ZXJuYWxJZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5leHRlcm5hbElkLCBcImV4dGVybmFsSWRcIiwgaW5kZXgpO1xuICAgIGlmIChzZWVuLmhhcyhleHRlcm5hbElkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBkdXBsaWNhdGUgbWF0Y2ggSUQgXCIke2V4dGVybmFsSWR9XCJgKTtcbiAgICB9XG4gICAgc2Vlbi5hZGQoZXh0ZXJuYWxJZCk7XG5cbiAgICBjb25zdCBzdGFydHNBdCA9IHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUobWF0Y2guc3RhcnRzQXQsIFwic3RhcnRzQXRcIiwgaW5kZXgpO1xuICAgIGNvbnN0IGVuZHNBdCA9IHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUobWF0Y2guZW5kc0F0LCBcImVuZHNBdFwiLCBpbmRleCk7XG4gICAgaWYgKERhdGUucGFyc2UoZW5kc0F0KSA8PSBEYXRlLnBhcnNlKHN0YXJ0c0F0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYXRjaCAke2luZGV4ICsgMX0gbXVzdCBlbmQgYWZ0ZXIgaXQgc3RhcnRzYCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIG1hdGNoLnN0YXR1cyAhPSBudWxsICYmXG4gICAgICBtYXRjaC5zdGF0dXMgIT09IFwidXBjb21pbmdcIiAmJlxuICAgICAgbWF0Y2guc3RhdHVzICE9PSBcImNvbXBsZXRlZFwiXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCBzdGF0dXNgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZXh0ZXJuYWxJZCxcbiAgICAgIHBsYXllcklkOiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gucGxheWVySWQsIFwicGxheWVySWRcIiwgaW5kZXgpLFxuICAgICAgcGxheWVyTmFtZTpcbiAgICAgICAgdHlwZW9mIG1hdGNoLnBsYXllck5hbWUgPT09IFwic3RyaW5nXCIgPyBtYXRjaC5wbGF5ZXJOYW1lLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIG9wcG9uZW50OiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gub3Bwb25lbnQsIFwib3Bwb25lbnRcIiwgaW5kZXgpLFxuICAgICAgc3RhcnRzQXQsXG4gICAgICBlbmRzQXQsXG4gICAgICB2ZW51ZTogcmVhZFJlcXVpcmVkU3RyaW5nKG1hdGNoLnZlbnVlLCBcInZlbnVlXCIsIGluZGV4KSxcbiAgICAgIGNvdXJ0OiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2guY291cnQsIFwiY291cnRcIiwgaW5kZXgpLFxuICAgICAgc3RhdHVzOlxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwidXBjb21pbmdcIiB8fCBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCJcbiAgICAgICAgICA/IG1hdGNoLnN0YXR1c1xuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgcmVzdWx0OlxuICAgICAgICB0eXBlb2YgbWF0Y2gucmVzdWx0ID09PSBcInN0cmluZ1wiIHx8IG1hdGNoLnJlc3VsdCA9PT0gbnVsbFxuICAgICAgICAgID8gbWF0Y2gucmVzdWx0XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlc0J5UGxheWVyID0gbmV3IE1hcDxzdHJpbmcsIENsdWJMb2NrZXJNYXRjaFtdPigpO1xuICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMpIHtcbiAgICBjb25zdCBwbGF5ZXJNYXRjaGVzID0gbWF0Y2hlc0J5UGxheWVyLmdldChtYXRjaC5wbGF5ZXJJZCkgPz8gW107XG4gICAgcGxheWVyTWF0Y2hlcy5wdXNoKG1hdGNoKTtcbiAgICBtYXRjaGVzQnlQbGF5ZXIuc2V0KG1hdGNoLnBsYXllcklkLCBwbGF5ZXJNYXRjaGVzKTtcbiAgfVxuICBmb3IgKGNvbnN0IFtwbGF5ZXJJZCwgcGxheWVyTWF0Y2hlc10gb2YgbWF0Y2hlc0J5UGxheWVyKSB7XG4gICAgcGxheWVyTWF0Y2hlcy5zb3J0KFxuICAgICAgKGxlZnQsIHJpZ2h0KSA9PiBEYXRlLnBhcnNlKGxlZnQuc3RhcnRzQXQpIC0gRGF0ZS5wYXJzZShyaWdodC5zdGFydHNBdCksXG4gICAgKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgcGxheWVyTWF0Y2hlcy5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gcGxheWVyTWF0Y2hlc1tpbmRleCAtIDFdO1xuICAgICAgY29uc3QgY3VycmVudCA9IHBsYXllck1hdGNoZXNbaW5kZXhdO1xuICAgICAgaWYgKERhdGUucGFyc2UoY3VycmVudC5zdGFydHNBdCkgPCBEYXRlLnBhcnNlKHByZXZpb3VzLmVuZHNBdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBvdmVybGFwcGluZyBtYXRjaGVzIGZvciBwbGF5ZXIgSUQgXCIke3BsYXllcklkfVwiYCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJOYW1lc0J5SWQgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCBwbGF5ZXJzID0gQXJyYXkuaXNBcnJheShyYXcucGxheWVycylcbiAgICA/IHJhdy5wbGF5ZXJzLm1hcCgocGxheWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllciB8fCB0eXBlb2YgcGxheWVyICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbGF5ZXIgJHtpbmRleCArIDF9IGlzIGludmFsaWRgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWVyIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgICBjb25zdCBpZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhpdGVtLmlkLCBcInBsYXllciBpZFwiLCBpbmRleCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSByZWFkUmVxdWlyZWRTdHJpbmcoaXRlbS5uYW1lLCBcInBsYXllciBuYW1lXCIsIGluZGV4KTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdOYW1lID0gcGxheWVyTmFtZXNCeUlkLmdldChpZCk7XG4gICAgICAgIGlmIChleGlzdGluZ05hbWUgIT09IHVuZGVmaW5lZCAmJiBleGlzdGluZ05hbWUgIT09IG5hbWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgQ2x1YiBMb2NrZXIgcmV0dXJuZWQgY29uZmxpY3RpbmcgbmFtZXMgZm9yIHBsYXllciBJRCBcIiR7aWR9XCJgLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyTmFtZXNCeUlkLnNldChpZCwgbmFtZSk7XG4gICAgICAgIHJldHVybiB7IGlkLCBuYW1lIH07XG4gICAgICB9KVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykgT2JqZWN0LmZyZWV6ZShtYXRjaCk7XG4gIE9iamVjdC5mcmVlemUobWF0Y2hlcyk7XG4gIGlmIChwbGF5ZXJzKSB7XG4gICAgZm9yIChjb25zdCBwbGF5ZXIgb2YgcGxheWVycykgT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xuICAgIE9iamVjdC5mcmVlemUocGxheWVycyk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IG1hdGNoZXMsIHBsYXllcnMgfSk7XG59XG5cbi8vIFRoZSBwbGFjZWhvbGRlciBkcmF3IGEgbmV3IHRyYWNrZXIgc3RhcnRzIHdpdGggKElOSVRJQUxfU1RBVEUgaW5cbi8vIHJvdXRlcy90cmFja2VyLnRzKSBpcyBkcm9wcGVkIG9uY2UgYSByZWFsIENsdWIgTG9ja2VyIHNjaGVkdWxlIGFycml2ZXMuXG5jb25zdCBTQU1QTEVfUExBWUVSX0lEID0gXCJjYW1lcm9uLXN0YWl0XCI7XG5cbmZ1bmN0aW9uIHdpdGhvdXRTYW1wbGVEcmF3KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFJlYWRvbmx5VHJhY2tlclN0YXRlIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YXRlLm1hdGNoZXMuZmlsdGVyKFxuICAgIChtYXRjaCkgPT4gIShtYXRjaC5leHRlcm5hbElkID09PSBudWxsICYmIG1hdGNoLnBsYXllcklkID09PSBTQU1QTEVfUExBWUVSX0lEKSxcbiAgKTtcbiAgY29uc3QgcGxheWVycyA9IG1hdGNoZXMuc29tZSgobWF0Y2gpID0+IG1hdGNoLnBsYXllcklkID09PSBTQU1QTEVfUExBWUVSX0lEKVxuICAgID8gc3RhdGUucGxheWVyc1xuICAgIDogc3RhdGUucGxheWVycy5maWx0ZXIoKHBsYXllcikgPT4gcGxheWVyLmlkICE9PSBTQU1QTEVfUExBWUVSX0lEKTtcbiAgcmV0dXJuIHsgLi4uc3RhdGUsIG1hdGNoZXMsIHBsYXllcnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ2x1YkxvY2tlckZlZWQoXG4gIGxvYWRlZFN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgZmVlZDogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHN0YXRlID0gd2l0aG91dFNhbXBsZURyYXcobG9hZGVkU3RhdGUpO1xuICBjb25zdCBjdXJyZW50QnlFeHRlcm5hbElkID0gbmV3IE1hcChcbiAgICBzdGF0ZS5tYXRjaGVzXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAobWF0Y2gpOiBtYXRjaCBpcyB0eXBlb2YgbWF0Y2ggJiB7IGV4dGVybmFsSWQ6IHN0cmluZyB9ID0+XG4gICAgICAgICAgbWF0Y2guZXh0ZXJuYWxJZCAhPT0gbnVsbCxcbiAgICAgIClcbiAgICAgIC5tYXAoKG1hdGNoKSA9PiBbbWF0Y2guZXh0ZXJuYWxJZCwgbWF0Y2hdKSxcbiAgKTtcbiAgY29uc3QgaW5jb21pbmdCeUV4dGVybmFsSWQgPSBuZXcgTWFwKFxuICAgIGZlZWQubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBbbWF0Y2guZXh0ZXJuYWxJZCwgbWF0Y2hdKSxcbiAgKTtcbiAgY29uc3QgaW1wb3J0ZWRJZHMgPSBuZXcgU2V0KGZlZWQubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBtYXRjaC5leHRlcm5hbElkKSk7XG4gIGNvbnN0IGxvY2FsbHlSZXRhaW5lZCA9IHN0YXRlLm1hdGNoZXMuZmlsdGVyKFxuICAgIChtYXRjaCkgPT5cbiAgICAgIChtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8ICFpbXBvcnRlZElkcy5oYXMobWF0Y2guZXh0ZXJuYWxJZCkpICYmXG4gICAgICAobWF0Y2guZXh0ZXJuYWxJZCA9PT0gbnVsbCB8fFxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIgfHxcbiAgICAgICAgbWF0Y2gucmVwb3J0ICE9PSBudWxsKSxcbiAgKTtcbiAgZm9yIChjb25zdCBpbmNvbWluZyBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBjb25zdCBvdmVybGFwc1JldGFpbmVkTWF0Y2ggPSBsb2NhbGx5UmV0YWluZWQuc29tZShcbiAgICAgIChyZXRhaW5lZE1hdGNoKSA9PlxuICAgICAgICByZXRhaW5lZE1hdGNoLnBsYXllcklkID09PSBpbmNvbWluZy5wbGF5ZXJJZCAmJlxuICAgICAgICBEYXRlLnBhcnNlKGluY29taW5nLnN0YXJ0c0F0KSA8IERhdGUucGFyc2UocmV0YWluZWRNYXRjaC5lbmRzQXQpICYmXG4gICAgICAgIERhdGUucGFyc2UocmV0YWluZWRNYXRjaC5zdGFydHNBdCkgPCBEYXRlLnBhcnNlKGluY29taW5nLmVuZHNBdCksXG4gICAgKTtcbiAgICBpZiAob3ZlcmxhcHNSZXRhaW5lZE1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBhIG1hdGNoIG92ZXJsYXBwaW5nIGEgcmV0YWluZWQgbWF0Y2ggZm9yIHBsYXllciBJRCBcIiR7aW5jb21pbmcucGxheWVySWR9XCJgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXRhaW5lZCA9IHN0YXRlLm1hdGNoZXNcbiAgICAuZmlsdGVyKFxuICAgICAgKG1hdGNoKSA9PlxuICAgICAgICBtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8XG4gICAgICAgIGltcG9ydGVkSWRzLmhhcyhtYXRjaC5leHRlcm5hbElkKSB8fFxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIgfHxcbiAgICAgICAgbWF0Y2gucmVwb3J0ICE9PSBudWxsLFxuICAgIClcbiAgICAubWFwKChtYXRjaCkgPT4ge1xuICAgICAgY29uc3QgaW5jb21pbmcgPVxuICAgICAgICBtYXRjaC5leHRlcm5hbElkID09PSBudWxsXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IGluY29taW5nQnlFeHRlcm5hbElkLmdldChtYXRjaC5leHRlcm5hbElkKTtcbiAgICAgIC8vIEEgcmVzdWx0IHJlY29yZGVkIGluIENsdWIgTG9ja2VyIGNsb3NlcyBvdXQgYSBtYXRjaCBzdGFmZiBoYXZlIG5vdFxuICAgICAgLy8gY2xvc2VkIHlldDsgYSByZXN1bHQgc3RhZmYgZW50ZXJlZCB0aGVtc2VsdmVzIGlzIG5ldmVyIG92ZXJ3cml0dGVuLlxuICAgICAgY29uc3QgYWRvcHRSZXN1bHQgPVxuICAgICAgICBpbmNvbWluZz8uc3RhdHVzID09PSBcImNvbXBsZXRlZFwiICYmIG1hdGNoLnN0YXR1cyA9PT0gXCJ1cGNvbWluZ1wiO1xuICAgICAgcmV0dXJuIGluY29taW5nXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2gpLFxuICAgICAgICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICAgICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICAgICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICAgICAgICAuLi4oYWRvcHRSZXN1bHRcbiAgICAgICAgICAgICAgPyB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiBhcyBjb25zdCwgcmVzdWx0OiBpbmNvbWluZy5yZXN1bHQgPz8gbnVsbCB9XG4gICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBjbG9uZVRyYWNrZXJNYXRjaChtYXRjaCk7XG4gICAgfSk7XG5cbiAgZm9yIChjb25zdCBpbmNvbWluZyBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBjb25zdCBleGlzdGluZyA9IGN1cnJlbnRCeUV4dGVybmFsSWQuZ2V0KGluY29taW5nLmV4dGVybmFsSWQpO1xuICAgIGlmIChleGlzdGluZykgY29udGludWU7XG5cbiAgICByZXRhaW5lZC5wdXNoKHtcbiAgICAgIGlkOiBgY2x1Yi1sb2NrZXI6JHtCdWZmZXIuZnJvbShpbmNvbWluZy5leHRlcm5hbElkKS50b1N0cmluZyhcImJhc2U2NHVybFwiKX1gLFxuICAgICAgZXh0ZXJuYWxJZDogaW5jb21pbmcuZXh0ZXJuYWxJZCxcbiAgICAgIHBsYXllcklkOiBpbmNvbWluZy5wbGF5ZXJJZCxcbiAgICAgIG9wcG9uZW50OiBpbmNvbWluZy5vcHBvbmVudCxcbiAgICAgIHN0YXJ0c0F0OiBpbmNvbWluZy5zdGFydHNBdCxcbiAgICAgIGVuZHNBdDogaW5jb21pbmcuZW5kc0F0LFxuICAgICAgdmVudWU6IGluY29taW5nLnZlbnVlLFxuICAgICAgY291cnQ6IGluY29taW5nLmNvdXJ0LFxuICAgICAgY29hY2hJZDogXCJ1bmFzc2lnbmVkXCIsXG4gICAgICBzdGF0dXM6IGluY29taW5nLnN0YXR1cyA/PyBcInVwY29taW5nXCIsXG4gICAgICByZXN1bHQ6IGluY29taW5nLnJlc3VsdCA/PyBudWxsLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcGxheWVyc0J5SWQgPSBuZXcgTWFwKFxuICAgIHN0YXRlLnBsYXllcnMubWFwKChwbGF5ZXIpID0+IFtwbGF5ZXIuaWQsIHsgLi4ucGxheWVyIH1dKSxcbiAgKTtcbiAgZm9yIChjb25zdCBwbGF5ZXIgb2YgZmVlZC5wbGF5ZXJzID8/IFtdKSB7XG4gICAgcGxheWVyc0J5SWQuc2V0KHBsYXllci5pZCwge1xuICAgICAgLi4ucGxheWVyLFxuICAgICAgc2hhcmVUb2tlbjogcGxheWVyc0J5SWQuZ2V0KHBsYXllci5pZCk/LnNoYXJlVG9rZW4sXG4gICAgfSk7XG4gIH1cbiAgZm9yIChjb25zdCBtYXRjaCBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBpZiAoIXBsYXllcnNCeUlkLmhhcyhtYXRjaC5wbGF5ZXJJZCkpIHtcbiAgICAgIHBsYXllcnNCeUlkLnNldChtYXRjaC5wbGF5ZXJJZCwge1xuICAgICAgICBpZDogbWF0Y2gucGxheWVySWQsXG4gICAgICAgIG5hbWU6IG1hdGNoLnBsYXllck5hbWUgfHwgbWF0Y2gucGxheWVySWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJyYW5kaW5nOiBzdGF0ZS5icmFuZGluZyA/IHsgLi4uc3RhdGUuYnJhbmRpbmcgfSA6IHVuZGVmaW5lZCxcbiAgICBjb2FjaGVzOiBzdGF0ZS5jb2FjaGVzLm1hcCgoY29hY2gpID0+ICh7IC4uLmNvYWNoIH0pKSxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICAuLi5zdGF0ZS5yZWZyZXNoSGVhbHRoLFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IGNsb25lUmVmcmVzaFJlY292ZXJpZXMoXG4gICAgICAgIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICApLFxuICAgIH0sXG4gICAgcGxheWVyczogWy4uLnBsYXllcnNCeUlkLnZhbHVlcygpXSxcbiAgICBtYXRjaGVzOiByZXRhaW5lZCxcbiAgICBsYXN0VXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgc291cmNlOiBcImNsdWItbG9ja2VyXCIsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoVHJhY2tlclN0YXRlKFxuICBsb2FkU3RhdGU6ICgpID0+IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+LFxuICBsb2FkRmVlZDogKCkgPT4gUHJvbWlzZTxSZWFkb25seUNsdWJMb2NrZXJGZWVkPixcbiAgcGVyc2lzdFN0YXRlOiAoc3RhdGU6IFRyYWNrZXJTdGF0ZSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgYWxlcnRUaHJlc2hvbGQgPSAzLFxuKTogUHJvbWlzZTxUcmFja2VyU3RhdGU+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoYXdhaXQgbG9hZEZlZWQoKSk7XG4gIGNvbnN0IHN0YXRlID0gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gICAgbWVyZ2VDbHViTG9ja2VyRmVlZChhd2FpdCBsb2FkU3RhdGUoKSwgZmVlZCksXG4gICAgYWxlcnRUaHJlc2hvbGQsXG4gICk7XG4gIGF3YWl0IHBlcnNpc3RTdGF0ZShzdGF0ZSk7XG4gIHJldHVybiBzdGF0ZTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxZQUFZO0FBQ25CLE9BQU8sVUFBVTs7O0FDZ0VWLFNBQVMsa0JBQWtCLE9BQTJDO0FBQzNFLFNBQU87QUFBQSxJQUNMLFNBQVMsTUFBTSxRQUFRLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxPQUFPLEVBQUU7QUFBQSxJQUN0RCxTQUFTLE1BQU0sUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxFQUFFO0FBQUEsSUFDcEQsVUFBVSxNQUFNLFdBQVcsRUFBRSxHQUFHLE1BQU0sU0FBUyxJQUFJO0FBQUEsSUFDbkQsU0FBUyxNQUFNLFFBQVEsSUFBSSxpQkFBaUI7QUFBQSxJQUM1QyxlQUFlLE1BQU07QUFBQSxJQUNyQixRQUFRLE1BQU07QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLEdBQUcsTUFBTTtBQUFBLE1BQ1QsbUJBQW1CO0FBQUEsUUFDakIsTUFBTSxjQUFjO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRU8sU0FBUyxtQkFBbUIsT0FB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
