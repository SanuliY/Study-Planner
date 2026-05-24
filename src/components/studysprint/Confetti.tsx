import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Burst { id: number; }

let nextId = 0;
const listeners = new Set<(b: Burst) => void>();

export const celebrate = () => {
  const b = { id: ++nextId };
  listeners.forEach(l => l(b));
};

const COLORS = [
  "oklch(0.78 0.15 310)",
  "oklch(0.72 0.17 300)",
  "oklch(0.85 0.13 340)",
  "oklch(0.88 0.14 95)",
  "oklch(0.82 0.16 200)",
];
const EMOJIS = ["✨", "⭐", "💜", "🎉", "🌟"];

function Piece({ i }: { i: number }) {
  const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
  const dist = 120 + Math.random() * 180;
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;
  const isEmoji = i % 4 === 0;
  const color = COLORS[i % COLORS.length];
  const size = 6 + Math.random() * 8;
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
      animate={{ x, y: y + 80, opacity: 0, scale: 1, rotate: Math.random() * 540 - 270 }}
      transition={{ duration: 1.4, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: isEmoji ? "auto" : size,
        height: isEmoji ? "auto" : size,
        background: isEmoji ? "transparent" : color,
        borderRadius: i % 2 === 0 ? "999px" : "3px",
        fontSize: isEmoji ? 22 : undefined,
        pointerEvents: "none",
      }}
    >
      {isEmoji ? EMOJIS[i % EMOJIS.length] : null}
    </motion.div>
  );
}

export function ConfettiHost() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const l = (b: Burst) => {
      setBursts(prev => [...prev, b]);
      setTimeout(() => setBursts(prev => prev.filter(x => x.id !== b.id)), 1600);
    };
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {bursts.map(b => (
          <div key={b.id} className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: 24 }).map((_, i) => <Piece key={i} i={i} />)}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
