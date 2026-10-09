---
name: Staff and player experiences
description: Product direction separating protected staff controls from the player-facing tracker.
---

The app should have two distinct experiences: approved staff use the management interface, while players receive a separate read-only, mobile-friendly link showing upcoming matches, time, venue, court, opponent, assigned coach, results, match history, and coach advice with playable voice notes.

**Why:** The user explicitly confirmed this structure as exactly what they want. The current management interface exposes controls that should not be shared directly with players.

**How to apply:** Keep tracker administration, settings, and schedule refreshes behind staff access. Design player-facing routes around quick phone access and never expose mutation controls there.

Coaches should only comment on matches, including recording match feedback; they should not receive full staff management access.

**Why:** The user clarified that “the coaches will just comment on matches” when discussing account approval.

**How to apply:** Treat coach feedback access separately from staff administration. Do not approve coaches as unrestricted staff merely to enable reports or voice notes. Confirm whether feedback access covers all matches or only assigned matches before implementing that boundary.