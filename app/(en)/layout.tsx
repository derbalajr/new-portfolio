import { RootShell, buildMetadata } from "../shell";

export { viewport } from "../shell";
export const metadata = buildMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
