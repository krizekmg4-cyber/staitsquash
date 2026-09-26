import { motion } from 'framer-motion';
import { AppTop, Phone, SceneFrame } from './shared';

const observations = ['Early on the volley', 'Recovered to the T', 'Needed a calmer reset'];

export function Scene05Report() {
  return (
    <SceneFrame eyebrow="04 / Turn a match into memory" title={<>Three notes.<br /><span className="text-[#ee6b4d]">Better next time.</span></>} copy="When the match ends, the useful part takes less than a minute.">
      <Phone y="69%" x="47%" tilt={-2}>
        <AppTop section="Match report" count="done" />
        <div className="px-[5.5vmin] pt-[3.6vmin]">
          <div className="flex items-center justify-between"><div><div className="text-[2.8vmin] font-extrabold tracking-[-.06em] text-[#173b3b]">Maya Chen</div><div className="mt-[.6vmin] text-[1.5vmin] text-[#6e7d76]">vs. Nina Okafor · 3–1</div></div><div className="rounded-full bg-[#dce7d5] px-[2vmin] py-[1vmin] text-[1.3vmin] font-bold text-[#557052]">complete</div></div>
          <motion.div className="mt-[3vmin] rounded-[3vmin] bg-[#173b3b] p-[3.5vmin] text-[#f4f1e9]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .55 }}>
            <div className="label text-[1.1vmin] text-[#b7c7b2]">coach report</div>
            <div className="mt-[1.8vmin] space-y-[1.5vmin]">
              {observations.map((item, index) => <motion.div key={item} className="flex items-start gap-[1.8vmin] text-[1.8vmin] font-semibold" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + index * .17, duration: .42 }}><span className="font-mono text-[#ee6b4d]">0{index + 1}</span><span>{item}</span></motion.div>)}
            </div>
          </motion.div>
          <div className="mt-[2.6vmin] flex items-center gap-[1.8vmin] rounded-[2.5vmin] border border-[#d4dcd0] p-[2.4vmin]"><div className="grid h-[6vmin] w-[6vmin] place-items-center rounded-full bg-[#ee6b4d] text-[2vmin] text-[#f4f1e9]">●</div><div><div className="text-[1.7vmin] font-bold text-[#173b3b]">Voice note saved</div><div className="mt-[.4vmin] text-[1.35vmin] text-[#6e7d76]">0:38 · Alex Romero</div></div><div className="ml-auto h-[4vmin] w-[12vmin] rounded-full bg-[#dce7d5]"><div className="mt-[1.85vmin] h-[.3vmin] w-[8vmin] bg-[#8cae72]" /></div></div>
          <div className="mt-[2.3vmin] text-center label text-[1.1vmin] text-[#84918a]">typed or spoken · always concise</div>
        </div>
      </Phone>
    </SceneFrame>
  );
}