import { testimonials } from "@/data";

export default function Testimonials() {
  return (
    <section
      id="words"
      className="reveal overflow-hidden pt-[88px] md:pt-[130px]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          05 / References
        </div>
        <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
          People I&rsquo;ve built for
        </h2>
      </div>

      {/* Doubled so the marquee loops seamlessly; the second half is hidden
          from assistive tech so each quote is announced once. */}
      <div className="marquee marquee-mask relative overflow-hidden">
        <div className="marquee-track-slow flex w-max gap-5 px-2.5">
          {[...testimonials, ...testimonials].map((q, i) => (
            <figure
              key={`${q.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-[min(420px,82vw)] flex-col justify-between gap-6 rounded-[24px] border border-line bg-panel px-[30px] pb-7 pt-[30px] lg:w-[420px]"
            >
              <blockquote className="text-base leading-[1.62] text-txt">
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
          ))}
        </div>
      </div>
    </section>
  );
}
