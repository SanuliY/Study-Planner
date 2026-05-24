export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
}

const TASKS_KEY = "studysprint.tasks";
const STREAK_KEY = "studysprint.streak";
const THEME_KEY = "studysprint.theme";
const STATS_KEY = "studysprint.stats";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(TASKS_KEY) || "[]"); } catch { return []; }
};
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

interface StreakData { count: number; lastDate: string; }
export const loadStreak = (): StreakData => {
  if (typeof window === "undefined") return { count: 0, lastDate: "" };
  try { return JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"lastDate":""}'); }
  catch { return { count: 0, lastDate: "" }; }
};
export const bumpStreak = (): StreakData => {
  const today = new Date().toDateString();
  const prev = loadStreak();
  if (prev.lastDate === today) return prev;
  const yest = new Date(Date.now() - 86400000).toDateString();
  const next = { count: prev.lastDate === yest ? prev.count + 1 : 1, lastDate: today };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
};

export const loadTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
};
export const saveTheme = (t: "light" | "dark") => localStorage.setItem(THEME_KEY, t);

// ===== Gamification =====
export interface Stats {
  xp: number;
  tasksCompleted: number;
  focusMinutes: number;
  unlocked: string[]; // achievement ids
}

const defaultStats: Stats = { xp: 0, tasksCompleted: 0, focusMinutes: 0, unlocked: [] };

export const loadStats = (): Stats => {
  if (typeof window === "undefined") return defaultStats;
  try { return { ...defaultStats, ...JSON.parse(localStorage.getItem(STATS_KEY) || "{}") }; }
  catch { return defaultStats; }
};
export const saveStats = (s: Stats) => localStorage.setItem(STATS_KEY, JSON.stringify(s));

// Level grows softly: level 1 at 0xp, 2 at 100, 3 at 250, 4 at 450... (n*(n-1)/2 * 100)
export const levelFromXp = (xp: number) => {
  let lvl = 1;
  while ((lvl * (lvl - 1) / 2) * 100 <= xp) lvl++;
  return lvl - 1;
};
export const xpForLevel = (lvl: number) => (lvl * (lvl - 1) / 2) * 100;
export const levelProgress = (xp: number) => {
  const lvl = levelFromXp(xp);
  const cur = xpForLevel(lvl);
  const next = xpForLevel(lvl + 1);
  return { level: lvl, into: xp - cur, span: next - cur, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
};

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  check: (s: Stats, streak: number) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-step", name: "First Step", emoji: "🌱", desc: "Complete your first task", check: s => s.tasksCompleted >= 1 },
  { id: "study-warrior", name: "Study Warrior", emoji: "⚔️", desc: "Complete 10 tasks", check: s => s.tasksCompleted >= 10 },
  { id: "task-legend", name: "Task Legend", emoji: "👑", desc: "Complete 50 tasks", check: s => s.tasksCompleted >= 50 },
  { id: "focus-master", name: "Focus Master", emoji: "🧠", desc: "Focus for 60 minutes", check: s => s.focusMinutes >= 60 },
  { id: "deep-diver", name: "Deep Diver", emoji: "🌊", desc: "Focus for 240 minutes", check: s => s.focusMinutes >= 240 },
  { id: "streak-3", name: "On a Roll", emoji: "✨", desc: "3-day streak", check: (_s, st) => st >= 3 },
  { id: "streak-7", name: "7-Day Streak", emoji: "🔥", desc: "Study 7 days in a row", check: (_s, st) => st >= 7 },
  { id: "streak-30", name: "Unstoppable", emoji: "💎", desc: "30-day streak", check: (_s, st) => st >= 30 },
  { id: "level-5", name: "Rising Star", emoji: "⭐", desc: "Reach level 5", check: s => levelFromXp(s.xp) >= 5 },
  { id: "level-10", name: "Productivity Pro", emoji: "🚀", desc: "Reach level 10", check: s => levelFromXp(s.xp) >= 10 },
];
