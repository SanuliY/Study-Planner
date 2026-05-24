import { motion } from "framer-motion";

interface Props { tasksToday: number; level: number; }

const moodFor = (n: number) => {
  if (n >= 5) return { face: "🥳", msg: "I'm SO proud of you today!" };
  if (n >= 3) return { face: "😻", msg: "You're crushing it — keep going!" };
  if (n >= 1) return { face: "😊", msg: "Yay, a task done! More?" };
  return { face: "🥱", msg: "Tap a task — let's start small." };
};

export function StudyPet({ tasksToday, level }: Props) {
  const mood = moodFor(tasksToday);
  return (
    <div className="glass rounded-3xl p-6 shadow-card text-center">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">Your study buddy</div>
      <motion.div
        key={mood.face}
        initial={{ scale: 0.6, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 12 }}
        className="relative mx-auto mt-3 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary/30 shadow-glow"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          {mood.face}
        </motion.div>
        <div className="absolute -bottom-2 right-0 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-soft">
          Lv {level}
        </div>
      </motion.div>
      <div className="mt-4 text-sm font-medium">{mood.msg}</div>
      <div className="mt-1 text-xs text-muted-foreground">{tasksToday} task{tasksToday === 1 ? "" : "s"} fed today</div>
    </div>
  );
}
