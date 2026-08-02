import Image from "next/image";
import { projects } from "@/data";

// Tailwind can't build class names from variables, so span and ratio go
// through lookup maps.
const SPAN: Record<1 | 2, string> = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
};

const RATIO: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/10": "aspect-[16/10]",
  "24/5": "aspect-[24/5]",
};

export default function Projects() {
  return (
    <section id="work" className="reveal pt-[88px] md:pt-[130px]">
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
            02 / Selected work
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
            Systems in production
          </h2>
        </div>
        <p className="max-w-[400px] text-base leading-[1.62] text-dim">
          Seven platforms across enterprise, government, travel and commerce.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-[22px] xl:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.num}
            className={`card-lift flex flex-col overflow-hidden rounded-[26px] border border-line bg-panel ${SPAN[p.span]}`}
          >
            {/* The plate is always in the DOM. Where a screenshot exists it
                covers the plate once decoded; where none does, the plate is
                what ships. */}
            <div
              className={`relative overflow-hidden bg-[linear-gradient(140deg,#101825,#0a1020)] ${RATIO[p.ratio]}`}
            >
              <div
                aria-hidden
                className="shot absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(233,240,250,0.05)_0_1px,transparent_1px_11px)]"
              />
              {/* On plate-only cards the title is visible, so it has to clear
                  the number badge — in the artifact the two collide. Cards with
                  a screenshot hide the plate entirely, so they keep the
                  original padding. */}
              <div
                className={`absolute inset-0 flex flex-col justify-center gap-3 py-7 pr-8 ${
                  p.image ? "pl-8" : "pl-[76px]"
                }`}
              >
                <div className="font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.1] tracking-[-0.03em] text-[rgba(233,240,250,0.9)]">
                  {p.plateTitle}
                </div>
                <div className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim-2">
                  {p.shot}
                </div>
              </div>

              {p.image && (
                <>
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.subject}`}
                    fill
                    sizes={
                      p.span === 2
                        ? "(max-width: 1180px) 100vw, 1320px"
                        : "(max-width: 1180px) 100vw, 650px"
                    }
                    style={{ objectFit: "cover", objectPosition: p.fit }}
                    className="shot"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.28)_0%,transparent_40%,rgba(5,7,12,0.72)_100%)]"
                  />
                </>
              )}

              <div className="absolute left-[18px] top-[18px] rounded-full border border-line-2 bg-bg/[0.66] px-[13px] py-[7px] font-mono text-[11.5px] tracking-[0.06em] text-dim backdrop-blur-[8px]">
                {p.num}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-line-2 bg-bg/[0.72] px-[15px] py-[9px] font-mono text-[11.5px] text-txt backdrop-blur-[8px] transition hover:border-accent hover:bg-accent hover:text-white"
                >
                  {p.linkLabel} <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            <div className="flex flex-col gap-[18px] px-7 pb-[30px] pt-7">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-display text-[23px] font-semibold tracking-[-0.025em] text-txt">
                    {p.name}
                  </h3>
                  <span className="font-mono text-[11.5px] tracking-[0.04em] text-dim-2">
                    {p.period}
                  </span>
                </div>
                <div className="mt-2 text-[15px] text-accent-soft">
                  {p.subject}
                </div>
                <div className="mt-1 text-[13.5px] font-medium text-dim-2">
                  {p.role}
                </div>
              </div>

              <p className="text-[15.5px] leading-[1.62] text-dim">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.impact.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(76,111,255,0.28)] bg-[rgba(76,111,255,0.12)] px-[13px] py-[7px] text-[12.5px] font-semibold text-accent-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="chip-row flex flex-wrap gap-[7px] border-t border-line pt-4">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-line px-[11px] py-[5px] font-mono text-[11.5px] text-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
