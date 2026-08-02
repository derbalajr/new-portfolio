"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data";

/**
 * Primary action pinned inside the thumb zone. Visible once the hero has
 * scrolled away, hidden again over Contact — leaving it there would cover the
 * very section it points at. Hidden from `lg` up, where the header CTA takes
 * over.
 */
export default function MobileCta() {
  const [heroOut, setHeroOut] = useState(false);
  const [contactIn, setContactIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contactEl = document.getElementById("contact");
    if (!hero || !contactEl) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroOut(!entry.isIntersecting);
        else setContactIn(entry.isIntersecting);
      }
    });

    observer.observe(hero);
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  const shown = heroOut && !contactIn;

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/[0.82] pb-[calc(0.75rem_+_env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-3 backdrop-blur-[18px] transition-[opacity,transform] duration-300 lg:hidden ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={`mailto:${contact.email}`}
        tabIndex={shown ? undefined : -1}
        className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-[14px] bg-accent px-5 text-[15px] font-semibold text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)]"
      >
        Let&rsquo;s talk <span aria-hidden>→</span>
      </a>
    </div>
  );
}
