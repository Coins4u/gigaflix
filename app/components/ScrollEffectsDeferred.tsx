"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollEffects = dynamic(() => import("./ScrollEffects"), { ssr: false });

/**
 * Defers scroll-reveal work until the browser is idle to reduce mobile TBT; LCP/hero
 * stay unaffected because hero is a server stream without data-scroll in the first paint.
 */
export default function ScrollEffectsDeferred() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setOn(true);
    };
    if (typeof globalThis === "undefined") return;

    const w = globalThis as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2000 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }
    const t = globalThis.setTimeout(start, 300);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!on) return null;
  return <ScrollEffects />;
}
