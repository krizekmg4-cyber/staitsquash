---
name: Pacific match times
description: The product's fixed timezone requirement for match clocks and editing.
---

Show match dates and times in Pacific Time regardless of the viewer's device timezone. Use America/Los_Angeles so daylight saving is handled, not a fixed UTC offset.

**Why:** The user explicitly wants a Saturday 8 a.m. Pacific match to remain 8 a.m. when viewed from Eastern Time, rather than displaying 11 a.m.

**How to apply:** Keep staff, coach and player match clocks, date labels, previous-time notices, and match-edit inputs consistent. Convert edited Pacific wall times back to absolute instants; never shift stored schedules merely to change their display.
