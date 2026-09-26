"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { AirportCode, DestinationId } from "@/lib/fares";
import { saveDraft } from "@/lib/storage";
import { primaryButton } from "../ui/Field";

// Starts the booking flow with this route filled in.
export function BookRouteButton({ from, to, locale, label }: { from: AirportCode; to: DestinationId; locale: Locale; label: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        saveDraft({ from, to, passengers: 2, name: "", date: "", time: "" });
        router.push(`/${locale}/book/`);
      }}
      className={primaryButton}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}
