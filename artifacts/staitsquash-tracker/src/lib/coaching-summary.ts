import type { Coach, Match, Player } from '@workspace/api-client-react';

const SYSTEM_COACH_IDS = ['unassigned', 'not-coaching'];

export type Tally = { name: string; coached: number; virtual: number; toPlay: number };
export type EventSummary = { venue: string; byPlayer: Tally[]; byCoach: Tally[]; unassigned: number };

const blank = (name: string): Tally => ({ name, coached: 0, virtual: 0, toPlay: 0 });

/**
 * One summary per event (venue). A match counts as coached when a real coach is
 * on it; Virtual is the subset watched remotely. "To play" are coached matches
 * not yet closed out, so a mid-event view is honest about being unfinished.
 */
export function summarizeCoaching(matches: Match[], players: Player[], coaches: Coach[]): EventSummary[] {
  const playerName = new Map(players.map((player) => [player.id, player.name]));
  const coachName = new Map(coaches.map((coach) => [coach.id, coach.name]));
  const events = new Map<string, { byPlayer: Map<string, Tally>; byCoach: Map<string, Tally>; unassigned: number; first: number }>();
  for (const match of matches) {
    const event = events.get(match.venue) ?? { byPlayer: new Map(), byCoach: new Map(), unassigned: 0, first: Infinity };
    events.set(match.venue, event);
    event.first = Math.min(event.first, Date.parse(match.startsAt));
    if (match.coachId === 'unassigned') { event.unassigned += 1; continue; }
    if (SYSTEM_COACH_IDS.includes(match.coachId)) continue;
    const add = (map: Map<string, Tally>, key: string, name: string) => {
      const tally = map.get(key) ?? blank(name);
      tally.coached += 1;
      if (match.coachMode === 'virtual') tally.virtual += 1;
      if (match.status !== 'completed') tally.toPlay += 1;
      map.set(key, tally);
    };
    add(event.byPlayer, match.playerId, playerName.get(match.playerId) ?? 'Unknown player');
    add(event.byCoach, match.coachId, coachName.get(match.coachId) ?? 'Unknown coach');
  }
  const order = (a: Tally, b: Tally) => b.coached - a.coached || a.name.localeCompare(b.name);
  return [...events.entries()]
    .sort((a, b) => a[1].first - b[1].first)
    .map(([venue, event]) => ({
      venue,
      byPlayer: [...event.byPlayer.values()].sort(order),
      byCoach: [...event.byCoach.values()].sort(order),
      unassigned: event.unassigned,
    }))
    .filter((event) => event.byPlayer.length > 0 || event.unassigned > 0);
}

const times = (count: number) => (count === 1 ? 'once' : `${count} times`);

export function describeTally(tally: Tally): string {
  const parts = [`coached ${times(tally.coached)}`];
  if (tally.virtual) parts.push(`${tally.virtual} virtually`);
  if (tally.toPlay) parts.push(`${tally.toPlay} still to play`);
  return `${tally.name}: ${parts.join(', ')}`;
}

/** Plain text for pasting into an email or invoice. */
export function summaryText(events: EventSummary[]): string {
  return events.map((event) => [
    event.venue,
    'By player',
    ...event.byPlayer.map((tally) => `  ${describeTally(tally)}`),
    'By coach',
    ...event.byCoach.map((tally) => `  ${describeTally(tally)}`),
    ...(event.unassigned ? [`  ${event.unassigned} ${event.unassigned === 1 ? 'match' : 'matches'} with no coach decision`] : []),
  ].join('\n')).join('\n\n');
}
