import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * The permanent coaching record. One row per played match, saved automatically and kept on its own,
 * so nothing done on the live board (removing a kid, a reset, a restore, a new tournament) can erase
 * it. Names are copied in, so the record stays readable after a coach is renamed or a kid is removed.
 */
export const coachingLedgerTable = pgTable("coaching_ledger", {
  matchKey: text("match_key").primaryKey(),
  tournamentId: text("tournament_id"),
  tournamentName: text("tournament_name").notNull(),
  tournamentEndsOn: text("tournament_ends_on"),
  venue: text("venue").notNull(),
  timeZone: text("time_zone"),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  playerId: text("player_id").notNull(),
  playerName: text("player_name").notNull(),
  opponentName: text("opponent_name").notNull(),
  opponentId: text("opponent_id"),
  coachId: text("coach_id").notNull(),
  coachName: text("coach_name").notNull(),
  coachMode: text("coach_mode"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** A player's private journal. Only the player's own link reads or writes these; no staff screen shows them. */
export const playerNotesTable = pgTable(
  "player_notes",
  {
    id: text("id").primaryKey(),
    playerId: text("player_id").notNull(),
    opponentId: text("opponent_id"),
    opponentName: text("opponent_name").notNull(),
    matchKey: text("match_key"),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("player_notes_player_idx").on(table.playerId)],
);

export type CoachingLedgerRow = typeof coachingLedgerTable.$inferSelect;
export type PlayerNoteRow = typeof playerNotesTable.$inferSelect;
