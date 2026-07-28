"use client";

import { RotateCcw } from "lucide-react";

interface ReplayButtonProps {
  onReplay: () => void;
}

export default function ReplayButton({ onReplay }: ReplayButtonProps) {
  return (
    <button
      onClick={onReplay}
      className="inline-flex items-center gap-2 rounded-full bg-plum-900 px-5 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition active:scale-95"
    >
      <RotateCcw size={16} />
      Replay the surprise
    </button>
  );
}
