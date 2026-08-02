import Image from "next/image";
import { projects } from "@/data";
import ExpandableText from "./ExpandableText";

// Tailwind can't build class names from variables, so span and ratio go
// through lookup maps.
const SPAN: Record<1 | 2, string> = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
};

// Every card in a two-up row shares one media band, so the headings below it
// land on the same line. Only the full-width lead card differs.
//
// 21/9 across a 353px phone column is a 151px sliver — a dashboard screenshot
// at that height is an unreadable smear. Mobile takes 4/3 and the flatter
// desktop ratios return at md and xl, where the column is wide enough for them.
const RATIO: Record<string, string> = {
  "21/9": "aspect-[4/3] md:aspect-[16/10] xl:aspect-[21/9]",
  "16/10": "aspect-[4/3] md:aspect-[16/10]",
};

// A plate is real content, not a cropped photo, so it only takes the fixed
// ratio at xl — where cards sit two-up and have a neighbour to line up with.
// Below that the grid is one column and the plate sizes to its own text.
const RATIO_XL: Record<string, string> = {
  "21/9": "xl:aspect-[21/9]",
  "16/10": "xl:aspect-[16/10]",
};

export default function Projects() {
  return (
    <section id="work" className="reveal pt-[88px] md:pt-[130px]">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
            02 / Selected work
          </div>
          <h2 className="mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
            Systems in production
          </h2>
        </div>
        <p className="max-w-[400px] text-[15px] leading-[1.62] text-dim md:text-base">
          Seven platforms across enterprise, government, travel and commerce.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-[22px] xl:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.num}
            // relative is what lets the external link — which lives in the
            // card body below — re-anchor to this card's top-right corner at
            // md. The article and the media band share a top edge, so it
            // lands exactly where it used to sit.
            className={`card-lift relative flex flex-col overflow-hidden rounded-[26px] border border-line bg-panel ${SPAN[p.span]}`}
          >
            {/* The plate is always in the DOM. Where a screenshot exists it
                covers the plate once decoded; where none does, the plate is
                what ships. */}
            <div
              className={`relative overflow-hidden bg-[linear-gradient(140deg,#101825,#0a1020)] ${
                p.plate ? RATIO_XL[p.ratio] : RATIO[p.ratio]
              }`}
            >
              <div
                aria-hidden
                className="shot absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(233,240,250,0.05)_0_1px,transparent_1px_11px)]"
              />
              {p.plate ? (
                // No screenshot exists, so the plate is the finished surface:
                // an index of the two systems, and a line saying why there's
                // no picture. Discretion is the point, not a missing asset.
                <div className="relative flex h-full flex-col px-8 pb-7 pt-[70px]">
                  <div className="flex flex-1 flex-col justify-center gap-5">
                    {p.plate.entries.map((entry, i) => (
                      <div
                        key={entry.name}
                        className={i > 0 ? "border-t border-line pt-5" : ""}
                      >
                        <div className="font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.025em] text-txt">
                          {entry.name}
                        </div>
                        <div className="mt-2 font-mono text-[12.5px] tracking-[0.04em] text-dim-2">
                          {entry.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* mt-8 keeps the note off the last entry where the plate
                      sizes to its content; at xl the flex-1 above pushes it to
                      the bottom edge instead. */}
                  <div className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim-2">
                    {p.plate.note}
                  </div>
                </div>
              ) : (
                // Seen only while the screenshot decodes.
                <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8 py-7">
                  <div className="font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.1] tracking-[-0.03em] text-[rgba(233,240,250,0.9)]">
                    {p.plateTitle}
                  </div>
                  <div className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim-2">
                    {p.shot}
                  </div>
                </div>
              )}

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

            </div>

            {/* flex-1 so the body fills the row-stretched card; without it the
                footer's mt-auto has no slack to absorb. */}
            <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-5 md:gap-[18px] md:px-7 md:pb-[30px] md:pt-7">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:gap-y-4">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-txt md:text-[23px]">
                    {p.name}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.04em] text-dim-2 md:text-[11.5px]">
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

              <ExpandableText id={`project-desc-${p.num}`}>
                {p.description}
              </ExpandableText>

              <div className="flex flex-wrap gap-2">
                {p.impact.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(76,111,255,0.28)] bg-[rgba(76,111,255,0.12)] px-[10px] py-[6px] text-[11.5px] font-semibold text-accent-soft md:px-[13px] md:py-[7px] md:text-[12.5px]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Pinned to the card's baseline so the rule lands on the same
                  line in every card, however long the copy above runs. */}
              <div className="chip-row mt-auto flex flex-wrap gap-[7px] border-t border-line pt-4">
                {/* Size goes up on mobile, not down — 11.5px mono is below
                    the readable floor on a phone. */}
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-line px-[11px] py-[5px] font-mono text-[12px] text-dim md:text-[11.5px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* In flow as a 48px row on mobile, where a 33px pill floating
                  over the screenshot was both hard to hit and in the way. At
                  md it leaves flow and returns to the card's top-right. */}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line-2 bg-[rgba(233,240,250,0.03)] px-4 font-mono text-[12.5px] text-txt transition md:absolute md:right-4 md:top-4 md:min-h-0 md:rounded-full md:border-line-2 md:bg-bg/[0.72] md:px-[15px] md:py-[9px] md:text-[11.5px] md:backdrop-blur-[8px] md:hover:border-accent md:hover:bg-accent md:hover:text-white"
                >
                  {p.linkLabel} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
