import { useEffect, useMemo, useState } from 'react';
import {
  summarizeCoaching, summaryText, describeTally, describeLine, stillGoingText, withArchive, reportLines, linesInRange, totalsBy, reportCsv, reportText,
  type Tally, type CoachSheet, type TournamentInfo, type ArchiveRow, type EventSummary, type ReportLine,
} from './lib/coaching-summary';
import { formatDay, EASTERN } from './lib/match-time';
import type { Coach, Match, Player } from '@workspace/api-client-react';

function TallyList({ title, rows }: { title: string; rows: Tally[] }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">{title}</p>
      {rows.length === 0 && <p className="text-sm text-muted-foreground">No coached matches.</p>}
      <ul className="divide-y divide-border">
        {rows.map((tally) => (
          <li key={tally.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
            <span className="font-semibold">{tally.name}</span>
            <span className="text-right text-muted-foreground">{describeTally(tally).slice(tally.name.length + 2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoachMatches({ sheet }: { sheet: CoachSheet }) {
  return (
    <div data-testid={`coach-matches-${sheet.name}`} className="rounded-xl border border-border p-3">
      <p className="text-sm font-bold">{sheet.name} <span className="font-normal text-muted-foreground">{sheet.coached} {sheet.coached === 1 ? 'match' : 'matches'}{sheet.virtual ? `, ${sheet.virtual} virtual` : ''}</span></p>
      <ul className="mt-2 space-y-1">
        {sheet.matches.map((line, index) => (
          <li key={index} className="text-xs text-muted-foreground">{describeLine(line)}</li>
        ))}
      </ul>
    </div>
  );
}

function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tournament';

type Loaded = { tournaments: TournamentInfo[]; rows: ArchiveRow[]; archiveError: boolean };

/** Tournament names and last days from the setup, and the permanent coaching record. Either can fail without breaking the page. */
function useSources(): Loaded | null {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  useEffect(() => {
    let alive = true;
    const get = (path: string) => fetch(`${import.meta.env.BASE_URL}${path}`, { credentials: 'same-origin' }).then((response) => (response.ok ? response.json() : null)).catch(() => null);
    void Promise.all([get('api/tracker/setup'), get('api/archive')]).then(([setup, archive]) => {
      if (!alive) return;
      const items = (setup as { tournaments?: Array<{ id?: unknown; name?: unknown; endsOn?: unknown }> } | null)?.tournaments ?? [];
      setLoaded({
        tournaments: items.flatMap((item) => (
          typeof item.id === 'string' ? [{ id: item.id, name: typeof item.name === 'string' ? item.name : item.id, endsOn: typeof item.endsOn === 'string' ? item.endsOn : null }] : []
        )),
        rows: Array.isArray((archive as { rows?: unknown } | null)?.rows) ? (archive as { rows: ArchiveRow[] }).rows : [],
        archiveError: archive === null,
      });
    });
    return () => { alive = false; };
  }, []);
  return loaded;
}

const dateRange = (event: EventSummary) => {
  const first = formatDay(event.firstAt, EASTERN);
  const last = formatDay(event.lastAt, EASTERN);
  return first === last ? first : `${first} to ${last}`;
};

function Report({ lines, onCopy }: { lines: ReportLine[]; onCopy: (text: string) => void }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const inRange = useMemo(() => linesInRange(lines, from, to), [lines, from, to]);
  return (
    <section data-testid="summary-report" className="space-y-3 rounded-2xl border border-card-border bg-card p-4 shadow-sm">
      <h3 className="font-serif text-lg font-bold">Report for any dates</h3>
      <p className="text-xs text-muted-foreground">Pick dates to total up every finished tournament in between, for billing or accounting. Leave both empty for everything.</p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs font-bold">From<input data-testid="report-from" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="field mt-1 block" /></label>
        <label className="text-xs font-bold">To<input data-testid="report-to" type="date" value={to} onChange={(event) => setTo(event.target.value)} className="field mt-1 block" /></label>
      </div>
      <p data-testid="report-count" className="text-sm font-bold">{inRange.length} {inRange.length === 1 ? 'match' : 'matches'} coached</p>
      {inRange.length > 0 && (
        <>
          <TallyList title="By coach" rows={totalsBy(inRange, 'coach')} />
          <TallyList title="By player" rows={totalsBy(inRange, 'player')} />
          <div className="flex flex-wrap gap-2">
            <button data-testid="report-csv" onClick={() => download(`coaching-${from || 'all'}-to-${to || 'today'}.csv`, reportCsv(inRange))} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Download spreadsheet</button>
            <button data-testid="report-copy" onClick={() => onCopy(reportText(inRange, from, to))} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary">Copy totals as text</button>
          </div>
        </>
      )}
    </section>
  );
}

export function CoachingSummary({ matches, players, coaches, onCopy }: { matches: Match[]; players: Player[]; coaches: Coach[]; onCopy: (text: string) => void }) {
  const sources = useSources();
  const events = useMemo(() => {
    if (!sources) return [];
    const merged = withArchive(matches, players, coaches, sources.tournaments, sources.rows);
    return summarizeCoaching(merged.matches, merged.players, merged.coaches, merged.tournaments);
  }, [sources, matches, players, coaches]);
  if (sources === null) return <div data-testid="summary-loading" aria-busy="true" className="h-24 animate-pulse rounded-2xl bg-muted" />;
  if (!events.length) return <p data-testid="summary-empty" className="rounded-2xl border border-card-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">No tournaments yet.</p>;
  const going = events.filter((event) => !event.finished);
  const finished = events.filter((event) => event.finished);
  const lines = reportLines(events);
  return (
    <div data-testid="coaching-summary" className="space-y-4">
      {going.map((event) => (
        <section key={event.key} data-testid={`summary-going-${event.title}`} className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">
          {stillGoingText(event)}
        </section>
      ))}
      {finished.length > 0 && <Report lines={lines} onCopy={onCopy} />}
      {finished.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Past tournaments, newest first</p>
          <button data-testid="summary-copy" onClick={() => onCopy(summaryText(events))} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary">Copy all as text</button>
        </div>
      )}
      {finished.map((event) => (
        <details key={event.key} data-testid={`summary-${event.title}`} className="group rounded-2xl border border-card-border bg-card shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
            <span>
              <span className="block font-serif text-lg font-bold">{event.title}</span>
              <span className="block text-xs text-muted-foreground">{dateRange(event)}</span>
            </span>
            <span className="shrink-0 text-right text-sm font-bold">{event.total} {event.total === 1 ? 'match' : 'matches'}<span className="block text-xs font-normal text-muted-foreground group-open:hidden">Tap to open</span></span>
          </summary>
          <div className="space-y-4 border-t border-border p-4">
            <TallyList title="By coach" rows={event.byCoach} />
            <TallyList title="By player" rows={event.byPlayer} />
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Matches coached, by coach</p>
              <div className="space-y-2">{event.sheets.map((sheet) => <CoachMatches key={sheet.name} sheet={sheet} />)}</div>
            </div>
            {event.unassigned > 0 && <p className="text-xs font-bold text-accent">{event.unassigned} played {event.unassigned === 1 ? 'match has' : 'matches have'} no coach decision.</p>}
            {event.notPlayed > 0 && <p className="text-xs text-muted-foreground">{event.notPlayed} {event.notPlayed === 1 ? 'match was' : 'matches were'} not played and {event.notPlayed === 1 ? 'is' : 'are'} not counted.</p>}
            <button data-testid={`csv-${event.key}`} onClick={() => download(`${slug(event.title)}.csv`, reportCsv(reportLines([event])))} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary">Download this tournament (spreadsheet)</button>
          </div>
        </details>
      ))}
      {sources.archiveError && <p className="text-xs text-muted-foreground">The permanent record could not be loaded, so this shows what is on the board right now.</p>}
    </div>
  );
}
