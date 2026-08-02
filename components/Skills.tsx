import { skills } from "@/data";

const SPAN: Record<2 | 3 | 4, string> = {
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
};

export default function Skills() {
  return (
    <section id="stack" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        03 / Capabilities
      </div>
      <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
        What I work with
      </h2>

      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-6">
        {skills.map((group) => (
          <div
            key={group.num}
            className={`card-lift rounded-[24px] border border-line bg-panel px-[26px] pb-[30px] pt-7 ${SPAN[group.span]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-display text-lg font-semibold tracking-[-0.015em] text-txt">
                {group.title}
              </div>
              <div className="font-mono text-[11.5px] text-dim-2">
                {group.num}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-[10px] border border-line bg-[rgba(233,240,250,0.05)] px-[13px] py-[7px] text-[13.5px] font-medium text-txt"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
