# Portfolio 2026 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's design and content with the "Portfolio 2026 v2" design artifact, rebuilt as Tailwind-styled Next.js components.

**Architecture:** Ten section components under `components/`, each owning one region of a single-page site and reading its content from `data/index.ts`. Only three are client components — the hero's WebGL canvas, the nav's mobile menu, and the About stat counters. Everything else renders on the server. The artifact's CSS variables become Tailwind theme tokens; six keyframes and four effects Tailwind can't express live in `app/theme.css`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, `three` (dynamically imported), `lucide-react`, `@sentry/nextjs`.

## Global Constraints

- **Design reference:** `docs/design/artifact.dc.html`. Open it in a browser alongside `support.js` to compare. Where this plan and the artifact disagree on a pixel value, the artifact wins; where they disagree on behaviour, this plan wins.
- **Spec:** `docs/superpowers/specs/2026-08-02-portfolio-redesign-design.md`.
- **Canonical domain:** `derbalajr.com`. No `omarderbala.com` may survive anywhere in the repo.
- **Content:** every user-visible string comes from the artifact's data constants (`docs/design/artifact.dc.html:369-470`) or its markup. Do not paraphrase, re-word, or "improve" copy.
- **Banned terms:** Django, Python, Kubernetes, Unity, WordPress, jQuery, Bootstrap must not appear in any user-visible text, metadata, keyword list, or JSON-LD. MySQL is allowed and correct.
- **Company name:** "The Address Investments" — never "The Address Holding".
- **Anchor IDs:** `#top`, `#work`, `#stack`, `#path`, `#words`, `#contact`. Nav labels: Work, Stack, Experience, References.
- **Breakpoints:** Tailwind `screens` are redefined to `sm: 480px`, `md: 720px`, `lg: 900px`, `xl: 1180px`, `2xl: 1400px` to match the artifact's media queries. All layout variants are mobile-first against those values.
- **`typescript.ignoreBuildErrors` is `true` in `next.config.mjs`,** so `npm run build` does NOT catch type errors. Every task that touches TypeScript must run `npx tsc --noEmit` separately.
- **No test framework exists in this project and this plan does not add one.** Per-task verification is: `npx tsc --noEmit`, `npm run lint`, `npm run build`, and a browser check of the specific section against the artifact. Do not scaffold Jest, Vitest, or Playwright.
- **Commit after every task.** Work happens on the `redesign-2026` branch. Do not push.

---

## File Structure

**Created:**

| File | Responsibility |
|---|---|
| `app/theme.css` | Keyframes and the effects Tailwind can't express |
| `components/Ticker.tsx` | Tech marquee strip under the hero |
| `components/About.tsx` | `01 / About` — rail, prose, stat counters |
| `components/Contact.tsx` | `06 / Contact` — gradient panel, Upwork card |
| `components/HeroCanvas.tsx` | The Three.js orb, isolated |
| `hooks/useCountUp.ts` | IntersectionObserver-driven number animation |

**Rewritten wholesale:**

`app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/sitemap.ts`, `app/robots.ts`, `tailwind.config.ts`, `data/index.ts`, and all seven existing components (`Nav`, `Hero`, `Projects`, `Skills`, `Experience`, `Testimonials`, `Footer`).

**Deleted:** `hooks/useMousePosition.ts`, `public/Omar_Derbala_Senior_Backend.pdf`, `public/aurakore.webp`, `public/pixsouk.webp`, `public/giantrex.png`, `public/omar-nobg.webp`.

**Untouched:** `instrumentation.ts`, the three `sentry.*.config.ts` files, `app/global-error.tsx`, `eslint.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `README.md`.

---

## Task 1: Assets and CV

Convert the design artifact's screenshots to WebP, install the new CV, and remove the files the rewrite orphans. No code changes, so the build stays green throughout.

**Files:**
- Create: `public/the_address.webp`, `public/akaza.webp`, `public/rahwan.webp`, `public/customs.webp`, `public/delecato.webp`, `public/welhof.webp`, `public/omar.webp`, `public/Omar_Derbala_Senior_Software_Engineer.pdf`
- Delete: `public/Omar_Derbala_Senior_Backend.pdf`, `public/aurakore.webp`, `public/pixsouk.webp`, `public/giantrex.png`, `public/omar-nobg.webp`

**Interfaces:**
- Consumes: nothing.
- Produces: the seven image paths above, referenced by `data/index.ts` in Task 4 and by `Hero.tsx` in Task 6. `public/omar.webp` is 864×1184. `public/omar-new.webp` is untouched and stays the Open Graph image.

- [ ] **Step 1: Extract the design zip to a working directory**

```bash
mkdir -p /tmp/redesign-src
unzip -o "$HOME/Downloads/Senior fullstack engineer portfolio redesign (3).zip" -d /tmp/redesign-src
ls -la /tmp/redesign-src/assets
```

Expected: seven files — `akaza.png`, `customs.png`, `delecato.png`, `omar.png`, `rahwan.png`, `the_address.png`, `welhof.webp`.

- [ ] **Step 2: Convert the six screenshots to WebP at 1600px wide**

`cwebp` is already installed at `/opt/homebrew/bin/cwebp`. All six sources are at least 1828px wide, so `-resize 1600 0` always downscales.

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
for n in the_address akaza rahwan customs delecato; do
  cwebp -q 82 -resize 1600 0 "/tmp/redesign-src/assets/$n.png" -o "public/$n.webp"
done
cwebp -q 82 -resize 1600 0 "/tmp/redesign-src/assets/welhof.webp" -o "public/welhof.webp"
```

- [ ] **Step 3: Convert the portrait without resizing**

`omar.png` is only 864px wide. Resizing to 900 would upscale it, so convert at native size — this is a deliberate deviation from the spec's `-resize 900 0`.

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
cwebp -q 85 /tmp/redesign-src/assets/omar.png -o public/omar.webp
```

- [ ] **Step 4: Verify every asset is under 250 KB**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
ls -lS public/*.webp | awk '{print $5, $9}'
```

Expected: seven `.webp` files plus `omar-new.webp`, none larger than 256000 bytes. If any exceeds it, re-run that file's conversion with `-q 72`.

- [ ] **Step 5: Install the new CV and remove the old one**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
cp "$HOME/Desktop/Personal/CV/2026-08/Omar_Derbala_Senior_Software_Engineer.pdf" public/
git rm -q public/Omar_Derbala_Senior_Backend.pdf
ls -la public/*.pdf
```

Expected: only `Omar_Derbala_Senior_Software_Engineer.pdf` remains.

- [ ] **Step 6: Delete the orphaned images**

`aurakore.webp` and `pixsouk.webp` back projects cut from the site. `giantrex.png` is unreferenced. `omar-nobg.webp` is replaced by `omar.webp`.

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
git rm -q public/aurakore.webp public/pixsouk.webp public/giantrex.png public/omar-nobg.webp
grep -rn "aurakore\|pixsouk\|giantrex\|omar-nobg\|Senior_Backend" app components data 2>/dev/null
```

Expected from the grep: matches only in `data/index.ts` and `components/Hero.tsx`, which Tasks 4 and 6 replace. Note them and move on.

- [ ] **Step 7: Verify the build still passes**

Run: `npm run build`
Expected: build completes. The site still renders the old design — that is correct at this point.

- [ ] **Step 8: Commit**

```bash
git add public/
git commit -m "assets: bring in 2026 design screenshots, portrait and CV

Convert the design artifact's screenshots to WebP at 1600px/q82 and the
portrait at native 864px. Install the new CV and drop the images for the
AuraKore and PixSouk projects, which the redesign cuts."
```

---

## Task 2: Foundation — dependencies, theme tokens, stylesheets, blank shell

Swap `framer-motion` for `three`, replace the Tailwind theme with the artifact's tokens, write `theme.css`, and strip the page down to an empty shell. Demolition belongs in this task because removing `framer-motion` breaks all seven existing components at once — there is no smaller change that leaves the build green.

**Files:**
- Modify: `package.json`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `next.config.mjs`
- Create: `app/theme.css`
- Delete: `components/Nav.tsx`, `components/Hero.tsx`, `components/Projects.tsx`, `components/Skills.tsx`, `components/Experience.tsx`, `components/Testimonials.tsx`, `components/Footer.tsx`, `hooks/useMousePosition.ts`, `data/index.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the Tailwind token names every later task uses — colors `bg`, `bg-2`, `panel`, `panel-2`, `line`, `line-2`, `txt`, `dim`, `dim-2`, `accent`, `accent-soft`, `teal`; font families `font-display`, `font-sans`, `font-mono`; animations `animate-pulse-dot`; screens `sm/md/lg/xl/2xl` at `480/720/900/1180/1400px`. Also the `theme.css` class names `reveal`, `rule-grow`, `marquee`, `marquee-track`, `marquee-track-slow`, `marquee-mask`, `floater`, `sweep-text`, `hero-grid-overlay`, `card-lift`, `shot`, `chip-row`.

- [ ] **Step 1: Swap the dependencies**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
npm uninstall framer-motion
npm install three
npm install --save-dev @types/three
```

- [ ] **Step 2: Drop framer-motion from the Next config**

In `next.config.mjs`, change the `experimental` block:

```js
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
```

- [ ] **Step 3: Replace the Tailwind theme**

Overwrite `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    // Replaced, not extended — these mirror the artifact's media queries.
    screens: {
      sm: "480px",
      md: "720px",
      lg: "900px",
      xl: "1180px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        bg: { DEFAULT: "#05070c", "2": "#080d15" },
        panel: { DEFAULT: "#0c121c", "2": "#101825" },
        line: {
          DEFAULT: "rgba(233,240,250,0.10)",
          "2": "rgba(233,240,250,0.18)",
        },
        txt: "#e9f0fa",
        dim: { DEFAULT: "#8d9aad", "2": "#5d6979" },
        accent: { DEFAULT: "#4c6fff", soft: "#7d95ff" },
        teal: "#24d8c4",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Write `app/theme.css`**

Create `app/theme.css`:

```css
/* Effects the artifact defines that don't read well as Tailwind utilities.
   Keyframes bound to animation-timeline live here rather than in the Tailwind
   config, because Tailwind's animation shorthand can't express them. */

@keyframes rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: none; }
}
@keyframes grow-line {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes drift {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
@keyframes sweep {
  from { background-position: 200% 50%; }
  to { background-position: -100% 50%; }
}

.marquee-track { animation: drift 42s linear infinite; }
.marquee-track-slow { animation: drift 68s linear infinite; }
.marquee:hover .marquee-track,
.marquee:hover .marquee-track-slow { animation-play-state: paused; }

.marquee-mask {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.hero-grid-overlay {
  background-image:
    linear-gradient(rgba(233, 240, 250, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(233, 240, 250, 0.028) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 30% 40%, #000 10%, transparent 72%);
  mask-image: radial-gradient(ellipse 80% 70% at 30% 40%, #000 10%, transparent 72%);
}

.sweep-text {
  background: linear-gradient(96deg, #7d95ff, #24d8c4 55%, #7d95ff);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sweep 9s linear infinite;
}

.card-lift {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.35s ease, background-color 0.35s ease;
}
.card-lift:hover {
  transform: translateY(-6px);
  border-color: rgba(233, 240, 250, 0.18);
  background-color: #101825;
}
.shot {
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease;
}
.card-lift:hover .shot { transform: scale(1.05); filter: saturate(1.1); }
.chip-row > span { transition: border-color 0.3s ease, color 0.3s ease; }
.card-lift:hover .chip-row > span { border-color: rgba(233, 240, 250, 0.18); }

@media (prefers-reduced-motion: reduce) {
  .marquee-track,
  .marquee-track-slow,
  .floater,
  .sweep-text { animation: none !important; }
  .card-lift, .shot { transition: none; }
  .card-lift:hover { transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  .floater { animation: floaty 7s ease-in-out infinite; }

  /* Native scroll-driven animation. Where unsupported, content is simply
     visible — no JS fallback, no flash of hidden content. */
  @supports (animation-timeline: view()) {
    .reveal {
      animation: rise linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 20%;
    }
    .rule-grow {
      animation: grow-line linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 26%;
      transform-origin: left;
    }
  }
}
```

- [ ] **Step 5: Replace `app/globals.css`**

Overwrite it. The `@import` must come first so Tailwind utilities can override `theme.css` classes on conflict.

```css
@import "./theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background: #05070c;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }

  body {
    @apply bg-bg font-sans text-txt;
    text-wrap: pretty;
    overflow-x: hidden;
  }

  ::selection { background: rgba(76, 111, 255, 0.35); }

  :focus-visible {
    outline: 2px solid #4c6fff;
    outline-offset: 3px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #05070c; }
  ::-webkit-scrollbar-thumb { background: #1b2536; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #27334a; }
}
```

- [ ] **Step 6: Swap the fonts in `app/layout.tsx`**

Replace the font imports and constants at the top of the file, and the `<html>`/`<body>` element. Leave the `metadata` object and the JSON-LD schemas alone — Task 3 handles those.

```tsx
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
```

Then replace the returned JSX's `<html>` and `<body>` — dropping the `.aurora-bg` div and the `noise-overlay` class, and updating `theme-color`:

```tsx
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#05070c" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personSchema,
              websiteSchema,
              profilePageSchema,
            ]),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
```

- [ ] **Step 7: Reduce `app/page.tsx` to an empty shell**

Overwrite it. Sections get added back one per task from Task 5 onward.

```tsx
export default function Home() {
  return <div className="relative min-h-screen bg-bg" />;
}
```

- [ ] **Step 8: Delete the old components, hook, and data**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
git rm -q components/Nav.tsx components/Hero.tsx components/Projects.tsx \
  components/Skills.tsx components/Experience.tsx components/Testimonials.tsx \
  components/Footer.tsx hooks/useMousePosition.ts data/index.ts
```

- [ ] **Step 9: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean. `tsc` matters most here — `next.config.mjs` sets `ignoreBuildErrors: true`, so the build alone proves nothing about types.

- [ ] **Step 10: Verify the shell in a browser**

Run `npm run dev`, open `http://localhost:3000`, and confirm: a blank page with background `#05070c`, no console errors, and no network request to `fonts.googleapis.com` (the fonts are self-hosted by `next/font`).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: swap in the 2026 design foundation

Replace the Tailwind theme with the artifact's palette, type scale and
breakpoints; add theme.css for the keyframes and scroll-driven effects;
swap Inter/JetBrains for Space Grotesk/Manrope/JetBrains Mono.

Drop framer-motion for three, and clear out the old components, hook and
data so the tree builds while the new sections land one at a time."
```

---

## Task 3: Metadata, JSON-LD, sitemap and robots

Move every canonical URL to `derbalajr.com`, correct the employer, and purge the banned technologies from metadata.

**Files:**
- Modify: `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`

**Interfaces:**
- Consumes: the `<html>`/`<body>` shell from Task 2.
- Produces: nothing other tasks import.

- [ ] **Step 1: Replace the `metadata` export in `app/layout.tsx`**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://derbalajr.com"),
  title: {
    default: "Omar Derbala — Senior Full Stack Engineer | Laravel & Next.js",
    template: "%s | Omar Derbala",
  },
  description:
    "Senior full stack engineer building enterprise ERP, CRM and booking platforms in Laravel, PostgreSQL and Next.js. Top Rated on Upwork.",
  keywords: [
    "Omar Derbala",
    "Omar Derbala portfolio",
    "Full Stack Engineer",
    "Senior Full Stack Engineer",
    "Senior Software Engineer",
    "Laravel Developer",
    "Laravel Expert",
    "Next.js Developer",
    "React Developer",
    "PHP Developer",
    "Backend Engineer",
    "ERP Developer",
    "CRM Developer",
    "Enterprise Software Engineer",
    "Domain-Driven Design",
    "Clean Architecture",
    "Microservices",
    "PostgreSQL",
    "TypeScript",
    "Docker",
    "Shopify App Developer",
    "Egypt Developer",
    "Cairo Developer",
    "Remote Full Stack Engineer",
    "Hire Full Stack Developer",
    "Flutter Developer",
    "Multi-tenant SaaS",
  ],
  authors: [{ name: "Omar Derbala", url: "https://derbalajr.com" }],
  creator: "Omar Derbala",
  publisher: "Omar Derbala",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://derbalajr.com",
    title: "Omar Derbala — Senior Full Stack Engineer",
    description:
      "Enterprise ERP, CRM and booking platforms in Laravel, PostgreSQL and Next.js. Currently on a multi-tenant ERP used by 6,000+ employees.",
    siteName: "Omar Derbala — Portfolio",
    images: [
      {
        url: "/omar-new.webp",
        width: 1200,
        height: 630,
        alt: "Omar Derbala — Senior Full Stack Engineer specializing in Laravel and Next.js",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Derbala — Senior Full Stack Engineer",
    description:
      "I build the systems companies run on. Laravel and PostgreSQL on the backend, React and Next.js on the front.",
    images: ["/omar-new.webp"],
  },
  alternates: {
    canonical: "https://derbalajr.com",
  },
};
```

- [ ] **Step 2: Replace the three JSON-LD schemas in `app/layout.tsx`**

```tsx
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://derbalajr.com/#person",
  name: "Omar Derbala",
  givenName: "Omar",
  familyName: "Derbala",
  url: "https://derbalajr.com",
  image: "https://derbalajr.com/omar-new.webp",
  email: "derbalajr@gmail.com",
  telephone: "+201111293179",
  jobTitle: "Senior Full Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "The Address Investments",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  nationality: {
    "@type": "Country",
    name: "Egypt",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Arab Open University",
      address: { "@type": "PostalAddress", addressCountry: "EG" },
    },
    {
      "@type": "CollegeOrUniversity",
      name: "The Open University",
      address: { "@type": "PostalAddress", addressCountry: "GB" },
    },
  ],
  knowsAbout: [
    "PHP",
    "Laravel",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Flutter",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Domain-Driven Design",
    "Clean Architecture",
    "Microservices",
    "Multi-tenant SaaS",
    "ERP Systems",
    "CRM Systems",
    "Shopify",
    "Stripe",
  ],
  sameAs: [
    "https://www.linkedin.com/in/derbalajr/",
    "https://github.com/derbalajr",
    "https://gitlab.com/derbalajr",
    "https://www.upwork.com/freelancers/derbalajr",
  ],
  description:
    "Senior Full Stack Engineer with four years of experience building enterprise ERP/CRM platforms, booking systems and national digital transformation projects.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://derbalajr.com/#website",
  name: "Omar Derbala — Senior Full Stack Engineer",
  url: "https://derbalajr.com",
  description:
    "Portfolio of Omar Derbala, Senior Full Stack Engineer specializing in Laravel, PostgreSQL and Next.js.",
  author: { "@id": "https://derbalajr.com/#person" },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://derbalajr.com/#profilepage",
  name: "Omar Derbala Portfolio",
  url: "https://derbalajr.com",
  mainEntity: { "@id": "https://derbalajr.com/#person" },
  dateCreated: "2024-01-01",
  dateModified: "2026-08-02",
};
```

Note `dateModified` is now a literal. The old `new Date().toISOString()` made the rendered HTML change on every build for no SEO benefit.

- [ ] **Step 3: Update `app/sitemap.ts`**

Change one line:

```ts
  const baseUrl = "https://derbalajr.com";
```

- [ ] **Step 4: Update `app/robots.ts`**

Change one line:

```ts
    sitemap: "https://derbalajr.com/sitemap.xml",
```

- [ ] **Step 5: Verify nothing references the old domain or a banned term**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
grep -rn "omarderbala\.com" app components data 2>/dev/null
grep -rniE "django|kubernetes|\bpython\b|address holding" app components data 2>/dev/null
```

Expected: both produce no output.

- [ ] **Step 6: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 7: Verify the rendered head**

Run `npm run dev`, then:

```bash
curl -s http://localhost:3000 | grep -o 'derbalajr.com' | wc -l
curl -s http://localhost:3000 | grep -c 'The Address Investments'
```

Expected: the first is greater than zero; the second is `1`.

- [ ] **Step 8: Commit**

```bash
git add app/
git commit -m "seo: move canonical metadata to derbalajr.com

Update metadataBase, canonical, Open Graph, sitemap and robots to the
live domain. Correct the employer to The Address Investments and drop
Django, Python and Kubernetes from knowsAbout and the keyword list."
```

---

## Task 4: Content — `data/index.ts`

Every string on the site, typed. Nothing renders it yet; this task's deliverable is a file that typechecks and that later tasks import.

**Files:**
- Create: `data/index.ts`

**Interfaces:**
- Consumes: the image paths from Task 1.
- Produces: the exports every section component imports —
  - `navItems: NavItem[]` where `NavItem = { name: string; link: string }`
  - `heroData: { badge: string; headline: string[]; headlineAccent: string; tagline: string; proof: string[]; portrait: { src: string; width: number; height: number; alt: string }; cta: { primary: { text: string; link: string }; secondary: { text: string; link: string } } }`
  - `ticker: string[]`
  - `about: { kicker: string; lead: string; body: string[] }`
  - `stats: Stat[]` where `Stat = { value: string; display: string; label: string }`
  - `projects: Project[]` (type below)
  - `skills: SkillGroup[]` where `SkillGroup = { title: string; num: string; span: 2 | 3 | 4; items: string[] }`
  - `roles: Role[]` where `Role = { period: string; type: string; title: string; company: string; description: string; stack: string[] }`
  - `testimonials: Testimonial[]` where `Testimonial = { quote: string; initials: string; name: string; title: string }`
  - `contact: { kicker: string; heading: string[]; blurb: string; email: string; socials: { name: string; url: string }[]; upwork: { kicker: string; score: string; scoreLabel: string; facts: string[] } }`
  - `footer: { left: string; right: string }`

- [ ] **Step 1: Create `data/index.ts`**

Every string below is copied verbatim from `docs/design/artifact.dc.html`. Do not re-word.

```ts
// All site copy. Sourced verbatim from the "Portfolio 2026 v2" design
// artifact — see docs/design/artifact.dc.html and the decision log in
// docs/design/PORTFOLIO_CONTENT.md.

export type NavItem = { name: string; link: string };

export type Stat = { value: string; display: string; label: string };

export type Project = {
  num: string;
  name: string;
  subject: string;
  role: string;
  period: string;
  description: string;
  impact: string[];
  stack: string[];
  link?: string;
  linkLabel?: string;
  /** Omitted where no shareable screenshot exists; the plate ships instead. */
  image?: string;
  /** CSS object-position for the screenshot. */
  fit: string;
  /** Large type shown on the card's plate, under the screenshot. */
  plateTitle: string;
  /** Mono caption on the plate. */
  shot: string;
  span: 1 | 2;
  ratio: "21/9" | "16/10" | "24/5";
};

export type SkillGroup = {
  title: string;
  num: string;
  span: 2 | 3 | 4;
  items: string[];
};

export type Role = {
  period: string;
  type: string;
  title: string;
  company: string;
  description: string;
  stack: string[];
};

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  title: string;
};

export const navItems: NavItem[] = [
  { name: "Work", link: "#work" },
  { name: "Stack", link: "#stack" },
  { name: "Experience", link: "#path" },
  { name: "References", link: "#words" },
];

export const heroData = {
  badge: "Senior Full Stack Engineer · Cairo · Remote",
  headline: ["I build the", "systems companies"],
  headlineAccent: "run on.",
  tagline:
    "Laravel and PostgreSQL on the backend, React and Next.js on the front. Currently on a multi-tenant ERP used by 6,000+ employees.",
  proof: ["★ Top Rated on Upwork", "100% Job Success", "4+ yrs in production"],
  portrait: {
    src: "/omar.webp",
    width: 864,
    height: 1184,
    alt: "Omar Derbala",
  },
  cta: {
    primary: { text: "View projects", link: "#work" },
    secondary: {
      text: "Download CV",
      link: "/Omar_Derbala_Senior_Software_Engineer.pdf",
    },
  },
};

export const ticker: string[] = [
  "Laravel",
  "PostgreSQL",
  "Next.js",
  "React",
  "TypeScript",
  "Redis",
  "Octane",
  "Docker",
  "Shopify",
  "Stripe",
  "Flutter",
  "Node.js",
  "GraphQL",
  "DDD",
];

export const about = {
  kicker: "01 / About",
  lead: "Four years building Laravel systems that businesses actually depend on — ERPs, CRMs, booking platforms, marketplaces.",
  body: [
    "Most of my week goes to a multi-tenant ERP/CRM used by 6,000+ employees, where I work on both the Laravel backend and the Next.js front end rather than throwing an API over the wall. The rest goes to Giantrex, a games and VR studio where I own backend architecture for the software products, and to selected Upwork contracts.",
    "The work I'm proudest of tends to be the unglamorous kind: money arithmetic that can't drift, supplier integrations that hold up when the supplier changes something, sync between two systems that disagree about the truth.",
  ],
};

export const stats: Stat[] = [
  { value: "4+", display: "4+", label: "Years in production" },
  { value: "6000+", display: "6,000+", label: "Daily users served" },
  { value: "3", display: "3", label: "National gov. systems" },
  { value: "100%", display: "100%", label: "Upwork job success" },
];

export const projects: Project[] = [
  {
    num: "01",
    name: "The Address Investments",
    subject: "Multi-tenant ERP/CRM",
    role: "Senior Software Engineer",
    period: "Jan 2025 — Present",
    description:
      "Enterprise ERP/CRM used by 6,000+ employees across two business units, covering sales, HR, finance, learning and supply chain. I own the leads, deals, units, HR, learning, supply chain and reservations domains, across both the Laravel backend and the Next.js front end.",
    impact: [
      "6,000+ daily users",
      "Two-tenant architecture",
      "Odoo v19 two-way sync",
    ],
    stack: [
      "Laravel 12",
      "PHP 8.4",
      "PostgreSQL",
      "Redis",
      "Octane",
      "Next.js 16",
      "React 19",
      "TypeScript",
    ],
    image: "/the_address.webp",
    fit: "center top",
    plateTitle: "The Address Investments",
    shot: "Live product",
    span: 2,
    ratio: "21/9",
  },
  {
    num: "02",
    name: "Akaza Travel",
    subject: "Hotel & tour booking platform",
    role: "Principal Engineer · Giantrex",
    period: "Feb 2026 — Present",
    description:
      "Hotelbeds powers hotel search and booking, with rates and cancellation terms captured at the moment of booking so a later supplier change can't alter a confirmed reservation. Payments run through Stripe and PayPal behind one gateway interface, with exact integer arithmetic on every multi-currency amount.",
    impact: ["Hotelbeds integration", "Stripe + PayPal", "EN / DE / FR"],
    stack: [
      "Laravel 12",
      "PostgreSQL",
      "Redis",
      "Octane",
      "Next.js 16",
      "React 19",
      "Three.js",
      "Stripe",
    ],
    link: "https://akazatravel.com/",
    linkLabel: "akazatravel.com",
    image: "/akaza.webp",
    fit: "center top",
    plateTitle: "Akaza Travel",
    shot: "Live product",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "03",
    name: "Rahwan Shipping",
    subject: "Shopify delivery app",
    role: "Sole Backend Engineer · Giantrex",
    period: "Nov 2025 — Present",
    description:
      "A published Shopify app bringing last-mile delivery to Egyptian merchants. Live checkout rates through Shopify's Carrier Service API, automated fulfillment, and delivery tracking written back to the merchant's order timeline. I built the app, the Laravel platform behind it, the admin console and the courier app.",
    impact: ["Published Shopify app", "Live carrier rates", "Web, admin, mobile"],
    stack: [
      "Laravel 12",
      "React Router 7",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Flutter",
      "Shopify",
    ],
    link: "https://rahwan.co/",
    linkLabel: "rahwan.co",
    image: "/rahwan.webp",
    fit: "center top",
    plateTitle: "Rahwan Shipping",
    shot: "Live product",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "04",
    name: "Egyptian Customs Authority",
    subject: "National customs modernisation",
    role: "Full Stack Engineer · ACME IES",
    period: "2024 — 2025",
    description:
      "National initiative to modernise Egypt's customs operations. Microservices backend and registration APIs for brokers, agents and stakeholders, behind multi-factor authentication.",
    impact: ["National deployment", "Microservices", "Multi-factor auth"],
    stack: ["Laravel", "PHP", "MySQL", "Next.js", "GitLab CI"],
    link: "https://customs.gov.eg/",
    linkLabel: "customs.gov.eg",
    image: "/customs.webp",
    fit: "center top",
    plateTitle: "Customs, digitised",
    shot: "customs.gov.eg — live",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "05",
    name: "Egyptian Government Digital Transformation",
    subject: "National Archives & National Silos",
    role: "Full Stack Engineer · ACME IES",
    period: "2022 — 2024",
    description:
      "Two national systems. The National Archives platform digitises Egypt's public records, with role-based access and a custom permission model. The National Silos platform governs grain logistics on IBM Cloud Paks, with Node.js services reading weighbridge scales at silos nationwide.",
    impact: [
      "Two national systems",
      "Role-based access control",
      "IBM Cloud Paks",
    ],
    stack: ["Laravel", "PHP", "Node.js", "MySQL", "IBM Cloud Paks"],
    fit: "center top",
    plateTitle: "Two national systems",
    shot: "Internal government systems",
    span: 1,
    ratio: "24/5",
  },
  {
    num: "06",
    name: "Welhof",
    subject: "Refurbished appliance e-commerce",
    role: "Backend Engineer · TSR Ventures",
    period: "Sep 2024 — Mar 2025",
    description:
      "Backend for a Dutch e-commerce platform selling refurbished home appliances. Product and category management, warehouse and inventory tracking, and the order and stock handling behind it.",
    impact: ["Netherlands market", "Warehouse management", "Inventory tracking"],
    stack: ["PHP", "Yii", "MySQL", "Linux"],
    image: "/welhof.webp",
    fit: "center top",
    plateTitle: "Welhof",
    shot: "Live product",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "07",
    name: "Delecato",
    subject: "Premium food e-commerce",
    role: "Full Stack Engineer",
    period: "Feb — Apr 2025",
    description:
      "Online store for a Germany-based brand selling dates, nuts and dried fruits. Built the storefront, product structure and performance work, with Stripe payments and DPD shipping automation. Seven collections, a wishlist and quick-view flow, and a checkout carrying Klarna, PayPal and Apple Pay.",
    impact: [
      "Germany market",
      "DE / EN / AR storefront",
      "Stripe + Klarna checkout",
      "DPD shipping automation",
    ],
    stack: ["Shopify", "Liquid", "JavaScript", "Stripe"],
    link: "https://delecato.de/",
    linkLabel: "delecato.de",
    image: "/delecato.webp",
    fit: "center top",
    plateTitle: "Datteln & Nüsse aus dem Orient",
    shot: "delecato.de — live",
    span: 1,
    ratio: "16/10",
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Backend",
    num: "01",
    span: 3,
    items: ["PHP", "Laravel", "Node.js", "Yii", "REST APIs", "GraphQL", "Octane"],
  },
  {
    title: "Frontend",
    num: "02",
    span: 3,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Data",
    num: "03",
    span: 2,
    items: ["PostgreSQL", "MySQL", "Redis", "Typesense", "Laravel Scout"],
  },
  {
    title: "Architecture",
    num: "04",
    span: 4,
    items: [
      "Domain-Driven Design",
      "Clean Architecture",
      "Multi-tenancy",
      "Microservices",
      "Event-driven design",
    ],
  },
  {
    title: "DevOps",
    num: "05",
    span: 3,
    items: [
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Linux",
      "GCP Cloud Build",
      "Laravel Forge",
    ],
  },
  {
    title: "Integrations",
    num: "06",
    span: 3,
    items: [
      "Shopify",
      "Stripe",
      "PayPal",
      "Hotelbeds",
      "Odoo",
      "Meta Ads",
      "Firebase",
      "Twilio",
    ],
  },
];

export const roles: Role[] = [
  {
    period: "Jan 2025 — Present",
    type: "Full-time · Onsite",
    title: "Senior Software Engineer",
    company: "The Address Investments",
    description:
      "Core engineer on a multi-tenant ERP/CRM used by 6,000+ employees. Own the leads, deals, units, HR, learning, supply chain and reservations domains across the Laravel backend and the Next.js front end.",
    stack: [
      "Laravel",
      "PHP",
      "PostgreSQL",
      "Redis",
      "Octane",
      "Next.js",
      "React",
    ],
  },
  {
    period: "Nov 2025 — Present",
    type: "Part-time · Remote",
    title: "Partner, Software Engineering",
    company: "Giantrex",
    description:
      "Games and VR studio expanding into software products. I own backend architecture across the software line — Akaza Travel and Rahwan Shipping.",
    stack: [
      "Laravel",
      "PostgreSQL",
      "Next.js",
      "React Router",
      "Flutter",
      "Shopify",
    ],
  },
  {
    period: "2022 — Present",
    type: "Freelance · Remote",
    title: "Freelance Software Engineer",
    company: "Upwork — Top Rated, 100% Job Success",
    description:
      "Selected contracts across ERP, SaaS and e-commerce. AuraKore (Feb 2026 – Present), TSR Ventures / Welhof (Sep 2024 – Mar 2025), Leadmedia (2022 – 2024).",
    stack: ["Laravel", "PHP", "Yii", "PostgreSQL", "MySQL", "GCP"],
  },
  {
    period: "Jun 2022 — Jan 2025",
    type: "Full-time · Onsite",
    title: "Full Stack PHP Developer",
    company: "ACME IES",
    description:
      "Backend for Egyptian government digital transformation — the Customs Authority, the National Archives and the National Silos platform — plus the Exponile marketplace.",
    stack: ["Laravel", "PHP", "MySQL", "Node.js", "Next.js"],
  },
  {
    period: "2018 — 2022",
    type: "Education",
    title: "B.Sc. Computer Science — Dual Degree",
    company: "Arab Open University · The Open University (UK)",
    description: "Graduated with second-class honours.",
    stack: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Omar is a professional PHP developer with good coding skills. He knows his way in complex tasks. Hoping to have a long term collaboration with him.",
    initials: "JO",
    name: "Jalal Oussail",
    title: "CTO at Welhof",
  },
  {
    quote:
      "Omar built our entire e-commerce platform from the ground up. He understood our business needs perfectly and delivered a polished, high-performing store that exceeded our expectations.",
    initials: "BH",
    name: "Bilal Hassan",
    title: "CEO at Delecato",
  },
  {
    quote:
      "The contributions of Omar to our team have been exceptional. His profound expertise and ability to tackle complex challenges have significantly advanced our projects.",
    initials: "JP",
    name: "Jean Pierre",
    title: "CTO at Leadmedia",
  },
  {
    quote:
      "Excellent and Professional. His communication is top-notch, he met all deadlines, and he is very knowledgeable.",
    initials: "CO",
    name: "Cheick Ouedraogo",
    title: "CEO at AuraKore",
  },
];

export const contact = {
  kicker: "06 / Contact",
  heading: ["Let's build the", "hard part together"],
  blurb:
    "Available for senior backend and full-stack roles, and for contract work on enterprise systems.",
  email: "derbalajr@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/derbalajr" },
    { name: "GitLab", url: "https://gitlab.com/derbalajr" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/derbalajr/" },
    { name: "Upwork", url: "https://www.upwork.com/freelancers/derbalajr" },
  ],
  upwork: {
    kicker: "Upwork status",
    score: "100%",
    scoreLabel: "Job success score",
    facts: [
      "★ Top Rated since 2022",
      "◷ Replies within 24 hours",
      "◉ GMT+3 — overlaps EU & US-East",
    ],
  },
};

export const footer = {
  left: "© 2026 Omar Derbala — derbalajr.com",
  right: "Cairo, Egypt · GMT+3",
};
```

- [ ] **Step 2: Verify the file typechecks**

```bash
npx tsc --noEmit
```

Expected: clean. If `span: 2` on a project errors, the literal union `1 | 2` is being widened — confirm the array is annotated `Project[]`.

- [ ] **Step 3: Verify no banned term slipped in**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
grep -niE "django|kubernetes|\bpython\b|address holding|unity|wordpress" data/index.ts
```

Expected: no output.

- [ ] **Step 4: Verify every image path resolves**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
for f in the_address akaza rahwan customs welhof delecato omar; do
  test -f "public/$f.webp" && echo "ok $f" || echo "MISSING $f"
done
test -f "public/Omar_Derbala_Senior_Software_Engineer.pdf" && echo "ok cv" || echo "MISSING cv"
```

Expected: eight `ok` lines.

- [ ] **Step 5: Lint and build**

```bash
npm run lint && npm run build
```

Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add data/index.ts
git commit -m "content: add the 2026 site copy

Seven projects, six skill groups, five roles and four testimonials,
copied verbatim from the design artifact. Layout metadata (span, ratio,
plate title) travels with each project so the grid stays data-driven."
```

---

## Task 5: Nav and Footer

The page frame. Both are small, both are pure layout, and together they make the shell navigable — which is what makes the following section tasks reviewable in a browser.

**Files:**
- Create: `components/Nav.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `navItems`, `contact`, `footer` from `data/index.ts` (Task 4); Tailwind tokens from Task 2.
- Produces: `<Nav />` and `<Footer />`, both taking no props. Both are default exports.

- [ ] **Step 1: Create `components/Nav.tsx`**

`Nav` is a client component only because of the mobile menu's open/closed state. The artifact hides the links outright below 900px; we add a real menu instead.

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, contact } from "@/data";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/[0.66] backdrop-blur-[18px]">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
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
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-2 text-txt lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="block rounded-[10px] px-3 py-3 text-[15px] font-medium text-dim hover:bg-[rgba(233,240,250,0.06)] hover:text-txt"
            >
              {item.name}
            </a>
          ))}
          <a
            href={`mailto:${contact.email}`}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl bg-accent px-5 py-3.5 text-center text-[15px] font-semibold text-white"
          >
            Let&rsquo;s talk
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
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
```

- [ ] **Step 3: Wire both into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <div className="h-screen" />
      <Footer />
    </div>
  );
}
```

The `h-screen` spacer is temporary scaffolding so the fixed header and the footer are both visible while the sections are missing. Task 6 removes it.

- [ ] **Step 4: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 5: Verify in a browser**

Run `npm run dev` and check at 1440px: fixed blurred header, "OD" gradient mark, four links plus a blue "Let's talk" button, footer with both lines side by side.

Then at 390px: the four links are gone, a bordered hamburger button sits at the right, clicking it opens a panel with all four links and the CTA, clicking a link closes it, and the footer stacks to two lines.

Confirm keyboard focus rings appear on the links (blue, 2px, offset 3px).

- [ ] **Step 6: Commit**

```bash
git add components/Nav.tsx components/Footer.tsx app/page.tsx
git commit -m "feat: add the redesigned nav and footer

Fixed blurred header with the OD mark and section links, plus a mobile
menu the artifact doesn't have — below 900px it hid the links entirely,
leaving only the CTA."
```

---

## Task 6: Hero and Ticker

The hero's static layer — badge, headline, tagline, CTAs, proof line, portrait — plus the tech marquee beneath it. The WebGL canvas is Task 7; this task leaves its slot empty.

**Files:**
- Create: `components/Hero.tsx`, `components/Ticker.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `heroData`, `ticker` from `data/index.ts`; `hero-grid-overlay`, `sweep-text`, `floater`, `marquee`, `marquee-track` from `theme.css`; `animate-pulse-dot` from the Tailwind config.
- Produces: `<Hero />` and `<Ticker />`, both taking no props, both default exports. `Hero` renders `<HeroCanvas />` — Task 7 creates that file, so this task stubs the import out and Task 7 adds it.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Image from "next/image";
import { heroData } from "@/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-[120px]"
    >
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
          {/* Below 900px the artifact shows the portrait above the text, so
              the two blocks swap order while the DOM keeps the text first. */}
          <div className="order-2 lg:order-none">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-[rgba(233,240,250,0.04)] py-2 pl-3 pr-4 text-[13px] font-medium tracking-[0.01em] text-dim">
              <span className="inline-flex h-2 w-2 flex-none animate-pulse-dot rounded-full bg-teal shadow-[0_0_14px_#24d8c4]" />
              <span>{heroData.badge}</span>
            </div>

            <h1 className="mt-[30px] font-display text-[clamp(48px,6.4vw,96px)] font-bold leading-[0.98] tracking-[-0.045em] text-txt">
              {heroData.headline.map((line) => (
                <span key={line} className="block">
                  {line}
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
```

The `order-1` / `order-2` pair puts the portrait above the text below 900px, matching the artifact, while keeping the headline first in the DOM for screen readers and for search engines.

- [ ] **Step 2: Create `components/Ticker.tsx`**

The list is doubled so the `drift` keyframe's `-50%` translation loops seamlessly. The duplicate is decorative, so it is hidden from assistive tech.

```tsx
import { ticker } from "@/data";

export default function Ticker() {
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-bg-2 py-5">
      <div className="marquee-track flex w-max items-center gap-14 font-mono text-sm tracking-[0.04em] text-dim-2">
        {[...ticker, ...ticker].map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= ticker.length}
            className="inline-flex items-center gap-14 whitespace-nowrap"
          >
            {item}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire both into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <Footer />
    </div>
  );
}
```

The `h-screen` spacer from Task 5 is gone.

- [ ] **Step 4: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 5: Verify in a browser against the artifact**

Run `npm run dev`. Open `docs/design/artifact.dc.html` in a second tab and compare at 1440px:

- The headline is three lines, with "run on." carrying an animated blue-to-teal gradient.
- A teal dot pulses in the badge.
- The portrait floats gently and sits to the right, with a blurred gradient halo.
- A faint 72px grid fades out toward the edges of the hero.
- The ticker scrolls left continuously and pauses on hover.

At 390px: the portrait appears above the text at 300px wide, the CTAs wrap, and nothing scrolls horizontally.

- [ ] **Step 6: Verify the "Download CV" link resolves**

```bash
curl -sI http://localhost:3000/Omar_Derbala_Senior_Software_Engineer.pdf | head -1
```

Expected: `HTTP/1.1 200 OK`.

- [ ] **Step 7: Commit**

```bash
git add components/Hero.tsx components/Ticker.tsx app/page.tsx
git commit -m "feat: add the redesigned hero and tech ticker

Badge, sweep-gradient headline, CTAs, proof line and the floating
portrait card, plus the looping stack marquee beneath. The WebGL layer
lands separately."
```

---

## Task 7: HeroCanvas — the Three.js orb

A rotating wireframe icosahedron with a drifting particle field, isolated in its own client component so `three` never enters the initial bundle.

**Files:**
- Create: `components/HeroCanvas.tsx`
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: `three` (Task 2 installed it).
- Produces: `<HeroCanvas />`, default export, no props. Renders a single `<canvas>` positioned `absolute inset-0` — the parent must be `relative`, which `Hero`'s `<section>` is.

- [ ] **Step 1: Create `components/HeroCanvas.tsx`**

The geometry, materials, motion constants and mouse damping are all copied from `docs/design/artifact.dc.html:532-632`. The three guards — reduced motion, viewport width, and hero visibility — are ours.

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Decorative only: skip the download entirely on small screens and when
    // the visitor has asked for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 900) return;

    let disposed = false;
    let raf = 0;
    let teardown: (() => void) | null = null;

    void import("three").then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5.2;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const group = new THREE.Group();
      scene.add(group);

      const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x0a1226,
        transparent: true,
        opacity: 0.55,
      });
      group.add(new THREE.Mesh(coreGeo, coreMat));

      const wireGeo = new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(1.52, 1)
      );
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x4c6fff,
        transparent: true,
        opacity: 0.42,
      });
      group.add(new THREE.LineSegments(wireGeo, wireMat));

      const shellGeo = new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(2.35, 0)
      );
      const shellMat = new THREE.LineBasicMaterial({
        color: 0x24d8c4,
        transparent: true,
        opacity: 0.18,
      });
      const shell = new THREE.LineSegments(shellGeo, shellMat);
      group.add(shell);

      const count = 900;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
        pos[i * 3 + 2] = r * Math.cos(ph);
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0x9fb4ff,
        size: 0.028,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      const resize = () => {
        const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 0;
        const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 0;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const wide = w > 900;
        group.position.set(wide ? 1.9 : 0, wide ? 0.1 : 0.6, 0);
        group.scale.setScalar(wide ? 1 : 0.72);
      };
      resize();
      window.addEventListener("resize", resize);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const clock = new THREE.Clock();
      const loop = () => {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        // Stop rendering once the hero has scrolled past.
        if (canvas.getBoundingClientRect().bottom < 0) return;
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.045;
        mouse.y += (mouse.ty - mouse.y) * 0.045;
        group.rotation.y = t * 0.11 + mouse.x * 0.32;
        group.rotation.x = Math.sin(t * 0.24) * 0.14 + mouse.y * 0.2;
        shell.rotation.y = -t * 0.16;
        shell.rotation.z = t * 0.06;
        dust.rotation.y = t * 0.02 + mouse.x * 0.08;
        dust.rotation.x = mouse.y * 0.05;
        renderer.render(scene, camera);
      };
      loop();

      teardown = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        coreGeo.dispose();
        coreMat.dispose();
        wireGeo.dispose();
        wireMat.dispose();
        shellGeo.dispose();
        shellMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
```

- [ ] **Step 2: Mount it in `components/Hero.tsx`**

Add the import at the top:

```tsx
import HeroCanvas from "./HeroCanvas";
```

And render it as the first child of the `<section>`, before the radial-gradient div:

```tsx
      <HeroCanvas />
```

- [ ] **Step 3: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean. In the build output, `three` appears as a separate chunk, not in the entry bundle for `/`.

- [ ] **Step 4: Verify the orb renders and is budgeted**

Run `npm run dev` at a window wider than 900px. Confirm:

- A blue wireframe icosahedron with a teal outer shell rotates behind the right side of the hero, with pale particles drifting around it.
- Moving the pointer tilts it slightly.
- The DevTools Network panel shows a `three` chunk loading *after* the page is interactive.
- Scrolling past the hero and watching the Performance panel shows the frame work stop.

- [ ] **Step 5: Verify both guards**

Narrow the window below 900px and hard-reload: no orb, and no `three` chunk in the Network panel.

Then in DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", hard-reload at full width: no orb and no `three` chunk.

- [ ] **Step 6: Commit**

```bash
git add components/HeroCanvas.tsx components/Hero.tsx
git commit -m "feat: add the WebGL hero orb

Wireframe icosahedron, teal outer shell and a 900-point dust field,
ported from the design artifact. three is dynamically imported and
skipped below 900px or under prefers-reduced-motion, so it never touches
the initial bundle or mobile."
```

---

## Task 8: About and the stat counters

The `01 / About` section — a sticky numbered rail, three paragraphs, and four stat cards whose numbers count up when scrolled into view.

**Files:**
- Create: `components/About.tsx`, `hooks/useCountUp.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `about`, `stats` from `data/index.ts`; `reveal` and `rule-grow` from `theme.css`.
- Produces:
  - `useCountUp(raw: string, display: string): { ref: React.RefObject<HTMLDivElement | null>; text: string }` — attach `ref` to the element showing `text`.
  - `<About />`, default export, no props.

- [ ] **Step 1: Create `hooks/useCountUp.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up when its element scrolls into view.
 *
 * `raw` is the parseable form ("6000+"), `display` the formatted one
 * ("6,000+"). `display` is what renders on the server, so the markup is
 * correct without JavaScript; the hook only takes over once mounted.
 */
export function useCountUp(raw: string, display: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(display);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!target) return;
    const suffix = raw.replace(/[0-9.,]/g, "");

    // Safe because the stats sit well below the fold — nobody sees the reset.
    setText(`0${suffix}`);

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 1100);
            const eased = 1 - Math.pow(1 - t, 3);
            setText(
              Math.round(target * eased).toLocaleString("en-US") + suffix
            );
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [raw]);

  return { ref, text };
}
```

- [ ] **Step 2: Create `components/About.tsx`**

The counters need state, so this is a client component. The stat card is a small local component so the hook is called once per card rather than in a loop.

```tsx
"use client";

import { about, stats, type Stat } from "@/data";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({ stat }: { stat: Stat }) {
  const { ref, text } = useCountUp(stat.value, stat.display);

  return (
    <div className="rounded-[18px] border border-line bg-panel px-5 py-[22px]">
      <div
        ref={ref}
        className="font-display text-[32px] font-bold leading-none tracking-[-0.03em] text-txt [font-variant-numeric:tabular-nums]"
      >
        {text}
      </div>
      <div className="mt-2.5 text-[12.5px] font-medium leading-[1.4] text-dim-2">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="reveal pt-[88px] md:pt-[130px]">
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
        <div className="static xl:sticky xl:top-[120px]">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
            {about.kicker}
          </div>
          <div className="rule-grow mt-[18px] h-px bg-[linear-gradient(90deg,#4c6fff,transparent)]" />
        </div>

        <div className="flex max-w-[780px] flex-col gap-[26px]">
          <p className="font-display text-[clamp(24px,2.5vw,34px)] font-medium leading-[1.28] tracking-[-0.025em] text-txt">
            {about.lead}
          </p>
          {about.body.map((para) => (
            <p key={para.slice(0, 24)} className="text-[17.5px] leading-[1.68] text-dim">
              {para}
            </p>
          ))}

          <div className="mt-3.5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add the `<main>` wrapper and `About` to `app/page.tsx`**

`About`, `Projects`, `Skills` and `Experience` share one padded container; `Testimonials` and `Contact` sit outside it because they bleed to the viewport edge.

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 5: Verify in a browser**

Run `npm run dev` at 1440px and scroll to the About section. Confirm:

- "01 / About" sits in a left rail with a blue rule that grows from the left as the section enters.
- The rail stays pinned while the prose scrolls past it.
- The four stat numbers count up once, and land on exactly `4+`, `6,000+`, `3`, `100%`.
- The section fades and rises as it enters the viewport (in a browser supporting `animation-timeline`; in others it is simply visible, which is also correct).

At 1000px: the rail unpins and sits above the prose; the stats are still four across.
At 800px: the stats drop to two columns.

- [ ] **Step 6: Verify the reduced-motion path**

In DevTools → Rendering, emulate `prefers-reduced-motion: reduce` and reload. The stats must show their final values immediately and never animate.

- [ ] **Step 7: Commit**

```bash
git add components/About.tsx hooks/useCountUp.ts app/page.tsx
git commit -m "feat: add the About section with scroll-triggered stat counters

Sticky numbered rail, lead paragraph and four counting stat cards. The
formatted value renders on the server so the markup is right without
JavaScript, and the counter is skipped under prefers-reduced-motion."
```

---

## Task 9: Projects

The `02 / Selected work` grid — seven cards, the first spanning both columns, each with a typographic plate that a screenshot covers once it loads.

**Files:**
- Create: `components/Projects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projects` from `data/index.ts`; `card-lift`, `shot`, `chip-row` from `theme.css`.
- Produces: `<Projects />`, default export, no props.

- [ ] **Step 1: Create `components/Projects.tsx`**

The artifact fades the screenshot in over the plate with JavaScript, because its own placeholder images were low-resolution and it needed to reject them. We ship real assets, so no JavaScript is needed: the plate sits underneath and the `<img>` is transparent until it decodes, which produces the same effect and keeps this a server component.

Tailwind cannot build class names from variables, so `span` and `ratio` go through lookup maps.

```tsx
import Image from "next/image";
import { projects } from "@/data";

const SPAN: Record<1 | 2, string> = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
};

const RATIO: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/10": "aspect-[16/10]",
  "24/5": "aspect-[24/5]",
};

export default function Projects() {
  return (
    <section id="work" className="reveal pt-[88px] md:pt-[130px]">
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
            02 / Selected work
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
            Systems in production
          </h2>
        </div>
        <p className="max-w-[400px] text-base leading-[1.62] text-dim">
          Seven platforms across enterprise, government, travel and commerce.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-[22px] xl:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.num}
            className={`card-lift flex flex-col overflow-hidden rounded-[26px] border border-line bg-panel ${SPAN[p.span]}`}
          >
            <div
              className={`relative overflow-hidden bg-[linear-gradient(140deg,#101825,#0a1020)] ${RATIO[p.ratio]}`}
            >
              <div
                aria-hidden
                className="shot absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(233,240,250,0.05)_0_1px,transparent_1px_11px)]"
              />
              <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8 py-7">
                <div className="font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.1] tracking-[-0.03em] text-[rgba(233,240,250,0.9)]">
                  {p.plateTitle}
                </div>
                <div className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-dim-2">
                  {p.shot}
                </div>
              </div>

              {p.image && (
                <>
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.subject}`}
                    fill
                    sizes={
                      p.span === 2
                        ? "(max-width: 1180px) 100vw, 1320px"
                        : "(max-width: 1180px) 100vw, 650px"
                    }
                    style={{ objectFit: "cover", objectPosition: p.fit }}
                    className="shot"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.28)_0%,transparent_40%,rgba(5,7,12,0.72)_100%)]"
                  />
                </>
              )}

              <div className="absolute left-[18px] top-[18px] rounded-full border border-line-2 bg-bg/[0.66] px-[13px] py-[7px] font-mono text-[11.5px] tracking-[0.06em] text-dim backdrop-blur-[8px]">
                {p.num}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-line-2 bg-bg/[0.72] px-[15px] py-[9px] font-mono text-[11.5px] text-txt backdrop-blur-[8px] transition hover:border-accent hover:bg-accent hover:text-white"
                >
                  {p.linkLabel} <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            <div className="flex flex-col gap-[18px] px-7 pb-[30px] pt-7">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-display text-[23px] font-semibold tracking-[-0.025em] text-txt">
                    {p.name}
                  </h3>
                  <span className="font-mono text-[11.5px] tracking-[0.04em] text-dim-2">
                    {p.period}
                  </span>
                </div>
                <div className="mt-2 text-[15px] text-accent-soft">
                  {p.subject}
                </div>
                <div className="mt-1 text-[13.5px] font-medium text-dim-2">
                  {p.role}
                </div>
              </div>

              <p className="text-[15.5px] leading-[1.62] text-dim">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.impact.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(76,111,255,0.28)] bg-[rgba(76,111,255,0.12)] px-[13px] py-[7px] text-[12.5px] font-semibold text-accent-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="chip-row flex flex-wrap gap-[7px] border-t border-line pt-4">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-line px-[11px] py-[5px] font-mono text-[11.5px] text-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `Projects` to `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 4: Verify in a browser against the artifact**

Run `npm run dev` at 1440px. Confirm:

- Seven cards in two columns, with The Address Investments spanning both at 21:9.
- Every card except "Egyptian Government Digital Transformation" shows a screenshot; that one shows "Two national systems" in large type over a diagonal hatch, at 24:5.
- Hovering a card lifts it 6px, scales the screenshot slightly, and brightens the stack chips' borders.
- The `01`–`07` badges sit top-left; the four live-site pills sit top-right and turn blue on hover.

At 1000px: one column, and the first card is no longer double-width.

- [ ] **Step 5: Verify every external link resolves**

```bash
for u in https://akazatravel.com/ https://rahwan.co/ https://customs.gov.eg/ https://delecato.de/; do
  printf '%s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' -L --max-time 15 "$u"
done
```

Expected: four `200` responses. If one is not 200, report it — do not remove the link.

- [ ] **Step 6: Commit**

```bash
git add components/Projects.tsx app/page.tsx
git commit -m "feat: add the selected-work project grid

Seven cards with per-project span and aspect ratio, impact pills and
stack chips. Each card carries a typographic plate that the screenshot
covers once decoded, so the one project without a shareable screenshot
keeps a designed surface rather than a gap."
```

---

## Task 10: Skills and Experience

Two straightforward data-driven sections: the `03 / Capabilities` span grid and the `04 / Trajectory` timeline.

**Files:**
- Create: `components/Skills.tsx`, `components/Experience.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `skills`, `roles` from `data/index.ts`; `card-lift` from `theme.css`.
- Produces: `<Skills />` and `<Experience />`, default exports, no props.

- [ ] **Step 1: Create `components/Skills.tsx`**

```tsx
import { skills } from "@/data";

const SPAN: Record<2 | 3 | 4, string> = {
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
};

export default function Skills() {
  return (
    <section id="stack" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        03 / Capabilities
      </div>
      <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
        What I work with
      </h2>

      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-6">
        {skills.map((group) => (
          <div
            key={group.num}
            className={`card-lift rounded-[24px] border border-line bg-panel px-[26px] pb-[30px] pt-7 ${SPAN[group.span]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-display text-lg font-semibold tracking-[-0.015em] text-txt">
                {group.title}
              </div>
              <div className="font-mono text-[11.5px] text-dim-2">
                {group.num}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-[10px] border border-line bg-[rgba(233,240,250,0.05)] px-[13px] py-[7px] text-[13.5px] font-medium text-txt"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Experience.tsx`**

```tsx
import { roles } from "@/data";

export default function Experience() {
  return (
    <section id="path" className="reveal pt-[88px] md:pt-[130px]">
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
        04 / Trajectory
      </div>
      <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
        Where the work happened
      </h2>

      <div className="relative flex flex-col gap-2 pl-[34px]">
        <div
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px bg-[linear-gradient(180deg,#4c6fff,rgba(76,111,255,0.08))]"
        />
        {roles.map((role) => (
          <div
            key={`${role.company}-${role.period}`}
            className="card-lift relative grid grid-cols-1 gap-4 rounded-[20px] border border-transparent px-7 py-[26px] xl:grid-cols-[230px_minmax(0,1fr)_250px] xl:gap-8"
          >
            <div
              aria-hidden
              className="absolute -left-[34px] top-[34px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgba(76,111,255,0.14)]"
            />
            <div>
              <div className="font-mono text-[12.5px] tracking-[0.03em] text-txt [font-variant-numeric:tabular-nums]">
                {role.period}
              </div>
              <div className="mt-2 text-[12.5px] font-medium text-dim-2">
                {role.type}
              </div>
            </div>
            <div>
              <div className="font-display text-[19px] font-semibold tracking-[-0.02em] text-txt">
                {role.title}
              </div>
              <div className="mt-1.5 text-[14.5px] font-medium text-accent-soft">
                {role.company}
              </div>
              <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.62] text-dim">
                {role.description}
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-[7px]">
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-line px-2.5 py-[5px] font-mono text-[11px] text-dim-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add both to `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 5: Verify in a browser against the artifact**

At 1440px: six skill cards in an asymmetric grid — Backend and Frontend at 3 columns each on the first row, then Data (2) and Architecture (4), then DevOps (3) and Integrations (3). The timeline shows a blue gradient rail with five dots, and each row lays out as period / role / stack across three columns.

At 1000px: skills go to two columns and the timeline rows stack.
At 600px: skills go to one column.

- [ ] **Step 6: Commit**

```bash
git add components/Skills.tsx components/Experience.tsx app/page.tsx
git commit -m "feat: add the capabilities grid and trajectory timeline

Six skill groups on a six-column grid with per-group spans, and five
roles on a gradient timeline rail."
```

---

## Task 11: Testimonials and Contact

The last two sections. Both sit outside the padded `<main>` — the testimonial marquee bleeds to the viewport edge, and the contact panel is a full-width rounded card.

**Files:**
- Create: `components/Contact.tsx`, `components/Testimonials.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `testimonials`, `contact` from `data/index.ts`; `marquee`, `marquee-track-slow`, `marquee-mask` from `theme.css`.
- Produces: `<Testimonials />` and `<Contact />`, default exports, no props.

- [ ] **Step 1: Create `components/Testimonials.tsx`**

The list is doubled so the marquee loops seamlessly; the duplicate half is hidden from assistive tech so screen readers hear each quote once.

```tsx
import { testimonials } from "@/data";

export default function Testimonials() {
  return (
    <section id="words" className="reveal overflow-hidden pt-[88px] md:pt-[130px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          05 / References
        </div>
        <h2 className="mb-[52px] mt-[18px] font-display text-[clamp(36px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] text-txt">
          People I&rsquo;ve built for
        </h2>
      </div>

      <div className="marquee marquee-mask relative overflow-hidden">
        <div className="marquee-track-slow flex w-max gap-5 px-2.5">
          {[...testimonials, ...testimonials].map((q, i) => (
            <figure
              key={`${q.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-[min(420px,82vw)] flex-col justify-between gap-6 rounded-[24px] border border-line bg-panel px-[30px] pb-7 pt-[30px] lg:w-[420px]"
            >
              <blockquote className="text-base leading-[1.62] text-txt">
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
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Contact.tsx`**

```tsx
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
                    {line}
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
```

- [ ] **Step 3: Complete `app/page.tsx`**

This is the final composition.

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verify types, lint and build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three clean.

- [ ] **Step 5: Verify in a browser against the artifact**

At 1440px: quote cards scroll slowly right-to-left, fading out at both edges, and pause on hover. The contact panel is a rounded card with a blue glow top-right and a teal glow bottom-left, the email as a large blue button, four social pills, and a 100% Upwork card on the right.

At 1000px: the Upwork card drops below the contact copy.
At 390px: quote cards narrow to 82vw and the contact panel's padding tightens.

- [ ] **Step 6: Commit**

```bash
git add components/Testimonials.tsx components/Contact.tsx app/page.tsx
git commit -m "feat: add the references marquee and contact panel

Four testimonials on a masked slow marquee, and the contact card with
the email CTA, social pills and Upwork status. Completes the page
composition."
```

---

## Task 12: Final pass — responsive, motion, accessibility and cleanup

Everything is built. This task hunts what per-section review misses: cross-section responsive breaks, motion policy across the whole page, heading order, and dead references.

**Files:**
- Modify: whichever files the checks below turn up.

**Interfaces:**
- Consumes: everything.
- Produces: a shippable branch.

- [ ] **Step 1: Confirm nothing references removed files or the old domain**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
grep -rn "framer-motion\|useMousePosition\|aurora-bg\|noise-overlay" app components hooks data package.json
grep -rn "omarderbala\.com\|Senior_Backend\|aurakore\|pixsouk\|giantrex\|omar-nobg" app components hooks data
grep -rniE "django|kubernetes|\bpython\b|address holding" app components hooks data
```

Expected: all three produce no output. Fix anything they find.

- [ ] **Step 2: Confirm the heading order is valid**

Run `npm run dev`, then in the browser console:

```js
[...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + " " + h.textContent.trim().slice(0, 40))
```

Expected: exactly one `H1` ("I build the systems companies run on."), then `H2` for each of the five section headings, then `H3` for the seven project names. No level is skipped.

- [ ] **Step 3: Check every breakpoint for horizontal overflow**

At 1440, 1180, 1000, 900, 720, 600 and 390px, run in the console:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected: `true` at every width. If false at any width, find the offending element with:

```js
[...document.querySelectorAll("*")].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 5)
```

The marquees are the usual suspect — their tracks are `w-max` and must stay inside an `overflow-hidden` parent.

- [ ] **Step 4: Verify the full reduced-motion path**

In DevTools → Rendering, emulate `prefers-reduced-motion: reduce`, then hard-reload and scroll the whole page. Confirm: both marquees are static, the portrait does not float, the headline gradient does not sweep, the stat numbers show final values immediately, cards do not lift on hover, and no `three` chunk is requested.

- [ ] **Step 5: Verify keyboard navigation**

Tab through the page from the top. Confirm every link and the mobile menu button take focus in visual order, each shows the blue 2px focus ring, and the mobile menu opens with Enter and closes when a link is activated.

- [ ] **Step 6: Verify the production build's client bundle**

```bash
cd /Users/derbalajr/Desktop/Personal/Projects/new-portfolio
npm run build
```

In the route output for `/`, confirm `three` does not appear in the First Load JS for `/` — it must be a separate lazily-loaded chunk. Record the First Load JS figure; it goes in the final report. Do not attempt to rebuild `main` for a baseline — it needs a different `node_modules` and is not worth the risk to the working tree.

- [ ] **Step 7: Verify the production server renders correctly**

```bash
npm run build && npm run start
```

Open `http://localhost:3000` and repeat a quick pass of Steps 3 and 4 against the production build, since `next/font` and image optimization behave differently from dev.

- [ ] **Step 8: Commit any fixes**

```bash
git add -A
git commit -m "fix: final responsive, motion and accessibility pass

Close out the redesign — verified no horizontal overflow from 390px to
1440px, a valid heading order, the full reduced-motion path, and that
three stays out of the first-load bundle."
```

- [ ] **Step 9: Report the outcome**

Summarize for the user: what shipped, the First Load JS figure, any check that failed and why, and anything deliberately left out. Do not claim the redesign is complete unless Steps 1–7 all passed — if any did not, say which.

---

## Post-implementation notes

- The site is one page. `docs/design/` stays in the repo as the reference for future changes; it is not served.
- `public/omar-new.webp` remains the Open Graph image. Replacing it with a 1200×630 card built from the new design is a reasonable follow-up, but is out of scope here.
- The `redesign-2026` branch is not pushed. Merging is the user's call.
