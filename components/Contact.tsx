import { contact } from "@/data";

export default function Contact() {
  return (
    <section id="contact" className="reveal pt-[88px] md:pt-[130px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[34px] border border-line-2 bg-[linear-gradient(150deg,#0b1223_0%,#05070c_58%)]">
          <div
            aria-hidden
            className="absolute -right-[120px] -top-[180px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.34)_0%,transparent_62%)] blur-[20px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-[220px] -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(36,216,196,0.16)_0%,transparent_64%)] blur-[24px]"
          />

          <div className="relative grid grid-cols-1 gap-9 px-6 pb-12 pt-11 md:px-11 md:pb-16 md:pt-[60px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-14 xl:px-[60px] xl:pb-20 xl:pt-[76px]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
                {contact.kicker}
              </div>
              <h2 className="mt-[22px] font-display text-[clamp(38px,5vw,68px)] font-bold leading-none tracking-[-0.045em] text-txt">
                {contact.heading.map((line) => (
                  <span key={line} className="block">
                    {line}{" "}
                  </span>
                ))}
              </h2>
              <p className="mt-6 max-w-[520px] text-[17.5px] leading-[1.6] text-dim">
                {contact.blurb}
              </p>

              <a
                href={`mailto:${contact.email}`}
                className="mt-9 inline-flex items-center gap-3.5 rounded-2xl bg-accent px-[30px] py-[17px] font-display text-[clamp(17px,1.8vw,22px)] font-semibold tracking-[-0.02em] text-white shadow-[0_14px_44px_rgba(76,111,255,0.4)] transition hover:bg-accent-soft hover:shadow-[0_18px_56px_rgba(76,111,255,0.58)]"
              >
                {contact.email} <span aria-hidden>→</span>
              </a>

              <div className="mt-[30px] flex flex-wrap gap-2.5 text-sm font-medium">
                {contact.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-line-2 bg-[rgba(233,240,250,0.03)] px-[18px] py-[11px] text-txt transition hover:bg-[rgba(233,240,250,0.1)]"
                  >
                    {s.name} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="self-start rounded-[24px] border border-line-2 bg-bg/50 px-7 py-[30px] backdrop-blur-[10px]">
              <div className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-teal">
                {contact.upwork.kicker}
              </div>
              <div className="mt-[18px] font-display text-[54px] font-bold leading-none tracking-[-0.04em] text-txt [font-variant-numeric:tabular-nums]">
                {contact.upwork.score}
              </div>
              <div className="mt-2.5 text-[13.5px] text-dim">
                {contact.upwork.scoreLabel}
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-[22px] text-sm text-dim">
                {contact.upwork.facts.map((fact) => (
                  <div key={fact}>{fact}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
