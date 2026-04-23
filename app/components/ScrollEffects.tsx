"use client";

import { useEffect } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number | number[];
};

export default function ScrollEffects({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
}: Options) {
  useEffect(() => {
    if (typeof window === "undefined" || !document.body) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // Dynamic imports (e.g. client-only globes) mount after the first effect pass.
    // Re-scan on subtree changes so [data-scroll] nodes still get is-inview.
    const applyReducedMotion = () => {
      document
        .querySelectorAll<HTMLElement>("[data-scroll]")
        .forEach((el) => el.classList.add("is-inview"));
    };

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      applyReducedMotion();
      const mo = new MutationObserver(applyReducedMotion);
      mo.observe(document.body, { childList: true, subtree: true });
      // Next frame: catch nodes appended in the same commit as this effect
      const raf = requestAnimationFrame(applyReducedMotion);
      return () => {
        cancelAnimationFrame(raf);
        mo.disconnect();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-inview");
          if (el.dataset.scrollOnce !== "false") io.unobserve(el);
        }
      },
      { rootMargin, threshold },
    );

    const observeIfNeeded = (el: HTMLElement) => {
      if (!el.isConnected) return;
      if (el.classList.contains("is-inview")) return;
      io.observe(el);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-scroll]")
        .forEach(observeIfNeeded);
    };

    let raf = 0;
    const scheduleScan = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    };

    scan();
    const rafInitial = requestAnimationFrame(scan);

    const mo = new MutationObserver(() => {
      scheduleScan();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafInitial);
      if (raf) cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [rootMargin, threshold]);

  return null;
}
