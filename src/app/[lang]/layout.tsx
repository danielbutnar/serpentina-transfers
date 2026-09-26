import type { Metadata } from "next";
import { JetBrains_Mono, Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CSP, cspEnabled } from "@/lib/csp";
import "../globals.css";

const publicSans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin", "latin-ext"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin", "latin-ext"], weight: ["400", "700"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    // A concept project: keep it out of search results.
    robots: { index: false, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${publicSans.variable} ${jetbrainsMono.variable}`}>
      <head>{cspEnabled && <meta httpEquiv="Content-Security-Policy" content={CSP} />}</head>
      <body>{children}</body>
    </html>
  );
}
