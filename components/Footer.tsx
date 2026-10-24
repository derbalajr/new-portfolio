import type { Content } from "@/data";

export default function Footer({
  footer,
  ui,
}: {
  footer: Content["footer"];
  ui: Content["ui"];
}) {
  return (
    <footer className="mt-[110px] border-t border-line">
      {/* The sticky CTA overlays the bottom of the viewport below lg, so the
          last content on the page needs clearance for it. */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2.5 px-5 pb-[calc(30px_+_76px_+_env(safe-area-inset-bottom))] pt-[30px] font-mono text-xs tracking-[0.04em] text-dim-2 md:flex-row md:items-center md:gap-6 md:px-10 lg:pb-[30px]">
        <div>{footer.left}</div>
        <a
          href={footer.venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1.5 text-dim transition-colors hover:text-txt"
        >
          {footer.venture.label} <span aria-hidden className="dir-flip">↗</span>
          <span className="sr-only"> {ui.newTab}</span>
        </a>
        <div>{footer.right}</div>
      </div>
    </footer>
  );
}
