import { describe, expect, it } from 'vitest';
import { formatDay, formatInputDate, formatTime, parsePacificInput } from './match-time';

describe('Pacific match times', () => {
  it('shows Saturday 8 am Pacific for an 11 am Eastern match', () => {
    const start = '2026-10-10T11:00:00-04:00';
    expect(formatTime(start)).toBe('08:00');
    expect(formatDay(start)).toBe('Sat 10 Oct');
    expect(formatInputDate(start)).toBe('2026-10-10T08:00');
  });

  it('uses the Pacific date at midnight and handles winter and summer offsets', () => {
    expect(formatDay('2026-10-10T02:00:00Z')).toBe('Fri 9 Oct');
    expect(formatTime('2026-01-10T16:00:00Z')).toBe('08:00');
    expect(formatTime('2026-07-11T15:00:00Z')).toBe('08:00');
    expect(parsePacificInput('2026-01-10T08:00', '2026-01-10T17:00:00Z')).toBe('2026-01-10T16:00:00.000Z');
    expect(parsePacificInput('2026-07-11T08:00', '2026-07-11T16:00:00Z')).toBe('2026-07-11T15:00:00.000Z');
  });

  it('preserves unchanged schedules, including repeated daylight-saving times', () => {
    const start = '2026-11-01T09:30:25Z';
    expect(parsePacificInput(formatInputDate(start), start)).toBe(start);
  });

  it('rejects skipped, ambiguous and invalid Pacific input times', () => {
    const original = '2026-03-01T16:00:00Z';
    for (const input of ['2026-03-08T02:30', '2026-11-01T01:30', '', '2026-02-30T08:00']) {
      expect(() => parsePacificInput(input, original)).toThrow();
    }
  });
});
