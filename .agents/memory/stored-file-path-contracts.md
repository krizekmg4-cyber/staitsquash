---
name: Stored file-path contracts
description: Keep stored asset paths readable when upload namespaces change.
---

When changing asset upload namespaces, update persisted-state validation alongside API request/response and storage validation, retaining support for previously saved paths.

**Why:** A valid logo saved through the current upload API prevented the entire tracker from loading because the separate persisted-state checker still accepted only the older namespace.

**How to apply:** Verify a newly uploaded asset can be saved and then reloaded through the actual persisted-state parser. Keep traversal and external-URL rejection intact. Fix compatible validators rather than deleting valid assets or resetting tracker data.
