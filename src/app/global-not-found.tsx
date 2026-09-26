import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import Link from "next/link";
import { LANGUAGE_NAMES, LOCALES } from "@/i18n/config";
import { CSP, cspEnabled } from "@/lib/csp";
import "./globals.css";

const publicSans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Page not found · Serpentina Transfers",
};

// Unmatched URLs have no language, so this page offers all three.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={publicSans.variable}>
      <head>{cspEnabled && <meta httpEquiv="Content-Security-Policy" content={CSP} />}</head>
      <body>
        <a href="#main" className="sr-only bg-sign px-4 py-3 font-bold focus:not-sr-only focus:absolute focus:top-2 focus:left-2">
          Skip to content
        </a>
        <main id="main" tabIndex={-1} className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-5 py-16">
          <p className="font-mono text-sm font-bold tracking-widest uppercase">404</p>
          <h1 className="text-4xl font-black tracking-title md:text-6xl">This page doesn’t exist</h1>
          <p className="text-lg text-muted">The link may be old. Choose a language to go to the home page.</p>
          <ul className="flex flex-wrap gap-3">
            {LOCALES.map((l) => (
              <li key={l}>
                <Link href={`/${l}`} hrefLang={l} lang={l} className="inline-flex h-12 items-center border-3 border-ink bg-sign px-5 font-extrabold">
                  {LANGUAGE_NAMES[l]}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
