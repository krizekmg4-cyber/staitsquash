// src/lib/club-locker-draws.test.ts
import assert from "node:assert/strict";
import test from "node:test";

// src/lib/club-locker-draws.ts
var CLUB_LOCKER_API = "https://api.ussquash.com/resources";
var ASSUMED_MATCH_MINUTES = 45;
var text = (value) => typeof value === "string" ? value.trim() : "";
var memberId = (value) => typeof value === "number" && value > 0 ? String(value) : typeof value === "string" && /^\d+$/.test(value.trim()) ? value.trim() : "";
function displayName(lastFirst) {
  const [last, first] = lastFirst.split(",").map((part) => part.trim());
  return first ? `${first} ${last}` : last;
}
function parseVenueCodes(value) {
  const codes = /* @__PURE__ */ new Map();
  for (const entry of (value ?? "").split(",")) {
    const [code, name] = entry.split("=").map((part) => part.trim());
    if (code && name) codes.set(code.toUpperCase(), name);
  }
  return codes;
}
function courtAndVenue(match, venueName, venueCodes) {
  const named = text(match.courtName);
  const code = text(match.CourtNumber);
  const prefixed = /^([A-Za-z]+)\s*(\d+)$/.exec(code);
  if (prefixed) {
    const venue = venueCodes.get(prefixed[1].toUpperCase());
    if (venue) return { venue, court: named || `Court ${prefixed[2]}` };
  }
  if (named) return { venue: venueName, court: named };
  if (/^\d+$/.test(code)) return { venue: venueName, court: `Court ${code}` };
  return { venue: venueName, court: code || "Court TBA" };
}
function timeZoneOffsetMinutes(utcMillis, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).formatToParts(new Date(utcMillis)).map((part) => [part.type, part.value])
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((asUtc - utcMillis) / 6e4);
}
var pad = (value) => String(value).padStart(2, "0");
function localStartToIso(matchDate, startTime, timeZone) {
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(matchDate.trim());
  const time = /^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/.exec(startTime.trim());
  if (!date || !time) return null;
  const [month, day, year] = [Number(date[1]), Number(date[2]), Number(date[3])];
  let hour = Number(time[1]) % 12;
  if (time[3].toUpperCase() === "PM") hour += 12;
  const minute = Number(time[2]);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  let offset = timeZoneOffsetMinutes(wallClock, timeZone);
  offset = timeZoneOffsetMinutes(wallClock - offset * 6e4, timeZone);
  const sign = offset < 0 ? "-" : "+";
  const absolute = Math.abs(offset);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
}
function resultFor(match, side) {
  const status = text(match.Status).toUpperCase();
  const winner = text(match.winner).toUpperCase();
  if (winner !== "H" && winner !== "V") return null;
  const won = winner === side;
  if (status === "DF") return won ? "Won by default" : "Lost by default";
  const games = text(match.Score).split(",").map((game) => /^(\d+)-(\d+)$/.exec(game.trim())).filter((game) => game !== null).map((game) => won ? [game[1], game[2]] : [game[2], game[1]]);
  const finished = games.map(([a, b]) => [Number(a), Number(b)]).filter(([a, b]) => Math.max(a, b) >= 9 && Math.abs(a - b) >= 2);
  const ours = finished.filter(([a, b]) => a > b).length;
  const theirs = finished.length - ours;
  const score = games.length ? ` ${ours}\u2013${theirs} (${games.map(([a, b]) => `${a}-${b}`).join(", ")})` : "";
  const retired = status === "RE" ? won ? ", opponent retired" : ", retired" : "";
  return `${won ? "Won" : "Lost"}${score}${retired}`;
}
function drawsToFeed(tournaments, rosterIds, timeZone) {
  const found = [];
  for (const tournament2 of tournaments) {
    const venueCodes = parseVenueCodes(tournament2.venueCodes);
    for (const match of tournament2.matches) {
      if (text(match.SinglesDoubles).toLowerCase() === "d") continue;
      const resultId = memberId(match.ResultID) || text(match.ResultID);
      if (!resultId) continue;
      const startsAt = localStartToIso(
        text(match.matchdate),
        text(match.StartTime),
        timeZone
      );
      if (!startsAt) continue;
      const sides = [
        { side: "H", id: memberId(match.wid1), name: text(match.hplayer1), other: text(match.vplayer1) },
        { side: "V", id: memberId(match.oid1), name: text(match.vplayer1), other: text(match.hplayer1) }
      ];
      const completed = text(match.Status).toUpperCase() !== "S";
      const { venue, court } = courtAndVenue(match, tournament2.venueName, venueCodes);
      for (const { side, id, name, other } of sides) {
        if (!id || !name || !rosterIds.has(id)) continue;
        if (completed && !other) continue;
        found.push({
          externalId: `${tournament2.tournamentId}:${resultId}:${id}`,
          playerId: id,
          playerName: displayName(name),
          opponent: other ? displayName(other) : "To be decided",
          startsAt,
          endsAt: startsAt,
          venue,
          court,
          status: completed ? "completed" : "upcoming",
          result: completed ? resultFor(match, side) : null
        });
      }
    }
  }
  const byPlayer = /* @__PURE__ */ new Map();
  for (const match of found) {
    byPlayer.set(match.playerId, [...byPlayer.get(match.playerId) ?? [], match]);
  }
  const matches = [];
  for (const playerMatches of byPlayer.values()) {
    playerMatches.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
    const kept = playerMatches.filter(
      (match, index) => index === 0 || Date.parse(match.startsAt) > Date.parse(playerMatches[index - 1].startsAt)
    );
    kept.forEach((match, index) => {
      const start = Date.parse(match.startsAt);
      const next = kept[index + 1];
      const end = Math.min(
        start + ASSUMED_MATCH_MINUTES * 6e4,
        next ? Date.parse(next.startsAt) : Infinity
      );
      matches.push({ ...match, endsAt: new Date(end).toISOString() });
    });
  }
  const players = [...new Map(found.map((match) => [match.playerId, match.playerName]))].map(([id, name]) => ({ id, name }));
  return { matches, players };
}
function drawsConfigFromEnv(env = process.env) {
  const list = (value) => (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  const tournamentIds = list(env["CLUB_LOCKER_TOURNAMENT_IDS"]);
  if (tournamentIds.length === 0) return null;
  return {
    tournamentIds,
    rosterIds: new Set(list(env["CLUB_LOCKER_PLAYER_IDS"])),
    timeZone: env["CLUB_LOCKER_TIMEZONE"]?.trim() || "America/New_York"
  };
}
async function getJson(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const response = await fetch(`${CLUB_LOCKER_API}/${path}`, {
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Club Locker returned HTTP ${response.status} for ${path}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
async function loadTournamentDraws(tournamentId, fetchJson) {
  const id = encodeURIComponent(tournamentId);
  const tournament2 = await fetchJson(`tournaments/${id}`);
  let venueName = text(tournament2.Tournament_Name) || `Tournament ${tournamentId}`;
  const mainClub = tournament2.venues?.find((venue) => venue.IsMain) ?? tournament2.venues?.[0];
  const clubId = memberId(mainClub?.ClubId);
  if (clubId) {
    try {
      const club = await fetchJson(`res/clubs/${clubId}`);
      venueName = text(club.name) || venueName;
    } catch {
    }
  }
  const divisions = await fetchJson(`tournaments/${id}/divisionsandsections`);
  if (!Array.isArray(divisions)) {
    throw new Error(`Club Locker tournament ${tournamentId} has no division list`);
  }
  const divisionIds = [
    ...new Set(divisions.map((division) => memberId(division?.divisionId)).filter(Boolean))
  ];
  const sections = await Promise.all(
    divisionIds.map((divisionId) => fetchJson(`tournaments/${id}/division/${divisionId}/draws`))
  );
  const matches = sections.flatMap(
    (draw2) => Array.isArray(draw2) ? draw2.flatMap(
      (section) => Array.isArray(section?.matches) ? section.matches : []
    ) : []
  );
  return {
    tournamentId,
    venueName,
    venueCodes: text(tournament2.Checks_To) || null,
    matches
  };
}
async function fetchClubLockerDraws(config, fetchJson = getJson) {
  if (config.rosterIds.size === 0) {
    throw new Error("Add US Squash player IDs to CLUB_LOCKER_PLAYER_IDS");
  }
  const tournaments = await Promise.all(
    config.tournamentIds.map((id) => loadTournamentDraws(id, fetchJson))
  );
  return drawsToFeed(tournaments, config.rosterIds, config.timeZone);
}

// src/lib/club-locker.ts
function cloneRefreshRecoveries(recoveries) {
  return recoveries.map((recovery) => ({ ...recovery }));
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
  for (const incoming of feed.matches) {
    const overlapsRetainedMatch = locallyRetained.some(
      (retainedMatch) => retainedMatch.playerId === incoming.playerId && Date.parse(incoming.startsAt) < Date.parse(retainedMatch.endsAt) && Date.parse(retainedMatch.startsAt) < Date.parse(incoming.endsAt)
    );
    if (overlapsRetainedMatch) {
      throw new Error(
        `Club Locker returned a match overlapping a retained match for player ID "${incoming.playerId}"`
      );
    }
  }
  const retained = state.matches.filter(
    (match) => match.externalId === null || importedIds.has(match.externalId) || match.status === "completed" || match.report !== null
  ).map((match) => {
    const incoming = match.externalId === null ? void 0 : incomingByExternalId.get(match.externalId);
    const adoptResult = incoming?.status === "completed" && match.status === "upcoming";
    return incoming ? {
      ...cloneTrackerMatch(match),
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      ...adoptResult ? { status: "completed", result: incoming.result ?? null } : {}
    } : cloneTrackerMatch(match);
  });
  for (const incoming of feed.matches) {
    const existing = currentByExternalId.get(incoming.externalId);
    if (existing) continue;
    retained.push({
      id: `club-locker:${Buffer.from(incoming.externalId).toString("base64url")}`,
      externalId: incoming.externalId,
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      coachId: "unassigned",
      status: incoming.status ?? "upcoming",
      result: incoming.result ?? null,
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

// src/lib/club-locker-draws.test.ts
var draw = (overrides = {}) => ({
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
  ...overrides
});
var tournament = (matches, overrides = {}) => ({
  tournamentId: "19515",
  venueName: "Brunswick School",
  venueCodes: null,
  matches,
  ...overrides
});
var roster = /* @__PURE__ */ new Set(["111"]);
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
  assert.equal(resultFor(played, "V"), "Won 3\u20130 (11-2, 11-5, 11-5)");
  assert.equal(resultFor(played, "H"), "Lost 0\u20133 (2-11, 5-11, 5-11)");
  const fiveGames = draw({ Status: "C", winner: "H", Score: "12-10,13-11,5-11,6-11,11-9" });
  assert.equal(resultFor(fiveGames, "H"), "Won 3\u20132 (12-10, 13-11, 5-11, 6-11, 11-9)");
  assert.equal(resultFor(draw({ Status: "DF", winner: "H", Score: "11-0,11-0,11-0" }), "V"), "Lost by default");
  assert.equal(resultFor(draw({ Status: "RE", winner: "H", Score: "11-4,3-2" }), "H"), "Won 1\u20130 (11-4, 3-2), opponent retired");
});
test("keeps only roster singles matches that have a start time", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw(),
        draw({ ResultID: 5002, wid1: 333, oid1: 444, hplayer1: "Other, Kid", vplayer1: "Another, Kid" }),
        draw({ ResultID: 5003, SinglesDoubles: "d" }),
        draw({ ResultID: 5004, StartTime: null, matchdate: "09/27/2026" })
      ])
    ],
    roster,
    "America/New_York"
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
      result: null
    }
  ]);
  assert.deepEqual(feed.players, [{ id: "111", name: "Sam Rivera" }]);
});
test("tracks roster players on the visitor side and shows pending opponents", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw({ wid1: 999, oid1: 111, hplayer1: "Okafor, Theo", vplayer1: "Rivera, Sam" }),
        draw({ ResultID: 5010, StartTime: "02:25 PM", wid1: 111, oid1: -1, hplayer1: "Rivera, Sam", vplayer1: null })
      ])
    ],
    roster,
    "America/New_York"
  );
  assert.deepEqual(
    feed.matches.map((match) => [match.opponent, match.startsAt]),
    [
      ["Theo Okafor", "2026-09-26T11:30:00-04:00"],
      ["To be decided", "2026-09-26T14:25:00-04:00"]
    ]
  );
});
test("marks played matches completed with the result", () => {
  const feed = drawsToFeed(
    [tournament([draw({ Status: "C", winner: "H", Score: "11-7,11-9,11-4" })])],
    roster,
    "America/New_York"
  );
  assert.equal(feed.matches[0]?.status, "completed");
  assert.equal(feed.matches[0]?.result, "Won 3\u20130 (11-7, 11-9, 11-4)");
});
test("shortens estimated finish times so a player's matches never overlap", () => {
  const feed = drawsToFeed(
    [
      tournament([
        draw({ ResultID: 1, StartTime: "08:00 AM" }),
        draw({ ResultID: 2, StartTime: "08:35 AM" }),
        draw({ ResultID: 3, StartTime: "08:35 AM" })
      ])
    ],
    roster,
    "America/New_York"
  );
  assert.deepEqual(
    feed.matches.map((match) => [match.externalId, match.endsAt]),
    [
      ["19515:1:111", "2026-09-26T12:35:00.000Z"],
      ["19515:2:111", "2026-09-26T13:20:00.000Z"]
    ]
  );
  assert.doesNotThrow(() => parseClubLockerFeed(feed));
});
test("tracks two roster players meeting each other as two cards", () => {
  const feed = drawsToFeed([tournament([draw()])], /* @__PURE__ */ new Set(["111", "222"]), "America/New_York");
  assert.deepEqual(
    feed.matches.map((match) => [match.playerId, match.opponent]).sort(),
    [
      ["111", "Theo Okafor"],
      ["222", "Sam Rivera"]
    ]
  );
});
test("reads tournaments, roster and timezone from the environment", () => {
  assert.equal(drawsConfigFromEnv({}), null);
  const config = drawsConfigFromEnv({
    CLUB_LOCKER_TOURNAMENT_IDS: "19515, 19516",
    CLUB_LOCKER_PLAYER_IDS: "111,222 ,"
  });
  assert.deepEqual(config?.tournamentIds, ["19515", "19516"]);
  assert.deepEqual([...config?.rosterIds ?? []], ["111", "222"]);
  assert.equal(config?.timeZone, "America/New_York");
});
test("loads every division of a tournament through the public endpoints", async () => {
  const requested = [];
  const responses = {
    "tournaments/19515": {
      Tournament_Name: "2026 Brunswick School Junior Silver",
      Checks_To: null,
      venues: [{ ClubId: 1639, IsMain: true }]
    },
    "res/clubs/1639": { name: "Brunswick School" },
    "tournaments/19515/divisionsandsections": [
      { divisionId: 3, sections: [] },
      { divisionId: 4, sections: [] }
    ],
    "tournaments/19515/division/3/draws": [{ matches: [draw()] }],
    "tournaments/19515/division/4/draws": [
      { matches: [draw({ ResultID: 6001, StartTime: "03:00 PM", Status: "C", winner: "V", Score: "11-9,11-9,11-9" })] }
    ]
  };
  const feed = await fetchClubLockerDraws(
    { tournamentIds: ["19515"], rosterIds: roster, timeZone: "America/New_York" },
    async (path) => {
      requested.push(path);
      if (!(path in responses)) throw new Error(`Unexpected ${path}`);
      return responses[path];
    }
  );
  assert.equal(feed.matches.length, 2);
  assert.equal(feed.matches[0]?.venue, "Brunswick School");
  assert.equal(feed.matches[1]?.result, "Lost 0\u20133 (9-11, 9-11, 9-11)");
  assert.ok(requested.includes("tournaments/19515/division/4/draws"));
});
test("refuses to load draws without a roster", async () => {
  await assert.rejects(
    fetchClubLockerDraws(
      { tournamentIds: ["19515"], rosterIds: /* @__PURE__ */ new Set(), timeZone: "America/New_York" },
      async () => ({})
    ),
    /CLUB_LOCKER_PLAYER_IDS/
  );
});
var baseState = (matches) => ({
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
    recoveryClaim: null
  }
});
test("a result recorded in Club Locker closes out an open match", () => {
  const upcoming = drawsToFeed([tournament([draw()])], roster, "America/New_York");
  const merged = mergeClubLockerFeed(baseState([]), parseClubLockerFeed(upcoming));
  const assigned = {
    ...merged,
    matches: merged.matches.map((match) => ({ ...match, coachId: "alex" }))
  };
  const played = drawsToFeed(
    [tournament([draw({ Status: "C", winner: "H", Score: "11-5,11-6,11-7" })])],
    roster,
    "America/New_York"
  );
  const closed = mergeClubLockerFeed(assigned, parseClubLockerFeed(played));
  assert.equal(closed.matches[0]?.status, "completed");
  assert.equal(closed.matches[0]?.result, "Won 3\u20130 (11-5, 11-6, 11-7)");
  assert.equal(closed.matches[0]?.coachId, "alex");
});
test("the first Club Locker import replaces the placeholder sample draw", () => {
  const sampleMatch = {
    id: "match-1",
    externalId: null,
    playerId: "cameron-stait",
    opponent: "Ethan Cole",
    startsAt: "2026-09-16T14:30:00-04:00",
    endsAt: "2026-09-16T15:15:00-04:00",
    venue: "Arlen Specter US Squash Center",
    court: "Court 6",
    coachId: "alex",
    status: "upcoming",
    result: null,
    report: null
  };
  const sample = {
    ...baseState([sampleMatch]),
    players: [{ id: "cameron-stait", name: "Cameron Stait" }],
    source: "sample"
  };
  const merged = mergeClubLockerFeed(
    sample,
    parseClubLockerFeed(drawsToFeed([tournament([draw()])], roster, "America/New_York"))
  );
  assert.deepEqual(merged.players.map((player) => player.id), ["111"]);
  assert.deepEqual(merged.matches.map((match) => match.externalId), ["19515:5001:111"]);
});
test("a result staff already entered is never overwritten by Club Locker", () => {
  const played = parseClubLockerFeed(
    drawsToFeed(
      [tournament([draw({ Status: "C", winner: "H", Score: "11-5,11-6,11-7" })])],
      roster,
      "America/New_York"
    )
  );
  const existing = mergeClubLockerFeed(baseState([]), played);
  const staffEdited = {
    ...existing,
    matches: existing.matches.map((match) => ({ ...match, result: "Won 3\u20130, great focus" }))
  };
  const merged = mergeClubLockerFeed(staffEdited, played);
  assert.equal(merged.matches[0]?.result, "Won 3\u20130, great focus");
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci1kcmF3cy50ZXN0LnRzIiwgIi4uLy4uL3NyYy9saWIvY2x1Yi1sb2NrZXItZHJhd3MudHMiLCAiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGFzc2VydCBmcm9tIFwibm9kZTphc3NlcnQvc3RyaWN0XCI7XG5pbXBvcnQgdGVzdCBmcm9tIFwibm9kZTp0ZXN0XCI7XG5pbXBvcnQge1xuICBjb3VydEFuZFZlbnVlLFxuICBkaXNwbGF5TmFtZSxcbiAgZHJhd3NDb25maWdGcm9tRW52LFxuICBkcmF3c1RvRmVlZCxcbiAgZmV0Y2hDbHViTG9ja2VyRHJhd3MsXG4gIGxvY2FsU3RhcnRUb0lzbyxcbiAgcGFyc2VWZW51ZUNvZGVzLFxuICByZXN1bHRGb3IsXG4gIHR5cGUgRHJhd01hdGNoLFxuICB0eXBlIFRvdXJuYW1lbnREcmF3cyxcbn0gZnJvbSBcIi4vY2x1Yi1sb2NrZXItZHJhd3MudHNcIjtcbmltcG9ydCB7IG1lcmdlQ2x1YkxvY2tlckZlZWQsIHBhcnNlQ2x1YkxvY2tlckZlZWQsIHR5cGUgVHJhY2tlclN0YXRlIH0gZnJvbSBcIi4vY2x1Yi1sb2NrZXIudHNcIjtcblxuLy8gU2hhcGVzIG1pcnJvciBhcGkudXNzcXVhc2guY29tIGRyYXcgcmVjb3JkczsgcGxheWVycyBhcmUgbWFkZSB1cC5cbmNvbnN0IGRyYXcgPSAob3ZlcnJpZGVzOiBEcmF3TWF0Y2ggPSB7fSk6IERyYXdNYXRjaCA9PiAoe1xuICBSZXN1bHRJRDogNTAwMSxcbiAgU3RhdHVzOiBcIlNcIixcbiAgU2luZ2xlc0RvdWJsZXM6IFwic1wiLFxuICBocGxheWVyMTogXCJSaXZlcmEsIFNhbSBcIixcbiAgdnBsYXllcjE6IFwiT2thZm9yLCBUaGVvIFwiLFxuICB3aWQxOiAxMTEsXG4gIG9pZDE6IDIyMixcbiAgbWF0Y2hkYXRlOiBcIjA5LzI2LzIwMjZcIixcbiAgU3RhcnRUaW1lOiBcIjExOjMwIEFNXCIsXG4gIENvdXJ0TnVtYmVyOiBcIjRcIixcbiAgY291cnROYW1lOiBudWxsLFxuICB3aW5uZXI6IFwiSFwiLFxuICBTY29yZTogXCJcIixcbiAgLi4ub3ZlcnJpZGVzLFxufSk7XG5cbmNvbnN0IHRvdXJuYW1lbnQgPSAobWF0Y2hlczogRHJhd01hdGNoW10sIG92ZXJyaWRlczogUGFydGlhbDxUb3VybmFtZW50RHJhd3M+ID0ge30pOiBUb3VybmFtZW50RHJhd3MgPT4gKHtcbiAgdG91cm5hbWVudElkOiBcIjE5NTE1XCIsXG4gIHZlbnVlTmFtZTogXCJCcnVuc3dpY2sgU2Nob29sXCIsXG4gIHZlbnVlQ29kZXM6IG51bGwsXG4gIG1hdGNoZXMsXG4gIC4uLm92ZXJyaWRlcyxcbn0pO1xuXG5jb25zdCByb3N0ZXIgPSBuZXcgU2V0KFtcIjExMVwiXSk7XG5cbnRlc3QoXCJmb3JtYXRzIENsdWIgTG9ja2VyIGxhc3QtZmlyc3QgbmFtZXNcIiwgKCkgPT4ge1xuICBhc3NlcnQuZXF1YWwoZGlzcGxheU5hbWUoXCJSaXZlcmEsIFNhbSBcIiksIFwiU2FtIFJpdmVyYVwiKTtcbiAgYXNzZXJ0LmVxdWFsKGRpc3BsYXlOYW1lKFwiTWFkb25uYVwiKSwgXCJNYWRvbm5hXCIpO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3YWxsLWNsb2NrIHN0YXJ0IHRpbWVzIGludG8gdGhlIHRvdXJuYW1lbnQgdGltZXpvbmVcIiwgKCkgPT4ge1xuICBhc3NlcnQuZXF1YWwobG9jYWxTdGFydFRvSXNvKFwiMDkvMjYvMjAyNlwiLCBcIjExOjMwIEFNXCIsIFwiQW1lcmljYS9OZXdfWW9ya1wiKSwgXCIyMDI2LTA5LTI2VDExOjMwOjAwLTA0OjAwXCIpO1xuICBhc3NlcnQuZXF1YWwobG9jYWxTdGFydFRvSXNvKFwiMTIvMjAvMjAyNVwiLCBcIjA4OjAwIEFNXCIsIFwiQW1lcmljYS9OZXdfWW9ya1wiKSwgXCIyMDI1LTEyLTIwVDA4OjAwOjAwLTA1OjAwXCIpO1xuICBhc3NlcnQuZXF1YWwobG9jYWxTdGFydFRvSXNvKFwiMTIvMjAvMjAyNVwiLCBcIjEyOjA1IFBNXCIsIFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiKSwgXCIyMDI1LTEyLTIwVDEyOjA1OjAwLTA4OjAwXCIpO1xuICBhc3NlcnQuZXF1YWwobG9jYWxTdGFydFRvSXNvKFwiMTIvMjAvMjAyNVwiLCBcIjEyOjQwIEFNXCIsIFwiQW1lcmljYS9OZXdfWW9ya1wiKSwgXCIyMDI1LTEyLTIwVDAwOjQwOjAwLTA1OjAwXCIpO1xuICBhc3NlcnQuZXF1YWwobG9jYWxTdGFydFRvSXNvKFwiXCIsIFwiMTE6MzAgQU1cIiwgXCJBbWVyaWNhL05ld19Zb3JrXCIpLCBudWxsKTtcbiAgYXNzZXJ0LmVxdWFsKGxvY2FsU3RhcnRUb0lzbyhcIjA5LzI2LzIwMjZcIiwgXCJcIiwgXCJBbWVyaWNhL05ld19Zb3JrXCIpLCBudWxsKTtcbn0pO1xuXG50ZXN0KFwibWFwcyBwcmVmaXhlZCBjb3VydCBjb2RlcyB0byB0aGUgdmVudWUgbGlzdGVkIG9uIHRoZSB0b3VybmFtZW50XCIsICgpID0+IHtcbiAgY29uc3QgY29kZXMgPSBwYXJzZVZlbnVlQ29kZXMoXCJBU0M9U3BlY3RlciBDZW50ZXIsICAgUEVOPVVuaXZlcnNpdHkgb2YgUGVubnN5bHZhbmlhLCBWQVI9U0NIKFZhcmUpXCIpO1xuICBhc3NlcnQuZGVlcEVxdWFsKGNvdXJ0QW5kVmVudWUoZHJhdyh7IENvdXJ0TnVtYmVyOiBcIlZBUjFcIiB9KSwgXCJNYWluXCIsIGNvZGVzKSwgeyB2ZW51ZTogXCJTQ0goVmFyZSlcIiwgY291cnQ6IFwiQ291cnQgMVwiIH0pO1xuICBhc3NlcnQuZGVlcEVxdWFsKGNvdXJ0QW5kVmVudWUoZHJhdyh7IENvdXJ0TnVtYmVyOiBcIlBFTjEyXCIgfSksIFwiTWFpblwiLCBjb2RlcyksIHsgdmVudWU6IFwiVW5pdmVyc2l0eSBvZiBQZW5uc3lsdmFuaWFcIiwgY291cnQ6IFwiQ291cnQgMTJcIiB9KTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChjb3VydEFuZFZlbnVlKGRyYXcoeyBDb3VydE51bWJlcjogXCI0XCIgfSksIFwiTWFpblwiLCBjb2RlcyksIHsgdmVudWU6IFwiTWFpblwiLCBjb3VydDogXCJDb3VydCA0XCIgfSk7XG4gIGFzc2VydC5kZWVwRXF1YWwoY291cnRBbmRWZW51ZShkcmF3KHsgQ291cnROdW1iZXI6IFwiNFwiLCBjb3VydE5hbWU6IFwiR2xhc3MgQ291cnRcIiB9KSwgXCJNYWluXCIsIGNvZGVzKSwgeyB2ZW51ZTogXCJNYWluXCIsIGNvdXJ0OiBcIkdsYXNzIENvdXJ0XCIgfSk7XG4gIGFzc2VydC5kZWVwRXF1YWwoY291cnRBbmRWZW51ZShkcmF3KHsgQ291cnROdW1iZXI6IG51bGwgfSksIFwiTWFpblwiLCBjb2RlcyksIHsgdmVudWU6IFwiTWFpblwiLCBjb3VydDogXCJDb3VydCBUQkFcIiB9KTtcbn0pO1xuXG50ZXN0KFwid3JpdGVzIHJlc3VsdHMgZnJvbSB0aGUgdHJhY2tlZCBwbGF5ZXIncyBzaWRlXCIsICgpID0+IHtcbiAgY29uc3QgcGxheWVkID0gZHJhdyh7IFN0YXR1czogXCJDXCIsIHdpbm5lcjogXCJWXCIsIFNjb3JlOiBcIjExLTIsMTEtNSwxMS01XCIgfSk7XG4gIGFzc2VydC5lcXVhbChyZXN1bHRGb3IocGxheWVkLCBcIlZcIiksIFwiV29uIDNcdTIwMTMwICgxMS0yLCAxMS01LCAxMS01KVwiKTtcbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdEZvcihwbGF5ZWQsIFwiSFwiKSwgXCJMb3N0IDBcdTIwMTMzICgyLTExLCA1LTExLCA1LTExKVwiKTtcblxuICBjb25zdCBmaXZlR2FtZXMgPSBkcmF3KHsgU3RhdHVzOiBcIkNcIiwgd2lubmVyOiBcIkhcIiwgU2NvcmU6IFwiMTItMTAsMTMtMTEsNS0xMSw2LTExLDExLTlcIiB9KTtcbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdEZvcihmaXZlR2FtZXMsIFwiSFwiKSwgXCJXb24gM1x1MjAxMzIgKDEyLTEwLCAxMy0xMSwgNS0xMSwgNi0xMSwgMTEtOSlcIik7XG5cbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdEZvcihkcmF3KHsgU3RhdHVzOiBcIkRGXCIsIHdpbm5lcjogXCJIXCIsIFNjb3JlOiBcIjExLTAsMTEtMCwxMS0wXCIgfSksIFwiVlwiKSwgXCJMb3N0IGJ5IGRlZmF1bHRcIik7XG4gIGFzc2VydC5lcXVhbChyZXN1bHRGb3IoZHJhdyh7IFN0YXR1czogXCJSRVwiLCB3aW5uZXI6IFwiSFwiLCBTY29yZTogXCIxMS00LDMtMlwiIH0pLCBcIkhcIiksIFwiV29uIDFcdTIwMTMwICgxMS00LCAzLTIpLCBvcHBvbmVudCByZXRpcmVkXCIpO1xufSk7XG5cbnRlc3QoXCJrZWVwcyBvbmx5IHJvc3RlciBzaW5nbGVzIG1hdGNoZXMgdGhhdCBoYXZlIGEgc3RhcnQgdGltZVwiLCAoKSA9PiB7XG4gIGNvbnN0IGZlZWQgPSBkcmF3c1RvRmVlZChcbiAgICBbXG4gICAgICB0b3VybmFtZW50KFtcbiAgICAgICAgZHJhdygpLFxuICAgICAgICBkcmF3KHsgUmVzdWx0SUQ6IDUwMDIsIHdpZDE6IDMzMywgb2lkMTogNDQ0LCBocGxheWVyMTogXCJPdGhlciwgS2lkXCIsIHZwbGF5ZXIxOiBcIkFub3RoZXIsIEtpZFwiIH0pLFxuICAgICAgICBkcmF3KHsgUmVzdWx0SUQ6IDUwMDMsIFNpbmdsZXNEb3VibGVzOiBcImRcIiB9KSxcbiAgICAgICAgZHJhdyh7IFJlc3VsdElEOiA1MDA0LCBTdGFydFRpbWU6IG51bGwsIG1hdGNoZGF0ZTogXCIwOS8yNy8yMDI2XCIgfSksXG4gICAgICBdKSxcbiAgICBdLFxuICAgIHJvc3RlcixcbiAgICBcIkFtZXJpY2EvTmV3X1lvcmtcIixcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKGZlZWQubWF0Y2hlcywgW1xuICAgIHtcbiAgICAgIGV4dGVybmFsSWQ6IFwiMTk1MTU6NTAwMToxMTFcIixcbiAgICAgIHBsYXllcklkOiBcIjExMVwiLFxuICAgICAgcGxheWVyTmFtZTogXCJTYW0gUml2ZXJhXCIsXG4gICAgICBvcHBvbmVudDogXCJUaGVvIE9rYWZvclwiLFxuICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0yNlQxMTozMDowMC0wNDowMFwiLFxuICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMjZUMTY6MTU6MDAuMDAwWlwiLFxuICAgICAgdmVudWU6IFwiQnJ1bnN3aWNrIFNjaG9vbFwiLFxuICAgICAgY291cnQ6IFwiQ291cnQgNFwiLFxuICAgICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgICByZXN1bHQ6IG51bGwsXG4gICAgfSxcbiAgXSk7XG4gIGFzc2VydC5kZWVwRXF1YWwoZmVlZC5wbGF5ZXJzLCBbeyBpZDogXCIxMTFcIiwgbmFtZTogXCJTYW0gUml2ZXJhXCIgfV0pO1xufSk7XG5cbnRlc3QoXCJ0cmFja3Mgcm9zdGVyIHBsYXllcnMgb24gdGhlIHZpc2l0b3Igc2lkZSBhbmQgc2hvd3MgcGVuZGluZyBvcHBvbmVudHNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gZHJhd3NUb0ZlZWQoXG4gICAgW1xuICAgICAgdG91cm5hbWVudChbXG4gICAgICAgIGRyYXcoeyB3aWQxOiA5OTksIG9pZDE6IDExMSwgaHBsYXllcjE6IFwiT2thZm9yLCBUaGVvXCIsIHZwbGF5ZXIxOiBcIlJpdmVyYSwgU2FtXCIgfSksXG4gICAgICAgIGRyYXcoeyBSZXN1bHRJRDogNTAxMCwgU3RhcnRUaW1lOiBcIjAyOjI1IFBNXCIsIHdpZDE6IDExMSwgb2lkMTogLTEsIGhwbGF5ZXIxOiBcIlJpdmVyYSwgU2FtXCIsIHZwbGF5ZXIxOiBudWxsIH0pLFxuICAgICAgXSksXG4gICAgXSxcbiAgICByb3N0ZXIsXG4gICAgXCJBbWVyaWNhL05ld19Zb3JrXCIsXG4gICk7XG5cbiAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICBmZWVkLm1hdGNoZXMubWFwKChtYXRjaCkgPT4gW21hdGNoLm9wcG9uZW50LCBtYXRjaC5zdGFydHNBdF0pLFxuICAgIFtcbiAgICAgIFtcIlRoZW8gT2thZm9yXCIsIFwiMjAyNi0wOS0yNlQxMTozMDowMC0wNDowMFwiXSxcbiAgICAgIFtcIlRvIGJlIGRlY2lkZWRcIiwgXCIyMDI2LTA5LTI2VDE0OjI1OjAwLTA0OjAwXCJdLFxuICAgIF0sXG4gICk7XG59KTtcblxudGVzdChcIm1hcmtzIHBsYXllZCBtYXRjaGVzIGNvbXBsZXRlZCB3aXRoIHRoZSByZXN1bHRcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gZHJhd3NUb0ZlZWQoXG4gICAgW3RvdXJuYW1lbnQoW2RyYXcoeyBTdGF0dXM6IFwiQ1wiLCB3aW5uZXI6IFwiSFwiLCBTY29yZTogXCIxMS03LDExLTksMTEtNFwiIH0pXSldLFxuICAgIHJvc3RlcixcbiAgICBcIkFtZXJpY2EvTmV3X1lvcmtcIixcbiAgKTtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlc1swXT8uc3RhdHVzLCBcImNvbXBsZXRlZFwiKTtcbiAgYXNzZXJ0LmVxdWFsKGZlZWQubWF0Y2hlc1swXT8ucmVzdWx0LCBcIldvbiAzXHUyMDEzMCAoMTEtNywgMTEtOSwgMTEtNClcIik7XG59KTtcblxudGVzdChcInNob3J0ZW5zIGVzdGltYXRlZCBmaW5pc2ggdGltZXMgc28gYSBwbGF5ZXIncyBtYXRjaGVzIG5ldmVyIG92ZXJsYXBcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gZHJhd3NUb0ZlZWQoXG4gICAgW1xuICAgICAgdG91cm5hbWVudChbXG4gICAgICAgIGRyYXcoeyBSZXN1bHRJRDogMSwgU3RhcnRUaW1lOiBcIjA4OjAwIEFNXCIgfSksXG4gICAgICAgIGRyYXcoeyBSZXN1bHRJRDogMiwgU3RhcnRUaW1lOiBcIjA4OjM1IEFNXCIgfSksXG4gICAgICAgIGRyYXcoeyBSZXN1bHRJRDogMywgU3RhcnRUaW1lOiBcIjA4OjM1IEFNXCIgfSksXG4gICAgICBdKSxcbiAgICBdLFxuICAgIHJvc3RlcixcbiAgICBcIkFtZXJpY2EvTmV3X1lvcmtcIixcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIGZlZWQubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBbbWF0Y2guZXh0ZXJuYWxJZCwgbWF0Y2guZW5kc0F0XSksXG4gICAgW1xuICAgICAgW1wiMTk1MTU6MToxMTFcIiwgXCIyMDI2LTA5LTI2VDEyOjM1OjAwLjAwMFpcIl0sXG4gICAgICBbXCIxOTUxNToyOjExMVwiLCBcIjIwMjYtMDktMjZUMTM6MjA6MDAuMDAwWlwiXSxcbiAgICBdLFxuICApO1xuICBhc3NlcnQuZG9lc05vdFRocm93KCgpID0+IHBhcnNlQ2x1YkxvY2tlckZlZWQoZmVlZCkpO1xufSk7XG5cbnRlc3QoXCJ0cmFja3MgdHdvIHJvc3RlciBwbGF5ZXJzIG1lZXRpbmcgZWFjaCBvdGhlciBhcyB0d28gY2FyZHNcIiwgKCkgPT4ge1xuICBjb25zdCBmZWVkID0gZHJhd3NUb0ZlZWQoW3RvdXJuYW1lbnQoW2RyYXcoKV0pXSwgbmV3IFNldChbXCIxMTFcIiwgXCIyMjJcIl0pLCBcIkFtZXJpY2EvTmV3X1lvcmtcIik7XG4gIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IFttYXRjaC5wbGF5ZXJJZCwgbWF0Y2gub3Bwb25lbnRdKS5zb3J0KCksXG4gICAgW1xuICAgICAgW1wiMTExXCIsIFwiVGhlbyBPa2Fmb3JcIl0sXG4gICAgICBbXCIyMjJcIiwgXCJTYW0gUml2ZXJhXCJdLFxuICAgIF0sXG4gICk7XG59KTtcblxudGVzdChcInJlYWRzIHRvdXJuYW1lbnRzLCByb3N0ZXIgYW5kIHRpbWV6b25lIGZyb20gdGhlIGVudmlyb25tZW50XCIsICgpID0+IHtcbiAgYXNzZXJ0LmVxdWFsKGRyYXdzQ29uZmlnRnJvbUVudih7fSksIG51bGwpO1xuICBjb25zdCBjb25maWcgPSBkcmF3c0NvbmZpZ0Zyb21FbnYoe1xuICAgIENMVUJfTE9DS0VSX1RPVVJOQU1FTlRfSURTOiBcIjE5NTE1LCAxOTUxNlwiLFxuICAgIENMVUJfTE9DS0VSX1BMQVlFUl9JRFM6IFwiMTExLDIyMiAsXCIsXG4gIH0pO1xuICBhc3NlcnQuZGVlcEVxdWFsKGNvbmZpZz8udG91cm5hbWVudElkcywgW1wiMTk1MTVcIiwgXCIxOTUxNlwiXSk7XG4gIGFzc2VydC5kZWVwRXF1YWwoWy4uLihjb25maWc/LnJvc3RlcklkcyA/PyBbXSldLCBbXCIxMTFcIiwgXCIyMjJcIl0pO1xuICBhc3NlcnQuZXF1YWwoY29uZmlnPy50aW1lWm9uZSwgXCJBbWVyaWNhL05ld19Zb3JrXCIpO1xufSk7XG5cbnRlc3QoXCJsb2FkcyBldmVyeSBkaXZpc2lvbiBvZiBhIHRvdXJuYW1lbnQgdGhyb3VnaCB0aGUgcHVibGljIGVuZHBvaW50c1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RlZDogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgcmVzcG9uc2VzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICBcInRvdXJuYW1lbnRzLzE5NTE1XCI6IHtcbiAgICAgIFRvdXJuYW1lbnRfTmFtZTogXCIyMDI2IEJydW5zd2ljayBTY2hvb2wgSnVuaW9yIFNpbHZlclwiLFxuICAgICAgQ2hlY2tzX1RvOiBudWxsLFxuICAgICAgdmVudWVzOiBbeyBDbHViSWQ6IDE2MzksIElzTWFpbjogdHJ1ZSB9XSxcbiAgICB9LFxuICAgIFwicmVzL2NsdWJzLzE2MzlcIjogeyBuYW1lOiBcIkJydW5zd2ljayBTY2hvb2xcIiB9LFxuICAgIFwidG91cm5hbWVudHMvMTk1MTUvZGl2aXNpb25zYW5kc2VjdGlvbnNcIjogW1xuICAgICAgeyBkaXZpc2lvbklkOiAzLCBzZWN0aW9uczogW10gfSxcbiAgICAgIHsgZGl2aXNpb25JZDogNCwgc2VjdGlvbnM6IFtdIH0sXG4gICAgXSxcbiAgICBcInRvdXJuYW1lbnRzLzE5NTE1L2RpdmlzaW9uLzMvZHJhd3NcIjogW3sgbWF0Y2hlczogW2RyYXcoKV0gfV0sXG4gICAgXCJ0b3VybmFtZW50cy8xOTUxNS9kaXZpc2lvbi80L2RyYXdzXCI6IFtcbiAgICAgIHsgbWF0Y2hlczogW2RyYXcoeyBSZXN1bHRJRDogNjAwMSwgU3RhcnRUaW1lOiBcIjAzOjAwIFBNXCIsIFN0YXR1czogXCJDXCIsIHdpbm5lcjogXCJWXCIsIFNjb3JlOiBcIjExLTksMTEtOSwxMS05XCIgfSldIH0sXG4gICAgXSxcbiAgfTtcblxuICBjb25zdCBmZWVkID0gYXdhaXQgZmV0Y2hDbHViTG9ja2VyRHJhd3MoXG4gICAgeyB0b3VybmFtZW50SWRzOiBbXCIxOTUxNVwiXSwgcm9zdGVySWRzOiByb3N0ZXIsIHRpbWVab25lOiBcIkFtZXJpY2EvTmV3X1lvcmtcIiB9LFxuICAgIGFzeW5jIChwYXRoKSA9PiB7XG4gICAgICByZXF1ZXN0ZWQucHVzaChwYXRoKTtcbiAgICAgIGlmICghKHBhdGggaW4gcmVzcG9uc2VzKSkgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkICR7cGF0aH1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZXNbcGF0aF07XG4gICAgfSxcbiAgKTtcblxuICBhc3NlcnQuZXF1YWwoZmVlZC5tYXRjaGVzLmxlbmd0aCwgMik7XG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXNbMF0/LnZlbnVlLCBcIkJydW5zd2ljayBTY2hvb2xcIik7XG4gIGFzc2VydC5lcXVhbChmZWVkLm1hdGNoZXNbMV0/LnJlc3VsdCwgXCJMb3N0IDBcdTIwMTMzICg5LTExLCA5LTExLCA5LTExKVwiKTtcbiAgYXNzZXJ0Lm9rKHJlcXVlc3RlZC5pbmNsdWRlcyhcInRvdXJuYW1lbnRzLzE5NTE1L2RpdmlzaW9uLzQvZHJhd3NcIikpO1xufSk7XG5cbnRlc3QoXCJyZWZ1c2VzIHRvIGxvYWQgZHJhd3Mgd2l0aG91dCBhIHJvc3RlclwiLCBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGFzc2VydC5yZWplY3RzKFxuICAgIGZldGNoQ2x1YkxvY2tlckRyYXdzKFxuICAgICAgeyB0b3VybmFtZW50SWRzOiBbXCIxOTUxNVwiXSwgcm9zdGVySWRzOiBuZXcgU2V0KCksIHRpbWVab25lOiBcIkFtZXJpY2EvTmV3X1lvcmtcIiB9LFxuICAgICAgYXN5bmMgKCkgPT4gKHt9KSxcbiAgICApLFxuICAgIC9DTFVCX0xPQ0tFUl9QTEFZRVJfSURTLyxcbiAgKTtcbn0pO1xuXG5jb25zdCBiYXNlU3RhdGUgPSAobWF0Y2hlczogVHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXSk6IFRyYWNrZXJTdGF0ZSA9PiAoe1xuICBwbGF5ZXJzOiBbeyBpZDogXCIxMTFcIiwgbmFtZTogXCJTYW0gUml2ZXJhXCIgfV0sXG4gIGNvYWNoZXM6IFt7IGlkOiBcInVuYXNzaWduZWRcIiwgbmFtZTogXCJVbmFzc2lnbmVkXCIgfV0sXG4gIG1hdGNoZXMsXG4gIGxhc3RVcGRhdGVkQXQ6IFwiMjAyNi0wOS0yNlQwODowMDowMC0wNDowMFwiLFxuICBzb3VyY2U6IFwiY2x1Yi1sb2NrZXJcIixcbiAgcmVmcmVzaEhlYWx0aDoge1xuICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IDAsXG4gICAgYWxlcnRUaHJlc2hvbGQ6IDMsXG4gICAgZmlyc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgbGFzdEZhaWx1cmVBdDogbnVsbCxcbiAgICBhbGVydFNlbnRBdDogbnVsbCxcbiAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IG51bGwsXG4gICAgcGVuZGluZ1JlY292ZXJpZXM6IFtdLFxuICAgIHJlY292ZXJ5Q2xhaW06IG51bGwsXG4gIH0sXG59KTtcblxudGVzdChcImEgcmVzdWx0IHJlY29yZGVkIGluIENsdWIgTG9ja2VyIGNsb3NlcyBvdXQgYW4gb3BlbiBtYXRjaFwiLCAoKSA9PiB7XG4gIGNvbnN0IHVwY29taW5nID0gZHJhd3NUb0ZlZWQoW3RvdXJuYW1lbnQoW2RyYXcoKV0pXSwgcm9zdGVyLCBcIkFtZXJpY2EvTmV3X1lvcmtcIik7XG4gIGNvbnN0IG1lcmdlZCA9IG1lcmdlQ2x1YkxvY2tlckZlZWQoYmFzZVN0YXRlKFtdKSwgcGFyc2VDbHViTG9ja2VyRmVlZCh1cGNvbWluZykpO1xuICBjb25zdCBhc3NpZ25lZCA9IHtcbiAgICAuLi5tZXJnZWQsXG4gICAgbWF0Y2hlczogbWVyZ2VkLm1hdGNoZXMubWFwKChtYXRjaCkgPT4gKHsgLi4ubWF0Y2gsIGNvYWNoSWQ6IFwiYWxleFwiIH0pKSxcbiAgfTtcblxuICBjb25zdCBwbGF5ZWQgPSBkcmF3c1RvRmVlZChcbiAgICBbdG91cm5hbWVudChbZHJhdyh7IFN0YXR1czogXCJDXCIsIHdpbm5lcjogXCJIXCIsIFNjb3JlOiBcIjExLTUsMTEtNiwxMS03XCIgfSldKV0sXG4gICAgcm9zdGVyLFxuICAgIFwiQW1lcmljYS9OZXdfWW9ya1wiLFxuICApO1xuICBjb25zdCBjbG9zZWQgPSBtZXJnZUNsdWJMb2NrZXJGZWVkKGFzc2lnbmVkLCBwYXJzZUNsdWJMb2NrZXJGZWVkKHBsYXllZCkpO1xuXG4gIGFzc2VydC5lcXVhbChjbG9zZWQubWF0Y2hlc1swXT8uc3RhdHVzLCBcImNvbXBsZXRlZFwiKTtcbiAgYXNzZXJ0LmVxdWFsKGNsb3NlZC5tYXRjaGVzWzBdPy5yZXN1bHQsIFwiV29uIDNcdTIwMTMwICgxMS01LCAxMS02LCAxMS03KVwiKTtcbiAgYXNzZXJ0LmVxdWFsKGNsb3NlZC5tYXRjaGVzWzBdPy5jb2FjaElkLCBcImFsZXhcIik7XG59KTtcblxudGVzdChcInRoZSBmaXJzdCBDbHViIExvY2tlciBpbXBvcnQgcmVwbGFjZXMgdGhlIHBsYWNlaG9sZGVyIHNhbXBsZSBkcmF3XCIsICgpID0+IHtcbiAgY29uc3Qgc2FtcGxlTWF0Y2ggPSB7XG4gICAgaWQ6IFwibWF0Y2gtMVwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwiY2FtZXJvbi1zdGFpdFwiLFxuICAgIG9wcG9uZW50OiBcIkV0aGFuIENvbGVcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDE0OjMwOjAwLTA0OjAwXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICB2ZW51ZTogXCJBcmxlbiBTcGVjdGVyIFVTIFNxdWFzaCBDZW50ZXJcIixcbiAgICBjb3VydDogXCJDb3VydCA2XCIsXG4gICAgY29hY2hJZDogXCJhbGV4XCIsXG4gICAgc3RhdHVzOiBcInVwY29taW5nXCIgYXMgY29uc3QsXG4gICAgcmVzdWx0OiBudWxsLFxuICAgIHJlcG9ydDogbnVsbCxcbiAgfTtcbiAgY29uc3Qgc2FtcGxlID0ge1xuICAgIC4uLmJhc2VTdGF0ZShbc2FtcGxlTWF0Y2hdKSxcbiAgICBwbGF5ZXJzOiBbeyBpZDogXCJjYW1lcm9uLXN0YWl0XCIsIG5hbWU6IFwiQ2FtZXJvbiBTdGFpdFwiIH1dLFxuICAgIHNvdXJjZTogXCJzYW1wbGVcIiBhcyBjb25zdCxcbiAgfTtcblxuICBjb25zdCBtZXJnZWQgPSBtZXJnZUNsdWJMb2NrZXJGZWVkKFxuICAgIHNhbXBsZSxcbiAgICBwYXJzZUNsdWJMb2NrZXJGZWVkKGRyYXdzVG9GZWVkKFt0b3VybmFtZW50KFtkcmF3KCldKV0sIHJvc3RlciwgXCJBbWVyaWNhL05ld19Zb3JrXCIpKSxcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKG1lcmdlZC5wbGF5ZXJzLm1hcCgocGxheWVyKSA9PiBwbGF5ZXIuaWQpLCBbXCIxMTFcIl0pO1xuICBhc3NlcnQuZGVlcEVxdWFsKG1lcmdlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpLCBbXCIxOTUxNTo1MDAxOjExMVwiXSk7XG59KTtcblxudGVzdChcImEgcmVzdWx0IHN0YWZmIGFscmVhZHkgZW50ZXJlZCBpcyBuZXZlciBvdmVyd3JpdHRlbiBieSBDbHViIExvY2tlclwiLCAoKSA9PiB7XG4gIGNvbnN0IHBsYXllZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoXG4gICAgZHJhd3NUb0ZlZWQoXG4gICAgICBbdG91cm5hbWVudChbZHJhdyh7IFN0YXR1czogXCJDXCIsIHdpbm5lcjogXCJIXCIsIFNjb3JlOiBcIjExLTUsMTEtNiwxMS03XCIgfSldKV0sXG4gICAgICByb3N0ZXIsXG4gICAgICBcIkFtZXJpY2EvTmV3X1lvcmtcIixcbiAgICApLFxuICApO1xuICBjb25zdCBleGlzdGluZyA9IG1lcmdlQ2x1YkxvY2tlckZlZWQoYmFzZVN0YXRlKFtdKSwgcGxheWVkKTtcbiAgY29uc3Qgc3RhZmZFZGl0ZWQgPSB7XG4gICAgLi4uZXhpc3RpbmcsXG4gICAgbWF0Y2hlczogZXhpc3RpbmcubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiAoeyAuLi5tYXRjaCwgcmVzdWx0OiBcIldvbiAzXHUyMDEzMCwgZ3JlYXQgZm9jdXNcIiB9KSksXG4gIH07XG5cbiAgY29uc3QgbWVyZ2VkID0gbWVyZ2VDbHViTG9ja2VyRmVlZChzdGFmZkVkaXRlZCwgcGxheWVkKTtcbiAgYXNzZXJ0LmVxdWFsKG1lcmdlZC5tYXRjaGVzWzBdPy5yZXN1bHQsIFwiV29uIDNcdTIwMTMwLCBncmVhdCBmb2N1c1wiKTtcbn0pO1xuIiwgImltcG9ydCB0eXBlIHsgQ2x1YkxvY2tlckZlZWQsIENsdWJMb2NrZXJNYXRjaCB9IGZyb20gXCIuL2NsdWItbG9ja2VyLmpzXCI7XG5cbi8vIENsdWIgTG9ja2VyJ3MgcHVibGljIHdlYnNpdGUgcmVhZHMgdG91cm5hbWVudCBkYXRhIGZyb20gdGhlc2UgZW5kcG9pbnRzLlxuLy8gVGhleSBhcmUgdW5kb2N1bWVudGVkLCBzbyBldmVyeSBmaWVsZCBiZWxvdyBpcyByZWFkIGRlZmVuc2l2ZWx5LlxuY29uc3QgQ0xVQl9MT0NLRVJfQVBJID0gXCJodHRwczovL2FwaS51c3NxdWFzaC5jb20vcmVzb3VyY2VzXCI7XG5cbi8vIENsdWIgTG9ja2VyIHB1Ymxpc2hlcyBzdGFydCB0aW1lcyBvbmx5LiBUb3VybmFtZW50cyBzbG90IG1hdGNoZXMgcm91Z2hseVxuLy8gMzUtNDUgbWludXRlcyBhcGFydCwgc28gYSBtYXRjaCBpcyBhc3N1bWVkIHRvIGxhc3QgdGhpcyBsb25nIHVubGVzcyB0aGVcbi8vIHBsYXllcidzIG5leHQgbWF0Y2ggc3RhcnRzIHNvb25lci5cbmNvbnN0IEFTU1VNRURfTUFUQ0hfTUlOVVRFUyA9IDQ1O1xuXG5leHBvcnQgdHlwZSBEcmF3TWF0Y2ggPSB7XG4gIFJlc3VsdElEPzogdW5rbm93bjtcbiAgU3RhdHVzPzogdW5rbm93bjtcbiAgU2luZ2xlc0RvdWJsZXM/OiB1bmtub3duO1xuICBocGxheWVyMT86IHVua25vd247XG4gIHZwbGF5ZXIxPzogdW5rbm93bjtcbiAgd2lkMT86IHVua25vd247XG4gIG9pZDE/OiB1bmtub3duO1xuICBtYXRjaGRhdGU/OiB1bmtub3duO1xuICBTdGFydFRpbWU/OiB1bmtub3duO1xuICBDb3VydE51bWJlcj86IHVua25vd247XG4gIGNvdXJ0TmFtZT86IHVua25vd247XG4gIHdpbm5lcj86IHVua25vd247XG4gIFNjb3JlPzogdW5rbm93bjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvdXJuYW1lbnREcmF3cyA9IHtcbiAgdG91cm5hbWVudElkOiBzdHJpbmc7XG4gIHZlbnVlTmFtZTogc3RyaW5nO1xuICAvLyBcIlBFTj1Vbml2ZXJzaXR5IG9mIFBlbm5zeWx2YW5pYSwgVkFSPVNDSChWYXJlKVwiIHN0eWxlIGNvdXJ0LXByZWZpeCBtYXBcbiAgLy8gdXNlZCBieSBtdWx0aS12ZW51ZSB0b3VybmFtZW50cy5cbiAgdmVudWVDb2Rlczogc3RyaW5nIHwgbnVsbDtcbiAgbWF0Y2hlczogRHJhd01hdGNoW107XG59O1xuXG50eXBlIFJvc3Rlck1hdGNoID0gQ2x1YkxvY2tlck1hdGNoICYgeyBwbGF5ZXJOYW1lOiBzdHJpbmcgfTtcblxuY29uc3QgdGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PlxuICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50cmltKCkgOiBcIlwiO1xuXG5jb25zdCBtZW1iZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PlxuICB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdmFsdWUgPiAwXG4gICAgPyBTdHJpbmcodmFsdWUpXG4gICAgOiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgL15cXGQrJC8udGVzdCh2YWx1ZS50cmltKCkpXG4gICAgICA/IHZhbHVlLnRyaW0oKVxuICAgICAgOiBcIlwiO1xuXG4vKiogXCJDaGVuLCBDYXNwZXIgXCIgLT4gXCJDYXNwZXIgQ2hlblwiICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU5hbWUobGFzdEZpcnN0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBbbGFzdCwgZmlyc3RdID0gbGFzdEZpcnN0LnNwbGl0KFwiLFwiKS5tYXAoKHBhcnQpID0+IHBhcnQudHJpbSgpKTtcbiAgcmV0dXJuIGZpcnN0ID8gYCR7Zmlyc3R9ICR7bGFzdH1gIDogbGFzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVmVudWVDb2Rlcyh2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICBjb25zdCBjb2RlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgZW50cnkgb2YgKHZhbHVlID8/IFwiXCIpLnNwbGl0KFwiLFwiKSkge1xuICAgIGNvbnN0IFtjb2RlLCBuYW1lXSA9IGVudHJ5LnNwbGl0KFwiPVwiKS5tYXAoKHBhcnQpID0+IHBhcnQudHJpbSgpKTtcbiAgICBpZiAoY29kZSAmJiBuYW1lKSBjb2Rlcy5zZXQoY29kZS50b1VwcGVyQ2FzZSgpLCBuYW1lKTtcbiAgfVxuICByZXR1cm4gY29kZXM7XG59XG5cbi8qKiBcIlZBUjFcIiAtPiBTQ0goVmFyZSksIENvdXJ0IDE7IFwiNFwiIC0+IG1haW4gdmVudWUsIENvdXJ0IDQuICovXG5leHBvcnQgZnVuY3Rpb24gY291cnRBbmRWZW51ZShcbiAgbWF0Y2g6IERyYXdNYXRjaCxcbiAgdmVudWVOYW1lOiBzdHJpbmcsXG4gIHZlbnVlQ29kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz4sXG4pOiB7IHZlbnVlOiBzdHJpbmc7IGNvdXJ0OiBzdHJpbmcgfSB7XG4gIGNvbnN0IG5hbWVkID0gdGV4dChtYXRjaC5jb3VydE5hbWUpO1xuICBjb25zdCBjb2RlID0gdGV4dChtYXRjaC5Db3VydE51bWJlcik7XG4gIGNvbnN0IHByZWZpeGVkID0gL14oW0EtWmEtel0rKVxccyooXFxkKykkLy5leGVjKGNvZGUpO1xuICBpZiAocHJlZml4ZWQpIHtcbiAgICBjb25zdCB2ZW51ZSA9IHZlbnVlQ29kZXMuZ2V0KHByZWZpeGVkWzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgIGlmICh2ZW51ZSkgcmV0dXJuIHsgdmVudWUsIGNvdXJ0OiBuYW1lZCB8fCBgQ291cnQgJHtwcmVmaXhlZFsyXX1gIH07XG4gIH1cbiAgaWYgKG5hbWVkKSByZXR1cm4geyB2ZW51ZTogdmVudWVOYW1lLCBjb3VydDogbmFtZWQgfTtcbiAgaWYgKC9eXFxkKyQvLnRlc3QoY29kZSkpIHJldHVybiB7IHZlbnVlOiB2ZW51ZU5hbWUsIGNvdXJ0OiBgQ291cnQgJHtjb2RlfWAgfTtcbiAgcmV0dXJuIHsgdmVudWU6IHZlbnVlTmFtZSwgY291cnQ6IGNvZGUgfHwgXCJDb3VydCBUQkFcIiB9O1xufVxuXG5mdW5jdGlvbiB0aW1lWm9uZU9mZnNldE1pbnV0ZXModXRjTWlsbGlzOiBudW1iZXIsIHRpbWVab25lOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBwYXJ0cyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIsIHtcbiAgICAgIHRpbWVab25lLFxuICAgICAgaG91ckN5Y2xlOiBcImgyM1wiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCIyLWRpZ2l0XCIsXG4gICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAgICAgc2Vjb25kOiBcIjItZGlnaXRcIixcbiAgICB9KVxuICAgICAgLmZvcm1hdFRvUGFydHMobmV3IERhdGUodXRjTWlsbGlzKSlcbiAgICAgIC5tYXAoKHBhcnQpID0+IFtwYXJ0LnR5cGUsIHBhcnQudmFsdWVdKSxcbiAgKTtcbiAgY29uc3QgYXNVdGMgPSBEYXRlLlVUQyhcbiAgICBOdW1iZXIocGFydHMueWVhciksXG4gICAgTnVtYmVyKHBhcnRzLm1vbnRoKSAtIDEsXG4gICAgTnVtYmVyKHBhcnRzLmRheSksXG4gICAgTnVtYmVyKHBhcnRzLmhvdXIpLFxuICAgIE51bWJlcihwYXJ0cy5taW51dGUpLFxuICAgIE51bWJlcihwYXJ0cy5zZWNvbmQpLFxuICApO1xuICByZXR1cm4gTWF0aC5yb3VuZCgoYXNVdGMgLSB1dGNNaWxsaXMpIC8gNjBfMDAwKTtcbn1cblxuY29uc3QgcGFkID0gKHZhbHVlOiBudW1iZXIpID0+IFN0cmluZyh2YWx1ZSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXG4vKipcbiAqIENsdWIgTG9ja2VyIGdpdmVzIFwiMDkvMjYvMjAyNlwiIGFuZCBcIjExOjMwIEFNXCIgd2l0aCBubyB0aW1lem9uZS4gVGhlIHRyYWNrZXJcbiAqIHJlcXVpcmVzIGFuIGV4cGxpY2l0IG9mZnNldCwgc28gcmVzb2x2ZSB0aGUgd2FsbC1jbG9jayB0aW1lIGluIHRoZVxuICogdG91cm5hbWVudCdzIHRpbWV6b25lOiBcIjIwMjYtMDktMjZUMTE6MzA6MDAtMDQ6MDBcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2FsU3RhcnRUb0lzbyhcbiAgbWF0Y2hEYXRlOiBzdHJpbmcsXG4gIHN0YXJ0VGltZTogc3RyaW5nLFxuICB0aW1lWm9uZTogc3RyaW5nLFxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IGRhdGUgPSAvXihcXGR7MSwyfSlcXC8oXFxkezEsMn0pXFwvKFxcZHs0fSkkLy5leGVjKG1hdGNoRGF0ZS50cmltKCkpO1xuICBjb25zdCB0aW1lID0gL14oXFxkezEsMn0pOihcXGR7Mn0pXFxzKihbQWFQcF1bTW1dKSQvLmV4ZWMoc3RhcnRUaW1lLnRyaW0oKSk7XG4gIGlmICghZGF0ZSB8fCAhdGltZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgW21vbnRoLCBkYXksIHllYXJdID0gW051bWJlcihkYXRlWzFdKSwgTnVtYmVyKGRhdGVbMl0pLCBOdW1iZXIoZGF0ZVszXSldO1xuICBsZXQgaG91ciA9IE51bWJlcih0aW1lWzFdKSAlIDEyO1xuICBpZiAodGltZVszXS50b1VwcGVyQ2FzZSgpID09PSBcIlBNXCIpIGhvdXIgKz0gMTI7XG4gIGNvbnN0IG1pbnV0ZSA9IE51bWJlcih0aW1lWzJdKTtcblxuICBjb25zdCB3YWxsQ2xvY2sgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciwgbWludXRlKTtcbiAgbGV0IG9mZnNldCA9IHRpbWVab25lT2Zmc2V0TWludXRlcyh3YWxsQ2xvY2ssIHRpbWVab25lKTtcbiAgb2Zmc2V0ID0gdGltZVpvbmVPZmZzZXRNaW51dGVzKHdhbGxDbG9jayAtIG9mZnNldCAqIDYwXzAwMCwgdGltZVpvbmUpO1xuXG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPCAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzb2x1dGUgPSBNYXRoLmFicyhvZmZzZXQpO1xuICByZXR1cm4gYCR7eWVhcn0tJHtwYWQobW9udGgpfS0ke3BhZChkYXkpfVQke3BhZChob3VyKX06JHtwYWQobWludXRlKX06MDAke3NpZ259JHtwYWQoTWF0aC5mbG9vcihhYnNvbHV0ZSAvIDYwKSl9OiR7cGFkKGFic29sdXRlICUgNjApfWA7XG59XG5cbi8qKlxuICogQ2x1YiBMb2NrZXIgc2NvcmVzIGFyZSB3cml0dGVuIHdpbm5lci1maXJzdCAoXCIxMS0yLDExLTUsMTEtNVwiKS4gVHVybiB0aGVtXG4gKiBpbnRvIHRoZSB0cmFja2VkIHBsYXllcidzIHZpZXc6IFwiV29uIDNcdTIwMTMwICgxMS0yLCAxMS01LCAxMS01KVwiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0Rm9yKFxuICBtYXRjaDogRHJhd01hdGNoLFxuICBzaWRlOiBcIkhcIiB8IFwiVlwiLFxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHN0YXR1cyA9IHRleHQobWF0Y2guU3RhdHVzKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCB3aW5uZXIgPSB0ZXh0KG1hdGNoLndpbm5lcikudG9VcHBlckNhc2UoKTtcbiAgaWYgKHdpbm5lciAhPT0gXCJIXCIgJiYgd2lubmVyICE9PSBcIlZcIikgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHdvbiA9IHdpbm5lciA9PT0gc2lkZTtcblxuICBpZiAoc3RhdHVzID09PSBcIkRGXCIpIHJldHVybiB3b24gPyBcIldvbiBieSBkZWZhdWx0XCIgOiBcIkxvc3QgYnkgZGVmYXVsdFwiO1xuXG4gIGNvbnN0IGdhbWVzID0gdGV4dChtYXRjaC5TY29yZSlcbiAgICAuc3BsaXQoXCIsXCIpXG4gICAgLm1hcCgoZ2FtZSkgPT4gL14oXFxkKyktKFxcZCspJC8uZXhlYyhnYW1lLnRyaW0oKSkpXG4gICAgLmZpbHRlcigoZ2FtZSk6IGdhbWUgaXMgUmVnRXhwRXhlY0FycmF5ID0+IGdhbWUgIT09IG51bGwpXG4gICAgLm1hcCgoZ2FtZSkgPT4gKHdvbiA/IFtnYW1lWzFdLCBnYW1lWzJdXSA6IFtnYW1lWzJdLCBnYW1lWzFdXSkpO1xuICAvLyBBIGdhbWUgY291bnRzIG9uY2Ugc29tZW9uZSByZWFjaGVzIDkrIHdpdGggYSB0d28tcG9pbnQgbGVhZCwgc28gdGhlXG4gIC8vIHVuZmluaXNoZWQgZ2FtZSBvZiBhIHJldGlyZW1lbnQgaXMgc2hvd24gYnV0IG5vdCBjb3VudGVkLlxuICBjb25zdCBmaW5pc2hlZCA9IGdhbWVzXG4gICAgLm1hcCgoW2EsIGJdKSA9PiBbTnVtYmVyKGEpLCBOdW1iZXIoYildKVxuICAgIC5maWx0ZXIoKFthLCBiXSkgPT4gTWF0aC5tYXgoYSwgYikgPj0gOSAmJiBNYXRoLmFicyhhIC0gYikgPj0gMik7XG4gIGNvbnN0IG91cnMgPSBmaW5pc2hlZC5maWx0ZXIoKFthLCBiXSkgPT4gYSA+IGIpLmxlbmd0aDtcbiAgY29uc3QgdGhlaXJzID0gZmluaXNoZWQubGVuZ3RoIC0gb3VycztcbiAgY29uc3Qgc2NvcmUgPSBnYW1lcy5sZW5ndGhcbiAgICA/IGAgJHtvdXJzfVx1MjAxMyR7dGhlaXJzfSAoJHtnYW1lcy5tYXAoKFthLCBiXSkgPT4gYCR7YX0tJHtifWApLmpvaW4oXCIsIFwiKX0pYFxuICAgIDogXCJcIjtcbiAgY29uc3QgcmV0aXJlZCA9IHN0YXR1cyA9PT0gXCJSRVwiID8gKHdvbiA/IFwiLCBvcHBvbmVudCByZXRpcmVkXCIgOiBcIiwgcmV0aXJlZFwiKSA6IFwiXCI7XG4gIHJldHVybiBgJHt3b24gPyBcIldvblwiIDogXCJMb3N0XCJ9JHtzY29yZX0ke3JldGlyZWR9YDtcbn1cblxuLyoqXG4gKiBUdXJuIENsdWIgTG9ja2VyIHRvdXJuYW1lbnQgZHJhd3MgaW50byB0aGUgdHJhY2tlcidzIHNjaGVkdWxlIGZlZWQsIGtlZXBpbmdcbiAqIG9ubHkgc2luZ2xlcyBtYXRjaGVzIGZvciBwbGF5ZXJzIG9uIHRoZSByb3N0ZXIgdGhhdCBoYXZlIGEgc3RhcnQgdGltZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdzVG9GZWVkKFxuICB0b3VybmFtZW50czogVG91cm5hbWVudERyYXdzW10sXG4gIHJvc3RlcklkczogUmVhZG9ubHlTZXQ8c3RyaW5nPixcbiAgdGltZVpvbmU6IHN0cmluZyxcbik6IENsdWJMb2NrZXJGZWVkIHtcbiAgY29uc3QgZm91bmQ6IFJvc3Rlck1hdGNoW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IHRvdXJuYW1lbnQgb2YgdG91cm5hbWVudHMpIHtcbiAgICBjb25zdCB2ZW51ZUNvZGVzID0gcGFyc2VWZW51ZUNvZGVzKHRvdXJuYW1lbnQudmVudWVDb2Rlcyk7XG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiB0b3VybmFtZW50Lm1hdGNoZXMpIHtcbiAgICAgIGlmICh0ZXh0KG1hdGNoLlNpbmdsZXNEb3VibGVzKS50b0xvd2VyQ2FzZSgpID09PSBcImRcIikgY29udGludWU7XG4gICAgICBjb25zdCByZXN1bHRJZCA9IG1lbWJlcklkKG1hdGNoLlJlc3VsdElEKSB8fCB0ZXh0KG1hdGNoLlJlc3VsdElEKTtcbiAgICAgIGlmICghcmVzdWx0SWQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc3RhcnRzQXQgPSBsb2NhbFN0YXJ0VG9Jc28oXG4gICAgICAgIHRleHQobWF0Y2gubWF0Y2hkYXRlKSxcbiAgICAgICAgdGV4dChtYXRjaC5TdGFydFRpbWUpLFxuICAgICAgICB0aW1lWm9uZSxcbiAgICAgICk7XG4gICAgICBpZiAoIXN0YXJ0c0F0KSBjb250aW51ZTtcblxuICAgICAgY29uc3Qgc2lkZXMgPSBbXG4gICAgICAgIHsgc2lkZTogXCJIXCIgYXMgY29uc3QsIGlkOiBtZW1iZXJJZChtYXRjaC53aWQxKSwgbmFtZTogdGV4dChtYXRjaC5ocGxheWVyMSksIG90aGVyOiB0ZXh0KG1hdGNoLnZwbGF5ZXIxKSB9LFxuICAgICAgICB7IHNpZGU6IFwiVlwiIGFzIGNvbnN0LCBpZDogbWVtYmVySWQobWF0Y2gub2lkMSksIG5hbWU6IHRleHQobWF0Y2gudnBsYXllcjEpLCBvdGhlcjogdGV4dChtYXRjaC5ocGxheWVyMSkgfSxcbiAgICAgIF07XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSB0ZXh0KG1hdGNoLlN0YXR1cykudG9VcHBlckNhc2UoKSAhPT0gXCJTXCI7XG4gICAgICBjb25zdCB7IHZlbnVlLCBjb3VydCB9ID0gY291cnRBbmRWZW51ZShtYXRjaCwgdG91cm5hbWVudC52ZW51ZU5hbWUsIHZlbnVlQ29kZXMpO1xuXG4gICAgICBmb3IgKGNvbnN0IHsgc2lkZSwgaWQsIG5hbWUsIG90aGVyIH0gb2Ygc2lkZXMpIHtcbiAgICAgICAgaWYgKCFpZCB8fCAhbmFtZSB8fCAhcm9zdGVySWRzLmhhcyhpZCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY29tcGxldGVkICYmICFvdGhlcikgY29udGludWU7XG4gICAgICAgIGZvdW5kLnB1c2goe1xuICAgICAgICAgIGV4dGVybmFsSWQ6IGAke3RvdXJuYW1lbnQudG91cm5hbWVudElkfToke3Jlc3VsdElkfToke2lkfWAsXG4gICAgICAgICAgcGxheWVySWQ6IGlkLFxuICAgICAgICAgIHBsYXllck5hbWU6IGRpc3BsYXlOYW1lKG5hbWUpLFxuICAgICAgICAgIG9wcG9uZW50OiBvdGhlciA/IGRpc3BsYXlOYW1lKG90aGVyKSA6IFwiVG8gYmUgZGVjaWRlZFwiLFxuICAgICAgICAgIHN0YXJ0c0F0LFxuICAgICAgICAgIGVuZHNBdDogc3RhcnRzQXQsXG4gICAgICAgICAgdmVudWUsXG4gICAgICAgICAgY291cnQsXG4gICAgICAgICAgc3RhdHVzOiBjb21wbGV0ZWQgPyBcImNvbXBsZXRlZFwiIDogXCJ1cGNvbWluZ1wiLFxuICAgICAgICAgIHJlc3VsdDogY29tcGxldGVkID8gcmVzdWx0Rm9yKG1hdGNoLCBzaWRlKSA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEVzdGltYXRlIGZpbmlzaCB0aW1lcyB3aXRob3V0IGxldHRpbmcgYSBwbGF5ZXIncyBtYXRjaGVzIG92ZXJsYXAsIHdoaWNoXG4gIC8vIHRoZSB0cmFja2VyIHJlamVjdHMuIFNhbWUtc3RhcnQgZHVwbGljYXRlcyBhcmUgZHJvcHBlZCBmb3IgdGhlIHNhbWUgcmVhc29uLlxuICBjb25zdCBieVBsYXllciA9IG5ldyBNYXA8c3RyaW5nLCBSb3N0ZXJNYXRjaFtdPigpO1xuICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZvdW5kKSB7XG4gICAgYnlQbGF5ZXIuc2V0KG1hdGNoLnBsYXllcklkLCBbLi4uKGJ5UGxheWVyLmdldChtYXRjaC5wbGF5ZXJJZCkgPz8gW10pLCBtYXRjaF0pO1xuICB9XG4gIGNvbnN0IG1hdGNoZXM6IENsdWJMb2NrZXJNYXRjaFtdID0gW107XG4gIGZvciAoY29uc3QgcGxheWVyTWF0Y2hlcyBvZiBieVBsYXllci52YWx1ZXMoKSkge1xuICAgIHBsYXllck1hdGNoZXMuc29ydCgoYSwgYikgPT4gRGF0ZS5wYXJzZShhLnN0YXJ0c0F0KSAtIERhdGUucGFyc2UoYi5zdGFydHNBdCkpO1xuICAgIGNvbnN0IGtlcHQgPSBwbGF5ZXJNYXRjaGVzLmZpbHRlcihcbiAgICAgIChtYXRjaCwgaW5kZXgpID0+XG4gICAgICAgIGluZGV4ID09PSAwIHx8XG4gICAgICAgIERhdGUucGFyc2UobWF0Y2guc3RhcnRzQXQpID4gRGF0ZS5wYXJzZShwbGF5ZXJNYXRjaGVzW2luZGV4IC0gMV0uc3RhcnRzQXQpLFxuICAgICk7XG4gICAga2VwdC5mb3JFYWNoKChtYXRjaCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5wYXJzZShtYXRjaC5zdGFydHNBdCk7XG4gICAgICBjb25zdCBuZXh0ID0ga2VwdFtpbmRleCArIDFdO1xuICAgICAgY29uc3QgZW5kID0gTWF0aC5taW4oXG4gICAgICAgIHN0YXJ0ICsgQVNTVU1FRF9NQVRDSF9NSU5VVEVTICogNjBfMDAwLFxuICAgICAgICBuZXh0ID8gRGF0ZS5wYXJzZShuZXh0LnN0YXJ0c0F0KSA6IEluZmluaXR5LFxuICAgICAgKTtcbiAgICAgIG1hdGNoZXMucHVzaCh7IC4uLm1hdGNoLCBlbmRzQXQ6IG5ldyBEYXRlKGVuZCkudG9JU09TdHJpbmcoKSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBsYXllcnMgPSBbLi4ubmV3IE1hcChmb3VuZC5tYXAoKG1hdGNoKSA9PiBbbWF0Y2gucGxheWVySWQsIG1hdGNoLnBsYXllck5hbWVdKSldXG4gICAgLm1hcCgoW2lkLCBuYW1lXSkgPT4gKHsgaWQsIG5hbWUgfSkpO1xuICByZXR1cm4geyBtYXRjaGVzLCBwbGF5ZXJzIH07XG59XG5cbmV4cG9ydCB0eXBlIENsdWJMb2NrZXJEcmF3c0NvbmZpZyA9IHtcbiAgdG91cm5hbWVudElkczogc3RyaW5nW107XG4gIHJvc3RlcklkczogUmVhZG9ubHlTZXQ8c3RyaW5nPjtcbiAgdGltZVpvbmU6IHN0cmluZztcbn07XG5cbi8qKiBSZWFkIHRvdXJuYW1lbnQgSURzLCByb3N0ZXIgYW5kIHRpbWV6b25lIGZyb20gdGhlIGVudmlyb25tZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdzQ29uZmlnRnJvbUVudihcbiAgZW52OiBOb2RlSlMuUHJvY2Vzc0VudiA9IHByb2Nlc3MuZW52LFxuKTogQ2x1YkxvY2tlckRyYXdzQ29uZmlnIHwgbnVsbCB7XG4gIGNvbnN0IGxpc3QgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICAodmFsdWUgPz8gXCJcIikuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gaXRlbS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgdG91cm5hbWVudElkcyA9IGxpc3QoZW52W1wiQ0xVQl9MT0NLRVJfVE9VUk5BTUVOVF9JRFNcIl0pO1xuICBpZiAodG91cm5hbWVudElkcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICByZXR1cm4ge1xuICAgIHRvdXJuYW1lbnRJZHMsXG4gICAgcm9zdGVySWRzOiBuZXcgU2V0KGxpc3QoZW52W1wiQ0xVQl9MT0NLRVJfUExBWUVSX0lEU1wiXSkpLFxuICAgIHRpbWVab25lOiBlbnZbXCJDTFVCX0xPQ0tFUl9USU1FWk9ORVwiXT8udHJpbSgpIHx8IFwiQW1lcmljYS9OZXdfWW9ya1wiLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKc29uKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDEwXzAwMCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtDTFVCX0xPQ0tFUl9BUEl9LyR7cGF0aH1gLCB7XG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2x1YiBMb2NrZXIgcmV0dXJuZWQgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30gZm9yICR7cGF0aH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFRvdXJuYW1lbnREcmF3cyhcbiAgdG91cm5hbWVudElkOiBzdHJpbmcsXG4gIGZldGNoSnNvbjogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx1bmtub3duPixcbik6IFByb21pc2U8VG91cm5hbWVudERyYXdzPiB7XG4gIGNvbnN0IGlkID0gZW5jb2RlVVJJQ29tcG9uZW50KHRvdXJuYW1lbnRJZCk7XG4gIGNvbnN0IHRvdXJuYW1lbnQgPSAoYXdhaXQgZmV0Y2hKc29uKGB0b3VybmFtZW50cy8ke2lkfWApKSBhcyB7XG4gICAgVG91cm5hbWVudF9OYW1lPzogdW5rbm93bjtcbiAgICBDaGVja3NfVG8/OiB1bmtub3duO1xuICAgIHZlbnVlcz86IEFycmF5PHsgQ2x1YklkPzogdW5rbm93bjsgSXNNYWluPzogdW5rbm93biB9PjtcbiAgfTtcblxuICBsZXQgdmVudWVOYW1lID0gdGV4dCh0b3VybmFtZW50LlRvdXJuYW1lbnRfTmFtZSkgfHwgYFRvdXJuYW1lbnQgJHt0b3VybmFtZW50SWR9YDtcbiAgY29uc3QgbWFpbkNsdWIgPVxuICAgIHRvdXJuYW1lbnQudmVudWVzPy5maW5kKCh2ZW51ZSkgPT4gdmVudWUuSXNNYWluKSA/PyB0b3VybmFtZW50LnZlbnVlcz8uWzBdO1xuICBjb25zdCBjbHViSWQgPSBtZW1iZXJJZChtYWluQ2x1Yj8uQ2x1YklkKTtcbiAgaWYgKGNsdWJJZCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbHViID0gKGF3YWl0IGZldGNoSnNvbihgcmVzL2NsdWJzLyR7Y2x1YklkfWApKSBhcyB7IG5hbWU/OiB1bmtub3duIH07XG4gICAgICB2ZW51ZU5hbWUgPSB0ZXh0KGNsdWIubmFtZSkgfHwgdmVudWVOYW1lO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gVGhlIHRvdXJuYW1lbnQgbmFtZSBpcyBhIHJlYXNvbmFibGUgdmVudWUgbGFiZWwgaWYgdGhlIGNsdWIgbG9va3VwIGZhaWxzLlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRpdmlzaW9ucyA9IGF3YWl0IGZldGNoSnNvbihgdG91cm5hbWVudHMvJHtpZH0vZGl2aXNpb25zYW5kc2VjdGlvbnNgKTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRpdmlzaW9ucykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENsdWIgTG9ja2VyIHRvdXJuYW1lbnQgJHt0b3VybmFtZW50SWR9IGhhcyBubyBkaXZpc2lvbiBsaXN0YCk7XG4gIH1cbiAgY29uc3QgZGl2aXNpb25JZHMgPSBbXG4gICAgLi4ubmV3IFNldChkaXZpc2lvbnMubWFwKChkaXZpc2lvbikgPT4gbWVtYmVySWQoZGl2aXNpb24/LmRpdmlzaW9uSWQpKS5maWx0ZXIoQm9vbGVhbikpLFxuICBdO1xuICBjb25zdCBzZWN0aW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGRpdmlzaW9uSWRzLm1hcCgoZGl2aXNpb25JZCkgPT4gZmV0Y2hKc29uKGB0b3VybmFtZW50cy8ke2lkfS9kaXZpc2lvbi8ke2RpdmlzaW9uSWR9L2RyYXdzYCkpLFxuICApO1xuICBjb25zdCBtYXRjaGVzID0gc2VjdGlvbnMuZmxhdE1hcCgoZHJhdykgPT5cbiAgICBBcnJheS5pc0FycmF5KGRyYXcpXG4gICAgICA/IGRyYXcuZmxhdE1hcCgoc2VjdGlvbikgPT5cbiAgICAgICAgICBBcnJheS5pc0FycmF5KHNlY3Rpb24/Lm1hdGNoZXMpID8gKHNlY3Rpb24ubWF0Y2hlcyBhcyBEcmF3TWF0Y2hbXSkgOiBbXSxcbiAgICAgICAgKVxuICAgICAgOiBbXSxcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHRvdXJuYW1lbnRJZCxcbiAgICB2ZW51ZU5hbWUsXG4gICAgdmVudWVDb2RlczogdGV4dCh0b3VybmFtZW50LkNoZWNrc19UbykgfHwgbnVsbCxcbiAgICBtYXRjaGVzLFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbHViTG9ja2VyRHJhd3MoXG4gIGNvbmZpZzogQ2x1YkxvY2tlckRyYXdzQ29uZmlnLFxuICBmZXRjaEpzb246IChwYXRoOiBzdHJpbmcpID0+IFByb21pc2U8dW5rbm93bj4gPSBnZXRKc29uLFxuKTogUHJvbWlzZTxDbHViTG9ja2VyRmVlZD4ge1xuICBpZiAoY29uZmlnLnJvc3Rlcklkcy5zaXplID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQWRkIFVTIFNxdWFzaCBwbGF5ZXIgSURzIHRvIENMVUJfTE9DS0VSX1BMQVlFUl9JRFNcIik7XG4gIH1cbiAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBjb25maWcudG91cm5hbWVudElkcy5tYXAoKGlkKSA9PiBsb2FkVG91cm5hbWVudERyYXdzKGlkLCBmZXRjaEpzb24pKSxcbiAgKTtcbiAgcmV0dXJuIGRyYXdzVG9GZWVkKHRvdXJuYW1lbnRzLCBjb25maWcucm9zdGVySWRzLCBjb25maWcudGltZVpvbmUpO1xufVxuIiwgInR5cGUgVHJhY2tlclBlcnNvbiA9IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBzaGFyZVRva2VuPzogc3RyaW5nIH07XG5cbnR5cGUgVHJhY2tlck1hdGNoID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZXh0ZXJuYWxJZDogc3RyaW5nIHwgbnVsbDtcbiAgICBwbGF5ZXJJZDogc3RyaW5nO1xuICAgIG9wcG9uZW50OiBzdHJpbmc7XG4gICAgc3RhcnRzQXQ6IHN0cmluZztcbiAgICBlbmRzQXQ6IHN0cmluZztcbiAgICB2ZW51ZTogc3RyaW5nO1xuICAgIGNvdXJ0OiBzdHJpbmc7XG4gICAgY29hY2hJZDogc3RyaW5nO1xuICAgIHN0YXR1czogXCJ1cGNvbWluZ1wiIHwgXCJjb21wbGV0ZWRcIjtcbiAgICByZXN1bHQ6IHN0cmluZyB8IG51bGw7XG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBzdHJpbmc7XG4gICAgICBvYnNlcnZhdGlvbnM6IHN0cmluZ1tdO1xuICAgICAgdHJhbnNjcmlwdDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGF1ZGlvUGF0aD86IHN0cmluZyB8IG51bGw7XG4gICAgICB1cGRhdGVkQXQ6IHN0cmluZztcbiAgICB9IHwgbnVsbDtcbiAgfTtcblxuZXhwb3J0IHR5cGUgVHJhY2tlclN0YXRlID0ge1xuICBwbGF5ZXJzOiBUcmFja2VyUGVyc29uW107XG4gIGNvYWNoZXM6IFRyYWNrZXJQZXJzb25bXTtcbiAgYnJhbmRpbmc/OiB7IG5hbWU6IHN0cmluZzsgbG9nb1BhdGg6IHN0cmluZyB8IG51bGwgfTtcbiAgbWF0Y2hlczogVHJhY2tlck1hdGNoW107XG4gIGxhc3RVcGRhdGVkQXQ6IHN0cmluZztcbiAgc291cmNlOiBcInNhbXBsZVwiIHwgXCJjbHViLWxvY2tlclwiO1xuICByZWZyZXNoSGVhbHRoOiBSZWZyZXNoSGVhbHRoO1xufTtcblxudHlwZSBEZWVwUmVhZG9ubHk8VD4gPSBUIGV4dGVuZHMgKC4uLmFyZ3M6IG5ldmVyW10pID0+IHVua25vd25cbiAgPyBUXG4gIDogVCBleHRlbmRzIHJlYWRvbmx5IChpbmZlciBJdGVtKVtdXG4gICAgPyByZWFkb25seSBEZWVwUmVhZG9ubHk8SXRlbT5bXVxuICAgIDogVCBleHRlbmRzIG9iamVjdFxuICAgICAgPyB7IHJlYWRvbmx5IFtLZXkgaW4ga2V5b2YgVF06IERlZXBSZWFkb25seTxUW0tleV0+IH1cbiAgICAgIDogVDtcblxuZXhwb3J0IHR5cGUgUmVhZG9ubHlUcmFja2VyU3RhdGUgPSBEZWVwUmVhZG9ubHk8VHJhY2tlclN0YXRlPjtcblxuZXhwb3J0IHR5cGUgUmVmcmVzaEhlYWx0aCA9IHtcbiAgY29uc2VjdXRpdmVGYWlsdXJlczogbnVtYmVyO1xuICBhbGVydFRocmVzaG9sZDogbnVtYmVyO1xuICBmaXJzdEZhaWx1cmVBdDogc3RyaW5nIHwgbnVsbDtcbiAgbGFzdEZhaWx1cmVBdDogc3RyaW5nIHwgbnVsbDtcbiAgYWxlcnRTZW50QXQ6IHN0cmluZyB8IG51bGw7XG4gIGZhaWx1cmVBbGVydENsYWltZWRBdDogc3RyaW5nIHwgbnVsbDtcbiAgcGVuZGluZ1JlY292ZXJpZXM6IFJlZnJlc2hSZWNvdmVyeVtdO1xuICByZWNvdmVyeUNsYWltOiB7XG4gICAgb3V0YWdlU3RhcnRlZEF0OiBzdHJpbmc7XG4gICAgcmVjb3ZlcmVkQXQ6IHN0cmluZztcbiAgICBjbGFpbWVkQXQ6IHN0cmluZztcbiAgfSB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBSZWZyZXNoUmVjb3ZlcnkgPSB7XG4gIGZhaWxlZEF0dGVtcHRzOiBudW1iZXI7XG4gIG91dGFnZVN0YXJ0ZWRBdDogc3RyaW5nO1xuICByZWNvdmVyZWRBdDogc3RyaW5nO1xuICBvdXRhZ2VEdXJhdGlvbk1zOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlKTogVHJhY2tlclN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXJzOiBzdGF0ZS5wbGF5ZXJzLm1hcCgocGxheWVyKSA9PiAoeyAuLi5wbGF5ZXIgfSkpLFxuICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMubWFwKChjb2FjaCkgPT4gKHsgLi4uY29hY2ggfSkpLFxuICAgIGJyYW5kaW5nOiBzdGF0ZS5icmFuZGluZyA/IHsgLi4uc3RhdGUuYnJhbmRpbmcgfSA6IHVuZGVmaW5lZCxcbiAgICBtYXRjaGVzOiBzdGF0ZS5tYXRjaGVzLm1hcChjbG9uZVRyYWNrZXJNYXRjaCksXG4gICAgbGFzdFVwZGF0ZWRBdDogc3RhdGUubGFzdFVwZGF0ZWRBdCxcbiAgICBzb3VyY2U6IHN0YXRlLnNvdXJjZSxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICAuLi5zdGF0ZS5yZWZyZXNoSGVhbHRoLFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IGNsb25lUmVmcmVzaFJlY292ZXJpZXMoXG4gICAgICAgIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICApLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcmVlemVUcmFja2VyU3RhdGUoc3RhdGU6IFRyYWNrZXJTdGF0ZSk6IFJlYWRvbmx5VHJhY2tlclN0YXRlIHtcbiAgZm9yIChjb25zdCBwbGF5ZXIgb2Ygc3RhdGUucGxheWVycykgT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xuICBPYmplY3QuZnJlZXplKHN0YXRlLnBsYXllcnMpO1xuICBmb3IgKGNvbnN0IGNvYWNoIG9mIHN0YXRlLmNvYWNoZXMpIE9iamVjdC5mcmVlemUoY29hY2gpO1xuICBPYmplY3QuZnJlZXplKHN0YXRlLmNvYWNoZXMpO1xuICBpZiAoc3RhdGUuYnJhbmRpbmcpIE9iamVjdC5mcmVlemUoc3RhdGUuYnJhbmRpbmcpO1xuICBmb3IgKGNvbnN0IG1hdGNoIG9mIHN0YXRlLm1hdGNoZXMpIHtcbiAgICBpZiAobWF0Y2gucmVwb3J0KSB7XG4gICAgICBPYmplY3QuZnJlZXplKG1hdGNoLnJlcG9ydC5vYnNlcnZhdGlvbnMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShtYXRjaC5yZXBvcnQpO1xuICAgIH1cbiAgICBPYmplY3QuZnJlZXplKG1hdGNoKTtcbiAgfVxuICBPYmplY3QuZnJlZXplKHN0YXRlLm1hdGNoZXMpO1xuICBmb3IgKGNvbnN0IHJlY292ZXJ5IG9mIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMpIHtcbiAgICBPYmplY3QuZnJlZXplKHJlY292ZXJ5KTtcbiAgfVxuICBPYmplY3QuZnJlZXplKHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMpO1xuICBpZiAoc3RhdGUucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltKSB7XG4gICAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0pO1xuICB9XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aCk7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgcmVjb3ZlcmllczogcmVhZG9ubHkgRGVlcFJlYWRvbmx5PFJlZnJlc2hSZWNvdmVyeT5bXSxcbik6IFJlZnJlc2hSZWNvdmVyeVtdIHtcbiAgcmV0dXJuIHJlY292ZXJpZXMubWFwKChyZWNvdmVyeSkgPT4gKHsgLi4ucmVjb3ZlcnkgfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVmcmVzaFJlY292ZXJ5KFxuICBzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHJlY292ZXJlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuKTogUmVmcmVzaFJlY292ZXJ5IHwgbnVsbCB7XG4gIGNvbnN0IHsgYWxlcnRTZW50QXQsIGNvbnNlY3V0aXZlRmFpbHVyZXMsIGZpcnN0RmFpbHVyZUF0IH0gPVxuICAgIHN0YXRlLnJlZnJlc2hIZWFsdGg7XG4gIGlmIChcbiAgICBhbGVydFNlbnRBdCA9PT0gbnVsbCB8fFxuICAgIGNvbnNlY3V0aXZlRmFpbHVyZXMgPT09IDAgfHxcbiAgICBmaXJzdEZhaWx1cmVBdCA9PT0gbnVsbFxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IGNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBmaXJzdEZhaWx1cmVBdCxcbiAgICByZWNvdmVyZWRBdCxcbiAgICBvdXRhZ2VEdXJhdGlvbk1zOiBNYXRoLm1heChcbiAgICAgIDAsXG4gICAgICBEYXRlLnBhcnNlKHJlY292ZXJlZEF0KSAtIERhdGUucGFyc2UoZmlyc3RGYWlsdXJlQXQpLFxuICAgICksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICBhbGVydFRocmVzaG9sZDogbnVtYmVyLFxuICByZWNvdmVyZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICBjb25zdCBwZW5kaW5nUmVjb3ZlcmllcyA9IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXM7XG4gIGNvbnN0IHJlY292ZXJ5ID0gZ2V0UmVmcmVzaFJlY292ZXJ5KHN0YXRlLCByZWNvdmVyZWRBdCk7XG4gIGlmIChyZWNvdmVyeSkgcGVuZGluZ1JlY292ZXJpZXMucHVzaChyZWNvdmVyeSk7XG4gIHJldHVybiB7XG4gICAgLi4ucmVwbGFjZW1lbnQsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICAgIGFsZXJ0VGhyZXNob2xkLFxuICAgICAgZmlyc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IG51bGwsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgIHJlY292ZXJ5Q2xhaW06IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJQZW5kaW5nUmVjb3Zlcnkoc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlKTogVHJhY2tlclN0YXRlIHtcbiAgY29uc3QgcmVwbGFjZW1lbnQgPSBjbG9uZVRyYWNrZXJTdGF0ZShzdGF0ZSk7XG4gIHJldHVybiB7XG4gICAgLi4ucmVwbGFjZW1lbnQsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgLi4ucmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aCxcbiAgICAgIHBlbmRpbmdSZWNvdmVyaWVzOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLnNsaWNlKDEpLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvcmRSZWZyZXNoRmFpbHVyZShcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICBhbGVydFRocmVzaG9sZDogbnVtYmVyLFxuICBmYWlsZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IHN0YXRlLnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcyArIDEsXG4gICAgICBhbGVydFRocmVzaG9sZCxcbiAgICAgIGZpcnN0RmFpbHVyZUF0OiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmZpcnN0RmFpbHVyZUF0ID8/IGZhaWxlZEF0LFxuICAgICAgbGFzdEZhaWx1cmVBdDogZmFpbGVkQXQsXG4gICAgICBhbGVydFNlbnRBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5hbGVydFNlbnRBdCxcbiAgICAgIGZhaWx1cmVBbGVydENsYWltZWRBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5mYWlsdXJlQWxlcnRDbGFpbWVkQXQsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgIHJlY292ZXJ5Q2xhaW06IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBDbHViTG9ja2VyTWF0Y2ggPSB7XG4gIGV4dGVybmFsSWQ6IHN0cmluZztcbiAgcGxheWVySWQ6IHN0cmluZztcbiAgcGxheWVyTmFtZT86IHN0cmluZztcbiAgb3Bwb25lbnQ6IHN0cmluZztcbiAgc3RhcnRzQXQ6IHN0cmluZztcbiAgZW5kc0F0OiBzdHJpbmc7XG4gIHZlbnVlOiBzdHJpbmc7XG4gIGNvdXJ0OiBzdHJpbmc7XG4gIHN0YXR1cz86IFwidXBjb21pbmdcIiB8IFwiY29tcGxldGVkXCI7XG4gIHJlc3VsdD86IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBDbHViTG9ja2VyRmVlZCA9IHtcbiAgbWF0Y2hlczogQ2x1YkxvY2tlck1hdGNoW107XG4gIHBsYXllcnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQgPSBEZWVwUmVhZG9ubHk8Q2x1YkxvY2tlckZlZWQ+O1xuXG5mdW5jdGlvbiBjbG9uZVRyYWNrZXJNYXRjaChtYXRjaDogUmVhZG9ubHlUcmFja2VyU3RhdGVbXCJtYXRjaGVzXCJdW251bWJlcl0pOiBUcmFja2VyTWF0Y2gge1xuICByZXR1cm4ge1xuICAgIC4uLm1hdGNoLFxuICAgIHJlcG9ydDpcbiAgICAgIG1hdGNoLnJlcG9ydCA9PT0gbnVsbFxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiB7XG4gICAgICAgICAgICAuLi5tYXRjaC5yZXBvcnQsXG4gICAgICAgICAgICBvYnNlcnZhdGlvbnM6IFsuLi5tYXRjaC5yZXBvcnQub2JzZXJ2YXRpb25zXSxcbiAgICAgICAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiByZWFkUmVxdWlyZWRTdHJpbmcodmFsdWU6IHVua25vd24sIGZpZWxkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiIHx8IHZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2ggJHtpbmRleCArIDF9IGhhcyBhbiBpbnZhbGlkICR7ZmllbGR9YCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gcmVhZFRpbWVzdGFtcFdpdGhUaW1lem9uZShcbiAgdmFsdWU6IHVua25vd24sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4pOiBzdHJpbmcge1xuICBjb25zdCB0aW1lc3RhbXAgPSByZWFkUmVxdWlyZWRTdHJpbmcodmFsdWUsIGZpZWxkLCBpbmRleCk7XG4gIGlmICghLyg/Olp8WystXVxcZHsyfTpcXGR7Mn0pJC9pLnRlc3QodGltZXN0YW1wKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBNYXRjaCAke2luZGV4ICsgMX0gJHtmaWVsZH0gbXVzdCBpbmNsdWRlIGFuIGV4cGxpY2l0IHRpbWV6b25lYCxcbiAgICApO1xuICB9XG4gIGlmIChOdW1iZXIuaXNOYU4oRGF0ZS5wYXJzZSh0aW1lc3RhbXApKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2ggJHtpbmRleCArIDF9IGhhcyBhbiBpbnZhbGlkICR7ZmllbGR9YCk7XG4gIH1cbiAgcmV0dXJuIHRpbWVzdGFtcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ2x1YkxvY2tlckZlZWQodmFsdWU6IHVua25vd24pOiBSZWFkb25seUNsdWJMb2NrZXJGZWVkIHtcbiAgaWYgKFxuICAgICF2YWx1ZSB8fFxuICAgIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fFxuICAgICFBcnJheS5pc0FycmF5KCh2YWx1ZSBhcyB7IG1hdGNoZXM/OiB1bmtub3duIH0pLm1hdGNoZXMpXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBDbHViIExvY2tlciByZXNwb25zZSBkb2VzIG5vdCBjb250YWluIGEgbWF0Y2hlcyBhcnJheVwiKTtcbiAgfVxuXG4gIGNvbnN0IHJhdyA9IHZhbHVlIGFzIHtcbiAgICBtYXRjaGVzOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj47XG4gICAgcGxheWVycz86IHVua25vd247XG4gIH07XG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgbWF0Y2hlcyA9IHJhdy5tYXRjaGVzLm1hcCgobWF0Y2gsIGluZGV4KTogQ2x1YkxvY2tlck1hdGNoID0+IHtcbiAgICBjb25zdCBleHRlcm5hbElkID0gcmVhZFJlcXVpcmVkU3RyaW5nKG1hdGNoLmV4dGVybmFsSWQsIFwiZXh0ZXJuYWxJZFwiLCBpbmRleCk7XG4gICAgaWYgKHNlZW4uaGFzKGV4dGVybmFsSWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENsdWIgTG9ja2VyIHJldHVybmVkIGR1cGxpY2F0ZSBtYXRjaCBJRCBcIiR7ZXh0ZXJuYWxJZH1cImApO1xuICAgIH1cbiAgICBzZWVuLmFkZChleHRlcm5hbElkKTtcblxuICAgIGNvbnN0IHN0YXJ0c0F0ID0gcmVhZFRpbWVzdGFtcFdpdGhUaW1lem9uZShtYXRjaC5zdGFydHNBdCwgXCJzdGFydHNBdFwiLCBpbmRleCk7XG4gICAgY29uc3QgZW5kc0F0ID0gcmVhZFRpbWVzdGFtcFdpdGhUaW1lem9uZShtYXRjaC5lbmRzQXQsIFwiZW5kc0F0XCIsIGluZGV4KTtcbiAgICBpZiAoRGF0ZS5wYXJzZShlbmRzQXQpIDw9IERhdGUucGFyc2Uoc3RhcnRzQXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBtdXN0IGVuZCBhZnRlciBpdCBzdGFydHNgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgbWF0Y2guc3RhdHVzICE9IG51bGwgJiZcbiAgICAgIG1hdGNoLnN0YXR1cyAhPT0gXCJ1cGNvbWluZ1wiICYmXG4gICAgICBtYXRjaC5zdGF0dXMgIT09IFwiY29tcGxldGVkXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2ggJHtpbmRleCArIDF9IGhhcyBhbiBpbnZhbGlkIHN0YXR1c2ApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5wbGF5ZXJJZCwgXCJwbGF5ZXJJZFwiLCBpbmRleCksXG4gICAgICBwbGF5ZXJOYW1lOlxuICAgICAgICB0eXBlb2YgbWF0Y2gucGxheWVyTmFtZSA9PT0gXCJzdHJpbmdcIiA/IG1hdGNoLnBsYXllck5hbWUudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgb3Bwb25lbnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5vcHBvbmVudCwgXCJvcHBvbmVudFwiLCBpbmRleCksXG4gICAgICBzdGFydHNBdCxcbiAgICAgIGVuZHNBdCxcbiAgICAgIHZlbnVlOiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gudmVudWUsIFwidmVudWVcIiwgaW5kZXgpLFxuICAgICAgY291cnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5jb3VydCwgXCJjb3VydFwiLCBpbmRleCksXG4gICAgICBzdGF0dXM6XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJ1cGNvbWluZ1wiIHx8IG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIlxuICAgICAgICAgID8gbWF0Y2guc3RhdHVzXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICByZXN1bHQ6XG4gICAgICAgIHR5cGVvZiBtYXRjaC5yZXN1bHQgPT09IFwic3RyaW5nXCIgfHwgbWF0Y2gucmVzdWx0ID09PSBudWxsXG4gICAgICAgICAgPyBtYXRjaC5yZXN1bHRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBtYXRjaGVzQnlQbGF5ZXIgPSBuZXcgTWFwPHN0cmluZywgQ2x1YkxvY2tlck1hdGNoW10+KCk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IHBsYXllck1hdGNoZXMgPSBtYXRjaGVzQnlQbGF5ZXIuZ2V0KG1hdGNoLnBsYXllcklkKSA/PyBbXTtcbiAgICBwbGF5ZXJNYXRjaGVzLnB1c2gobWF0Y2gpO1xuICAgIG1hdGNoZXNCeVBsYXllci5zZXQobWF0Y2gucGxheWVySWQsIHBsYXllck1hdGNoZXMpO1xuICB9XG4gIGZvciAoY29uc3QgW3BsYXllcklkLCBwbGF5ZXJNYXRjaGVzXSBvZiBtYXRjaGVzQnlQbGF5ZXIpIHtcbiAgICBwbGF5ZXJNYXRjaGVzLnNvcnQoXG4gICAgICAobGVmdCwgcmlnaHQpID0+IERhdGUucGFyc2UobGVmdC5zdGFydHNBdCkgLSBEYXRlLnBhcnNlKHJpZ2h0LnN0YXJ0c0F0KSxcbiAgICApO1xuICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBwbGF5ZXJNYXRjaGVzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgcHJldmlvdXMgPSBwbGF5ZXJNYXRjaGVzW2luZGV4IC0gMV07XG4gICAgICBjb25zdCBjdXJyZW50ID0gcGxheWVyTWF0Y2hlc1tpbmRleF07XG4gICAgICBpZiAoRGF0ZS5wYXJzZShjdXJyZW50LnN0YXJ0c0F0KSA8IERhdGUucGFyc2UocHJldmlvdXMuZW5kc0F0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIG92ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHBsYXllciBJRCBcIiR7cGxheWVySWR9XCJgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYXllck5hbWVzQnlJZCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IHBsYXllcnMgPSBBcnJheS5pc0FycmF5KHJhdy5wbGF5ZXJzKVxuICAgID8gcmF3LnBsYXllcnMubWFwKChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghcGxheWVyIHx8IHR5cGVvZiBwbGF5ZXIgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsYXllciAke2luZGV4ICsgMX0gaXMgaW52YWxpZGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5ZXIgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICAgIGNvbnN0IGlkID0gcmVhZFJlcXVpcmVkU3RyaW5nKGl0ZW0uaWQsIFwicGxheWVyIGlkXCIsIGluZGV4KTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHJlYWRSZXF1aXJlZFN0cmluZyhpdGVtLm5hbWUsIFwicGxheWVyIG5hbWVcIiwgaW5kZXgpO1xuICAgICAgICBjb25zdCBleGlzdGluZ05hbWUgPSBwbGF5ZXJOYW1lc0J5SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nTmFtZSAhPT0gdW5kZWZpbmVkICYmIGV4aXN0aW5nTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBjb25mbGljdGluZyBuYW1lcyBmb3IgcGxheWVyIElEIFwiJHtpZH1cImAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJOYW1lc0J5SWQuc2V0KGlkLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHsgaWQsIG5hbWUgfTtcbiAgICAgIH0pXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSBPYmplY3QuZnJlZXplKG1hdGNoKTtcbiAgT2JqZWN0LmZyZWV6ZShtYXRjaGVzKTtcbiAgaWYgKHBsYXllcnMpIHtcbiAgICBmb3IgKGNvbnN0IHBsYXllciBvZiBwbGF5ZXJzKSBPYmplY3QuZnJlZXplKHBsYXllcik7XG4gICAgT2JqZWN0LmZyZWV6ZShwbGF5ZXJzKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHsgbWF0Y2hlcywgcGxheWVycyB9KTtcbn1cblxuLy8gVGhlIHBsYWNlaG9sZGVyIGRyYXcgYSBuZXcgdHJhY2tlciBzdGFydHMgd2l0aCAoSU5JVElBTF9TVEFURSBpblxuLy8gcm91dGVzL3RyYWNrZXIudHMpIGlzIGRyb3BwZWQgb25jZSBhIHJlYWwgQ2x1YiBMb2NrZXIgc2NoZWR1bGUgYXJyaXZlcy5cbmNvbnN0IFNBTVBMRV9QTEFZRVJfSUQgPSBcImNhbWVyb24tc3RhaXRcIjtcblxuZnVuY3Rpb24gd2l0aG91dFNhbXBsZURyYXcoc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlKTogUmVhZG9ubHlUcmFja2VyU3RhdGUge1xuICBjb25zdCBtYXRjaGVzID0gc3RhdGUubWF0Y2hlcy5maWx0ZXIoXG4gICAgKG1hdGNoKSA9PiAhKG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgJiYgbWF0Y2gucGxheWVySWQgPT09IFNBTVBMRV9QTEFZRVJfSUQpLFxuICApO1xuICBjb25zdCBwbGF5ZXJzID0gbWF0Y2hlcy5zb21lKChtYXRjaCkgPT4gbWF0Y2gucGxheWVySWQgPT09IFNBTVBMRV9QTEFZRVJfSUQpXG4gICAgPyBzdGF0ZS5wbGF5ZXJzXG4gICAgOiBzdGF0ZS5wbGF5ZXJzLmZpbHRlcigocGxheWVyKSA9PiBwbGF5ZXIuaWQgIT09IFNBTVBMRV9QTEFZRVJfSUQpO1xuICByZXR1cm4geyAuLi5zdGF0ZSwgbWF0Y2hlcywgcGxheWVycyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDbHViTG9ja2VyRmVlZChcbiAgbG9hZGVkU3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICBmZWVkOiBSZWFkb25seUNsdWJMb2NrZXJGZWVkLFxuKTogVHJhY2tlclN0YXRlIHtcbiAgY29uc3Qgc3RhdGUgPSB3aXRob3V0U2FtcGxlRHJhdyhsb2FkZWRTdGF0ZSk7XG4gIGNvbnN0IGN1cnJlbnRCeUV4dGVybmFsSWQgPSBuZXcgTWFwKFxuICAgIHN0YXRlLm1hdGNoZXNcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChtYXRjaCk6IG1hdGNoIGlzIHR5cGVvZiBtYXRjaCAmIHsgZXh0ZXJuYWxJZDogc3RyaW5nIH0gPT5cbiAgICAgICAgICBtYXRjaC5leHRlcm5hbElkICE9PSBudWxsLFxuICAgICAgKVxuICAgICAgLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbmNvbWluZ0J5RXh0ZXJuYWxJZCA9IG5ldyBNYXAoXG4gICAgZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbXBvcnRlZElkcyA9IG5ldyBTZXQoZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpKTtcbiAgY29uc3QgbG9jYWxseVJldGFpbmVkID0gc3RhdGUubWF0Y2hlcy5maWx0ZXIoXG4gICAgKG1hdGNoKSA9PlxuICAgICAgKG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHwgIWltcG9ydGVkSWRzLmhhcyhtYXRjaC5leHRlcm5hbElkKSkgJiZcbiAgICAgIChtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwpLFxuICApO1xuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IG92ZXJsYXBzUmV0YWluZWRNYXRjaCA9IGxvY2FsbHlSZXRhaW5lZC5zb21lKFxuICAgICAgKHJldGFpbmVkTWF0Y2gpID0+XG4gICAgICAgIHJldGFpbmVkTWF0Y2gucGxheWVySWQgPT09IGluY29taW5nLnBsYXllcklkICYmXG4gICAgICAgIERhdGUucGFyc2UoaW5jb21pbmcuc3RhcnRzQXQpIDwgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLmVuZHNBdCkgJiZcbiAgICAgICAgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLnN0YXJ0c0F0KSA8IERhdGUucGFyc2UoaW5jb21pbmcuZW5kc0F0KSxcbiAgICApO1xuICAgIGlmIChvdmVybGFwc1JldGFpbmVkTWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIGEgbWF0Y2ggb3ZlcmxhcHBpbmcgYSByZXRhaW5lZCBtYXRjaCBmb3IgcGxheWVyIElEIFwiJHtpbmNvbWluZy5wbGF5ZXJJZH1cImAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJldGFpbmVkID0gc3RhdGUubWF0Y2hlc1xuICAgIC5maWx0ZXIoXG4gICAgICAobWF0Y2gpID0+XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHxcbiAgICAgICAgaW1wb3J0ZWRJZHMuaGFzKG1hdGNoLmV4dGVybmFsSWQpIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwsXG4gICAgKVxuICAgIC5tYXAoKG1hdGNoKSA9PiB7XG4gICAgICBjb25zdCBpbmNvbWluZyA9XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGxcbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDogaW5jb21pbmdCeUV4dGVybmFsSWQuZ2V0KG1hdGNoLmV4dGVybmFsSWQpO1xuICAgICAgLy8gQSByZXN1bHQgcmVjb3JkZWQgaW4gQ2x1YiBMb2NrZXIgY2xvc2VzIG91dCBhIG1hdGNoIHN0YWZmIGhhdmUgbm90XG4gICAgICAvLyBjbG9zZWQgeWV0OyBhIHJlc3VsdCBzdGFmZiBlbnRlcmVkIHRoZW1zZWx2ZXMgaXMgbmV2ZXIgb3ZlcndyaXR0ZW4uXG4gICAgICBjb25zdCBhZG9wdFJlc3VsdCA9XG4gICAgICAgIGluY29taW5nPy5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIgJiYgbWF0Y2guc3RhdHVzID09PSBcInVwY29taW5nXCI7XG4gICAgICByZXR1cm4gaW5jb21pbmdcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAuLi5jbG9uZVRyYWNrZXJNYXRjaChtYXRjaCksXG4gICAgICAgICAgICBwbGF5ZXJJZDogaW5jb21pbmcucGxheWVySWQsXG4gICAgICAgICAgICBvcHBvbmVudDogaW5jb21pbmcub3Bwb25lbnQsXG4gICAgICAgICAgICBzdGFydHNBdDogaW5jb21pbmcuc3RhcnRzQXQsXG4gICAgICAgICAgICBlbmRzQXQ6IGluY29taW5nLmVuZHNBdCxcbiAgICAgICAgICAgIHZlbnVlOiBpbmNvbWluZy52ZW51ZSxcbiAgICAgICAgICAgIGNvdXJ0OiBpbmNvbWluZy5jb3VydCxcbiAgICAgICAgICAgIC4uLihhZG9wdFJlc3VsdFxuICAgICAgICAgICAgICA/IHsgc3RhdHVzOiBcImNvbXBsZXRlZFwiIGFzIGNvbnN0LCByZXN1bHQ6IGluY29taW5nLnJlc3VsdCA/PyBudWxsIH1cbiAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgfVxuICAgICAgICA6IGNsb25lVHJhY2tlck1hdGNoKG1hdGNoKTtcbiAgICB9KTtcblxuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY3VycmVudEJ5RXh0ZXJuYWxJZC5nZXQoaW5jb21pbmcuZXh0ZXJuYWxJZCk7XG4gICAgaWYgKGV4aXN0aW5nKSBjb250aW51ZTtcblxuICAgIHJldGFpbmVkLnB1c2goe1xuICAgICAgaWQ6IGBjbHViLWxvY2tlcjoke0J1ZmZlci5mcm9tKGluY29taW5nLmV4dGVybmFsSWQpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpfWAsXG4gICAgICBleHRlcm5hbElkOiBpbmNvbWluZy5leHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICBjb2FjaElkOiBcInVuYXNzaWduZWRcIixcbiAgICAgIHN0YXR1czogaW5jb21pbmcuc3RhdHVzID8/IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogaW5jb21pbmcucmVzdWx0ID8/IG51bGwsXG4gICAgICByZXBvcnQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwbGF5ZXJzQnlJZCA9IG5ldyBNYXAoXG4gICAgc3RhdGUucGxheWVycy5tYXAoKHBsYXllcikgPT4gW3BsYXllci5pZCwgeyAuLi5wbGF5ZXIgfV0pLFxuICApO1xuICBmb3IgKGNvbnN0IHBsYXllciBvZiBmZWVkLnBsYXllcnMgPz8gW10pIHtcbiAgICBwbGF5ZXJzQnlJZC5zZXQocGxheWVyLmlkLCB7XG4gICAgICAuLi5wbGF5ZXIsXG4gICAgICBzaGFyZVRva2VuOiBwbGF5ZXJzQnlJZC5nZXQocGxheWVyLmlkKT8uc2hhcmVUb2tlbixcbiAgICB9KTtcbiAgfVxuICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGlmICghcGxheWVyc0J5SWQuaGFzKG1hdGNoLnBsYXllcklkKSkge1xuICAgICAgcGxheWVyc0J5SWQuc2V0KG1hdGNoLnBsYXllcklkLCB7XG4gICAgICAgIGlkOiBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgICAgbmFtZTogbWF0Y2gucGxheWVyTmFtZSB8fCBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYnJhbmRpbmc6IHN0YXRlLmJyYW5kaW5nID8geyAuLi5zdGF0ZS5icmFuZGluZyB9IDogdW5kZWZpbmVkLFxuICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMubWFwKChjb2FjaCkgPT4gKHsgLi4uY29hY2ggfSkpLFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgICAgICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgICksXG4gICAgfSxcbiAgICBwbGF5ZXJzOiBbLi4ucGxheWVyc0J5SWQudmFsdWVzKCldLFxuICAgIG1hdGNoZXM6IHJldGFpbmVkLFxuICAgIGxhc3RVcGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBzb3VyY2U6IFwiY2x1Yi1sb2NrZXJcIixcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gIGxvYWRTdGF0ZTogKCkgPT4gUHJvbWlzZTxSZWFkb25seVRyYWNrZXJTdGF0ZT4sXG4gIGxvYWRGZWVkOiAoKSA9PiBQcm9taXNlPFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQ+LFxuICBwZXJzaXN0U3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuICBhbGVydFRocmVzaG9sZCA9IDMsXG4pOiBQcm9taXNlPFRyYWNrZXJTdGF0ZT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZChhd2FpdCBsb2FkRmVlZCgpKTtcbiAgY29uc3Qgc3RhdGUgPSBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgICBtZXJnZUNsdWJMb2NrZXJGZWVkKGF3YWl0IGxvYWRTdGF0ZSgpLCBmZWVkKSxcbiAgICBhbGVydFRocmVzaG9sZCxcbiAgKTtcbiAgYXdhaXQgcGVyc2lzdFN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHN0YXRlO1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxVQUFVOzs7QUNHakIsSUFBTSxrQkFBa0I7QUFLeEIsSUFBTSx3QkFBd0I7QUE2QjlCLElBQU0sT0FBTyxDQUFDLFVBQ1osT0FBTyxVQUFVLFdBQVcsTUFBTSxLQUFLLElBQUk7QUFFN0MsSUFBTSxXQUFXLENBQUMsVUFDaEIsT0FBTyxVQUFVLFlBQVksUUFBUSxJQUNqQyxPQUFPLEtBQUssSUFDWixPQUFPLFVBQVUsWUFBWSxRQUFRLEtBQUssTUFBTSxLQUFLLENBQUMsSUFDcEQsTUFBTSxL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Q0FBQyxDQUFDO0FBQUEsSUFDMUU7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sU0FBUyxvQkFBb0IsVUFBVSxvQkFBb0IsTUFBTSxDQUFDO0FBRXhFLFNBQU8sTUFBTSxPQUFPLFFBQVEsQ0FBQyxHQUFHLFFBQVEsV0FBVztBQUNuRCxTQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsR0FBRyxRQUFRLGlDQUE0QjtBQUNwRSxTQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsR0FBRyxTQUFTLE1BQU07QUFDakQsQ0FBQztBQUVELEtBQUsscUVBQXFFLE1BQU07QUFDOUUsUUFBTSxjQUFjO0FBQUEsSUFDbEIsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFDQSxRQUFNLFNBQVM7QUFBQSxJQUNiLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztBQUFBLElBQzFCLFNBQVMsQ0FBQyxFQUFFLElBQUksaUJBQWlCLE1BQU0sZ0JBQWdCLENBQUM7QUFBQSxJQUN4RCxRQUFRO0FBQUEsRUFDVjtBQUVBLFFBQU0sU0FBUztBQUFBLElBQ2I7QUFBQSxJQUNBLG9CQUFvQixZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLGtCQUFrQixDQUFDO0FBQUEsRUFDckY7QUFFQSxTQUFPLFVBQVUsT0FBTyxRQUFRLElBQUksQ0FBQyxXQUFXLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ25FLFNBQU8sVUFBVSxPQUFPLFFBQVEsSUFBSSxDQUFDLFVBQVUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUN0RixDQUFDO0FBRUQsS0FBSyxzRUFBc0UsTUFBTTtBQUMvRSxRQUFNLFNBQVM7QUFBQSxJQUNiO0FBQUEsTUFDRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxLQUFLLFFBQVEsS0FBSyxPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUEsTUFDMUU7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLFdBQVcsb0JBQW9CLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTTtBQUMxRCxRQUFNLGNBQWM7QUFBQSxJQUNsQixHQUFHO0FBQUEsSUFDSCxTQUFTLFNBQVMsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxRQUFRLDRCQUF1QixFQUFFO0FBQUEsRUFDekY7QUFFQSxRQUFNLFNBQVMsb0JBQW9CLGFBQWEsTUFBTTtBQUN0RCxTQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsR0FBRyxRQUFRLDJCQUFzQjtBQUNoRSxDQUFDOyIsCiAgIm5hbWVzIjogWyJ0b3VybmFtZW50IiwgImRyYXciXQp9Cg==
