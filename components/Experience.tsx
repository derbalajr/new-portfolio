import { roles } from "@/data";

export default function Experience() {
  return (
    <section id="path" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        04 / Trajectory
      </div>
      <h2 className="mb-8 mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mb-[52px] md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
        Where the work happened
      </h2>

      {/* The rail indent plus the card's own padding consumed 90px of a 393px
          screen. On mobile the card padding goes and a rule separates roles
          instead, which buys the description back ~68px of measure. */}
      <div className="relative flex flex-col gap-2 pl-[22px] md:pl-[34px]">
        <div
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px bg-[linear-gradient(180deg,#4c6fff,rgba(76,111,255,0.08))]"
        />
        {roles.map((role) => (
          <div
            key={`${role.company}-${role.period}`}
            className="card-lift relative grid grid-cols-1 gap-3 rounded-[20px] border-t border-line px-0 py-5 md:gap-4 md:border md:border-transparent md:px-7 md:py-[26px] xl:grid-cols-[230px_minmax(0,1fr)_250px] xl:gap-8"
          >
            <div
              aria-hidden
              className="absolute -left-[22px] top-[26px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgba(76,111,255,0.14)] md:-left-[34px] md:top-[34px]"
            />
            {/* Period and type share a line on mobile; they stack again at xl
                where the timeline splits into columns. */}
            <div className="flex items-center gap-3 xl:block">
              <div className="font-mono text-[12.5px] tracking-[0.03em] text-txt [font-variant-numeric:tabular-nums]">
                {role.period}
              </div>
              <div className="text-[12.5px] font-medium text-dim-2 xl:mt-2">
                {role.type}
              </div>
            </div>
            <div>
              <div className="font-display text-[19px] font-semibold tracking-[-0.02em] text-txt">
                {role.title}
              </div>
              <div className="mt-1.5 text-[14.5px] font-medium text-accent-soft">
                {role.company}
              </div>
              <p className="mt-3 max-w-[620px] text-[15px] leading-[1.65] text-dim md:text-[15.5px] md:leading-[1.62]">
                {role.description}
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-[7px]">
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-line px-2.5 py-[5px] font-mono text-[11px] text-dim-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
