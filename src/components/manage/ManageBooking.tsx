"use client";

import Link from "next/link";
import { useRef, useState, type SubmitEvent } from "react";
import { fill, formatDate, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { VEHICLES, isEmail, isTooSoon } from "@/lib/booking";
import { DESTINATION_NAMES, FARES } from "@/lib/fares";
import { driverFor, hoursUntil, isReference, refund } from "@/lib/manage";
import { findBooking, loadBookings, updateBooking, type StoredBooking } from "@/lib/storage";
import { RouteMap } from "../RouteMap";
import { Field, primaryButton, secondaryButton } from "../ui/Field";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Rendered only in the browser (see ManageLoader): bookings live in this browser's storage.
export function ManageBooking({ locale, t }: { locale: Locale; t: Dictionary }) {
  const m = t.manage;
  const [bookings, setBookings] = useState<StoredBooking[]>(() => loadBookings());
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [ref, setRef] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ ref?: string; email?: string; date?: string; time?: string }>({});
  const [notFound, setNotFound] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const open = (b: StoredBooking) => {
    setBooking(b);
    setEditing(false);
    setMessage("");
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const find = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isReference(ref)) next.ref = m.errRef;
    if (!isEmail(email)) next.email = t.book.errors.email;
    setErrors(next);
    setNotFound("");
    if (next.ref || next.email) return;
    const found = findBooking(ref, email);
    if (found) open(found);
    else setNotFound(fill(m.notFound, { ref: ref.trim().toUpperCase() }));
  };

  const save = (patch: Partial<StoredBooking>) => {
    if (!booking) return null;
    const updated = updateBooking(booking.ref, patch);
    if (updated) {
      setBooking(updated);
      setBookings(loadBookings());
    }
    return updated;
  };

  const saveTime = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!newDate) next.date = t.book.errors.date;
    if (!newTime) next.time = t.book.errors.time;
    else if (newDate && isTooSoon(newDate, newTime, new Date())) next.time = t.book.errors.tooSoon;
    setErrors(next);
    if (next.date || next.time) return;
    const updated = save({ date: newDate, time: newTime });
    if (updated) {
      setEditing(false);
      setMessage(fill(m.timeChanged, { date: formatDate(newDate, locale), time: newTime, email: updated.email }));
    }
  };

  const confirmCancel = () => {
    if (!booking) return;
    const r = refund(booking, new Date());
    save({ status: "cancelled" });
    dialogRef.current?.close();
    setMessage([m.cancelled, r.amount ? fill(m.dialog.refundCard, { amount: formatPrice(r.amount, locale) }) : ""].filter(Boolean).join(" "));
  };

  const listPanel = (
    <aside aria-labelledby="local-title" className="border-t-3 border-ink bg-sign px-5 py-8 lg:border-t-0 lg:border-l-3 lg:px-9 lg:py-10">
      <h2 id="local-title" className="text-title-sm font-black">
        {m.local.title}
      </h2>
      <p className="mt-1 text-sm font-semibold">{m.local.note}</p>
      {bookings.length === 0 ? (
        <div className="mt-5 flex flex-col items-start gap-3 border-2 border-ink bg-white p-4">
          <p className="font-semibold">{m.local.empty}</p>
          <Link href={`/${locale}/book/`} className={secondaryButton}>
            {m.bookNew}
          </Link>
        </div>
      ) : (
        <ul className="mt-5 flex flex-col gap-2">
          {bookings.map((b) => (
            <li key={b.ref}>
              <button
                type="button"
                onClick={() => open(b)}
                aria-current={booking?.ref === b.ref ? "true" : undefined}
                className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 border-2 border-ink px-4 py-3 text-left ${booking?.ref === b.ref ? "bg-ink text-paper" : "bg-white hover:bg-sign-soft"}`}
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-mono text-sm font-bold">{b.ref}</span>
                  <span className="truncate font-bold">
                    {t.airports[b.from]} → {DESTINATION_NAMES[b.to]}
                  </span>
                  <span className="text-sm">
                    {formatDate(b.date, locale)}, {b.time} · {b.status === "cancelled" ? m.status.cancelled : m.status.confirmed}
                  </span>
                </span>
                <span className="font-bold underline underline-offset-2">{m.local.open}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );

  if (!booking) {
    return (
      <div className="grid lg:grid-cols-[minmax(0,1fr)_440px]">
        <form noValidate onSubmit={find} className="flex max-w-160 flex-col gap-5 px-5 py-8 lg:px-12 lg:py-10">
          <h2 className="text-title font-black tracking-heading">{m.findTitle}</h2>
          <Field
            id="mg-ref"
            label={m.ref}
            hint={m.refHint}
            value={ref}
            autoComplete="off"
            placeholder="SRP-4827"
            error={errors.ref}
            onChange={(e) => setRef(e.target.value)}
            onBlur={(e) => setRef(e.target.value.trim().toUpperCase())}
          />
          <Field
            id="mg-email"
            label={m.email}
            type="email"
            autoComplete="email"
            value={email}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div role="status" className="font-bold empty:hidden">
            {notFound}
          </div>
          <div>
            <button type="submit" className={primaryButton}>
              <span>{m.find}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
        {listPanel}
      </div>
    );
  }

  const fare = FARES[booking.from][booking.to];
  const cancelled = booking.status === "cancelled";
  const r = refund(booking, new Date());
  const driverVisible = hoursUntil(booking.date, booking.time, new Date()) <= 24;
  const rows: [string, string][] = [
    [m.details.route, `${t.airports[booking.from]} → ${DESTINATION_NAMES[booking.to]}`],
    [m.details.pickup, `${formatDate(booking.date, locale)}, ${booking.time}`],
    ...(booking.returnTrip ? ([[m.details.returnLeg, `${formatDate(booking.returnDate, locale)}, ${booking.returnTime}`]] as [string, string][]) : []),
    ...(booking.flight ? ([[m.details.flight, booking.flight]] as [string, string][]) : []),
    [m.details.vehicle, t.fleet.items[VEHICLES.indexOf(booking.vehicle)].name],
    [m.details.passengers, String(booking.passengers)],
    [m.details.name, booking.name],
    [m.details.payment, booking.payment === "card" ? t.book.summary.paymentCard : t.book.summary.paymentDriver],
    [m.details.total, formatPrice(booking.total, locale)],
  ];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_440px]">
      <div className="flex min-w-0 flex-col gap-6 px-5 py-8 lg:px-12 lg:py-10">
        <div className="flex flex-wrap items-center gap-3">
          <h2 ref={headingRef} tabIndex={-1} className="font-mono text-3xl font-bold lg:text-4xl">
            {booking.ref}
          </h2>
          <span className={`px-3 py-1 text-sm font-black uppercase ${cancelled ? "border-2 border-ink bg-white" : "bg-ink text-sign"}`}>
            {cancelled ? m.status.cancelled : m.status.confirmed}
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t-2 border-ink pt-4">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-semibold">{k}</dt>
                <dd className="font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <RouteMap
            from={booking.from}
            to={booking.to}
            label={fill(t.map.label, { from: t.airports[booking.from], to: DESTINATION_NAMES[booking.to], km: fare.km })}
            mountainsLabel={t.map.mountains}
            className="w-full border-2 border-ink bg-paper"
          />
        </div>

        {!cancelled && (
          <p className="border-2 border-ink bg-white p-4 font-semibold">
            {driverVisible ? fill(m.driverAssigned, { driver: driverFor(booking.ref) }) : m.driverPending}
          </p>
        )}

        <p role="status" className="border-l-4 border-ink pl-4 font-bold empty:hidden">
          {message}
        </p>

        {editing && !cancelled && (
          <form noValidate onSubmit={saveTime} className="flex flex-col gap-4 border-2 border-ink bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="mg-date"
                label={t.book.trip.date}
                type="date"
                min={today()}
                value={newDate}
                error={errors.date}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <Field id="mg-time" label={t.book.trip.time} type="time" value={newTime} error={errors.time} onChange={(e) => setNewTime(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button type="submit" className={primaryButton}>
                <span>{m.saveTime}</span>
                <span aria-hidden="true">→</span>
              </button>
              <button type="button" onClick={() => setEditing(false)} className={secondaryButton}>
                {m.cancelChange}
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col gap-2.5 border-t-2 border-ink pt-5 sm:flex-row sm:flex-wrap">
          {!cancelled && !editing && (
            <button
              type="button"
              onClick={() => {
                setNewDate(booking.date);
                setNewTime(booking.time);
                setErrors({});
                setMessage("");
                setEditing(true);
              }}
              className={secondaryButton}
            >
              {m.changeTime}
            </button>
          )}
          {!cancelled && (
            <button type="button" onClick={() => dialogRef.current?.showModal()} className={secondaryButton}>
              {m.cancel}
            </button>
          )}
          <button type="button" onClick={() => setBooking(null)} className={secondaryButton}>
            {m.another}
          </button>
        </div>

        <dialog
          ref={dialogRef}
          aria-labelledby="cancel-title"
          className="m-auto w-[min(520px,calc(100vw-2rem))] border-3 border-ink bg-paper p-0 text-ink backdrop:bg-ink/60"
        >
          <div className="flex flex-col gap-4 p-6">
            <h2 id="cancel-title" className="text-title-sm font-black">
              {fill(m.dialog.title, { date: formatDate(booking.date, locale) })}
            </h2>
            <p>{r.late ? m.dialog.late : m.dialog.free}</p>
            <p className="font-semibold">{r.amount ? fill(m.dialog.refundCard, { amount: formatPrice(r.amount, locale) }) : m.dialog.refundDriver}</p>
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" autoFocus onClick={() => dialogRef.current?.close()} className={secondaryButton}>
                {m.dialog.keep}
              </button>
              <button type="button" onClick={confirmCancel} className={primaryButton}>
                <span>{m.dialog.confirm}</span>
              </button>
            </div>
          </div>
        </dialog>
      </div>
      {listPanel}
    </div>
  );
}
