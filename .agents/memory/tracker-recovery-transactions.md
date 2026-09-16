---
name: Tracker recovery transactions
description: Safety boundary for replacing tracker state after persisted-snapshot validation fails.
---

Recovery may replace tracker state only after locking and revalidating the current raw snapshot, and the raw backup, reset, and audit record must commit in one database transaction.

**Why:** Recovery must preserve rejected evidence while ensuring a concurrent repair or any write failure cannot cause valid state to be overwritten or leave an unaudited reset.

**How to apply:** Keep the valid-snapshot refusal inside the same row-locking transaction as backup and replacement. Treat any backup, reset, or audit failure as a rollback and return a non-sensitive operational error.