import { fill, formatDate, formatDuration, formatEuro, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { VEHICLES, priceLines } from "@/lib/booking";
import { DESTINATION_NAMES, FARES } from "@/lib/fares";
import { RouteMap } from "../RouteMap";
import type { FlowState } from "./flow-state";

// The trip so far: map, route, times, load, vehicle and the price. Shown in the yellow side panel on
// desktop and inside a <details> above the form on phones.
export function Summary({ s, t, locale, showMap = true }: { s: FlowState; t: Dictionary; locale: Locale; showMap?: boolean }) {
  const b = t.book.summary;
  const fare = FARES[s.from][s.to];
  const p = priceLines(s);
  const money = (euro: number) => formatPrice(euro, locale);
  const rows: [string, string][] = [
    [b.outbound, [s.date && formatDate(s.date, locale), s.time].filter(Boolean).join(", ") || "–"],
    ...(s.flightStatus === "found" ? ([[b.flight, s.flight]] as [string, string][]) : []),
    [b.passengers, String(s.passengers)],
    [b.suitcases, String(s.suitcases)],
    ...(s.skis ? ([[b.skis, String(s.skis)]] as [string, string][]) : []),
    ...(s.childSeats ? ([[b.childSeats, String(s.childSeats)]] as [string, string][]) : []),
    [t.book.trip.vehicle, t.fleet.items[VEHICLES.indexOf(s.vehicle)].name],
    ...(s.returnTrip
      ? ([[b.returnLeg, [s.returnDate && formatDate(s.returnDate, locale), s.returnTime].filter(Boolean).join(", ") || "–"]] as [string, string][])
      : []),
  ];

  return (
    <div className="flex flex-col gap-4">
      {showMap && (
        <RouteMap
          from={s.from}
          to={s.to}
          label={fill(t.map.label, { from: t.airports[s.from], to: DESTINATION_NAMES[s.to], km: fare.km })}
          mountainsLabel={t.map.mountains}
          className="w-full border-2 border-ink bg-paper"
        />
      )}
      <div>
        <p className="text-xl font-black">
          {t.airports[s.from]} → {DESTINATION_NAMES[s.to]}
        </p>
        <p className="font-mono text-xs font-bold">
          {fare.km} KM · {formatDuration(fare.minutes, locale)}
        </p>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t-2 border-ink pt-3 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-semibold">{k}</dt>
            <dd className="text-right font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t-2 border-ink pt-3 text-sm">
        <dt className="font-semibold">{b.ride}</dt>
        <dd className="text-right font-bold">{money(p.ride)}</dd>
        {p.skis > 0 && (
          <>
            <dt className="font-semibold">
              {b.skis} × {s.skis}
            </dt>
            <dd className="text-right font-bold">{money(p.skis)}</dd>
          </>
        )}
        {s.returnTrip && (
          <>
            <dt className="font-semibold">{b.returnLine}</dt>
            <dd className="text-right font-bold">{money(p.ride + p.skis)}</dd>
          </>
        )}
        {s.step === 3 && (
          <>
            <dt className="font-semibold">{t.book.payment.heading}</dt>
            <dd className="text-right font-bold">{s.payment === "card" ? b.paymentCard : b.paymentDriver}</dd>
          </>
        )}
      </dl>
      <div className="flex items-end justify-between border-t-3 border-ink pt-3">
        <span className="text-lg font-black">{b.total}</span>
        <span className="text-right">
          <span className="block text-4xl leading-none font-black tracking-title">{money(p.total)}</span>
          {locale === "ro" && <span className="text-sm font-semibold">{formatEuro(p.total, locale)}</span>}
        </span>
      </div>
      <p className="text-caption font-semibold">{b.perVehicle}</p>
    </div>
  );
}
