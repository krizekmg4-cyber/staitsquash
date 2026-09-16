import { motion } from 'framer-motion';
import { CourtIllustration, ease, SceneFrame, TinyRule } from './shared';

export function Scene06Close() {
  return (
    <SceneFrame eyebrow="StaitSquash Player Tracker" title={<>A clearer club<br /><span className="text-[#8cae72]">starts here.</span></>} copy="Sample data today. A focused foundation for the Club Locker refresh tomorrow." tone="dark">
      <motion.div className="absolute left-[8%] top-[49%] w-[37%] overflow-hidden rounded-[3vmin] border-[.35vmin] border-[#8cae72] bg-[#c6d4bd] p-[1.3vmin]" initial={{ opacity: 0, rotate: -10, scale: .85 }} animate={{ opacity: .9, rotate: -6, scale: 1 }} transition={{ delay: .65, duration: .85, ease }}><div className="aspect-[.69] overflow-hidden rounded-[2vmin]"><CourtIllustration /></div></motion.div>
      <motion.div className="absolute right-[8%] top-[53%] w-[39%] rounded-[3vmin] bg-[#ee6b4d] p-[3.2vmin] text-[#f4f1e9]" initial={{ opacity: 0, rotate: 8, y: 24 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ delay: .82, duration: .8, ease }}>
        <div className="label text-[1.2vmin] opacity-75">the story</div>
        <div className="mt-[2.5vmin] text-[3vmin] font-extrabold tracking-[-.06em] leading-[1.02]">Find.<br />Assign.<br />Learn.</div>
        <div className="mt-[4vmin] h-[.25vmin] w-[8vmin] bg-[#f4f1e9]" />
        <div className="mt-[1.7vmin] text-[1.45vmin] leading-[1.35] opacity-80">One match, carried all the way through.</div>
      </motion.div>
      <motion.div className="absolute bottom-[8%] left-[8%] flex items-center gap-[2vmin]" initial={{ opacity: 0 }} animate={{ opacity: .7 }} transition={{ delay: 1.3, duration: .5 }}><TinyRule /><span className="label text-[1.3vmin] text-[#b7c7b2]">story complete / 06</span></motion.div>
    </SceneFrame>
  );
}
