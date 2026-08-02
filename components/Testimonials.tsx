"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Below 720px the track is a scroll container rather than a marquee, so the
  // dots follow real scroll position. At and above 720px the track is animated
  // and never scrolls, and the dots are hidden — so the listener idles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 16; // card width + gap-4
      if (!step) return;
      const index = Math.round(track.scrollLeft / step);
      setActive(Math.min(Math.max(index, 0), testimonials.length - 1));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="words"
      className="reveal overflow-hidden pt-[88px] md:pt-[130px]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          05 / References
        </div>
        <h2 className="mb-8 mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mb-[52px] md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
          People I&rsquo;ve built for
        </h2>
      </div>

      {/* Doubled so the marquee loops seamlessly from 720px up. The second half
          is hidden from assistive tech, and below 720px it is not rendered at
          all — you swipe four cards, not eight. */}
      {/* w-max and overflow-x-auto must not land on the same element: a
          max-content box cannot overflow itself, so the track would spill
          rather than scroll. Below 720px the track is auto-width and scrolls;
          from 720px it is content-width and the parent clips the drift. */}
      <div className="marquee marquee-mask-md relative md:overflow-hidden">
        <div
          ref={trackRef}
          className="marquee-track-slow no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 md:w-max md:snap-none md:gap-5 md:overflow-x-visible md:px-2.5"
        >
          {[...testimonials, ...testimonials].map((q, i) => {
            const isDuplicate = i >= testimonials.length;
            return (
              <figure
                key={`${q.name}-${i}`}
                aria-hidden={isDuplicate}
                className={`w-[85vw] max-w-[340px] shrink-0 snap-start flex-col justify-between gap-6 rounded-[24px] border border-line bg-panel px-6 pb-6 pt-7 md:w-[min(420px,82vw)] md:max-w-none md:px-[30px] md:pb-7 md:pt-[30px] lg:w-[420px] ${
                  isDuplicate ? "hidden md:flex" : "flex"
                }`}
              >
                <blockquote className="text-[15px] leading-[1.62] text-txt md:text-base">
                  {q.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-[14px] border border-line-2 bg-[linear-gradient(140deg,rgba(76,111,255,0.3),rgba(36,216,196,0.22))] font-display text-[13px] font-semibold text-txt">
                    {q.initials}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-semibold text-txt">
                      {q.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-dim-2">
                      {q.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Position readout for the swipe, not a control — the cards themselves
          are the affordance. */}
      <div aria-hidden className="mt-5 flex justify-center gap-2 md:hidden">
        {testimonials.map((q, i) => (
          <span
            key={q.name}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-accent" : "w-1.5 bg-line-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
