import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NameSignCard } from "@/components/NameSignCard";
import { BookRouteButton } from "@/components/routes/BookRouteButton";
import { RoutePrice } from "@/components/routes/RoutePrice";
import { RouteMap } from "@/components/RouteMap";
import { SectionBar } from "@/components/SectionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LOCALES, fill, formatDuration, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DESTINATIONS, DESTINATION_NAMES, FARES } from "@/lib/fares";
import { ALL_ROUTES, MOUNTAIN_DESTINATIONS, ROAD_BY_AIRPORT, parseRouteSlug, routeSlug, viaTowns } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ALL_ROUTES.map((r) => ({ lang, route: routeSlug(r.from, r.to) })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/routes/[route]">): Promise<Metadata> {
  const { lang, route } = await params;
  const key = parseRouteSlug(route);
  if (!hasLocale(lang) || !key) return {};
  const t = getDictionary(lang);
  const fare = FARES[key.from][key.to];
  return {
    title: fill(t.routePages.metaTitle, { code: key.from, to: DESTINATION_NAMES[key.to] }),
    description: fill(t.routePages.metaDescription, {
      airport: t.airports[key.from],
      to: DESTINATION_NAMES[key.to],
      km: fare.km,
      time: formatDuration(fare.minutes, lang),
    }),
  };
}

export default async function RoutePage({ params }: PageProps<"/[lang]/routes/[route]">) {
  const { lang, route } = await params;
  const key = parseRouteSlug(route);
  if (!hasLocale(lang) || !key) notFound();
  const t = getDictionary(lang);
  const r = t.routePages;
  const { from, to } = key;
  const fare = FARES[from][to];
  const via = viaTowns(from, to);
  const airport = t.airports[from];
  const dest = DESTINATION_NAMES[to];
  const time = formatDuration(fare.minutes, lang);

  const facts: [string, ReactNode][] = [
    [r.facts.distance, `${fare.km} km`],
    [r.facts.time, time],
    [r.facts.car, <RoutePrice key="car" from={from} to={to} locale={lang} />],
    [r.facts.minibus, <RoutePrice key="minibus" from={from} to={to} locale={lang} vehicle="minibus" />],
  ];

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main id="booking" tabIndex={-1}>
        <div className="grid grid-cols-1 border-b-3 border-ink lg:grid-cols-panel">
          <div className="flex flex-col gap-6 px-5 py-7 lg:px-12 lg:py-12">
            <Link href={`/${lang}/routes/`} className="self-start font-mono text-sm font-bold underline underline-offset-4">
              <span aria-hidden="true">← </span>
              {r.index.title}
            </Link>
            <h1 className="text-display-sm leading-display font-black tracking-display wrap-break-word hyphens-auto lg:text-display">
              {fill(r.title, { airport, to: dest })}
            </h1>
            <p className="max-w-160 text-lg text-muted">
              {via.length ? fill(r.introVia, { km: fare.km, time, via: via.join(", ") }) : fill(r.introDirect, { km: fare.km, time })}
            </p>
            <dl className="grid grid-cols-2 border-2 border-ink bg-white xl:grid-cols-4">
              {facts.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex flex-col-reverse gap-1 border-ink p-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t xl:border-t-0" : ""} ${i === 2 ? "xl:border-l" : ""}`}
                >
                  <dt className="label-mono">{label}</dt>
                  <dd className="text-title font-black tracking-heading">{value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <BookRouteButton from={from} to={to} locale={lang} label={r.book} />
            </div>
          </div>
          <div className="flex flex-col justify-center border-t-3 border-ink bg-sign p-5 lg:border-t-0 lg:border-l-3 lg:p-9">
            <RouteMap
              from={from}
              to={to}
              label={fill(t.map.label, { from: airport, to: dest, km: fare.km })}
              mountainsLabel={t.map.mountains}
              className="w-full border-2 border-ink bg-paper"
            />
          </div>
        </div>

        <section aria-labelledby="meet-title">
          <SectionBar id="meet" number={1} title={r.meetTitle} />
          <div className="flex flex-col gap-5 px-5 py-7 md:flex-row md:items-center md:gap-10 lg:px-12 lg:py-10">
            <p className="max-w-150 text-lg">{fill(r.meet, { airport })}</p>
            <NameSignCard name="" placeholder={t.sign.yourName} company={t.sign.company} />
          </div>
        </section>

        <section aria-labelledby="road-title">
          <SectionBar id="road" number={2} title={r.roadTitle} />
          <div className="flex max-w-200 flex-col gap-3 px-5 py-7 text-lg lg:px-12 lg:py-10">
            <p>{r.road[ROAD_BY_AIRPORT[from]]}</p>
            {MOUNTAIN_DESTINATIONS.includes(to) && <p>{r.winter}</p>}
          </div>
        </section>

        <section aria-labelledby="others-title">
          <SectionBar id="others" number={3} title={fill(r.others, { airport })} />
          <div className="flex flex-col gap-5 px-5 py-7 lg:px-12 lg:py-10">
            <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {DESTINATIONS.filter((d) => d !== to).map((d) => (
                <li key={d}>
                  <Link
                    href={`/${lang}/routes/${routeSlug(from, d)}/`}
                    className="flex h-full flex-col gap-1 border-2 border-ink bg-white p-4 hover:bg-sign-soft"
                  >
                    <span className="text-lg font-black">
                      {from} → {DESTINATION_NAMES[d]}
                    </span>
                    <span className="font-mono text-xs">
                      {FARES[from][d].km} KM · {formatDuration(FARES[from][d].minutes, lang)}
                    </span>
                    <span className="text-lg font-black">
                      <RoutePrice from={from} to={d} locale={lang} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/${lang}/routes/`} className="self-start font-bold underline underline-offset-4">
              {r.index.seeAll}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
