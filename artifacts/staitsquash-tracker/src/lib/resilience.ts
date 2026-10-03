import { useEffect, useState } from 'react';
import type { Match, TrackerState } from '@workspace/api-client-react';

const CACHE_KEY = 'staitsquash-last-board';

/** Re-render on a timer so "updated 3 min ago" stays true. */
export function useNow(intervalMs = 30_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
}

export function relativeAgo(iso: string, now: number): string {
  const minutes = Math.max(0, Math.round((now - Date.parse(iso)) / 60_000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours} hr ago` : `${Math.floor(hours / 24)} days ago`;
}

/** Is a match being played around now, so a stale board actually matters? */
export function eventIsActive(matches: Match[], now: number): boolean {
  const twelveHours = 12 * 3_600_000;
  return matches.some(
    (match) => match.status === 'upcoming' && Math.abs(Date.parse(match.startsAt) - now) < twelveHours,
  );
}

export function cacheBoard(state: TrackerState): void {
  try { window.localStorage.setItem(CACHE_KEY, JSON.stringify(state)); } catch { /* storage may be blocked */ }
}

export function readCachedBoard(): TrackerState | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TrackerState;
    return Array.isArray(parsed?.matches) && Array.isArray(parsed?.players) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearCachedBoard(): void {
  try { window.localStorage.removeItem(CACHE_KEY); } catch { /* nothing to clear */ }
}

/** Plain text a coach can paste into a message so the problem is clear on the first read. */
export function problemDetails(input: {
  state?: TrackerState | null;
  setupLines?: string[];
  note?: string;
}): string {
  const { state, setupLines = [], note } = input;
  const lines = [
    'StaitSquash problem details',
    `When: ${new Date().toString()}`,
    `Online: ${typeof navigator !== 'undefined' && navigator.onLine ? 'yes' : 'no'}`,
    `Page: ${window.location.pathname}`,
    `Screen: ${window.innerWidth}x${window.innerHeight}`,
    `Browser: ${navigator.userAgent}`,
  ];
  if (note) lines.push(`Note: ${note}`);
  if (state) {
    const health = state.refreshHealth;
    lines.push(
      `Board last updated: ${state.lastUpdatedAt}`,
      `Source: ${state.source}`,
      `Refresh failures in a row: ${health.consecutiveFailures}${health.lastFailureAt ? ` (last ${health.lastFailureAt})` : ''}`,
      `Players: ${state.players.length}, matches: ${state.matches.length}, upcoming: ${state.matches.filter((match) => match.status === 'upcoming').length}`,
    );
  }
  if (setupLines.length) lines.push('Tournaments:', ...setupLines.map((line) => `- ${line}`));
  return lines.join('\n');
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
