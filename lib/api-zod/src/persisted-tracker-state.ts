import { z } from "zod";

const DateTimeString = z.string().datetime({ offset: true });
const ObjectPath = z.string().regex(/^\/objects\/uploads\/[0-9a-f-]+$/);

const TrackerPerson = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const RefreshRecovery = z.object({
  failedAttempts: z.number().int().min(1),
  outageStartedAt: DateTimeString,
  recoveredAt: DateTimeString,
  outageDurationMs: z.number().int().min(0),
});

const RefreshHealth = z.object({
  consecutiveFailures: z.number().int().min(0),
  alertThreshold: z.number().int().min(1),
  firstFailureAt: DateTimeString.nullable().optional(),
  lastFailureAt: DateTimeString.nullable(),
  alertSentAt: DateTimeString.nullable(),
  failureAlertClaimedAt: DateTimeString.nullable().optional(),
  pendingRecoveries: z.array(RefreshRecovery).optional(),
  pendingRecovery: RefreshRecovery.nullable().optional(),
  recoveryClaim: z.object({
    outageStartedAt: DateTimeString,
    recoveredAt: DateTimeString,
    claimedAt: DateTimeString,
  }).nullable().optional(),
});

const CoachReport = z.object({
  matchId: z.string().min(1),
  observations: z.array(z.string().min(1)).length(3),
  transcript: z.string().nullable(),
  audioPath: ObjectPath.nullable().optional(),
  updatedAt: DateTimeString,
});

const TrackerMatch = z.object({
  id: z.string().min(1),
  externalId: z.string().nullable(),
  playerId: z.string().min(1),
  opponent: z.string().min(1),
  startsAt: DateTimeString,
  endsAt: DateTimeString,
  venue: z.string().min(1),
  court: z.string().min(1),
  coachId: z.string().min(1),
  status: z.enum(["upcoming", "completed"]),
  result: z.string().nullable(),
  report: CoachReport.nullable(),
});

export const PersistedTrackerState = z.object({
  players: z.array(TrackerPerson),
  coaches: z.array(TrackerPerson),
  branding: z
    .object({
      name: z.string().min(1).max(80),
      logoPath: ObjectPath.nullable().optional(),
      logoUrl: z.string().nullable().optional(),
    })
    .optional(),
  matches: z.array(TrackerMatch),
  lastUpdatedAt: DateTimeString,
  source: z.enum(["sample", "club-locker"]),
  refreshHealth: RefreshHealth.optional(),
});

export type PersistedTrackerState = z.infer<typeof PersistedTrackerState>;