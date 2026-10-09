import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, UserCheck, X } from 'lucide-react';

type AccessCoach = { id: string; email: string; name: string };

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

export default function CoachAccessSection() {
  const [coaches, setCoaches] = useState<AccessCoach[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [email, setEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState('');
  const alive = useRef(true);

  const load = useCallback(() => {
    setLoadError('');
    setCoaches(null);
    call<{ coaches: AccessCoach[] }>('api/coach-access')
      .then((data) => { if (alive.current) setCoaches(data?.coaches ?? []); })
      .catch((error: Error) => { if (alive.current) setLoadError(error.message); });
  }, []);

  useEffect(() => {
    alive.current = true;
    load();
    return () => { alive.current = false; };
  }, [load]);

  const approve = async () => {
    const value = email.trim();
    if (!value || adding) return;
    setAdding(true); setAddError(''); setSuccess('');
    try {
      const coach = await call<AccessCoach>('api/coach-access', { method: 'POST', body: JSON.stringify({ email: value }) });
      if (!alive.current || !coach) return;
      setCoaches((current) => [...(current ?? []).filter((item) => item.id !== coach.id), coach]);
      setEmail('');
      setSuccess(`${coach.name || coach.email} can now sign in as a coach.`);
    } catch (error) {
      if (alive.current) setAddError((error as Error).message);
    } finally {
      if (alive.current) setAdding(false);
    }
  };

  const remove = async (coach: AccessCoach) => {
    setRemovingId(coach.id); setRemoveError(''); setSuccess('');
    try {
      await call<null>(`api/coach-access/${encodeURIComponent(coach.id)}`, { method: 'DELETE' });
      if (!alive.current) return;
      setCoaches((current) => (current ?? []).filter((item) => item.id !== coach.id));
      setConfirmId(null);
      setSuccess(`Coach access removed for ${coach.name || coach.email}.`);
    } catch (error) {
      if (alive.current) setRemoveError((error as Error).message);
    } finally {
      if (alive.current) setRemovingId(null);
    }
  };

  return (
    <section data-testid="section-coach-access" className="mb-6 border-b border-border pb-6">
      <p className="field-label mb-2">Coach access</p>
      <p className="text-[11px] text-muted-foreground">
        Coaches must first sign up at the app's main link. Then enter the same email here to approve them. Coaches can view all matches and save shared reports and voice notes for completed matches. They cannot edit the schedule, results, or settings. Changes here save immediately.
      </p>
      <div className="mt-3 flex gap-2">
        <input data-testid="input-coach-access-email" className="field" type="email" value={email} placeholder="coach@example.com" aria-label="Coach email"
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); void approve(); } }} />
        <button data-testid="button-approve-coach" type="button" disabled={adding || !email.trim()} onClick={() => void approve()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50">
          <UserCheck size={14} /> {adding ? 'Approving…' : 'Approve'}
        </button>
      </div>
      {addError && <p data-testid="text-coach-access-error" role="alert" className="mt-2 text-xs text-destructive">{addError}</p>}
      {success && <p data-testid="text-coach-access-success" role="status" className="mt-2 text-xs font-bold text-primary">{success}</p>}
      {removeError && <p data-testid="text-coach-access-remove-error" role="alert" className="mt-2 text-xs text-destructive">{removeError}</p>}

      <div className="mt-3 space-y-2">
        {loadError ? (
          <div role="alert" className="rounded-xl border border-border p-3 text-xs">
            <p className="text-destructive">{loadError}</p>
            <button data-testid="button-retry-coach-access" type="button" onClick={load} className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 font-bold"><RefreshCw size={13} /> Retry</button>
          </div>
        ) : coaches === null ? (
          <div data-testid="status-coach-access-loading" aria-busy="true" className="space-y-2">
            <div className="h-12 animate-pulse rounded-xl bg-muted" /><div className="h-12 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : coaches.length === 0 ? (
          <p data-testid="text-coach-access-empty" className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">No coaches approved yet. Approved coaches will appear here.</p>
        ) : coaches.map((coach) => (
          <div key={coach.id} data-testid={`row-coach-access-${coach.id}`} className="flex items-center gap-2 rounded-xl border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{coach.name || coach.email}</p>
              <p className="truncate text-xs text-muted-foreground">{coach.email}</p>
            </div>
            {confirmId === coach.id ? (
              <div className="flex shrink-0 items-center gap-1">
                <button data-testid={`button-confirm-remove-coach-access-${coach.id}`} type="button" disabled={removingId === coach.id} onClick={() => void remove(coach)} className="rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{removingId === coach.id ? 'Removing…' : 'Remove access'}</button>
                <button data-testid={`button-cancel-remove-coach-access-${coach.id}`} type="button" disabled={removingId === coach.id} onClick={() => setConfirmId(null)} className="rounded-lg px-3 py-2 text-xs font-bold hover:bg-muted">Cancel</button>
              </div>
            ) : (
              <button data-testid={`button-remove-coach-access-${coach.id}`} type="button" aria-label={`Remove access for ${coach.name || coach.email}`} onClick={() => { setConfirmId(coach.id); setRemoveError(''); }} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><X size={16} /></button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
