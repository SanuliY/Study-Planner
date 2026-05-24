import { motion } from "framer-motion";

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-mesh opacity-90" />

      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-40 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 70, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary-glow/25 blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/50 blur-[110px]"
      />

      <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.06]"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }} />
    </div>
  );
}
