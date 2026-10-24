import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://derbalajr.com"),
  title: {
    default: "Omar Derbala — Founder & CTO of Giantrex | Senior Full Stack Engineer",
    template: "%s | Omar Derbala",
  },
  description:
    "Founder and CTO of Giantrex. Senior full stack engineer building enterprise ERP, CRM, booking and commerce platforms in Laravel, PostgreSQL and Next.js. Top Rated on Upwork.",
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
    title: "Omar Derbala — Founder & CTO of Giantrex",
    description:
      "Founder and CTO of Giantrex, and a senior full stack engineer. Enterprise ERP, CRM, booking and commerce platforms in Laravel, PostgreSQL and Next.js.",
    siteName: "Omar Derbala — Portfolio",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Omar Derbala — Founder & CTO, Giantrex. Senior Full Stack Engineer.",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Derbala — Founder & CTO of Giantrex",
    description:
      "I build the systems companies run on. Laravel and PostgreSQL on the backend, React and Next.js on the front.",
    images: ["/og.webp"],
  },
  alternates: {
    canonical: "https://derbalajr.com",
  },
};

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
  "@id": "https://derbalajr.com/#person",
  name: "Omar Derbala",
  givenName: "Omar",
  familyName: "Derbala",
  url: "https://derbalajr.com",
  // Person.image is the portrait, not the share card — schema.org wants an
  // image of the person here.
  image: "https://derbalajr.com/omar.webp",
  email: "derbalajr@gmail.com",
  telephone: "+201111293179",
  jobTitle: ["Founder & CTO", "Senior Full Stack Engineer"],
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
  description:
    "Founder and CTO of Giantrex. Senior Full Stack Engineer with four years of experience building enterprise ERP/CRM platforms, booking systems and national digital transformation projects.",
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
  founder: { "@id": "https://derbalajr.com/#person" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://derbalajr.com/#website",
  name: "Omar Derbala — Founder & CTO of Giantrex",
  url: "https://derbalajr.com",
  description:
    "Portfolio of Omar Derbala, founder and CTO of Giantrex and a senior full stack engineer specializing in Laravel, PostgreSQL and Next.js.",
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
  dateModified: "2026-10-24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personSchema,
              giantrexSchema,
              websiteSchema,
              profilePageSchema,
            ]),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
