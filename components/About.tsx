"use client";

import { about, stats, type Stat } from "@/data";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({ stat }: { stat: Stat }) {
  const { ref, text } = useCountUp(stat.value, stat.display);

  return (
    <div className="rounded-[18px] border border-line bg-panel px-5 py-[22px]">
      <div
        ref={ref}
        className="font-display text-[32px] font-bold leading-none tracking-[-0.03em] text-txt [font-variant-numeric:tabular-nums]"
      >
        {text}
      </div>
      <div className="mt-2.5 text-[12.5px] font-medium leading-[1.4] text-dim-2">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="reveal pt-[88px] md:pt-[130px]">
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
        <div className="static xl:sticky xl:top-[120px]">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
            {about.kicker}
          </div>
          <div
            aria-hidden
            className="rule-grow mt-[18px] h-px bg-[linear-gradient(90deg,#4c6fff,transparent)]"
          />
        </div>

        <div className="flex max-w-[780px] flex-col gap-[26px]">
          <p className="font-display text-[clamp(24px,2.5vw,34px)] font-medium leading-[1.28] tracking-[-0.025em] text-txt">
            {about.lead}
          </p>
          {about.body.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="text-[17.5px] leading-[1.68] text-dim"
            >
              {para}
            </p>
          ))}

          <div className="mt-3.5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
