"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { fill, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  MAX_CHILD_SEATS,
  MAX_SKIS,
  MAX_SUITCASES,
  SKI_BAG_PRICE,
  VEHICLES,
  fitProblem,
  isAfter,
  isEmail,
  isPhone,
  isTooSoon,
  priceLines,
  smallestFit,
  type VehicleId,
} from "@/lib/booking";
import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, MAX_PASSENGERS, MIN_PASSENGERS, bookingReference, isAirport, isDestination } from "@/lib/fares";
import { findFlight, normalizeFlightNumber, pickupTime } from "@/lib/flights";
import { usePrices } from "@/lib/prices";
import { loadDraft, loadFlow, saveBooking, saveFlow } from "@/lib/storage";
import { NameSignCard } from "../NameSignCard";
import { Counter } from "../ui/Counter";
import { Field, FieldError, control, inlineButton, primaryButton, secondaryButton } from "../ui/Field";
import { Confirmation } from "./Confirmation";
import { ErrorSummary } from "./ErrorSummary";
import { FIELD_IDS, initialState, type Errors, type FlowState, type Step } from "./flow-state";
import { StepBar } from "./StepBar";
import { Summary } from "./Summary";
import { VehiclePicker } from "./VehiclePicker";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Rendered only in the browser (see BookPage): it starts from the saved flow or the home-page draft.
export function BookingFlow({ locale, t }: { locale: Locale; t: Dictionary }) {
  const b = t.book;
  const prices = usePrices();
  const [s, setS] = useState<FlowState>(() => loadFlow<FlowState>() ?? initialState(loadDraft()));
  const [errors, setErrors] = useState<Errors>({});
  const [flightNote, setFlightNote] = useState("");
  const [vehicleNote, setVehicleNote] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Keep progress across reloads in this tab.
  useEffect(() => saveFlow(s), [s]);

  // After a failed "Continue", focus the error summary once it is on screen.
  useEffect(() => {
    if (failedAttempts) errorRef.current?.focus();
  }, [failedAttempts]);

  // Move focus to the new step's heading, but not on the first render.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [s.step]);

  const set = (patch: Partial<FlowState>) => setS((prev) => ({ ...prev, ...patch }));

  // Changing the group can make the chosen vehicle too small: switch to the smallest that fits and say so.
  const setLoad = (patch: Partial<Pick<FlowState, "passengers" | "suitcases" | "skis" | "childSeats">>) => {
    const next = { ...s, ...patch };
    if (fitProblem(next.vehicle, next) !== null) {
      next.vehicle = smallestFit(next);
      setVehicleNote(fill(b.trip.vehicleChanged, { vehicle: t.fleet.items[VEHICLES.indexOf(next.vehicle)].name }));
    }
    setS(next);
    setErrors((e) => ({ ...e, childSeats: undefined }));
  };

  const lookUpFlight = () => {
    const flight = findFlight(s.flight);
    if (!flight) {
      set({ flightStatus: "notfound" });
      setFlightNote("");
      return;
    }
    const moved = flight.airport !== s.from;
    set({ flight: flight.number, flightStatus: "found", time: pickupTime(flight), from: flight.airport });
    setErrors((e) => ({ ...e, time: undefined }));
    setFlightNote(moved ? fill(b.trip.flightMoved, { airport: t.airports[flight.airport] }) : "");
  };

  const validate = (step: Step): Errors => {
    const e: Errors = {};
    if (step === 1) {
      if (!s.date) e.date = b.errors.date;
      if (!s.time) e.time = b.errors.time;
      else if (s.date && isTooSoon(s.date, s.time, new Date())) e.time = b.errors.tooSoon;
      if (s.childSeats > s.passengers) e.childSeats = b.errors.childSeats;
      if (s.returnTrip) {
        if (!s.returnDate) e.returnDate = b.errors.returnDate;
        if (!s.returnTime) e.returnTime = b.errors.returnTime;
        else if (s.returnDate && s.date && s.time && !isAfter(s.returnDate, s.returnTime, s.date, s.time)) e.returnTime = b.errors.returnOrder;
      }
    }
    if (step === 2) {
      if (!s.name.trim()) e.name = b.errors.name;
      if (!isEmail(s.email)) e.email = b.errors.email;
      if (!isPhone(s.phone)) e.phone = b.errors.phone;
    }
    return e;
  };

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e = validate(s.step);
    // Drop keys whose value is undefined (cleared errors).
    const found = Object.fromEntries(Object.entries(e).filter(([, v]) => v)) as Errors;
    if (Object.keys(found).length) {
      setErrors(found);
      setFailedAttempts((n) => n + 1);
      return;
    }
    setErrors({});
    setFlightNote("");
    setVehicleNote("");
    if (s.step < 3) {
      set({ step: (s.step + 1) as Step });
      return;
    }
    const ref = bookingReference();
    saveBooking({
      ref,
      createdAt: new Date().toISOString(),
      from: s.from,
      to: s.to,
      date: s.date,
      time: s.time,
      flight: s.flightStatus === "found" ? s.flight : null,
      passengers: s.passengers,
      suitcases: s.suitcases,
      skis: s.skis,
      childSeats: s.childSeats,
      vehicle: s.vehicle,
      returnTrip: s.returnTrip,
      returnDate: s.returnTrip ? s.returnDate : "",
      returnTime: s.returnTrip ? s.returnTime : "",
      name: s.name.trim(),
      email: s.email.trim(),
      phone: s.phone.trim(),
      notes: s.notes.trim(),
      payment: s.payment,
      total: priceLines(s, prices).total,
      status: "confirmed",
    });
    set({ step: 4, ref });
  };

  const back = () => {
    setErrors({});
    set({ step: (s.step - 1) as Step });
  };

  if (s.step === 4) return <Confirmation s={s} t={t} locale={locale} prices={prices} headingRef={headingRef} />;

  const load = { passengers: s.passengers, suitcases: s.suitcases, skis: s.skis };
  const cleanErrors = Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as Errors;
  const total = formatPrice(priceLines(s, prices).total, locale);

  return (
    <>
      <StepBar step={s.step} t={b} />
      <div className="grid lg:grid-cols-panel">
        <div className="flex min-w-0 flex-col gap-6 px-5 py-7 lg:px-12 lg:py-10">
          <details className="group border-2 border-ink bg-sign lg:hidden">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-3 px-4 py-3">
              <span className="font-black">{b.summary.show}</span>
              <span className="flex items-center gap-3">
                <span className="text-xl font-black">{total}</span>
                <span aria-hidden="true" className="flex size-7 items-center justify-center bg-ink text-sign">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </span>
            </summary>
            <div className="border-t-2 border-ink bg-sign p-4">
              <Summary s={s} t={t} locale={locale} prices={prices} />
            </div>
          </details>

          <ErrorSummary ref={errorRef} title={b.errors.summary} errors={cleanErrors} />

          <form noValidate onSubmit={submit} className="flex flex-col gap-7">
            {s.step === 1 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-title font-black tracking-heading lg:text-4xl">
                  {b.trip.heading}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex min-w-0 flex-col gap-1.5">
                    <span className="label-mono">{t.form.from}</span>
                    <select
                      value={s.from}
                      onChange={(e) => isAirport(e.target.value) && set({ from: e.target.value, flightStatus: "idle" })}
                      className={control}
                    >
                      {AIRPORTS.map((code) => (
                        <option key={code} value={code}>
                          {code} · {t.airports[code]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-0 flex-col gap-1.5">
                    <span className="label-mono">{t.form.to}</span>
                    <select value={s.to} onChange={(e) => isDestination(e.target.value) && set({ to: e.target.value })} className={control}>
                      {DESTINATIONS.map((id) => (
                        <option key={id} value={id}>
                          {DESTINATION_NAMES[id]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Field
                    id={FIELD_IDS.date}
                    label={b.trip.date}
                    type="date"
                    min={today()}
                    value={s.date}
                    error={cleanErrors.date}
                    onChange={(e) => {
                      set({ date: e.target.value });
                      setErrors((x) => ({ ...x, date: undefined }));
                    }}
                  />
                  <Field
                    id={FIELD_IDS.time}
                    label={b.trip.time}
                    type="time"
                    value={s.time}
                    error={cleanErrors.time}
                    onChange={(e) => {
                      set({ time: e.target.value });
                      setErrors((x) => ({ ...x, time: undefined }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 border-2 border-ink bg-white p-4">
                  <Field
                    id="bk-flight"
                    label={b.trip.flight}
                    hint={b.trip.flightHint}
                    value={s.flight}
                    autoComplete="off"
                    placeholder="ZZ 1234"
                    onChange={(e) => set({ flight: e.target.value, flightStatus: "idle" })}
                    onBlur={(e) => e.target.value && set({ flight: normalizeFlightNumber(e.target.value) })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        lookUpFlight();
                      }
                    }}
                  >
                    <button type="button" onClick={lookUpFlight} disabled={!s.flight.trim()} className={inlineButton}>
                      {b.trip.findFlight}
                    </button>
                  </Field>
                  <div role="status" className="text-sm font-bold">
                    {s.flightStatus === "found" &&
                      (() => {
                        const f = findFlight(s.flight);
                        return f
                          ? fill(b.trip.flightFound, {
                              flight: f.number,
                              city: f.city[locale],
                              airport: t.airports[f.airport],
                              time: f.lands,
                              pickup: pickupTime(f),
                            })
                          : null;
                      })()}
                    {s.flightStatus === "notfound" && fill(b.trip.flightNotFound, { flight: normalizeFlightNumber(s.flight) })}
                    {s.flightStatus === "found" && flightNote && <span className="block">{flightNote}</span>}
                  </div>
                  <p className="font-mono text-xs text-label">{b.trip.flightDemo}</p>
                </div>

                <fieldset className="flex flex-col gap-3">
                  <legend className="mb-2 text-xl font-black">{b.trip.load}</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Counter
                      id="bk-passengers"
                      label={b.trip.passengers}
                      value={s.passengers}
                      min={MIN_PASSENGERS}
                      max={MAX_PASSENGERS}
                      onChange={(v) => setLoad({ passengers: v })}
                      fewer={b.trip.fewer}
                      more={b.trip.more}
                    />
                    <Counter
                      id="bk-suitcases"
                      label={b.trip.suitcases}
                      value={s.suitcases}
                      min={0}
                      max={MAX_SUITCASES}
                      onChange={(v) => setLoad({ suitcases: v })}
                      fewer={b.trip.fewer}
                      more={b.trip.more}
                    />
                    <Counter
                      id="bk-skis"
                      label={b.trip.skis}
                      hint={fill(b.trip.skisHint, { price: formatPrice(SKI_BAG_PRICE, locale) })}
                      value={s.skis}
                      min={0}
                      max={MAX_SKIS}
                      onChange={(v) => setLoad({ skis: v })}
                      fewer={b.trip.fewer}
                      more={b.trip.more}
                    />
                    <div className="flex flex-col gap-1.5">
                      <Counter
                        id="bk-child-seats"
                        label={b.trip.childSeats}
                        hint={b.trip.childSeatsHint}
                        value={s.childSeats}
                        min={0}
                        max={MAX_CHILD_SEATS}
                        onChange={(v) => setLoad({ childSeats: v })}
                        fewer={b.trip.fewer}
                        more={b.trip.more}
                        invalid={!!cleanErrors.childSeats}
                        errorId="bk-child-seats-error"
                      />
                      {cleanErrors.childSeats && <FieldError id="bk-child-seats-error">{cleanErrors.childSeats}</FieldError>}
                    </div>
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2">
                  <VehiclePicker
                    value={s.vehicle}
                    onChange={(v: VehicleId) => {
                      set({ vehicle: v });
                      setVehicleNote("");
                    }}
                    load={load}
                    from={s.from}
                    to={s.to}
                    locale={locale}
                    t={t}
                    prices={prices}
                  />
                  <p aria-live="polite" className="text-sm font-bold empty:hidden">
                    {vehicleNote}
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-2 border-ink bg-white p-4">
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 text-lg font-black">
                    <input
                      type="checkbox"
                      checked={s.returnTrip}
                      onChange={(e) => {
                        set({ returnTrip: e.target.checked });
                        setErrors((x) => ({ ...x, returnDate: undefined, returnTime: undefined }));
                      }}
                      className="size-5 accent-ink"
                    />
                    {b.trip.returnTrip}
                  </label>
                  <p className="text-sm text-muted">{fill(b.trip.returnHint, { from: t.airports[s.from], to: DESTINATION_NAMES[s.to] })}</p>
                  {s.returnTrip && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field
                        id={FIELD_IDS.returnDate}
                        label={b.trip.returnDate}
                        type="date"
                        min={s.date || today()}
                        value={s.returnDate}
                        error={cleanErrors.returnDate}
                        onChange={(e) => {
                          set({ returnDate: e.target.value });
                          setErrors((x) => ({ ...x, returnDate: undefined }));
                        }}
                      />
                      <Field
                        id={FIELD_IDS.returnTime}
                        label={b.trip.returnTime}
                        type="time"
                        value={s.returnTime}
                        error={cleanErrors.returnTime}
                        onChange={(e) => {
                          set({ returnTime: e.target.value });
                          setErrors((x) => ({ ...x, returnTime: undefined }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {s.step === 2 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-title font-black tracking-heading lg:text-4xl">
                  {b.details.heading}
                </h2>
                <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-fill-auto">
                  <Field
                    id={FIELD_IDS.name}
                    label={b.details.name}
                    hint={b.details.nameHint}
                    autoComplete="name"
                    maxLength={40}
                    value={s.name}
                    error={cleanErrors.name}
                    onChange={(e) => {
                      set({ name: e.target.value });
                      setErrors((x) => ({ ...x, name: undefined }));
                    }}
                  />
                  <NameSignCard name={s.name} placeholder={t.sign.yourName} company={t.sign.company} />
                </div>
                <Field
                  id={FIELD_IDS.email}
                  label={b.details.email}
                  hint={b.details.emailHint}
                  type="email"
                  autoComplete="email"
                  value={s.email}
                  error={cleanErrors.email}
                  onChange={(e) => {
                    set({ email: e.target.value });
                    setErrors((x) => ({ ...x, email: undefined }));
                  }}
                />
                <Field
                  id={FIELD_IDS.phone}
                  label={b.details.phone}
                  hint={b.details.phoneHint}
                  type="tel"
                  autoComplete="tel"
                  value={s.phone}
                  error={cleanErrors.phone}
                  onChange={(e) => {
                    set({ phone: e.target.value });
                    setErrors((x) => ({ ...x, phone: undefined }));
                  }}
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bk-notes" className="label-mono">
                    {b.details.notes}
                  </label>
                  <textarea
                    id="bk-notes"
                    rows={3}
                    maxLength={300}
                    value={s.notes}
                    onChange={(e) => set({ notes: e.target.value })}
                    className={`${control} h-auto py-2`}
                  />
                </div>
              </>
            )}

            {s.step === 3 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-title font-black tracking-heading lg:text-4xl">
                  {b.payment.heading}
                </h2>
                <fieldset className="flex flex-col gap-2.5">
                  <legend className="mb-1.5 label-mono">{b.payment.method}</legend>
                  {(
                    [
                      ["driver", b.payment.driver, b.payment.driverHint],
                      ["card", b.payment.card, b.payment.cardHint],
                    ] as const
                  ).map(([value, label, hint]) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer gap-3 border-2 border-ink p-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${s.payment === value ? "bg-sign" : "bg-white"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={value}
                        checked={s.payment === value}
                        onChange={() => set({ payment: value })}
                        className="mt-1 size-5 shrink-0 accent-ink focus-visible:outline-none"
                      />
                      <span className="flex flex-col gap-1">
                        <span className="text-lg font-black">{label}</span>
                        <span className="text-sm text-muted">{hint}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <p className="text-sm font-semibold">
                  {b.payment.terms} {b.demoNote}
                </p>
              </>
            )}

            <div className="flex flex-col-reverse gap-2.5 border-t-2 border-ink pt-5 sm:flex-row sm:justify-between">
              {s.step > 1 ? (
                <button type="button" onClick={back} className={secondaryButton}>
                  <span aria-hidden="true">←&nbsp;</span>
                  {b.nav.back}
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className={primaryButton}>
                <span>
                  {s.step === 1 && b.nav.toDetails}
                  {s.step === 2 && b.nav.toPayment}
                  {s.step === 3 && fill(s.payment === "card" ? b.payment.submitCard : b.payment.submitDriver, { price: total })}
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>

        <aside aria-label={b.summary.title} className="hidden border-l-3 border-ink bg-sign lg:block">
          <div className="sticky top-0 flex flex-col gap-4 px-9 py-10">
            <h2 className="text-title-sm font-black">{b.summary.title}</h2>
            <Summary s={s} t={t} locale={locale} prices={prices} />
            {s.step >= 2 && s.name.trim() && <NameSignCard name={s.name} placeholder={t.sign.yourName} company={t.sign.company} size="compact" />}
          </div>
        </aside>
      </div>
    </>
  );
}
