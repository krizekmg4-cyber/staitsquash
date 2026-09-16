export type TrackerState = {
  players: Array<{ id: string; name: string }>;
  coaches: Array<{ id: string; name: string }>;
  matches: Array<{
    id: string;
    externalId: string | null;
    playerId: string;
    opponent: string;
    startsAt: string;
    endsAt: string;
    venue: string;
    court: string;
    coachId: string;
    status: "upcoming" | "completed";
    result: string | null;
    report: {
      matchId: string;
      observations: string[];
      transcript: string | null;
      updatedAt: string;
    } | null;
  }>;
  lastUpdatedAt: string;
  source: "sample" | "club-locker";
  refreshHealth: RefreshHealth;
};

export type RefreshHealth = {
  consecutiveFailures: number;
  alertThreshold: number;
  firstFailureAt: string | null;
  lastFailureAt: string | null;
  alertSentAt: string | null;
  pendingRecovery: RefreshRecovery | null;
};

export type RefreshRecovery = {
  failedAttempts: number;
  outageStartedAt: string;
  recoveredAt: string;
  outageDurationMs: number;
};

export function getRefreshRecovery(
  state: TrackerState,
  recoveredAt = new Date().toISOString(),
): RefreshRecovery | null {
  const { alertSentAt, consecutiveFailures, firstFailureAt } =
    state.refreshHealth;
  if (
    alertSentAt === null ||
    consecutiveFailures === 0 ||
    firstFailureAt === null
  ) {
    return null;
  }

  return {
    failedAttempts: consecutiveFailures,
    outageStartedAt: firstFailureAt,
    recoveredAt,
    outageDurationMs: Math.max(
      0,
      Date.parse(recoveredAt) - Date.parse(firstFailureAt),
    ),
  };
}

export function clearRefreshFailures(
  state: TrackerState,
  alertThreshold: number,
  recoveredAt = new Date().toISOString(),
): TrackerState {
  const pendingRecovery =
    state.refreshHealth.pendingRecovery ??
    getRefreshRecovery(state, recoveredAt);
  return {
    ...state,
    refreshHealth: {
      consecutiveFailures: 0,
      alertThreshold,
      firstFailureAt: null,
      lastFailureAt: null,
      alertSentAt: null,
      pendingRecovery,
    },
  };
}

export function clearPendingRecovery(state: TrackerState): TrackerState {
  return {
    ...state,
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecovery: null,
    },
  };
}

export function recordRefreshFailure(
  state: TrackerState,
  alertThreshold: number,
  failedAt = new Date().toISOString(),
): TrackerState {
  return {
    ...state,
    refreshHealth: {
      consecutiveFailures: state.refreshHealth.consecutiveFailures + 1,
      alertThreshold,
      firstFailureAt: state.refreshHealth.firstFailureAt ?? failedAt,
      lastFailureAt: failedAt,
      alertSentAt: state.refreshHealth.alertSentAt,
      pendingRecovery: state.refreshHealth.pendingRecovery,
    },
  };
}

export type ClubLockerMatch = {
  externalId: string;
  playerId: string;
  playerName?: string;
  opponent: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  court: string;
  status?: "upcoming" | "completed";
  result?: string | null;
};

export type ClubLockerFeed = {
  matches: ClubLockerMatch[];
  players?: Array<{ id: string; name: string }>;
};

function readRequiredString(value: unknown, field: string, index: number): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return value.trim();
}

export function parseClubLockerFeed(value: unknown): ClubLockerFeed {
  if (
    !value ||
    typeof value !== "object" ||
    !Array.isArray((value as { matches?: unknown }).matches)
  ) {
    throw new Error("The Club Locker response does not contain a matches array");
  }

  const raw = value as {
    matches: Array<Record<string, unknown>>;
    players?: unknown;
  };
  const seen = new Set<string>();
  const matches = raw.matches.map((match, index): ClubLockerMatch => {
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
    if (
      match.status != null &&
      match.status !== "upcoming" &&
      match.status !== "completed"
    ) {
      throw new Error(`Match ${index + 1} has an invalid status`);
    }

    return {
      externalId,
      playerId: readRequiredString(match.playerId, "playerId", index),
      playerName:
        typeof match.playerName === "string" ? match.playerName.trim() : undefined,
      opponent: readRequiredString(match.opponent, "opponent", index),
      startsAt,
      endsAt,
      venue: readRequiredString(match.venue, "venue", index),
      court: readRequiredString(match.court, "court", index),
      status:
        match.status === "upcoming" || match.status === "completed"
          ? match.status
          : undefined,
      result:
        typeof match.result === "string" || match.result === null
          ? match.result
          : undefined,
    };
  });

  const matchesByPlayer = new Map<string, ClubLockerMatch[]>();
  for (const match of matches) {
    const playerMatches = matchesByPlayer.get(match.playerId) ?? [];
    playerMatches.push(match);
    matchesByPlayer.set(match.playerId, playerMatches);
  }
  for (const [playerId, playerMatches] of matchesByPlayer) {
    playerMatches.sort(
      (left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt),
    );
    for (let index = 1; index < playerMatches.length; index += 1) {
      const previous = playerMatches[index - 1];
      const current = playerMatches[index];
      if (Date.parse(current.startsAt) < Date.parse(previous.endsAt)) {
        throw new Error(
          `Club Locker returned overlapping matches for player ID "${playerId}"`,
        );
      }
    }
  }

  const playerNamesById = new Map<string, string>();
  const players = Array.isArray(raw.players)
    ? raw.players.map((player, index) => {
        if (!player || typeof player !== "object") {
          throw new Error(`Player ${index + 1} is invalid`);
        }
        const item = player as Record<string, unknown>;
        const id = readRequiredString(item.id, "player id", index);
        const name = readRequiredString(item.name, "player name", index);
        const existingName = playerNamesById.get(id);
        if (existingName !== undefined && existingName !== name) {
          throw new Error(
            `Club Locker returned conflicting names for player ID "${id}"`,
          );
        }
        playerNamesById.set(id, name);
        return { id, name };
      })
    : undefined;

  return { matches, players };
}

export function mergeClubLockerFeed(
  state: TrackerState,
  feed: ClubLockerFeed,
): TrackerState {
  const currentByExternalId = new Map(
    state.matches
      .filter(
        (match): match is typeof match & { externalId: string } =>
          match.externalId !== null,
      )
      .map((match) => [match.externalId, match]),
  );
  const incomingByExternalId = new Map(
    feed.matches.map((match) => [match.externalId, match]),
  );
  const importedIds = new Set(feed.matches.map((match) => match.externalId));
  const locallyRetained = state.matches.filter(
    (match) =>
      (match.externalId === null || !importedIds.has(match.externalId)) &&
      (match.externalId === null ||
        match.status === "completed" ||
        match.report !== null),
  );
  for (const incoming of feed.matches) {
    const overlapsRetainedMatch = locallyRetained.some(
      (retainedMatch) =>
        retainedMatch.playerId === incoming.playerId &&
        Date.parse(incoming.startsAt) < Date.parse(retainedMatch.endsAt) &&
        Date.parse(retainedMatch.startsAt) < Date.parse(incoming.endsAt),
    );
    if (overlapsRetainedMatch) {
      throw new Error(
        `Club Locker returned a match overlapping a retained match for player ID "${incoming.playerId}"`,
      );
    }
  }

  const retained = state.matches
    .filter(
      (match) =>
        match.externalId === null ||
        importedIds.has(match.externalId) ||
        match.status === "completed" ||
        match.report !== null,
    )
    .map((match) => {
      const incoming =
        match.externalId === null
          ? undefined
          : incomingByExternalId.get(match.externalId);
      return incoming
        ? {
            ...match,
            playerId: incoming.playerId,
            opponent: incoming.opponent,
            startsAt: incoming.startsAt,
            endsAt: incoming.endsAt,
            venue: incoming.venue,
            court: incoming.court,
          }
        : match;
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
      report: null,
    });
  }

  const playersById = new Map(state.players.map((player) => [player.id, player]));
  for (const player of feed.players ?? []) playersById.set(player.id, player);
  for (const match of feed.matches) {
    if (!playersById.has(match.playerId)) {
      playersById.set(match.playerId, {
        id: match.playerId,
        name: match.playerName || match.playerId,
      });
    }
  }

  return {
    ...state,
    players: [...playersById.values()],
    matches: retained,
    lastUpdatedAt: new Date().toISOString(),
    source: "club-locker",
  };
}

export async function refreshTrackerState(
  loadState: () => Promise<TrackerState>,
  loadFeed: () => Promise<ClubLockerFeed>,
  persistState: (state: TrackerState) => Promise<void>,
  alertThreshold = 3,
): Promise<TrackerState> {
  const state = clearRefreshFailures(
    mergeClubLockerFeed(await loadState(), await loadFeed()),
    alertThreshold,
  );
  await persistState(state);
  return state;
}