import { summarizeCoaching, summaryText, describeTally, describeLine, type Tally, type CoachSheet } from './lib/coaching-summary';
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

export function CoachingSummary({ matches, players, coaches, onCopy }: { matches: Match[]; players: Player[]; coaches: Coach[]; onCopy: (text: string) => void }) {
  const events = summarizeCoaching(matches, players, coaches);
  if (!events.length) return <p data-testid="summary-empty" className="rounded-2xl border border-card-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">No coaching to report yet.</p>;
  return (
    <div data-testid="coaching-summary" className="space-y-4">
      <div className="flex justify-end">
        <button data-testid="summary-copy" onClick={() => onCopy(summaryText(events))} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary">Copy as text</button>
      </div>
      {events.map((event) => (
        <section key={event.venue} data-testid={`summary-${event.venue}`} className="space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold">{event.venue}</h3>
          <TallyList title="By coach" rows={event.byCoach} />
          <TallyList title="By player" rows={event.byPlayer} />
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Matches coached, by coach</p>
            <div className="space-y-2">{event.sheets.map((sheet) => <CoachMatches key={sheet.name} sheet={sheet} />)}</div>
          </div>
          {event.unassigned > 0 && <p className="text-xs font-bold text-accent">{event.unassigned} {event.unassigned === 1 ? 'match has' : 'matches have'} no coach decision yet.</p>}
        </section>
      ))}
    </div>
  );
}
