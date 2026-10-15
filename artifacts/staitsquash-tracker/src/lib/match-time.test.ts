import { describe, expect, it } from 'vitest';
import { viewerTimeNote, formatDay, formatInputDate, formatTime, matchZone, parseZonedInput, venueTimeNote, zoneLabel } from './match-time';

const PT = 'America/Los_Angeles';

describe('Pacific match times', () => {
  it('shows Saturday 8 am Pacific for an 11 am Eastern match', () => {
    const start = '2026-10-10T11:00:00-04:00';
    expect(formatTime(start, PT)).toBe('08:00');
    expect(formatDay(start, PT)).toBe('Sat 10 Oct');
    expect(formatInputDate(start, PT)).toBe('2026-10-10T08:00');
  });

  it('uses the Pacific date at midnight and handles winter and summer offsets', () => {
    expect(formatDay('2026-10-10T02:00:00Z', PT)).toBe('Fri 9 Oct');
    expect(formatTime('2026-01-10T16:00:00Z', PT)).toBe('08:00');
    expect(formatTime('2026-07-11T15:00:00Z', PT)).toBe('08:00');
    expect(parseZonedInput('2026-01-10T08:00', '2026-01-10T17:00:00Z', PT)).toBe('2026-01-10T16:00:00.000Z');
    expect(parseZonedInput('2026-07-11T08:00', '2026-07-11T16:00:00Z', PT)).toBe('2026-07-11T15:00:00.000Z');
  });

  it('preserves unchanged schedules, including repeated daylight-saving times', () => {
    const start = '2026-11-01T09:30:25Z';
    expect(parseZonedInput(formatInputDate(start, PT), start, PT)).toBe(start);
  });

  it('rejects skipped, ambiguous and invalid Pacific input times', () => {
    const original = '2026-03-01T16:00:00Z';
    for (const input of ['2026-03-08T02:30', '2026-11-01T01:30', '', '2026-02-30T08:00']) {
      expect(() => parseZonedInput(input, original, PT)).toThrow();
    }
  });
});

describe('per-tournament zones', () => {
  const start = '2026-10-10T12:00:00Z';
  it('shows an East Coast match in Eastern time and a West Coast one in Pacific, whoever is viewing', () => {
    expect(formatTime(start, 'America/New_York')).toBe('08:00');
    expect(formatTime(start, 'America/Los_Angeles')).toBe('05:00');
    expect(zoneLabel(start, 'America/New_York')).toBe('EDT');
    expect(zoneLabel(start, 'America/Los_Angeles')).toBe('PDT');
    expect(zoneLabel('2026-01-10T12:00:00Z', 'America/Chicago')).toBe('CST');
  });
  it('falls back to Eastern for cards saved before matches carried a zone', () => {
    expect(matchZone({})).toBe('America/New_York');
    expect(matchZone({ timeZone: 'America/New_York' })).toBe('America/New_York');
  });
  it('reads edited times in the match zone and keeps unchanged ones', () => {
    expect(parseZonedInput('2026-10-10T08:00', start, 'America/New_York')).toBe(start);
    expect(parseZonedInput('2026-10-10T09:30', start, 'America/New_York')).toBe('2026-10-10T13:30:00.000Z');
    expect(parseZonedInput('2026-01-10T09:30', '2026-01-10T12:00:00Z', 'America/Chicago')).toBe('2026-01-10T15:30:00.000Z');
  });
});

describe('viewerTimeNote', () => {
  const start = '2026-10-10T15:00:00Z';
  it('shows the viewer their own clock when it differs from the tournament', () => {
    expect(viewerTimeNote(start, 'America/Los_Angeles', 'America/New_York')).toBe('11:00 EDT for you');
    expect(viewerTimeNote(start, 'America/Chicago', 'America/New_York')).toBe('11:00 EDT for you');
  });
  it('is empty in the same zone', () => {
    expect(viewerTimeNote(start, 'America/New_York', 'America/New_York')).toBe('');
  });
});

describe('venueTimeNote', () => {
  const start = '2026-10-17T15:40:00Z';
  it('gives the venue clock for a match outside Eastern', () => {
    expect(venueTimeNote(start, 'America/Chicago')).toBe('Venue 10:40 CDT');
    expect(venueTimeNote('2026-10-17T14:55:00Z', 'America/Los_Angeles')).toBe('Venue 07:55 PDT');
  });
  it('is empty for Eastern matches', () => {
    expect(venueTimeNote(start, 'America/New_York')).toBe('');
  });
  it('names the venue day when it differs from the Eastern day', () => {
    expect(venueTimeNote('2026-10-17T05:30:00Z', 'America/Los_Angeles')).toBe('Venue 22:30 PDT Fri 16 Oct');
  });
});
