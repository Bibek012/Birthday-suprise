"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import GiftBox from "@/components/GiftBox";
import HappyBirthdayTitle from "@/components/HappyBirthdayTitle";
import Cake from "@/components/Cake";
import PhotoGallery from "@/components/PhotoGallery";
import Timeline from "@/components/Timeline";
import LocationShare from "@/components/LocationShare";
import MusicPlayer from "@/components/MusicPlayer";
import ShareButton from "@/components/ShareButton";
import ReplayButton from "@/components/ReplayButton";
import FloatingHearts from "@/components/FloatingHearts";

type Stage = "welcome" | "gift" | "revealed";

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");
  const topRef = useRef<HTMLDivElement>(null);

  const handleReplay = useCallback(() => {
    setStage("welcome");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main ref={topRef} className="relative">
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <WelcomeScreen key="welcome" onEnter={() => setStage("gift")} />
        )}
        {stage === "gift" && (
          <GiftBox key="gift" onOpened={() => setStage("revealed")} />
        )}
      </AnimatePresence>

      {stage === "revealed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="relative overflow-hidden">
            <FloatingHearts count={6} className="opacity-60" />
            <HappyBirthdayTitle />
          </section>

          <Cake />
          <PhotoGallery />
          <Timeline />

          <section className="px-6 py-16">
            <LocationShare />
          </section>

          <footer className="flex flex-col items-center gap-4 border-t border-rose-100 bg-blush-50 px-6 py-14">
            <p className="font-script text-3xl text-rose-600">Happy Birthday, again 💗</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ShareButton />
              <ReplayButton onReplay={handleReplay} />
            </div>
            <p className="mt-6 font-body text-[11px] text-plum-800/40">
              Made with care, just for you.
            </p>
          </footer>

          <MusicPlayer />
        </motion.div>
      )}
    </main>
  );
}
