"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, contact } from "@/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Scroll offset captured at open time, restored on close.
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock. position: fixed is the only technique iOS Safari
  // respects — overflow: hidden alone still rubber-bands the page behind the
  // sheet.
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      // "instant" is required: html carries scroll-behavior: smooth, so the
      // default would animate the restore and fight any pending hash jump.
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
    };
  }, [open]);

  // Escape to close, and a Tab cycle confined to the sheet.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the sheet on open, return it to the trigger on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) triggerRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  // The scroll lock's cleanup restores the page offset, so a plain anchor
  // would jump to the target and then be yanked back. Close first, let the
  // restore land, then scroll on the next frame.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    close();
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ block: "start" });
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/[0.66] pt-[env(safe-area-inset-top)] backdrop-blur-[18px]">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between gap-6 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:h-[72px] md:pl-10 md:pr-10">
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
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 text-txt lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={sheetRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex h-[100svh] flex-col bg-bg pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] lg:hidden"
        >
          <div className="flex h-[60px] flex-none items-center justify-end pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 text-txt"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
            {navItems.map((item, i) => (
              <a
                key={item.link}
                href={item.link}
                onClick={(e) => goTo(e, item.link)}
                className="flex min-h-[56px] items-center gap-4 rounded-xl px-3 active:bg-[rgba(233,240,250,0.06)]"
              >
                <span className="font-mono text-[12px] text-dim-2 [font-variant-numeric:tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-txt">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex-none border-t border-line pb-6 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-5">
            <a
              href={`mailto:${contact.email}`}
              onClick={close}
              className="flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-5 text-[15px] font-semibold text-white"
            >
              Let&rsquo;s talk
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              {contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-line-2 px-4 text-[13.5px] font-medium text-dim"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
