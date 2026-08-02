import { roles } from "@/data";

export default function Experience() {
  return (
    <section id="path" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        04 / Trajectory
      </div>
      <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
        Where the work happened
      </h2>

      <div className="relative flex flex-col gap-2 pl-[34px]">
        <div
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px bg-[linear-gradient(180deg,#4c6fff,rgba(76,111,255,0.08))]"
        />
        {roles.map((role) => (
          <div
            key={`${role.company}-${role.period}`}
            className="card-lift relative grid grid-cols-1 gap-4 rounded-[20px] border border-transparent px-7 py-[26px] xl:grid-cols-[230px_minmax(0,1fr)_250px] xl:gap-8"
          >
            <div
              aria-hidden
              className="absolute -left-[34px] top-[34px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgba(76,111,255,0.14)]"
            />
            <div>
              <div className="font-mono text-[12.5px] tracking-[0.03em] text-txt [font-variant-numeric:tabular-nums]">
                {role.period}
              </div>
              <div className="mt-2 text-[12.5px] font-medium text-dim-2">
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
              <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.62] text-dim">
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
