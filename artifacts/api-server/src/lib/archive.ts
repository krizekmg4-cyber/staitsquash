import type { ReadonlyTrackerState } from "./club-locker.js";

/** One played match, as kept in the permanent coaching record. */
export type LedgerRow = {
  matchKey: string;
  tournamentId: string | null;
  tournamentName: string;
  tournamentEndsOn: string | null;
  venue: string;
  timeZone: string | null;
  startsAt: string;
  playerId: string;
  playerName: string;
  opponentName: string;
  opponentId: string | null;
  coachId: string;
  coachName: string;
  coachMode: string | null;
};

export type TournamentNames = Map<string, { name: string; endsOn: string | null }>;

export type TournamentLookup = (id: string) => Promise<{ name: string; endsOn: string | null } | null>;

const lookupCache = new Map<string, { value: { name: string; endsOn: string | null } | null; at: number }>();

/**
 * The tournament's real name and last day from Club Locker's public record, for tournaments that are not in the
 * weekly setup list (a name is otherwise just a venue). Remembered while the server runs; a failed lookup is retried
 * after a few minutes. Never throws.
 */
export const clubLockerTournamentLookup: TournamentLookup = async (id) => {
  const cached = lookupCache.get(id);
  if (cached && (cached.value || Date.now() - cached.at < 5 * 60_000)) return cached.value;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://api.ussquash.com/resources/tournaments/${encodeURIComponent(id)}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const record = (await response.json()) as { Tournament_Name?: unknown; End_Date?: unknown };
    const name = typeof record.Tournament_Name === "string" ? record.Tournament_Name.trim() : "";
    const endsOn = typeof record.End_Date === "string" ? /^\d{4}-\d{2}-\d{2}/.exec(record.End_Date)?.[0] ?? null : null;
    const value = name ? { name, endsOn } : null;
    lookupCache.set(id, { value, at: Date.now() });
    return value;
  } catch {
    lookupCache.set(id, { value: null, at: Date.now() });
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * The rows the permanent record should hold for this board: every played match a coach was decided
 * for. Matches marked Not coaching or with no coach decision are left out. Pure, so it is easy to test.
 */
export function ledgerRowsFromState(state: ReadonlyTrackerState, tournaments: TournamentNames): LedgerRow[] {
  const playerName = new Map(state.players.map((player) => [player.id, player.name]));
  const coachName = new Map(state.coaches.map((coach) => [coach.id, coach.name]));
  const rows: LedgerRow[] = [];
  for (const match of state.matches) {
    if (match.status !== "completed") continue;
    if (match.coachId === "unassigned" || match.coachId === "not-coaching") continue;
    const tournamentId = match.externalId?.split(":")[0] || null;
    const tournament = tournamentId ? tournaments.get(tournamentId) : undefined;
    rows.push({
      matchKey: match.externalId ?? `local:${match.id}`,
      tournamentId,
      tournamentName: tournament?.name ?? match.venue,
      tournamentEndsOn: tournament?.endsOn ?? null,
      venue: match.venue,
      timeZone: match.timeZone ?? null,
      startsAt: new Date(match.startsAt).toISOString(),
      playerId: match.playerId,
      playerName: playerName.get(match.playerId) ?? "Unknown player",
      opponentName: match.opponent,
      opponentId: match.opponentId ?? null,
      coachId: match.coachId,
      coachName: coachName.get(match.coachId) ?? "Unknown coach",
      coachMode: match.coachMode ?? null,
    });
  }
  return rows;
}

/**
 * Copy the board's played matches into the permanent record. Never throws and never blocks the board:
 * if the table is not there yet, the board keeps working and this logs and moves on.
 */
export async function recordLedger(
  state: ReadonlyTrackerState,
  log?: { warn: (obj: unknown, msg?: string) => void },
  lookup: TournamentLookup = clubLockerTournamentLookup,
): Promise<void> {
  try {
    const { db, coachingLedgerTable, trackerStateTable } = await import("@workspace/db");
    const { eq, sql } = await import("drizzle-orm");
    const [setupRow] = await db.select().from(trackerStateTable).where(eq(trackerStateTable.id, "setup"));
    const tournaments: TournamentNames = new Map();
    const stored = (setupRow?.data as { tournaments?: Array<{ id?: unknown; name?: unknown; endsOn?: unknown }> } | undefined)?.tournaments;
    for (const item of stored ?? []) {
      if (typeof item.id === "string") {
        tournaments.set(item.id, { name: typeof item.name === "string" && item.name ? item.name : item.id, endsOn: typeof item.endsOn === "string" ? item.endsOn : null });
      }
    }
    // Tournaments not in the setup list: ask Club Locker for the real name and last day, for these matches and for
    // any already in the record, and fix the stored rows to match.
    const wanted = new Set<string>();
    for (const match of state.matches) {
      const id = match.externalId?.split(":")[0];
      if (id) wanted.add(id);
    }
    const inRecord = await db.selectDistinct({ id: coachingLedgerTable.tournamentId }).from(coachingLedgerTable);
    for (const item of inRecord) if (item.id) wanted.add(item.id);
    for (const id of wanted) {
      if (tournaments.has(id)) continue;
      const info = await lookup(id);
      if (!info) continue;
      tournaments.set(id, info);
      await db.update(coachingLedgerTable)
        .set({ tournamentName: info.name, tournamentEndsOn: info.endsOn })
        .where(eq(coachingLedgerTable.tournamentId, id));
    }
    const rows = ledgerRowsFromState(state, tournaments);
    for (let start = 0; start < rows.length; start += 100) {
      const chunk = rows.slice(start, start + 100).map((row) => ({ ...row, startsAt: new Date(row.startsAt), updatedAt: new Date() }));
      await db.insert(coachingLedgerTable).values(chunk).onConflictDoUpdate({
        target: coachingLedgerTable.matchKey,
        set: {
          tournamentId: sql`excluded.tournament_id`,
          tournamentName: sql`excluded.tournament_name`,
          tournamentEndsOn: sql`excluded.tournament_ends_on`,
          venue: sql`excluded.venue`,
          timeZone: sql`excluded.time_zone`,
          startsAt: sql`excluded.starts_at`,
          playerName: sql`excluded.player_name`,
          opponentName: sql`excluded.opponent_name`,
          opponentId: sql`excluded.opponent_id`,
          coachId: sql`excluded.coach_id`,
          coachName: sql`excluded.coach_name`,
          coachMode: sql`excluded.coach_mode`,
          updatedAt: sql`excluded.updated_at`,
        },
      });
    }
  } catch (error) {
    log?.warn({ err: error }, "Could not update the permanent coaching record");
  }
}
