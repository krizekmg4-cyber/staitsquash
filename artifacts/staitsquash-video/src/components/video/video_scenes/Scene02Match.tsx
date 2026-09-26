import { motion } from 'framer-motion';
import { AppTop, Avatar, Phone, SceneFrame } from './shared';

export function Scene02Match() {
  return (
    <SceneFrame eyebrow="01 / Find the next opponent" title={<>The details,<br /><span className="text-[#ee6b4d]">in one glance.</span></>} copy="No digging through a calendar. The next match carries its own context.">
      <Phone y="67%" x="53%" tilt={3}>
        <AppTop section="Match details" count="01" />
        <div className="px-[5.5vmin] pt-[4vmin]">
          <div className="rounded-[3vmin] bg-[#173b3b] p-[3.5vmin] text-[#f4f1e9]">
            <div className="label text-[1.1vmin] text-[#b7c7b2]">Tonight · 18:30</div>
            <div className="mt-[2vmin] text-[5.2vmin] font-extrabold tracking-[-.08em]">Maya Chen</div>
            <div className="mt-[.8vmin] text-[2vmin] text-[#b7c7b2]">vs. Nina Okafor</div>
            <div className="mt-[4vmin] flex items-center gap-[2vmin] border-t border-[#52706a] pt-[3vmin]"><Avatar initials="NO" color="#ee6b4d" /><div><div className="text-[1.9vmin] font-semibold">Nina Okafor</div><div className="text-[1.55vmin] text-[#b7c7b2]">Division B · Round 3</div></div></div>
          </div>
          <div className="mt-[2.5vmin] grid grid-cols-2 gap-[1.7vmin]">
            <div className="rounded-[2.5vmin] border border-[#d4dcd0] p-[2.5vmin]"><div className="label text-[1vmin] text-[#84918a]">venue</div><div className="mt-[1.5vmin] text-[2vmin] font-bold text-[#173b3b]">North Wall</div></div>
            <div className="rounded-[2.5vmin] border border-[#d4dcd0] p-[2.5vmin]"><div className="label text-[1vmin] text-[#84918a]">court</div><div className="mt-[1.5vmin] text-[2vmin] font-bold text-[#173b3b]">Court 02</div></div>
          </div>
          <motion.div className="mt-[2.5vmin] flex items-center justify-between rounded-[2.5vmin] bg-[#ee6b4d] px-[3vmin] py-[2.3vmin] text-[#f4f1e9]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .5 }}><span className="text-[1.8vmin] font-bold">Ready for warm-up</span><span className="font-mono text-[1.6vmin]">18:30</span></motion.div>
        </div>
      </Phone>
    </SceneFrame>
  );
}