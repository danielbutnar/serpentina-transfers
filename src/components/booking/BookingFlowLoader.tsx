"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useIsClient } from "@/lib/storage";
import { BookingFlow } from "./BookingFlow";

// The flow reads the draft and progress from browser storage, so it renders after hydration only.
// Until then a quiet placeholder keeps the layout from jumping.
export function BookingFlowLoader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const isClient = useIsClient();
  if (!isClient) return <div className="h-96 bg-paper" aria-busy="true" />;
  return <BookingFlow locale={locale} t={t} />;
}
