import { describe, expect, it } from 'vitest';
import { formatDay, formatInputDate, formatTime, parseEasternInput } from './match-time';

describe('Eastern match times', () => {
  it('shows Saturday 11 am Eastern for an 8 am Pacific match', () => {
    const start = '2026-10-10T11:00:00-04:00';
    expect(formatTime(start)).toBe('11:00');
    expect(formatDay(start)).toBe('Sat 10 Oct');
    expect(formatInputDate(start)).toBe('2026-10-10T11:00');
  });

  it('uses the Eastern date at midnight and handles winter and summer offsets', () => {
    expect(formatDay('2026-10-10T02:00:00Z')).toBe('Fri 9 Oct');
    expect(formatTime('2026-01-10T16:00:00Z')).toBe('11:00');
    expect(formatTime('2026-07-11T15:00:00Z')).toBe('11:00');
    expect(parseEasternInput('2026-01-10T08:00', '2026-01-10T17:00:00Z')).toBe('2026-01-10T13:00:00.000Z');
    expect(parseEasternInput('2026-07-11T08:00', '2026-07-11T16:00:00Z')).toBe('2026-07-11T12:00:00.000Z');
  });

  it('preserves unchanged schedules, including repeated daylight-saving times', () => {
    const start = '2026-11-01T06:30:25Z';
    expect(parseEasternInput(formatInputDate(start), start)).toBe(start);
  });

  it('rejects skipped, ambiguous and invalid Eastern input times', () => {
    const original = '2026-03-01T16:00:00Z';
    for (const input of ['2026-03-08T02:30', '2026-11-01T01:30', '', '2026-02-30T08:00']) {
      expect(() => parseEasternInput(input, original)).toThrow();
    }
  });
});
