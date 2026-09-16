---
name: Refresh network lock boundaries
description: Concurrency rule for tracker refreshes that combine database state with third-party calls.
---

Keep Club Locker fetches and staff webhook delivery outside the tracker row-locked transaction. Reserve durable notification work in a short locked mutation before delivery, and restore undelivered work in another short mutation.

**Why:** Holding the tracker row lock during third-party latency blocks unrelated staff edits, while sending without first reserving work allows concurrent API instances to duplicate recovery notices.

**How to apply:** Any future refresh or notification change should use short state-transition transactions around network calls and merge fetched data against the state loaded under the lock.