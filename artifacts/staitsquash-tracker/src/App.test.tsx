import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';

const initialHealth = {
  consecutiveFailures: 0,
  alertThreshold: 3,
  lastFailureAt: null,
  alertSentAt: null,
  pendingRecoveryNotices: 0,
};

const tracker = {
  players: [{ id: 'player-1', name: 'Alex Morgan' }],
  coaches: [
    { id: 'coach-1', name: 'Coach One' },
    { id: 'coach-2', name: 'Coach Two' },
  ],
  matches: [{
    id: 'match-1',
    externalId: null,
    playerId: 'player-1',
    opponent: 'Original Opponent',
    startsAt: '2026-09-19T09:00:00.000Z',
    endsAt: '2026-09-19T10:00:00.000Z',
    venue: 'Original Venue',
    court: '1',
    coachId: 'coach-1',
    status: 'upcoming',
    result: null,
    report: null,
  }],
  lastUpdatedAt: '2026-09-16T12:00:00.000Z',
  source: 'sample',
  refreshHealth: initialHealth,
  branding: { name: 'StaitSquash', logoPath: null },
};

describe('tracker health polling', () => {
  let healthResponses: Array<typeof initialHealth>;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    healthResponses = [
      initialHealth,
      { ...initialHealth, pendingRecoveryNotices: 2 },
    ];
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/tracker/health')) {
        return new Response(JSON.stringify(healthResponses.shift() ?? healthResponses.at(-1) ?? initialHealth), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (url.endsWith('/api/tracker')) {
        return new Response(JSON.stringify(tracker), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`Unexpected request: ${url}`);
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('updates the queued recovery warning without interrupting unsaved match edits', async () => {
    render(<App />);

    const editButton = await screen.findByTestId('button-edit-match-match-1');
    fireEvent.click(editButton);

    const unsavedValues = {
      opponent: 'Unsaved Opponent',
      startsAt: '2026-09-20T11:15',
      endsAt: '2026-09-20T12:45',
      venue: 'Unsaved Venue',
      court: '7',
      coachId: 'coach-2',
    };

    fireEvent.change(screen.getByTestId('input-opponent'), { target: { value: unsavedValues.opponent } });
    fireEvent.change(screen.getByTestId('input-starts-at'), { target: { value: unsavedValues.startsAt } });
    fireEvent.change(screen.getByTestId('input-ends-at'), { target: { value: unsavedValues.endsAt } });
    fireEvent.change(screen.getByTestId('input-venue'), { target: { value: unsavedValues.venue } });
    fireEvent.change(screen.getByTestId('input-court'), { target: { value: unsavedValues.court } });
    fireEvent.change(screen.getByTestId('select-coach'), { target: { value: unsavedValues.coachId } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });

    await waitFor(() => expect(screen.getByTestId('notice-pending-recoveries')).toHaveTextContent(
      '2 Club Locker recovery notices are queued for staff',
    ));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Edit match' })).toBeInTheDocument();
    expect(screen.getByTestId('input-opponent')).toHaveValue(unsavedValues.opponent);
    expect(screen.getByTestId('input-starts-at')).toHaveValue(unsavedValues.startsAt);
    expect(screen.getByTestId('input-ends-at')).toHaveValue(unsavedValues.endsAt);
    expect(screen.getByTestId('input-venue')).toHaveValue(unsavedValues.venue);
    expect(screen.getByTestId('input-court')).toHaveValue(unsavedValues.court);
    expect(screen.getByTestId('select-coach')).toHaveValue(unsavedValues.coachId);
  });
});