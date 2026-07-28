"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import { burstConfetti } from "@/lib/confetti";
import { RECIPIENT_NAME } from "@/lib/content";

interface GiftBoxProps {
  onOpened: () => void;
}

export default function GiftBox({ onOpened }: GiftBoxProps) {
  const [opening, setOpening] = useState(false);

  function handleTap() {
    if (opening) return;
    setOpening(true);
    burstConfetti();
    window.setTimeout(() => {
      onOpened();
    }, 1500);
  }

  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blush-50 to-blush-100 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts count={8} />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 font-body text-sm text-plum-800/70"
      >
        Go on, {RECIPIENT_NAME} — untie the ribbon.
      </motion.p>

      <button
        onClick={handleTap}
        aria-label="Open your gift"
        className="relative h-56 w-56 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-4 focus-visible:ring-offset-blush-50 rounded-3xl"
      >
        {/* glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-rose-300/40 blur-3xl"
          animate={{ scale: opening ? [1, 1.6] : [1, 1.08, 1] }}
          transition={{ duration: opening ? 1.2 : 2.6, repeat: opening ? 0 : Infinity }}
        />

        {/* box body */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-32 w-48 -translate-x-1/2 rounded-2xl bg-rose-500 shadow-xl shadow-rose-400/40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 2px, transparent 2px)",
            backgroundSize: "14px 14px",
          }}
          animate={
            opening
              ? { y: 20, scale: 0.96, opacity: 0 }
              : { y: [0, -4, 0] }
          }
          transition={
            opening
              ? { duration: 0.8, delay: 0.5 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* lid */}
        <motion.div
          className="absolute bottom-[7.5rem] left-1/2 h-9 w-56 -translate-x-1/2 rounded-xl bg-rose-600 shadow-lg shadow-rose-400/30"
          animate={
            opening
              ? { y: -90, rotate: -18, opacity: 0 }
              : { y: [0, -3, 0] }
          }
          transition={
            opening
              ? { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* vertical ribbon on box */}
        <div className="absolute bottom-0 left-1/2 h-32 w-6 -translate-x-1/2 bg-gold-400/90" />

        {/* bow left loop */}
        <motion.div
          className="absolute bottom-[8.1rem] left-1/2 h-12 w-14 origin-bottom-right rounded-full bg-gold-500 shadow-md"
          style={{ translateX: "-95%" }}
          animate={opening ? { rotate: -100, x: -60, opacity: 0 } : { rotate: [-8, 8, -8] }}
          transition={
            opening
              ? { duration: 0.9, ease: "easeIn" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* bow right loop */}
        <motion.div
          className="absolute bottom-[8.1rem] left-1/2 h-12 w-14 origin-bottom-left rounded-full bg-gold-500 shadow-md"
          style={{ translateX: "-5%" }}
          animate={opening ? { rotate: 100, x: 60, opacity: 0 } : { rotate: [8, -8, 8] }}
          transition={
            opening
              ? { duration: 0.9, ease: "easeIn" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* bow knot */}
        <motion.div
          className="absolute bottom-[8.3rem] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-gold-400 shadow"
          animate={opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1] }}
          transition={
            opening
              ? { duration: 0.4 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <AnimatePresence>
          {opening && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="text-6xl text-rose-500">✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <motion.p
        animate={{ opacity: opening ? 1 : 0 }}
        className="mt-8 font-script text-2xl text-rose-600"
      >
        {opening ? "Unwrapping something special..." : ""}
      </motion.p>
    </motion.section>
  );
}
