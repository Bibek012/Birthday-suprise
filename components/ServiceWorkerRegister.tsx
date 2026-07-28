"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          // Fail silently — PWA install is a progressive enhancement, not critical path.
        });
      });
    }
  }, []);

  return null;
}
