"use client";

import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import { WELCOME_SUBLINE } from "@/lib/content";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush-100 via-blush-50 to-white px-6 text-center"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <FloatingHearts count={10} />

      <motion.div
        className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-rose-200/40 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-3 font-body text-xs uppercase tracking-[0.35em] text-rose-600"
      >
        for you, only
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-semibold leading-tight text-plum-900 xs:text-5xl"
      >
        A Little Surprise
        <br />
        <span className="font-script text-5xl font-medium text-rose-600 xs:text-6xl">
          For You
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-5 max-w-xs font-body text-sm text-plum-800/70"
      >
        {WELCOME_SUBLINE}
      </motion.p>

      <motion.button
        onClick={onEnter}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        whileTap={{ scale: 0.94 }}
        className="group relative mt-10 overflow-hidden rounded-full bg-rose-600 px-9 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-lg shadow-rose-300/50"
      >
        <span className="relative z-10">Open my surprise</span>
        <span className="absolute inset-0 -translate-x-full bg-shimmer-gradient group-active:translate-x-full transition-transform duration-700" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 1.8, repeat: Infinity } }}
        className="absolute bottom-8 text-rose-400"
        aria-hidden="true"
      >
        ⌄
      </motion.div>
    </motion.section>
  );
}
