import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('@clerk/react', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  SignIn: () => <div>Sign in form</div>,
  Show: ({ children, when }: { children: React.ReactNode; when: 'signed-in' | 'signed-out' }) => (
    (when === 'signed-in') === signedIn ? children : null
  ),
  useClerk: () => ({ addListener: () => () => undefined }),
}));

afterEach(() => cleanup());

const initialHealth = {
  consecutiveFailures: 0,
  alertThreshold: 3,
  lastFailureAt: null,
  alertSentAt: null,
  pendingRecoveryNotices: 0,
};

const tracker = {
  players: [{ id: 'player-1', name: 'Alex Morgan', shareToken: 'a'.repeat(43) }],
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
    signedIn = true;
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
    cleanup();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('updates the queued recovery warning without interrupting unsaved match edits', async () => {
    render(<App />);

    fireEvent.click(await screen.findByTestId('tab-players'));
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

describe('tracker logo settings', () => {
  let persistedTracker: typeof tracker;
  let uploadedPaths: string[];
  let deletedPaths: string[];

  beforeEach(() => {
    persistedTracker = structuredClone(tracker);
    uploadedPaths = ['/objects/uploads/logos/logo-one', '/objects/uploads/logos/logo-two'];
    deletedPaths = [];
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/tracker/health')) {
        return Response.json(initialHealth);
      }
      if (url.endsWith('/api/tracker') && (!init?.method || init.method === 'GET')) {
        return Response.json(persistedTracker);
      }
      if (url.endsWith('/api/tracker/logo') && init?.method === 'POST') {
        const objectPath = uploadedPaths.shift();
        if (!objectPath) return Response.json({ error: 'No path' }, { status: 500 });
        return Response.json({ objectPath });
      }
      if (url.endsWith('/api/tracker/logo') && init?.method === 'DELETE') {
        deletedPaths.push((JSON.parse(String(init.body)) as { objectPath: string }).objectPath);
        return new Response(null, { status: 204 });
      }
      if (url.endsWith('/api/tracker/settings') && init?.method === 'PUT') {
        const body = JSON.parse(String(init.body)) as {
          branding: typeof persistedTracker.branding;
          coaches: typeof persistedTracker.coaches;
        };
        persistedTracker = { ...persistedTracker, ...body };
        return Response.json(persistedTracker);
      }
      throw new Error(`Unexpected request: ${url}`);
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const validPng = (name: string) => new File(
    [new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])],
    name,
    { type: 'image/png' },
  );

  it('persists an uploaded logo across reload, replacement, and removal', async () => {
    const firstRender = render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    fireEvent.change(screen.getByTestId('input-logo-file'), {
      target: { files: [validPng('first.png')] },
    });
    await waitFor(() => expect(screen.getByAltText('Logo preview')).toHaveAttribute(
      'src',
      '/api/storage/objects/uploads/logos/logo-one',
    ));
    fireEvent.click(screen.getByTestId('button-save-settings'));
    await screen.findByText('Settings saved');
    firstRender.unmount();

    const reloaded = render(<App />);
    await waitFor(() => expect(reloaded.getByRole('banner').querySelector('img')).toHaveAttribute(
      'src',
      '/api/storage/objects/uploads/logos/logo-one',
    ));
    fireEvent.click(screen.getByTestId('button-settings'));
    fireEvent.change(screen.getByTestId('input-logo-file'), {
      target: { files: [validPng('replacement.png')] },
    });
    await waitFor(() => expect(screen.getByAltText('Logo preview')).toHaveAttribute(
      'src',
      '/api/storage/objects/uploads/logos/logo-two',
    ));
    fireEvent.click(screen.getByTestId('button-save-settings'));
    await screen.findByText('Settings saved');
    expect(reloaded.getByRole('banner').querySelector('img')).toHaveAttribute(
      'src',
      '/api/storage/objects/uploads/logos/logo-two',
    );

    fireEvent.click(screen.getByTestId('button-settings'));
    fireEvent.click(screen.getByTestId('button-remove-logo'));
    fireEvent.click(screen.getByTestId('button-save-settings'));
    await screen.findByText('Settings saved');
    expect(reloaded.getByRole('banner').querySelector('img')).toBeNull();
    expect(persistedTracker.branding.logoPath).toBeNull();
    reloaded.unmount();

    render(<App />);
    await screen.findByTestId('button-settings');
    expect(screen.getByRole('banner').querySelector('img')).toBeNull();
  });

  it('shows a clear error for unsupported and oversized logo files', async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    const input = screen.getByTestId('input-logo-file');

    fireEvent.change(input, {
      target: { files: [new File(['plain text'], 'logo.txt', { type: 'text/plain' })] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Choose a PNG, JPG, WebP, or GIF image up to 5 MB.',
    );

    fireEvent.change(input, {
      target: { files: [new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'huge.png', { type: 'image/png' })] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Choose a PNG, JPG, WebP, or GIF image up to 5 MB.',
    );
    expect(fetch).not.toHaveBeenCalledWith(
      '/api/tracker/logo',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('deletes temporary logos when replaced or abandoned before settings are saved', async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    fireEvent.change(screen.getByTestId('input-logo-file'), {
      target: { files: [validPng('first.png')] },
    });
    await screen.findByAltText('Logo preview');

    fireEvent.change(screen.getByTestId('input-logo-file'), {
      target: { files: [validPng('second.png')] },
    });
    await waitFor(() => expect(deletedPaths).toContain('/objects/uploads/logos/logo-one'));

    fireEvent.click(screen.getByTestId('button-close-modal'));
    await waitFor(() => expect(deletedPaths).toEqual([
      '/objects/uploads/logos/logo-one',
      '/objects/uploads/logos/logo-two',
    ]));
    expect(persistedTracker.branding.logoPath).toBeNull();
  });

  it('cleans up an upload that finishes after the settings editor unmounts', async () => {
    let finishUpload!: (response: Response) => void;
    const pendingUpload = new Promise<Response>((resolve) => {
      finishUpload = resolve;
    });
    const defaultFetch = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/tracker/logo') && init?.method === 'POST') {
        return pendingUpload;
      }
      return defaultFetch(input, init);
    });

    const view = render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    fireEvent.change(screen.getByTestId('input-logo-file'), {
      target: { files: [validPng('late.png')] },
    });
    expect(screen.getByTestId('button-close-modal')).toBeDisabled();

    view.unmount();
    finishUpload(Response.json({ objectPath: '/objects/uploads/logos/logo-late' }));
    await waitFor(() => expect(deletedPaths).toContain('/objects/uploads/logos/logo-late'));
  });

  it('keeps settings open while a save is in flight', async () => {
    let finishSave!: (response: Response) => void;
    const pendingSave = new Promise<Response>((resolve) => {
      finishSave = resolve;
    });
    const defaultFetch = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/tracker/settings') && init?.method === 'PUT') {
        return pendingSave;
      }
      return defaultFetch(input, init);
    });

    render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    fireEvent.click(screen.getByTestId('button-save-settings'));
    await waitFor(() => expect(screen.getByTestId('button-close-modal')).toBeDisabled());
    fireEvent.mouseDown(screen.getByTestId('modal-overlay'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    finishSave(Response.json(persistedTracker));
    await screen.findByText('Settings saved');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the public staff landing page when signed out', () => {
    signedIn = false;
    render(<App />);
    expect(screen.getByRole('heading', { name: 'StaitSquash tracker' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Staff sign in' })).toBeInTheDocument();
    expect(screen.queryByTestId('button-settings')).not.toBeInTheDocument();
  });
});

describe('read-only player links', () => {
  beforeEach(() => {
    window.history.pushState({}, '', `/players/${'a'.repeat(43)}`);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.history.pushState({}, '', '/');
  });

  it('renders only the requested player, their matches, and assigned coaches', async () => {
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith(`/api/players/${'a'.repeat(43)}/tracker`)) {
        return Response.json({
          player: { id: 'player-1', name: 'Visible Player' },
          matches: [
            {
              ...tracker.matches[0],
              id: 'visible-match',
              opponent: 'Visible Opponent',
              coachId: 'coach-1',
            },
            {
              ...tracker.matches[0],
              id: 'private-match',
              playerId: 'player-2',
              opponent: 'Private Opponent',
              venue: 'Private Venue',
              coachId: 'coach-private',
            },
          ],
          coaches: [
            { id: 'coach-1', name: 'Visible Coach' },
            { id: 'coach-private', name: 'Private Coach' },
          ],
          branding: tracker.branding,
          lastUpdatedAt: tracker.lastUpdatedAt,
        });
      }
      throw new Error(`Unexpected request: ${url}`);
    }));

    render(<App />);

    expect(await screen.findByRole('heading', { name: 'Visible Player' })).toBeInTheDocument();
    expect(screen.getByText('Visible Opponent')).toBeInTheDocument();
    expect(screen.getByText('Visible Coach')).toBeInTheDocument();
    expect(screen.queryByText('Private Opponent')).not.toBeInTheDocument();
    expect(screen.queryByText('Private Venue')).not.toBeInTheDocument();
    expect(screen.queryByText('Private Coach')).not.toBeInTheDocument();
    expect(screen.queryByText('Alex Morgan')).not.toBeInTheDocument();
    expect(screen.queryByText('Coach Two')).not.toBeInTheDocument();
    expect(screen.queryByTestId('button-settings')).not.toBeInTheDocument();
  });

  it('shows a safe not-found state for an unknown player link', async () => {
    window.history.replaceState({}, '', `/players/${'z'.repeat(43)}`);
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith(`/api/players/${'z'.repeat(43)}/tracker`)) {
        return Response.json({ error: 'Player link not found' }, { status: 404 });
      }
      throw new Error(`Unexpected request: ${url}`);
    }));

    render(<App />);

    expect(await screen.findByRole('heading', { name: 'This player could not be found.' })).toBeInTheDocument();
    expect(screen.getByText('Ask your coach or match desk for an updated link.')).toBeInTheDocument();
    expect(screen.queryByText('Player One')).not.toBeInTheDocument();
    expect(screen.queryByTestId('button-settings')).not.toBeInTheDocument();
  });
});

let signedIn = true;

describe('match desk fixes', () => {
  let persistedTracker: typeof tracker;
  let savedCoaches: Array<{ id: string; name: string }> | null;
  let trackerStatus: number;
  let patches: Array<Record<string, unknown>>;

  beforeEach(() => {
    signedIn = true;
    trackerStatus = 200;
    savedCoaches = null;
    patches = [];
    persistedTracker = structuredClone(tracker);
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/tracker/health')) return Response.json(initialHealth);
      if (url.endsWith('/api/tracker') && (!init?.method || init.method === 'GET')) {
        return trackerStatus === 200
          ? Response.json(persistedTracker)
          : Response.json({ error: 'This account is not approved for staff access' }, { status: trackerStatus });
      }
      if (url.endsWith('/api/tracker/settings') && init?.method === 'PUT') {
        const body = JSON.parse(String(init.body)) as { coaches: Array<{ id: string; name: string }> };
        savedCoaches = body.coaches;
        persistedTracker = { ...persistedTracker, ...body };
        return Response.json(persistedTracker);
      }
      const patchMatch = /\/api\/matches\/([^/]+)$/.exec(url);
      if (patchMatch && init?.method === 'PATCH') {
        const patch = JSON.parse(String(init.body)) as Record<string, unknown>;
        patches.push(patch);
        const id = decodeURIComponent(patchMatch[1]);
        persistedTracker = {
          ...persistedTracker,
          matches: persistedTracker.matches.map((match) => match.id === id ? { ...match, ...patch } : match),
        } as typeof tracker;
        return Response.json(persistedTracker.matches.find((match) => match.id === id));
      }
      throw new Error(`Unexpected request: ${url}`);
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('tells a signed-in but unapproved coach to ask for approval', async () => {
    trackerStatus = 403;
    render(<App />);
    expect(await screen.findByTestId('heading-not-approved')).toHaveTextContent('not approved yet');
    expect(screen.queryByText('The locker room is offline.')).not.toBeInTheDocument();
  });

  it('keeps coach IDs when renaming and supports adding and removing coaches', async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId('button-settings'));
    fireEvent.change(screen.getByTestId('input-coach-1'), { target: { value: 'Narelle' } });
    fireEvent.click(screen.getByTestId('button-remove-coach-2'));
    fireEvent.click(screen.getByTestId('button-add-coach'));
    fireEvent.change(screen.getByTestId('input-coach-2'), { target: { value: 'Jamie' } });
    fireEvent.click(screen.getByTestId('button-save-settings'));
    await screen.findByText('Settings saved');

    expect(savedCoaches?.[0]).toEqual({ id: 'coach-1', name: 'Narelle' });
    expect(savedCoaches).toHaveLength(2);
    expect(savedCoaches?.[1]?.name).toBe('Jamie');
    expect(savedCoaches?.[1]?.id).not.toBe('coach-2');
  });

  it('does not report unassigned matches as a coach overlap and counts filed reports', async () => {
    const overlapping = {
      ...tracker.matches[0],
      coachId: 'unassigned',
      report: null,
    };
    persistedTracker = {
      ...persistedTracker,
      coaches: [...tracker.coaches, { id: 'unassigned', name: 'Unassigned' }],
      matches: [
        { ...overlapping, id: 'match-a' },
        { ...overlapping, id: 'match-b', playerId: 'player-2' },
        {
          ...overlapping,
          id: 'match-c',
          status: 'completed',
          result: 'Won 3-0',
          startsAt: '2026-09-18T09:00:00.000Z',
          endsAt: '2026-09-18T10:00:00.000Z',
        },
      ],
    } as typeof tracker;
    render(<App />);
    fireEvent.click(await screen.findByTestId('tab-players'));
    await screen.findByTestId('card-match-match-a');
    expect(screen.queryByTestId('notice-conflict')).not.toBeInTheDocument();
    expect(screen.getByTestId('stat-coaches')).toHaveTextContent('0 reports filed');
  });

  it('opens on a next-up board with one row per player and an inline coach dropdown', async () => {
    render(<App />);
    const row = await screen.findByTestId('row-next-player-1');
    expect(row).toHaveTextContent('Alex Morgan');
    expect(row).toHaveTextContent('vs Original Opponent');
    expect(screen.getByTestId('select-assign-match-1')).toHaveValue('coach-1');
  });
  const withSystemCoaches = () => [
    ...tracker.coaches,
    { id: 'unassigned', name: 'Unassigned' },
    { id: 'not-coaching', name: 'Not coaching' },
  ];

  it('groups the next-up board by venue and keeps system coaches out of the coach count', async () => {
    const base = tracker.matches[0];
    persistedTracker = {
      ...persistedTracker,
      players: [...tracker.players, { id: 'player-2', name: 'Sam Two', shareToken: 'b'.repeat(43) }],
      coaches: withSystemCoaches(),
      matches: [
        { ...base, id: 'match-a', venue: 'Venue A' },
        { ...base, id: 'match-b', playerId: 'player-2', venue: 'Venue B' },
      ],
    } as typeof tracker;
    render(<App />);
    expect(await screen.findByTestId('group-Venue A')).toHaveTextContent('Venue A · 1 player');
    expect(screen.getByTestId('group-Venue B')).toHaveTextContent('Venue B · 1 player');
    expect(screen.getByTestId('stat-coaches')).toHaveTextContent(/^Coaches2/);
  });

  it('offers Not coaching and a Virtual toggle, and saves both from the board', async () => {
    persistedTracker = { ...persistedTracker, coaches: withSystemCoaches() } as typeof tracker;
    render(<App />);
    const select = await screen.findByTestId('select-assign-match-1') as HTMLSelectElement;
    expect(Array.from(select.options).map((option) => option.value)).toEqual(['coach-1', 'coach-2', 'not-coaching', 'unassigned']);

    fireEvent.click(screen.getByTestId('toggle-virtual-match-1'));
    await waitFor(() => expect(patches).toEqual([{ coachMode: 'virtual' }]));
    await waitFor(() => expect(screen.getByTestId('toggle-virtual-match-1')).toBeChecked());

    fireEvent.change(select, { target: { value: 'not-coaching' } });
    await waitFor(() => expect(patches[1]).toEqual({ coachId: 'not-coaching' }));
    await waitFor(() => expect(screen.queryByTestId('toggle-virtual-match-1')).not.toBeInTheDocument());
  });
  it('tags moved matches and StaitSquash-vs-StaitSquash, and filters by coach', async () => {
    const base = tracker.matches[0];
    persistedTracker = {
      ...persistedTracker,
      players: [...tracker.players, { id: 'player-2', name: 'Sam Two', shareToken: 'b'.repeat(43) }],
      coaches: withSystemCoaches(),
      matches: [
        {
          ...base,
          id: 'match-a',
          court: 'Court 4',
          moved: { at: new Date().toISOString(), fromStartsAt: '2026-09-19T08:15:00.000Z', fromCourt: 'Court 2' },
        },
        { ...base, id: 'match-b', playerId: 'player-2', coachId: 'coach-2', teammates: true },
      ],
    } as unknown as typeof tracker;
    render(<App />);
    expect(await screen.findByTestId('tag-moved-match-a')).toHaveTextContent('was Court 2');
    expect(screen.getByTestId('tag-teammates-match-b')).toHaveTextContent('vs StaitSquash');

    fireEvent.click(screen.getByTestId('chip-coach-coach-1'));
    expect(screen.getByTestId('row-next-player-1')).toBeInTheDocument();
    expect(screen.queryByTestId('row-next-player-2')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('chip-everyone'));
    expect(screen.getByTestId('row-next-player-2')).toBeInTheDocument();
  });
});
