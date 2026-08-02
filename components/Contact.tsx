import { contact } from "@/data";

export default function Contact() {
  return (
    <section id="contact" className="reveal pt-[88px] md:pt-[130px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[24px] border border-line-2 bg-[linear-gradient(150deg,#0b1223_0%,#05070c_58%)] md:rounded-[34px]">
          {/* Both glows scale down on mobile — a 620px blurred circle is pure
              GPU cost on a phone. */}
          <div
            aria-hidden
            className="absolute -right-[80px] -top-[120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.34)_0%,transparent_62%)] blur-[14px] md:-right-[120px] md:-top-[180px] md:h-[620px] md:w-[620px] md:blur-[20px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-[140px] -left-12 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(36,216,196,0.16)_0%,transparent_64%)] blur-[16px] md:-bottom-[220px] md:-left-20 md:h-[520px] md:w-[520px] md:blur-[24px]"
          />

          <div className="relative grid grid-cols-1 gap-8 px-5 pb-9 pt-8 md:gap-9 md:px-11 md:pb-16 md:pt-[60px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-14 xl:px-[60px] xl:pb-20 xl:pt-[76px]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
                {contact.kicker}
              </div>
              <h2 className="mt-4 font-display text-[clamp(30px,8vw,38px)] font-bold leading-[1.04] tracking-[-0.035em] text-txt md:mt-[22px] md:text-[clamp(38px,5vw,68px)] md:leading-none md:tracking-[-0.045em]">
                {contact.heading.map((line) => (
                  <span key={line} className="block">
                    {line}{" "}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.65] text-dim md:mt-6 md:text-[17.5px] md:leading-[1.6]">
                {contact.blurb}
              </p>

              {/* Full-width with a truncating address on mobile. As an
                  inline-flex at 17px this was one long address away from
                  overflowing a body that now clips horizontally. */}
              <a
                href={`mailto:${contact.email}`}
                className="mt-7 flex w-full items-center justify-between gap-3 rounded-2xl bg-accent px-5 py-4 font-display text-[15px] font-semibold tracking-[-0.02em] text-white shadow-[0_14px_44px_rgba(76,111,255,0.4)] transition hover:bg-accent-soft hover:shadow-[0_18px_56px_rgba(76,111,255,0.58)] md:mt-9 md:inline-flex md:w-auto md:justify-start md:gap-3.5 md:px-[30px] md:py-[17px] md:text-[clamp(17px,1.8vw,22px)]"
              >
                <span className="truncate">{contact.email}</span>
                <span aria-hidden className="flex-none">
                  →
                </span>
              </a>

              <div className="mt-6 grid grid-cols-2 gap-2.5 text-sm font-medium md:mt-[30px] md:flex md:flex-wrap">
                {contact.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center rounded-xl border border-line-2 bg-[rgba(233,240,250,0.03)] px-4 text-txt transition hover:bg-[rgba(233,240,250,0.1)] md:min-h-0 md:px-[18px] md:py-[11px]"
                  >
                    {s.name} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="self-start rounded-[20px] border border-line-2 bg-bg/50 px-5 py-6 backdrop-blur-[10px] md:rounded-[24px] md:px-7 md:py-[30px]">
              <div className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-teal">
                {contact.upwork.kicker}
              </div>
              <div className="mt-4 font-display text-[42px] font-bold leading-none tracking-[-0.04em] text-txt [font-variant-numeric:tabular-nums] md:mt-[18px] md:text-[54px]">
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
