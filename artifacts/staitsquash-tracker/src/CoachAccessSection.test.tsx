import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import CoachAccessSection from './CoachAccessSection';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('approves, reloads and removes coach access independently of tracker settings', async () => {
  let coaches: Array<{ id: string; name: string; email: string }> = [];
  vi.stubGlobal('fetch', vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    if (init?.method === 'POST') {
      expect(JSON.parse(String(init.body))).toEqual({ email: 'coach@example.com' });
      const coach = { id: 'user_coach', name: 'Test Coach', email: 'coach@example.com' };
      coaches = [coach];
      return Response.json(coach);
    }
    if (init?.method === 'DELETE') { coaches = []; return new Response(null, { status: 204 }); }
    return Response.json({ coaches });
  }));
  const view = render(<CoachAccessSection />);
  await screen.findByTestId('text-coach-access-empty');
  fireEvent.change(screen.getByTestId('input-coach-access-email'), { target: { value: 'coach@example.com' } });
  fireEvent.click(screen.getByTestId('button-approve-coach'));
  await screen.findByTestId('row-coach-access-user_coach');
  view.unmount();
  render(<CoachAccessSection />);
  await screen.findByTestId('row-coach-access-user_coach');
  fireEvent.click(screen.getByTestId('button-remove-coach-access-user_coach'));
  fireEvent.click(screen.getByTestId('button-confirm-remove-coach-access-user_coach'));
  await screen.findByTestId('text-coach-access-empty');
  expect(coaches).toEqual([]);
});

it('shows approval and removal errors without changing the existing list', async () => {
  const coach = { id: 'user_coach', name: 'Test Coach', email: 'coach@example.com' };
  vi.stubGlobal('fetch', vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    if (init?.method === 'POST') return Response.json({ error: 'No verified account found.' }, { status: 404 });
    if (init?.method === 'DELETE') return Response.json({ error: 'Coach access could not be removed.' }, { status: 503 });
    return Response.json({ coaches: [coach] });
  }));
  render(<CoachAccessSection />);
  await screen.findByTestId('row-coach-access-user_coach');
  fireEvent.change(screen.getByTestId('input-coach-access-email'), { target: { value: 'missing@example.com' } });
  fireEvent.click(screen.getByTestId('button-approve-coach'));
  await screen.findByText('No verified account found.');
  fireEvent.click(screen.getByTestId('button-remove-coach-access-user_coach'));
  fireEvent.click(screen.getByTestId('button-confirm-remove-coach-access-user_coach'));
  await screen.findByText('Coach access could not be removed.');
  expect(screen.getByTestId('row-coach-access-user_coach')).toBeInTheDocument();
});

it('retries a failed account list load', async () => {
  let first = true;
  vi.stubGlobal('fetch', vi.fn(async () => {
    if (first) { first = false; return Response.json({ error: 'Could not list coaches' }, { status: 503 }); }
    return Response.json({ coaches: [] });
  }));
  render(<CoachAccessSection />);
  await screen.findByText('Could not list coaches');
  fireEvent.click(screen.getByRole('button', { name: /Retry/i }));
  await waitFor(() => expect(screen.getByTestId('text-coach-access-empty')).toBeInTheDocument());
});
