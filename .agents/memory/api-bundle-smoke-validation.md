---
name: API bundle smoke validation
description: Constraints for validating that the production API bundle can load without interfering with the development service.
---

Production bundle validation must launch the generated output with production settings on an isolated, OS-assigned positive port, confirm startup from a strictly parsed structured event on stdout, successfully request the stable readiness endpoint, and terminate the child process before exiting.

**Why:** Compilation and a listening socket cannot detect runtime packaging, routing, or middleware initialization failures. Port zero is intentionally rejected by the API's production port validation. A loose phrase match can be spoofed by diagnostics or errors, and a smoke check also must not bind the configured development port or leave a server behind.

**How to apply:** Keep the smoke check after the production build in the registered validation gate. Reserve and release an ephemeral port before launch, require the expected info-level event and allocated port from stdout JSON, then require a successful request to the readiness route before stopping the child. Enforce startup and shutdown timeouts. Harness self-tests for ordinary startup and early crashes need multi-second startup allowances for loaded CI hosts; use a short allowance only for the fixture intentionally testing timeout behavior.