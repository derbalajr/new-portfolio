// Clone-stamp a region over the generator's ✦ glyph.
//
//   node unmark.mjs <in> <out> <cx> <cy> <radius> <srcDx> <srcDy>
//
// Copies a same-sized patch of fabric from (cx+srcDx, cy+srcDy) and blends it
// over the glyph through a feathered circular mask, so there's no hard edge.

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, extname } from "node:path";

const [inp, outp, cx, cy, r, dx, dy] = process.argv.slice(2);
const f = resolve(inp);
const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" }[
  extname(f).toLowerCase()
];
const uri = `data:${mime};base64,${readFileSync(f).toString("base64")}`;

const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setContent(`<img id="i" src="${uri}">`);
await p.waitForFunction(() => document.getElementById("i")?.complete);

const dataUrl = await p.evaluate(
  ({ cx, cy, r, dx, dy }) => {
    const img = document.getElementById("i");
    const W = img.naturalWidth, H = img.naturalHeight;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const size = r * 2;
    // Build the patch: the source fabric, masked to a feathered circle.
    const patch = document.createElement("canvas");
    patch.width = size; patch.height = size;
    const pc = patch.getContext("2d");
    pc.drawImage(img, cx + dx - r, cy + dy - r, size, size, 0, 0, size, size);
    pc.globalCompositeOperation = "destination-in";
    const g = pc.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.62, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    pc.fillStyle = g;
    pc.fillRect(0, 0, size, size);

    ctx.drawImage(patch, cx - r, cy - r);
    return c.toDataURL("image/png");
  },
  { cx: +cx, cy: +cy, r: +r, dx: +dx, dy: +dy }
);

writeFileSync(resolve(outp), Buffer.from(dataUrl.split(",")[1], "base64"));
await b.close();
console.log("wrote", outp);
