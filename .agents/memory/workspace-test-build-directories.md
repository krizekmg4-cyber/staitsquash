---
name: Workspace test build directories
description: Why temporary bundled test output must remain inside its workspace package
---

Bundled test runners that externalize workspace dependencies should create unique temporary output directories inside the package, not in the operating system temporary directory.

**Why:** Node resolves externalized packages relative to the generated test files. Output under the operating system temporary directory sits outside the workspace dependency tree and cannot resolve workspace packages.

**How to apply:** Use a unique package-local directory for each test process and remove it in a `finally` block after build or test completion.