import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CoachingSummary } from './CoachingSummary';
import type { Coach, Match, Player } from '@workspace/api-client-react';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.useRealTimers(); });

const players = [{ id: 'p1', name: 'Connor Powell' }] as Player[];
const coaches = [{ id: 'c1', name: 'Alex' }] as Coach[];
const match = (id: string, extra: Partial<Match>) => ({
  id, externalId: `100:${id}:1`, playerId: 'p1', opponent: 'Kai', startsAt: '2026-10-10T15:00:00Z', endsAt: '2026-10-10T15:45:00Z',
  venue: 'Club', court: '1', coachId: 'c1', status: 'completed', ...extra,
}) as Match;

function stubSetup(endsOn: string) {
  vi.stubGlobal('fetch', vi.fn(async () => Response.json({ tournaments: [{ id: '100', name: 'Junior Gold', endsOn }] })));
}

describe('tournament summary', () => {
  it('shows only a grey line while the tournament is still going', async () => {
    vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date('2026-10-10T20:00:00Z'));
    stubSetup('2026-10-11');
    render(<CoachingSummary matches={[match('a', {})]} players={players} coaches={coaches} onCopy={() => {}} />);
    expect(await screen.findByTestId('summary-going-Junior Gold')).toHaveTextContent('still going');
    expect(screen.queryByTestId('summary-copy')).toBeNull();
    expect(screen.queryByText(/coached/)).toBeNull();
  });
  it('shows the totals and the match list once it is over', async () => {
    vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date('2026-10-12T14:00:00Z'));
    stubSetup('2026-10-11');
    render(<CoachingSummary matches={[match('a', {}), match('b', { coachMode: 'virtual' })]} players={players} coaches={coaches} onCopy={() => {}} />);
    expect(await screen.findByTestId('summary-Junior Gold')).toBeInTheDocument();
    expect(screen.getByTestId('coach-matches-Alex')).toHaveTextContent('2 matches, 1 virtual');
    expect(screen.getByTestId('summary-copy')).toBeInTheDocument();
  });
});

describe('summary page order and report', () => {
  it('keeps the report empty until a date is chosen, then lists past tournaments before the ones still going', async () => {
    vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date('2026-10-13T14:00:00Z'));
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ tournaments: [{ id: '100', name: 'Junior Gold', endsOn: '2026-10-11' }, { id: '200', name: 'Next Open', endsOn: '2026-10-25' }] })));
    const upcoming = match('z', { externalId: '200:z:1', status: 'upcoming', startsAt: '2026-10-24T15:00:00Z' });
    const { container } = render(<CoachingSummary matches={[match('a', {}), upcoming]} players={players} coaches={coaches} onCopy={() => {}} />);
    await screen.findByTestId('summary-report');
    expect(screen.getByTestId('report-prompt')).toBeInTheDocument();
    expect(screen.queryByTestId('report-count')).toBeNull();
    expect(screen.queryByTestId('report-csv')).toBeNull();
    const text = container.textContent ?? '';
    expect(text.indexOf('Report for any dates')).toBeLessThan(text.indexOf('Junior Gold'));
    expect(text.indexOf('Junior Gold')).toBeLessThan(text.indexOf('Next Open'));
    fireEvent.change(screen.getByTestId('report-from'), { target: { value: '2026-10-01' } });
    expect(screen.getByTestId('report-count')).toHaveTextContent('1 match coached');
  });
});
