import { notFound } from "next/navigation";

// Catches unknown paths inside this language so they 404 within its own root
// layout — lang, dir, fonts and site CSS — instead of Next's bare page.
export default function CatchAll() {
  notFound();
}
