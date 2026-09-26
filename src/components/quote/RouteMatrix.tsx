"use client";

import { fill, formatPrice } from "@/i18n/config";
import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, FARES, minibusPrice } from "@/lib/fares";
import { useQuote } from "./QuoteProvider";

// Desktop and tablet: every airport against every destination. A price loads that route into the form.
export function RouteMatrix() {
  const q = useQuote();
  const { t, locale } = q;
  return (
    <table className="w-full table-fixed border-collapse border-3 border-ink bg-white text-left">
      <caption className="sr-only">{t.routes.caption}</caption>
      <thead>
        <tr className="border-b-3 border-ink">
          <th scope="col" className="w-[26%] px-5 py-3.5 align-middle font-mono text-xs font-bold tracking-widest uppercase">
            <span aria-hidden="true">{t.routes.matrixHead}</span>
            <span className="sr-only">{t.routes.destination}</span>
          </th>
          {AIRPORTS.map((code) => (
            <th key={code} scope="col" className="border-l border-ink px-5 py-3.5 align-top font-normal">
              <span className="block font-mono text-xl font-bold">{code}</span>
              <span className="block text-caption text-label">{t.airports[code]}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {DESTINATIONS.map((dest) => (
          <tr key={dest} className="border-b border-ink last:border-b-0">
            <th scope="row" className="px-5 py-4.5 text-lead font-extrabold">
              {DESTINATION_NAMES[dest]}
            </th>
            {AIRPORTS.map((code) => {
              const car = FARES[code][dest].car;
              const selected = q.from === code && q.to === dest;
              return (
                <td key={code} className="border-l border-ink p-0">
                  <button
                    type="button"
                    onClick={() => q.loadRoute(code, dest)}
                    aria-pressed={selected}
                    aria-label={fill(t.routes.cell, {
                      from: t.airports[code],
                      to: DESTINATION_NAMES[dest],
                      car: formatPrice(car, locale),
                      minibus: formatPrice(minibusPrice(car), locale),
                    })}
                    className={`flex h-full min-h-15 w-full flex-wrap items-baseline gap-x-2 px-5 py-3.5 text-left hover:bg-sign-soft focus-visible:-outline-offset-4 ${selected ? "bg-sign hover:bg-sign" : ""}`}
                  >
                    <span className="text-title-sm font-extrabold">{formatPrice(car, locale)}</span>
                    <span className="font-mono text-caption text-muted">/ {formatPrice(minibusPrice(car), locale)}</span>
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
