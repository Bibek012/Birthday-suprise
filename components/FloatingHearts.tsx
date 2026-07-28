"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  riseDistance: number;
  swayDistance: number;
}

export default function FloatingHearts({ count = 14, className = "" }: FloatingHeartsProps) {
  // Start with no hearts on the server / first client render so SSR and
  // client markup match exactly. Random values are generated only after
  // mount, entirely on the client.
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.25 + Math.random() * 0.4,
        drift: Math.random() > 0.5 ? 1 : -1,
        riseDistance: 400 + Math.random() * 300,
        swayDistance: 20 + Math.random() * 40,
      }))
    );
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-0 text-rose-500"
          style={{ left: `${h.left}%`, opacity: h.opacity, fontSize: h.size }}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: [40, -h.riseDistance],
            x: [0, h.drift * h.swayDistance, 0],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [0, h.drift * 20, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}