// Arabic copy. Mirrors data/en.ts export for export; data/index.ts checks the
// two stay the same shape. Product, company and tool names stay in Latin
// script, as they are written in Egyptian tech writing, and digits stay
// Western.

import { SITE_URL } from "./site";
import type { NavItem, Stat, Project, SkillGroup, Role, Testimonial } from "./types";

export const navItems: NavItem[] = [
  { name: "Giantrex", link: "#giantrex" },
  { name: "الأعمال", link: "#work" },
  { name: "التقنيات", link: "#stack" },
  { name: "الخبرة", link: "#path" },
  { name: "التوصيات", link: "#words" },
];

export const heroData = {
  badge: "عمر دربالة · مؤسس Giantrex ومديرها التقني",
  headline: ["أبني الأنظمة", "التي تُدار بها"],
  headlineAccent: "الشركات.",
  tagline:
    "مؤسس Giantrex ومديرها التقني، ومهندس برمجيات أول. أصمّم وأبني المنصات التي تُدار بها الأعمال، من نموذج البيانات حتى الواجهة، بأي تقنية تتطلبها المشكلة.",
  proof: ["★ Top Rated على Upwork", "نسبة نجاح 100%", "أكثر من 4 سنوات في بيئة الإنتاج"],
  portrait: {
    src: "/omar-derbala-headshot.webp",
    width: 1200,
    height: 1607,
    alt: "عمر دربالة، مؤسس Giantrex ومديرها التقني",
    caption: "عمر دربالة",
    status: "متصل",
  },
  cta: {
    primary: { text: "تصفّح المشاريع", link: "#work" },
    secondary: {
      text: "تحميل السيرة الذاتية (بالإنجليزية)",
      hrefLang: "en",
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
  kicker: "01 / نبذة",
  lead: "أربع سنوات في بناء أنظمة تعتمد عليها الشركات فعلًا — أنظمة ERP وCRM، ومنصات حجز، وأسواق إلكترونية.",
  body: [
    "أسّست Giantrex وأقودها مديرًا تقنيًا. تبني الشركة البرمجيات وأنظمة الذكاء الاصطناعي ومحاكاة الواقع الممتد، وأتولى معمارية كل منتج برمجي تطلقه. وإلى جانبها أعمل مهندسًا أول على نظام ERP/CRM متعدد المستأجرين يستخدمه أكثر من 6,000 موظف، على الواجهتين الخلفية والأمامية معًا بدل أن أسلّم واجهة برمجية وأمضي، وأقبل عقودًا مختارة عبر Upwork.",
    "أكثر ما أفخر به عادةً هو العمل البعيد عن الأضواء: حسابات مالية لا تنحرف، وتكاملات مع الموردين تصمد حين يغيّر المورد شيئًا، ومزامنة بين نظامين لا يتفقان على أيّ البيانات هي الصحيحة.",
  ],
};

export const stats: Stat[] = [
  { value: "4+", display: "4+", label: "سنوات في بيئة الإنتاج" },
  { value: "6000+", display: "6,000+", label: "مستخدم يوميًا" },
  { value: "3", display: "3", label: "أنظمة حكومية وطنية" },
  { value: "100%", display: "100%", label: "نسبة النجاح على Upwork" },
];

export const giantrex = {
  kicker: "02 / شركتي",
  role: "المؤسس والمدير التقني",
  logo: {
    src: "/giantrex-lockup.png",
    width: 837,
    height: 129,
  },
  tagline: "برمجيات، وذكاء اصطناعي، ومحاكاة بالواقع الممتد.",
  body: "أسّست Giantrex لبناء برمجيات يجب أن تصمد في بيئة الإنتاج: محركات حجز، ومنصات لوجستية، وتكاملات للتجارة الإلكترونية. وبصفتي المدير التقني أحدد التوجه التقني، وأختار التقنيات، وأصمم معمارية كل منتج برمجي، ثم أكتب أصعب أجزائه بنفسي.",
  practicesHeading: "ما نبنيه",
  shippedHeading: "منتجات أطلقناها في Giantrex",
  visit: "زيارة",
  practices: [
    {
      name: "البرمجيات والذكاء الاصطناعي والأتمتة",
      detail: "منصات، وتطبيقات، ووكلاء ذكاء اصطناعي، وأتمتة",
    },
    {
      name: "الواقع الممتد والمحاكاة والتدريب",
      detail: "برامج تدريب، ومحاكاة، وبيئات غامرة",
    },
  ],
  link: { href: "https://giantrex.net/", label: "giantrex.net" },
};

export const work = {
  kicker: "03 / أعمال مختارة",
  heading: "أنظمة تعمل في بيئة الإنتاج",
  blurb: "تسع منصات في مجالات المؤسسات والحكومة والسفر والخدمات اللوجستية والتجارة.",
};

export const projects: Project[] = [
  {
    num: "01",
    name: "Akaza Travel",
    subject: "حجز الفنادق والجولات والتنقلات",
    role: "المدير التقني وكبير المهندسين · Giantrex",
    period: "فبراير 2026 — حتى الآن",
    description:
      "ثلاثة منتجات قابلة للحجز في سلة واحدة: فنادق عبر Hotelbeds، وجولات سياحية بتقويم إتاحة خاص وأيام محجوبة وتسعير حسب فئة الضيف، وتنقلات من المطار وإليه مسعّرة حسب المسار وفئة المركبة. تُثبَّت الأسعار وشروط الإلغاء لحظة الحجز، فلا يغيّر أي تعديل لاحق من المورد حجزًا مؤكدًا. تمر المدفوعات عبر Stripe وPayPal من خلال واجهة دفع موحدة، مع حساب دقيق بالأعداد الصحيحة لكل مبلغ متعدد العملات. ويحيط بذلك محرك عروض ترويجية بحملات موجهة وأكواد مولّدة وشروط استحقاق وتقارير استخدام، وسجلات عملاء تشمل العملاء المحتملين والملاحظات، وإشعارات بقوالب، وقسائم PDF، وتقارير إيرادات — والمنصة كلها بالإنجليزية والألمانية والفرنسية.",
    impact: [
      "فنادق وجولات وتنقلات",
      "بنك أسرّة Hotelbeds",
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
    shot: "منتج قيد التشغيل",
    span: 2,
    ratio: "21/9",
    venture: "Giantrex",
  },
  {
    num: "02",
    name: "Rahwan",
    subject: "منصة توصيل وإدارة مخزون",
    role: "المدير التقني ومهندس الواجهة الخلفية الوحيد · Giantrex",
    period: "نوفمبر 2025 — حتى الآن",
    description:
      "منصة لوجستية متعددة الأطراف للتجار في مصر، تخدم البائعين ومندوبي التوصيل وموظفي المستودعات والعملاء. تنتقل الشحنات من البائع إلى المستودع ثم إلى العميل عبر دورة حياة من إحدى عشرة حالة، مع توثيق كل عملية تسلّم برمز QR، وتأكيد الاستلام برمز تحقق لمرة واحدة (OTP). وفي الأساس دفتر قيود دائن ومدين يسوّي مبالغ الدفع عند الاستلام ورسوم الشحن وقيم الطلبات في محافظ البائعين، لتُصرف دفعات أو تُحصَّل. بنيت الواجهة الخلفية، ولوحة الإدارة وبوابة العملاء، وتطبيق Flutter للبائعين والمندوبين، وتطبيق Shopify — المنشور الآن على Shopify App Store — يسحب طلبات التجار مباشرة.",
    impact: [
      "بائعون ومندوبون ومستودعات وعملاء",
      "تسوية الدفع عند الاستلام",
      "ويب وإدارة وموبايل وShopify",
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
    article: {
      title: "Cash on delivery is a ledger problem",
      url: "https://dev.to/derbalajr/cash-on-delivery-is-a-ledger-problem-3oec",
    },
    link: "https://rahwan.co/",
    linkLabel: "rahwan.co",
    image: "/rahwan.webp",
    fit: "center top",
    plateTitle: "Rahwan",
    shot: "منتج قيد التشغيل",
    span: 1,
    ratio: "16/10",
    venture: "Giantrex",
  },
  {
    num: "03",
    name: "Rahwan Shipping",
    subject: "تطبيق Shopify لتوصيل الميل الأخير",
    role: "المدير التقني والمهندس الوحيد · Giantrex",
    period: "2026 — حتى الآن",
    description:
      "تطبيق Shopify يحوّل شركة شحن محلية إلى خيار شحن عند الدفع. تأتي الأسعار الحية من Carrier Service API، وتُرسل الطلبات إلى شركة الشحن تلقائيًا، ومع تحرك الطرد يكتب التطبيق حالات التنفيذ وأحداث التوصيل في Shopify، فيظهر الطلب «مُنفَّذًا» ويحصل العميل على رابط التتبع. بُني بأقل الصلاحيات الممكنة، مع webhooks الامتثال الثلاثة التي تشترطها GDPR، ومراقبة لسلامة الـ webhooks تنبّه التاجر إذا توقفت الطلبات عن الوصول، ومهمة خلفية لإعادة المحاولة بفواصل زمنية متزايدة.",
    impact: [
      "منشور على Shopify App Store",
      "أسعار حية عبر Carrier Service API",
      "تحديث التنفيذ والتتبع في Shopify",
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
    venture: "Giantrex",
  },
  {
    num: "04",
    name: "REFAQ",
    subject: "متجر ثنائي اللغة لدار تصميم رخام",
    role: "المهندس الوحيد",
    period: "أكتوبر 2026 — حتى الآن",
    description:
      "معرض ومتجر لدار في القاهرة تنحت الأثاث والقطع من الحجر الطبيعي، بالعربية والإنجليزية مع تخطيط كامل من اليمين إلى اليسار. لكل قطعة مقاسات وأنواع حجر، ولكل تركيبة سعرها ومخزونها ومدة تنفيذها. يجمع الزائر طلبه ويرسله دون تسجيل حساب: يعيد الخادم تسعير كل بند، ويحفظ الطلب مرة واحدة مهما تكرر الضغط على الزر، ويصدر رقمًا مرجعيًا ويحوّله إلى WhatsApp ليؤكده الفريق. وخلف ذلك لوحة إدارة للمنتجات والخيارات وأنواع الحجر والصور، وصندوق طلبات مع تصدير CSV، وبطاقات QR قابلة للطباعة لقطع المعارض، وتنبيهات بالبريد وملخصات يومية، وحسابات إدارة بالدعوة فقط. يعمل على Cloudflare Workers وD1 وR2 بتكلفة شبه معدومة شهريًا، وأُطلق في الوقت المناسب لمعرض La Marchée للتصميم.",
    impact: [
      "عربي / إنجليزي، RTL كامل",
      "تسعير ومخزون لكل خيار",
      "بطاقات QR لقطع المعارض",
      "Cloudflare Workers + D1",
    ],
    stack: [
      "React Router 8",
      "TypeScript",
      "Cloudflare Workers",
      "D1",
      "Drizzle",
      "R2",
      "Better Auth",
      "Tailwind CSS",
      "Playwright",
    ],
    link: "https://refaqeg.com/ar",
    linkLabel: "refaqeg.com",
    image: "/refaq.webp",
    fit: "center top",
    plateTitle: "نُحتت لترافقك العمر",
    shot: "refaqeg.com — قيد التشغيل",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "05",
    name: "The Address Investments",
    subject: "نظام ERP/CRM متعدد المستأجرين",
    role: "مهندس برمجيات أول",
    period: "يناير 2025 — حتى الآن",
    description:
      "نظام ERP/CRM مؤسسي يستخدمه أكثر من 6,000 موظف في وحدتي أعمال، ويغطي المبيعات والموارد البشرية والمالية والتعلّم وسلاسل الإمداد. أتولى نطاقات العملاء المحتملين والصفقات والوحدات والموارد البشرية والتعلّم وسلاسل الإمداد والحجوزات، على الواجهة الخلفية بـ Laravel والواجهة الأمامية بـ Next.js.",
    impact: [
      "أكثر من 6,000 مستخدم يوميًا",
      "معمارية ثنائية المستأجرين",
      "مزامنة ثنائية الاتجاه مع Odoo v19",
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
    shot: "منتج قيد التشغيل",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "06",
    name: "مصلحة الجمارك المصرية",
    subject: "تحديث منظومة الجمارك على المستوى الوطني",
    role: "مهندس Full Stack · ACME IES",
    period: "2024 — 2025",
    description:
      "مبادرة وطنية لتحديث عمليات الجمارك في مصر: واجهة خلفية بمعمارية الخدمات المصغّرة، وواجهات برمجية لتسجيل المخلّصين الجمركيين والوكلاء وأصحاب المصلحة، خلف مصادقة متعددة العوامل.",
    impact: ["نشر على المستوى الوطني", "خدمات مصغّرة", "مصادقة متعددة العوامل"],
    stack: ["Laravel", "PHP", "MySQL", "Next.js", "GitLab CI"],
    link: "https://customs.gov.eg/",
    linkLabel: "customs.gov.eg",
    image: "/customs.webp",
    fit: "center top",
    plateTitle: "الجمارك، رقميًا",
    shot: "customs.gov.eg — قيد التشغيل",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "07",
    name: "التحول الرقمي الحكومي في مصر",
    subject: "الأرشيف الوطني والصوامع الوطنية",
    role: "مهندس Full Stack · ACME IES",
    period: "2022 — 2024",
    description:
      "نظامان وطنيان. منصة الأرشيف الوطني ترقمن السجلات العامة في مصر، مع صلاحيات قائمة على الأدوار ونموذج أذونات مخصص. ومنصة الصوامع الوطنية تدير لوجستيات الحبوب على IBM Cloud Paks، مع خدمات Node.js تقرأ موازين البسكول في الصوامع على مستوى الجمهورية.",
    impact: [
      "نظامان وطنيان",
      "تحكم بالوصول قائم على الأدوار",
      "IBM Cloud Paks",
    ],
    stack: ["Laravel", "PHP", "Node.js", "MySQL", "IBM Cloud Paks"],
    fit: "center top",
    plate: {
      entries: [
        {
          name: "الأرشيف الوطني",
          detail: "السجلات العامة · صلاحيات قائمة على الأدوار",
        },
        {
          name: "الصوامع الوطنية",
          detail: "لوجستيات الحبوب · IBM Cloud Paks",
        },
      ],
      note: "لا توجد لقطة شاشة عامة — أنظمة داخلية",
    },
    span: 1,
    ratio: "16/10",
  },
  {
    num: "08",
    name: "Welhof",
    subject: "تجارة إلكترونية للأجهزة المجدَّدة",
    role: "مهندس واجهة خلفية · TSR Ventures",
    period: "سبتمبر 2024 — مارس 2025",
    description:
      "الواجهة الخلفية لمنصة تجارة إلكترونية هولندية تبيع الأجهزة المنزلية المجدَّدة: إدارة المنتجات والفئات، وتتبع المستودعات والمخزون، ومعالجة الطلبات وحركة المخزون خلف واجهة المتجر.",
    impact: ["السوق الهولندي", "إدارة المستودعات", "تتبع المخزون"],
    stack: ["PHP", "Yii", "MySQL", "Linux"],
    image: "/welhof.webp",
    fit: "center top",
    plateTitle: "Welhof",
    shot: "منتج قيد التشغيل",
    span: 1,
    ratio: "16/10",
  },
  {
    num: "09",
    name: "Delecato",
    subject: "تجارة إلكترونية لأغذية فاخرة",
    role: "مهندس Full Stack",
    period: "فبراير — أبريل 2025",
    description:
      "متجر إلكتروني لعلامة تجارية مقرها ألمانيا تبيع التمور والمكسرات والفواكه المجففة. بنيت واجهة المتجر وهيكلة المنتجات وتحسينات الأداء، مع مدفوعات Stripe وأتمتة الشحن عبر DPD. سبع مجموعات، وقائمة أمنيات وعرض سريع، وصفحة دفع تدعم Klarna وPayPal وApple Pay.",
    impact: [
      "السوق الألماني",
      "متجر DE / EN / AR",
      "دفع عبر Stripe وKlarna",
      "أتمتة الشحن عبر DPD",
    ],
    stack: ["Shopify", "Liquid", "JavaScript", "Stripe"],
    link: "https://delecato.de/",
    linkLabel: "delecato.de",
    image: "/delecato.webp",
    fit: "center top",
    plateTitle: "Der Orient direkt vor deiner Tür",
    shot: "delecato.de — قيد التشغيل",
    span: 1,
    ratio: "16/10",
  },
];

export const skillsSection = {
  kicker: "04 / القدرات",
  heading: "ما أعمل به",
};

export const skills: SkillGroup[] = [
  {
    title: "الواجهة الخلفية",
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
    title: "الواجهة الأمامية",
    num: "02",
    span: 3,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    title: "البيانات",
    num: "03",
    span: 2,
    items: ["PostgreSQL", "MySQL", "Redis", "Typesense", "Laravel Scout"],
  },
  {
    title: "المعمارية",
    num: "04",
    span: 4,
    items: [
      "التصميم الموجّه بالمجال",
      "المعمارية النظيفة",
      "تعدد المستأجرين",
      "الخدمات المصغّرة",
      "التصميم القائم على الأحداث",
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
    title: "التكاملات",
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

export const experience = {
  kicker: "05 / المسيرة",
  heading: "محطات مسيرتي المهنية",
};

export const roles: Role[] = [
  {
    period: "نوفمبر 2025 — حتى الآن",
    type: "مؤسس · عن بُعد",
    title: "المؤسس والمدير التقني",
    company: "Giantrex",
    url: "https://giantrex.net/",
    description:
      "أسّست Giantrex، استوديو يبني البرمجيات وأنظمة الذكاء الاصطناعي ومحاكاة الواقع الممتد. وبصفتي المدير التقني أحدد التوجه التقني وأصمم معمارية كل منتج برمجي تطلقه الشركة — Akaza Travel وRahwan وتطبيق Rahwan Shipping على Shopify App Store.",
    stack: [
      "Laravel",
      "PostgreSQL",
      "Octane",
      "Next.js",
      "React Router",
      "Flutter",
      "Shopify",
    ],
  },
  {
    period: "يناير 2025 — حتى الآن",
    type: "دوام كامل · حضوري",
    title: "مهندس برمجيات أول",
    company: "The Address Investments",
    description:
      "مهندس أساسي في نظام ERP/CRM متعدد المستأجرين يستخدمه أكثر من 6,000 موظف. أتولى نطاقات العملاء المحتملين والصفقات والوحدات والموارد البشرية والتعلّم وسلاسل الإمداد والحجوزات، على الواجهة الخلفية بـ Laravel والواجهة الأمامية بـ Next.js.",
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
    period: "2022 — حتى الآن",
    type: "عمل حر · عن بُعد",
    title: "مهندس برمجيات مستقل",
    company: "Upwork — Top Rated، نسبة نجاح 100%",
    description:
      "عقود مختارة في أنظمة ERP وSaaS والتجارة الإلكترونية: AuraKore (فبراير 2026 – حتى الآن)، وTSR Ventures / Welhof (سبتمبر 2024 – مارس 2025)، وLeadmedia (2022 – 2024).",
    stack: ["Laravel", "PHP", "Yii", "PostgreSQL", "MySQL", "GCP"],
  },
  {
    period: "يونيو 2022 — يناير 2025",
    type: "دوام كامل · حضوري",
    title: "مطوّر PHP Full Stack",
    company: "ACME IES",
    description:
      "الواجهة الخلفية لمشروعات التحول الرقمي الحكومي في مصر — مصلحة الجمارك، والأرشيف الوطني، ومنصة الصوامع الوطنية — إضافة إلى سوق Exponile الإلكتروني.",
    stack: ["Laravel", "PHP", "MySQL", "Node.js", "Next.js"],
  },
  {
    period: "2018 — 2022",
    type: "التعليم",
    title: "بكالوريوس علوم الحاسب — شهادة مزدوجة",
    company: "الجامعة العربية المفتوحة · The Open University (المملكة المتحدة)",
    description: "تخرجت بمرتبة الشرف الثانية.",
    stack: [],
  },
];

export const testimonialsSection = {
  kicker: "06 / التوصيات",
  heading: "عملاء عملت معهم",
  note: "الاقتباسات مترجمة عن الإنجليزية.",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "عمر مطوّر PHP محترف ويتمتع بمهارات برمجية جيدة، ويعرف طريقه في المهام المعقدة. نأمل في تعاون طويل الأمد معه.",
    initials: "JO",
    name: "Jalal Oussail",
    title: "المدير التقني في Welhof",
  },
  {
    quote:
      "بنى عمر منصة التجارة الإلكترونية الخاصة بنا بالكامل من الصفر. فهم احتياجات عملنا تمامًا، وسلّم متجرًا متقنًا وعالي الأداء فاق توقعاتنا.",
    initials: "BH",
    name: "Bilal Hassan",
    title: "الرئيس التنفيذي لـ Delecato",
  },
  {
    quote:
      "كانت إسهامات عمر في فريقنا استثنائية. خبرته العميقة وقدرته على التعامل مع التحديات المعقدة دفعتا مشاريعنا إلى الأمام بشكل ملحوظ.",
    initials: "JP",
    name: "Jean Pierre",
    title: "المدير التقني في Leadmedia",
  },
  {
    quote:
      "ممتاز ومحترف. تواصله على أعلى مستوى، والتزم بكل المواعيد، ويمتلك معرفة واسعة.",
    initials: "CO",
    name: "Cheick Ouedraogo",
    title: "الرئيس التنفيذي لـ AuraKore",
  },
];

export const contact = {
  kicker: "07 / تواصل",
  heading: ["لنبنِ معًا", "الجزء الصعب"],
  blurb:
    "متاح لأدوار هندسية عليا في الواجهة الخلفية وFull Stack، ولعقود عمل على الأنظمة المؤسسية.",
  email: "derbalajr@gmail.com",
  emailLabel: "البريد",
  whatsappLabel: "WhatsApp",
  whatsappCta: "راسلني على WhatsApp",
  whatsapp: "https://wa.me/201111293179",
  socials: [
    { name: "GitHub", url: "https://github.com/derbalajr" },
    { name: "GitLab", url: "https://gitlab.com/derbalajr" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/derbalajr/" },
    { name: "Upwork", url: "https://www.upwork.com/freelancers/derbalajr" },
    { name: "DEV", url: "https://dev.to/derbalajr" },
  ],
  upwork: {
    kicker: "حالة Upwork",
    score: "100%",
    scoreLabel: "نسبة نجاح الأعمال",
    facts: [
      "★ Top Rated منذ 2022",
      "◷ أرد خلال 24 ساعة",
      "◉ GMT+3 — ساعات عمل مشتركة مع أوروبا وشرق الولايات المتحدة",
    ],
  },
};

export const footer = {
  left: "© 2026 عمر دربالة — derbalajr.com",
  venture: { label: "المؤسس والمدير التقني، Giantrex", url: "https://giantrex.net/" },
  right: "القاهرة، مصر · GMT+3",
};

export const ui = {
  nav: {
    brand: "عمر دربالة",
    talk: "لنتحدث",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    siteMenu: "قائمة الموقع",
    switchLabel: "English",
    switchLang: "en",
    switchHref: "/",
  },
  readMore: "اقرأ المزيد",
  showLess: "عرض أقل",
  readArticle: "اقرأ المقال (بالإنجليزية)",
  newTab: "(يفتح في علامة تبويب جديدة)",
  notFound: {
    title: "هذه الصفحة غير موجودة",
    body: "ربما كُتب العنوان بشكل خاطئ، أو نُقلت الصفحة.",
    cta: "العودة إلى الصفحة الرئيسية",
  },
};

export const meta = {
  url: `${SITE_URL}/ar`,
  ogLocale: "ar_EG",
  title: "عمر دربالة — مؤسس Giantrex ومديرها التقني | مهندس برمجيات أول",
  description:
    "مؤسس Giantrex ومديرها التقني. مهندس برمجيات أول يبني منصات ERP وCRM والحجز والتجارة الإلكترونية للمؤسسات. Top Rated على Upwork.",
  ogTitle: "عمر دربالة — مؤسس Giantrex ومديرها التقني",
  ogDescription:
    "مؤسس Giantrex ومديرها التقني، ومهندس برمجيات أول. منصات ERP وCRM والحجز والتجارة الإلكترونية للمؤسسات.",
  ogImage: "/og-ar.jpg",
  ogAlt: "عمر دربالة — مؤسس Giantrex ومديرها التقني · مهندس برمجيات",
  twitterDescription:
    "أبني الأنظمة التي تُدار بها الشركات، من نموذج البيانات حتى الواجهة.",
  siteName: "عمر دربالة — معرض الأعمال",
  personDescription:
    "مؤسس Giantrex ومديرها التقني. مهندس برمجيات أول بخبرة أربع سنوات في بناء أنظمة ERP/CRM للمؤسسات ومنصات الحجز ومشروعات التحول الرقمي الوطنية.",
  websiteName: "عمر دربالة — مؤسس Giantrex ومديرها التقني",
  websiteDescription:
    "معرض أعمال عمر دربالة، مؤسس Giantrex ومديرها التقني ومهندس برمجيات أول.",
  profileName: "معرض أعمال عمر دربالة",
};
