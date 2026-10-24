import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://derbalajr.com";
  // Each language lists the other as an alternate, so search engines treat
  // them as one page in two languages rather than duplicates.
  const languages = {
    en: baseUrl,
    ar: `${baseUrl}/ar`,
    "x-default": baseUrl,
  };

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
