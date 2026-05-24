import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Flame, Trophy } from "lucide-react";

const previews = [
  { icon: CheckCircle2, label: "Tasks", value: "12 today", tint: "from-primary/30 to-transparent" },
  { icon: Clock, label: "Focus", value: "2h 40m", tint: "from-primary-glow/30 to-transparent" },
  { icon: Flame, label: "Streak", value: "7 days", tint: "from-accent/40 to-transparent" },
  { icon: Trophy, label: "Level", value: "Lv 04", tint: "from-[oklch(0.4_0.18_300)]/40 to-transparent" },
];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border-gold border bg-white/[0.50] px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gold backdrop-blur-md"
        >
       
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{
            opacity: 0.12,
            x: ["-20%", "120%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 whitespace-nowrap text-5xl font-extrabold tracking-widest text-gold pointer-events-none"
        >
          A Premium Study Experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 font-display text-[3.5rem] leading-[0.95] tracking-tight md:text-[7rem] lg:text-[8.5rem]"
        >
          <span className="block italic font-light text-gradient-gold">Study</span>
          <span className="block font-medium text-foreground">SPRINT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-7 max-w-xl text-sm font-light leading-relaxed text-muted-foreground md:text-base"
        >
          A cinematic productivity ritual for students who treat focus like fine craft —
          plan tasks, sprint deeply, ascend levels.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-gold transition-all hover:scale-[1.03]"
          >
            Begin Sprint
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#timer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all hover:scale-[1.03] hover:border-gold"
          >
            Focus Timer
          </a>
        </motion.div>
      </div>

      {/* Preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {previews.map((p, i) => (
          <motion.div
            key={p.label}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl glass-strong p-6 shadow-card"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.tint} opacity-60 transition-opacity group-hover:opacity-100`} />
            <div className="relative">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border-gold border bg-black/40 text-gold">
                <p.icon className="h-4 w-4" />
              </div>
              <div className="font-display text-3xl text-foreground">{p.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <div className="mt-16 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </section>
  );
}
