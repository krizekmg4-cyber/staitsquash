import { describe, expect, it } from 'vitest';
import type { Coach, Match, Player } from '@workspace/api-client-react';
import { summarizeCoaching, summaryText } from './coaching-summary';

const players = [{ id: 'p1', name: 'Connor Powell' }, { id: 'p2', name: 'Narelle' }] as Player[];
const coaches = [{ id: 'c1', name: 'Alex' }, { id: 'c2', name: 'Sam' }, { id: 'unassigned', name: 'Unassigned' }, { id: 'not-coaching', name: 'Not coaching' }] as Coach[];
const match = (id: string, extra: Partial<Match>): Match => ({
  id, externalId: null, playerId: 'p1', opponent: 'X', startsAt: '2026-10-10T15:00:00Z', endsAt: '2026-10-10T15:00:00Z',
  venue: 'West Coast JCT', court: '1', coachId: 'c1', status: 'completed', ...extra,
} as Match);

describe('summarizeCoaching', () => {
  it('counts coached and virtual matches per player and per coach', () => {
    const [event] = summarizeCoaching([
      match('a', {}), match('b', { coachMode: 'virtual' }), match('c', { coachId: 'c2' }), match('d', { status: 'upcoming' }),
    ], players, coaches);
    expect(event.byPlayer).toEqual([{ name: 'Connor Powell', coached: 4, virtual: 1, toPlay: 1 }]);
    expect(event.byCoach).toEqual([
      { name: 'Alex', coached: 3, virtual: 1, toPlay: 1 },
      { name: 'Sam', coached: 1, virtual: 0, toPlay: 0 },
    ]);
  });
  it('ignores Not coaching, flags Unassigned, and keeps events apart', () => {
    const events = summarizeCoaching([
      match('a', { coachId: 'not-coaching' }), match('b', { coachId: 'unassigned' }),
      match('c', { venue: 'Penn', startsAt: '2026-10-09T15:00:00Z' }),
    ], players, coaches);
    expect(events.map((event) => event.venue)).toEqual(['Penn', 'West Coast JCT']);
    expect(events[1].byPlayer).toEqual([]);
    expect(events[1].unassigned).toBe(1);
  });
  it('lists every coached match under its coach, in time order', () => {
    const [event] = summarizeCoaching([
      match('a', { opponent: 'Kai', startsAt: '2026-10-10T17:00:00Z' }),
      match('b', { opponent: 'Lee', startsAt: '2026-10-10T15:00:00Z', coachMode: 'virtual' }),
      match('c', { opponent: 'Sam', coachId: 'c2', status: 'upcoming' }),
      match('d', { coachId: 'not-coaching' }),
    ], players, coaches);
    expect(event.sheets.map((sheet) => [sheet.name, sheet.coached, sheet.virtual])).toEqual([['Alex', 2, 1], ['Sam', 1, 0]]);
    expect(event.sheets[0].matches.map((line) => line.opponent)).toEqual(['Lee', 'Kai']);
    expect(event.sheets[0].matches[0]).toMatchObject({ player: 'Connor Powell', virtual: true, played: true });
    expect(event.sheets[1].matches[0].played).toBe(false);
    const text = summaryText([event]);
    expect(text).toContain('Matches coached, by coach');
    expect(text).toContain('Alex: 2 matches, 1 virtual');
    expect(text).toContain('Connor Powell vs Lee (virtual)');
    expect(text).toContain('Connor Powell vs Sam (in person, not played yet)');
  });
  it('writes plain text in the shape Alex asked for', () => {
    const text = summaryText(summarizeCoaching([match('a', {}), match('b', { coachMode: 'virtual' })], players, coaches));
    expect(text).toContain('Connor Powell: coached 2 times, 1 virtually');
    expect(text).toContain('Alex: coached 2 times, 1 virtually');
  });
});
