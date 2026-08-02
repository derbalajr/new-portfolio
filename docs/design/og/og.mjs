// Render the Open Graph card at exactly 1200x630 over a background plate.
//
//   node og.mjs /path/to/gemini-plate.png [outfile.png]
//
// Text is rendered by the browser in the site's own fonts and tokens, so it
// stays crisp and can't drift from the site.

import { chromium } from "playwright";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { extname, resolve } from "node:path";

const bgPath = resolve(process.argv[2] || "");
const out = resolve(process.argv[3] || "./og.png");

if (!existsSync(bgPath)) {
  console.error(`Background not found: ${bgPath}`);
  process.exit(1);
}

const mime =
  { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" }[
    extname(bgPath).toLowerCase()
  ] || "image/png";

const dataUri = `data:${mime};base64,${readFileSync(bgPath).toString("base64")}`;
const html = readFileSync("./og.html", "utf8").replace("__BG__", dataUri);
writeFileSync("./og.rendered.html", html);

const b = await chromium.launch();
const p = await (await b.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
})).newPage();

await p.goto("file://" + resolve("./og.rendered.html"), { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);
await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await b.close();

console.log("wrote", out);
