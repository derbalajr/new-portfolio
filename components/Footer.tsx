import { footer } from "@/data";

export default function Footer() {
  return (
    <footer className="mt-[110px] border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2.5 px-5 py-[30px] font-mono text-xs tracking-[0.04em] text-dim-2 md:flex-row md:items-center md:gap-6 md:px-10">
        <div>{footer.left}</div>
        <div>{footer.right}</div>
      </div>
    </footer>
  );
}
