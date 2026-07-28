"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { RECIPIENT_NAME } from "@/lib/content";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "A Little Surprise For You",
      text: `A birthday surprise for ${RECIPIENT_NAME} 💗`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — no action needed
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white px-5 py-2.5 font-body text-sm font-semibold text-rose-600 shadow-sm transition active:scale-95"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? "Link copied" : "Share this surprise"}
    </button>
  );
}
