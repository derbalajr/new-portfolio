import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { heroData } from "@/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-[120px]"
    >
      <HeroCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[46%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.22)_0%,transparent_62%)] blur-[30px]"
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
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-[rgba(233,240,250,0.04)] py-2 pl-3 pr-4 text-[13px] font-medium tracking-[0.01em] text-dim">
              <span
                aria-hidden
                className="inline-flex h-2 w-2 flex-none animate-pulse-dot rounded-full bg-teal shadow-[0_0_14px_#24d8c4]"
              />
              <span>{heroData.badge}</span>
            </div>

            <h1 className="mt-[30px] font-display text-[clamp(48px,6.4vw,96px)] font-bold leading-[0.98] tracking-[-0.045em] text-txt">
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

            <p className="mt-[30px] max-w-[590px] text-[19.5px] leading-[1.62] text-dim">
              {heroData.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3.5 text-[15px] font-semibold">
              <a
                href={heroData.cta.primary.link}
                className="inline-flex items-center gap-2.5 rounded-[14px] bg-accent px-[26px] py-[15px] text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)] transition hover:bg-accent-soft hover:shadow-[0_14px_40px_rgba(76,111,255,0.48)]"
              >
                {heroData.cta.primary.text}{" "}
                <span aria-hidden className="text-[17px]">
                  ↓
                </span>
              </a>
              <a
                href={heroData.cta.secondary.link}
                className="inline-flex items-center gap-2.5 rounded-[14px] border border-line-2 bg-[rgba(233,240,250,0.03)] px-[26px] py-[15px] text-txt transition hover:border-dim-2 hover:bg-[rgba(233,240,250,0.09)]"
              >
                {heroData.cta.secondary.text}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-[26px] font-mono text-[12.5px] tracking-[0.02em] text-dim-2">
              {heroData.proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="floater relative order-1 w-full max-w-[300px] justify-self-start lg:order-none lg:max-w-[400px] lg:justify-self-center">
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
                sizes="(max-width: 900px) 300px, 400px"
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
