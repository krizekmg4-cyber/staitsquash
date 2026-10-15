import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Match } from '@workspace/api-client-react';
import { formatDay, matchZone } from './lib/match-time';

export type JournalNote = { id: string; opponentId: string | null; opponentName: string; matchKey: string | null; body: string; createdAt: string; updatedAt: string };

const OTHER = '__other__';
const MAX = 5000;

async function call<T>(path: string, init?: RequestInit): Promise<T | null> {
  const response = await fetch(`${import.meta.env.BASE_URL}${path}`, {
    credentials: 'same-origin',
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
  });
  if (response.status === 204) return null;
  let body: unknown = null;
  try { body = await response.json(); } catch { /* empty body */ }
  if (!response.ok) throw new Error((body as { error?: string } | null)?.error ?? 'Something went wrong. Please try again.');
  return body as T;
}

/** One person, whether or not the draw gave a number: the US Squash number wins, the name is the fallback. */
const opponentKey = (item: { opponentId?: string | null; opponentName?: string; opponent?: string }) =>
  item.opponentId ? `id:${item.opponentId}` : `name:${(item.opponentName ?? item.opponent ?? '').trim().toLowerCase()}`;

/**
 * A player's private journal for match notes. It is stored apart from the board, so it stays when a match leaves
 * the board, and only this player's link can read it. The phone keyboard's microphone does the dictating.
 */
export default function PlayerJournal({ shareToken, matches }: { shareToken: string; matches: Match[] }) {
  const base = `api/players/${encodeURIComponent(shareToken)}/notes`;
  const [notes, setNotes] = useState<JournalNote[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [about, setAbout] = useState('');
  const [otherName, setOtherName] = useState('');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const alive = useRef(true);

  const load = useCallback(() => {
    setLoadError('');
    call<{ notes: JournalNote[] }>(base)
      .then((data) => { if (alive.current) setNotes(data?.notes ?? []); })
      .catch((failure: Error) => { if (alive.current) setLoadError(failure.message); });
  }, [base]);
  useEffect(() => { alive.current = true; load(); return () => { alive.current = false; }; }, [load]);

  // One choice per opponent the player has a match with, newest match first.
  const choices = useMemo(() => {
    const seen = new Map<string, { key: string; label: string; opponentId: string | null; opponentName: string; matchKey: string | null }>();
    for (const match of [...matches].sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt))) {
      const key = opponentKey(match);
      if (seen.has(key) || !match.opponent || match.opponent === 'To be decided') continue;
      seen.set(key, {
        key, opponentId: match.opponentId ?? null, opponentName: match.opponent, matchKey: match.externalId ?? null,
        label: `${match.opponent}, ${formatDay(match.startsAt, matchZone(match))}`,
      });
    }
    return [...seen.values()];
  }, [matches]);

  const people = useMemo(() => {
    const byKey = new Map<string, string>();
    for (const note of notes ?? []) byKey.set(opponentKey(note), note.opponentName);
    return [...byKey.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [notes]);
  const shown = (notes ?? []).filter((note) => !filter || opponentKey(note) === filter);

  const save = async () => {
    const body = text.trim();
    const choice = choices.find((item) => item.key === about);
    const opponentName = about === OTHER ? otherName.trim() : choice?.opponentName ?? '';
    if (!body || !opponentName || saving) return;
    setSaving(true); setError('');
    try {
      const created = await call<JournalNote>(base, {
        method: 'POST',
        body: JSON.stringify({ body, opponentName, opponentId: about === OTHER ? null : choice?.opponentId ?? null, matchKey: about === OTHER ? null : choice?.matchKey ?? null }),
      });
      if (!alive.current || !created) return;
      setNotes((current) => [created, ...(current ?? [])]);
      setText('');
    } catch (failure) {
      if (alive.current) setError((failure as Error).message);
    } finally {
      if (alive.current) setSaving(false);
    }
  };

  const saveEdit = async (note: JournalNote) => {
    const body = editText.trim();
    if (!body) return;
    setError('');
    try {
      const updated = await call<JournalNote>(`${base}/${encodeURIComponent(note.id)}`, { method: 'PUT', body: JSON.stringify({ body }) });
      if (!alive.current || !updated) return;
      setNotes((current) => (current ?? []).map((item) => (item.id === note.id ? updated : item)));
      setEditingId(null);
    } catch (failure) {
      if (alive.current) setError((failure as Error).message);
    }
  };

  const remove = async (note: JournalNote) => {
    setError('');
    try {
      await call<null>(`${base}/${encodeURIComponent(note.id)}`, { method: 'DELETE' });
      if (!alive.current) return;
      setNotes((current) => (current ?? []).filter((item) => item.id !== note.id));
      setConfirmId(null);
    } catch (failure) {
      if (alive.current) setError((failure as Error).message);
    }
  };

  const canSave = !!text.trim() && !saving && (about === OTHER ? !!otherName.trim() : !!about);

  return (
    <section data-testid="player-journal" className="mt-10">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">My notes</p>
      <h2 className="mt-1 font-serif text-2xl font-bold">Match journal</h2>
      <p className="mt-1 text-xs text-muted-foreground">Private. Only you can read these, on this link. Notes stay in the app, so you can look up an opponent the next time you play them. To dictate, tap the microphone on your phone's keyboard.</p>

      {loadError ? (
        <div role="alert" className="mt-3 rounded-xl border border-border p-3 text-xs">
          <p className="text-destructive">Your journal could not be loaded. {loadError}</p>
          <button type="button" onClick={load} className="mt-2 rounded-lg bg-muted px-3 py-2 font-bold">Try again</button>
        </div>
      ) : notes === null ? (
        <div aria-busy="true" className="mt-3 h-20 animate-pulse rounded-2xl bg-muted" />
      ) : (
        <>
          <div className="mt-3 space-y-2 rounded-2xl border border-border bg-card p-3">
            <label className="block text-xs font-bold">About which opponent?
              <select data-testid="journal-about" value={about} onChange={(event) => setAbout(event.target.value)} className="field mt-1 block w-full">
                <option value="">Choose…</option>
                {choices.map((choice) => <option key={choice.key} value={choice.key}>{choice.label}</option>)}
                <option value={OTHER}>Someone else…</option>
              </select>
            </label>
            {about === OTHER && <input data-testid="journal-other" className="field w-full" value={otherName} maxLength={120} placeholder="Opponent's name" onChange={(event) => setOtherName(event.target.value)} />}
            <label className="block text-xs font-bold">Your note
              <textarea data-testid="journal-text" value={text} maxLength={MAX} rows={4} placeholder="What worked, what to do next time" onChange={(event) => setText(event.target.value)} className="field mt-1 block w-full" />
            </label>
            <button data-testid="journal-save" type="button" disabled={!canSave} onClick={() => void save()} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50">{saving ? 'Saving…' : 'Save note'}</button>
          </div>
          {error && <p data-testid="journal-error" role="alert" className="mt-2 text-xs text-destructive">{error}</p>}

          {people.length > 1 && (
            <label className="mt-4 block text-xs font-bold">Show notes about
              <select data-testid="journal-filter" value={filter} onChange={(event) => setFilter(event.target.value)} className="field mt-1 block w-full">
                <option value="">Everyone</option>
                {people.map(([key, name]) => <option key={key} value={key}>{name}</option>)}
              </select>
            </label>
          )}
          <div className="mt-3 space-y-3">
            {shown.length === 0 && <p data-testid="journal-empty" className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">{notes.length === 0 ? 'No notes yet. Your first one will show up here.' : 'No notes about this opponent yet.'}</p>}
            {shown.map((note) => (
              <article key={note.id} data-testid={`journal-note-${note.id}`} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold">{note.opponentName}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground">{new Date(note.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  {editingId !== note.id && confirmId !== note.id && (
                    <div className="flex shrink-0 gap-1">
                      <button type="button" aria-label="Edit note" onClick={() => { setEditingId(note.id); setEditText(note.body); setConfirmId(null); }} className="rounded-lg p-2 text-muted-foreground hover:bg-muted"><Pencil size={15} /></button>
                      <button type="button" aria-label="Delete note" onClick={() => { setConfirmId(note.id); setEditingId(null); }} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={15} /></button>
                    </div>
                  )}
                </div>
                {editingId === note.id ? (
                  <div className="mt-2 space-y-2">
                    <textarea data-testid="journal-edit-text" value={editText} maxLength={MAX} rows={4} onChange={(event) => setEditText(event.target.value)} className="field block w-full" />
                    <div className="flex gap-2">
                      <button type="button" data-testid="journal-edit-save" disabled={!editText.trim()} onClick={() => void saveEdit(note)} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50">Save</button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-lg px-3 py-2 text-xs font-bold hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{note.body}</p>
                )}
                {confirmId === note.id && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="font-bold">Delete this note?</span>
                    <button type="button" data-testid="journal-delete-confirm" onClick={() => void remove(note)} className="rounded-lg bg-destructive px-3 py-2 font-bold text-white">Delete</button>
                    <button type="button" onClick={() => setConfirmId(null)} className="rounded-lg px-3 py-2 font-bold hover:bg-muted">Keep</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
