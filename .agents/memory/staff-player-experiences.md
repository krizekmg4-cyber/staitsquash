---
name: Staff and player experiences
description: Product direction separating protected staff controls from the player-facing tracker.
---

The app should have two distinct experiences: approved staff use the management interface, while players receive a separate read-only, mobile-friendly link showing upcoming matches, time, venue, court, opponent, assigned coach, results, match history, and coach advice with playable voice notes.

**Why:** The user explicitly confirmed this structure as exactly what they want. The current management interface exposes controls that should not be shared directly with players.

**How to apply:** Keep tracker administration, settings, and schedule refreshes behind staff access. Design player-facing routes around quick phone access and never expose mutation controls there.

Coaches should only comment on matches, including recording match feedback; they should not receive full staff management access. They may comment on all matches in the tracker, not only their assigned matches.

**Why:** The user clarified that “the coaches will just comment on matches” when discussing account approval and chose access to “All matches in the tracker.”

**How to apply:** Treat coach feedback access separately from staff administration. Do not approve coaches as unrestricted staff merely to enable reports or voice notes. Do not restrict feedback to assigned matches.

Coach reports may consist of a single written comment or a voice note; three observations are not mandatory. Extra comments and a transcript are optional, but wholly empty reports must not be saved.

**Why:** The user was blocked by the greyed-out Save button and explicitly chose “Allow one comment or a voice note” instead of requiring all three observation boxes.

**How to apply:** Keep form eligibility, API validation, saved-state validation, and player-facing report rendering compatible with short and audio-only reports. Retain existing three-comment reports without rewriting them or inserting placeholder text.