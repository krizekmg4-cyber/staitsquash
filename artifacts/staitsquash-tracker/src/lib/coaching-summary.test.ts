import { describe, expect, it } from 'vitest';
import type { Coach, Match, Player } from '@workspace/api-client-react';
import { summarizeCoaching, summaryText, stillGoingText, withArchive, reportLines, linesInRange, totalsBy, reportCsv, type ArchiveRow } from './coaching-summary';

const players = [{ id: 'p1', name: 'Connor Powell' }, { id: 'p2', name: 'Narelle' }] as Player[];
const coaches = [{ id: 'c1', name: 'Alex' }, { id: 'c2', name: 'Sam' }, { id: 'unassigned', name: 'Unassigned' }, { id: 'not-coaching', name: 'Not coaching' }] as Coach[];
const match = (id: string, extra: Partial<Match>): Match => ({
  id, externalId: `100:${id}:1`, playerId: 'p1', opponent: 'X', startsAt: '2026-10-10T15:00:00Z', endsAt: '2026-10-10T15:45:00Z',
  venue: 'West Coast JCT', court: '1', coachId: 'c1', status: 'completed', ...extra,
} as Match);
const tournaments = [{ id: '100', name: 'West Coast JCT', endsOn: '2026-10-11' }];
const afterEnd = new Date('2026-10-12T14:00:00Z');   // Monday morning
const sundayNight = new Date('2026-10-12T01:00:00Z'); // 9 pm Eastern Sunday

describe('summarizeCoaching: only when the tournament is over', () => {
  it('shows a tournament still going as one line with no counts, even when matches are assigned', () => {
    const [event] = summarizeCoaching([match('a', {}), match('b', { status: 'upcoming' })], players, coaches, tournaments, new Date('2026-10-10T20:00:00Z'));
    expect(event.finished).toBe(false);
    expect(event.byPlayer).toEqual([]);
    expect(event.byCoach).toEqual([]);
    expect(event.opensOn).toBe('Mon 12 Oct');
    expect(stillGoingText(event)).toContain('The summary opens Mon 12 Oct');
  });
  it('stays closed on the evening of the last day, and opens the next morning', () => {
    expect(summarizeCoaching([match('a', {})], players, coaches, tournaments, sundayNight)[0].finished).toBe(false);
    expect(summarizeCoaching([match('a', {})], players, coaches, tournaments, afterEnd)[0].finished).toBe(true);
  });
  it('uses each tournament own last day, so a Sunday to Monday event opens a day later', () => {
    const long = [{ id: '100', name: 'West Coast JCT', endsOn: '2026-10-12' }];
    expect(summarizeCoaching([match('a', {})], players, coaches, long, afterEnd)[0].finished).toBe(false);
    expect(summarizeCoaching([match('a', {})], players, coaches, long, new Date('2026-10-13T14:00:00Z'))[0].finished).toBe(true);
  });
  it('counts only played matches once it is over, and reports the unplayed ones', () => {
    const [event] = summarizeCoaching([
      match('a', {}), match('b', { coachMode: 'virtual' }), match('c', { coachId: 'c2' }), match('d', { status: 'upcoming' }),
      match('e', { coachId: 'not-coaching' }), match('f', { coachId: 'unassigned' }),
    ], players, coaches, tournaments, afterEnd);
    expect(event.byPlayer).toEqual([{ name: 'Connor Powell', coached: 3, virtual: 1 }]);
    expect(event.byCoach).toEqual([{ name: 'Alex', coached: 2, virtual: 1 }, { name: 'Sam', coached: 1, virtual: 0 }]);
    expect(event.unassigned).toBe(1);
    expect(event.notPlayed).toBe(1);
  });
  it('lists every played match under its coach, in time order', () => {
    const [event] = summarizeCoaching([
      match('a', { opponent: 'Kai', startsAt: '2026-10-10T17:00:00Z' }),
      match('b', { opponent: 'Lee', startsAt: '2026-10-10T15:00:00Z', coachMode: 'virtual' }),
      match('c', { opponent: 'Sam', coachId: 'c2' }),
    ], players, coaches, tournaments, afterEnd);
    expect(event.sheets.map((sheet) => [sheet.name, sheet.coached, sheet.virtual])).toEqual([['Alex', 2, 1], ['Sam', 1, 0]]);
    expect(event.sheets[0].matches.map((line) => line.opponent)).toEqual(['Lee', 'Kai']);
    const text = summaryText([event]);
    expect(text).toContain('Alex: 2 matches, 1 virtual');
    expect(text).toContain('Connor Powell vs Lee (virtual)');
    expect(text).toContain('Connor Powell: coached 3 times, 1 virtually');
  });
  it('keeps tournaments apart, finished ones first, and leaves going ones out of the text', () => {
    const events = summarizeCoaching([
      match('a', {}),
      match('b', { externalId: '200:b:1', venue: 'Chicago', startsAt: '2026-10-17T15:00:00Z', status: 'upcoming' }),
    ], players, coaches, [...tournaments, { id: '200', name: 'University Club of Chicago', endsOn: '2026-10-18' }], afterEnd);
    expect(events.map((event) => [event.title, event.finished])).toEqual([['West Coast JCT', true], ['University Club of Chicago', false]]);
    expect(summaryText(events)).not.toContain('Chicago');
  });
  it('without an end date, opens when every match is played or the last one is a day old', () => {
    expect(summarizeCoaching([match('a', { status: 'upcoming' })], players, coaches, [], new Date('2026-10-10T16:00:00Z'))[0].finished).toBe(false);
    expect(summarizeCoaching([match('a', {})], players, coaches, [], new Date('2026-10-10T16:00:00Z'))[0].finished).toBe(true);
    expect(summarizeCoaching([match('a', { status: 'upcoming' })], players, coaches, [], new Date('2026-10-12T16:00:00Z'))[0].finished).toBe(true);
  });
});

const row = (key: string, extra: Partial<ArchiveRow> = {}): ArchiveRow => ({
  matchKey: key, tournamentId: '300', tournamentName: 'Penn Junior Silver', tournamentEndsOn: '2026-10-04', venue: 'Penn',
  timeZone: 'America/New_York', startsAt: '2026-10-03T14:00:00Z', playerId: 'gone', playerName: 'Removed Kid', opponentName: 'Pat',
  opponentId: null, coachId: 'c9', coachName: 'Jamie', coachMode: null, ...extra,
});

describe('permanent record and reports', () => {
  it('brings back history for a kid and coach no longer on the board, without doubling matches still there', () => {
    const live = [match('a', {})];
    const merged = withArchive(live, players, coaches, tournaments, [
      row('300:1:gone'), row('300:2:gone', { startsAt: '2026-10-04T14:00:00Z', coachMode: 'virtual' }),
      row('100:a:1', { tournamentId: '100', playerId: 'p1', playerName: 'Connor Powell', coachId: 'c1', coachName: 'Alex' }),
    ]);
    expect(merged.matches).toHaveLength(3);
    expect(merged.tournaments.map((t) => t.name)).toContain('Penn Junior Silver');
    const events = summarizeCoaching(merged.matches, merged.players, merged.coaches, merged.tournaments, new Date('2026-12-01T00:00:00Z'));
    const penn = events.find((event) => event.title === 'Penn Junior Silver')!;
    expect(penn.finished).toBe(true);
    expect(penn.byPlayer).toEqual([{ name: 'Removed Kid', coached: 2, virtual: 1 }]);
    expect(penn.byCoach).toEqual([{ name: 'Jamie', coached: 2, virtual: 1 }]);
    expect(penn.total).toBe(2);
  });
  it('totals a date range across tournaments and writes a spreadsheet with one row per match', () => {
    const merged = withArchive([match('a', {})], players, coaches, tournaments, [row('300:1:gone'), row('300:2:gone', { startsAt: '2026-10-04T14:00:00Z', coachMode: 'virtual' })]);
    const events = summarizeCoaching(merged.matches, merged.players, merged.coaches, merged.tournaments, new Date('2026-12-01T00:00:00Z'));
    const lines = reportLines(events);
    expect(lines).toHaveLength(3);
    expect(linesInRange(lines, '2026-10-04', '2026-10-04').map((line) => line.player)).toEqual(['Removed Kid']);
    expect(linesInRange(lines, '', '').length).toBe(3);
    expect(totalsBy(linesInRange(lines, '2026-10-03', '2026-10-04'), 'coach')).toEqual([{ name: 'Jamie', coached: 2, virtual: 1 }]);
    const csv = reportCsv(lines);
    expect(csv.split('\n')[0]).toBe('Tournament,Venue,Date,Time (ET),Player,Opponent,Coach,Coaching');
    expect(csv).toContain('Penn Junior Silver,Penn,2026-10-04,10:00,Removed Kid,Pat,Jamie,virtual');
    expect(reportCsv([{ ...lines[0], opponent: 'Smith, "Kai"' }])).toContain('"Smith, ""Kai"""');
  });
});

describe('a tournament played at two venues', () => {
  const two = [
    match('a', { venue: 'Bay Club Redwood Shores', startsAt: '2026-10-10T15:00:00Z' }),
    match('b', { venue: 'Bay Club Santa Clara', startsAt: '2026-10-10T17:00:00Z', coachMode: 'virtual' }),
    match('c', { venue: 'Bay Club Santa Clara', startsAt: '2026-10-11T17:00:00Z', coachId: 'c2' }),
    match('d', { venue: 'Bay Club Santa Clara', coachId: 'unassigned', opponent: 'Pat' }),
  ];
  const [event] = summarizeCoaching(two, players, coaches, [{ id: '100', name: 'West Coast JCT #2', endsOn: '2026-10-12' }], new Date('2026-10-13T14:00:00Z'));
  it('uses the real tournament name once and breaks the totals out by venue', () => {
    expect(event.title).toBe('West Coast JCT #2');
    expect(event.total).toBe(3);
    expect(event.venues.map((venue) => [venue.venue, venue.total])).toEqual([['Bay Club Redwood Shores', 1], ['Bay Club Santa Clara', 2]]);
    expect(event.venues[1].byCoach).toEqual([{ name: 'Alex', coached: 1, virtual: 1 }, { name: 'Sam', coached: 1, virtual: 0 }]);
  });
  it('lists played matches with no coach decision, with their venue', () => {
    expect(event.unassigned).toBe(1);
    expect(event.unassignedLines[0]).toMatchObject({ opponent: 'Pat', venue: 'Bay Club Santa Clara' });
    const text = summaryText([event]);
    expect(text).toContain('By venue');
    expect(text).toContain('1 played match has no coach decision:');
    expect(text).toContain('Connor Powell vs Pat (in person), Bay Club Santa Clara');
  });
  it('a one-venue tournament has no venue breakdown', () => {
    const [single] = summarizeCoaching([match('a', {})], players, coaches, tournaments, new Date('2026-10-13T14:00:00Z'));
    expect(single.venues).toEqual([]);
  });
});
