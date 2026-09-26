"use client";

import Link from "next/link";
import type { Ref } from "react";
import { fill, formatDate, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { priceLines } from "@/lib/booking";
import { DESTINATION_NAMES, FARES } from "@/lib/fares";
import { buildIcs, type CalendarEvent } from "@/lib/ics";
import { clearFlow } from "@/lib/storage";
import { NameSignCard } from "../NameSignCard";
import { RouteMap } from "../RouteMap";
import { primaryButton, secondaryButton } from "../ui/Field";
import type { FlowState } from "./flow-state";

function downloadCalendar(s: FlowState, t: Dictionary) {
  const fare = FARES[s.from][s.to];
  const c = t.book.confirm;
  const route = (from: string, to: string) => `${from} → ${to}`;
  const events: CalendarEvent[] = [
    {
      uid: `${s.ref}-out@serpentina.example`,
      title: fill(c.calendarTitle, { route: route(t.airports[s.from], DESTINATION_NAMES[s.to]), ref: s.ref ?? "" }),
      description: fill(c.calendarDescription, { name: s.name }),
      location: t.airports[s.from],
      date: s.date,
      time: s.time,
      minutes: fare.minutes,
    },
  ];
  if (s.returnTrip) {
    events.push({
      uid: `${s.ref}-return@serpentina.example`,
      title: fill(c.calendarTitle, { route: route(DESTINATION_NAMES[s.to], t.airports[s.from]), ref: s.ref ?? "" }),
      description: fill(c.calendarDescription, { name: s.name }),
      location: DESTINATION_NAMES[s.to],
      date: s.returnDate,
      time: s.returnTime,
      minutes: fare.minutes,
    });
  }
  const url = URL.createObjectURL(new Blob([buildIcs(events)], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `serpentina-${s.ref}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Confirmation({ s, t, locale, headingRef }: { s: FlowState; t: Dictionary; locale: Locale; headingRef: Ref<HTMLHeadingElement> }) {
  const c = t.book.confirm;
  const fare = FARES[s.from][s.to];
  const routeText = `${t.airports[s.from]} → ${DESTINATION_NAMES[s.to]}`;
  const share = fill(c.share, { ref: s.ref ?? "", route: routeText, date: formatDate(s.date, locale), time: s.time });

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_440px]">
      <div className="flex flex-col gap-7 px-5 py-8 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-3">
          <p aria-hidden="true" className="flex size-12 items-center justify-center bg-ink text-2xl font-black text-sign">
            ✓
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="text-display-sm leading-none font-black tracking-display lg:text-display">
            {c.title}
          </h2>
          <p className="text-sm font-semibold text-muted">{c.reference}</p>
          <p className="font-mono text-3xl font-bold lg:text-4xl">{s.ref}</p>
          <p className="max-w-140 text-base text-muted">{fill(c.body, { email: s.email })}</p>
        </div>

        <section aria-labelledby="next-title" className="flex flex-col gap-3">
          <h3 id="next-title" className="text-xl font-black">
            {c.nextTitle}
          </h3>
          <ol className="flex flex-col border-t-2 border-ink">
            {[c.next1, s.flightStatus === "found" ? fill(c.next2Flight, { flight: s.flight }) : fill(c.next2Time, { time: s.time }), c.next3].map((line, i) => (
              <li key={line} className="grid grid-cols-[36px_1fr] gap-3 border-b border-ink py-3">
                <span aria-hidden="true" className="font-mono text-sm font-bold text-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold">{line}</span>
              </li>
            ))}
          </ol>
          <div className="max-w-105">
            <NameSignCard name={s.name} placeholder={t.sign.yourName} company={t.sign.company} />
          </div>
        </section>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={() => downloadCalendar(s, t)} className={primaryButton}>
            <span>{c.calendar}</span>
            <span aria-hidden="true">↓</span>
          </button>
          <a href={`https://wa.me/?text=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
            {c.whatsapp}
          </a>
          <Link href={`/${locale}/manage/`} className={secondaryButton}>
            {t.manage.title}
          </Link>
          <Link href={`/${locale}/`} onClick={() => clearFlow()} className={secondaryButton}>
            {c.another}
          </Link>
        </div>
      </div>

      <aside className="border-t-3 border-ink bg-sign px-5 py-8 lg:border-t-0 lg:border-l-3 lg:px-9 lg:py-12">
        <RouteMap
          from={s.from}
          to={s.to}
          label={fill(t.map.label, { from: t.airports[s.from], to: DESTINATION_NAMES[s.to], km: fare.km })}
          mountainsLabel={t.map.mountains}
          className="w-full border-2 border-ink bg-paper"
        />
        <p className="mt-4 flex items-end justify-between border-t-3 border-ink pt-3">
          <span className="text-lg font-black">{t.book.summary.total}</span>
          <span className="text-4xl font-black tracking-title">{formatPrice(priceLines(s).total, locale)}</span>
        </p>
        <p className="mt-1 text-sm font-bold">{s.payment === "card" ? t.book.summary.paymentCard : t.book.summary.paymentDriver}</p>
      </aside>
    </div>
  );
}
