import { RootShell, buildMetadata } from "../shell";

export { viewport } from "../shell";
export const metadata = buildMetadata("ar");

export default function ArabicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="ar">{children}</RootShell>;
}
