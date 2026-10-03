type TrackerPerson = { id: string; name: string; shareToken?: string };

type TrackerMatch = {
    id: string;
    externalId: string | null;
    playerId: string;
    opponent: string;
    startsAt: string;
    endsAt: string;
    venue: string;
    court: string;
    coachId: string;
    coachMode?: "in-person" | "virtual";
    // Both sides of this match are followed players (StaitSquash vs StaitSquash).
    teammates?: boolean;
    // Set when Club Locker changes the time or court of an upcoming match.
    moved?: { at: string; fromStartsAt: string; fromCourt: string };
    status: "upcoming" | "completed";
    result: string | null;
    report: {
      matchId: string;
      observations: string[];
      transcript: string | null;
      audioPath?: string | null;
      updatedAt: string;
    } | null;
  };

export type TrackerState = {
  players: TrackerPerson[];
  coaches: TrackerPerson[];
  branding?: { name: string; logoPath: string | null };
  matches: TrackerMatch[];
  lastUpdatedAt: string;
  source: "sample" | "club-locker";
  refreshHealth: RefreshHealth;
};

type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly (infer Item)[]
    ? readonly DeepReadonly<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : T;

export type ReadonlyTrackerState = DeepReadonly<TrackerState>;

export type RefreshHealth = {
  consecutiveFailures: number;
  alertThreshold: number;
  firstFailureAt: string | null;
  lastFailureAt: string | null;
  alertSentAt: string | null;
  failureAlertClaimedAt: string | null;
  pendingRecoveries: RefreshRecovery[];
  recoveryClaim: {
    outageStartedAt: string;
    recoveredAt: string;
    claimedAt: string;
  } | null;
};

export type RefreshRecovery = {
  failedAttempts: number;
  outageStartedAt: string;
  recoveredAt: string;
  outageDurationMs: number;
};

export function cloneTrackerState(state: ReadonlyTrackerState): TrackerState {
  return {
    players: state.players.map((player) => ({ ...player })),
    coaches: state.coaches.map((coach) => ({ ...coach })),
    branding: state.branding ? { ...state.branding } : undefined,
    matches: state.matches.map(cloneTrackerMatch),
    lastUpdatedAt: state.lastUpdatedAt,
    source: state.source,
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries,
      ),
    },
  };
}

export function freezeTrackerState(state: TrackerState): ReadonlyTrackerState {
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

function cloneRefreshRecoveries(
  recoveries: readonly DeepReadonly<RefreshRecovery>[],
): RefreshRecovery[] {
  return recoveries.map((recovery) => ({ ...recovery }));
}

export function getRefreshRecovery(
  state: ReadonlyTrackerState,
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
  state: ReadonlyTrackerState,
  alertThreshold: number,
  recoveredAt = new Date().toISOString(),
): TrackerState {
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
      recoveryClaim: replacement.refreshHealth.recoveryClaim,
    },
  };
}

export function clearPendingRecovery(state: ReadonlyTrackerState): TrackerState {
  const replacement = cloneTrackerState(state);
  return {
    ...replacement,
    refreshHealth: {
      ...replacement.refreshHealth,
      pendingRecoveries: replacement.refreshHealth.pendingRecoveries.slice(1),
    },
  };
}

export function recordRefreshFailure(
  state: ReadonlyTrackerState,
  alertThreshold: number,
  failedAt = new Date().toISOString(),
): TrackerState {
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
      recoveryClaim: replacement.refreshHealth.recoveryClaim,
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
  teammates?: boolean;
};

export type ClubLockerFeed = {
  matches: ClubLockerMatch[];
  players?: Array<{ id: string; name: string }>;
};

export type ReadonlyClubLockerFeed = DeepReadonly<ClubLockerFeed>;

function cloneTrackerMatch(match: ReadonlyTrackerState["matches"][number]): TrackerMatch {
  return {
    ...match,
    report:
      match.report === null
        ? null
        : {
            ...match.report,
            observations: [...match.report.observations],
          },
  };
}

function readRequiredString(value: unknown, field: string, index: number): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return value.trim();
}

function readTimestampWithTimezone(
  value: unknown,
  field: string,
  index: number,
): string {
  const timestamp = readRequiredString(value, field, index);
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(timestamp)) {
    throw new Error(
      `Match ${index + 1} ${field} must include an explicit timezone`,
    );
  }
  if (Number.isNaN(Date.parse(timestamp))) {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return timestamp;
}

export function parseClubLockerFeed(value: unknown): ReadonlyClubLockerFeed {
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

    const startsAt = readTimestampWithTimezone(match.startsAt, "startsAt", index);
    const endsAt = readTimestampWithTimezone(match.endsAt, "endsAt", index);
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
      teammates: match.teammates === true ? true : undefined,
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

  for (const match of matches) Object.freeze(match);
  Object.freeze(matches);
  if (players) {
    for (const player of players) Object.freeze(player);
    Object.freeze(players);
  }

  return Object.freeze({ matches, players });
}

// The placeholder draw a new tracker starts with (INITIAL_STATE in
// routes/tracker.ts) is dropped once a real Club Locker schedule arrives.
const SAMPLE_PLAYER_ID = "cameron-stait";

function withoutSampleDraw(
  state: ReadonlyTrackerState,
  feed: ReadonlyClubLockerFeed,
): ReadonlyTrackerState {
  const matches = state.matches.filter(
    (match) => !(match.externalId === null && match.playerId === SAMPLE_PLAYER_ID),
  );
  // Keep the player (and their private link) if anything still refers to them.
  const stillReferenced =
    matches.some((match) => match.playerId === SAMPLE_PLAYER_ID) ||
    feed.matches.some((match) => match.playerId === SAMPLE_PLAYER_ID) ||
    (feed.players ?? []).some((player) => player.id === SAMPLE_PLAYER_ID);
  const players = stillReferenced
    ? state.players
    : state.players.filter((player) => player.id !== SAMPLE_PLAYER_ID);
  return { ...state, matches, players };
}

export type TournamentCoachDefaults = Record<
  string,
  { coachId: string; coachMode: "in-person" | "virtual" }
>;

export function mergeClubLockerFeed(
  loadedState: ReadonlyTrackerState,
  feed: ReadonlyClubLockerFeed,
  tournamentCoaches: TournamentCoachDefaults = {},
  now: Date = new Date(),
): TrackerState {
  const state = withoutSampleDraw(loadedState, feed);
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
      // A result recorded in Club Locker closes out a match staff have not
      // closed yet; a result staff entered themselves is never overwritten.
      const adoptResult =
        incoming?.status === "completed" && match.status === "upcoming";
      if (!incoming) return cloneTrackerMatch(match);
      // A time or court change on a match still to be played is flagged so
      // coaches notice it. "Court TBA" becoming a court is not a move.
      const timeChanged = Date.parse(incoming.startsAt) !== Date.parse(match.startsAt);
      const courtChanged =
        incoming.court !== match.court && !/tba/i.test(match.court);
      const moved =
        match.status === "upcoming" && (timeChanged || courtChanged)
          ? {
              at: now.toISOString(),
              fromStartsAt: match.startsAt,
              fromCourt: match.court,
            }
          : match.moved;
      const next: TrackerMatch = {
        ...cloneTrackerMatch(match),
        playerId: incoming.playerId,
        opponent: incoming.opponent,
        startsAt: incoming.startsAt,
        endsAt: incoming.endsAt,
        venue: incoming.venue,
        court: incoming.court,
        ...(adoptResult
          ? { status: "completed" as const, result: incoming.result ?? null }
          : {}),
      };
      if (incoming.teammates) next.teammates = true;
      else delete next.teammates;
      if (moved) next.moved = moved;
      return next;
    });

  for (const incoming of feed.matches) {
    const existing = currentByExternalId.get(incoming.externalId);
    if (existing) continue;

    // New matches start with their tournament's coach. StaitSquash kids
    // playing each other are not coached unless a coach is picked by hand.
    const tournamentDefault = tournamentCoaches[incoming.externalId.split(":")[0] ?? ""];
    const coachId = incoming.teammates
      ? "not-coaching"
      : tournamentDefault?.coachId ?? "unassigned";
    const realCoach = coachId !== "unassigned" && coachId !== "not-coaching";
    retained.push({
      id: `club-locker:${Buffer.from(incoming.externalId).toString("base64url")}`,
      externalId: incoming.externalId,
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      coachId,
      ...(realCoach && tournamentDefault?.coachMode === "virtual"
        ? { coachMode: "virtual" as const }
        : {}),
      ...(incoming.teammates ? { teammates: true } : {}),
      status: incoming.status ?? "upcoming",
      result: incoming.result ?? null,
      report: null,
    });
  }

  const playersById = new Map(
    state.players.map((player) => [player.id, { ...player }]),
  );
  for (const player of feed.players ?? []) {
    playersById.set(player.id, {
      ...player,
      shareToken: playersById.get(player.id)?.shareToken,
    });
  }
  for (const match of feed.matches) {
    if (!playersById.has(match.playerId)) {
      playersById.set(match.playerId, {
        id: match.playerId,
        name: match.playerName || match.playerId,
      });
    }
  }

  return {
    branding: state.branding ? { ...state.branding } : undefined,
    coaches: state.coaches.map((coach) => ({ ...coach })),
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries,
      ),
    },
    players: [...playersById.values()],
    matches: retained,
    lastUpdatedAt: new Date().toISOString(),
    source: "club-locker",
  };
}

export async function refreshTrackerState(
  loadState: () => Promise<ReadonlyTrackerState>,
  loadFeed: () => Promise<ReadonlyClubLockerFeed>,
  persistState: (state: TrackerState) => Promise<void>,
  alertThreshold = 3,
): Promise<TrackerState> {
  const feed = parseClubLockerFeed(await loadFeed());
  const state = clearRefreshFailures(
    mergeClubLockerFeed(await loadState(), feed),
    alertThreshold,
  );
  await persistState(state);
  return state;
}