"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { fill, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { DESTINATION_NAMES, bookingReference, clampPassengers, quote, type AirportCode, type DestinationId, type Quote } from "@/lib/fares";

// One booking state shared by the hero form, the name sign and the price tables, so picking a price
// anywhere on the page loads it into the form.

export const BOOKING_PANEL_ID = "booking";

type Field = "name" | "date";

type QuoteState = {
  from: AirportCode;
  to: DestinationId;
  passengers: number;
  name: string;
  date: string;
  errors: Partial<Record<Field, true>>;
  reference: string | null;
  announcement: string;
};

type QuoteContextValue = QuoteState & {
  locale: Locale;
  t: Dictionary;
  quote: Quote;
  setFrom: (from: AirportCode) => void;
  setTo: (to: DestinationId) => void;
  changePassengers: (delta: number) => void;
  setName: (name: string) => void;
  setDate: (date: string) => void;
  loadRoute: (from: AirportCode, to: DestinationId) => void;
  book: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote(): QuoteContextValue {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote must be used inside <QuoteProvider>");
  return value;
}

export function fieldId(field: Field): string {
  return `booking-${field}`;
}

function scrollToPanel() {
  const panel = document.getElementById(BOOKING_PANEL_ID);
  if (!panel) return;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  panel.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

export function QuoteProvider({ locale, t, children }: { locale: Locale; t: Dictionary; children: ReactNode }) {
  const [state, setState] = useState<QuoteState>({
    from: "OTP",
    to: "brasov",
    passengers: 2,
    name: "",
    date: "",
    errors: {},
    reference: null,
    announcement: "",
  });

  const value = useMemo<QuoteContextValue>(() => {
    // Any change to the trip clears the demo confirmation, as in the design.
    const update = (patch: Partial<QuoteState>, clear?: Field) =>
      setState((s) => {
        const errors = { ...s.errors };
        if (clear) delete errors[clear];
        return { ...s, ...patch, errors, reference: null };
      });

    return {
      ...state,
      locale,
      t,
      quote: quote(state.from, state.to, state.passengers),
      setFrom: (from) => update({ from, announcement: "" }),
      setTo: (to) => update({ to, announcement: "" }),
      changePassengers: (delta) => setState((s) => ({ ...s, passengers: clampPassengers(s.passengers + delta), reference: null })),
      setName: (name) => update({ name }, "name"),
      setDate: (date) => update({ date }, "date"),
      loadRoute: (from, to) => {
        update({ from, to, announcement: fill(t.routes.loaded, { from: t.airports[from], to: DESTINATION_NAMES[to] }) });
        scrollToPanel();
      },
      book: () => {
        const errors: QuoteState["errors"] = {};
        if (!state.name.trim()) errors.name = true;
        if (!state.date) errors.date = true;
        const firstInvalid = (["date", "name"] as const).find((f) => errors[f]);
        if (firstInvalid) {
          setState((s) => ({ ...s, errors, reference: null }));
          document.getElementById(fieldId(firstInvalid))?.focus();
          return;
        }
        setState((s) => ({ ...s, errors: {}, reference: bookingReference() }));
      },
    };
  }, [state, locale, t]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
