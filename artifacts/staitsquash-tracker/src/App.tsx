import { useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Edit3,
  Mic,
  MicOff,
  Play,
  RefreshCw,
  Copy,
  Link,
  Save,
  Settings,
  Trophy,
  UsersRound,
  X,
} from 'lucide-react';
import {
  getGetTrackerQueryKey,
  getGetTrackerHealthQueryKey,
  getGetPlayerTrackerQueryKey,
  useGetTracker,
  useGetTrackerHealth,
  useGetPlayerTracker,
  useRefreshTracker,
  useRotatePlayerShareToken,
  useSaveCoachReport,
  useSaveTrackerSettings,
  useUpdateMatch,
} from '@workspace/api-client-react';
import type { Coach, Match, Player, TrackerState } from '@workspace/api-client-react';
import { type ReactNode, useEffect } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ClerkProvider, SignIn, Show, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';

type ViewMode = 'players' | 'coaches';

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const formatDay = (value: string) =>
  new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(value));

const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));

const formatInputDate = (value: string) => {
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};

const getInitials = (name: string) =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const logoSrc = (path: string | null) => path ? `/api/storage${path}` : null;
const audioSrc = (path: string | null | undefined) => path ? `/api/storage${path}` : null;

function TrackerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-8">
      <div className="h-8 w-52 animate-pulse rounded-lg bg-muted" />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse rounded-2xl bg-muted" />)}
      </div>
      <div className="mt-7 h-14 animate-pulse rounded-2xl bg-muted" />
      <div className="mt-5 space-y-3">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-40 animate-pulse rounded-2xl bg-muted" />)}
      </div>
    </div>
  );
}

function EmptyState({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-secondary text-primary">
        <CalendarDays size={27} strokeWidth={1.8} />
      </div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[.24em] text-muted-foreground">No matches yet</p>
      <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight">The courts are quiet.</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Refresh the tracker when the draw is ready. Your players and coaches will appear here in match order.</p>
      <button data-testid="button-empty-refresh" onClick={onRefresh} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
        <RefreshCw size={16} /> Refresh tracker
      </button>
    </div>
  );
}

function FailureState({ retry }: { retry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-accent/20 text-accent">
        <AlertCircle size={28} />
      </div>
      <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight">The locker room is offline.</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">We couldn't read today's draw. Try again before heading to court.</p>
      <button data-testid="button-error-retry" onClick={retry} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold transition-colors hover:bg-muted">
        <RefreshCw size={16} /> Try again
      </button>
    </div>
  );
}

function Header({ state, onRefresh, refreshing, onSettings }: { state: TrackerState; onRefresh: () => void; refreshing: boolean; onSettings: () => void }) {
  const { signOut } = useClerk();
  return (
    <header className="border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          {state.branding.logoPath ? <img src={logoSrc(state.branding.logoPath)!} alt="" className="h-10 w-10 rounded-xl bg-white object-contain p-1" /> : <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="font-serif text-xl font-black italic">S</span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-accent" />
          </div>}
          <div>
            <p className="font-serif text-lg font-bold leading-none tracking-tight">{state.branding.name}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[.2em] text-sidebar-foreground/60">Match-day tracker</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><button data-testid="button-settings" onClick={onSettings} className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-xs font-semibold text-sidebar-foreground/80 hover:bg-sidebar-accent"><Settings size={14} /><span className="hidden sm:inline">Settings</span></button><button data-testid="button-refresh-tracker" onClick={onRefresh} disabled={refreshing} className="group inline-flex items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-xs font-semibold text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent disabled:opacity-60">
          <RefreshCw size={14} className={cx(refreshing && 'animate-spin')} />
          <span className="hidden sm:inline">{refreshing ? 'Updating' : 'Refresh draw'}</span>
        </button><button type="button" onClick={() => signOut({ redirectUrl: basePath || '/' })} className="rounded-lg border border-sidebar-border px-3 py-2 text-xs font-semibold text-sidebar-foreground/80 hover:bg-sidebar-accent">Sign out</button></div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-4 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-sidebar-foreground/50">
          {state.source === 'club-locker' ? 'Club Locker' : 'Sample draw'} <span className="mx-1 text-sidebar-primary">·</span> updated {formatTime(state.lastUpdatedAt)}
        </p>
        <div className="flex -space-x-2">
          {state.players.slice(0, 3).map((player) => (
            <div data-testid={`avatar-player-${player.id}`} key={player.id} title={player.name} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-sidebar bg-sidebar-accent font-mono text-[9px] font-bold text-sidebar-primary">
              {getInitials(player.name)}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function SummaryStrip({ matches, players, coaches }: { matches: Match[]; players: Player[]; coaches: Coach[] }) {
  const upcoming = matches.filter((match) => match.status === 'upcoming').length;
  const completed = matches.filter((match) => match.status === 'completed').length;
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <div data-testid="stat-players" className="rounded-2xl border border-card-border bg-card p-3 shadow-sm sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">Players</p>
        <p className="mt-2 font-serif text-2xl font-bold">{players.length}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">on the draw</p>
      </div>
      <div data-testid="stat-upcoming" className="rounded-2xl border border-card-border bg-card p-3 shadow-sm sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">On deck</p>
        <p className="mt-2 font-serif text-2xl font-bold text-accent">{upcoming}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">upcoming matches</p>
      </div>
      <div data-testid="stat-coaches" className="rounded-2xl border border-card-border bg-card p-3 shadow-sm sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">Coaches</p>
        <p className="mt-2 font-serif text-2xl font-bold">{coaches.length}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{completed} reports filed</p>
      </div>
    </div>
  );
}

function ConflictNotice({ matches, players, coaches }: { matches: Match[]; players: Player[]; coaches: Coach[] }) {
  const conflicts = useMemo(() => {
    const sorted = [...matches].filter((match) => match.status === 'upcoming').sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
    const output: Array<{ first: Match; second: Match }> = [];
    sorted.forEach((first, index) => sorted.slice(index + 1).forEach((second) => {
      const overlaps = new Date(second.startsAt) < new Date(first.endsAt) && new Date(second.endsAt) > new Date(first.startsAt);
      if (overlaps && first.coachId === second.coachId) output.push({ first, second });
    }));
    return output;
  }, [matches]);
  if (!conflicts.length) return null;
  const coach = coaches.find((item) => item.id === conflicts[0].first.coachId);
  const firstPlayer = players.find((item) => item.id === conflicts[0].first.playerId);
  const secondPlayer = players.find((item) => item.id === conflicts[0].second.playerId);
  return (
    <div data-testid="notice-conflict" className="mt-5 flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-primary">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent"><AlertCircle size={17} /></div>
      <div className="min-w-0">
        <p className="text-sm font-bold">Coach overlap detected</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{coach?.name ?? 'Assigned coach'} is scheduled with {firstPlayer?.name} and {secondPlayer?.name} at overlapping times. Reassign one from its match card.</p>
      </div>
    </div>
  );
}

function MatchCard({ match, player, coach, onEdit, onComplete, onReport }: { match: Match; player?: Player; coach?: Coach; onEdit: (match: Match) => void; onComplete: (match: Match) => void; onReport: (match: Match) => void }) {
  const isComplete = match.status === 'completed';
  return (
    <article data-testid={`card-match-${match.id}`} className={cx('relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md', isComplete ? 'border-card-border' : 'border-primary/15')}>
      <div className={cx('absolute inset-y-0 left-0 w-1', isComplete ? 'bg-muted-foreground/30' : 'bg-secondary')} />
      <div className="p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold', isComplete ? 'bg-muted text-muted-foreground' : 'bg-secondary text-primary')}>
              {formatTime(match.startsAt)}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">{formatDay(match.startsAt)}</p>
              <p data-testid={`text-player-${match.id}`} className="truncate text-sm font-bold">{player?.name ?? 'Unassigned player'}</p>
            </div>
          </div>
          <button data-testid={`button-edit-match-${match.id}`} aria-label={`Edit ${player?.name ?? 'match'} match`} onClick={() => onEdit(match)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
            <Edit3 size={16} />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-muted-foreground">Next court</p>
            <p data-testid={`text-court-${match.id}`} className="mt-1 font-serif text-xl font-bold">{match.court}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{match.venue}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground"><ArrowRight size={14} /></div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-muted-foreground">Opponent</p>
            <p data-testid={`text-opponent-${match.id}`} className="mt-1 truncate font-serif text-xl font-bold">{match.opponent}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{formatTime(match.endsAt)} finish</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{coach ? getInitials(coach.name) : '?'}</span>
            <span>{coach?.name ?? 'Coach not assigned'}</span>
          </div>
          <div className="flex items-center gap-2">
            {isComplete ? (
              <button data-testid={`button-report-${match.id}`} onClick={() => onReport(match)} className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-[11px] font-bold text-primary transition-colors hover:bg-secondary/80">
                {match.report ? <Check size={14} /> : <Mic size={14} />} {match.report ? 'View report' : 'Add report'}
              </button>
            ) : (
              <button data-testid={`button-complete-${match.id}`} onClick={() => onComplete(match)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
                <Trophy size={14} /> Mark complete
              </button>
            )}
          </div>
        </div>
        {isComplete && match.result && <p data-testid={`text-result-${match.id}`} className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs font-bold text-primary">Result <span className="ml-2 font-mono">{match.result}</span></p>}
        {isComplete && match.report?.audioPath && (
          <div className="mt-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-primary"><Play size={12} /> Coach voice note</p>
            <audio data-testid={`audio-report-${match.id}`} controls preload="metadata" className="h-8 w-full" src={audioSrc(match.report.audioPath)!}>Your browser does not support audio playback.</audio>
          </div>
        )}
      </div>
    </article>
  );
}

function MatchEditor({ match, coaches, onClose, onSave, saving }: { match: Match; coaches: Coach[]; onClose: () => void; onSave: (data: { opponent: string; startsAt: string; endsAt: string; venue: string; court: string; coachId: string }) => void; saving: boolean }) {
  const [form, setForm] = useState({
    opponent: match.opponent, startsAt: formatInputDate(match.startsAt), endsAt: formatInputDate(match.endsAt), venue: match.venue, court: match.court, coachId: match.coachId,
  });
  const field = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));
  return (
    <Modal title="Edit match" eyebrow="Match details" onClose={onClose}>
      <div className="space-y-4">
        <label className="block"><span className="field-label">Opponent</span><input data-testid="input-opponent" value={form.opponent} onChange={(event) => field('opponent', event.target.value)} className="field" /></label>
        <div className="grid grid-cols-2 gap-3">
          <label><span className="field-label">Starts</span><input data-testid="input-starts-at" type="datetime-local" value={form.startsAt} onChange={(event) => field('startsAt', event.target.value)} className="field" /></label>
          <label><span className="field-label">Ends</span><input data-testid="input-ends-at" type="datetime-local" value={form.endsAt} onChange={(event) => field('endsAt', event.target.value)} className="field" /></label>
        </div>
        <div className="grid grid-cols-[1fr_100px] gap-3">
          <label><span className="field-label">Venue</span><input data-testid="input-venue" value={form.venue} onChange={(event) => field('venue', event.target.value)} className="field" /></label>
          <label><span className="field-label">Court</span><input data-testid="input-court" value={form.court} onChange={(event) => field('court', event.target.value)} className="field" /></label>
        </div>
        <label className="block"><span className="field-label">Assign coach</span><span className="relative block"><select data-testid="select-coach" value={form.coachId} onChange={(event) => field('coachId', event.target.value)} className="field appearance-none pr-9">{coaches.map((coach) => <option key={coach.id} value={coach.id}>{coach.name}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-muted-foreground" /></span></label>
        <button data-testid="button-save-match" disabled={saving || !form.opponent || !form.court} onClick={() => onSave(form)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"><Save size={16} /> {saving ? 'Saving match…' : 'Save match'}</button>
      </div>
    </Modal>
  );
}

function CompletionEditor({ match, onClose, onSave, saving }: { match: Match; onClose: () => void; onSave: (result: string) => void; saving: boolean }) {
  const [result, setResult] = useState(match.result ?? '');
  return (
    <Modal title="Close out match" eyebrow="Final score" onClose={onClose}>
      <div className="rounded-xl bg-secondary/50 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">{match.court} · {formatTime(match.startsAt)}</p>
        <p className="mt-1 font-serif text-2xl font-bold">{match.opponent}</p>
      </div>
      <label className="mt-5 block"><span className="field-label">Result</span><input data-testid="input-result" autoFocus placeholder="e.g. Won 3–1" value={result} onChange={(event) => setResult(event.target.value)} className="field" /></label>
      <button data-testid="button-save-completion" disabled={saving || !result.trim()} onClick={() => onSave(result.trim())} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"><Check size={16} /> {saving ? 'Updating card…' : 'Mark completed'}</button>
    </Modal>
  );
}

function ReportEditor({ match, onClose, onSave, saving }: { match: Match; onClose: () => void; onSave: (observations: string[], transcript: string | null, audio: Blob | null) => Promise<void>; saving: boolean }) {
  const report = match.report;
  const [observations, setObservations] = useState<string[]>(report?.observations?.slice(0, 3) ?? ['', '', '']);
  const [transcript, setTranscript] = useState(report?.transcript ?? '');
  const [recording, setRecording] = useState(false);
  const [finalizingRecording, setFinalizingRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const speechRef = useRef<{ stop: () => void } | null>(null);
  const updateObservation = (index: number, value: string) => setObservations((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  const startRecording = async () => {
    setRecordingError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Audio recording is not supported in this browser.');
      return;
    }
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
      recorder.onerror = () => {
        setRecordingError('The voice note could not be recorded. Please try again.');
        setRecording(false);
        setFinalizingRecording(false);
        stream?.getTracks().forEach((track) => track.stop());
      };
      recorder.onstop = () => {
        const audio = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        if (audio.size > 0) setRecordedAudio(audio);
        else setRecordingError('No audio was captured. Please record the voice note again.');
        stream?.getTracks().forEach((track) => track.stop());
        recorderRef.current = null;
        setFinalizingRecording(false);
      };
      recorder.start();
      recorderRef.current = recorder;
      const SpeechRecognition = (window as typeof window & { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = (event: any) => {
          const spoken = Array.from(event.results as ArrayLike<any>).slice(event.resultIndex).map((result: any) => result[0].transcript).join(' ');
          setTranscript((current) => `${current}${current ? ' ' : ''}${spoken}`.trim());
        };
        recognition.onend = () => { speechRef.current = null; };
        recognition.start();
        speechRef.current = recognition;
      }
      setRecording(true);
    } catch {
      stream?.getTracks().forEach((track) => track.stop());
      recorderRef.current = null;
      setRecording(false);
      setFinalizingRecording(false);
      setRecordingError('Microphone access failed. Check browser permission and try again.');
    }
  };
  const stopRecording = () => {
    speechRef.current?.stop();
    speechRef.current = null;
    if (recorderRef.current?.state === 'recording') {
      setFinalizingRecording(true);
      recorderRef.current.stop();
    }
    setRecording(false);
  };
  const submitReport = async () => {
    setUploading(true);
    try {
      await onSave(observations.map((item) => item.trim()), transcript.trim() || null, recordedAudio);
    } finally {
      setUploading(false);
    }
  };
  return (
    <Modal title="Coach report" eyebrow={`${match.opponent} · three takeaways`} onClose={() => { if (recording) stopRecording(); onClose(); }}>
      <div className="space-y-3">
        {observations.map((observation, index) => (
          <label key={index} className="block">
            <span className="field-label flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary font-mono text-[10px] text-primary">{index + 1}</span> Observation</span>
            <textarea data-testid={`input-observation-${index + 1}`} maxLength={220} rows={2} value={observation} onChange={(event) => updateObservation(index, event.target.value)} placeholder={['What worked under pressure?', 'A movement or technical cue', 'Focus for the next match'][index]} className="field min-h-[72px] resize-none" />
          </label>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-3">
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-xs font-bold">Voice note</p><p className="mt-0.5 text-[11px] text-muted-foreground">Use your mic, or type the transcript below.</p></div>
          <button data-testid="button-toggle-recording" onClick={recording ? stopRecording : startRecording} className={cx('flex h-9 w-9 items-center justify-center rounded-full transition-colors', recording ? 'bg-accent text-primary' : 'bg-primary text-primary-foreground')} aria-label={recording ? 'Stop recording' : 'Start recording'}>{recording ? <MicOff size={16} /> : <Mic size={16} />}</button>
        </div>
        {recording && <p data-testid="status-recording" className="mt-3 font-mono text-[10px] uppercase tracking-[.15em] text-accent">Recording in progress</p>}
        {finalizingRecording && <p data-testid="status-finalizing-recording" className="mt-3 font-mono text-[10px] uppercase tracking-[.15em] text-accent">Preparing voice note…</p>}
        {!recording && recordedAudio && <p data-testid="status-recorded" className="mt-3 font-mono text-[10px] uppercase tracking-[.15em] text-primary">Voice note ready to save</p>}
        {!recording && !recordedAudio && report?.audioPath && <audio controls preload="metadata" className="mt-3 h-8 w-full" src={audioSrc(report.audioPath)!}>Your browser does not support audio playback.</audio>}
        {recordingError && <p data-testid="error-recording" role="alert" className="mt-3 text-xs font-medium text-destructive">{recordingError}</p>}
        <textarea data-testid="input-transcript" rows={2} value={transcript} onChange={(event) => setTranscript(event.target.value)} placeholder="Type a short voice-note transcript…" className="field mt-3 min-h-[64px] resize-none bg-card" />
      </div>
      <button data-testid="button-save-report" disabled={saving || uploading || recording || finalizingRecording || observations.some((item) => !item.trim())} onClick={() => { void submitReport(); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"><Save size={16} /> {saving || uploading ? 'Saving report…' : finalizingRecording ? 'Preparing voice note…' : 'Save three observations'}</button>
    </Modal>
  );
}

function Modal({ title, eyebrow, onClose, closeDisabled = false, children }: { title: string; eyebrow: string; onClose: () => void; closeDisabled?: boolean; children: ReactNode }) {
  return (
    <div data-testid="modal-overlay" className="fixed inset-0 z-40 flex items-end justify-center bg-primary/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onMouseDown={(event) => { if (!closeDisabled && event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[26px] border border-card-border bg-card p-5 shadow-2xl sm:rounded-[26px] sm:p-7">
        <div className="mb-6 flex items-start justify-between">
          <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">{eyebrow}</p><h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">{title}</h2></div>
          <button data-testid="button-close-modal" disabled={closeDisabled} onClick={onClose} aria-label="Close dialog" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-primary disabled:opacity-40"><X size={19} /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function SettingsEditor({ state, onClose, onSave, onRotateShareLink, rotatingPlayerId, saving }: { state: TrackerState; onClose: () => void; onSave: (data: { coaches: Coach[]; branding: { name: string; logoPath: string | null } }) => Promise<void>; onRotateShareLink: (player: Player) => void; rotatingPlayerId: string | null; saving: boolean }) {
  const [coaches, setCoaches] = useState(state.coaches.filter((coach) => coach.id !== 'unassigned'));
  const [brandName, setBrandName] = useState(state.branding.name);
  const [logoPath, setLogoPath] = useState(state.branding.logoPath);
  const [logoError, setLogoError] = useState('');
  const [uploading, setUploading] = useState(false);
  const temporaryLogoPath = useRef<string | null>(null);
  const saved = useRef(false);
  const disposed = useRef(false);
  const saveInFlight = useRef(false);
  const deleteUnusedLogo = async (objectPath: string) => {
    try {
      await fetch('/api/tracker/logo', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objectPath }),
      });
    } catch {
      // Cleanup is best-effort; the referenced-logo guard makes retries safe.
    }
  };
  useEffect(() => () => {
    disposed.current = true;
    if (!saved.current && !saveInFlight.current && temporaryLogoPath.current) {
      void deleteUnusedLogo(temporaryLogoPath.current);
    }
  }, []);
  const uploadLogo = async (file: File) => {
    setLogoError('');
    setUploading(true);
    try {
      const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
      if (!allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Invalid logo');
      const response = await fetch('/api/tracker/logo', { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
      if (!response.ok) throw new Error('Upload failed');
      const uploaded = await response.json() as { objectPath: string };
      if (disposed.current) {
        void deleteUnusedLogo(uploaded.objectPath);
        return;
      }
      const previousTemporaryPath = temporaryLogoPath.current;
      temporaryLogoPath.current = uploaded.objectPath;
      setLogoPath(uploaded.objectPath);
      if (previousTemporaryPath) void deleteUnusedLogo(previousTemporaryPath);
    } catch {
      setLogoError('Choose a PNG, JPG, WebP, or GIF image up to 5 MB.');
    } finally {
      setUploading(false);
    }
  };
  const slug = (name: string, fallback: string) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || fallback;
  const setCoach = (index: number, name: string) => setCoaches(coaches.map((item, i) => i === index ? { ...item, name, id: slug(name, `coach-${index + 1}`) } : item));
  const removeLogo = () => {
    const path = temporaryLogoPath.current;
    temporaryLogoPath.current = null;
    setLogoPath(null);
    if (path) void deleteUnusedLogo(path);
  };
  const save = async () => {
    saveInFlight.current = true;
    try {
      await onSave({ coaches, branding: { name: brandName.trim(), logoPath } });
      saved.current = true;
      onClose();
    } catch (error) {
      if (disposed.current && temporaryLogoPath.current) {
        void deleteUnusedLogo(temporaryLogoPath.current);
      }
      throw error;
    } finally {
      saveInFlight.current = false;
    }
  };
  return (
    <Modal title="Tracker settings" eyebrow="Players, coaches & branding" onClose={onClose} closeDisabled={saving || uploading}>
      <div className="space-y-6">
        <label className="block"><span className="field-label">Brand name</span><input className="field" value={brandName} onChange={(event) => setBrandName(event.target.value)} /></label>
        <div><span className="field-label">Logo image</span><div className="mt-2 flex items-center gap-3">{logoPath && <img src={logoSrc(logoPath)!} alt="Logo preview" className="h-16 w-24 rounded-xl border border-border bg-white object-contain p-2" />}<div className="flex flex-wrap gap-2"><label className="cursor-pointer rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold hover:bg-muted"><input data-testid="input-logo-file" className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadLogo(file); event.currentTarget.value = ''; }} />{uploading ? 'Uploading…' : logoPath ? 'Replace logo' : 'Upload logo'}</label>{logoPath && <button data-testid="button-remove-logo" type="button" onClick={removeLogo} className="rounded-xl px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10">Remove</button>}</div></div><span className="mt-2 block text-[11px] text-muted-foreground">PNG, JPG, WebP, or GIF. Maximum 5 MB.</span>{logoError && <span role="alert" className="mt-2 block text-xs text-destructive">{logoError}</span>}</div>
        <section><p className="field-label mb-2">Coach options</p><div className="space-y-2">{coaches.map((person, index) => <input className="field" key={`${person.id}-${index}`} value={person.name} onChange={(event) => setCoach(index, event.target.value)} placeholder="Coach name" />)}</div><p className="mt-2 text-[11px] text-muted-foreground">These five names appear when assigning a coach to a match.</p></section>
        <section>
          <p className="field-label mb-2">Private player links</p>
          <div className="space-y-2">
            {state.players.map((player) => {
              const shareUrl = `${window.location.origin}${basePath}/players/${player.shareToken}`;
              return <div key={player.id} className="rounded-xl border border-border p-3"><p className="text-sm font-bold">{player.name}</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => void navigator.clipboard.writeText(shareUrl)} className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs font-bold"><Copy size={13} /> Copy link</button><button type="button" disabled={rotatingPlayerId === player.id} onClick={() => onRotateShareLink(player)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"><Link size={13} /> {rotatingPlayerId === player.id ? 'Resetting…' : 'Reset link'}</button></div></div>;
            })}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Resetting a link immediately disables the old one.</p>
        </section>
      </div>
      <button data-testid="button-save-settings" disabled={saving || uploading || !brandName.trim() || coaches.some((item) => !item.name.trim())} onClick={() => { void save().catch(() => undefined); }} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"><Save size={16} /> {saving ? 'Saving…' : 'Save settings'}</button>
    </Modal>
  );
}

function TrackerPage() {
  const queryClient = useQueryClient();
  const tracker = useGetTracker({ query: { queryKey: getGetTrackerQueryKey(), staleTime: 30000 } });
  const trackerHealth = useGetTrackerHealth({
    query: {
      queryKey: getGetTrackerHealthQueryKey(),
      refetchInterval: 60_000,
      refetchIntervalInBackground: false,
    },
  });
  const refresh = useRefreshTracker();
  const updateMatch = useUpdateMatch();
  const saveReport = useSaveCoachReport();
  const saveSettings = useSaveTrackerSettings();
  const rotateShareToken = useRotatePlayerShareToken();
  const [rotatingPlayerId, setRotatingPlayerId] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('players');
  const [editing, setEditing] = useState<Match | null>(null);
  const [completing, setCompleting] = useState<Match | null>(null);
  const [reporting, setReporting] = useState<Match | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [refreshError, setRefreshError] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const state = tracker.data;
  useEffect(() => {
    if (!trackerHealth.data) return;
    queryClient.setQueryData<TrackerState>(getGetTrackerQueryKey(), (current) =>
      current ? { ...current, refreshHealth: trackerHealth.data! } : current,
    );
  }, [queryClient, trackerHealth.data]);
  const persistedRefreshFailures = state?.refreshHealth.consecutiveFailures ?? 0;
  const pendingRecoveryNotices = state?.refreshHealth.pendingRecoveryNotices ?? 0;
  const matches = useMemo(() => [...(state?.matches ?? [])].sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt)), [state?.matches]);
  const patchMatch = (updated: Match) => queryClient.setQueryData<TrackerState>(getGetTrackerQueryKey(), (old) => old ? { ...old, matches: old.matches.map((match) => match.id === updated.id ? updated : match), lastUpdatedAt: new Date().toISOString() } : old);
  const showSuccess = (message: string) => setToast(message);
  const doRefresh = (quiet = false) => refresh.mutate(undefined, {
    onSuccess: (next) => {
      queryClient.setQueryData(getGetTrackerQueryKey(), next);
      setRefreshError('');
      if (!quiet) showSuccess('Club Locker draw refreshed');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Club Locker could not be reached';
      setRefreshError(message.includes('Refresh failed:') ? message : 'Refresh failed — existing tracker data is unchanged');
      queryClient.invalidateQueries({ queryKey: getGetTrackerQueryKey() });
    },
  });

  useEffect(() => {
    if (state?.source !== 'club-locker') return;
    const timer = window.setInterval(() => doRefresh(true), 5 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [state?.source]);
  const saveMatch = (match: Match, data: { opponent: string; startsAt: string; endsAt: string; venue: string; court: string; coachId: string }) => {
    updateMatch.mutate({ matchId: match.id, data }, { onSuccess: (updated) => { patchMatch(updated); setEditing(null); showSuccess('Match card updated'); } });
  };
  const completeMatch = (match: Match, result: string) => {
    updateMatch.mutate({ matchId: match.id, data: { status: 'completed', result } }, { onSuccess: (updated) => { patchMatch(updated); setCompleting(null); showSuccess('Match closed out'); } });
  };
  const saveCoachReport = async (match: Match, observations: string[], transcript: string | null, audio: Blob | null) => {
    let audioPath = match.report?.audioPath ?? null;
    if (audio) {
      const response = await fetch(`/api/matches/${encodeURIComponent(match.id)}/report/audio`, {
        method: 'POST',
        headers: { 'Content-Type': audio.type || 'audio/webm' },
        body: audio,
      });
      if (!response.ok) throw new Error('Voice note could not be uploaded');
      audioPath = (await response.json() as { objectPath: string }).objectPath;
    }
    const report = await saveReport.mutateAsync({ matchId: match.id, data: { observations, transcript, audioPath } });
    patchMatch({ ...match, report });
    setReporting(null);
    showSuccess('Coach report saved');
  };

  if (tracker.isLoading) return <TrackerSkeleton />;
  if (tracker.isError) return <FailureState retry={() => tracker.refetch()} />;
  if (!state || !state.matches.length) return <EmptyState onRefresh={doRefresh} />;

  const filteredMatches = view === 'players' ? matches : matches.filter((match) => match.coachId);
  return (
    <div className="noise min-h-[100dvh] bg-background text-foreground">
      <Header state={state} onRefresh={doRefresh} refreshing={refresh.isPending} onSettings={() => setSettingsOpen(true)} />
      <main className="court-lines mx-auto min-h-[calc(100dvh-112px)] max-w-6xl px-4 pb-12 pt-7 sm:px-8 sm:pt-10">
        {(refreshError || persistedRefreshFailures > 0) && (
          <div data-testid="notice-refresh-error" role="alert" className="mb-5 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-destructive" />
            <div>
              <p className="font-bold">Club Locker refresh failed</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {persistedRefreshFailures > 0
                  ? `${persistedRefreshFailures} consecutive refresh ${persistedRefreshFailures === 1 ? 'attempt has' : 'attempts have'} failed${state.refreshHealth.alertSentAt ? ', and staff have been alerted' : ''}.`
                  : `${refreshError}.`}
                {' '}Your existing matches, coach assignments, results, and reports are unchanged.
              </p>
            </div>
          </div>
        )}
        {pendingRecoveryNotices > 0 && (
          <div data-testid="notice-pending-recoveries" role="alert" className="mb-5 flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="font-bold">Recovery notice{pendingRecoveryNotices === 1 ? '' : 's'} waiting to send</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {pendingRecoveryNotices} Club Locker recovery {pendingRecoveryNotices === 1 ? 'notice is' : 'notices are'} queued for staff. The schedule is current, but alert delivery has not fully recovered.
              </p>
            </div>
          </div>
        )}
        <div className="rise-in flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.22em] text-muted-foreground">Saturday · match desk</p>
            <h1 data-testid="heading-tracker" className="mt-2 font-serif text-4xl font-bold tracking-[-.04em] sm:text-5xl">Stay on court.</h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">The next match, without the rummage. Follow each player from warm-up to report.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-card-border bg-card px-3 py-2 text-xs text-muted-foreground shadow-sm">
            <Clock3 size={15} className="text-accent" /> Live draw view
          </div>
        </div>
        <div className="rise-in delay-1 mt-7"><SummaryStrip matches={matches} players={state.players} coaches={state.coaches} /></div>
        <ConflictNotice matches={matches} players={state.players} coaches={state.coaches} />
        <div className="rise-in delay-2 mt-7 flex items-center justify-between gap-3">
          <div className="inline-flex rounded-xl border border-card-border bg-card p-1 shadow-sm">
            <button data-testid="tab-players" onClick={() => setView('players')} className={cx('rounded-lg px-4 py-2 text-xs font-bold transition-colors', view === 'players' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary')}><UsersRound size={14} className="mr-1.5 inline" />Players</button>
            <button data-testid="tab-coaches" onClick={() => setView('coaches')} className={cx('rounded-lg px-4 py-2 text-xs font-bold transition-colors', view === 'coaches' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary')}><CircleUserRound size={14} className="mr-1.5 inline" />Coaches</button>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">{filteredMatches.length} cards</span>
        </div>
        <div className="rise-in delay-3 mt-4 space-y-3">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} player={state.players.find((player) => player.id === match.playerId)} coach={state.coaches.find((coach) => coach.id === match.coachId)} onEdit={setEditing} onComplete={setCompleting} onReport={setReporting} />
          ))}
        </div>
        <footer className="mt-10 flex items-center justify-between border-t border-border pt-4 text-[10px] text-muted-foreground">
          <span className="font-mono uppercase tracking-[.16em]">StaitSquash / keep moving</span>
          <span>{matches.filter((match) => match.status === 'completed').length} completed</span>
        </footer>
      </main>
      {editing && <MatchEditor match={editing} coaches={state.coaches} onClose={() => setEditing(null)} onSave={(data) => saveMatch(editing, data)} saving={updateMatch.isPending} />}
      {completing && <CompletionEditor match={completing} onClose={() => setCompleting(null)} onSave={(result) => completeMatch(completing, result)} saving={updateMatch.isPending} />}
      {reporting && <ReportEditor match={reporting} onClose={() => setReporting(null)} onSave={(observations, transcript, audio) => saveCoachReport(reporting, observations, transcript, audio).catch((error) => { setToast(error instanceof Error ? error.message : 'Coach report could not be saved'); })} saving={saveReport.isPending} />}
      {settingsOpen && <SettingsEditor state={state} onClose={() => setSettingsOpen(false)} saving={saveSettings.isPending} rotatingPlayerId={rotatingPlayerId} onRotateShareLink={(player) => { setRotatingPlayerId(player.id); rotateShareToken.mutate({ playerId: player.id }, { onSuccess: (updated) => { queryClient.setQueryData<TrackerState>(getGetTrackerQueryKey(), (current) => current ? { ...current, players: current.players.map((item) => item.id === updated.id ? updated : item) } : current); showSuccess(`${player.name}'s old link has been disabled`); }, onError: () => setToast('Player link could not be reset'), onSettled: () => setRotatingPlayerId(null) }); }} onSave={async (data) => { try { const next = await saveSettings.mutateAsync({ data }); queryClient.setQueryData(getGetTrackerQueryKey(), next); showSuccess('Settings saved'); } catch { setToast('Settings could not be saved'); throw new Error('Settings could not be saved'); } }} />}
      {toast && <div data-testid="status-toast" role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-xl"><Check size={15} className="text-secondary" />{toast}</div>}
    </div>
  );
}

function PlayerNotFoundState() {
  return (
    <div className="noise flex min-h-[100dvh] items-center justify-center bg-background px-5 text-center">
      <div className="max-w-sm">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Player link</p>
        <h1 className="mt-3 font-serif text-3xl font-bold">This player could not be found.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Ask your coach or match desk for an updated link.</p>
      </div>
    </div>
  );
}

function PlayerView() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const tracker = useGetPlayerTracker(shareToken, {
    query: {
      queryKey: getGetPlayerTrackerQueryKey(shareToken),
      staleTime: 30_000,
      retry: (failureCount, error) => error.status !== 404 && failureCount < 3,
    },
  });
  const state = tracker.data;
  const player = state?.player;
  const matches = useMemo(
    () => (state?.matches ?? [])
      .filter((match) => match.playerId === player?.id)
      .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt)),
    [player?.id, state?.matches],
  );
  const upcoming = matches.filter((match) => match.status === 'upcoming');
  const completed = matches.filter((match) => match.status === 'completed').reverse();
  const nextMatch = upcoming[0];
  const playerNotFound = tracker.isError && tracker.error.status === 404;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = player ? `${player.name} · ${state?.branding.name ?? 'StaitSquash'}` : 'Player view · StaitSquash';
    return () => { document.title = previousTitle; };
  }, [player, state?.branding.name]);

  if (tracker.isLoading) return <TrackerSkeleton />;
  if (playerNotFound) return <PlayerNotFoundState />;
  if (tracker.isError) return <FailureState retry={() => tracker.refetch()} />;
  if (!state || !player) return <PlayerNotFoundState />;

  return (
    <div className="noise min-h-[100dvh] bg-background text-foreground">
      <header className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            {state.branding.logoPath ? (
              <img src={logoSrc(state.branding.logoPath)!} alt="" className="h-10 w-10 rounded-xl bg-white object-contain p-1" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary font-serif text-xl font-black italic text-sidebar-primary-foreground">S</div>
            )}
            <div>
              <p className="font-serif text-base font-bold leading-none">{state.branding.name}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-sidebar-foreground/55">Player match card</p>
            </div>
          </div>
          <span className="rounded-full bg-sidebar-accent px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.14em] text-sidebar-primary">Read only</span>
        </div>
      </header>

      <main className="court-lines mx-auto max-w-3xl px-4 pb-12 pt-7 sm:px-6 sm:pt-10">
        <section className="rise-in">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Welcome courtside</p>
          <h1 data-testid="heading-player-view" className="mt-2 font-serif text-4xl font-bold tracking-[-.04em] sm:text-5xl">{player.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{upcoming.length} upcoming · {completed.length} completed</p>
        </section>

        {nextMatch ? (
          <section data-testid="card-next-match" className="rise-in delay-1 relative mt-7 overflow-hidden rounded-[26px] bg-primary p-5 text-primary-foreground shadow-xl sm:p-7">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[22px] border-secondary/15" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-secondary">Next match</p>
                <span className="rounded-full bg-primary-foreground/10 px-3 py-1 font-mono text-[10px]">{formatDay(nextMatch.startsAt)}</span>
              </div>
              <p className="mt-5 font-serif text-4xl font-bold">{formatTime(nextMatch.startsAt)}</p>
              <p className="mt-1 text-sm text-primary-foreground/65">until {formatTime(nextMatch.endsAt)}</p>
              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-primary-foreground/15 py-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[.15em] text-primary-foreground/50">Court</p>
                  <p className="mt-1 font-serif text-xl font-bold">{nextMatch.court}</p>
                  <p className="mt-1 text-xs text-primary-foreground/60">{nextMatch.venue}</p>
                </div>
                <ArrowRight size={18} className="text-secondary" />
                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase tracking-[.15em] text-primary-foreground/50">Opponent</p>
                  <p className="mt-1 font-serif text-xl font-bold">{nextMatch.opponent}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-mono text-xs font-bold text-secondary-foreground">
                  {getInitials(state.coaches.find((coach) => coach.id === nextMatch.coachId)?.name ?? '?')}
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[.14em] text-primary-foreground/50">Your coach</p>
                  <p className="text-sm font-bold">{state.coaches.find((coach) => coach.id === nextMatch.coachId)?.name ?? 'To be assigned'}</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="rise-in delay-1 mt-7 rounded-2xl border border-card-border bg-card p-6 shadow-sm">
            <Check size={22} className="text-secondary" />
            <h2 className="mt-4 font-serif text-2xl font-bold">No match is waiting.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Your completed matches and coach notes are below.</p>
          </section>
        )}

        {upcoming.length > 1 && (
          <section className="rise-in delay-2 mt-8">
            <div className="mb-3 flex items-end justify-between">
              <h2 className="font-serif text-2xl font-bold">Coming up</h2>
              <span className="font-mono text-[9px] uppercase tracking-[.15em] text-muted-foreground">{upcoming.length - 1} later</span>
            </div>
            <div className="space-y-3">
              {upcoming.slice(1).map((match) => (
                <article key={match.id} className="rounded-2xl border border-card-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">{formatDay(match.startsAt)} · {formatTime(match.startsAt)}</p><p className="mt-1 font-serif text-xl font-bold">{match.opponent}</p></div>
                    <span className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-secondary-foreground">{match.court}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{match.venue} · Coach {state.coaches.find((coach) => coach.id === match.coachId)?.name ?? 'TBA'}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="rise-in delay-3 mt-9">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-bold">Match history</h2>
            <Trophy size={19} className="text-accent" />
          </div>
          {completed.length ? (
            <div className="space-y-3">
              {completed.map((match) => {
                const coach = state.coaches.find((item) => item.id === match.coachId);
                return (
                  <article data-testid={`player-history-${match.id}`} key={match.id} className="rounded-2xl border border-card-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div><p className="font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">{formatDay(match.startsAt)} · {match.court}</p><h3 className="mt-1 font-serif text-xl font-bold">{match.opponent}</h3><p className="mt-1 text-xs text-muted-foreground">Coach {coach?.name ?? 'Unassigned'}</p></div>
                      <span className="rounded-lg bg-muted px-3 py-2 font-mono text-xs font-bold">{match.result ?? 'Completed'}</span>
                    </div>
                    {match.report && (
                      <div className="mt-4 border-t border-border pt-4">
                        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">Coach advice</p>
                        <ol className="mt-3 space-y-2">
                          {match.report.observations.map((observation, index) => <li key={index} className="flex gap-3 text-sm leading-6"><span className="font-mono text-xs font-bold text-accent">{index + 1}</span><span>{observation}</span></li>)}
                        </ol>
                        {match.report.transcript && <p className="mt-4 rounded-xl bg-muted/65 p-3 text-xs italic leading-5 text-muted-foreground">“{match.report.transcript}”</p>}
                        {match.report.audioPath && (
                          <div className="mt-4">
                            <p className="mb-2 flex items-center gap-2 text-xs font-bold"><Mic size={14} className="text-accent" /> Voice note</p>
                            <audio controls preload="metadata" className="h-9 w-full" src={audioSrc(match.report.audioPath)!}>Your browser does not support audio playback.</audio>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">Completed matches and coach advice will appear here.</div>
          )}
        </section>
        <footer className="mt-10 border-t border-border pt-4 text-center font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">Your schedule updates automatically · {state.branding.name}</footer>
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/players/:shareToken" component={PlayerView} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/" component={StaffHome} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function StaffHome() {
  return (
    <>
      <Show when="signed-in"><TrackerPage /></Show>
      <Show when="signed-out">
        <main className="noise flex min-h-[100dvh] items-center justify-center bg-background px-5">
          <section className="w-full max-w-md rounded-[26px] border border-card-border bg-card p-8 text-center shadow-xl">
            <img src={`${basePath}/logo.svg`} alt="" className="mx-auto h-16 w-16 rounded-2xl" />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Staff access</p>
            <h1 className="mt-2 font-serif text-4xl font-bold">StaitSquash tracker</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Approved staff must sign in before managing matches, reports, coaches, and branding.</p>
            <a href={`${basePath}/sign-in`} className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Staff sign in</a>
          </section>
        </main>
      </Show>
    </>
  );
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath}>
          <ClerkRoutes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function SignInPage() {
  return (
    <div className="noise flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => addListener(({ user }) => {
    const userId = user?.id ?? null;
    if (previousUserId.current !== undefined && previousUserId.current !== userId) {
      queryClient.clear();
    }
    previousUserId.current = userId;
  }), [addListener, queryClient]);

  return null;
}

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

const clerkProxyUrl = resolveClerkProxyUrl(
  import.meta.env.VITE_CLERK_PROXY_URL,
  import.meta.env.PROD,
);

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

export function resolveClerkProxyUrl(
  configured: string | undefined,
  production: boolean,
): string {
  return configured || (production ? '/api/__clerk' : '');
}

function ClerkRoutes() {
  const [, setLocation] = useLocation();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={{
        theme: shadcn,
        cssLayerName: 'clerk',
        options: {
          logoPlacement: 'inside',
          logoLinkUrl: basePath || '/',
          logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
        },
        variables: {
          colorPrimary: '#17352f',
          colorForeground: '#17352f',
          colorMutedForeground: '#66736f',
          colorBackground: '#fffdf7',
          colorInput: '#ffffff',
          colorInputForeground: '#17352f',
          colorDanger: '#b5412d',
          colorNeutral: '#d9dfdc',
          fontFamily: 'system-ui, sans-serif',
          borderRadius: '0.75rem',
        },
      }}
      signInUrl={`${basePath}/sign-in`}
      localization={{ signIn: { start: { title: 'Staff sign in', subtitle: 'Access the StaitSquash match desk' } } }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <ClerkQueryClientCacheInvalidator />
      <Router />
    </ClerkProvider>
  );
}
