import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props { onComplete: (minutes: number) => void; }

const PRESETS = [
  { label: "Focus", mins: 25 },
  { label: "Short break", mins: 5 },
  { label: "Long break", mins: 15 },
];

export function Timer({ onComplete }: Props) {
  const [duration, setDuration] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setRunning(false);
            onComplete(Math.round(duration / 60));
            return duration;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, duration, onComplete]);

  const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const progress = 1 - remaining / duration;
  const circumference = 2 * Math.PI * 90;

  const setPreset = (m: number) => {
    setRunning(false);
    setDuration(m * 60);
    setRemaining(m * 60);
  };

  return (
    <section id="timer" className="mx-auto max-w-6xl px-6 py-8">
      <div className="glass rounded-3xl p-8 shadow-card">
        <div className="mb-2 text-center">
          <h2 className="font-display text-2xl font-bold">Focus timer</h2>
          <p className="text-sm text-muted-foreground">Deep work, one sprint at a time.</p>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => setPreset(p.mins)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                duration === p.mins * 60
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:scale-105"
              }`}
            >
              {p.label} · {p.mins}m
            </button>
          ))}
        </div>

        <div className="relative mx-auto mt-8 flex h-64 w-64 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" stroke="var(--color-secondary)" strokeWidth="10" fill="none" />
            <motion.circle
              cx="100" cy="100" r="90"
              stroke="url(#g)" strokeWidth="10" fill="none" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transition={{ duration: 0.6 }}
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.17 300)" />
                <stop offset="100%" stopColor="oklch(0.78 0.15 325)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <div className="font-display text-6xl font-bold tabular-nums tracking-tight">{mins}:{secs}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              {running ? "focusing" : "ready"}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setRunning(r => !r)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3 font-semibold text-primary-foreground shadow-soft hover:shadow-glow"
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? "Pause" : "Start"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => { setRunning(false); setRemaining(duration); }}
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 font-semibold"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
