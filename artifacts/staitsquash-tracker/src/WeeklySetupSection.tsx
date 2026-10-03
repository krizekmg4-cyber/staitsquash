import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, RefreshCw, Search, X } from 'lucide-react';
import type { Coach } from '@workspace/api-client-react';

type TournamentCheck = {
  state: 'ready' | 'no-draw' | 'no-players' | 'error';
  message: string;
  playersFound: number;
  matches: number;
  checkedAt: string;
};

export type SetupTournament = {
  id: string;
  name: string | null;
  dates: string | null;
  city: string | null;
  timeZone: string;
  endsOn: string | null;
  coachId: string;
  coachMode: 'in-person' | 'virtual';
  check: TournamentCheck | null;
};

type FollowedPlayer = { id: string; name: string | null };
type SetupView = { tournaments: SetupTournament[]; followedPlayers: FollowedPlayer[] };
type SearchHit = { id: string; name: string; dates: string | null; city: string | null; level: string | null };
type DrawPlayer = { id: string; name: string };

const ZONES: Array<[string, string]> = [
  ['America/New_York', 'Eastern'],
  ['America/Chicago', 'Central'],
  ['America/Denver', 'Mountain'],
  ['America/Phoenix', 'Arizona'],
  ['America/Los_Angeles', 'Pacific'],
];

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json', ...init.headers } : init?.headers,
  });
  let body: unknown = null;
  try { body = await response.json(); } catch { /* an empty body is fine */ }
  if (!response.ok) {
    const message = (body as { error?: string } | null)?.error;
    throw new Error(message ?? 'Something went wrong. Please try again.');
  }
  return body as T;
}

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const statusTone = (state: TournamentCheck['state']) =>
  state === 'ready' ? 'text-primary' : state === 'no-draw' ? 'text-muted-foreground' : 'text-destructive';

export function WeeklySetupSection({ coaches, onSaved }: { coaches: Coach[]; onSaved: () => void }) {
  const [setup, setSetup] = useState<SetupView | null>(null);
  const [loadError, setLoadError] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const [input, setInput] = useState('');
  const [finding, setFinding] = useState(false);
  const [findError, setFindError] = useState('');
  const [candidate, setCandidate] = useState<SetupTournament | null>(null);
  const [hits, setHits] = useState<SearchHit[]>([]);

  const [drawId, setDrawId] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [drawPlayers, setDrawPlayers] = useState<DrawPlayer[] | null>(null);
  const [drawMessage, setDrawMessage] = useState('');
  const [manualId, setManualId] = useState('');
  const noteTimer = useRef<number | null>(null);

  const realCoaches = coaches.filter((coach) => coach.id !== 'unassigned' && coach.id !== 'not-coaching');

  const flash = useCallback((message: string) => {
    setNote(message);
    if (noteTimer.current) window.clearTimeout(noteTimer.current);
    noteTimer.current = window.setTimeout(() => setNote(''), 2500);
  }, []);

  useEffect(() => {
    call<SetupView>('/tracker/setup').then(setSetup).catch((error: Error) => setLoadError(error.message));
    return () => { if (noteTimer.current) window.clearTimeout(noteTimer.current); };
  }, []);

  useEffect(() => {
    if (!setup) return;
    if (!drawId || !setup.tournaments.some((tournament) => tournament.id === drawId)) {
      setDrawId(setup.tournaments[0]?.id ?? '');
    }
  }, [setup, drawId]);

  const persist = async (tournaments: SetupTournament[], followedIds: string[], message: string) => {
    setSaving(true);
    try {
      const next = await call<SetupView>('/tracker/setup', {
        method: 'PUT',
        body: JSON.stringify({ tournaments, followedPlayerIds: followedIds }),
      });
      setSetup(next);
      flash(message);
      onSaved();
    } catch (error) {
      flash(error instanceof Error ? error.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const update = (id: string, patch: Partial<SetupTournament>) => {
    if (!setup) return;
    void persist(
      setup.tournaments.map((tournament) => (tournament.id === id ? { ...tournament, ...patch } : tournament)),
      setup.followedPlayers.map((player) => player.id),
      'Saved',
    );
  };

  const recheck = async (tournament: SetupTournament) => {
    try {
      const result = await call<SetupTournament & { check: TournamentCheck }>('/tracker/setup/check', {
        method: 'POST',
        body: JSON.stringify({ ref: tournament.id }),
      });
      update(tournament.id, { name: result.name, dates: result.dates, city: result.city, endsOn: result.endsOn, check: result.check });
    } catch (error) {
      flash(error instanceof Error ? error.message : 'Could not check');
    }
  };

  const find = async () => {
    const text = input.trim();
    if (!text) return;
    setFinding(true);
    setFindError('');
    setCandidate(null);
    setHits([]);
    try {
      const looksLikeRef = /tournaments?\/\d+/i.test(text) || /^#?\d{1,8}$/.test(text);
      if (looksLikeRef) {
        const result = await call<SetupTournament & { check: TournamentCheck }>('/tracker/setup/check', {
          method: 'POST',
          body: JSON.stringify({ ref: text }),
        });
        setCandidate({ ...result, coachId: 'unassigned', coachMode: 'in-person' });
      } else {
        const result = await call<{ results: SearchHit[] }>(`/tracker/setup/search?q=${encodeURIComponent(text)}`);
        if (!result.results.length) setFindError('No upcoming tournaments match that. Try the city, or paste the tournament number.');
        setHits(result.results);
      }
    } catch (error) {
      setFindError(error instanceof Error ? error.message : 'Could not look that up');
    } finally {
      setFinding(false);
    }
  };

  const pickHit = async (hit: SearchHit) => {
    setFinding(true);
    setFindError('');
    try {
      const result = await call<SetupTournament & { check: TournamentCheck }>('/tracker/setup/check', {
        method: 'POST',
        body: JSON.stringify({ ref: hit.id }),
      });
      setCandidate({ ...result, coachId: 'unassigned', coachMode: 'in-person' });
      setHits([]);
    } catch (error) {
      setFindError(error instanceof Error ? error.message : 'Could not check that tournament');
    } finally {
      setFinding(false);
    }
  };

  const addCandidate = () => {
    if (!setup || !candidate) return;
    if (setup.tournaments.some((tournament) => tournament.id === candidate.id)) {
      setFindError('That tournament is already on the list.');
      return;
    }
    void persist([...setup.tournaments, candidate], setup.followedPlayers.map((player) => player.id), 'Tournament added');
    setCandidate(null);
    setInput('');
  };

  const removeTournament = (id: string) => {
    if (!setup) return;
    void persist(setup.tournaments.filter((item) => item.id !== id), setup.followedPlayers.map((player) => player.id), 'Tournament removed');
  };

  const searchDraw = async (query: string) => {
    if (!drawId) return;
    setDrawMessage('');
    try {
      const result = await call<{ drawPosted: boolean; total: number; players: DrawPlayer[] }>(
        `/tracker/setup/players?tournament=${encodeURIComponent(drawId)}&q=${encodeURIComponent(query)}`,
      );
      setDrawPlayers(result.players);
      if (!result.drawPosted) setDrawMessage('The draw is not posted yet, so there are no names to pick. Add a player by US Squash ID below, or check back once the draw is out.');
      else if (!result.players.length) setDrawMessage('No one in that draw matches that name.');
    } catch (error) {
      setDrawPlayers(null);
      setDrawMessage(error instanceof Error ? error.message : 'Could not read the draw');
    }
  };

  const followedIds = setup?.followedPlayers.map((player) => player.id) ?? [];
  const addPlayer = (id: string) => {
    if (!setup || followedIds.includes(id)) return;
    void persist(setup.tournaments, [...followedIds, id], 'Player added');
  };
  const removePlayer = (id: string) => {
    if (!setup) return;
    void persist(setup.tournaments, followedIds.filter((existing) => existing !== id), 'Player removed');
  };

  if (loadError) return <section><p className="field-label mb-2">This week</p><p className="text-sm text-destructive">{loadError}</p></section>;
  if (!setup) return <section><p className="field-label mb-2">This week</p><p className="text-sm text-muted-foreground">Loading…</p></section>;

  return (
    <section data-testid="weekly-setup" className="space-y-5">
      <div>
        <p className="field-label mb-1">This week's tournaments</p>
        <p className="text-[11px] leading-5 text-muted-foreground">Add the events your kids play. Draws usually post on Wednesday for Silver and Gold, Thursday for Bronze. Events tuck away a few days after they finish.</p>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            data-testid="input-find-tournament"
            className="field min-h-11 flex-1"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') void find(); }}
            placeholder="Paste a Club Locker link or number, or search by name or city"
            inputMode="search"
          />
          <button data-testid="button-find-tournament" type="button" disabled={finding || !input.trim()} onClick={() => void find()} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border px-4 text-sm font-bold hover:bg-muted disabled:opacity-50"><Search size={15} />{finding ? 'Looking…' : 'Find'}</button>
        </div>
        {findError && <p data-testid="find-error" className="text-xs text-destructive">{findError}</p>}
        {hits.length > 0 && (
          <ul data-testid="search-results" className="divide-y divide-border rounded-xl border border-border">
            {hits.map((hit) => (
              <li key={hit.id}>
                <button type="button" onClick={() => void pickHit(hit)} className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-muted">
                  <span className="min-w-0"><span className="block truncate text-sm font-bold">{hit.name}</span><span className="block text-[11px] text-muted-foreground">{[hit.dates, hit.city, hit.level].filter(Boolean).join(' · ')}</span></span>
                  <span className="shrink-0 text-xs font-bold text-primary">Check</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {candidate && (
          <div data-testid="candidate" className="rounded-xl border border-primary/30 bg-secondary/30 p-3">
            <p className="text-sm font-bold">{candidate.name ?? `Tournament ${candidate.id}`}</p>
            <p className="text-[11px] text-muted-foreground">{[candidate.dates, candidate.city, ZONES.find(([zone]) => zone === candidate.timeZone)?.[1]].filter(Boolean).join(' · ')}</p>
            {candidate.check && <p className={cx('mt-1 text-xs font-semibold', statusTone(candidate.check.state))}>{candidate.check.message}</p>}
            <div className="mt-2 flex gap-2">
              <button data-testid="button-add-tournament" type="button" onClick={addCandidate} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground"><Plus size={15} />Add to this week</button>
              <button type="button" onClick={() => setCandidate(null)} className="min-h-11 rounded-xl border border-border px-4 text-sm font-semibold">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {setup.tournaments.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">No tournaments yet. Find this weekend's events above.</p>
      ) : (
        <ul className="space-y-3">
          {setup.tournaments.map((tournament) => (
            <li key={tournament.id} data-testid={`tournament-${tournament.id}`} className="rounded-xl border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{tournament.name ?? `Tournament ${tournament.id}`}</p>
                  <p className="text-[11px] text-muted-foreground">{[tournament.dates, tournament.city, `#${tournament.id}`].filter(Boolean).join(' · ')}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  <button type="button" aria-label={`Check ${tournament.name ?? tournament.id} again`} onClick={() => void recheck(tournament)} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"><RefreshCw size={15} /></button>
                  <button type="button" data-testid={`remove-tournament-${tournament.id}`} aria-label={`Remove ${tournament.name ?? tournament.id}`} onClick={() => removeTournament(tournament.id)} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><X size={16} /></button>
                </div>
              </div>
              {tournament.check && <p data-testid={`status-${tournament.id}`} className={cx('mt-1 text-xs font-semibold', statusTone(tournament.check.state))}>{tournament.check.message}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <select
                  data-testid={`coach-${tournament.id}`}
                  aria-label={`Coach for ${tournament.name ?? tournament.id}`}
                  value={tournament.coachId}
                  disabled={saving}
                  onChange={(event) => update(tournament.id, { coachId: event.target.value, coachMode: 'in-person' })}
                  className={cx('field min-h-11 min-w-0 flex-1 text-base sm:text-sm', tournament.coachId === 'unassigned' && 'border-accent text-accent')}
                >
                  <option value="unassigned">Needs a decision</option>
                  {realCoaches.map((coach) => <option key={coach.id} value={coach.id}>{coach.name}</option>)}
                  <option value="not-coaching">Not coaching</option>
                </select>
                {tournament.coachId !== 'unassigned' && tournament.coachId !== 'not-coaching' && (
                  <label className="flex min-h-11 items-center gap-2 px-1 text-sm font-semibold text-muted-foreground">
                    <input data-testid={`virtual-${tournament.id}`} type="checkbox" className="h-5 w-5" checked={tournament.coachMode === 'virtual'} disabled={saving} onChange={(event) => update(tournament.id, { coachMode: event.target.checked ? 'virtual' : 'in-person' })} />
                    Virtual
                  </label>
                )}
                <select
                  aria-label="Time zone"
                  value={tournament.timeZone}
                  disabled={saving}
                  onChange={(event) => update(tournament.id, { timeZone: event.target.value })}
                  className="field min-h-11 w-auto text-base sm:text-sm"
                >
                  {ZONES.map(([zone, label]) => <option key={zone} value={zone}>{label} time</option>)}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <p className="field-label">Kids to follow</p>
        <div data-testid="followed-players" className="flex flex-wrap gap-2">
          {setup.followedPlayers.length === 0 && <p className="text-xs text-muted-foreground">No kids yet. Pick them from a draw below.</p>}
          {setup.followedPlayers.map((player) => (
            <span key={player.id} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-card pl-3 pr-1 text-sm font-semibold">
              {player.name ?? `ID ${player.id}`}
              <button type="button" aria-label={`Stop following ${player.name ?? player.id}`} onClick={() => removePlayer(player.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"><X size={14} /></button>
            </span>
          ))}
        </div>
        {setup.tournaments.length > 0 && (
          <div className="space-y-2 rounded-xl border border-border p-3">
            <p className="text-xs font-semibold">Find a kid in a draw</p>
            <div className="flex flex-wrap gap-2">
              <select aria-label="Tournament to search" value={drawId} onChange={(event) => { setDrawId(event.target.value); setDrawPlayers(null); setDrawMessage(''); }} className="field min-h-11 min-w-0 flex-1 text-base sm:text-sm">
                {setup.tournaments.map((tournament) => <option key={tournament.id} value={tournament.id}>{tournament.name ?? `Tournament ${tournament.id}`}</option>)}
              </select>
              <input data-testid="input-player-name" className="field min-h-11 min-w-0 flex-1" value={nameQuery} onChange={(event) => { setNameQuery(event.target.value); void searchDraw(event.target.value); }} placeholder="Type a name" />
            </div>
            {drawMessage && <p className="text-xs text-muted-foreground">{drawMessage}</p>}
            {drawPlayers && drawPlayers.length > 0 && (
              <ul data-testid="draw-players" className="max-h-56 divide-y divide-border overflow-y-auto rounded-lg border border-border">
                {drawPlayers.map((player) => (
                  <li key={player.id} className="flex min-h-11 items-center justify-between gap-2 px-3">
                    <span className="truncate text-sm">{player.name} <span className="text-[11px] text-muted-foreground">#{player.id}</span></span>
                    {followedIds.includes(player.id)
                      ? <span className="text-xs font-semibold text-muted-foreground">Following</span>
                      : <button type="button" data-testid={`follow-${player.id}`} onClick={() => addPlayer(player.id)} className="min-h-9 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground">Follow</button>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <input data-testid="input-manual-id" className="field min-h-11 flex-1" inputMode="numeric" value={manualId} onChange={(event) => setManualId(event.target.value.replace(/\D/g, ''))} placeholder="Or add by US Squash ID" />
          <button type="button" disabled={!manualId} onClick={() => { addPlayer(manualId); setManualId(''); }} className="min-h-11 rounded-xl border border-border px-4 text-sm font-bold hover:bg-muted disabled:opacity-50">Add</button>
        </div>
      </div>

      <p data-testid="setup-note" aria-live="polite" className="min-h-4 text-xs font-semibold text-primary">{note}</p>
    </section>
  );
}
