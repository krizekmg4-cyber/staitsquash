---
name: API bundle smoke validation
description: Constraints for validating that the production API bundle can load without interfering with the development service.
---

Production bundle validation must launch the generated output with production settings on an isolated, OS-assigned positive port and must terminate the child process before exiting.

**Why:** Compilation cannot detect runtime packaging failures, while port zero is intentionally rejected by the API's production port validation. A smoke check also must not bind the configured development port or leave a server behind.

**How to apply:** Keep the smoke check after the production build in the registered validation gate. Reserve and release an ephemeral port before launch, wait for confirmed startup, and enforce startup and shutdown timeouts. Harness self-tests for ordinary startup and early crashes need multi-second startup allowances for loaded CI hosts; use a short allowance only for the fixture intentionally testing timeout behavior.