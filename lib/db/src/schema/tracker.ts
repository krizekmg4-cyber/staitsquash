import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const trackerStateTable = pgTable("tracker_state", {
  id: text("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type TrackerStateRow = typeof trackerStateTable.$inferSelect;