---
name: Staff and player experiences
description: Product direction separating protected staff controls from the player-facing tracker.
---

The app should have two distinct experiences: approved staff use the management interface, while players receive a separate read-only, mobile-friendly link showing upcoming matches, time, venue, court, opponent, assigned coach, results, match history, and coach advice with playable voice notes.

**Why:** The user explicitly confirmed this structure as exactly what they want. The current management interface exposes controls that should not be shared directly with players.

**How to apply:** Keep editing, settings, schedule refreshes, and report management behind staff access. Design player-facing routes around quick phone access and never expose mutation controls there.