import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://omarderbala.com"),
  title: {
    default: "Omar Derbala - Senior Full Stack Developer | Laravel & Next.js Expert",
    template: "%s | Omar Derbala - Full Stack Developer"
  },
  description: "Omar Derbala is a senior full stack developer specializing in PHP Laravel, Next.js, and React. 3+ years experience building scalable web applications, CRM-ERP systems, and e-commerce platforms. Currently at The Address Holding.",
  keywords: [
    "Omar Derbala",
    "Full Stack Developer",
    "PHP Developer",
    "Laravel Developer",
    "Next.js Developer",
    "React Developer",
    "Backend Engineer",
    "Web Developer",
    "Software Engineer",
    "CRM Development",
    "ERP Systems",
    "E-commerce Development",
    "API Development",
    "MySQL",
    "Redis",
    "Microservices",
    "Clean Architecture",
    "Egypt Developer"
  ],
  authors: [{ name: "Omar Derbala" }],
  creator: "Omar Derbala",
  publisher: "Omar Derbala",
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
    title: "Omar Derbala - Senior Full Stack Developer | Laravel & Next.js Expert",
    description: "Senior full stack developer specializing in PHP Laravel, Next.js, and React. 3+ years experience building scalable web applications and enterprise systems.",
    siteName: "Omar Derbala Portfolio",
    images: [
      {
        url: "/omar.webp",
        width: 1200,
        height: 630,
        alt: "Omar Derbala - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Derbala - Senior Full Stack Developer",
    description: "Senior full stack developer specializing in PHP Laravel, Next.js, and React. Building scalable web applications and enterprise systems.",
    images: ["/omar.webp"],
    creator: "@omarderbala",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "https://omarderbala.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Viewport for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#10b981" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/omar.webp" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/omar.webp" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/omar.webp" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Omar Derbala",
              "url": "https://omarderbala.com",
              "image": "https://omarderbala.com/omar.webp",
              "sameAs": [
                "https://www.linkedin.com/in/derbalajr/",
                "https://github.com/derbalajr",
                "https://gitlab.com/derbalajr",
                "https://www.upwork.com/freelancers/derbalajr"
              ],
              "jobTitle": "Senior Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "The Address Holding"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "Arab Open University"
              },
              "knowsAbout": [
                "PHP",
                "Laravel",
                "Next.js",
                "React",
                "MySQL",
                "JavaScript",
                "Web Development",
                "Full Stack Development",
                "Backend Development",
                "API Development"
              ],
              "description": "Senior full stack developer specializing in PHP Laravel, Next.js, and React with 3+ years of experience building scalable web applications and enterprise systems."
            })
          }}
        />
        
        {/* Professional Work Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Omar Derbala Portfolio",
              "url": "https://omarderbala.com",
              "description": "Professional portfolio of Omar Derbala, senior full stack developer specializing in Laravel, Next.js, and React development.",
              "author": {
                "@type": "Person",
                "name": "Omar Derbala"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://omarderbala.com/#{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
