export const MATCH_TIME_ZONE = 'America/New_York';

export const formatDay = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: MATCH_TIME_ZONE, weekday: 'short', day: 'numeric', month: 'short',
  }).format(new Date(value));

export const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: MATCH_TIME_ZONE, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date(value));

export function formatInputDate(value: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: MATCH_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(value));
  const part = (type: string) => parts.find((entry) => entry.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}T${part('hour')}:${part('minute')}`;
}

/** Resolve modern Eastern wall-clock inputs, never the browser's local zone. */
export function parseEasternInput(value: string, original: string): string {
  if (formatInputDate(original) === value) return original;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error('Enter a valid date and time in Eastern Time.');
  const [, year, month, day, hour, minute] = match;
  const wallClock = Date.UTC(+year, +month - 1, +day, +hour, +minute);
  const candidates = [4, 5]
    .map((offset) => new Date(wallClock + offset * 3_600_000).toISOString())
    .filter((candidate) => formatInputDate(candidate) === value);
  if (candidates.length !== 1) {
    throw new Error('This Eastern time is skipped or repeated during a daylight-saving change. Choose an unambiguous time.');
  }
  return candidates[0];
}
