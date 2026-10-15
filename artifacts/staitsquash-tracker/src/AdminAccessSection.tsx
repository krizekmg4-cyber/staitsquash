import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, UserCheck, X } from 'lucide-react';

type AccessAdmin = { id: string; email: string; name: string; locked?: boolean };

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

export default function AdminAccessSection() {
  const [admins, setAdmins] = useState<AccessAdmin[] | null>(null);
  const [you, setYou] = useState<string | null>(null);
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
    setAdmins(null);
    call<{ admins: AccessAdmin[]; you: string | null }>('api/admin-access')
      .then((data) => { if (alive.current) setAdmins(data?.admins ?? []); setYou(data?.you ?? null); })
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
      const admin = await call<AccessAdmin>('api/admin-access', { method: 'POST', body: JSON.stringify({ email: value }) });
      if (!alive.current || !admin) return;
      setAdmins((current) => [...(current ?? []).filter((item) => item.id !== admin.id), admin]);
      setEmail('');
      setSuccess(`${admin.name || admin.email} is now an admin.`);
    } catch (error) {
      if (alive.current) setAddError((error as Error).message);
    } finally {
      if (alive.current) setAdding(false);
    }
  };

  const remove = async (admin: AccessAdmin) => {
    setRemovingId(admin.id); setRemoveError(''); setSuccess('');
    try {
      await call<null>(`api/admin-access/${encodeURIComponent(admin.id)}`, { method: 'DELETE' });
      if (!alive.current) return;
      setAdmins((current) => (current ?? []).filter((item) => item.id !== admin.id));
      setConfirmId(null);
      setSuccess(`Admin access removed for ${admin.name || admin.email}.`);
    } catch (error) {
      if (alive.current) setRemoveError((error as Error).message);
    } finally {
      if (alive.current) setRemovingId(null);
    }
  };

  return (
    <section data-testid="section-admin-access" className="mb-6 border-b border-border pb-6">
      <p className="field-label mb-2">Admins</p>
      <p className="text-[11px] text-muted-foreground">
        Admins can do everything: edit the schedule, add coaches and players, and add other admins. Ask the new admin to open the app link and sign in once, then enter the same email here. Changes save immediately.
      </p>
      <div className="mt-3 flex gap-2">
        <input data-testid="input-admin-access-email" className="field" type="email" value={email} placeholder="admin@example.com" aria-label="Admin email"
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); void approve(); } }} />
        <button data-testid="button-approve-admin" type="button" disabled={adding || !email.trim()} onClick={() => void approve()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50">
          <UserCheck size={14} /> {adding ? 'Approving…' : 'Approve'}
        </button>
      </div>
      {addError && <p data-testid="text-admin-access-error" role="alert" className="mt-2 text-xs text-destructive">{addError}</p>}
      {success && <p data-testid="text-admin-access-success" role="status" className="mt-2 text-xs font-bold text-primary">{success}</p>}
      {removeError && <p data-testid="text-admin-access-remove-error" role="alert" className="mt-2 text-xs text-destructive">{removeError}</p>}

      <div className="mt-3 space-y-2">
        {loadError ? (
          <div role="alert" className="rounded-xl border border-border p-3 text-xs">
            <p className="text-destructive">{loadError}</p>
            <button data-testid="button-retry-admin-access" type="button" onClick={load} className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 font-bold"><RefreshCw size={13} /> Retry</button>
          </div>
        ) : admins === null ? (
          <div data-testid="status-admin-access-loading" aria-busy="true" className="space-y-2">
            <div className="h-12 animate-pulse rounded-xl bg-muted" /><div className="h-12 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : admins.length === 0 ? (
          <p data-testid="text-admin-access-empty" className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">No other admins yet.</p>
        ) : admins.map((admin) => (
          <div key={admin.id} data-testid={`row-admin-access-${admin.id}`} className="flex items-center gap-2 rounded-xl border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{admin.name || admin.email}</p>
              <p className="truncate text-xs text-muted-foreground">{admin.email}</p>
            </div>
            {confirmId === admin.id ? (
              <div className="flex shrink-0 items-center gap-1">
                <button data-testid={`button-confirm-remove-admin-access-${admin.id}`} type="button" disabled={removingId === admin.id} onClick={() => void remove(admin)} className="rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{removingId === admin.id ? 'Removing…' : 'Remove access'}</button>
                <button data-testid={`button-cancel-remove-admin-access-${admin.id}`} type="button" disabled={removingId === admin.id} onClick={() => setConfirmId(null)} className="rounded-lg px-3 py-2 text-xs font-bold hover:bg-muted">Cancel</button>
              </div>
            ) : admin.locked || admin.id === you ? (
              <span className="shrink-0 rounded-lg bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{admin.id === you ? 'You' : 'Fixed'}</span>
            ) : (
              <button data-testid={`button-remove-admin-access-${admin.id}`} type="button" aria-label={`Remove access for ${admin.name || admin.email}`} onClick={() => { setConfirmId(admin.id); setRemoveError(''); }} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><X size={16} /></button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
