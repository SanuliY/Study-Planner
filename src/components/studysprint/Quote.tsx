import { AnimatePresence, motion } from "framer-motion";
import { Quote as QuoteIcon, RefreshCw } from "lucide-react";
import { useState } from "react";

const QUOTES = [
  { t: "Small steps every day lead to big results.", a: "Anonymous" },
  { t: "You don't have to be extreme, just consistent.", a: "Anonymous" },
  { t: "The expert in anything was once a beginner.", a: "Helen Hayes" },
  { t: "Discipline is choosing between what you want now and what you want most.", a: "Abraham Lincoln" },
  { t: "Success is the sum of small efforts repeated daily.", a: "Robert Collier" },
  { t: "Focus on being productive instead of busy.", a: "Tim Ferriss" },
  { t: "Done is better than perfect.", a: "Sheryl Sandberg" },
];

export function Quote() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];

  return (
    <section id="quote" className="mx-auto max-w-6xl px-6 py-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-soft md:p-12">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <QuoteIcon className="mb-4 h-8 w-8 opacity-70" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative font-display text-2xl font-semibold leading-snug md:text-3xl"
          >
            "{q.t}"
            <footer className="mt-3 text-sm font-normal opacity-80">— {q.a}</footer>
          </motion.blockquote>
        </AnimatePresence>
        <button
          onClick={() => setI((i + 1) % QUOTES.length)}
          className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur transition-all hover:scale-105 hover:bg-white/25"
        >
          <RefreshCw className="h-3.5 w-3.5" /> New quote
        </button>
      </div>
    </section>
  );
}
