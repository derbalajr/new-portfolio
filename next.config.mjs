import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Renamed assets keep answering at their old URLs, so earlier crawls of
  // Person.image and links shared with the old card don't 404.
  async redirects() {
    return [
      { source: "/omar.webp", destination: "/omar-derbala-headshot.webp", permanent: true },
      { source: "/omar-derbala.webp", destination: "/omar-derbala-headshot.webp", permanent: true },
      { source: "/omar-derbala-portrait.webp", destination: "/omar-derbala-headshot.webp", permanent: true },
      { source: "/og.webp", destination: "/og.jpg", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "derbalajr",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: false,
  hideSourceMaps: true,
});
