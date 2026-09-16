import { motion } from 'framer-motion';
import { AppTop, Avatar, Phone, SceneFrame } from './shared';

export function Scene03Coach() {
  return (
    <SceneFrame eyebrow="02 / Keep the bench in sync" title={<>A coach<br /><span className="text-[#8cae72]">has the thread.</span></>} copy="Assignments travel with the match — not in a separate message.">
      <Phone y="69%" x="47%" tilt={-3}>
        <AppTop section="Match details" count="01" />
        <div className="px-[5.5vmin] pt-[4.2vmin]">
          <div className="rounded-[3vmin] border border-[#d4dcd0] p-[3.2vmin]">
            <div className="label text-[1.1vmin] text-[#84918a]">assigned coach</div>
            <div className="mt-[2.5vmin] flex items-center gap-[2vmin]"><Avatar initials="AR" color="#8cae72" /><div><div className="text-[2.3vmin] font-bold text-[#173b3b]">Alex Romero</div><div className="text-[1.6vmin] text-[#6e7d76]">Coach · North Wall</div></div></div>
            <div className="mt-[3.2vmin] flex items-center gap-[1.2vmin] text-[1.5vmin] text-[#6e7d76]"><span className="grid h-[3vmin] w-[3vmin] place-items-center rounded-full bg-[#e5efdf] text-[1.4vmin] text-[#557052]">✓</span> Briefing shared with Alex</div>
          </div>
          <div className="mt-[3vmin] text-[2vmin] font-bold text-[#173b3b]">Coach view</div>
          <motion.div className="mt-[1.8vmin] rounded-[3vmin] bg-[#e8e5dc] p-[3vmin]" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05, duration: .55 }}>
            <div className="flex items-center justify-between"><span className="label text-[1.1vmin] text-[#84918a]">today</span><span className="rounded-full bg-[#8cae72] px-[2vmin] py-[.9vmin] text-[1.3vmin] font-bold text-[#173b3b]">assigned</span></div>
            <div className="mt-[2.2vmin] text-[2.1vmin] font-bold text-[#173b3b]">Maya vs. Nina</div>
            <div className="mt-[.9vmin] text-[1.5vmin] text-[#6e7d76]">18:30 · Court 02</div>
          </motion.div>
        </div>
      </Phone>
    </SceneFrame>
  );
}