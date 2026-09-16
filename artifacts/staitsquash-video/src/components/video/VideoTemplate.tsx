// Video Template - Replace ReplitLoadingScene with your scenes

import {
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { motion } from 'framer-motion';
import {
  Scene01Intro,
  Scene02Match,
  Scene03Coach,
  Scene04Conflict,
  Scene05Report,
  Scene06Close,
} from './video_scenes';

const SCENE_DURATIONS = {
  intro: 3600,
  match: 5000,
  coach: 4500,
  conflict: 4700,
  report: 6000,
  close: 4300,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      className="video-root"
    >
      <div className="grain absolute inset-0 z-0" />
      <motion.div
        className="absolute left-[-18%] top-[17%] h-[44vmin] w-[44vmin] rounded-full bg-[#ee6b4d]"
        animate={{
          x: currentScene === 0 ? 0 : currentScene < 4 ? '24vw' : '-8vw',
          y: currentScene === 2 ? '20vh' : currentScene === 5 ? '43vh' : 0,
          scale: currentScene === 0 ? 1.15 : currentScene === 5 ? .72 : .9,
          opacity: currentScene === 0 ? .9 : .28,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute right-[-22%] bottom-[9%] h-[58vmin] w-[58vmin] rounded-full border-[.2vmin] border-[#8cae72]"
        animate={{
          x: currentScene < 2 ? '5vw' : currentScene < 5 ? '-3vw' : '-12vw',
          y: currentScene === 3 ? '-7vh' : currentScene === 5 ? '-20vh' : 0,
          scale: currentScene === 1 ? 1.2 : 1,
          opacity: currentScene === 5 ? .58 : .28,
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <AnimatePresence mode="sync" initial={false}>
        {currentScene === 0 && <Scene01Intro key="intro" />}
        {currentScene === 1 && <Scene02Match key="match" />}
        {currentScene === 2 && <Scene03Coach key="coach" />}
        {currentScene === 3 && <Scene04Conflict key="conflict" />}
        {currentScene === 4 && <Scene05Report key="report" />}
        {currentScene === 5 && <Scene06Close key="close" />}
      </AnimatePresence>
    </VideoCanvas>
  );
}
