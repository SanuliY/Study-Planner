import { motion } from "framer-motion";
import { Flame, Target, Clock, TrendingUp, Sparkles } from "lucide-react";
import type { Task } from "@/lib/storage";

interface Props {
  tasks: Task[];
  streak: number;
  focusMinutes: number;
  xp: number;
  level: number;
  levelPct: number;
  xpInto: number;
  xpSpan: number;
}

export function Dashboard({ tasks, streak, focusMinutes, xp, level, levelPct, xpInto, xpSpan }: Props) {
  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { icon: Sparkles, label: "Total XP", value: `${xp}`, accent: "from-violet-400 to-fuchsia-400" },
    { icon: Flame, label: "Day streak", value: `${streak} 🔥`, accent: "from-orange-300 to-pink-400" },
    { icon: Target, label: "Tasks done", value: `${completed}/${total || 0}`, accent: "from-purple-400 to-indigo-400" },
    { icon: Clock, label: "Focus time", value: `${focusMinutes}m`, accent: "from-pink-300 to-purple-400" },
  ];

  return (
    <section id="dashboard" className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass rounded-3xl p-5 shadow-card transition-shadow hover:shadow-soft"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-glow`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold font-display">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{c.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-3xl p-6 shadow-card"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
              {level}
            </div>
            <div>
              <div className="text-sm font-semibold">Level {level}</div>
              <div className="text-xs text-muted-foreground">{xpInto} / {xpSpan} XP to next level</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-bold text-gradient">{pct}%</div>
            <div className="text-xs text-muted-foreground">today's tasks</div>
          </div>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${levelPct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-primary shadow-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
