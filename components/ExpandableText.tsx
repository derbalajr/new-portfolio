"use client";

import { useState } from "react";

/**
 * Clamps long copy on mobile behind a Read more toggle, and renders as a plain
 * paragraph from 720px up. The full text is always in the DOM, so it is
 * server-rendered and indexable regardless of the toggle state — the clamp is
 * presentational only.
 */
export default function ExpandableText({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p
        id={id}
        className={`text-[15.5px] leading-[1.62] text-dim md:line-clamp-none ${
          open ? "line-clamp-none" : "line-clamp-4"
        }`}
      >
        {children}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-accent-soft md:hidden"
      >
        {open ? "Show less" : "Read more"}
        <span
          aria-hidden
          className={`inline-block leading-none ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>
    </div>
  );
}
