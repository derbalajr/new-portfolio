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
  metadataBase: new URL("https://omarderbala.com"),
  title: {
    default:
      "Omar Derbala — Senior Full Stack Engineer | Laravel, Django & Next.js",
    template: "%s | Omar Derbala",
  },
  description:
    "Senior Full Stack Engineer with 4+ years of experience building enterprise ERP/CRM platforms, delivery systems, and national-scale digital transformation projects. Expert in Laravel, Django, Next.js, DDD, and scalable distributed architectures. Based in Cairo, Egypt.",
  keywords: [
    "Omar Derbala",
    "Omar Derbala portfolio",
    "Full Stack Engineer",
    "Senior Full Stack Engineer",
    "Senior Software Engineer",
    "Laravel Developer",
    "Laravel Expert",
    "Django Developer",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "PHP Developer",
    "Backend Engineer",
    "ERP Developer",
    "CRM Developer",
    "Enterprise Software Engineer",
    "Domain-Driven Design",
    "Microservices",
    "Clean Architecture",
    "PostgreSQL",
    "TypeScript",
    "Docker",
    "Kubernetes",
    "Egypt Developer",
    "Cairo Developer",
    "Remote Full Stack Engineer",
    "Hire Full Stack Developer",
    "Flutter Developer",
    "Multi-tenant SaaS",
  ],
  authors: [{ name: "Omar Derbala", url: "https://omarderbala.com" }],
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
    url: "https://omarderbala.com",
    title: "Omar Derbala — Senior Full Stack Engineer",
    description:
      "Building enterprise systems that scale. 4+ years experience with Laravel, Django, Next.js. ERP/CRM platforms, delivery systems, government-scale projects.",
    siteName: "Omar Derbala — Portfolio",
    images: [
      {
        url: "/omar-new.webp",
        width: 1200,
        height: 630,
        alt: "Omar Derbala — Senior Full Stack Engineer specializing in Laravel, Django & Next.js",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Derbala — Senior Full Stack Engineer",
    description:
      "Building enterprise systems that scale — from database to deployment. Laravel, Django, Next.js expert.",
    images: ["/omar-new.webp"],
  },
  alternates: {
    canonical: "https://omarderbala.com",
  },
};

// JSON-LD structured data
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://omarderbala.com/#person",
  name: "Omar Derbala",
  givenName: "Omar",
  familyName: "Derbala",
  url: "https://omarderbala.com",
  image: "https://omarderbala.com/omar-new.webp",
  email: "derbalajr@gmail.com",
  telephone: "+201111293179",
  jobTitle: "Senior Full Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "The Address Holding",
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
    "Python",
    "Django",
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "Domain-Driven Design",
    "Clean Architecture",
    "Microservices",
    "Multi-tenant SaaS",
    "ERP Systems",
    "CRM Systems",
  ],
  sameAs: [
    "https://www.linkedin.com/in/derbalajr/",
    "https://github.com/derbalajr",
    "https://gitlab.com/derbalajr",
    "https://www.upwork.com/freelancers/derbalajr",
  ],
  description:
    "Senior Full Stack Engineer with 4+ years of experience building enterprise ERP/CRM platforms, delivery systems, and digital transformation projects.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://omarderbala.com/#website",
  name: "Omar Derbala — Senior Full Stack Engineer",
  url: "https://omarderbala.com",
  description:
    "Professional portfolio of Omar Derbala, Senior Full Stack Engineer specializing in Laravel, Django, and Next.js.",
  author: { "@id": "https://omarderbala.com/#person" },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://omarderbala.com/#profilepage",
  name: "Omar Derbala Portfolio",
  url: "https://omarderbala.com",
  mainEntity: { "@id": "https://omarderbala.com/#person" },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
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
        <link rel="apple-touch-icon" href="/omar-new.webp" />
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
