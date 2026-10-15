import { useEffect, useState } from 'react';
import { summarizeCoaching, summaryText, describeTally, describeLine, stillGoingText, type Tally, type CoachSheet, type TournamentInfo } from './lib/coaching-summary';
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

/** Tournament names and last days, so a summary opens only when its tournament is over. */
function useTournaments(): TournamentInfo[] | null {
  const [tournaments, setTournaments] = useState<TournamentInfo[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`${import.meta.env.BASE_URL}api/tracker/setup`, { credentials: 'same-origin' })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { tournaments?: Array<{ id?: unknown; name?: unknown; endsOn?: unknown }> } | null) => {
        if (!alive) return;
        setTournaments((body?.tournaments ?? []).flatMap((item) => (
          typeof item.id === 'string' ? [{ id: item.id, name: typeof item.name === 'string' ? item.name : item.id, endsOn: typeof item.endsOn === 'string' ? item.endsOn : null }] : []
        )));
      })
      .catch(() => { if (alive) setTournaments([]); });
    return () => { alive = false; };
  }, []);
  return tournaments;
}

export function CoachingSummary({ matches, players, coaches, onCopy }: { matches: Match[]; players: Player[]; coaches: Coach[]; onCopy: (text: string) => void }) {
  const tournaments = useTournaments();
  if (tournaments === null) return <div data-testid="summary-loading" aria-busy="true" className="h-24 animate-pulse rounded-2xl bg-muted" />;
  const events = summarizeCoaching(matches, players, coaches, tournaments);
  if (!events.length) return <p data-testid="summary-empty" className="rounded-2xl border border-card-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">No tournaments yet.</p>;
  const finished = events.filter((event) => event.finished);
  return (
    <div data-testid="coaching-summary" className="space-y-4">
      {finished.length > 0 && (
        <div className="flex justify-end">
          <button data-testid="summary-copy" onClick={() => onCopy(summaryText(events))} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary">Copy as text</button>
        </div>
      )}
      {events.map((event) => event.finished ? (
        <section key={event.key} data-testid={`summary-${event.title}`} className="space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold">{event.title}</h3>
          <TallyList title="By coach" rows={event.byCoach} />
          <TallyList title="By player" rows={event.byPlayer} />
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Matches coached, by coach</p>
            <div className="space-y-2">{event.sheets.map((sheet) => <CoachMatches key={sheet.name} sheet={sheet} />)}</div>
          </div>
          {event.unassigned > 0 && <p className="text-xs font-bold text-accent">{event.unassigned} played {event.unassigned === 1 ? 'match has' : 'matches have'} no coach decision.</p>}
          {event.notPlayed > 0 && <p className="text-xs text-muted-foreground">{event.notPlayed} {event.notPlayed === 1 ? 'match was' : 'matches were'} not played and {event.notPlayed === 1 ? 'is' : 'are'} not counted.</p>}
        </section>
      ) : (
        <section key={event.key} data-testid={`summary-going-${event.title}`} className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">
          {stillGoingText(event)}
        </section>
      ))}
    </div>
  );
}
