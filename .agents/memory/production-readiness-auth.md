---
name: Production readiness and auth
description: A publishing probe differs from a real browser's proxied authentication request.
---

Publishing readiness requests may use an internal hostname without a trusted public forwarded host. Health checks must be served without authentication middleware or public-host resolution.

**Why:** A publish attempt compiled successfully but failed startup because Clerk's host-derived key helper received an empty host before the readiness endpoint could respond. Preview browser requests did not expose this production-only failure.

**How to apply:** Preserve the host allowlist for real proxied authentication. When no trusted host exists, do not pass an empty string to host-derived key helpers. Verify the production bundle with direct internal-host readiness requests and confirm protected endpoints still reject unauthenticated callers.
