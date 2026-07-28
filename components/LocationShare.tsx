"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Loader2, ShieldOff } from "lucide-react";
import type { LocationStatus } from "@/types";

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=14`,
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.display_name ?? null;
  } catch {
    return null;
  }
}

export default function LocationShare() {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleShare() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setErrorMessage("Your browser doesn't support location sharing.");
      return;
    }

    setStatus("requesting");
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus("resolving");
        const { latitude, longitude } = position.coords;
        const address = await reverseGeocode(latitude, longitude);

        setStatus("sending");
        try {
          const res = await fetch("/api/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude, address }),
          });
          if (!res.ok) throw new Error("Request failed");
          setStatus("success");
        } catch {
          setStatus("error");
          setErrorMessage("Couldn't save your location right now. Please try again later.");
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
          setErrorMessage("Couldn't get your location. Please try again.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-sm rounded-3xl border border-rose-100 bg-white/80 p-6 text-center shadow-sm shadow-rose-100"
    >
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blush-200 text-rose-600">
        <MapPin size={20} />
      </div>

      <h4 className="font-display text-lg font-semibold text-plum-900">
        One optional thing
      </h4>
      <p className="mt-2 font-body text-sm leading-relaxed text-plum-800/70">
        Would you like to share your location? This helps personalize your
        birthday experience. It's entirely optional — the surprise works
        exactly the same either way.
      </p>

      {status === "idle" && (
        <button
          onClick={handleShare}
          className="mt-5 rounded-full bg-rose-600 px-6 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-rose-300/50 transition active:scale-95"
        >
          Share My Location
        </button>
      )}

      {(status === "requesting" || status === "resolving" || status === "sending") && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm text-plum-800/60">
          <Loader2 size={16} className="animate-spin" />
          {status === "requesting" && "Waiting for permission..."}
          {status === "resolving" && "Finding your city..."}
          {status === "sending" && "Sharing securely..."}
        </div>
      )}

      {status === "success" && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm font-medium text-rose-600">
          <CheckCircle2 size={17} />
          Thank you! Your location was shared.
        </div>
      )}

      {status === "denied" && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm text-plum-800/50">
          <ShieldOff size={16} />
          No worries — enjoy the surprise as is.
        </div>
      )}

      {status === "error" && (
        <div className="mt-5">
          <p className="font-body text-sm text-plum-800/60">
            {errorMessage ?? "Something went wrong."}
          </p>
          <button
            onClick={handleShare}
            className="mt-3 rounded-full border border-rose-300 px-5 py-2 font-body text-xs font-semibold text-rose-600 transition active:scale-95"
          >
            Try again
          </button>
        </div>
      )}

      <p className="mt-4 font-body text-[11px] leading-relaxed text-plum-800/40">
        Only your coordinates and approximate address are stored, with a
        timestamp — nothing else, and only if you say yes.
      </p>
    </motion.div>
  );
}
