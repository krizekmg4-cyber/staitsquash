import { motion } from 'framer-motion';
import { AppTop, Phone, SceneFrame } from './shared';

export function Scene04Conflict() {
  return (
    <SceneFrame eyebrow="03 / Surface the overlap" title={<>Before it<br /><span className="text-[#eeac52]">becomes a problem.</span></>} copy="One coach. Two courts. The conflict is visible while there is still time to move.">
      <Phone y="68%" x="53%" tilt={2}>
        <AppTop section="Coach schedule" count="02" />
        <div className="px-[5.5vmin] pt-[4vmin]">
          <motion.div className="rounded-[3vmin] border-[.35vmin] border-[#eeac52] bg-[#fff6df] p-[3.2vmin]" initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .6, type: 'spring', stiffness: 220, damping: 22 }}>
            <div className="flex items-center justify-between"><div className="label text-[1.1vmin] text-[#a4772c]">overlap found</div><div className="grid h-[4.8vmin] w-[4.8vmin] place-items-center rounded-full bg-[#eeac52] text-[2.4vmin] font-bold text-[#173b3b]">!</div></div>
            <div className="mt-[2.5vmin] text-[3.3vmin] font-extrabold tracking-[-.07em] text-[#173b3b]">Alex is double-booked</div>
            <div className="mt-[1.1vmin] text-[1.7vmin] leading-[1.35] text-[#80642d]">18:30 · Court 02 + Court 04</div>
          </motion.div>
          <div className="mt-[3.3vmin] space-y-[1.4vmin]">
            <div className="flex items-center justify-between rounded-[2.5vmin] bg-[#e8e5dc] p-[2.7vmin]"><div><div className="text-[1.8vmin] font-bold text-[#173b3b]">Maya vs. Nina</div><div className="mt-[.6vmin] text-[1.4vmin] text-[#6e7d76]">Court 02 · 18:30</div></div><span className="h-[2vmin] w-[2vmin] rounded-full bg-[#ee6b4d]" /></div>
            <div className="flex items-center justify-between rounded-[2.5vmin] bg-[#e8e5dc] p-[2.7vmin]"><div><div className="text-[1.8vmin] font-bold text-[#173b3b]">Iris vs. Lila</div><div className="mt-[.6vmin] text-[1.4vmin] text-[#6e7d76]">Court 04 · 18:30</div></div><span className="h-[2vmin] w-[2vmin] rounded-full bg-[#eeac52]" /></div>
          </div>
          <div className="mt-[3vmin] flex items-center gap-[1.5vmin] text-[1.5vmin] font-semibold text-[#6e7d76]"><span className="h-[1.1vmin] w-[1.1vmin] rounded-full bg-[#8cae72]" /> Move one assignment. Keep play moving.</div>
        </div>
      </Phone>
    </SceneFrame>
  );
}