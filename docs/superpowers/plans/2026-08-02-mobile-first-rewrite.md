# Mobile-First Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's mobile presentation as a real design rather than a collapsed desktop layout, without altering anything at 1180px and above.

**Architecture:** Single codebase, mobile-first. Base Tailwind utilities become the mobile design; today's values are restored verbatim at `md:` (720px); `xl:` (1180px) is untouched. Two new client components carry behaviour that CSS cannot: a sticky thumb-zone CTA and a read-more collapse.

**Tech Stack:** Next.js 16 (App Router, React 19), Tailwind CSS 3.4, TypeScript 5, lucide-react.

## Global Constraints

- **The `md:` twin rule.** Every new base-level utility that changes a visual value MUST be paired with an `md:` variant restoring today's exact value. This is the desktop guarantee and it is checked mechanically in Task 10.
- **Breakpoints are already customised** in `tailwind.config.ts` and MUST NOT change: `sm: 480px`, `md: 720px`, `lg: 900px`, `xl: 1180px`, `2xl: 1400px`.
- **No changes to `data/index.ts`.** No new fields, no rewritten copy.
- **No changes to `components/HeroCanvas.tsx`.** It already skips below 900px and under `prefers-reduced-motion`.
- **No test framework exists in this repo.** Do not add one. Verification per task is `npm run typecheck && npm run lint && npm run build`, plus the explicit visual assertions listed in each task.
- **`calc()` inside Tailwind arbitrary values needs underscores for spaces.** Write `pb-[calc(76px_+_env(safe-area-inset-bottom))]`, never `pb-[calc(76px+env(...))]` — CSS `calc` requires whitespace around `+` and the latter compiles to invalid CSS that fails silently.
- **Safe-area on fixed elements must be side-specific.** `pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]`, never one inset applied to both sides.
- **Every interactive target is at least 44px** in its smallest dimension.
- **Commit after every task.** Branch is `mobile-first-rewrite`.

---

## File Structure

**Created:**

| File | Responsibility |
| --- | --- |
| `components/ExpandableText.tsx` | Clamp-and-expand paragraph. Client. Knows nothing about projects — takes `id` and `children`. |
| `components/MobileCta.tsx` | Sticky thumb-zone CTA bar and its visibility rule. Client. Owns its own `IntersectionObserver`. |

**Modified:**

| File | Change |
| --- | --- |
| `app/layout.tsx` | `viewport` export; drop unused font weight. |
| `app/globals.css` | `overflow-x: clip`, body safe-area, `text-size-adjust`, tap behaviour. |
| `app/theme.css` | Hover guards, `:active` states, mask class split, mobile marquee/reveal rules, `.no-scrollbar`. |
| `app/page.tsx` | Mount `MobileCta`. |
| `components/Nav.tsx` | 60px header, 44px button, full-screen sheet. |
| `components/Hero.tsx` | Avatar, scaling headline, stacked CTAs, `svh`. |
| `components/Ticker.tsx` | Density, edge mask. |
| `components/About.tsx` | Type and stat-card scale. |
| `components/Projects.tsx` | Media ratios, link relocation, expandable copy, density. |
| `components/Skills.tsx` | Heading clamp, card density. |
| `components/Experience.tsx` | Timeline indent, meta row, separators. |
| `components/Testimonials.tsx` | Scroll-snap carousel, dots. |
| `components/Contact.tsx` | Full-width email, social grid, density. |
| `components/Footer.tsx` | Bottom clearance for the CTA bar. |

Section components stay one file each — that is the established pattern and each is already under 200 lines. `ExpandableText` and `MobileCta` are separate files because both need `"use client"` and folding them into `Projects.tsx` / `page.tsx` would push those whole trees to the client.

---

### Task 1: Global foundations

Everything downstream depends on safe-area support, the hover guard and the new utility classes. Nothing visual should change at any width yet except hover-on-touch behaviour.

**Files:**
- Modify: `app/layout.tsx:5-10` (font weights), `app/layout.tsx:26` (add `viewport` export), `app/layout.tsx:211-214` (remove raw `theme-color` meta)
- Modify: `app/globals.css:7-35`
- Modify: `app/theme.css:105-142`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS classes `.marquee-mask-md`, `.no-scrollbar` for Tasks 8 and 5. Safe-area insets become non-zero, which Tasks 2, 3 and 9 rely on.

- [ ] **Step 1: Add the `viewport` export to `app/layout.tsx`**

Import the type alongside `Metadata`:

```ts
import type { Metadata, Viewport } from "next";
```

Add after the `metadata` export:

```ts
// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to
// non-zero values on notched devices. Without it the insets are always 0 and
// every safe-area rule in this codebase is a no-op.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070c",
};
```

- [ ] **Step 2: Remove the now-duplicated raw meta tag**

Delete this line from the `<head>` block (`app/layout.tsx:212`):

```tsx
<meta name="theme-color" content="#05070c" />
```

The `viewport` export emits it.

- [ ] **Step 3: Drop the unused Space Grotesk weight**

`app/layout.tsx:5-10` — change `weight: ["400", "500", "600", "700"]` to `weight: ["500", "600", "700"]`. Weight 400 is never referenced; `font-display` is only ever used with `font-medium`, `font-semibold` or `font-bold`.

- [ ] **Step 4: Verify weight 400 really is unused before trusting Step 3**

Run:

```bash
grep -rn "font-display" components app | grep -v "font-medium\|font-semibold\|font-bold"
```

Expected: no output. If any line prints, that element inherits weight 400 — revert Step 3 and note it.

- [ ] **Step 5: Update `app/globals.css` base layer**

Replace the `html` and `body` rules:

```css
  html {
    scroll-behavior: smooth;
    background: #05070c;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* iOS Safari inflates text in landscape without this. */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    @apply bg-bg font-sans text-txt;
    text-wrap: pretty;
    /* clip, not hidden: `overflow: hidden` makes body a scroll container,
       which silently breaks the position: sticky in About. */
    overflow-x: clip;
    /* Landscape notch handling in one place. Fixed elements ignore body
       padding, so Nav and MobileCta carry their own. */
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  a,
  button,
  summary,
  [role="button"] {
    /* Kills the 300ms synthetic-click delay and the grey tap flash. */
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
```

- [ ] **Step 6: Guard the hover rules in `app/theme.css`**

Replace lines 105-126 (the `.card-lift` / `.shot` / `.chip-row` block) with:

```css
.card-lift {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.35s ease, background-color 0.35s ease;
}
.shot {
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease;
}
.chip-row > span {
  transition: border-color 0.3s ease, color 0.3s ease;
}

/* Touch devices synthesise :hover on first tap and latch it until the user
   taps elsewhere, so a tapped card would stay lifted. Gate every hover
   effect on a real pointer and give touch a press state instead. */
@media (hover: hover) and (pointer: fine) {
  .card-lift:hover {
    transform: translateY(-6px);
    border-color: rgba(233, 240, 250, 0.18);
    background-color: #101825;
  }
  .card-lift:hover .shot {
    transform: scale(1.05);
    filter: saturate(1.1);
  }
  .card-lift:hover .chip-row > span {
    border-color: rgba(233, 240, 250, 0.18);
  }
}

@media (hover: none) {
  .card-lift:active {
    background-color: #101825;
    border-color: rgba(233, 240, 250, 0.18);
  }
}
```

- [ ] **Step 7: Add the new utility classes to `app/theme.css`**

Append after the `.marquee-mask` rule:

```css
/* Same fade as .marquee-mask, but only from 720px up. Below that the
   References track is a scroll container and masking would hide the leading
   card's edge, which reads as clipped rather than faded. */
@media (min-width: 720px) {
  .marquee-mask-md {
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent,
      #000 8%,
      #000 92%,
      transparent
    );
    mask-image: linear-gradient(
      90deg,
      transparent,
      #000 8%,
      #000 92%,
      transparent
    );
  }
}

.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Below 720px the References track is swiped, not driven. */
@media (max-width: 719.98px) {
  .marquee-track-slow {
    animation: none;
  }
}
```

- [ ] **Step 8: Tune `.reveal` for tall mobile sections**

Inside the existing `@supports (animation-timeline: view())` block in `app/theme.css`, after the `.reveal` rule, add:

```css
    /* Sections run several screens tall on a phone, so `cover 20%` resolves
       far below the fold and the rise finishes before it is ever seen. */
    @media (max-width: 719.98px) {
      .reveal {
        animation-range: entry 0% entry 60%;
      }
    }
```

- [ ] **Step 9: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: all three clean. Then confirm the theme-color meta is still emitted exactly once:

```bash
grep -c 'name="theme-color"' .next/server/app/index.html 2>/dev/null || echo "check via npm start"
```

- [ ] **Step 10: Commit**

```bash
git add app/layout.tsx app/globals.css app/theme.css
git commit -m "fix: safe-area support, hover guards and mobile motion ranges

viewportFit: cover is what makes env(safe-area-inset-*) resolve to
non-zero values; without it every safe-area rule is a no-op. Hover
effects move behind (hover: hover) so tapping a card on iOS no longer
latches it into the lifted state, with an :active press state in its
place. overflow-x goes hidden -> clip because hidden makes body a scroll
container and breaks the sticky column in About."
```

---

### Task 2: Nav — full-screen sheet

**Files:**
- Modify: `components/Nav.tsx` (whole file)

**Interfaces:**
- Consumes: `navItems`, `contact` from `@/data` (already imported). Safe-area insets from Task 1.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Rewrite `components/Nav.tsx`**

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, contact } from "@/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Scroll offset captured at open time, restored on close.
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock. position: fixed is the only technique iOS Safari
  // respects — overflow: hidden alone still rubber-bands the page behind
  // the sheet.
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      // "instant" is required: html carries scroll-behavior: smooth, so the
      // default would animate the restore and fight any pending hash jump.
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
    };
  }, [open]);

  // Escape to close, and a Tab cycle confined to the sheet.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the sheet on open, return it to the trigger on close.
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  // The scroll lock's cleanup restores the page offset, so a plain anchor
  // would jump to the target and then be yanked back. Close first, let the
  // restore land, then scroll on the next frame.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    close();
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ block: "start" });
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/[0.66] pt-[env(safe-area-inset-top)] backdrop-blur-[18px]">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between gap-6 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:h-[72px] md:pl-10 md:pr-10">
          <a href="#top" className="flex items-center gap-3">
            <span className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(140deg,#4c6fff,#2b3fd6)] font-display text-sm font-bold tracking-[-0.02em] text-white shadow-[0_6px_22px_rgba(76,111,255,0.34)]">
              OD
            </span>
            <span className="font-display text-[15.5px] font-semibold tracking-[-0.01em]">
              Omar Derbala
            </span>
          </a>

          <nav className="hidden items-center gap-1.5 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <a
                key={item.link}
                href={item.link}
                className="rounded-[10px] px-3.5 py-2.5 text-dim transition-colors hover:bg-[rgba(233,240,250,0.06)] hover:text-txt"
              >
                {item.name}
              </a>
            ))}
            <a
              href={`mailto:${contact.email}`}
              className="ml-2.5 rounded-xl bg-accent px-5 py-[11px] font-semibold text-white shadow-[0_8px_26px_rgba(76,111,255,0.3)] transition hover:bg-accent-soft hover:shadow-[0_10px_34px_rgba(76,111,255,0.45)]"
            >
              Let&rsquo;s talk
            </a>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 text-txt lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={sheetRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex h-[100svh] flex-col bg-bg pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] lg:hidden"
        >
          <div className="flex h-[60px] flex-none items-center justify-end pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 text-txt"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
            {navItems.map((item, i) => (
              <a
                key={item.link}
                href={item.link}
                onClick={(e) => goTo(e, item.link)}
                className="flex min-h-[56px] items-center gap-4 rounded-xl px-3 active:bg-[rgba(233,240,250,0.06)]"
              >
                <span className="font-mono text-[12px] tabular-nums text-dim-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-txt">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex-none border-t border-line pb-6 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-5">
            <a
              href={`mailto:${contact.email}`}
              onClick={close}
              className="flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-5 text-[15px] font-semibold text-white"
            >
              Let&rsquo;s talk
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              {contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-line-2 px-4 text-[13.5px] font-medium text-dim"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean. Note the header is now `h-[60px] md:h-[72px]` — that is the `md:` twin for the height. The padding pair `pl-[max(1.25rem,...)] md:pl-10` is the twin for horizontal padding.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: replace the mobile dropdown with a full-screen nav sheet

The old dropdown hung under a fixed header with no scroll lock, no
Escape, no focus management and a 40px trigger. The sheet locks the body
with position: fixed — the only technique iOS respects — traps Tab,
returns focus to the trigger on close, and uses 56px rows. Anchor
activation is handled explicitly because the scroll-lock cleanup
restores the page offset and would otherwise yank the page back after a
hash jump."
```

---

### Task 3: Sticky thumb-zone CTA

**Files:**
- Create: `components/MobileCta.tsx`
- Modify: `app/page.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `contact.email` from `@/data`. DOM ids `#top` (Hero) and `#contact` (Contact), both of which already exist.
- Produces: `<MobileCta />`, a default export taking no props.

- [ ] **Step 1: Create `components/MobileCta.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data";

/**
 * Primary action pinned inside the thumb zone. Visible once the hero has
 * scrolled away, hidden again over Contact — leaving it there would cover
 * the very section it points at. Hidden from `lg` up, where the header CTA
 * takes over.
 */
export default function MobileCta() {
  const [heroOut, setHeroOut] = useState(false);
  const [contactIn, setContactIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contactEl = document.getElementById("contact");
    if (!hero || !contactEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) setHeroOut(!entry.isIntersecting);
          else setContactIn(entry.isIntersecting);
        }
      },
      { rootMargin: "0px" }
    );

    observer.observe(hero);
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  const shown = heroOut && !contactIn;

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/[0.82] pb-[calc(0.75rem_+_env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-3 backdrop-blur-[18px] transition-[opacity,transform] duration-300 lg:hidden ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={`mailto:${contact.email}`}
        tabIndex={shown ? undefined : -1}
        className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-[14px] bg-accent px-5 text-[15px] font-semibold text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)]"
      >
        Let&rsquo;s talk <span aria-hidden>→</span>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`**

Add the import alongside the others and render it as the last child of the wrapper `div`, after `<Footer />`:

```tsx
import MobileCta from "@/components/MobileCta";
```

```tsx
      <Footer />
      <MobileCta />
    </div>
```

- [ ] **Step 3: Give the footer clearance in `components/Footer.tsx`**

The bar overlays the bottom of the page, so the last content needs room. Change the inner div's padding:

```tsx
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2.5 px-5 pb-[calc(30px_+_76px_+_env(safe-area-inset-bottom))] pt-[30px] font-mono text-xs tracking-[0.04em] text-dim-2 md:flex-row md:items-center md:gap-6 md:px-10 lg:pb-[30px]">
```

Note the `lg:pb-[30px]` twin — the bar is `lg:hidden`, so clearance is only needed below `lg`.

- [ ] **Step 4: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean. Confirm `#top` and `#contact` exist:

```bash
grep -n 'id="top"' components/Hero.tsx && grep -n 'id="contact"' components/Contact.tsx
```

Expected: one hit each.

- [ ] **Step 5: Commit**

```bash
git add components/MobileCta.tsx app/page.tsx components/Footer.tsx
git commit -m "feat: add a sticky thumb-zone CTA on mobile

On a phone the only path to contact was buried behind the hamburger.
The bar appears once the hero scrolls away and hides again over Contact,
since leaving it up would cover the section it points at. Hidden from lg
where the header CTA already exists."
```

---

### Task 4: Hero

**Files:**
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: `heroData` from `@/data` (unchanged shape).
- Produces: keeps `id="top"`, which `MobileCta` observes.

- [ ] **Step 1: Rewrite the hero section wrapper and text column**

Section element — swap `min-h-screen` for `min-h-[100svh]` and rework padding:

```tsx
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-[92px] md:pb-0 md:pt-[120px]"
    >
```

`svh` is correct here: it guarantees fit with the address bar showing, and unlike `dvh` it does not change value mid-scroll.

- [ ] **Step 2: Shrink the background glow on mobile**

```tsx
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[46%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.22)_0%,transparent_62%)] blur-[18px] md:h-[900px] md:w-[900px] md:blur-[30px]"
      />
```

- [ ] **Step 3: Replace the badge with an avatar + badge row**

Swap the existing badge `div` (currently `Hero.tsx:26-32`) for:

```tsx
            <div className="inline-flex items-center gap-3 rounded-full border border-line-2 bg-[rgba(233,240,250,0.04)] py-2 pl-2 pr-4 text-[13px] font-medium tracking-[0.01em] text-dim md:gap-2.5 md:py-2 md:pl-3">
              <Image
                src={heroData.portrait.src}
                alt=""
                width={64}
                height={64}
                priority
                sizes="64px"
                className="h-10 w-10 flex-none rounded-full object-cover md:hidden"
              />
              <span
                aria-hidden
                className="hidden h-2 w-2 flex-none animate-pulse-dot rounded-full bg-teal shadow-[0_0_14px_#24d8c4] md:inline-flex"
              />
              <span>{heroData.badge}</span>
            </div>
```

The avatar is decorative here (the portrait card below carries the real alt text at `lg`), so `alt=""`.

- [ ] **Step 4: Make the headline actually scale**

```tsx
            <h1 className="mt-6 font-display text-[clamp(34px,9vw,48px)] font-bold leading-[1.02] tracking-[-0.035em] text-txt md:mt-[30px] md:text-[clamp(48px,6.4vw,96px)] md:leading-[0.98] md:tracking-[-0.045em]">
```

At 393px, `9vw` resolves to ~35px instead of pinning to the old 48px floor.

- [ ] **Step 5: Scale the tagline**

```tsx
            <p className="mt-5 max-w-[590px] text-[16.5px] leading-[1.6] text-dim md:mt-[30px] md:text-[19.5px] md:leading-[1.62]">
```

- [ ] **Step 6: Stack the CTAs full-width on mobile**

Container:

```tsx
            <div className="mt-8 flex flex-col gap-3 text-[15px] font-semibold md:mt-10 md:flex-row md:flex-wrap md:gap-3.5">
```

Both anchors get `w-full justify-center md:w-auto` added, and their padding becomes `px-[26px] py-[15px]` unchanged (that already yields ~52px). Primary:

```tsx
              <a
                href={heroData.cta.primary.link}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-accent px-[26px] py-[15px] text-white shadow-[0_10px_32px_rgba(76,111,255,0.32)] transition hover:bg-accent-soft hover:shadow-[0_14px_40px_rgba(76,111,255,0.48)] md:w-auto"
              >
```

Secondary:

```tsx
              <a
                href={heroData.cta.secondary.link}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-line-2 bg-[rgba(233,240,250,0.03)] px-[26px] py-[15px] text-txt transition hover:border-dim-2 hover:bg-[rgba(233,240,250,0.09)] md:w-auto"
              >
```

- [ ] **Step 7: Tighten the proof row**

```tsx
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] tracking-[0.02em] text-dim-2 md:mt-12 md:gap-[26px] md:text-[12.5px]">
```

- [ ] **Step 8: Hide the portrait card below `lg` and stop it downloading**

```tsx
          <div className="floater relative order-1 hidden w-full max-w-[300px] justify-self-start lg:order-none lg:block lg:max-w-[400px] lg:justify-self-center">
```

and on its `<Image>`:

```tsx
                sizes="(max-width: 899px) 1px, 400px"
```

A `1px` candidate makes a mobile viewport pick the smallest srcset entry (~2KB) for an element it never displays, instead of downloading the full portrait.

- [ ] **Step 9: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean. Then confirm the `1px` sizes hint survived into the build output:

```bash
grep -o 'max-width: 899px) 1px' .next/server/app/page.js | head -1
```

Expected: one hit (or check the rendered HTML if the path differs).

- [ ] **Step 10: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rebuild the hero for mobile

The headline pinned to its 48px clamp floor at every phone width — 6.4vw
is 25px at 393px — so it wrapped to four lines, and a 300px portrait sat
above it. The portrait becomes a 40px avatar inline with the badge, the
headline scales on 9vw, and the CTAs stack full-width. min-h-screen goes
to 100svh so the hero stops jumping when the address bar collapses.
~1170px down to ~640px."
```

---

### Task 5: Ticker and About

**Files:**
- Modify: `components/Ticker.tsx`
- Modify: `components/About.tsx`

**Interfaces:**
- Consumes: `.marquee-mask` from Task 1.
- Produces: nothing.

- [ ] **Step 1: Add the missing edge mask and tighten `components/Ticker.tsx`**

Outer div gains `marquee-mask`; the track tightens on mobile:

```tsx
    <div className="marquee marquee-mask relative overflow-hidden border-y border-line bg-bg-2 py-4 md:py-5">
```

```tsx
      <div className="marquee-track flex w-max items-center gap-8 font-mono text-[13px] tracking-[0.04em] text-dim-2 md:gap-14 md:text-sm">
```

The inner `<span>` also carries `gap-14` — change it to match:

```tsx
            className="inline-flex items-center gap-8 whitespace-nowrap md:gap-14"
```

- [ ] **Step 2: Scale the About lead and body**

```tsx
          <p className="font-display text-[clamp(21px,5.5vw,24px)] font-medium leading-[1.3] tracking-[-0.02em] text-txt md:text-[clamp(24px,2.5vw,34px)] md:leading-[1.28] md:tracking-[-0.025em]">
```

```tsx
            <p
              key={para.slice(0, 24)}
              className="text-[16.5px] leading-[1.7] text-dim md:text-[17.5px] md:leading-[1.68]"
            >
```

- [ ] **Step 3: Tighten the stat cards**

In `StatCard`:

```tsx
    <div className="rounded-[18px] border border-line bg-panel px-4 py-5 md:px-5 md:py-[22px]">
```

```tsx
      <div
        ref={ref}
        className="font-display text-[26px] font-bold leading-none tracking-[-0.03em] text-txt [font-variant-numeric:tabular-nums] md:text-[32px]"
      >
```

```tsx
      <div className="mt-2 text-[12px] font-medium leading-[1.4] text-dim-2 md:mt-2.5 md:text-[12.5px]">
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add components/Ticker.tsx components/About.tsx
git commit -m "feat: scale Ticker and About for mobile

The ticker hard-cut at both edges because it never had the mask the
References marquee uses. About's lead and body carried desktop sizes at
every width."
```

---

### Task 6: Expandable copy and the Projects rebuild

The largest task — Projects is ~4500px of the mobile page.

**Files:**
- Create: `components/ExpandableText.tsx`
- Modify: `components/Projects.tsx`

**Interfaces:**
- Consumes: `projects` from `@/data`.
- Produces: `ExpandableText`, default export, props `{ id: string; children: React.ReactNode }`.

- [ ] **Step 1: Create `components/ExpandableText.tsx`**

```tsx
"use client";

import { useState } from "react";

/**
 * Clamps long copy on mobile behind a Read more toggle, and renders as a
 * plain paragraph from 720px up. The full text is always in the DOM, so it
 * is server-rendered and indexable regardless of the toggle state.
 */
export default function ExpandableText({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p
        id={id}
        className={`text-[15.5px] leading-[1.62] text-dim md:line-clamp-none ${
          open ? "line-clamp-none" : "line-clamp-4"
        }`}
      >
        {children}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-accent-soft md:hidden"
      >
        {open ? "Show less" : "Read more"}
        <span aria-hidden className={open ? "rotate-180" : undefined}>
          ⌄
        </span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Make the article a positioning context in `components/Projects.tsx`**

Add `relative` to the `<article>` class list (currently `Projects.tsx:47`):

```tsx
            className={`card-lift relative flex flex-col overflow-hidden rounded-[26px] border border-line bg-panel ${SPAN[p.span]}`}
```

This is what lets the external link — which now lives in the card body — return to the media band's top-right corner at `md:`. The article and the media div share a top edge, so `right-4 top-4` lands identically.

- [ ] **Step 3: Make screenshots readable by changing the ratio maps**

Replace the `RATIO` and `RATIO_XL` maps (`Projects.tsx:13-24`):

```tsx
// Screenshot cards. 21/9 at phone width is a 151px sliver, so mobile takes
// 4/3 and the flatter desktop ratios come back at md and xl.
const RATIO: Record<string, string> = {
  "21/9": "aspect-[4/3] md:aspect-[16/10] xl:aspect-[21/9]",
  "16/10": "aspect-[4/3] md:aspect-[16/10]",
};

// A plate is real content, not a cropped photo, so it only takes a fixed
// ratio at xl — where cards sit two-up and have a neighbour to line up with.
// Below that it sizes to its own text.
const RATIO_XL: Record<string, string> = {
  "21/9": "xl:aspect-[21/9]",
  "16/10": "xl:aspect-[16/10]",
};
```

- [ ] **Step 4: Scale the section header**

```tsx
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-10">
```

```tsx
          <h2 className="mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
```

- [ ] **Step 5: Move the external link out of the media overlay**

Delete the `{p.link && (...)}` block from inside the media `div` (`Projects.tsx:125-134`).

- [ ] **Step 6: Tighten the card body and title**

```tsx
            <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-5 md:gap-[18px] md:px-7 md:pb-[30px] md:pt-7">
```

```tsx
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-txt md:text-[23px]">
```

```tsx
                  <span className="font-mono text-[11px] tracking-[0.04em] text-dim-2 md:text-[11.5px]">
```

- [ ] **Step 7: Swap the description for `ExpandableText`**

Replace the `<p>` at `Projects.tsx:157-159` with:

```tsx
              <ExpandableText id={`project-desc-${p.num}`}>
                {p.description}
              </ExpandableText>
```

Add the import at the top:

```tsx
import ExpandableText from "./ExpandableText";
```

- [ ] **Step 8: Tighten the chip rows**

Impact chips:

```tsx
                    className="rounded-full border border-[rgba(76,111,255,0.28)] bg-[rgba(76,111,255,0.12)] px-[10px] py-[6px] text-[11.5px] font-semibold text-accent-soft md:px-[13px] md:py-[7px] md:text-[12.5px]"
```

Stack chips — note the size goes **up** on mobile. 11.5px mono is below the readable floor on a phone:

```tsx
                    className="rounded-lg border border-line px-[11px] py-[5px] font-mono text-[12px] text-dim md:text-[11.5px]"
```

- [ ] **Step 9: Re-add the external link as a full-width row after the chip row**

Immediately after the closing `</div>` of the `chip-row` div, still inside the card body:

```tsx
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line-2 bg-[rgba(233,240,250,0.03)] px-4 font-mono text-[12.5px] text-txt transition md:absolute md:right-4 md:top-4 md:min-h-0 md:rounded-full md:bg-bg/[0.72] md:px-[15px] md:py-[9px] md:text-[11.5px] md:backdrop-blur-[8px] md:hover:border-accent md:hover:bg-accent md:hover:text-white"
                >
                  {p.linkLabel} <span aria-hidden>↗</span>
                </a>
              )}
```

The `chip-row` keeps its `mt-auto`, so it still pins to the card baseline; the link follows it in flow on mobile and leaves flow entirely at `md:`.

- [ ] **Step 10: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean. Then confirm the full description text is still server-rendered rather than hidden behind the toggle — take a distinctive phrase from the longest entry:

```bash
npm run build && grep -c "supplier changes something" .next/server/app/page.js
```

Expected: at least 1. If 0, the text is not in the SSR payload and the collapse has cost the page its SEO.

- [ ] **Step 11: Commit**

```bash
git add components/ExpandableText.tsx components/Projects.tsx
git commit -m "feat: rebuild project cards for mobile

aspect-[21/9] applied at every width, so the lead screenshot rendered as
a 151px sliver on a phone; mobile now takes 4/3 and the flat desktop
ratios return at md and xl. Descriptions collapse to four lines behind a
toggle with the full text still server-rendered. The external link moves
out of the image overlay into a 48px row and re-anchors to the article's
top-right at md, which shares a top edge with the media band, so it
lands in the same place with one anchor and no duplication."
```

---

### Task 7: Skills and Experience

**Files:**
- Modify: `components/Skills.tsx`
- Modify: `components/Experience.tsx`

**Interfaces:**
- Consumes: `skills`, `roles` from `@/data`.
- Produces: nothing.

- [ ] **Step 1: Scale the Skills heading and cards**

```tsx
      <h2 className="mb-8 mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mb-[52px] md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
```

```tsx
            className={`card-lift rounded-[20px] border border-line bg-panel px-5 pb-6 pt-5 md:rounded-[24px] md:px-[26px] md:pb-[30px] md:pt-7 ${SPAN[group.span]}`}
```

Skills stays one column on mobile. Two columns would leave ~165px per card, too narrow for the chip rows.

- [ ] **Step 2: Scale the Experience heading**

```tsx
      <h2 className="mb-8 mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mb-[52px] md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
```

- [ ] **Step 3: Reclaim the timeline's wasted width**

The container indent plus card padding currently eats 90px of a 393px screen.

```tsx
      <div className="relative flex flex-col gap-2 pl-[22px] md:pl-[34px]">
```

Card:

```tsx
            className="card-lift relative grid grid-cols-1 gap-3 rounded-[20px] border-t border-line px-0 py-5 md:gap-4 md:border-transparent md:px-7 md:py-[26px] xl:grid-cols-[230px_minmax(0,1fr)_250px] xl:gap-8"
```

Note `border-t border-line` replaces `border border-transparent` on mobile — with card padding gone, a rule is what separates roles. `md:border-transparent` restores today's look.

Dot:

```tsx
              className="absolute -left-[22px] top-[26px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgba(76,111,255,0.14)] md:-left-[34px] md:top-[34px]"
```

- [ ] **Step 4: Put period and type on one line on mobile**

Replace the first grid child (`Experience.tsx:27-34`):

```tsx
            <div className="flex items-center gap-3 xl:block">
              <div className="font-mono text-[12.5px] tracking-[0.03em] text-txt [font-variant-numeric:tabular-nums]">
                {role.period}
              </div>
              <div className="text-[12.5px] font-medium text-dim-2 xl:mt-2">
                {role.type}
              </div>
            </div>
```

- [ ] **Step 5: Scale the role body**

```tsx
              <p className="mt-3 max-w-[620px] text-[15px] leading-[1.65] text-dim md:text-[15.5px] md:leading-[1.62]">
```

- [ ] **Step 6: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add components/Skills.tsx components/Experience.tsx
git commit -m "feat: scale Skills and reclaim the Experience timeline's width

The timeline's pl-[34px] container plus px-7 card padding consumed 90px
of a 393px screen, leaving ~260px of text. Mobile drops the card padding
and separates roles with a rule instead, recovering ~68px."
```

---

### Task 8: References carousel

**Files:**
- Modify: `components/Testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials` from `@/data`, plus `.marquee-mask-md`, `.no-scrollbar` and the sub-720px `.marquee-track-slow` override from Task 1.
- Produces: nothing.

- [ ] **Step 1: Rewrite `components/Testimonials.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Below 720px the track is a scroll container rather than a marquee, so
  // the dots follow real scroll position. Above it the track is animated and
  // the dots are hidden, so the listener is harmless.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 16; // card width + gap-4
      setActive(Math.round(track.scrollLeft / step));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="words"
      className="reveal overflow-hidden pt-[88px] md:pt-[130px]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          05 / References
        </div>
        <h2 className="mb-8 mt-3 font-display text-[clamp(28px,7.5vw,36px)] font-bold leading-[1.06] tracking-[-0.035em] text-txt md:mb-[52px] md:mt-[18px] md:text-[clamp(36px,4.2vw,60px)] md:leading-[1.02] md:tracking-[-0.04em]">
          People I&rsquo;ve built for
        </h2>
      </div>

      {/* Doubled so the marquee loops seamlessly at md and up. The second
          half is hidden from assistive tech, and below 720px it is not
          rendered at all — you swipe four cards, not eight. */}
      <div className="marquee marquee-mask-md relative">
        <div
          ref={trackRef}
          className="marquee-track-slow no-scrollbar flex w-max snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 md:snap-none md:gap-5 md:overflow-x-hidden md:px-2.5"
        >
          {[...testimonials, ...testimonials].map((q, i) => {
            const isDuplicate = i >= testimonials.length;
            return (
              <figure
                key={`${q.name}-${i}`}
                aria-hidden={isDuplicate}
                className={`w-[85vw] max-w-[340px] shrink-0 snap-start flex-col justify-between gap-6 rounded-[24px] border border-line bg-panel px-6 pb-6 pt-7 md:w-[min(420px,82vw)] md:max-w-none md:px-[30px] md:pb-7 md:pt-[30px] lg:w-[420px] ${
                  isDuplicate ? "hidden md:flex" : "flex"
                }`}
              >
                <blockquote className="text-[15px] leading-[1.62] text-txt md:text-base">
                  {q.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-[14px] border border-line-2 bg-[linear-gradient(140deg,rgba(76,111,255,0.3),rgba(36,216,196,0.22))] font-display text-[13px] font-semibold text-txt">
                    {q.initials}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-semibold text-txt">
                      {q.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-dim-2">
                      {q.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden
        className="mt-5 flex justify-center gap-2 md:hidden"
      >
        {testimonials.map((q, i) => (
          <span
            key={q.name}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-accent" : "w-1.5 bg-line-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
```

Two details that matter: `overscroll-x-contain` stops an edge swipe triggering iOS back-navigation, and the `md:overflow-x-hidden` twin returns the track to a non-scrolling marquee at 720px.

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean.

- [ ] **Step 3: Confirm the marquee animation really is off below 720px**

```bash
grep -n "max-width: 719.98px" app/theme.css
```

Expected: two hits — the `.reveal` range from Task 1 Step 8 and the `.marquee-track-slow` override from Task 1 Step 7. If the marquee rule is missing, the track will drift *and* accept swipes, which fight each other.

- [ ] **Step 4: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: turn References into a swipeable carousel on mobile

A 68s marquee with a :hover pause is unreadable and unpausable on touch —
quotes drift away mid-sentence. Below 720px the track becomes a
scroll-snap carousel with dot indicators, overscroll containment so an
edge swipe does not trigger iOS back-navigation, and the duplicated half
of the array unrendered so you swipe four cards rather than eight."
```

---

### Task 9: Contact

**Files:**
- Modify: `components/Contact.tsx`

**Interfaces:**
- Consumes: `contact` from `@/data`.
- Produces: keeps `id="contact"`, which `MobileCta` observes.

- [ ] **Step 1: Scale down the two radial glows**

```tsx
          <div
            aria-hidden
            className="absolute -right-[80px] -top-[120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(76,111,255,0.34)_0%,transparent_62%)] blur-[14px] md:-right-[120px] md:-top-[180px] md:h-[620px] md:w-[620px] md:blur-[20px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-[140px] -left-12 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(36,216,196,0.16)_0%,transparent_64%)] blur-[16px] md:-bottom-[220px] md:-left-20 md:h-[520px] md:w-[520px] md:blur-[24px]"
          />
```

- [ ] **Step 2: Tighten the panel**

```tsx
        <div className="relative overflow-hidden rounded-[24px] border border-line-2 bg-[linear-gradient(150deg,#0b1223_0%,#05070c_58%)] md:rounded-[34px]">
```

```tsx
          <div className="relative grid grid-cols-1 gap-8 px-5 pb-9 pt-8 md:gap-9 md:px-11 md:pb-16 md:pt-[60px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-14 xl:px-[60px] xl:pb-20 xl:pt-[76px]">
```

- [ ] **Step 3: Scale the heading and blurb**

```tsx
              <h2 className="mt-4 font-display text-[clamp(30px,8vw,38px)] font-bold leading-[1.04] tracking-[-0.035em] text-txt md:mt-[22px] md:text-[clamp(38px,5vw,68px)] md:leading-none md:tracking-[-0.045em]">
```

```tsx
              <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.65] text-dim md:mt-6 md:text-[17.5px] md:leading-[1.6]">
```

- [ ] **Step 4: Make the email button full-width on mobile**

The current `inline-flex` at 17px is one long address away from overflowing, and `overflow-x: clip` would silently cut it.

```tsx
              <a
                href={`mailto:${contact.email}`}
                className="mt-7 flex w-full items-center justify-between gap-3 rounded-2xl bg-accent px-5 py-4 font-display text-[15px] font-semibold tracking-[-0.02em] text-white shadow-[0_14px_44px_rgba(76,111,255,0.4)] transition hover:bg-accent-soft hover:shadow-[0_18px_56px_rgba(76,111,255,0.58)] md:mt-9 md:inline-flex md:w-auto md:justify-start md:gap-3.5 md:px-[30px] md:py-[17px] md:text-[clamp(17px,1.8vw,22px)]"
              >
                <span className="truncate">{contact.email}</span>
                <span aria-hidden className="flex-none">
                  →
                </span>
              </a>
```

- [ ] **Step 5: Turn the socials into a two-column grid of 48px targets**

```tsx
              <div className="mt-6 grid grid-cols-2 gap-2.5 text-sm font-medium md:mt-[30px] md:flex md:flex-wrap">
```

```tsx
                    className="flex min-h-[48px] items-center justify-center rounded-xl border border-line-2 bg-[rgba(233,240,250,0.03)] px-4 text-txt transition hover:bg-[rgba(233,240,250,0.1)] md:min-h-0 md:px-[18px] md:py-[11px]"
```

- [ ] **Step 6: Tighten the Upwork card**

```tsx
            <div className="self-start rounded-[20px] border border-line-2 bg-bg/50 px-5 py-6 backdrop-blur-[10px] md:rounded-[24px] md:px-7 md:py-[30px]">
```

```tsx
              <div className="mt-4 font-display text-[42px] font-bold leading-none tracking-[-0.04em] text-txt [font-variant-numeric:tabular-nums] md:mt-[18px] md:text-[54px]">
```

- [ ] **Step 7: Verify**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: rebuild the contact panel for mobile

The email button was an inline-flex at 17px, one long address away from
overflowing into a body that now clips horizontally. It becomes a
full-width row with a truncating address, socials become a grid of 48px
targets, and both decorative radial glows scale down — a 620px blurred
circle is pure GPU cost on a phone."
```

---

### Task 10: Desktop-invariant audit and hand-off

The `md:` twin rule is the whole safety argument for this change. This task proves it rather than assuming it.

**Files:**
- No source changes expected. If the audit finds a violation, fix it here.

**Interfaces:**
- Consumes: every prior task.
- Produces: the verification report.

- [ ] **Step 1: Diff the full change set against `main`**

```bash
git diff main --stat
```

Expected: the 14 modified files and 2 created files from the File Structure table, plus the two docs files.

- [ ] **Step 2: Audit for base utilities missing an `md:` twin**

Walk the diff for added class names. For every added base-level utility that sets a *visual* value (`text-`, `px-`, `py-`, `mt-`, `mb-`, `gap-`, `rounded-`, `aspect-`, `w-`, `h-`, `leading-`, `tracking-`, `blur-`, `border-`), confirm the same declaration has an `md:`, `lg:` or `xl:` counterpart in the same class list — **unless** the value is deliberately universal.

```bash
git diff main -- components app | grep '^+' | grep -o 'className="[^"]*"' | less
```

Known-intentional exceptions, which need no twin:
- `relative` on the Projects `<article>` — a positioning context at every width.
- `min-h-[100svh]` on Hero — correct at every width; it replaces `min-h-screen` outright.
- `overscroll-x-contain`, `no-scrollbar` on the References track — inert where there is no scrolling.
- Everything inside `MobileCta`, which is `lg:hidden` in its entirety.
- Everything inside the Nav sheet, which is `lg:hidden` in its entirety.

Record any genuine violation and fix it before continuing.

- [ ] **Step 3: Full verification run**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: all clean, no new warnings versus `main`.

- [ ] **Step 4: Confirm project copy is still in the SSR payload**

```bash
grep -rc "supplier changes something" .next/server/app/ | grep -v ':0'
```

Expected: at least one file with a non-zero count. A zero here means the read-more collapse has removed content from the indexable HTML, which the design explicitly forbids.

- [ ] **Step 5: Commit any audit fixes**

```bash
git add -A
git commit -m "fix: restore md: twins missed in the mobile rewrite"
```

Skip if the audit was clean.

- [ ] **Step 6: Hand off for visual confirmation**

Browser automation is unavailable in this project, so the implementation cannot self-certify appearance. Report to the user:

- What changed, per section.
- The measured before/after page length.
- An explicit request to check **393px** (mobile design) and **1440px** (must be unchanged), plus **760px** — just above the `md` boundary, where the twins take effect and any missing one will show.
- That `md:` twin coverage was audited mechanically, and any exceptions found.

---

## Self-Review

**Spec coverage.** Every spec section maps to a task: globals -> 1; Nav -> 2; MobileCta and Footer -> 3; Hero -> 4; Ticker and About -> 5; ExpandableText and Projects -> 6; Skills and Experience -> 7; Testimonials -> 8; Contact -> 9; verification -> 10. The spec's three verification items are Task 10 Steps 3, 2 and 6 respectively.

**Placeholder scan.** No TBDs. Every code step carries the literal class list or component body to write.

**Type consistency.** `ExpandableText` is defined in Task 6 Step 1 as `{ id: string; children: React.ReactNode }` and consumed in Task 6 Step 7 with exactly those props. `MobileCta` is defined in Task 3 Step 1 as a no-prop default export and mounted in Task 3 Step 2 accordingly. The DOM ids `#top` and `#contact` that `MobileCta` observes are preserved by Tasks 4 and 9 and re-checked in Task 3 Step 4.

**One ordering dependency worth noting.** Task 8 depends on Task 1 Step 7 — without the sub-720px `.marquee-track-slow` override, the References track would animate and accept swipes simultaneously. Task 8 Step 3 checks for this explicitly rather than trusting it.
