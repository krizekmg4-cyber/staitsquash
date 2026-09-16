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
};

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

  const players = Array.isArray(raw.players)
    ? raw.players.map((player, index) => {
        if (!player || typeof player !== "object") {
          throw new Error(`Player ${index + 1} is invalid`);
        }
        const item = player as Record<string, unknown>;
        return {
          id: readRequiredString(item.id, "player id", index),
          name: readRequiredString(item.name, "player name", index),
        };
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
  const importedIds = new Set(feed.matches.map((match) => match.externalId));
  const retained = state.matches.filter(
    (match) =>
      match.externalId === null ||
      importedIds.has(match.externalId) ||
      match.status === "completed" ||
      match.report !== null,
  );

  for (const incoming of feed.matches) {
    const existing = currentByExternalId.get(incoming.externalId);
    if (existing) {
      existing.playerId = incoming.playerId;
      existing.opponent = incoming.opponent;
      existing.startsAt = incoming.startsAt;
      existing.endsAt = incoming.endsAt;
      existing.venue = incoming.venue;
      existing.court = incoming.court;
      continue;
    }

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
): Promise<TrackerState> {
  const state = mergeClubLockerFeed(await loadState(), await loadFeed());
  await persistState(state);
  return state;
}