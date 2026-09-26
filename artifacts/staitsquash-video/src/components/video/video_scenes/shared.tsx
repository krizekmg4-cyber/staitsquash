import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const ease = [0.16, 1, 0.3, 1] as const;

export function SceneFrame({
  eyebrow,
  title,
  copy,
  children,
  tone = 'light',
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const light = tone === 'light';
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(100% 0 0% 0)' }}
      transition={{ duration: 0.85, ease }}
      style={{ color: light ? 'var(--color-text-primary)' : 'var(--color-text-inverse)' }}
    >
      <div className="absolute left-[7%] top-[10%] right-[7%]">
        <motion.div
          className="label text-[1.4vmin]"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease }}
          style={{ color: light ? 'var(--color-secondary)' : 'rgba(244,241,233,.62)' }}
        >
          {eyebrow}
        </motion.div>
        <motion.h1
          className="mt-[1.5vmin] max-w-[88%] font-extrabold tracking-[-.07em] text-[8.8vmin] leading-[.92]"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.72, ease }}
        >
          {title}
        </motion.h1>
        {copy && (
          <motion.p
            className="mt-[2.2vmin] max-w-[76%] text-[2.4vmin] leading-[1.35]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 0.72, y: 0 }}
            transition={{ delay: 0.48, duration: 0.62, ease }}
            style={{ color: light ? 'var(--color-secondary)' : 'rgba(244,241,233,.72)' }}
          >
            {copy}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export function Phone({
  children,
  x = '50%',
  y = '57%',
  scale = 1,
  tilt = 0,
}: {
  children: ReactNode;
  x?: string;
  y?: string;
  scale?: number;
  tilt?: number;
}) {
  return (
    <motion.div
      className="phone-shadow absolute w-[68%] max-w-[38vmin] rounded-[5.4vmin] border-[.6vmin] border-[#183d3c] bg-[#183d3c] p-[1.25vmin]"
      style={{ left: x, top: y, transformOrigin: 'center', translateX: '-50%', translateY: '-50%' }}
      initial={{ opacity: 0, y: 28, rotate: tilt - 3, scale: scale * .94 }}
      animate={{ opacity: 1, y: 0, rotate: tilt, scale }}
      transition={{ delay: 0.55, duration: 0.95, ease }}
    >
      <div className="absolute left-1/2 top-[.7vmin] z-10 h-[1.8vmin] w-[25%] -translate-x-1/2 rounded-full bg-[#183d3c]" />
      <div className="phone-screen relative aspect-[.485] overflow-hidden rounded-[4.3vmin] bg-[#f4f1e9]">
        {children}
      </div>
    </motion.div>
  );
}

export function AppTop({ section = 'Today', count = '01' }: { section?: string; count?: string }) {
  return (
    <div className="flex items-center justify-between px-[5.5vmin] pt-[5.4vmin]">
      <div>
        <div className="label text-[1.15vmin] text-[#84918a]">staitsquash</div>
        <div className="mt-[.6vmin] text-[3.7vmin] font-bold tracking-[-.06em] text-[#173b3b]">{section}</div>
      </div>
      <div className="grid h-[6vmin] w-[6vmin] place-items-center rounded-full bg-[#dce7d5] font-mono text-[1.5vmin] text-[#557052]">{count}</div>
    </div>
  );
}

export function Avatar({ initials, color = '#ee6b4d' }: { initials: string; color?: string }) {
  return <div className="grid h-[8vmin] w-[8vmin] shrink-0 place-items-center rounded-full text-[2.2vmin] font-bold text-[#f4f1e9]" style={{ background: color }}>{initials}</div>;
}

export function CourtIllustration() {
  return (
    <img
      alt=""
      src={`${import.meta.env.BASE_URL}court-lines.svg`}
      className="h-full w-full object-cover"
    />
  );
}

export function TinyRule() {
  return <div className="h-[.22vmin] w-[10vmin] bg-[#ee6b4d]" />;
}