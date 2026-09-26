"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useIsClient } from "@/lib/storage";
import { Dashboard } from "./Dashboard";

// The dashboard depends on the clock and on browser storage, so it renders after hydration only.
export function DashboardLoader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const isClient = useIsClient();
  if (!isClient) return <div className="h-96 bg-paper" aria-busy="true" />;
  return <Dashboard locale={locale} t={t} />;
}
