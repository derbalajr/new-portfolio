"use client";

import { about, stats, type Stat } from "@/data";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({ stat }: { stat: Stat }) {
  const { ref, text } = useCountUp(stat.value, stat.display);

  return (
    <div className="rounded-[18px] border border-line bg-panel px-4 py-5 md:px-5 md:py-[22px]">
      <div
        ref={ref}
        className="font-display text-[26px] font-bold leading-none tracking-[-0.03em] text-txt [font-variant-numeric:tabular-nums] md:text-[32px]"
      >
        {text}
      </div>
      <div className="mt-2 text-[12px] font-medium leading-[1.4] text-dim-2 md:mt-2.5 md:text-[12.5px]">
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
          <p className="font-display text-[clamp(21px,5.5vw,24px)] font-medium leading-[1.3] tracking-[-0.02em] text-txt md:text-[clamp(24px,2.5vw,34px)] md:leading-[1.28] md:tracking-[-0.025em]">
            {about.lead}
          </p>
          {about.body.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="text-[16.5px] leading-[1.7] text-dim md:text-[17.5px] md:leading-[1.68]"
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
