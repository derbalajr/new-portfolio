// Renders the share cards from card.html: public/og.jpg (English) and
// public/og-ar.jpg (Arabic). Needs Playwright with Chromium; fonts load from
// Google Fonts, so it needs a network connection.
//
//   cd docs/design/og && node card.mjs
//
// JPEG, not WebP: LinkedIn and some chat apps still reject WebP previews,
// and WhatsApp drops images over ~300 KB.

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const photo =
  "data:image/webp;base64," +
  readFileSync(resolve("../../../public/omar-derbala.webp")).toString("base64");
const template = readFileSync("./card.html", "utf8");

const cards = [
  {
    out: "../../../public/og.jpg",
    lang: "en",
    dir: "ltr",
    name: "Omar Derbala",
    role: "Founder &amp; CTO, <b>Giantrex</b> · Software Engineer",
  },
  {
    out: "../../../public/og-ar.jpg",
    lang: "ar",
    dir: "rtl",
    name: "عمر دربالة",
    role: "مؤسس <b>Giantrex</b> ومديرها التقني · مهندس برمجيات",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const card of cards) {
  const html = template
    .replace("__LANG__", card.lang)
    .replace("__DIR__", card.dir)
    .replace("__PHOTO__", photo)
    .replace("__NAME__", card.name)
    .replace("__ROLE__", card.role);
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const jpg = await page.screenshot({ type: "jpeg", quality: 88 });
  writeFileSync(resolve(card.out), jpg);
  console.log(`wrote ${card.out} (${Math.round(jpg.length / 1024)} KB)`);
}

await browser.close();
