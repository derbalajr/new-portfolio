import { ticker } from "@/data";

export default function Ticker() {
  return (
    <div className="marquee marquee-mask relative overflow-hidden border-y border-line bg-bg-2 py-4 md:py-5">
      {/* Doubled so the drift keyframe's -50% translation loops seamlessly.
          The second half is decorative, so it's hidden from assistive tech. */}
      <div className="marquee-track flex w-max items-center gap-8 font-mono text-[13px] tracking-[0.04em] text-dim-2 md:gap-14 md:text-sm">
        {[...ticker, ...ticker].map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= ticker.length}
            className="inline-flex items-center gap-8 whitespace-nowrap md:gap-14"
          >
            {item}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
