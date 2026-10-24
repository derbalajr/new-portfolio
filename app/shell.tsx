import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Manrope,
  JetBrains_Mono,
  Alexandria,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { getContent, dir, SITE_URL, type Locale } from "@/data";
import "./globals.css";

// The shell both root layouts render: app/(en)/layout.tsx for / and
// app/(ar)/layout.tsx for /ar. Each needs its own <html lang dir>, which is
// why this is two root layouts rather than one.

// Weight 400 is omitted: every font-display usage in the codebase pairs with
// font-medium, font-semibold or font-bold, so 400 was a file nobody rendered.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

// Arabic pages lead their font stacks with these (see the --ff-* variables
// in app/globals.css). Arabic subset only, so Latin text falls through to the
// Latin faces, and no adjusted fallback: that fallback is Arial with no
// unicode-range, which would catch the Latin text first. Not preloaded, since
// English pages never use them.
//
// Alexandria for display: geometric like Space Grotesk, and drawn by an
// Egyptian designer. IBM Plex Sans Arabic for text: open counters that hold
// up at 13px, and the same engineered tone as the mono.
const displayAr = Alexandria({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-display-ar",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const sansAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-ar",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export function buildMetadata(locale: Locale): Metadata {
  const m = getContent(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: "%s | Omar Derbala",
    },
    description: m.description,
    keywords: [
      "Omar Derbala",
      "Omar Derbala portfolio",
      "Giantrex",
      "Giantrex founder",
      "Giantrex CTO",
      "CTO",
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
    authors: [{ name: "Omar Derbala", url: SITE_URL }],
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
      locale: m.ogLocale,
      alternateLocale: locale === "en" ? ["ar_EG"] : ["en_US"],
      url: m.url,
      title: m.ogTitle,
      description: m.ogDescription,
      siteName: m.siteName,
      images: [
        {
          url: m.ogImage,
          width: 1200,
          height: 630,
          alt: m.ogAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twitterDescription,
      images: [m.ogImage],
    },
    alternates: {
      canonical: m.url,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        "x-default": SITE_URL,
      },
    },
  };
}

// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to
// non-zero values on notched devices. Without it the insets are always 0 and
// every safe-area rule in this codebase is a no-op.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070c",
};

// JSON-LD structured data
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Omar Derbala",
  alternateName: "عمر دربالة",
  givenName: "Omar",
  familyName: "Derbala",
  url: SITE_URL,
  // Person.image is the portrait, not the share card — schema.org wants an
  // image of the person here.
  image: `${SITE_URL}/omar-derbala-headshot.webp`,
  email: "derbalajr@gmail.com",
  telephone: "+201111293179",
  jobTitle: ["Founder & CTO", "Senior Full Stack Engineer"],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Chief Technology Officer",
      occupationLocation: { "@type": "City", name: "Cairo" },
    },
    {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      occupationLocation: { "@type": "City", name: "Cairo" },
    },
  ],
  knowsLanguage: ["en", "ar"],
  worksFor: [
    { "@id": "https://giantrex.net/#organization" },
    {
      "@type": "Organization",
      name: "The Address Investments",
    },
  ],
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
  // description is filled in per language by RootShell.
};

// Ties the person to the company they founded, so search engines can connect
// derbalajr.com and giantrex.net.
const giantrexSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://giantrex.net/#organization",
  name: "Giantrex",
  url: "https://giantrex.net/",
  description: "Software, AI and XR simulations.",
  founder: { "@id": `${SITE_URL}/#person` },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Omar Derbala — Founder & CTO of Giantrex",
  url: SITE_URL,
  description:
    "Portfolio of Omar Derbala, founder and CTO of Giantrex and a senior full stack engineer specializing in Laravel, PostgreSQL and Next.js.",
  author: { "@id": `${SITE_URL}/#person` },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  name: "Omar Derbala Portfolio",
  url: SITE_URL,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  dateCreated: "2024-01-01",
  dateModified: "2026-10-24",
};

export function RootShell({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const c = getContent(locale);
  const m = c.meta;
  // Each shipped product as a work the person made: gives search and answer
  // engines the person → project → URL links that the page shows visually.
  const works = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${m.url}/#work`,
    name: c.work.heading,
    itemListElement: c.projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.description,
        ...(p.link ? { url: p.link } : {}),
        creator: { "@id": `${SITE_URL}/#person` },
        ...(p.venture
          ? { producer: { "@id": "https://giantrex.net/#organization" } }
          : {}),
        keywords: p.stack.join(", "),
        inLanguage: locale,
      },
    })),
  };
  // The person and organisation are the same entities in both languages, so
  // they keep their ids; the website and profile page are per language.
  const schemas = [
    { ...personSchema, description: m.personDescription },
    giantrexSchema,
    {
      ...websiteSchema,
      "@id": `${m.url}/#website`,
      name: m.websiteName,
      url: m.url,
      description: m.websiteDescription,
      inLanguage: locale,
    },
    {
      ...profilePageSchema,
      "@id": `${m.url}/#profilepage`,
      name: m.profileName,
      url: m.url,
      inLanguage: locale,
    },
    works,
  ];

  return (
    <html
      lang={locale}
      dir={dir[locale]}
      className={`${display.variable} ${sans.variable} ${mono.variable} ${displayAr.variable} ${sansAr.variable}`}
    >
      <head>
        {/* Google shows the favicon beside results and wants a multiple of
            48px: the .ico carries 48, the PNGs cover high-density tabs. */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* rel="me" ties this site and the profiles together as one identity
            (the same set as Person.sameAs). */}
        {personSchema.sameAs.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
