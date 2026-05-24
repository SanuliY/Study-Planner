import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Background } from "@/components/studysprint/Background";
import { Nav } from "@/components/studysprint/Nav";
import { Hero } from "@/components/studysprint/Hero";
import { Dashboard } from "@/components/studysprint/Dashboard";
import { TaskList } from "@/components/studysprint/TaskList";
import { Timer } from "@/components/studysprint/Timer";
import { Quote } from "@/components/studysprint/Quote";
import { Achievements } from "@/components/studysprint/Achievements";
import { StudyPet } from "@/components/studysprint/StudyPet";
import { ConfettiHost, celebrate } from "@/components/studysprint/Confetti";
import {
  ACHIEVEMENTS,
  bumpStreak,
  levelFromXp,
  levelProgress,
  loadStats,
  loadStreak,
  loadTasks,
  saveStats,
  saveTasks,
  type Stats,
  type Task,
} from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudySprint  — Calm productivity for students" },
      { name: "description", content: "A soft, modern study planner with tasks, focus timer, streaks, XP and achievements. Built for students." },
      { property: "og:title", content: "StudySprint " },
      { property: "og:description", content: "Plan tasks, focus deeply, level up — your aesthetic study companion." },
    ],
  }),
  component: Index,
});

const TASK_MSGS = [
  "Another task defeated ✨",
  "You're on fire today 🔥",
  "Productivity level rising 🚀",
  "Crushing it 💜",
  "Sprint complete 🌟",
  "One step closer 🌱",
];

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState<Stats>({ xp: 0, tasksCompleted: 0, focusMinutes: 0, unlocked: [] });
  const [tasksToday, setTasksToday] = useState(0);

  useEffect(() => {
    setTasks(loadTasks());
    setStreak(loadStreak().count);
    setStats(loadStats());
  }, []);

  const persistTasks = (next: Task[]) => { setTasks(next); saveTasks(next); };

  const updateStats = useCallback((mut: (s: Stats) => Stats, currentStreak: number) => {
    setStats(prev => {
      const next = mut(prev);
      // Check for newly unlocked achievements
      for (const a of ACHIEVEMENTS) {
        if (!next.unlocked.includes(a.id) && a.check(next, currentStreak)) {
          next.unlocked = [...next.unlocked, a.id];
          setTimeout(() => {
            toast.success(`Achievement unlocked! ${a.emoji} ${a.name}`, { description: a.desc });
            celebrate();
          }, 400);
        }
      }
      // Level up detection
      const prevLvl = levelFromXp(prev.xp);
      const newLvl = levelFromXp(next.xp);
      if (newLvl > prevLvl) {
        setTimeout(() => {
          toast(`Level up! 🚀 You're now level ${newLvl}`, { description: "Productivity level increased" });
          celebrate();
        }, 200);
      }
      saveStats(next);
      return next;
    });
  }, []);

  const addTask = useCallback((title: string) => {
    persistTasks([{ id: crypto.randomUUID(), title, done: false, createdAt: Date.now() }, ...loadTasks()]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    const current = loadTasks();
    const target = current.find(t => t.id === id);
    const wasUndone = target && !target.done;
    const next = current.map(t => t.id === id ? { ...t, done: !t.done } : t);
    persistTasks(next);

    if (wasUndone) {
      const newStreak = bumpStreak().count;
      setStreak(newStreak);
      setTasksToday(n => n + 1);
      celebrate();
      const msg = TASK_MSGS[Math.floor(Math.random() * TASK_MSGS.length)];
      toast.success(msg, { description: "+25 XP earned" });
      updateStats(s => ({ ...s, xp: s.xp + 25, tasksCompleted: s.tasksCompleted + 1 }), newStreak);
    }
  }, [updateStats]);

  const deleteTask = useCallback((id: string) => {
    persistTasks(loadTasks().filter(t => t.id !== id));
  }, []);

  const handleFocusComplete = useCallback((m: number) => {
    const newStreak = bumpStreak().count;
    setStreak(newStreak);
    celebrate();
    toast.success(`Focus sprint complete! ${m}m 🧠`, { description: `+${m * 2} XP earned` });
    updateStats(s => ({ ...s, xp: s.xp + m * 2, focusMinutes: s.focusMinutes + m }), newStreak);
  }, [updateStats]);

  const lvl = useMemo(() => levelProgress(stats.xp), [stats.xp]);
  const focusMinutes = stats.focusMinutes;

  return (
    <div className="min-h-screen">
      <Background />
      <ConfettiHost />
      <Toaster position="top-center" />
      <Nav />
      <main>
        <Hero />
        <Dashboard
          tasks={tasks}
          streak={streak}
          focusMinutes={focusMinutes}
          xp={stats.xp}
          level={lvl.level}
          levelPct={lvl.pct}
          xpInto={lvl.into}
          xpSpan={lvl.span}
        />
        <section className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-[1fr_320px]">
          <TaskList tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
          <div className="px-0 md:pt-8">
            <StudyPet tasksToday={tasksToday} level={lvl.level} />
          </div>
        </section>
        <Achievements stats={stats} streak={streak} />
        <Timer onComplete={handleFocusComplete} />
        <Quote />
        <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
          Made with 💜 for focused students · StudySprint
        </footer>
      </main>
    </div>
  );
}
