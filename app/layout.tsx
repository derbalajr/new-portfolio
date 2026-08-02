import type { Metadata } from "next";
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
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Omar Derbala — Senior Full Stack Engineer. Laravel, PostgreSQL, Next.js.",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Derbala — Senior Full Stack Engineer",
    description:
      "I build the systems companies run on. Laravel and PostgreSQL on the backend, React and Next.js on the front.",
    images: ["/og.webp"],
  },
  alternates: {
    canonical: "https://derbalajr.com",
  },
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
        <meta name="theme-color" content="#05070c" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
  );
}
