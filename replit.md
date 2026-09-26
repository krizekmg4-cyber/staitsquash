# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Club Locker schedule

"Refresh draw" pulls matches straight from Club Locker's public tournament pages (`api.ussquash.com/resources`). Set these in Replit Secrets:

- `CLUB_LOCKER_TOURNAMENT_IDS`: the number in the tournament's Club Locker URL, e.g. `19515` from clublocker.com/tournaments/19515. Comma-separate several.
- `CLUB_LOCKER_PLAYER_IDS`: US Squash member IDs of the players to track, comma-separated. Only their singles matches are imported.
- `CLUB_LOCKER_TIMEZONE` (optional): where the tournament is played, default `America/New_York`.

Club Locker only publishes start times, so finish times are estimated at 45 minutes (shorter if the player's next match starts sooner). Upcoming matches whose opponent is still being decided show "To be decided". When Club Locker records a result, an open match is marked completed; a result staff typed in is never overwritten. Doubles are not imported yet. The old `CLUB_LOCKER_SCHEDULE_URL` setting still works when no tournament IDs are set.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
