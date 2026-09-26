"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fill, formatDate, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { VEHICLES, vehiclePrice } from "@/lib/booking";
import { DRIVER_LANGUAGES, SAMPLE_RIDES, ridesPerDriver, withAssignments, type Ride } from "@/lib/dashboard";
import { DESTINATION_NAMES } from "@/lib/fares";
import { resetPrices, usePrices } from "@/lib/prices";
import { clearAssignments, loadAssignments, loadBookings, saveAssignments } from "@/lib/storage";
import { SectionBar } from "../SectionBar";
import { secondaryButton } from "../ui/Field";
import { PriceEditor } from "./PriceEditor";
import { RideBoard } from "./RideBoard";

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Rendered only in the browser (see DashboardLoader): assignments, prices and website bookings live in
// this browser's storage, and ride statuses follow the clock (refreshed every minute).
export function Dashboard({ locale, t }: { locale: Locale; t: Dictionary }) {
  const a = t.admin;
  const prices = usePrices();
  const [now, setNow] = useState(() => new Date());
  const [assignments, setAssignments] = useState(() => loadAssignments());
  const [bookings] = useState(() => loadBookings());
  const [message, setMessage] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const rides = withAssignments(SAMPLE_RIDES, assignments);
  const perDriver = ridesPerDriver(rides);
  const revenue = rides.reduce((sum, r) => sum + vehiclePrice(r.from, r.to, r.vehicle, prices), 0);
  const today = formatDate(isoDate(now), locale);

  const assign = (ride: Ride, driver: string) => {
    const next = { ...assignments, [ride.id]: driver };
    saveAssignments(next);
    setAssignments(next);
    setMessage(fill(a.assigned, { driver, time: ride.pickup }));
  };

  const reset = () => {
    clearAssignments();
    resetPrices();
    setAssignments({});
    setEditorKey((k) => k + 1);
    setMessage(a.resetDone);
  };

  const stats: [string, string][] = [
    [a.stats.rides, String(rides.length)],
    [a.stats.unassigned, String(rides.filter((r) => !r.driver).length)],
    [a.stats.delayed, String(rides.filter((r) => r.delayMinutes).length)],
    [a.stats.revenue, formatPrice(revenue, locale)],
  ];

  return (
    <>
      <div className="on-ink flex flex-col gap-3 bg-ink px-5 py-4 text-paper sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <p className="font-semibold">
          <span className="font-mono text-sm font-bold text-sign">{today} · </span>
          {a.demo}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 shrink-0 items-center justify-center bg-sign px-4 font-bold text-ink hover:bg-sign-soft"
        >
          {a.reset}
        </button>
      </div>
      <p role="status" className="border-b-3 border-ink bg-sign-soft px-5 py-3 font-bold empty:hidden lg:px-12">
        {message}
      </p>

      <dl className="grid grid-cols-2 border-b-3 border-ink md:grid-cols-4">
        {stats.map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col-reverse gap-1 border-ink px-4 py-5 sm:px-5 lg:px-12 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
          >
            <dt className="label-mono">{label}</dt>
            <dd className="text-title-sm leading-none font-black tracking-display sm:text-display-sm">{value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="today-title">
        <SectionBar id="today" number={1} title={a.today.title} />
        <div className="px-5 py-6 lg:px-12 lg:py-8">
          <RideBoard rides={rides} now={now} t={t} locale={locale} caption={fill(a.today.caption, { date: today })} onAssign={assign} />
        </div>
      </section>

      <section aria-labelledby="web-title">
        <SectionBar id="web" number={2} title={a.web.title} />
        <div className="flex flex-col gap-4 px-5 py-6 lg:px-12 lg:py-8">
          <p className="text-sm text-muted">{a.web.note}</p>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-start gap-3 border-2 border-dashed border-ink bg-white p-5">
              <p className="font-semibold">{a.web.empty}</p>
              <Link href={`/${locale}/book/`} className={secondaryButton}>
                {a.web.book}
              </Link>
            </div>
          ) : (
            <ul className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
              {bookings.map((b) => (
                <li key={b.ref} className={`flex flex-col gap-1 border-2 border-ink p-4 ${b.status === "cancelled" ? "bg-paper text-muted" : "bg-white"}`}>
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-mono font-bold">{b.ref}</span>
                    <span className="text-sm font-bold">{b.status === "cancelled" ? t.manage.status.cancelled : t.manage.status.confirmed}</span>
                  </p>
                  <p className="font-black">
                    {t.airports[b.from]} → {DESTINATION_NAMES[b.to]}
                  </p>
                  <p className="text-sm">
                    {formatDate(b.date, locale)}, {b.time} · {t.fleet.items[VEHICLES.indexOf(b.vehicle)].name} · {b.name}
                  </p>
                  <p className="flex items-baseline justify-between gap-3 border-t border-ink pt-2 text-sm">
                    <span>{b.payment === "card" ? t.book.summary.paymentCard : t.book.summary.paymentDriver}</span>
                    <span className="text-lg font-black">{formatPrice(b.total, locale)}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="drivers-title">
        <SectionBar id="drivers" number={3} title={a.drivers.title} />
        <ul className="grid gap-2.5 px-5 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:px-12 lg:py-8">
          {Object.entries(DRIVER_LANGUAGES).map(([name, langs]) => (
            <li key={name} className="flex flex-col gap-1 border-2 border-ink bg-white p-4">
              <p className="text-lg font-black">{name}</p>
              <p className="text-sm">
                {a.drivers.speaks}: <span className="font-mono font-bold">{langs.join(" · ")}</span>
              </p>
              <p className="text-sm">
                {a.drivers.ridesToday}: <span className="font-bold">{perDriver[name]}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="prices-title">
        <SectionBar id="prices" number={4} title={a.prices.title} />
        <div className="px-5 py-6 lg:px-12 lg:py-8">
          <PriceEditor key={editorKey} prices={prices} t={t} />
        </div>
      </section>
    </>
  );
}
