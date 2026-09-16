import { motion } from 'framer-motion';
import { AppTop, Avatar, Phone, SceneFrame, TinyRule } from './shared';

export function Scene01Intro() {
  return (
    <SceneFrame
      eyebrow="A player tracker for the club floor"
      title={<>Make the next match<br /><span className="text-[#ee6b4d]">obvious.</span></>}
      copy="A sample-data-first story for StaitSquash — built for the future Club Locker refresh."
    >
      <motion.div className="absolute bottom-[8%] left-[8%] flex items-center gap-[2vmin]" initial={{ opacity: 0 }} animate={{ opacity: .7 }} transition={{ delay: .9, duration: .5 }}>
        <TinyRule /><span className="label text-[1.3vmin] text-[#6e7d76]">Player view / 01</span>
      </motion.div>
      <Phone y="69%" tilt={-4}>
        <AppTop count="03" />
        <div className="px-[5.5vmin] pt-[5vmin]">
          <div className="label text-[1.1vmin] text-[#84918a]">next on court</div>
          <div className="mt-[1.3vmin] text-[7vmin] font-extrabold tracking-[-.08em] text-[#173b3b]">Maya<br />vs. Nina</div>
          <div className="mt-[3.6vmin] rounded-[3vmin] bg-[#dce7d5] p-[3vmin]">
            <div className="flex items-center gap-[2vmin]"><Avatar initials="MN" /><div><div className="text-[2vmin] font-bold text-[#173b3b]">Today · 18:30</div><div className="mt-[.4vmin] text-[1.6vmin] text-[#6e7d76]">Court 02 · North Wall</div></div></div>
          </div>
          <div className="mt-[4vmin] flex justify-between text-[1.65vmin] text-[#6e7d76]"><span>Upcoming</span><span className="font-mono text-[#ee6b4d]">03 matches</span></div>
        </div>
      </Phone>
    </SceneFrame>
  );
}