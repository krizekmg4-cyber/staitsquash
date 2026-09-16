---
name: Read-only state boundaries
description: How to preserve immutability when helpers turn loaded state into mutable replacement state.
---

Helpers that accept read-only loaded state and return mutable replacement state must clone every nested object and array that the caller can mutate.

**Why:** A read-only type blocks direct writes through the input reference, but shared nested references let later mutation of the returned replacement alter the loaded state before persistence succeeds.

**How to apply:** When adding tracker-state fields or refresh helpers, audit the full returned object graph for aliases and add regression assertions that mutate the replacement while checking the loaded state remains unchanged.

Validated external snapshots must also be frozen throughout their object graph before leaving the parser, and parser/loader return types should expose that deep-readonly contract.

**Why:** TypeScript read-only types do not stop mutation through JavaScript, assertions, or mutable aliases; a changed validated snapshot can make retries, comparisons, and logs inconsistent.

**How to apply:** Freeze records before their containing arrays, freeze arrays before the root object, and keep mutable merge outputs detached by cloning snapshot records.