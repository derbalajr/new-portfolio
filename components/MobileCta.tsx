"use client";

import { useEffect, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
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
      {/* WhatsApp carries the filled treatment: on a phone it is the action
          most likely to actually complete, since mailto: opens nothing at all
          where no mail client is configured. */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={`mailto:${contact.email}`}
          tabIndex={shown ? undefined : -1}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border border-line-2 bg-[rgba(233,240,250,0.04)] px-4 text-[15px] font-semibold text-txt"
        >
          <Mail size={17} aria-hidden className="flex-none" />
          Email
        </a>
        <a
          href={contact.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? undefined : -1}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] bg-accent px-4 text-[15px] font-semibold text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)]"
        >
          <MessageCircle size={17} aria-hidden className="flex-none" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
