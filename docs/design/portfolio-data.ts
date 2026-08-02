// Portfolio content — August 2026
// Reconciled with Omar_Derbala_Senior_Software_Engineer.pdf and LINKEDIN_UPDATE.md.
// Same shape as the previous data/index.ts, so it drops in.
//
// Positioning: portfolio + Upwork are FULL STACK. CV + LinkedIn are backend-anchored.
// That mismatch is deliberate.

export const navItems = [
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const heroData = {
  name: "Omar Derbala",
  title: "Senior Full Stack Engineer",
  photo: "/omar-nobg.webp",
  description:
    "I build the systems companies run on. Laravel and PostgreSQL on the backend, React and Next.js on the front.",
  subline:
    "Currently on a multi-tenant ERP used by 6,000+ employees. Top Rated on Upwork.",
  cta: {
    primary: { text: "View Projects", link: "#projects" },
    secondary: {
      text: "Download CV",
      link: "/Omar_Derbala_Senior_Software_Engineer.pdf",
    },
  },
};

export const about = `I've spent four years building Laravel systems that businesses actually depend on — ERPs, CRMs, booking platforms, marketplaces.

Most of my week goes to a multi-tenant ERP/CRM used by 6,000+ employees, where I work on both the Laravel backend and the Next.js front end rather than throwing an API over the wall. The rest goes to Giantrex, a games and VR studio where I own backend architecture for the software products, and to selected Upwork contracts.

The work I'm proudest of tends to be the unglamorous kind: money arithmetic that can't drift, supplier integrations that hold up when the supplier changes something, sync between two systems that disagree about the truth.`;

export const projects = [
  {
    id: 1,
    title: "The Address Investments — Multi-Tenant ERP/CRM",
    role: "Senior Software Engineer",
    period: "Jan 2025 — Present",
    description:
      "Enterprise ERP/CRM used by 6,000+ employees across two business units, covering sales, HR, finance, learning and supply chain. I own the leads, deals, units, HR, learning, supply chain and reservations domains, across both the Laravel backend and the Next.js front end.",
    impact: ["6,000+ daily users", "Two-tenant architecture", "Odoo v19 two-way sync"],
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
  },
  {
    id: 2,
    title: "Akaza Travel — Hotel & Tour Booking Platform",
    role: "Principal Engineer · Giantrex",
    period: "Feb 2026 — Present",
    companyLogo: "/giantrex.png",
    description:
      "Booking platform for hotels, tours and airport transfers. Hotelbeds powers hotel search and booking, with rates and cancellation terms captured at the moment of booking so a later supplier change can't alter a confirmed reservation. Payments run through Stripe and PayPal behind one gateway interface, with exact integer arithmetic on every multi-currency amount.",
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
    image: "/akaza.webp",
  },
  {
    id: 3,
    title: "Rahwan Shipping — Shopify Delivery App",
    role: "Sole Backend Engineer · Giantrex",
    period: "Nov 2025 — Present",
    companyLogo: "/giantrex.png",
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
    // Shopify app itself is served from https://shopify.rahwan.co
    image: "/rahwan.webp",
  },
  {
    id: 4,
    title: "Egyptian Customs Authority",
    role: "Full Stack Engineer · ACME IES",
    period: "2024 — 2025",
    description:
      "National initiative to modernise Egypt's customs operations. Microservices backend and registration APIs for brokers, agents and stakeholders, behind multi-factor authentication.",
    impact: ["National deployment", "Microservices", "Multi-factor auth"],
    stack: ["Laravel", "PHP", "MySQL", "Next.js", "GitLab CI"],
    link: "https://customs.gov.eg/",
    image: "/customs.webp",
  },
  {
    id: 5,
    title: "Egyptian Government Digital Transformation",
    role: "Full Stack Engineer · ACME IES",
    period: "2022 — 2024",
    description:
      "Two national systems. The National Archives platform digitises Egypt's public records, with role-based access and a custom permission model. The National Silos platform governs grain logistics on IBM Cloud Paks, with Node.js services reading weighbridge scales at silos nationwide.",
    impact: ["Two national systems", "Role-based access control", "IBM Cloud Paks"],
    stack: ["Laravel", "PHP", "Node.js", "MySQL", "IBM Cloud Paks"],
    // No image: internal government systems, no shareable screenshots exist.
    // Render this one as a text-only card. Design note: give it the same footprint
    // as an image card so the grid doesn't break — a solid/gradient panel with the
    // title set large works, and "no screenshot" reads as discretion, not a gap.
    image: null,
    textOnly: true,
  },
  {
    id: 6,
    title: "Welhof — Refurbished Appliance E-commerce",
    role: "Backend Engineer · TSR Ventures",
    period: "Sep 2024 — Mar 2025",
    description:
      "Backend for a Dutch e-commerce platform selling refurbished home appliances. Product and category management, warehouse and inventory tracking, and the order and stock handling behind it.",
    impact: ["Netherlands market", "Warehouse management", "Inventory tracking"],
    stack: ["PHP", "Yii", "MySQL", "Linux"],
    image: "/welhof.webp",
  },
  {
    id: 7,
    title: "Delecato — Premium Food E-commerce",
    role: "Full Stack Engineer",
    period: "Feb — Apr 2025",
    description:
      "Online store for a Germany-based brand selling dates, nuts and dried fruits. Built the storefront, product structure and performance work, with Stripe payments and DPD shipping automation.",
    impact: ["Germany market", "Stripe payments", "DPD shipping automation"],
    stack: ["Shopify", "Liquid", "JavaScript", "Stripe"],
    link: "https://delecato.de/",
    image: "/delecato.webp",
  },
];

// REMOVED, deliberately — do not reintroduce:
//   AuraKore  — Django. Cut along with all Python/Django content.
//   Pixsouk   — Python/Flask/OpenCV. DECIDE: it's the only AI/ML work you have, but it's
//               one Python card on an otherwise PHP/JS site. Leaning cut, for coherence.

export const skillGroups = [
  {
    title: "Backend",
    skills: ["PHP", "Laravel", "Node.js", "Yii", "REST APIs", "GraphQL", "Octane"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Data",
    skills: ["PostgreSQL", "MySQL", "Redis", "Typesense", "Laravel Scout"],
  },
  {
    title: "Architecture",
    skills: [
      "Domain-Driven Design",
      "Clean Architecture",
      "Multi-tenancy",
      "Microservices",
      "Event-driven design",
    ],
  },
  {
    title: "DevOps",
    skills: [
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
    skills: [
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

export const experience = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "The Address Investments",
    period: "Jan 2025 — Present",
    type: "Full-time · Onsite",
    description:
      "Core engineer on a multi-tenant ERP/CRM used by 6,000+ employees. Own the leads, deals, units, HR, learning, supply chain and reservations domains across the Laravel backend and the Next.js front end.",
    stack: ["Laravel", "PHP", "PostgreSQL", "Redis", "Octane", "Next.js", "React"],
  },
  {
    id: 2,
    title: "Partner, Software Engineering",
    company: "Giantrex",
    // TODO: confirm — Nov 2025 is inferred from repo activity, never verified.
    period: "Nov 2025 — Present",
    type: "Part-time · Remote",
    description:
      "Games and VR studio expanding into software products. I own backend architecture across the software line — Akaza Travel and Rahwan Shipping.",
    stack: ["Laravel", "PostgreSQL", "Next.js", "React Router", "Flutter", "Shopify"],
  },
  {
    id: 3,
    title: "Freelance Software Engineer",
    company: "Upwork — Top Rated, 100% Job Success",
    period: "2022 — Present",
    type: "Freelance · Remote",
    description:
      "Selected contracts across ERP, SaaS and e-commerce. AuraKore (Feb 2026 – Present), TSR Ventures / Welhof (Sep 2024 – Mar 2025), Leadmedia (2022 – 2024).",
    stack: ["Laravel", "PHP", "Yii", "PostgreSQL", "MySQL", "GCP"],
  },
  {
    id: 4,
    title: "Full Stack PHP Developer",
    company: "ACME IES",
    period: "Jun 2022 — Jan 2025",
    type: "Full-time · Onsite",
    description:
      "Backend for Egyptian government digital transformation — the Customs Authority, the National Archives and the National Silos platform — plus the Exponile marketplace.",
    stack: ["Laravel", "PHP", "MySQL", "Node.js", "Next.js"],
  },
  {
    id: 5,
    title: "B.Sc. Computer Science — Dual Degree",
    company: "Arab Open University · The Open University (UK)",
    period: "2018 — 2022",
    type: "Education",
    description: "Graduated with second-class honours.",
    stack: [],
  },
];

export const testimonials = [
  {
    quote:
      "Omar is a professional PHP developer with good coding skills. He knows his way in complex tasks. Hoping to have a long term collaboration with him.",
    name: "Jalal Oussail",
    title: "CTO at Welhof",
  },
  {
    quote:
      "Omar built our entire e-commerce platform from the ground up. He understood our business needs perfectly and delivered a polished, high-performing store that exceeded our expectations. Reliable, fast, and great to work with.",
    name: "Bilal Hassan",
    title: "CEO at Delecato",
  },
  {
    quote:
      "The contributions of Omar to our team have been exceptional. His profound expertise and ability to tackle complex challenges have significantly advanced our projects. Consistently delivering high-quality code and integrating sophisticated features with ease.",
    name: "Jean Pierre",
    title: "CTO at Leadmedia",
  },
  {
    quote:
      "Throughout our university journey, Omar demonstrated exceptional technical skills and dedication. His knack for tackling challenging problems and proactive approach made him a standout teammate. His passion for computer science significantly contributed to our collective success.",
    name: "Ebrahim Aboulfadl",
    title: "Back-End Developer at National Technologies",
  },
  // OPTIONAL — you chose to cut this with the AuraKore card, but the quote names no
  // technology, so it survives on its own. Uncomment to go from 4 testimonials to 5.
  // {
  //   quote:
  //     "Excellent and Professional. His communication is top-notch, he met all deadlines, and he is very knowledgeable.",
  //   name: "Cheick Ouedraogo",
  //   title: "CEO",
  // },
];

export const contact = {
  headline:
    "Available for senior backend and full-stack roles, and for contract work on enterprise systems.",
  email: "derbalajr@gmail.com",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/derbalajr" },
  { name: "GitLab", url: "https://gitlab.com/derbalajr" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/derbalajr/" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/derbalajr" },
];

export const seo = {
  title: "Omar Derbala — Senior Full Stack Engineer | Laravel & Next.js",
  description:
    "Senior full stack engineer building enterprise ERP, CRM and booking platforms in Laravel, PostgreSQL and Next.js. Top Rated on Upwork.",
  url: "https://derbalajr.com",
};
