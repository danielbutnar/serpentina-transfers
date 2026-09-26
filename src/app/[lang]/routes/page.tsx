import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RoutePrice } from "@/components/routes/RoutePrice";
import { SectionBar } from "@/components/SectionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDuration, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, FARES } from "@/lib/fares";
import { routeSlug } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/routes">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).routePages.index.metaTitle };
}

export default async function RoutesIndex({ params }: PageProps<"/[lang]/routes">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const r = t.routePages;

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main id="booking" tabIndex={-1}>
        <div className="flex flex-col gap-3 border-b-3 border-ink px-5 pt-7 pb-6 lg:px-12 lg:pt-12 lg:pb-9">
          <h1 className="text-display-sm leading-display font-black tracking-display lg:text-display-lg">{r.index.title}</h1>
          <p className="max-w-160 text-lg text-muted">{r.index.intro}</p>
        </div>
        {AIRPORTS.map((a, i) => (
          <section key={a} aria-labelledby={`airport-${a}-title`}>
            <SectionBar id={`airport-${a}`} number={i + 1} title={`${a} · ${t.airports[a]}`} />
            <ul className="grid gap-2.5 px-5 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:px-12 lg:py-8">
              {DESTINATIONS.map((d) => (
                <li key={d}>
                  <Link href={`/${lang}/routes/${routeSlug(a, d)}/`} className="flex h-full flex-col gap-1 border-2 border-ink bg-white p-4 hover:bg-sign-soft">
                    <span className="text-lg font-black">{DESTINATION_NAMES[d]}</span>
                    <span className="font-mono text-xs">
                      {FARES[a][d].km} KM · {formatDuration(FARES[a][d].minutes, lang)}
                    </span>
                    <span className="mt-auto pt-2 text-title-sm font-black">
                      <RoutePrice from={a} to={d} locale={lang} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
