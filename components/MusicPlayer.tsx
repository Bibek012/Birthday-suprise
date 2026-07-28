"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { MUSIC_SRC } from "@/lib/content";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => setReady(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Pause background music" : "Play background music"}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-lg shadow-rose-200 backdrop-blur"
    >
      <span
        className={`absolute inset-0 rounded-full bg-rose-300/50 ${
          playing ? "animate-pulse-soft" : ""
        }`}
      />
      {playing ? (
        <Pause size={18} className="relative z-10" fill="currentColor" />
      ) : (
        <Music size={18} className="relative z-10" />
      )}
    </motion.button>
  );
}
