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
    "Building enterprise systems that scale — from database to deployment. Specializing in Laravel, Django, Next.js, and distributed architectures.",
  cta: {
    primary: { text: "View Projects", link: "#projects" },
    secondary: { text: "Download CV", link: "/Omar_Derbala_Senior_Backend.pdf" },
  },
};

export const projects = [
  {
    id: 1,
    title: "AuraKore — Multi-Tenant Enterprise ERP/CRM",
    role: "Senior Backend Engineer",
    description:
      "A comprehensive SaaS platform with CRM, double-entry accounting (52+ models), tax intelligence across 63+ jurisdictions, marketing automation, compliance management, and AI-powered agent workflows.",
    impact: ["10,631 tests", "14 bounded contexts", "Schema-per-tenant isolation"],
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "React", "TypeScript", "GCP"],
    image: "/aurakore.webp",
  },
  {
    id: 2,
    title: "Rahwan — Delivery & Inventory Platform",
    role: "Senior Full Stack Engineer · Giantrex",
    companyLogo: "/giantrex.png",
    description:
      "Multi-sided delivery marketplace with order lifecycle management, real-time tracking, polymorphic financial system with wallets and settlements, and a mobile app for delivery agents.",
    impact: ["3 platforms (Web, Admin, Mobile)", "DDD architecture", "Real-time tracking"],
    stack: ["Laravel", "Next.js", "Flutter", "PostgreSQL", "Firebase", "Twilio"],
    image: "/rahwan.webp",
  },
  {
    id: 3,
    title: "Akaza Travel — Luxury Booking Platform",
    role: "Senior Full Stack Engineer · Giantrex",
    companyLogo: "/giantrex.png",
    description:
      "Luxury Egypt travel platform integrating Hotelbeds API for hotel search and booking, tours, airport transfers, with admin CRM and finance dashboards.",
    impact: ["9 DDD domains", "Multi-currency support", "3 languages"],
    stack: ["Laravel", "Next.js", "TypeScript", "PostgreSQL", "Three.js", "Hotelbeds API"],
    image: "/akaza.webp",
  },
  {
    id: 4,
    title: "The Address — Internal CRM-ERP",
    role: "Backend Engineer",
    description:
      "Enterprise CRM-ERP system serving 6,000+ employees across sales, HR, and finance. Features include automated lead management, Meta Ads integration, recruitment portal, and financial reporting.",
    impact: ["6,000+ daily users", "Meta Ads integration", "Full recruitment pipeline"],
    stack: ["Laravel", "MySQL", "Redis", "Docker", "React"],
    image: "/the_address.webp",
  },
  {
    id: 5,
    title: "Egyptian Customs Authority",
    role: "Full Stack Engineer",
    description:
      "National digital transformation initiative modernizing Egypt's customs operations with microservices architecture, multi-factor authentication, and stakeholder registration systems.",
    impact: ["Government-scale", "Microservices architecture", "National deployment"],
    stack: ["Laravel", "Next.js", "MySQL", "PHP", "GitLab CI"],
    link: "https://customs.gov.eg/",
    image: "/customs.webp",
  },
  {
    id: 6,
    title: "Pixsouk — AI Image Processing",
    role: "Senior Full Stack Engineer",
    description:
      "AI-powered image processing tool supporting 8+ e-commerce platforms. Features background removal, watermark removal, and smart resizing with batch processing.",
    impact: ["8+ platform integrations", "AI-powered processing", "6 languages"],
    stack: ["Python", "Flask", "OpenCV", "rembg", "NumPy"],
    image: "/pixsouk.webp",
  },
  {
    id: 7,
    title: "Delecato — E-commerce Store",
    role: "Full Stack Engineer",
    description:
      "E-commerce platform for a Germany-based premium dates, nuts, and dried fruits brand. Built a full online store with product management, payment processing, and order fulfillment.",
    impact: ["Shopify-based", "Germany market", "Full e-commerce pipeline"],
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    link: "https://delecato.de/",
    image: "/delecato.webp",
  },
];

export const skillGroups = [
  {
    title: "Backend",
    skills: ["PHP", "Laravel", "Python", "Django", "Node.js", "Yii"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Flutter", "Tailwind CSS"],
  },
  {
    title: "Data",
    skills: ["PostgreSQL", "MySQL", "Redis", "SQL"],
  },
  {
    title: "Architecture",
    skills: ["DDD", "Clean Architecture", "Microservices", "Multi-tenancy", "Design Patterns"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD", "Linux", "GCP"],
  },
  {
    title: "Integrations & AI",
    skills: ["Anthropic API", "Gemini AI", "Hotelbeds", "Stripe", "Firebase", "Meta Ads"],
  },
];

export const experience = [
  {
    id: 1,
    title: "Backend Engineer",
    company: "The Address Holding",
    period: "Jan 2025 — Present",
    type: "Full-time",
    description:
      "Maintaining and optimizing a large-scale CRM-ERP system serving 6,000+ employees. Performance tuning with Redis caching, query optimization, and Clean Architecture principles.",
    stack: ["Laravel", "PHP", "MySQL", "Redis", "Docker"],
  },
  {
    id: 2,
    title: "Full Stack PHP Developer",
    company: "TSR Ventures & Solutions",
    period: "Oct 2024 — Apr 2025",
    type: "Part-time · Remote",
    description:
      "Led development of server-side applications using PHP, Yii, and MySQL for enterprise SaaS solutions based in the Netherlands.",
    stack: ["PHP", "Yii", "MySQL", "Linux"],
  },
  {
    id: 3,
    title: "Full Stack PHP Developer",
    company: "ACME IES",
    period: "Jun 2022 — Jan 2025",
    type: "Full-time",
    description:
      "Contributed to digital transformation projects for the Egyptian government. Built scalable systems with Laravel, MySQL, and microservices. Implemented Agile practices for faster delivery.",
    stack: ["Laravel", "PHP", "MySQL", "Next.js", "React"],
  },
  {
    id: 4,
    title: "Web Developer",
    company: "Leadmedia",
    period: "2022 — 2024",
    type: "Freelance",
    description:
      "Created custom websites and web applications for Canadian businesses, delivering tailored solutions for real estate brokers.",
    stack: ["Laravel", "PHP", "WordPress"],
  },
  {
    id: 5,
    title: "B.Sc. Computer Science — Dual Degree",
    company: "Arab Open University · The Open University (UK)",
    period: "2018 — 2022",
    type: "Education",
    description: "Graduated with second-class honors. Dual degree program between Egypt and the United Kingdom.",
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
      "Excellent and Professional. His communication is top-notch, he met all deadlines, and he is very knowledgeable.",
    name: "Cheick Ouedraogo",
    title: "CEO at AuraKore",
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
    title: "CTO at Leadmedia.ca",
  },
  {
    quote:
      "Throughout our university journey, Omar demonstrated exceptional technical skills and dedication. His knack for tackling challenging problems and proactive approach made him a standout teammate. His passion for computer science significantly contributed to our collective success.",
    name: "Ebrahim Aboulfadl",
    title: "Back-End Developer at National Technologies",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/derbalajr",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com/derbalajr",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/derbalajr/",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/derbalajr",
  },
];
