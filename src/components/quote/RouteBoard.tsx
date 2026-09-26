"use client";

import { useState } from "react";
import { fill, formatDuration, formatPrice } from "@/i18n/config";
import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, FARES, minibusPrice, type AirportCode } from "@/lib/fares";
import { useQuote } from "./QuoteProvider";

// Phones: one airport at a time, picked with the tabs, as a list of routes.
export function RouteBoard() {
  const q = useQuote();
  const { t, locale } = q;
  const [airport, setAirport] = useState<AirportCode>("OTP");

  return (
    <div className="flex flex-col gap-3.5">
      <div role="group" aria-label={t.routes.airportsLabel} className="grid grid-cols-4 border-2 border-ink">
        {AIRPORTS.map((code) => {
          const active = airport === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setAirport(code)}
              aria-pressed={active}
              aria-label={`${code} · ${t.airports[code]}`}
              className={`h-11 border-r border-ink font-mono text-sm font-bold last:border-r-0 ${active ? "bg-ink text-sign" : "bg-white text-ink"}`}
            >
              {code}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-muted">{t.routes.noteMobile}</p>
      <ul className="border-t-2 border-ink">
        {DESTINATIONS.map((dest) => {
          const fare = FARES[airport][dest];
          const selected = q.from === airport && q.to === dest;
          const car = formatPrice(fare.car, locale);
          const minibus = formatPrice(minibusPrice(fare.car), locale);
          return (
            <li key={dest}>
              <button
                type="button"
                onClick={() => q.loadRoute(airport, dest)}
                aria-pressed={selected}
                aria-label={fill(t.routes.cell, { from: t.airports[airport], to: DESTINATION_NAMES[dest], car, minibus })}
                className={`grid min-h-15 w-full grid-cols-fill-auto items-center gap-3 border-b border-ink px-2 py-2.5 text-left ${selected ? "bg-sign" : ""}`}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-body-lg font-extrabold">{DESTINATION_NAMES[dest]}</span>
                  <span className={`font-mono text-xs ${selected ? "text-muted" : "text-label"}`}>
                    {fare.km} km · {formatDuration(fare.minutes, locale)}
                  </span>
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black">{car}</span>
                  <span className="font-mono text-xs text-muted">/ {minibus}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
