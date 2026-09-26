"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useIsClient } from "@/lib/storage";
import { ManageBooking } from "./ManageBooking";

// Bookings are read from browser storage, so the page renders them after hydration only.
export function ManageLoader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const isClient = useIsClient();
  if (!isClient) return <div className="h-[50vh] bg-paper" aria-busy="true" />;
  return <ManageBooking locale={locale} t={t} />;
}
