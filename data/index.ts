// All site copy, per language. The original English source is the
// "Portfolio 2026 v2" design artifact — see docs/design/artifact.dc.html and
// the decision log in docs/design/PORTFOLIO_CONTENT.md.

import * as en from "./en";
import * as ar from "./ar";
import type { Locale } from "./types";

export * from "./types";

export type Content = typeof en;

// Typing the map against the English module is what keeps the Arabic file
// honest: a missing, renamed or extra export fails typecheck.
const content: Record<Locale, Content> = { en, ar };

export function getContent(locale: Locale): Content {
  return content[locale];
}

export const locales: Locale[] = ["en", "ar"];

export const dir: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ar: "rtl" };
