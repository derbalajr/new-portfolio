import { getContent, type Locale } from "@/data";

export default function NotFound({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = c.ui.notFound;

  return (
    <main className="relative flex min-h-[100svh] items-center bg-bg px-5 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          404
        </div>
        <h1 className="mt-4 font-display text-[clamp(32px,8vw,64px)] font-bold leading-[1.04] tracking-[-0.04em] text-txt">
          {t.title}
        </h1>
        <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.65] text-dim">
          {t.body}
        </p>
        <a
          href={locale === "ar" ? "/ar" : "/"}
          className="mt-8 inline-flex min-h-[48px] items-center rounded-[14px] bg-accent px-[26px] text-[15px] font-semibold text-white transition hover:bg-accent-soft"
        >
          {t.cta}
        </a>
      </div>
    </main>
  );
}
