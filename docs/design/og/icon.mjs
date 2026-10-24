// Renders every site icon from icon.html, then sizes them down with Pillow:
//
//   cd docs/design/og && node icon.mjs
//
// public/favicon.ico      16, 32, 48 (small variant — heavier letters)
// public/icon-192.png     rounded tile, transparent corners
// public/icon-512.png     rounded tile, transparent corners
// public/icon-maskable-512.png  full-bleed, letters inside the safe zone
// public/apple-touch-icon.png   180, full-bleed (iOS rounds it)

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const tmp = mkdtempSync(join(tmpdir(), "od-icon-"));
const file = "file://" + resolve("./icon.html");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 } });

const shots = {};
for (const variant of ["default", "small", "square", "maskable"]) {
  await page.goto(`${file}?variant=${variant}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  shots[variant] = join(tmp, `${variant}.png`);
  await page.screenshot({ path: shots[variant], omitBackground: true });
}
await browser.close();

const pub = resolve("../../../public");
execFileSync("python3", [
  "-c",
  `
import sys
from PIL import Image
d, s, sq, m, pub = sys.argv[1:]
L = Image.LANCZOS
Image.open(s).save(f"{pub}/favicon.ico", sizes=[(16,16),(32,32),(48,48)])
Image.open(d).resize((192,192), L).save(f"{pub}/icon-192.png", optimize=True)
Image.open(d).save(f"{pub}/icon-512.png", optimize=True)
Image.open(m).convert("RGB").save(f"{pub}/icon-maskable-512.png", optimize=True)
Image.open(sq).convert("RGB").resize((180,180), L).save(f"{pub}/apple-touch-icon.png", optimize=True)
`,
  shots.default,
  shots.small,
  shots.square,
  shots.maskable,
  pub,
]);
console.log("wrote favicon.ico, icon-192/512, icon-maskable-512, apple-touch-icon");
