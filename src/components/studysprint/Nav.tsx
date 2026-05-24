import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { loadTheme, saveTheme } from "@/lib/storage";

export function Nav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    saveTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-gradient-gold shadow-gold" />
          <span className="font-display text-lg tracking-[0.35em] text-foreground">
            STUDYSPRINT
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:flex">
          <a href="#dashboard" className="transition-colors hover:text-foreground">Dashboard</a>
          <a href="#tasks" className="transition-colors hover:text-foreground">Tasks</a>
          <a href="#timer" className="transition-colors hover:text-foreground">Focus</a>
          <a href="#achievements" className="transition-colors hover:text-foreground">Awards</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-all hover:scale-110 hover:border-gold"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <a
            href="#dashboard"
            className="hidden rounded-full border-gold border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold transition-all hover:bg-gradient-gold hover:text-black sm:inline-block"
          >
            Start
          </a>
        </div>
      </div>
    </motion.header>
  );
}
