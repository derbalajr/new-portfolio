# SEO and AI-search visibility — derbalajr.com

**Date:** 2026-08-02
**Status:** Approved, ready for implementation planning
**Branch:** `seo-2026`

Turn a one-page portfolio into a small, well-structured site that ranks for
client-intent queries, resolves cleanly as an entity, and gives AI answer
engines something specific enough to cite.

## Goals

All four of these, in the user's words:

1. **Inbound clients and recruiters** — rank for queries like "hire senior
   Laravel developer", "Next.js engineer Egypt", "multi-tenant ERP developer".
2. **Own the name** — anyone searching "Omar Derbala" finds this site, ideally
   with a Google knowledge panel.
3. **Get cited by AI assistants** — appear when someone asks ChatGPT, Claude or
   Perplexity for a Laravel + Next.js engineer.
4. **Credibility on inspection** — someone who already has the name looks it up
   and finds an authoritative, fast site.

## Current state, measured

Audited against the live site on 2026-08-02 with a headless browser.

| Signal | Value | Verdict |
|---|---|---|
| LCP | 1196 ms | Good (<2500 ms) |
| CLS | 0.009 | Good (<0.1) |
| TTFB | 280 ms | Good |
| Visible text | 1,495 words | Reasonable for one page |
| Headings | one H1, valid order, 13 total | Correct |
| Images | 7, all with alt, correctly sized | Correct |
| Landmarks | header/nav/main/footer, 7 article, 7 section | Correct |
| Internal page links | **0** | The core problem |
| Indexable URLs | **1** | The core problem |
| Schema types | Person, WebSite, ProfilePage | Thin for the content |

Core Web Vitals are roughly 28% of ranking weight in 2026 and are already
green. **Performance is not the problem and gets no work in this spec.**

Three problems are:

1. **Canonical points at a redirect.** The page is served at
   `www.derbalajr.com`, but every canonical, `og:url` and JSON-LD `@id`
   declares `https://derbalajr.com`, which Vercel 308-redirects back to www.
2. **One URL.** Seven substantial projects are locked inside anchors on a
   single page. There are zero internal page links anywhere on the site.
3. **Schema does not describe the work.** Nothing marks up the projects, the
   employers, or the occupation.

## Decisions made

| Decision | Choice |
|---|---|
| Canonical host | **`https://www.derbalajr.com`** — match what Vercel already serves |
| Architecture | Homepage stays; add `/work/<slug>` case studies |
| Which projects get pages | The Address, Akaza, Rahwan, Delecato — the four with source material |
| Confidentiality | **Full engineering depth for Giantrex** (Akaza, Rahwan); **conservative for The Address** |
| `/writing` section | Not now |
| `/about` page | Not now |
| Review schema on testimonials | **No** — policy risk, see below |

## Architecture

```
/                                 existing single page, unchanged in structure
/work/the-address-investments     conservative depth
/work/akaza-travel                full engineering depth
/work/rahwan                      full engineering depth
/work/delecato                    medium depth
```

Egyptian Customs Authority, Egyptian Government Digital Transformation and
Welhof stay as homepage cards with **no** detail page. There is no source
material for them, and a page that restates its own card is thin content —
worse than no page.

### Files

| File | Responsibility |
|---|---|
| `app/work/[slug]/page.tsx` | The case study route: metadata, JSON-LD, layout |
| `data/case-studies/<slug>.ts` | One file per study — the prose and facts |
| `data/case-studies/index.ts` | Registry mapping slug → study, used for routing and `generateStaticParams` |
| `lib/seo.ts` | Site constants and JSON-LD builders, shared by all routes |

`lib/seo.ts` exists because schema now spans four routes and must share one
`@id` graph. Leaving it inline in `layout.tsx`, as it is today, would mean four
copies of the Person node that can drift apart.

The `Project` type in `data/index.ts` gains an optional `slug`. Cards with a
slug link to their case study; cards without stay inert. Adding a fifth study
later is one data file plus one field.

### Case study page structure

Every study renders the same shape, so the pages read as a set:

1. **Breadcrumb** — Home → Work → project name
2. **H1** — project name and what it is
3. **Facts row** — role, period, live link
4. **Lede** — two or three sentences stating what the system does
5. **Sections** (H2) — the problem, what I built, architecture decisions, outcome
6. **Stack** — the technology list, as visible text
7. **Screenshot** — the existing `public/<project>.webp`
8. **Related work** — links to the other case studies and back to `/#work`

Target length 400–800 words per page. Below 400 the page is not worth having;
above 800 it stops being read.

### Content sources

Nothing on these pages is invented. Each fact traces to one of these:

| Project | Source |
|---|---|
| Akaza Travel | `~/Desktop/Personal/Projects/akaza` — DDD backend with 11 domains (Audit, Customer, Finance, Hotel, Notification, Payment, Promo, Settings, Tour, Transfer, User), `docs/architecture/SYSTEM_ARCHITECTURE.md`, `docs/api/*`, an SRS PDF, EN/DE/FR translation layout |
| Rahwan | `~/Desktop/Personal/Projects/Tawsila` — `tawsila-backend` DDD domains (Dashboard, Finance, Inventory, Order, Settings, User, Vendor), GraphQL layer, Docker deploy; `rahwan` React Router 7 + Prisma Shopify app; `tawsila-mobile` Flutter |
| The Address Investments | `~/Desktop/Projects/crm-backend` domain list, plus the existing card copy. **Conservative treatment** — see below |
| Delecato | The live storefront at `https://www.delecato.de`, audited directly, plus the existing card copy |

### Confidentiality policy

**Giantrex projects (Akaza, Rahwan) — full engineering depth.** Architecture
patterns, domain decomposition, integration design, the trade-offs made and
why. Still excluded: source code, database schemas, credentials, endpoint
inventories, unreleased roadmap, and anything identifying a customer.

**The Address Investments — conservative.** Scale, the domains owned, the
stack, and the outcome, at roughly the depth the current card already
publishes. No internal architecture, no data model, no process detail. It is
the user's current employer and an internal system.

**Delecato — medium.** The storefront is public, so anything observable by
visiting `delecato.de` is fair game: the collections, the checkout methods, the
languages, the shipping flow. Nothing about the client's commercial terms,
margins, suppliers or order volumes.

**Every page is reviewed by the user before it ships.** This is a hard gate in
the implementation plan, not a suggestion.

## Schema design

One `@id` graph across the site, so an answer engine resolves four pages into
one person rather than four unrelated mentions.

**Node identifiers**, all rooted at `https://www.derbalajr.com`:

- `#person` — Omar Derbala
- `#website` — the site
- `#giantrex`, `#address-investments`, `#acme-ies` — employer Organizations
- `/work/<slug>#project` — one per case study

**Homepage** carries `ProfilePage` (with `mainEntity` → `#person`), `WebSite`,
the `Person`, the three `Organization` nodes, and an `ItemList` whose elements
link to the four case studies.

**Person gains** `hasOccupation` (an `Occupation` with name, skills and
`occupationLocation`) and `knowsLanguage` (`en`, `ar`). Existing `sameAs`,
`alumniOf` and `worksFor` are kept. `worksFor` references `#address-investments`
by `@id` rather than repeating an inline Organization.

**Each case study** carries a `BreadcrumbList` and a `SoftwareApplication`
(`applicationCategory: "BusinessApplication"`) whose `author` and `creator`
reference `#person` by `@id`, plus `publisher` referencing the relevant
employer node where one applies — `#giantrex` for Akaza and Rahwan,
`#address-investments` for The Address. **Delecato has no publisher node**; it
was freelance work for a brand that is not one of the three employer
organizations, so the property is omitted rather than invented.

`SoftwareApplication` is chosen over the more generic `CreativeWork` because
every one of these is a running system with users; the type carries more
meaning for an answer engine deciding what was built.

## robots.txt

Replaces the current `User-agent: * / Allow: /`. Explicit, because the research
is consistent that accidentally blocking `OAI-SearchBot` is the single
highest-impact AI-visibility error, and a bare wildcard leaves that to luck.

**Named allow:** `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`,
`ClaudeBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `Applebot`,
`Applebot-Extended`.

**Named disallow:** `Bytespider`, `CCBot`.

Bytespider is blocked because it reportedly accounted for the overwhelming
majority of AI crawler traffic while widely ignoring `robots.txt`; the rule is
a statement of intent, not an enforcement mechanism. CCBot is a training-only
crawler with no citation benefit.

Wildcard stays `Allow: /`. Sitemap reference retained and updated to www.

## llms.txt

A markdown index served at `/llms.txt`: who Omar is, what the site contains,
and a link plus one-line summary for each case study.

**Stated honestly:** Google's May 2026 AI optimization guidance says llms.txt is
not used for AI Overviews, AI Mode, or any generative AI Search feature. This is
not a Google ranking lever. It is included because Anthropic recommends it in
its agent guidance and OpenAI publishes them, making it a cheap agent-readiness
signal. If it is ever shown to be actively harmful, delete the route — nothing
else depends on it.

## Sitemap

Five URLs. `lastModified` comes from an explicit `updated: "YYYY-MM-DD"` field
on each case study, and a `SITE_UPDATED` constant in `lib/seo.ts` for the
homepage. Whoever edits the content edits the date.

This replaces `new Date()`, which currently claims every page changed on every
deploy — a freshness signal that is simply false.

**Not derived from git.** Vercel builds from a shallow clone, so
`git log -1 -- <file>` returns the same commit for every file and every page
would carry an identical, wrong date. A hand-maintained field is less clever
and actually correct.

## Metadata

Every page gets a unique title under 60 characters and its own description of
roughly 150 characters. Titles follow `<Project> — <what it is> | Omar Derbala`.

Each case study sets its own canonical (`https://www.derbalajr.com/work/<slug>`)
and its own Open Graph image at `public/og/<slug>.webp`.

Those cards are generated by a new template, `docs/design/og/og-project.html` —
a variant of the existing one that shows the **project** name and what it is,
with the project screenshot as the plate behind a scrim. Reusing the existing
template unchanged would put "Omar Derbala / Senior Full Stack Engineer" on
every project card, which tells a reader nothing about which page they are
about to open. The render script is the existing `og.mjs`, pointed at the new
template.

The homepage title drops from 61 to under 60 characters.

## What this deliberately does not do

- **No `Review` or `AggregateRating` schema on the testimonials.** Google's
  structured data policy prohibits self-serving review markup about yourself or
  your own organization, and it carries manual-action risk. The four
  testimonials stay as visible, unmarked content.
- **No `FAQPage` schema.** Google retired FAQ rich results for almost all sites
  in 2023.
- **No keyword-stuffing of the homepage copy.** The voice is the strongest part
  of the design. The case studies carry the keyword surface instead.
- **No performance work.** Already green; see the audit table.
- **No pages** for Customs, the government systems, or Welhof.
- **No `/writing`, no `/about`.**

## Verification

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
2. Every route returns 200 and renders server-side (view-source contains the
   body text, not just a JS bundle).
3. Each page has a unique `<title>` under 60 chars and a unique meta
   description.
4. Every canonical, `og:url` and JSON-LD `@id` uses `https://www.derbalajr.com`.
   Zero occurrences of the bare apex in rendered HTML.
5. All JSON-LD parses as valid JSON, and every `@id` referenced by another node
   resolves to a node that exists in the graph.
6. Heading order valid on every page: exactly one H1, no skipped levels.
7. Every internal link resolves to a 200. No orphan routes — each case study is
   reachable from the homepage.
8. `robots.txt`, `sitemap.xml` and `llms.txt` fetch and contain the expected
   entries; sitemap lists exactly five URLs with distinct `lastmod` values.
9. Core Web Vitals measured on a case study page, not just the homepage: LCP
   under 2500 ms, CLS under 0.1.
10. Each case study is 400–800 words of visible text.
11. **User has read and approved every case study page before merge.**

## Parallel work — mobile-first rewrite

A separate session is rewriting the mobile presentation on branch
`mobile-first-rewrite`, also cut from `main`. Both branches touch shared files,
so this work is sequenced to keep the collision surface small.

**Files both branches touch:**

| File | Mobile branch | This branch | Risk |
|---|---|---|---|
| `app/layout.tsx` | `viewport` export, font weights, removes a `<head>` meta | `metadata` object, JSON-LD constants | Low — different regions |
| `app/page.tsx` | mounts `<MobileCta />` | mounts one `<JsonLd />` | Low — one line each |
| `components/Projects.tsx` | substantial rewrite | wraps the card title in a link | **High** |
| `data/index.ts` | explicitly unchanged | adds `slug` field | None |

**Rules for this branch:**

1. **`components/Projects.tsx` is touched last**, in its own task, and only to
   turn the card title into a link. If `mobile-first-rewrite` has merged by
   then, rebase onto it first. If it has not, that one task is the only thing
   to redo after the mobile branch lands.
2. **Homepage JSON-LD goes through a `components/JsonLd.tsx` component**, so
   `app/page.tsx` gains one import and one element rather than a block of
   inline script markup. Cheaper to merge.
3. **No other component file is modified by this branch.** All new content
   lives in new files under `app/work/`, `data/case-studies/` and `lib/`.

## Out of scope

- Backlink acquisition, directory submissions, Wikidata — off-site work the
  user does, not code.
- Google Search Console setup and sitemap submission — the user's account.
- Analytics.
- Anything requiring ACME IES or Welhof material.
