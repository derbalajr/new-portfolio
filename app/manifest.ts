import type { MetadataRoute } from "next";

// Lets Android and desktop Chrome use the OD mark when the site is saved to a
// home screen, instead of a screenshot or the first letter of the title.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omar Derbala — Founder & CTO of Giantrex",
    short_name: "Omar Derbala",
    start_url: "/",
    display: "browser",
    background_color: "#05070c",
    theme_color: "#05070c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
