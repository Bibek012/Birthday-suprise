"use client";

import { motion } from "framer-motion";
import { TIMELINE, ROMANTIC_MESSAGES } from "@/lib/content";

export default function Timeline() {
  return (
    <div className="bg-gradient-to-b from-white to-blush-50 px-6 py-20">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-center font-body text-xs uppercase tracking-[0.35em] text-rose-500"
      >
        a story, in a few parts
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center font-display text-3xl font-semibold text-plum-900"
      >
        The Timeline
      </motion.h3>

      <div className="relative mx-auto max-w-sm">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-300 via-rose-200 to-transparent" />
        <ul className="space-y-10">
          {TIMELINE.map((entry, i) => (
            <motion.li
              key={entry.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pl-8"
            >
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-rose-500 bg-white" />
              <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.25em] text-rose-500">
                {entry.date}
              </span>
              <h4 className="font-display text-lg font-semibold text-plum-900">
                {entry.title}
              </h4>
              <p className="mt-1 font-body text-sm leading-relaxed text-plum-800/70">
                {entry.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 max-w-sm space-y-5">
        {ROMANTIC_MESSAGES.map((message, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-rose-100 bg-white/70 px-5 py-4 text-center font-script text-2xl leading-snug text-rose-700 shadow-sm shadow-rose-100"
          >
            &ldquo;{message}&rdquo;
          </motion.p>
        ))}
      </div>
    </div>
  );
}
