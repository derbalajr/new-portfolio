# Share card and icons

Both are rendered by a headless browser in the site's own fonts and colours,
so they stay crisp and can't drift from the site. Needs Playwright with
Chromium and a network connection (fonts load from Google Fonts); the icons
also need Python with Pillow.

```bash
cd docs/design/og
npm i playwright && npx playwright install chromium
node card.mjs   # public/og.jpg, public/og-ar.jpg
node icon.mjs   # favicon.ico, icon-192/512, icon-maskable-512, apple-touch-icon
```

## Share card (`card.html`)

1200×630, one per language — `/` uses `og.jpg`, `/ar` uses `og-ar.jpg`
(`meta.ogImage` in `data/en.ts` / `data/ar.ts`).

- Everything that matters — photo, name, role — sits in the centre 600px
  column. WhatsApp crops the card to about 1.4:1 around the centre, iMessage
  and some Telegram clients to a square; LinkedIn and X show it whole.
- JPEG, not WebP: LinkedIn and some chat apps still reject WebP previews,
  and WhatsApp drops preview images over roughly 300 KB.
- The photo is `public/omar-derbala.webp`, the same as the hero and
  `Person.image` in the JSON-LD.

Chat apps cache previews per URL. After changing the card, re-scrape with the
LinkedIn Post Inspector and Facebook Sharing Debugger (WhatsApp uses
Facebook's cache), or share a URL with a query string to see it immediately.

## Icons (`icon.html`)

The OD tile from the nav. `?variant=small` draws heavier, larger letters for
the 16–48px favicon; `?variant=maskable` keeps the letters inside Android's
safe zone; `?variant=square` is full-bleed for iOS, which rounds it itself.
