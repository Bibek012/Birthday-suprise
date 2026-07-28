"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heartFountain } from "@/lib/confetti";

export default function Cake() {
  const [blown, setBlown] = useState(false);

  function handleBlow() {
    if (blown) return;
    setBlown(true);
    heartFountain();
  }

  return (
    <div className="flex flex-col items-center px-6 py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 font-body text-sm text-plum-800/70"
      >
        {blown ? "Wish granted. 🤍" : "Tap the flame — make a wish."}
      </motion.p>

      <button
        onClick={handleBlow}
        aria-label="Blow out the candle"
        className="relative flex flex-col items-center focus:outline-none"
      >
        {/* flame */}
        <div className="relative mb-1 h-8 w-4">
          <AnimatePresence>
            {!blown && (
              <motion.div
                exit={{ opacity: 0, scale: 0, y: -10 }}
                className="absolute inset-0 origin-bottom animate-flicker rounded-full bg-gradient-to-t from-gold-500 via-gold-400 to-yellow-200"
              />
            )}
          </AnimatePresence>
          {blown && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0], y: [-2, -14] }}
              transition={{ duration: 1.2 }}
              className="absolute inset-x-0 top-0 mx-auto h-3 w-2 rounded-full bg-plum-800/20 blur-[2px]"
            />
          )}
        </div>

        {/* candle */}
        <div className="h-10 w-2.5 rounded-sm bg-rose-300" />

        {/* cake tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative -mt-1"
        >
          <div className="h-9 w-32 rounded-t-md bg-blush-200 shadow-inner" />
          <div className="h-4 w-36 -translate-x-2 bg-rose-500" />
          <div className="h-10 w-44 -translate-x-4 rounded-b-lg bg-blush-100 shadow-inner" />
          <div className="h-4 w-48 -translate-x-6 rounded-b-md bg-rose-600" />
        </motion.div>
      </button>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8 max-w-xs text-center font-body text-sm text-plum-800/60"
      >
        Whatever you wished for — I hope it finds you exactly on time.
      </motion.p>
    </div>
  );
}
