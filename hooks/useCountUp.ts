"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up when its element scrolls into view.
 *
 * `raw` is the parseable form ("6000+"), `display` the formatted one
 * ("6,000+"). `display` is what renders on the server, so the markup is
 * correct without JavaScript; the hook only takes over once mounted.
 */
export function useCountUp(raw: string, display: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(display);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!target) return;
    const suffix = raw.replace(/[0-9.,]/g, "");

    // No reset here — the first animation frame writes "0<suffix>" anyway, and
    // setting state in the effect body would cascade an extra render.
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 1100);
            const eased = 1 - Math.pow(1 - t, 3);
            setText(
              Math.round(target * eased).toLocaleString("en-US") + suffix
            );
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [raw]);

  return { ref, text };
}
