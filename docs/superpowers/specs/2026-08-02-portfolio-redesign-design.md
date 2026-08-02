# Portfolio redesign — 2026 rebuild

**Date:** 2026-08-02
**Status:** Approved, ready for implementation planning

Replace the current portfolio's design and content with the "Portfolio 2026 v2" design
artifact, rebuilt as idiomatic Next.js + Tailwind components.

## Sources of truth

| What | Where |
|---|---|
| Visual design | `docs/design/artifact.dc.html` (the `Portfolio 2026 v2.dc.html` variant) |
| Runtime shim for the artifact | `docs/design/support.js` — open the artifact locally to compare |
| Content decisions and rationale | `docs/design/PORTFOLIO_CONTENT.md` |
| Canonical copy/data | `docs/design/portfolio-data.ts` |
| Screenshots and portrait | `~/Downloads/Senior fullstack engineer portfolio redesign (3).zip` → `assets/` |
| New CV | `~/Desktop/Personal/CV/2026-08/Omar_Derbala_Senior_Software_Engineer.pdf` |

Where the artifact and `portfolio-data.ts` disagree, the artifact wins — it is the later
document. The one such conflict is testimonials, resolved below.

## Decisions made

| Decision | Choice |
|---|---|
| Fidelity | Faithful to the artifact; free to fix responsive, a11y, and performance rough edges |
| Implementation | Rewrite components with Tailwind utilities + a small `theme.css` |
| Hero orb | Real `three` dependency, dynamically imported, desktop-only |
| Canonical domain | **derbalajr.com** |
| CV | Copy in `Omar_Derbala_Senior_Software_Engineer.pdf`; delete the old one |
| Testimonials | The artifact's four: Jalal, Bilal, Jean Pierre, Cheick Ouedraogo — "CEO at AuraKore" |

Note on the last one: the site will name AuraKore in a testimonial attribution while the
AuraKore project card stays cut. That is deliberate and accepted.

## What stays

The Next.js app shell is sound and is not touched beyond content edits:
`instrumentation.ts`, the three Sentry configs, `next.config.mjs`, `eslint.config.mjs`,
`tsconfig.json`, `postcss.config.mjs`, `app/global-error.tsx`.

## Architecture

`app/page.tsx` composes the sections in the artifact's order. Each section is one file
with one job, so a change to the project grid never touches the timeline.

```
app/
  layout.tsx          fonts, metadata, JSON-LD, <body> shell
  page.tsx            section composition
  globals.css         tailwind directives + theme.css import
  theme.css           keyframes and the effects Tailwind can't state cleanly
components/
  Nav.tsx             fixed header — logo, links, "Let's talk" CTA, mobile menu
  Hero.tsx            #top — badge, headline, CTAs, portrait card
  HeroCanvas.tsx      the Three.js orb, isolated
  Ticker.tsx          tech marquee strip
  About.tsx           01 / About — sticky rail, prose, stat counters
  Projects.tsx        02 / Selected work — mixed-span card grid
  Skills.tsx          03 / Capabilities — six-column span grid
  Experience.tsx      04 / Trajectory — timeline rail and rows
  Testimonials.tsx    05 / References — quote marquee
  Contact.tsx         06 / Contact — gradient panel, Upwork status card
  Footer.tsx          © line
data/
  index.ts            all copy and structured content
hooks/
  useCountUp.ts       IntersectionObserver-driven number animation
```

### Client/server split

Only three components need `'use client'`:

- `HeroCanvas.tsx` — WebGL
- `Nav.tsx` — mobile menu open/closed state
- `About.tsx` — the stat counters observe the viewport

Everything else renders on the server. Today all seven components are client components
because framer-motion requires it; removing framer-motion recovers that.

### Component contracts

Each section component takes no props and reads what it needs from `data/index.ts`. They
are independently renderable and independently deletable. `HeroCanvas` is the one
exception worth stating explicitly:

- **Does:** renders a rotating wireframe icosahedron with drifting particles into a
  full-bleed canvas behind the hero.
- **Used as:** `<HeroCanvas />` with no props, positioned absolutely by `Hero`.
- **Depends on:** `three`, loaded via `import('three')` after mount. Nothing else.
- **Degrades to:** rendering nothing. Callers need no fallback.

## Theme

The artifact's CSS variables become Tailwind theme tokens in `tailwind.config.ts`,
replacing the current indigo/cyan palette entirely.

```
bg           #05070c      txt          #e9f0fa      accent        #4c6fff
bg-2         #080d15      dim          #8d9aad      accent-soft   #7d95ff
panel        #0c121c      dim-2        #5d6979      teal          #24d8c4
panel-2      #101825
line         rgba(233,240,250,0.10)
line-2       rgba(233,240,250,0.18)
```

Fonts load through `next/font/google` and are self-hosted, which removes the artifact's
external `fonts.googleapis.com` request:

- `--font-display` — Space Grotesk (400/500/600/700) — headings, names, numerals
- `--font-sans` — Manrope (400/500/600/700) — body
- `--font-mono` — JetBrains Mono (400/500) — section kickers, periods, chips, footer

Radii, shadows and the section rhythm (`130px` desktop, `88px` below 720px) carry over as
Tailwind spacing/radius extensions rather than inline values.

### `theme.css`

Holds the six keyframes (`drift`, `floaty`, `pulse-dot`, `rise`, `sweep`, `grow-line`) and
four effects that read badly as utility soup:

1. The sweep-gradient headline (`background-clip: text` + animated `background-position`)
2. The masked hero grid overlay (two linear-gradients + a radial `mask-image`)
3. The three marquee track speeds, with `animation-play-state: paused` on hover
4. `.reveal` and `.rule-grow`, driven by `animation-timeline: view()`

### Motion policy

- Scroll reveals use native scroll-driven animations behind
  `@supports (animation-timeline: view())`. Where unsupported, content is simply visible —
  no JavaScript fallback, no layout shift, no flash of hidden content.
- `prefers-reduced-motion: reduce` stops the marquees, the floating portrait, and prevents
  the orb from loading at all.
- The orb loads only when the viewport is ≥900px wide and motion is not reduced, and its
  render loop stops when the hero scrolls out of view.

## Content

`data/index.ts` is rewritten from `docs/design/portfolio-data.ts`, extended with the
fields the new layout needs. Every string comes from the artifact.

**Exports:** `navItems`, `heroData`, `about`, `stats`, `projects`, `skills`, `roles`,
`testimonials`, `ticker`, `contact`.

**Anchor IDs follow the artifact, not `portfolio-data.ts`.** The data file's `navItems`
point at `#projects` / `#skills` / `#experience`; the artifact's sections are `#top`,
`#work`, `#stack`, `#path`, `#words`, `#contact`, and the nav labels are Work, Stack,
Experience, References. The artifact wins on both the IDs and the labels.

**Projects** — seven, in this order, each carrying layout metadata:

| # | Project | Span | Ratio | Image |
|---|---|---|---|---|
| 01 | The Address Investments | 2 | 21/9 | `the_address.webp` |
| 02 | Akaza Travel | 1 | 16/10 | `akaza.webp` |
| 03 | Rahwan Shipping | 1 | 16/10 | `rahwan.webp` |
| 04 | Egyptian Customs Authority | 1 | 16/10 | `customs.webp` |
| 05 | Egyptian Government Digital Transformation | 1 | 24/5 | none — plate only |
| 06 | Welhof | 1 | 16/10 | `welhof.webp` |
| 07 | Delecato | 1 | 16/10 | `delecato.webp` |

Each also carries `subject`, `role`, `period`, `description`, `impact[]`, `stack[]`,
optional `link`/`linkLabel`, `plateTitle`, `shot`, and `fit`.

**Skills** — six groups with column spans: Backend (3), Frontend (3), Data (2),
Architecture (4), DevOps (3), Integrations (3).

**Roles** — five, most recent first, ending with the dual-degree education entry.

**Testimonials** — four, as decided above.

### The project card plate

A typographic plate — `plateTitle` set large, plus a mono `shot` caption over a diagonal
hatch — renders as the card's image layer. When a screenshot exists, it fades in over the
plate on load. When it doesn't (project 05), the plate is what ships, which reads as
discretion about internal government systems rather than a missing asset.

The artifact gates this on `naturalWidth >= 600` because its own placeholders were
low-resolution. We ship real assets, so the check is dropped: fade in on `load`, keep the
plate on `error`.

## Assets

Convert the zip's `assets/` to WebP with `cwebp` and place in `public/`. These replace the
existing files of the same name — the new screenshots are more recent.

| Source | Destination |
|---|---|
| `assets/the_address.png` | `public/the_address.webp` |
| `assets/akaza.png` | `public/akaza.webp` |
| `assets/rahwan.png` | `public/rahwan.webp` |
| `assets/customs.png` | `public/customs.webp` |
| `assets/delecato.png` | `public/delecato.webp` |
| `assets/welhof.webp` | `public/welhof.webp` (copy, already WebP) |
| `assets/omar.png` | `public/omar.webp` (hero portrait) |

The source PNGs run 0.4–6.7 MB. Downscale before conversion rather than shipping them
raw: `cwebp -q 82 -resize 1600 0` for the screenshots, `-resize 900 0` for the portrait.
Screenshots then render through `next/image` with explicit `sizes` so the browser picks an
appropriate variant. Target: no single asset over ~250 KB.

**Added:** `public/Omar_Derbala_Senior_Software_Engineer.pdf`, copied from
`~/Desktop/Personal/CV/2026-08/`.

**Deleted:** `public/Omar_Derbala_Senior_Backend.pdf`, `public/aurakore.webp`,
`public/pixsouk.webp`, `public/giantrex.png`, `public/omar-nobg.webp` — all unreferenced
after the rewrite.

**Kept:** `public/favicon.ico`, and `public/omar-new.webp` as the Open Graph image.

## Metadata and SEO

In `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`:

- Every `omarderbala.com` becomes `derbalajr.com` — `metadataBase`, `alternates.canonical`,
  the three JSON-LD `@id`s, `Person.url`, `Person.image`, and the sitemap URL.
- Title: `Omar Derbala — Senior Full Stack Engineer | Laravel & Next.js`
- Description: *"Senior full stack engineer building enterprise ERP, CRM and booking
  platforms in Laravel, PostgreSQL and Next.js. Top Rated on Upwork."*
- `worksFor` → **The Address Investments**
- `knowsAbout` and `keywords` drop Django, Python, and Kubernetes. MySQL stays — Customs,
  Welhof and the government systems genuinely used it.
- `theme-color` → `#05070c`
- Open Graph and Twitter descriptions restate the new positioning; images unchanged.
- `sameAs` unchanged.

## Dependencies

**Add:** `three` (+ `@types/three` as a dev dependency).

**Remove:** `framer-motion`.

**Keep:** `lucide-react` — still used for the mobile menu's `Menu`/`X`. Every other icon in
the artifact is a typographic glyph (`↓ ↗ → ★ ◷ ◉ ✦`), not an icon component.

## Removals

- `hooks/useMousePosition.ts` — the hero's cursor-tracking effect is gone from the design.
- The `.aurora-bg` and `.noise-overlay` rules in `globals.css`, and the two elements in
  `layout.tsx` that mount them. The new design's atmosphere comes from the hero's radial
  gradients, masked grid, and orb.
- All seven current component bodies, replaced wholesale.

## Responsive behaviour

Breakpoints follow the artifact, expressed as Tailwind variants rather than `!important`
media overrides:

- **≤1180px** — project grid collapses to one column and spans reset; skills grid to two
  columns; timeline rows stack; contact panel to one column; about rail unsticks.
- **≤900px** — hero stacks with the portrait first at 300px; stat grid to two columns;
  quote cards to `min(420px, 82vw)`.
- **≤720px** — horizontal padding drops to 20px; skills grid to one column; section
  rhythm drops to 88px; footer stacks.

**Deviation from the artifact:** at ≤900px the artifact hides the nav links outright,
leaving only the CTA. We add a proper mobile menu instead — the `Menu`/`X` toggle opening a
full-width panel with the four links and the CTA.

## Verification

1. `npm run build` completes with no errors and no new warnings.
2. `npm run lint` is clean.
3. `npm run dev`, then drive the site in Chrome at 1440px, 1180px, 900px and 390px,
   comparing against `docs/design/artifact.dc.html` opened side by side.
4. Confirm at 390px: no horizontal scroll, the mobile menu opens and closes, and the orb
   never loads (check the network panel for a `three` chunk).
5. Confirm with `prefers-reduced-motion: reduce` forced: marquees static, portrait still,
   no orb.
6. Confirm every project screenshot loads and every external link resolves —
   akazatravel.com, rahwan.co, customs.gov.eg, delecato.de.
7. Confirm `/Omar_Derbala_Senior_Software_Engineer.pdf` downloads.
8. View source and confirm the JSON-LD block contains no `omarderbala.com`, no Django, no
   Kubernetes, and reads "The Address Investments".

## Out of scope

- Any new page or route. This stays a single-page site.
- A new Open Graph image. `omar-new.webp` continues to serve.
- Analytics, a contact form, or a CMS.
- Touching the Sentry setup.
