// Video Template - Replace ReplitLoadingScene with your scenes

import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import {
  Scene01Intro,
  Scene02Match,
  Scene03Coach,
  Scene04Conflict,
  Scene05Report,
  Scene06Close,
} from './video_scenes';

export const SCENE_DURATIONS = {
  intro: 3600,
  match: 5000,
  coach: 4500,
  conflict: 4700,
  report: 6000,
  close: 4300,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

const SCENE_COMPONENTS = {
  intro: Scene01Intro,
  match: Scene02Match,
  coach: Scene03Coach,
  conflict: Scene04Conflict,
  report: Scene05Report,
  close: Scene06Close,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const starts: Record<string, number> = {};
  let total = 0;
  Object.entries(SCENE_DURATIONS).forEach(([key, duration]) => {
    starts[key] = total / 1000;
    total += duration;
  });
  return starts;
})();

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKey = useRef<string | null>(null);

  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    if (paused) {
      audio.pause();
      return;
    }
    if (lastSceneKey.current !== currentSceneKey) {
      lastSceneKey.current = currentSceneKey;
      const target = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - target) > 0.18) audio.currentTime = target;
    }
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} className="video-root">
      <div className="grain absolute inset-0 z-0" />
      <motion.div
        className="absolute left-[-18%] top-[17%] h-[44vmin] w-[44vmin] rounded-full bg-[#ee6b4d]"
        animate={{
          x: sceneIndex === 0 ? 0 : sceneIndex < 4 ? '24vw' : '-8vw',
          y: sceneIndex === 2 ? '20vh' : sceneIndex === 5 ? '43vh' : 0,
          scale: sceneIndex === 0 ? 1.15 : sceneIndex === 5 ? .72 : .9,
          opacity: sceneIndex === 0 ? .9 : .28,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute right-[-22%] bottom-[9%] h-[58vmin] w-[58vmin] rounded-full border-[.2vmin] border-[#8cae72]"
        animate={{
          x: sceneIndex < 2 ? '5vw' : sceneIndex < 5 ? '-3vw' : '-12vw',
          y: sceneIndex === 3 ? '-7vh' : sceneIndex === 5 ? '-20vh' : 0,
          scale: sceneIndex === 1 ? 1.2 : 1,
          opacity: sceneIndex === 5 ? .58 : .28,
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <AnimatePresence mode="sync" initial={false}>
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
