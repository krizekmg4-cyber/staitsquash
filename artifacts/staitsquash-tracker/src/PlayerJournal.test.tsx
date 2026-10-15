import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PlayerJournal, { type JournalNote } from './PlayerJournal';
import type { Match } from '@workspace/api-client-react';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const match = (id: string, opponent: string, opponentId: string | undefined, startsAt: string) => ({
  id, externalId: `1:${id}:9`, playerId: '9', opponent, ...(opponentId ? { opponentId } : {}), startsAt, endsAt: startsAt,
  venue: 'Club', court: '1', coachId: 'c1', status: 'completed',
}) as Match;

const matches = [
  match('a', 'Kai Smith', '5551', '2026-10-03T14:00:00Z'),
  match('b', 'Lee Park', undefined, '2026-10-04T14:00:00Z'),
  match('c', 'Kai Smith', '5551', '2026-10-10T14:00:00Z'),
];

function stubApi(initial: JournalNote[] = []) {
  let notes = [...initial];
  const calls: string[] = [];
  vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push(`${init?.method ?? 'GET'} ${url}`);
    if (url.endsWith('/notes') && !init?.method) return Response.json({ notes });
    if (url.endsWith('/notes') && init?.method === 'POST') {
      const body = JSON.parse(String(init.body));
      const created = { id: `n${notes.length + 1}`, opponentId: body.opponentId, opponentName: body.opponentName, matchKey: body.matchKey, body: body.body, createdAt: '2026-10-17T15:00:00.000Z', updatedAt: '2026-10-17T15:00:00.000Z' };
      notes = [created, ...notes];
      return Response.json(created, { status: 201 });
    }
    if (init?.method === 'PUT') {
      const id = url.split('/').pop()!;
      notes = notes.map((note) => (note.id === id ? { ...note, body: JSON.parse(String(init.body)).body } : note));
      return Response.json(notes.find((note) => note.id === id));
    }
    if (init?.method === 'DELETE') {
      const id = url.split('/').pop()!;
      notes = notes.filter((note) => note.id !== id);
      return new Response(null, { status: 204 });
    }
    throw new Error(`Unexpected request: ${url}`);
  }));
  return { calls };
}

describe('player journal', () => {
  it('offers each opponent once, saves a note about them, then edits and deletes it', async () => {
    const api = stubApi();
    render(<PlayerJournal shareToken={'t'.repeat(43)} matches={matches} />);
    await screen.findByTestId('journal-about');
    const options = [...(screen.getByTestId('journal-about') as HTMLSelectElement).options].map((option) => option.text);
    expect(options.filter((text) => text.startsWith('Kai Smith'))).toHaveLength(1);
    expect(options).toContain('Someone else…');
    expect(screen.getByTestId('journal-save')).toBeDisabled();

    fireEvent.change(screen.getByTestId('journal-about'), { target: { value: 'id:5551' } });
    fireEvent.change(screen.getByTestId('journal-text'), { target: { value: 'Lefty. Hits the nick on the forehand.' } });
    fireEvent.click(screen.getByTestId('journal-save'));
    const note = await screen.findByTestId('journal-note-n1');
    expect(note).toHaveTextContent('Kai Smith');
    expect(note).toHaveTextContent('Lefty. Hits the nick on the forehand.');
    const post = api.calls.find((call) => call.startsWith('POST'))!;
    expect(post).toContain('/api/players/');

    fireEvent.click(screen.getByLabelText('Edit note'));
    fireEvent.change(screen.getByTestId('journal-edit-text'), { target: { value: 'Lefty. Play to the backhand.' } });
    fireEvent.click(screen.getByTestId('journal-edit-save'));
    await waitFor(() => expect(screen.getByTestId('journal-note-n1')).toHaveTextContent('Play to the backhand'));

    fireEvent.click(screen.getByLabelText('Delete note'));
    fireEvent.click(screen.getByTestId('journal-delete-confirm'));
    await waitFor(() => expect(screen.queryByTestId('journal-note-n1')).toBeNull());
    expect(screen.getByTestId('journal-empty')).toBeInTheDocument();
  });

  it('lets a note be about someone not on the matches list, and filters by opponent', async () => {
    stubApi([
      { id: 'x1', opponentId: '5551', opponentName: 'Kai Smith', matchKey: null, body: 'Old note', createdAt: '2026-09-01T10:00:00.000Z', updatedAt: '2026-09-01T10:00:00.000Z' },
      { id: 'x2', opponentId: null, opponentName: 'Lee Park', matchKey: null, body: 'Slow starter', createdAt: '2026-09-02T10:00:00.000Z', updatedAt: '2026-09-02T10:00:00.000Z' },
    ]);
    render(<PlayerJournal shareToken={'t'.repeat(43)} matches={matches} />);
    await screen.findByTestId('journal-note-x1');
    fireEvent.change(screen.getByTestId('journal-filter'), { target: { value: 'id:5551' } });
    expect(screen.queryByTestId('journal-note-x2')).toBeNull();
    expect(screen.getByTestId('journal-note-x1')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('journal-about'), { target: { value: '__other__' } });
    expect(screen.getByTestId('journal-save')).toBeDisabled();
    fireEvent.change(screen.getByTestId('journal-other'), { target: { value: 'Pat Jones' } });
    fireEvent.change(screen.getByTestId('journal-text'), { target: { value: 'Met at Penn' } });
    expect(screen.getByTestId('journal-save')).not.toBeDisabled();
  });

  it('says so, and offers to retry, when the journal cannot be loaded', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ error: 'down' }, { status: 503 })));
    render(<PlayerJournal shareToken={'t'.repeat(43)} matches={matches} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('could not be loaded');
  });
});
