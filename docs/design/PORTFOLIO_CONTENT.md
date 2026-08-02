# Portfolio content — Aug 2026

Canonical source for the derbalajr.com rebuild. Every fact here is reconciled with the
new CV (`Omar_Derbala_Senior_Software_Engineer.pdf`) and the LinkedIn update
(`LINKEDIN_UPDATE.md`).

**Positioning:** the portfolio and Upwork are the two **full-stack** surfaces.
The CV and LinkedIn are backend-anchored. That's deliberate — don't "fix" the mismatch.

## Decisions already made (don't reintroduce)

| Rule | Reason |
|---|---|
| No Django, no Python anywhere | your call: focus on PHP/Laravel + React/Next |
| **AuraKore project card removed** | Django-based |
| **Cheick Ouedraogo testimonial removed** | attached to AuraKore — see note below |
| No Kubernetes | zero artifacts in ten repos; interview landmine |
| No Unity, WordPress, jQuery, Bootstrap | drags a senior profile into junior searches |
| Company is **The Address Investments** | not "Holding" |
| Giantrex = **Partner, Software Engineering** | not co-founder; studio predates you by a year |
| Akaza ranks **above** Rahwan | bigger system: 339 commits vs 224, 801 vs 489 classes |
| The Address DB is **PostgreSQL** | not MySQL — verified in `.env` and all phpunit configs |

> **Reconsider the Cheick testimonial.** You chose to remove it because it's tied to
> AuraKore. But the quote itself names no technology — *"Excellent and Professional. His
> communication is top-notch, he met all deadlines, and he is very knowledgeable."* You can
> keep it as `Cheick Ouedraogo — CEO` with no company stack implied, and you'd go from four
> testimonials to five. Your call; the data file below has it commented out, not deleted.

---

## Hero

**Name:** Omar Derbala
**Title:** Senior Full Stack Engineer

**Tagline:**
```
I build the systems companies run on. Laravel and PostgreSQL on the backend,
React and Next.js on the front.
```

**Secondary line (optional, under the tagline):**
```
Currently on a multi-tenant ERP used by 6,000+ employees. Top Rated on Upwork.
```

**CTAs:** `View Projects` · `Download CV` → `/Omar_Derbala_Senior_Software_Engineer.pdf`

---

## About

```
I've spent four years building Laravel systems that businesses actually depend on —
ERPs, CRMs, booking platforms, marketplaces.

Most of my week goes to a multi-tenant ERP/CRM used by 6,000+ employees, where I work
on both the Laravel backend and the Next.js front end rather than throwing an API over
the wall. The rest goes to Giantrex, a games and VR studio where I own backend
architecture for the software products, and to selected Upwork contracts.

The work I'm proudest of tends to be the unglamorous kind: money arithmetic that can't
drift, supplier integrations that hold up when the supplier changes something, sync
between two systems that disagree about the truth.
```

---

## Projects — in this order

### 1. The Address Investments — Multi-Tenant ERP/CRM
`Senior Software Engineer` · Jan 2025 – Present

```
Enterprise ERP/CRM used by 6,000+ employees across two business units, covering sales,
HR, finance, learning and supply chain. I own the leads, deals, units, HR, learning,
supply chain and reservations domains, across both the Laravel backend and the Next.js
front end.
```
**Highlights:** `6,000+ daily users` · `Two-tenant architecture` · `Odoo v19 two-way sync`
**Stack:** Laravel 12, PHP 8.4, PostgreSQL, Redis, Octane, Next.js 16, React 19, TypeScript
**Image:** `/the_address.webp` (existing)

### 2. Akaza Travel — Hotel & Tour Booking Platform
`Principal Engineer · Giantrex` · Feb 2026 – Present

```
Booking platform for hotels, tours and airport transfers. Hotelbeds powers hotel search
and booking, with rates and cancellation terms captured at the moment of booking so a
later supplier change can't alter a confirmed reservation. Payments run through Stripe
and PayPal behind one gateway interface, with exact integer arithmetic on every
multi-currency amount.
```
**Highlights:** `Hotelbeds integration` · `Stripe + PayPal` · `EN / DE / FR`
**Stack:** Laravel 12, PostgreSQL, Redis, Octane, Next.js 16, React 19, Three.js, Stripe
**Image:** `/akaza.webp` (existing)

### 3. Rahwan Shipping — Shopify Delivery App
`Sole Backend Engineer · Giantrex` · Nov 2025 – Present

```
A published Shopify app bringing last-mile delivery to Egyptian merchants. Live checkout
rates through Shopify's Carrier Service API, automated fulfillment, and delivery tracking
written back to the merchant's order timeline. I built the app, the Laravel platform
behind it, the admin console and the courier app.
```
**Highlights:** `Published Shopify app` · `Live carrier rates` · `Web, admin, mobile`
**Stack:** Laravel 12, React Router 7, Prisma, PostgreSQL, Next.js, Flutter, Shopify
**Image:** `/rahwan.webp` (existing)
**Link:** the Shopify App Store listing, if public — verifiable proof beats a screenshot

### 4. Egyptian Customs Authority
`Full Stack Engineer · ACME IES` · 2024 – 2025

```
National initiative to modernise Egypt's customs operations. Microservices backend and
registration APIs for brokers, agents and stakeholders, behind multi-factor
authentication.
```
**Highlights:** `National deployment` · `Microservices` · `MFA`
**Stack:** Laravel, PHP, MySQL, Next.js, GitLab CI
**Link:** https://customs.gov.eg/
**Image:** `/customs.webp` (existing)

### 5. Egyptian Government Digital Transformation
`Full Stack Engineer · ACME IES` · 2022 – 2024

```
Two national systems. The National Archives platform digitises Egypt's public records,
with role-based access and a custom permission model. The National Silos platform governs
grain logistics on IBM Cloud Paks, with Node.js services reading weighbridge scales at
silos nationwide.
```
**Highlights:** `Two national systems` · `RBAC` · `IBM Cloud Paks`
**Stack:** Laravel, PHP, Node.js, MySQL, IBM Cloud Paks
**Image:** needs one — screenshot or an abstract card

> This is new to the portfolio. It was on LinkedIn but never on the site, and "built two
> national government systems" is a strong, verifiable line most engineers can't claim.

### 6. Welhof — Refurbished Appliance E-commerce
`Backend Engineer · TSR Ventures` · Sep 2024 – Mar 2025

```
Backend for a Dutch e-commerce platform selling refurbished home appliances. Product and
category management, warehouse and inventory tracking, and the order and stock handling
behind it.
```
**Highlights:** `Netherlands market` · `Warehouse management`
**Stack:** PHP, Yii, MySQL, Linux
**Image:** `/welhof.jpg` (exists in Portfolio Screenshots)

### 7. Delecato — Premium Food E-commerce
`Full Stack Engineer` · Feb – Apr 2025

```
Online store for a Germany-based brand selling dates, nuts and dried fruits. Built the
storefront, product structure and performance work, with Stripe payments and DPD
shipping automation.
```
**Highlights:** `Germany market` · `Stripe` · `DPD shipping`
**Stack:** Shopify, Liquid, JavaScript, Stripe
**Link:** https://delecato.de/
**Image:** `/delecato.webp` (existing)

### Dropped

- **AuraKore** — Django. Removed per your call.
- **Pixsouk** — Python/Flask/OpenCV. ⚠️ **Decide:** it contradicts the no-Python rule, but
  it's a real product and the only AI/ML work in your portfolio. Keeping it means one
  Python card on an otherwise PHP/JS site. I'd cut it for coherence, but it's marginal.

---

## Skills

```
Backend        PHP · Laravel · Node.js · Yii · REST APIs · GraphQL · Octane
Frontend       React · Next.js · TypeScript · Tailwind CSS · Flutter
Data           PostgreSQL · MySQL · Redis · Typesense · Laravel Scout
Architecture   Domain-Driven Design · Clean Architecture · Multi-tenancy · Microservices
DevOps         Docker · GitHub Actions · Nginx · Linux · GCP Cloud Build · Laravel Forge
Integrations   Shopify · Stripe · PayPal · Hotelbeds · Odoo · Meta Ads · Firebase · Twilio
```

Removed from the old site: `Django` `Python` `Kubernetes` `Anthropic API` `Gemini AI`
(the last two only backed Pixsouk).

---

## Experience timeline

| Role | Company | Period |
|---|---|---|
| Senior Software Engineer | The Address Investments | Jan 2025 – Present · Full-time |
| Partner, Software Engineering | Giantrex | Nov 2025 – Present · Part-time |
| Freelance Software Engineer | Upwork · *Top Rated, 100% JSS* | 2022 – Present |
| Full Stack PHP Developer | ACME IES | Jun 2022 – Jan 2025 · Full-time |
| B.Sc. Computer Science (Dual Degree) | Arab Open University · The Open University (UK) | 2018 – 2022 |

Under Upwork: AuraKore (Feb 2026 – Present) · TSR Ventures / Welhof (Sep 2024 – Mar 2025) ·
Leadmedia (2022 – 2024).

---

## Testimonials — keep 4, optionally 5

1. **Jalal Oussail**, CTO at Welhof
2. **Bilal Hassan**, CEO at Delecato
3. **Jean Pierre**, CTO at Leadmedia
4. **Ebrahim Aboulfadl**, Backend Developer, National Technologies
5. *(optional)* **Cheick Ouedraogo**, CEO — see note at top

Quotes unchanged from the current site.

---

## Contact

```
Available for senior backend and full-stack roles, and for contract work on
enterprise systems.
```
derbalajr@gmail.com · derbalajr.com · linkedin.com/in/derbalajr · github.com/derbalajr ·
gitlab.com/derbalajr · upwork.com/freelancers/derbalajr

---

## SEO / meta

```
Title        Omar Derbala — Senior Full Stack Engineer | Laravel & Next.js
Description  Senior full stack engineer building enterprise ERP, CRM and booking
             platforms in Laravel, PostgreSQL and Next.js. Top Rated on Upwork.
```

---

## Still unconfirmed

- **Giantrex start date** — `Nov 2025` is inferred from repo activity, never confirmed.
- **Leadmedia dates** — `2022 – 2024` from the old site; bare years look vague.
- **Leadmedia.ca vs leadmedia.co** — the old site says `.ca`, you wrote `.co`.
- **Akaza / Rahwan public URLs** — a live link is worth more than any screenshot.
