---
name: Shared declaration freshness
description: Distinguish stale compiled workspace types from real contract mismatches after source-only Git updates.
---

After checking out shared-library source from an upstream branch without its build output, rebuild library declarations before treating missing-field errors in consuming packages as source defects.

**Why:** Source-only branch updates have left existing compiled declarations behind, causing consumers to reject fields already present in the current generated source.

**How to apply:** Check that the field exists in the library's current source, run the root `pnpm run typecheck:libs`, then rerun the affected package's typecheck. If the source lacks the field or the rebuilt check still fails, investigate the actual contract rather than casting around the error.
