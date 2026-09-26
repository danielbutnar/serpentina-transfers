"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { fill, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { splitDateTime } from "@/lib/booking";
import { DESTINATION_NAMES, clampPassengers, quote, type AirportCode, type DestinationId, type PriceTable, type Quote } from "@/lib/fares";
import { usePrices } from "@/lib/prices";
import { saveDraft } from "@/lib/storage";

// One quote state shared by the hero form, the name sign and the price tables, so picking a price
// anywhere on the page loads it into the form. "Book this transfer" hands it to the booking flow.

export const BOOKING_PANEL_ID = "booking";

type QuoteState = {
  from: AirportCode;
  to: DestinationId;
  passengers: number;
  name: string;
  date: string;
  announcement: string;
};

type QuoteContextValue = QuoteState & {
  locale: Locale;
  t: Dictionary;
  quote: Quote;
  prices: PriceTable;
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

export function fieldId(field: "name" | "date"): string {
  return `booking-${field}`;
}

function scrollToPanel() {
  const panel = document.getElementById(BOOKING_PANEL_ID);
  if (!panel) return;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  panel.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

export function QuoteProvider({ locale, t, children }: { locale: Locale; t: Dictionary; children: ReactNode }) {
  const router = useRouter();
  const prices = usePrices();
  const [state, setState] = useState<QuoteState>({ from: "OTP", to: "brasov", passengers: 2, name: "", date: "", announcement: "" });

  const value = useMemo<QuoteContextValue>(() => {
    const update = (patch: Partial<QuoteState>) => setState((s) => ({ ...s, ...patch }));
    return {
      ...state,
      locale,
      t,
      quote: quote(state.from, state.to, state.passengers, prices),
      prices,
      setFrom: (from) => update({ from, announcement: "" }),
      setTo: (to) => update({ to, announcement: "" }),
      changePassengers: (delta) => setState((s) => ({ ...s, passengers: clampPassengers(s.passengers + delta) })),
      setName: (name) => update({ name }),
      setDate: (date) => update({ date }),
      loadRoute: (from, to) => {
        update({ from, to, announcement: fill(t.routes.loaded, { from: t.airports[from], to: DESTINATION_NAMES[to] }) });
        scrollToPanel();
      },
      book: () => {
        saveDraft({ from: state.from, to: state.to, passengers: state.passengers, name: state.name.trim(), ...splitDateTime(state.date) });
        router.push(`/${locale}/book/`);
      },
    };
  }, [state, locale, t, router, prices]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
