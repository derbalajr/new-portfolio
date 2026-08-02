# Mobile-first rewrite

Date: 2026-08-02

## Problem

The site has no mobile design. It has a desktop design that collapses to one
column.

Almost every layout switch in the project happens at `xl` (1180px) — the
Projects grid, the About sidebar, the Experience timeline columns, the Contact
split. Below 1180px everything stacks, but keeps desktop typography, desktop
padding and desktop aspect ratios. Measured at 393px (iPhone 15, 353px of
content after `px-5`):

| Defect | Location | Measurement |
| --- | --- | --- |
| Hero runs ~1170px — 1.5 screens before the first section | `Hero.tsx:9` | `pt-[120px]` + 375px portrait + 188px headline + 158px tagline + CTAs + proof |
| Headline never shrinks | `Hero.tsx:34` | `clamp(48px,6.4vw,96px)`; 6.4vw is 25px at 393px, so it pins to the 48px floor. "systems companies" needs ~425px and wraps to 4 total lines |
| Screenshots reduce to slivers | `Projects.tsx:54` | `aspect-[21/9]` applies at every width. 353 ÷ 21 × 9 = 151px tall |
| Descriptions are walls of text | `data/index.ts:164` | The Address entry runs ~700 chars — ~18 lines, ~450px inside one card |
| Projects section ≈ 4500px | `Projects.tsx` | 7 cards averaging ~600px |
| Timeline wastes 90px of a 393px screen | `Experience.tsx:13,21` | `pl-[34px]` container plus `px-7` card padding leaves ~260px of text |
| Hover states latch on tap | `theme.css:105-126` | `.card-lift:hover` has no `@media (hover: hover)` guard |
| Quotes drift away mid-sentence | `Testimonials.tsx:21` | 68s marquee; the `:hover` pause does not exist on touch |
| Touch targets under 44px | `Nav.tsx:46`, `Projects.tsx:130`, `Contact.tsx:47` | Menu button 40px, project link pill ~33px, social pills ~40px |
| `100vh` lies on mobile | `Hero.tsx:9` | `min-h-screen` jumps when the URL bar collapses |
| Overflow masked rather than fixed | `globals.css:24` | `overflow-x: hidden` |
| No safe-area handling | `layout.tsx` | No `viewport-fit=cover`, no `env(safe-area-inset-*)` |
| Primary CTA buried | `Nav.tsx:67` | "Let's talk" exists only inside the hamburger; nothing in the thumb zone |

Total mobile page length is roughly 16,000px — about 20 screens.

## Approach

Mobile-first rewrite in a single codebase. Base styles become the mobile
design; the existing desktop design is layered back on at `md:` and `xl:`.

### The core invariant

**Every mobile-specific value gets an `md:` counterpart restoring today's exact
value.**

```
base (0-719px)  ->  the new mobile design
md:  (720px+)   ->  today's values, verbatim
xl:  (1180px+)  ->  today's desktop layout, untouched
```

This makes the desktop guarantee mechanical rather than a matter of care:
anything at or above 720px computes to what it computes to today. It is
verifiable by inspection — every new base utility must have an `md:` twin.

Rejected alternatives:

- **Separate `components/mobile/*` tree.** Total freedom on mobile, but two
  copies of every section forever, and either both DOMs ship or a client-side
  switch costs SEO and LCP.
- **Targeted fixes only.** Smaller diff, but mobile stays a narrower desktop.
  Fixes the broken, not the awful.

## New components

### `components/ExpandableText.tsx`

Client component. Renders the project description with `line-clamp-4` and a
"Read more" toggle below 720px; unclamped with no toggle at 720px and up.

```
<p id={id} className="line-clamp-4 md:line-clamp-none ...">{children}</p>
<button className="md:hidden" aria-expanded={open} aria-controls={id}>
```

Full text is always in the server-rendered DOM, so search engines index every
word. `id` is derived from the project `num`.

A pure-CSS `<details>` version was considered and rejected: it requires the
whole description to live inside a `<summary>`, which assistive technology
announces as a button on desktop. Twenty-five lines of client code buys correct
semantics at both sizes.

### `components/MobileCta.tsx`

Client component. A sticky bar pinned to the bottom of the viewport carrying
the primary "Let's talk" action, inside the thumb zone.

- One `IntersectionObserver` watching two targets: `#top` and `#contact`.
- Visible when the hero has left the viewport **and** Contact has not entered.
  Hiding it over Contact avoids covering the thing it points at.
- `lg:hidden` — at 900px the header CTA appears and the bar is redundant.
- 48px target, `backdrop-blur`, top border,
  `padding-bottom: env(safe-area-inset-bottom)`.

## Component changes

### `Hero.tsx`

- Portrait becomes a 64px rounded avatar inline with the status badge; badge
  text splits onto two lines beside it rather than wrapping under it.
- Headline `text-[clamp(34px,9vw,48px)] md:text-[clamp(48px,6.4vw,96px)]` —
  resolves to ~35px at 393px instead of pinning to the 48px floor.
- Tagline `text-[16.5px] leading-[1.6] md:text-[19.5px]`.
- CTAs stack full-width at 52px each; `md:` restores the inline row.
- `min-h-screen` -> `min-h-[100svh]`. `svh` is the correct unit for a hero: it
  guarantees fit with the address bar showing, and unlike `dvh` it does not
  change value mid-scroll.
- `pt-[120px]` -> `pt-[92px] pb-14 md:pt-[120px] md:pb-0`.
- Background glow 900px -> 520px with reduced blur below 720px. A 900px blurred
  radial is pure GPU cost on a phone.
- Proof row `text-[12px] gap-x-4 gap-y-2`.

**Duplicate portrait `<Image>`.** The avatar and the desktop card sit in
structurally different parents, so CSS cannot reposition one element into the
other. Two `<Image>` elements ship. To stop the phone downloading the 400px
portrait for an element it never displays, the desktop card takes
`sizes="(max-width: 899px) 1px, 400px"` — a mobile viewport then selects the
smallest srcset entry (~2KB). The avatar takes `sizes="64px"` and keeps
`priority`.

Target: ~1170px -> ~640px.

### `Nav.tsx`

- Header `h-[60px] md:h-[72px]`, plus `padding-top: env(safe-area-inset-top)`.
- Menu button 40px -> 44px (`h-11 w-11`).
- The dropdown becomes a full-screen sheet:
  - `fixed inset-0 h-[100svh]`, own 44px close button.
  - Body scroll lock via `position: fixed; top: -${scrollY}px`, restored on
    close with `window.scrollTo({ top: y, behavior: "instant" })`. `instant` is
    required because `html` carries `scroll-behavior: smooth`.
  - Escape closes. Focus moves to the close button on open and returns to the
    menu button on close.
  - Numbered rows (`01 About` … `05 References`) at 56px, 22px display type.
  - Email and social links pinned to the bottom of the sheet.
- **Link activation ordering.** Anchor clicks must not race the scroll
  restore. Handle explicitly: `preventDefault`, close the sheet (which restores
  scroll position), then `requestAnimationFrame(() =>
  document.querySelector(href)?.scrollIntoView())`.

### `Projects.tsx`

- Media ratio: base `aspect-[4/3]`, `md:aspect-[16/10]`, `xl:aspect-[21/9]`
  for the lead card. The lead screenshot goes from 151px to 265px tall. Plate
  cards keep today's `RATIO_XL` auto-height behaviour below `xl`.
- **External link relocation.** The anchor moves out of the media overlay and
  into the card body, after the stack chips, as a full-width 48px row. At `md:`
  it returns to `absolute right-4 top-4` — anchored to the `<article>` (which
  gains `relative`) rather than the media div. Both share the same top edge, so
  it lands in the same place. One anchor, no duplication. The chip row keeps
  `mt-auto`; the link follows it in flow on mobile and leaves flow entirely at
  `md:`.
- Descriptions wrapped in `ExpandableText`.
- Card body `px-5 pb-6 pt-5 md:px-7 md:pb-[30px] md:pt-7`.
- Title `text-[20px] md:text-[23px]`; period `text-[11px]`.
- Impact chips `text-[11.5px] px-[10px] py-[6px]`.
- Stack chips `text-[12px] md:text-[11.5px]` — raised, not lowered. 11.5px mono
  is below the readable floor on a phone.
- Section heading `text-[clamp(28px,7.5vw,36px)] md:text-[clamp(36px,4.2vw,60px)]`.
- Header row `gap-4 md:gap-10`.

Target: ~4500px -> ~1800px.

### `Experience.tsx`

- Container `pl-[22px] md:pl-[34px]`; card padding `px-0 py-5 md:px-7
  md:py-[26px]`; dot `-left-[22px] md:-left-[34px]`. Recovers ~68px of text
  width.
- Roles separated by `border-t border-line` on mobile, since card padding is
  gone; `md:border-transparent` restores today's look.
- Period and type share one line on mobile (`flex items-center gap-3`) instead
  of stacking.
- Section heading clamp as above.

### `Testimonials.tsx`

Becomes a client component (content stays static and server-rendered).

- Below 720px the track is a scroll-snap carousel: outer `overflow-x-auto
  md:overflow-hidden`, `snap-x snap-mandatory md:snap-none`, `scroll-px-5`,
  `overscroll-behavior-x: contain` (stops iOS back-swipe hijacking), scrollbar
  hidden.
- Cards `w-[85vw] max-w-[340px] snap-start shrink-0 md:w-[min(420px,82vw)]`.
- The duplicated half of the array takes `hidden md:flex`. Those figures are
  already `aria-hidden`; mobile swipes 4 cards, not 8.
- Dot indicators derived from a scroll listener on the track; `md:hidden`.
- `.marquee-track-slow` animation disabled below 720px via a media query in
  `theme.css` — the class is plain CSS, so it cannot take a Tailwind variant.
- The edge mask is split into two classes: `.marquee-mask` (all widths, used by
  `Ticker`) and `.marquee-mask-md` (720px and up, used here). A mask over a
  scroll container hides the leading card's edge on mobile.

### `Contact.tsx`

- Email button full-width `justify-between`, `text-[15px] px-5 py-4`. Today's
  `inline-flex` at 17px is one long address away from overflowing, and
  `overflow-x` would clip it silently.
- Socials become `grid grid-cols-2 gap-2.5` of 48px targets; `md:flex
  md:flex-wrap` restores.
- Heading `text-[clamp(30px,8vw,38px)] md:text-[clamp(38px,5vw,68px)]`.
- Padding `px-5 pb-9 pt-8`, `rounded-[24px]`.
- Upwork card `px-5 py-6`, score `text-[42px] md:text-[54px]`.
- Both radial glows scale down below 720px.

### `About.tsx`

- Lead `text-[clamp(21px,5.5vw,24px)] md:text-[clamp(24px,2.5vw,34px)]`.
- Body `text-[16.5px] leading-[1.7] md:text-[17.5px] md:leading-[1.68]`.
- Stat cards `px-4 py-5`, number `text-[26px] md:text-[32px]`, label
  `text-[12px]`.

### `Skills.tsx`

- Section heading clamp as above.
- Cards `px-5 pb-6 pt-5 rounded-[20px]`, `md:` restores.
- Stays one column on mobile. Two columns would leave ~165px per card, too
  narrow for the chip rows.

### `Ticker.tsx`

- `gap-8 md:gap-14`, `text-[13px] md:text-sm`.
- Gains `marquee-mask`, which it currently lacks — it hard-cuts at the edges.
- Keeps drifting. Nobody reads it word-for-word.

### `Footer.tsx`

- `pb-[calc(76px+env(safe-area-inset-bottom))] lg:pb-[30px]` so the sticky CTA
  bar never covers it.

## Global changes

### `app/layout.tsx`

- Add a Next `viewport` export with `viewportFit: "cover"`, `width:
  "device-width"`, `initialScale: 1`, and `themeColor: "#05070c"`. This enables
  `env(safe-area-inset-*)` and moves `themeColor` out of the raw `<meta>` tag
  into Next 16's supported API.
- Drop Space Grotesk weight 400. It is unused, and it is one more font file on
  a mobile connection.

### `app/globals.css`

| Change | Reason |
| --- | --- |
| `overflow-x: hidden` -> `overflow-x: clip` on `body` | `hidden` creates a scroll container that silently breaks `position: sticky` (used by `About`). `clip` does not. |
| `body { padding-left/right: env(safe-area-inset-left/right) }` | Landscape notch handling in one place. Fixed elements ignore body padding, so `Nav` and `MobileCta` carry their own. |
| `text-size-adjust: 100%` on `html` | Stops iOS Safari inflating text in landscape. |
| `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` on interactive elements | Removes the 300ms tap delay and the grey flash. |

### `app/theme.css`

- Wrap `.card-lift:hover`, `.card-lift:hover .shot` and `.card-lift:hover
  .chip-row > span` in `@media (hover: hover) and (pointer: fine)`. Without the
  guard, iOS latches the hover state on first tap and it stays until the user
  taps elsewhere.
- Add `:active` press states (a small `scale`/background shift) in their place
  for touch.
- `.reveal` takes a mobile `animation-range` of `entry 0% entry 60%`. The
  desktop `cover 20%` misfires on sections several screens tall.
- Add `.marquee-mask-md`, scoped to `@media (min-width: 720px)`.
- Disable `.marquee-track-slow` below 720px.

## Out of scope

- Desktop layout at 1180px and above. Unchanged.
- Content in `data/index.ts`. No rewriting, no new fields.
- A bottom tab bar. The sticky CTA covers the thumb-zone need without app
  chrome.
- `HeroCanvas.tsx`. Already correctly skipped below 900px and under
  `prefers-reduced-motion`.

## Verification

1. `npm run typecheck`, `npm run lint`, `npm run build` all clean.
2. Audit that every new base utility introduced by this work has an `md:` twin.
   This is the mechanical proof of the desktop invariant.
3. Manual check by the user at 393px and 1440px. Browser automation is not
   available in this project, so visual confirmation is a hand-off, not
   something the implementation can self-certify.

## Expected result

Roughly 16,000px to roughly 7,000px on a phone, with the value proposition
readable in the first screen and a permanent CTA in the thumb zone.
