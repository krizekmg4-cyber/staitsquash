import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const trackerStateTable = pgTable("tracker_state", {
  id: text("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const trackerStateBackupTable = pgTable("tracker_state_backup", {
  id: text("id").primaryKey(),
  trackerStateId: text("tracker_state_id").notNull(),
  rejectedData: jsonb("rejected_data").notNull(),
  rejectionDetails: text("rejection_details").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const trackerRecoveryAuditTable = pgTable("tracker_recovery_audit", {
  id: text("id").primaryKey(),
  trackerStateId: text("tracker_state_id").notNull(),
  backupId: text("backup_id")
    .notNull()
    .references(() => trackerStateBackupTable.id),
  actorId: text("actor_id").notNull(),
  reason: text("reason").notNull(),
  recoveredAt: timestamp("recovered_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TrackerStateRow = typeof trackerStateTable.$inferSelect;
export type TrackerStateBackupRow = typeof trackerStateBackupTable.$inferSelect;
export type TrackerRecoveryAuditRow =
  typeof trackerRecoveryAuditTable.$inferSelect;