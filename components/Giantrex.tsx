import Image from "next/image";
import type { Content, Project } from "@/data";

// The one section that speaks for a company rather than for me, so it takes
// Giantrex's own orange instead of the site's blue. Nothing else on the page
// uses it.
export default function Giantrex({
  giantrex,
  projects,
  ui,
}: {
  giantrex: Content["giantrex"];
  projects: Project[];
  ui: Content["ui"];
}) {
  const shipped = projects.filter((p) => p.venture === "Giantrex");

  return (
    <section id="giantrex" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        {giantrex.kicker}
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[26px] border border-line bg-panel md:mt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -start-[160px] -top-[200px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(229,78,32,0.16)_0%,transparent_64%)]"
        />

        <div className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="px-5 pb-8 pt-8 md:px-10 md:pb-11 md:pt-11">
            {/* The lockup is the heading; its alt text is the accessible name. */}
            <h2>
              <Image
                src={giantrex.logo.src}
                alt="Giantrex"
                width={giantrex.logo.width}
                height={giantrex.logo.height}
                sizes="(max-width: 719px) 240px, 340px"
                className="h-auto w-[240px] md:w-[340px]"
              />
            </h2>
            <div className="mt-5 font-mono text-[12.5px] tracking-[0.04em] text-grex-soft">
              {giantrex.role}
            </div>

            <p className="mt-6 font-display text-[clamp(24px,6vw,30px)] font-semibold leading-[1.12] tracking-[-0.03em] text-txt md:mt-8 md:text-[clamp(30px,3.2vw,44px)] md:leading-[1.06] md:tracking-[-0.035em]">
              {giantrex.tagline}
            </p>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.68] text-dim md:text-[17px]">
              {giantrex.body}
            </p>

            <a
              href={giantrex.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-grex px-[26px] py-[14px] text-[15px] font-semibold text-bg transition hover:bg-[#ff6a3d] md:w-auto"
            >
              {giantrex.visit} {giantrex.link.label} <span aria-hidden className="dir-flip">↗</span>
              <span className="sr-only"> {ui.newTab}</span>
            </a>
          </div>

          <div className="flex flex-col border-t border-line px-5 py-8 md:px-10 md:py-11 xl:border-s xl:border-t-0">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim">
              {giantrex.practicesHeading}
            </h3>
            <ul className="mt-5 flex flex-col">
              {giantrex.practices.map((practice, i) => (
                <li
                  key={practice.name}
                  className={i > 0 ? "mt-5 border-t border-line pt-5" : ""}
                >
                  <div className="font-display text-[19px] font-semibold tracking-[-0.02em] text-txt">
                    {practice.name}
                  </div>
                  <div className="mt-1.5 text-[14.5px] leading-[1.55] text-dim">
                    {practice.detail}
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim">
              {giantrex.shippedHeading}
            </h3>
            {/* Each row jumps to the project's card in Selected work. */}
            <ul className="mt-3 flex flex-col">
              {shipped.map((p) => (
                <li key={p.num} className="border-b border-line last:border-b-0">
                  <a
                    href={`#project-${p.num}`}
                    className="group flex min-h-[56px] items-center justify-between gap-4 py-3 transition-colors"
                  >
                    <span>
                      <span className="block font-display text-[16.5px] font-semibold tracking-[-0.015em] text-txt transition-colors group-hover:text-grex-soft">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] text-dim">
                        {p.subject}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-[13px] text-dim-2 transition-colors group-hover:text-grex-soft"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
