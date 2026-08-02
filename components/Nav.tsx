"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, contact } from "@/data";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/[0.66] backdrop-blur-[18px]">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(140deg,#4c6fff,#2b3fd6)] font-display text-sm font-bold tracking-[-0.02em] text-white shadow-[0_6px_22px_rgba(76,111,255,0.34)]">
            OD
          </span>
          <span className="font-display text-[15.5px] font-semibold tracking-[-0.01em]">
            Omar Derbala
          </span>
        </a>

        <nav className="hidden items-center gap-1.5 text-sm font-medium lg:flex">
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="rounded-[10px] px-3.5 py-2.5 text-dim transition-colors hover:bg-[rgba(233,240,250,0.06)] hover:text-txt"
            >
              {item.name}
            </a>
          ))}
          <a
            href={`mailto:${contact.email}`}
            className="ml-2.5 rounded-xl bg-accent px-5 py-[11px] font-semibold text-white shadow-[0_8px_26px_rgba(76,111,255,0.3)] transition hover:bg-accent-soft hover:shadow-[0_10px_34px_rgba(76,111,255,0.45)]"
          >
            Let&rsquo;s talk
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-2 text-txt lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="block rounded-[10px] px-3 py-3 text-[15px] font-medium text-dim hover:bg-[rgba(233,240,250,0.06)] hover:text-txt"
            >
              {item.name}
            </a>
          ))}
          <a
            href={`mailto:${contact.email}`}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl bg-accent px-5 py-3.5 text-center text-[15px] font-semibold text-white"
          >
            Let&rsquo;s talk
          </a>
        </nav>
      )}
    </header>
  );
}
