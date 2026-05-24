import { motion } from "framer-motion";
import { ACHIEVEMENTS, type Stats } from "@/lib/storage";
import { Lock } from "lucide-react";

interface Props { stats: Stats; streak: number; }

export function Achievements({ stats, streak }: Props) {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-8">
      <div className="glass rounded-3xl p-6 shadow-card">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Achievements</h2>
            <p className="text-sm text-muted-foreground">
              {stats.unlocked.length}/{ACHIEVEMENTS.length} unlocked · keep going!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {ACHIEVEMENTS.map((a, i) => {
            const unlocked = stats.unlocked.includes(a.id) || a.check(stats, streak);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className={`relative overflow-hidden rounded-2xl p-4 text-center shadow-card transition-all ${
                  unlocked
                    ? "bg-gradient-to-br from-card to-accent/40 border border-primary/20"
                    : "bg-secondary/40 opacity-60"
                }`}
              >
                <div className={`mx-auto mb-2 text-3xl ${unlocked ? "" : "grayscale"}`}>
                  {unlocked ? a.emoji : <Lock className="mx-auto h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="text-xs font-semibold">{a.name}</div>
                <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{a.desc}</div>
                {unlocked && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute right-2 top-2 rounded-full bg-gradient-primary px-1.5 py-0.5 text-[8px] font-bold text-primary-foreground"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
