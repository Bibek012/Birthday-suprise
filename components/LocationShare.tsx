"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Loader2, ShieldOff, Send } from "lucide-react";
import type { LocationStatus } from "@/types";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export default function LocationShare() {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setErrorMessage("Your browser doesn't support location sharing.");
      return;
    }

    setStatus("requesting");
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setStatus("composing");
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

  async function handleSend() {
    if (!coords || !message.trim()) return;

    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New message for Bibek",
          message,
          latitude: coords.lat,
          longitude: coords.lon,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Request failed");

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't send your message right now. Please try again later.");
    }
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
        One thing
      </h4>
      <p className="mt-2 font-body text-sm leading-relaxed text-plum-800/70">
        Want to leave a little note? He is waiting for your message.
      </p>

      {status === "idle" && (
        <button
          onClick={requestLocation}
          className="mt-5 rounded-full bg-rose-600 px-6 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-rose-300/50 transition active:scale-95"
        >
          Send message to Bibek 💌
        </button>
      )}

      {status === "requesting" && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm text-plum-800/60">
          <Loader2 size={16} className="animate-spin" />
          Waiting for permission...
        </div>
      )}

      {status === "composing" && (
        <div className="mt-5 flex flex-col items-stretch gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message for Bibek..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-rose-200 bg-white px-4 py-3 font-body text-sm text-plum-900 placeholder:text-plum-800/40 focus:border-rose-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-rose-300/50 transition active:scale-95 disabled:opacity-40 disabled:active:scale-100"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      )}

      {status === "sending" && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm text-plum-800/60">
          <Loader2 size={16} className="animate-spin" />
          Sending securely...
        </div>
      )}

      {status === "success" && (
        <div className="mt-5 flex items-center justify-center gap-2 font-body text-sm font-medium text-rose-600">
          <CheckCircle2 size={17} />
          Message sent! Thank you.
        </div>
      )}

      {status === "denied" && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2 font-body text-sm text-plum-800/50">
            <ShieldOff size={16} />
            Try again! Something went wrong
          </div>
          <button
            onClick={requestLocation}
            className="rounded-full border border-rose-300 px-5 py-2 font-body text-xs font-semibold text-rose-600 transition active:scale-95"
          >
            Allow & try again
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="mt-5">
          <p className="font-body text-sm text-plum-800/60">
            {errorMessage ?? "Something went wrong."}
          </p>
          <button
            onClick={coords ? handleSend : requestLocation}
            className="mt-3 rounded-full border border-rose-300 px-5 py-2 font-body text-xs font-semibold text-rose-600 transition active:scale-95"
          >
            Try again
          </button>
        </div>
      )}

      <p className="mt-4 font-body text-[11px] leading-relaxed text-plum-800/40">
        This message is End-to-end Encrypted so don't worry.
      </p>
    </motion.div>
  );
}
