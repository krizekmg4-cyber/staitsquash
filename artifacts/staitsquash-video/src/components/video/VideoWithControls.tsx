import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  intro: { title: 'Match Day', filePath: 'src/components/video/video_scenes/Scene01Intro.tsx' },
  match: { title: 'Next Match', filePath: 'src/components/video/video_scenes/Scene02Match.tsx' },
  coach: { title: 'Coach Assignment', filePath: 'src/components/video/video_scenes/Scene03Coach.tsx' },
  conflict: { title: 'Conflict Alert', filePath: 'src/components/video/video_scenes/Scene04Conflict.tsx' },
  report: { title: 'Coach Report', filePath: 'src/components/video/video_scenes/Scene05Report.tsx' },
  close: { title: 'Ready to Refresh', filePath: 'src/components/video/video_scenes/Scene06Close.tsx' },
};

function formatTime(durationMs: number) {
  const seconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function PlaybackStatus({ sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo }: {
  sceneKeys: string[]; activeIndex: number; activeDuration: number; activeStartTime: number;
  totalDuration: number; tick: number; paused: boolean; onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBase = useRef(0);
  useEffect(() => { setElapsed(0); elapsedBase.current = 0; }, [tick]);
  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const timer = window.setInterval(() => setElapsed(elapsedBase.current + performance.now() - start), 60);
    return () => {
      window.clearInterval(timer);
      elapsedBase.current += performance.now() - start;
    };
  }, [paused, tick]);

  const progress = activeDuration ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));
  return (
    <>
      <div className="flex flex-1 items-center gap-1.5">
        {sceneKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => onJumpTo(index)}
            className="relative h-3 min-h-3 flex-1 overflow-hidden rounded-full bg-white/20"
            aria-label={`Jump to scene ${index + 1}`}
          >
            <span className="absolute inset-y-0 left-0 rounded-full bg-[#d7f24b]" style={{ width: `${index === activeIndex ? progress * 100 : 0}%` }} />
          </button>
        ))}
      </div>
      <span className="shrink-0 font-mono text-sm text-white/70">{activeIndex + 1}/{sceneKeys.length}</span>
      <span className="min-w-[8ch] shrink-0 text-right font-mono text-sm text-white/80">{formatTime(totalElapsed)} / {formatTime(totalDuration)}</span>
    </>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!controls.paused) return;
    const animations = document.getAnimations().filter((animation) => animation.playState === 'running');
    animations.forEach((animation) => animation.pause());
    return () => animations.forEach((animation) => animation.play());
  }, [controls.paused]);

  const jumpTo = useCallback((index: number) => {
    controls.jumpTo(index);
    const key = controls.sceneKeys[index];
    const details = SCENE_DETAILS[key];
    if (!details) return;
    window.parent.postMessage({
      type: 'REPLIT_VIDEO_SCENE_SELECTED',
      payload: { sceneIndex: index, sceneCount: controls.sceneKeys.length, sceneTitle: details.title, filePath: details.filePath, lineNumber: 1 },
    }, '*');
  }, [controls]);

  if (!isIframed) return <VideoTemplate />;
  const visible = !collapsed || hovering;

  return (
    <div className="relative h-screen w-full">
      <VideoTemplate key={controls.mountKey} durations={controls.durations} paused={controls.paused} muted={muted} onSceneChange={controls.onSceneChange} />
      <div
        className="absolute inset-x-0 bottom-0 z-50 flex h-1/4 flex-col justify-end"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div className={`flex items-center gap-2 bg-[#102f30]/85 px-3 py-3 backdrop-blur-md transition-all ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button onClick={controls.togglePause} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white" aria-label={controls.paused ? 'Play' : 'Pause'}>
            {controls.paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </button>
          <button onClick={controls.toggleLock} className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${controls.locked ? 'bg-white/15 text-[#d7f24b]' : 'text-white'}`} aria-label="Loop current scene">
            <Repeat className="h-5 w-5" />
          </button>
          <button onClick={() => setMuted((value) => !value)} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white" aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <div className="h-8 w-px shrink-0 bg-white/15" />
          <PlaybackStatus
            sceneKeys={controls.sceneKeys}
            activeIndex={controls.activeIndex}
            activeDuration={controls.activeDuration}
            activeStartTime={controls.activeStartTime}
            totalDuration={controls.totalDuration}
            tick={controls.tick}
            paused={controls.paused}
            onJumpTo={jumpTo}
          />
          <button onClick={() => setCollapsed((value) => !value)} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white" aria-label={collapsed ? 'Show controls' : 'Hide controls'}>
            {collapsed ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}