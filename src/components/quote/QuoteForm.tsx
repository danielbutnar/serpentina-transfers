"use client";

import { formatDuration, formatEuro, formatPrice } from "@/i18n/config";
import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, MAX_PASSENGERS, MIN_PASSENGERS, isAirport, isDestination } from "@/lib/fares";
import { NameSign } from "./NameSign";
import { BOOKING_PANEL_ID, fieldId, useQuote } from "./QuoteProvider";

const control = "h-12.5 w-full min-w-0 border-2 border-ink bg-white text-base font-semibold text-ink";

// The yellow booking panel. On phones the name sign sits inside it; on desktop it sits in the hero.
export function QuoteForm() {
  const q = useQuote();
  const { t, locale } = q;
  const price = formatPrice(q.quote.price, locale);

  return (
    <section
      id={BOOKING_PANEL_ID}
      tabIndex={-1}
      aria-labelledby="booking-title"
      className="flex scroll-mt-4 flex-col gap-3.5 border-y-3 border-ink bg-sign px-5 py-5.5 lg:gap-4 lg:border-y-0 lg:border-l-3 lg:px-9 lg:pt-9 lg:pb-8"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="booking-title" className="text-lead font-black lg:text-title-sm">
          {t.form.title}
        </h2>
        <p className="font-mono text-2xs font-bold lg:text-xs">
          {q.quote.km} KM · {formatDuration(q.quote.minutes, locale)}
        </p>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          q.book();
        }}
        className="flex flex-col gap-3.5 lg:gap-4"
      >
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-date-pax lg:gap-3">
          <label className="flex min-w-0 flex-col gap-1.5 lg:col-span-2">
            <span className="label-mono">{t.form.from}</span>
            <select value={q.from} onChange={(e) => isAirport(e.target.value) && q.setFrom(e.target.value)} className={`${control} px-2 lg:px-3`}>
              {AIRPORTS.map((code) => (
                <option key={code} value={code}>
                  {code} · {t.airports[code]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5 lg:col-span-2">
            <span className="label-mono">{t.form.to}</span>
            <select value={q.to} onChange={(e) => isDestination(e.target.value) && q.setTo(e.target.value)} className={`${control} px-2 lg:px-3`}>
              {DESTINATIONS.map((id) => (
                <option key={id} value={id}>
                  {DESTINATION_NAMES[id]}
                </option>
              ))}
            </select>
          </label>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={fieldId("date")} className="label-mono">
              {t.form.date}
            </label>
            <input
              id={fieldId("date")}
              type="datetime-local"
              value={q.date}
              onChange={(e) => q.setDate(e.target.value)}
              className={`${control} px-1.5 text-caption lg:px-2.5 lg:text-body-sm`}
            />
          </div>

          <div role="group" aria-labelledby="booking-passengers-label" className="flex min-w-0 flex-col gap-1.5">
            <span id="booking-passengers-label" className="label-mono">
              {t.form.passengers}
            </span>
            <div className="grid h-12.5 grid-cols-stepper border-2 border-ink bg-white">
              <button
                type="button"
                onClick={() => q.changePassengers(-1)}
                disabled={q.passengers <= MIN_PASSENGERS}
                aria-label={t.form.fewer}
                className="border-r-2 border-ink text-xl font-bold disabled:text-ink/35"
              >
                −
              </button>
              <output aria-live="polite" className="flex items-center justify-center text-body-lg font-extrabold">
                {q.passengers}
              </output>
              <button
                type="button"
                onClick={() => q.changePassengers(1)}
                disabled={q.passengers >= MAX_PASSENGERS}
                aria-label={t.form.more}
                className="border-l-2 border-ink text-xl font-bold disabled:text-ink/35"
              >
                +
              </button>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <label htmlFor={fieldId("name")} className="label-mono">
              {t.form.signLabel}
            </label>
            <input
              id={fieldId("name")}
              type="text"
              autoComplete="name"
              maxLength={40}
              value={q.name}
              onChange={(e) => q.setName(e.target.value)}
              placeholder="Anna Weber"
              className={`${control} px-3`}
            />
          </div>
        </div>

        <div className="lg:hidden">
          <NameSign size="compact" />
        </div>

        <div aria-live="polite" className="mt-1 flex items-end justify-between gap-3 border-t-2 border-ink pt-3 lg:pt-4">
          <p className="flex items-baseline gap-2 lg:flex-col lg:items-start lg:gap-0.5">
            <span className="text-5xl leading-none font-black tracking-display-tight lg:text-display">{price}</span>
            <span className="text-body-sm font-bold lg:text-base">
              {t.form.fixed}
              {locale === "ro" && <span className="font-semibold"> · {formatEuro(q.quote.price, locale)}</span>}
            </span>
          </p>
          <p className="max-w-30 text-right text-xs font-semibold lg:max-w-47.5 lg:text-sm">{q.quote.vehicle === "car" ? t.form.car : t.form.minibus}</p>
        </div>

        <button
          type="submit"
          className="flex h-14 items-center justify-between bg-ink px-4.5 text-body-lg font-extrabold text-sign hover:bg-black lg:h-15 lg:px-5.5 lg:text-lg"
        >
          <span>{t.form.book}</span>
          <span aria-hidden="true">→</span>
        </button>

        <p className="text-caption font-semibold">{t.form.included}</p>
        <p aria-live="polite" className="sr-only">
          {q.announcement}
        </p>
      </form>
    </section>
  );
}
