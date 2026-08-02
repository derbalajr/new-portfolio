import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { heroData } from "@/data";

export default function Hero() {
  // min-h uses svh, not vh: svh guarantees fit with the address bar showing,
  // and unlike dvh it does not change value mid-scroll.
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-[92px] md:pb-0 md:pt-[120px]"
    >
      <HeroCanvas />
      {/* A 900px blurred radial is pure GPU cost on a phone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[46%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.22)_0%,transparent_62%)] blur-[18px] md:h-[900px] md:w-[900px] md:blur-[30px]"
      />
      <div
        aria-hidden
        className="hero-grid-overlay pointer-events-none absolute inset-0"
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[72px]">
          {/* Below 900px the artifact shows the portrait above the text, so the
              two blocks swap order while the DOM keeps the headline first. */}
          <div className="order-2 lg:order-none">
            {/* On mobile the portrait rides in the badge as a 40px avatar;
                the full portrait card below is hidden until lg. The avatar is
                decorative here — the card carries the real alt text. */}
            <div className="inline-flex items-center gap-3 rounded-full border border-line-2 bg-[rgba(233,240,250,0.04)] py-2 pl-2 pr-4 text-[13px] font-medium tracking-[0.01em] text-dim md:gap-2.5 md:pl-3">
              <Image
                src={heroData.portrait.src}
                alt=""
                width={80}
                height={80}
                priority
                sizes="40px"
                className="h-10 w-10 flex-none rounded-full object-cover object-top lg:hidden"
              />
              <span
                aria-hidden
                className="hidden h-2 w-2 flex-none animate-pulse-dot rounded-full bg-teal shadow-[0_0_14px_#24d8c4] lg:inline-flex"
              />
              <span>{heroData.badge}</span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(34px,9vw,48px)] font-bold leading-[1.02] tracking-[-0.035em] text-txt md:mt-[30px] md:text-[clamp(48px,6.4vw,96px)] md:leading-[0.98] md:tracking-[-0.045em]">
              {/* The trailing space keeps the accessible name and any text
                  extraction readable — block spans alone concatenate into
                  "I build thesystems companies". It collapses visually. */}
              {heroData.headline.map((line) => (
                <span key={line} className="block">
                  {line}{" "}
                </span>
              ))}
              <span className="sweep-text">{heroData.headlineAccent}</span>
            </h1>

            <p className="mt-5 max-w-[590px] text-[16.5px] leading-[1.6] text-dim md:mt-[30px] md:text-[19.5px] md:leading-[1.62]">
              {heroData.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 text-[15px] font-semibold md:mt-10 md:flex-row md:flex-wrap md:gap-3.5">
              <a
                href={heroData.cta.primary.link}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-accent px-[26px] py-[15px] text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)] transition hover:bg-accent-soft hover:shadow-[0_14px_40px_rgba(76,111,255,0.48)] md:w-auto"
              >
                {heroData.cta.primary.text}{" "}
                <span aria-hidden className="text-[17px]">
                  ↓
                </span>
              </a>
              <a
                href={heroData.cta.secondary.link}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-line-2 bg-[rgba(233,240,250,0.03)] px-[26px] py-[15px] text-txt transition hover:border-dim-2 hover:bg-[rgba(233,240,250,0.09)] md:w-auto"
              >
                {heroData.cta.secondary.text}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] tracking-[0.02em] text-dim-2 md:mt-12 md:gap-[26px] md:text-[12.5px]">
              {heroData.proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="floater relative order-1 hidden w-full max-w-[300px] justify-self-start lg:order-none lg:block lg:max-w-[400px] lg:justify-self-center">
            <div
              aria-hidden
              className="absolute -inset-[18px] rounded-[32px] bg-[linear-gradient(150deg,rgba(76,111,255,0.5),rgba(36,216,196,0.28),transparent_70%)] blur-[26px]"
            />
            <div className="relative overflow-hidden rounded-[26px] border border-line-2 bg-panel shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
              <Image
                src={heroData.portrait.src}
                alt={heroData.portrait.alt}
                width={heroData.portrait.width}
                height={heroData.portrait.height}
                priority
                // The 1px candidate is deliberate: this card is display:none
                // below lg, so a phone picks the smallest srcset entry (~2KB)
                // for an element it never shows, instead of the full portrait.
                sizes="(max-width: 899px) 1px, 400px"
                className="block h-auto w-full [filter:contrast(1.04)_saturate(0.92)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,7,12,0.55)_100%)]"
              />
              <div className="absolute inset-x-[18px] bottom-4 flex items-center justify-between gap-3 font-mono text-[11.5px] uppercase tracking-[0.06em] text-dim">
                <span>Omar Derbala</span>
                <span className="text-teal">● online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
