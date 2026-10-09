/** Used when a match has no time zone of its own (cards saved before tournaments carried one). */
export const MATCH_TIME_ZONE = 'America/Los_Angeles';

/** Each match is shown in its tournament's zone, never the viewer's. */
export const matchZone = (match: { timeZone?: string | null }) => match.timeZone || MATCH_TIME_ZONE;

export const formatDay = (value: string, timeZone: string = MATCH_TIME_ZONE) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone, weekday: 'short', day: 'numeric', month: 'short',
  }).format(new Date(value));

export const formatTime = (value: string, timeZone: string = MATCH_TIME_ZONE) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date(value));

/** "PDT", "EDT", "CST"... for the zone the time is shown in. */
export const zoneLabel = (value: string, timeZone: string = MATCH_TIME_ZONE) =>
  new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    .formatToParts(new Date(value)).find((part) => part.type === 'timeZoneName')?.value ?? '';

export function formatInputDate(value: string, timeZone: string = MATCH_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(value));
  const part = (type: string) => parts.find((entry) => entry.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}T${part('hour')}:${part('minute')}`;
}

/** Resolve a wall-clock input in the match's own zone, never the browser's local zone. */
export function parseZonedInput(value: string, original: string, timeZone: string = MATCH_TIME_ZONE): string {
  if (formatInputDate(original, timeZone) === value) return original;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error('Enter a valid date and time.');
  const [, year, month, day, hour, minute] = match;
  const wallClock = Date.UTC(+year, +month - 1, +day, +hour, +minute);
  // US zones sit 4 to 10 hours behind UTC; only the right offset reads back as the typed time.
  const candidates = [4, 5, 6, 7, 8, 9, 10]
    .map((offset) => new Date(wallClock + offset * 3_600_000).toISOString())
    .filter((candidate) => formatInputDate(candidate, timeZone) === value);
  if (candidates.length !== 1) {
    throw new Error('This time is skipped or repeated during a daylight-saving change. Choose an unambiguous time.');
  }
  return candidates[0];
}

/** Kept for the callers and tests written when every match was Pacific. */
export const parsePacificInput = (value: string, original: string) => parseZonedInput(value, original, MATCH_TIME_ZONE);
