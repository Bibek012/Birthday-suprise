"use client";

import { motion } from "framer-motion";
import { RECIPIENT_NAME, HERO_MESSAGE } from "@/lib/content";

const LINE_ONE = "Happy";
const LINE_TWO = "Birthday";

function AnimatedWord({ word, delayBase }: { word: string; delayBase: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0, rotate: 6 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{
            delay: delayBase + i * 0.045,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HappyBirthdayTitle() {
  return (
    <div className="relative flex flex-col items-center px-6 py-24 text-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-rose-500"
      >
        today is all about you
      </motion.span>

      <h2 className="font-display text-5xl font-extrabold leading-[1.05] text-plum-900 xs:text-6xl">
        <AnimatedWord word={LINE_ONE} delayBase={0.1} />
        <br />
        <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-gold-500 bg-clip-text text-transparent">
          <AnimatedWord word={LINE_TWO} delayBase={0.4} />
        </span>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-3 font-script text-4xl text-rose-600"
      >
        {RECIPIENT_NAME}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="mx-auto mt-6 max-w-sm font-body text-[15px] leading-relaxed text-plum-800/75"
      >
        {HERO_MESSAGE}
      </motion.p>
    </div>
  );
}
