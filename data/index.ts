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
  /** Shown behind a screenshot while it decodes. Screenshot cards only. */
  plateTitle?: string;
  /** Mono caption under plateTitle. Screenshot cards only. */
  shot?: string;
  /**
   * The media surface for a project with no shareable screenshot: an index of
   * what the project is, plus a note saying why there's no picture. Every card
   * keeps the same footprint, so the grid stays regular.
   */
  plate?: {
    entries: { name: string; detail: string }[];
    note: string;
  };
  span: 1 | 2;
  ratio: "21/9" | "16/10";
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
    width: 1200,
    height: 1608,
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
    subject: "Hotel, tour & transfer booking",
    role: "Principal Engineer · Giantrex",
    period: "Feb 2026 — Present",
    description:
      "Three bookable products behind one basket: hotels through the Hotelbeds bedbank, guided tours with their own availability calendar, blackout dates and per-guest-type pricing, and airport transfers priced by route and vehicle class. Rates and cancellation terms are captured at the moment of booking, so a later supplier change can't alter a confirmed reservation. Payments run through Stripe and PayPal behind one gateway interface, with exact integer arithmetic on every multi-currency amount. Around that sits a promo engine with targeted campaigns, generated codes, eligibility rules and redemption reporting, plus customer records with leads and notes, templated notifications, PDF vouchers and revenue reporting — the whole platform in English, German and French.",
    impact: [
      "Hotels, tours & transfers",
      "Hotelbeds bedbank",
      "Stripe + PayPal",
      "EN / DE / FR",
    ],
    stack: [
      "Laravel 12",
      "PostgreSQL",
      "Redis",
      "Octane",
      "Next.js 16",
      "React 19",
      "Three.js",
      "Stripe",
      "Hotelbeds",
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
    name: "Rahwan",
    subject: "Delivery & inventory platform",
    role: "Sole Backend Engineer · Giantrex",
    period: "Nov 2025 — Present",
    description:
      "A multi-sided logistics platform for Egyptian merchants, serving vendors, delivery agents, warehouse staff and customers. Parcels move vendor to warehouse to customer across an eleven-state lifecycle, with QR-verified custody at every handover and OTP confirmation on delivery. Underneath it, a credit/debit ledger reconciles cash-on-delivery collections, shipping fees and order subtotals into vendor wallets, settled as payouts or collections. I built the backend, the admin and customer portal, the Flutter app for vendors and agents, and a Shopify app, now published on the Shopify App Store, that pulls merchant orders straight in.",
    impact: [
      "Vendor, agent, warehouse & customer",
      "Cash-on-delivery reconciliation",
      "Web, admin, mobile, Shopify",
    ],
    stack: [
      "Laravel 12",
      "PostgreSQL",
      "Octane",
      "Next.js 15",
      "React 19",
      "Flutter",
      "Shopify",
      "Leaflet",
    ],
    link: "https://rahwan.co/",
    linkLabel: "rahwan.co",
    image: "/rahwan.webp",
    fit: "center top",
    plateTitle: "Rahwan",
    shot: "Live product",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "04",
    name: "Rahwan Shipping",
    subject: "Shopify app for last-mile delivery",
    role: "Sole Engineer · Giantrex",
    period: "2026 — Present",
    description:
      "A Shopify app that turns a local courier into a shipping option at checkout. Live rates come from the Carrier Service API, orders forward to the courier automatically, and as the parcel moves the app writes fulfillments and delivery events back to Shopify, so the order reads Fulfilled and the customer gets tracking. Built with least-privilege scopes, all three GDPR compliance webhooks, a webhook-health monitor that warns merchants if orders stop arriving, and a retry worker with backoff.",
    impact: [
      "Published on the Shopify App Store",
      "Live rates through the Carrier Service API",
      "Fulfillment write-back and tracking",
    ],
    stack: [
      "React Router 7 (Remix)",
      "Prisma",
      "PostgreSQL",
      "Polaris",
      "App Bridge",
      "Shopify Admin API",
      "Laravel",
    ],
    link: "https://apps.shopify.com/rahwan",
    linkLabel: "apps.shopify.com/rahwan",
    image: "/rahwan-shopify.webp",
    fit: "center top",
    plateTitle: "Rahwan Shipping",
    shot: "Shopify App Store",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "05",
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
    num: "06",
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
    plate: {
      entries: [
        {
          name: "National Archives",
          detail: "Public records · role-based access",
        },
        {
          name: "National Silos",
          detail: "Grain logistics · IBM Cloud Paks",
        },
      ],
      note: "No public screenshot — internal systems",
    },
    span: 1,
    ratio: "16/10",
  },
  {
    num: "07",
    name: "Welhof",
    subject: "Refurbished appliance e-commerce",
    role: "Backend Engineer · TSR Ventures",
    period: "Sep 2024 — Mar 2025",
    description:
      "Backend for a Dutch e-commerce platform selling refurbished home appliances. Product and category management, warehouse and inventory tracking, and the order and stock handling behind it.",
    impact: [
      "Netherlands market",
      "Warehouse management",
      "Inventory tracking",
    ],
    stack: ["PHP", "Yii", "MySQL", "Linux"],
    image: "/welhof.webp",
    fit: "center top",
    plateTitle: "Welhof",
    shot: "Live product",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "08",
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
    items: [
      "PHP",
      "Laravel",
      "Node.js",
      "Yii",
      "REST APIs",
      "GraphQL",
      "Octane",
    ],
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
      "Games and VR studio expanding into software products. I own backend architecture across the software line — Akaza Travel and Rahwan.",
    stack: [
      "Laravel",
      "PostgreSQL",
      "Octane",
      "Next.js",
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
  // wa.me takes the number in international format with no plus, spaces or
  // dashes. The number is never shown — the link reads as an action, not an
  // address — but it is on the Person schema's telephone field in app/layout.tsx.
  whatsapp: "https://wa.me/201111293179",
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
