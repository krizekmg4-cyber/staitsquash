import { useQuery } from '@tanstack/react-query';

export type TrackerRole = 'staff' | 'coach';
class AccessError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export function useTrackerAccess() {
  return useQuery<{ role: TrackerRole }, AccessError>({
    queryKey: ['tracker-access'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}api/tracker/access`, {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (!response.ok) throw new AccessError(response.status, 'Tracker access could not be verified');
      const data = await response.json() as { role?: unknown };
      if (data.role !== 'staff' && data.role !== 'coach') throw new AccessError(403, 'Account is not approved');
      return { role: data.role };
    },
    staleTime: 0,
    refetchInterval: 15_000,
    retry: (count, error) => error.status !== 401 && error.status !== 403 && count < 2,
  });
}
