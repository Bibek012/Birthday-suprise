"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { GALLERY } from "@/lib/content";

const SWIPE_THRESHOLD = 60;

export default function PhotoGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function go(newIndex: number, dir: number) {
    if (newIndex < 0 || newIndex >= GALLERY.length) return;
    setDirection(dir);
    setIndex(newIndex);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1, 1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1, -1);
  }

  const photo = GALLERY[index];

  return (
    <div className="px-6 py-16">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-center font-body text-xs uppercase tracking-[0.35em] text-rose-500"
      >
        moments worth keeping
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center font-display text-3xl font-semibold text-plum-900"
      >
        A Little Gallery
      </motion.h3>

      <div className="relative mx-auto h-[420px] max-w-sm overflow-hidden rounded-3xl bg-blush-200 shadow-xl shadow-rose-200/60">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            className="absolute inset-0 flex cursor-grab flex-col justify-end active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ x: direction >= 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(74,25,66,0) 40%, rgba(74,25,66,0.75) 100%), url(${photo.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-5">
              <p className="font-body text-sm text-white/95 drop-shadow">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* edge tap zones for non-swipe navigation */}
        <button
          aria-label="Previous photo"
          onClick={() => go(index - 1, -1)}
          className="absolute left-0 top-0 h-full w-1/4"
        />
        <button
          aria-label="Next photo"
          onClick={() => go(index + 1, 1)}
          className="absolute right-0 top-0 h-full w-1/4"
        />
      </div>

      <div className="mt-5 flex justify-center gap-1.5">
        {GALLERY.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => go(i, i > index ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-rose-600" : "w-1.5 bg-rose-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center font-body text-xs text-plum-800/40">
        swipe, or tap the edges
      </p>
    </div>
  );
}
