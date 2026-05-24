import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Task } from "@/lib/storage";

interface Props {
  tasks: Task[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onAdd, onToggle, onDelete }: Props) {
  const [input, setInput] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <section id="tasks" className="mx-auto max-w-6xl px-6 py-8">
      <div className="glass rounded-3xl p-6 shadow-card">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Your tasks</h2>
            <p className="text-sm text-muted-foreground">Tiny steps. Big sprints.</p>
          </div>
        </div>

        <form onSubmit={submit} className="mb-5 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What will you study today? ✏️"
            className="flex-1 rounded-2xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:shadow-soft"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow"
          >
            <Plus className="h-4 w-4" /> Add
          </motion.button>
        </form>

        <ul className="space-y-2">
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 && (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground"
              >
                No tasks yet ✨ Add your first one above.
              </motion.li>
            )}
            {tasks.map(t => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group flex items-center gap-3 rounded-2xl bg-card/60 p-3 shadow-card transition-colors hover:bg-card"
              >
                <button
                  onClick={() => onToggle(t.id)}
                  aria-label="Toggle complete"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    t.done
                      ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {t.done && <Check className="h-4 w-4" />}
                </button>
                <span className={`flex-1 text-sm transition-all ${t.done ? "text-muted-foreground line-through" : ""}`}>
                  {t.title}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  aria-label="Delete task"
                  className="rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
