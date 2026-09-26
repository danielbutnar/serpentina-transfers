import Link from "next/link";
import { LANGUAGE_NAMES, LOCALES, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const NAV = [
  { id: "routes", key: "routes" },
  { id: "fleet", key: "fleet" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
] as const;

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <header>
      <a
        href="#booking"
        className="sr-only z-10 bg-sign px-4 py-3 font-bold focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:outline-3 focus:outline-ink"
      >
        {t.skip}
      </a>
      <div className="flex justify-center bg-ink px-3 py-2 font-mono text-2xs font-bold tracking-bar text-sign uppercase lg:justify-between lg:px-12 lg:text-xs lg:tracking-widest">
        <span>{t.concept}</span>
        <span className="hidden lg:inline">{t.portfolio}</span>
      </div>
      <div className="grid h-15 grid-cols-[1fr_auto] items-stretch border-b-3 border-ink lg:h-auto lg:grid-cols-[1fr_auto_auto]">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 px-5 lg:gap-3.5 lg:px-12 lg:py-4.5">
          <span aria-hidden="true" className="flex size-8 items-center justify-center bg-ink text-lg font-black text-sign lg:size-10 lg:text-title-sm">
            S
          </span>
          <span className="flex flex-col leading-sign">
            <span className="text-body-lg font-black tracking-brand lg:text-xl">SERPENTINA</span>
            <span className="hidden font-mono text-2xs tracking-label-wide lg:block">TRANSFERS · BRAȘOV</span>
            <span className="sr-only lg:hidden">Transfers</span>
          </span>
        </Link>
        <nav aria-label={t.nav.label} className="hidden border-l-3 border-ink lg:flex">
          {NAV.map((item, i) => (
            <Link
              key={item.id}
              href={`/${locale}/#${item.id}`}
              className="flex items-center gap-1.5 border-r border-ink px-5.5 text-body-sm font-bold last:border-r-0 hover:bg-sign"
            >
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <nav aria-label={t.languageLabel} className="flex border-l-3 border-ink">
          {LOCALES.map((l) => {
            const current = l === locale;
            return (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={current ? "page" : undefined}
                aria-label={LANGUAGE_NAMES[l]}
                className={`flex w-11 items-center justify-center font-mono text-xs font-bold uppercase lg:w-auto lg:px-4 lg:text-caption ${current ? "on-ink bg-ink text-sign" : "hover:bg-sign"}`}
              >
                {l}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
