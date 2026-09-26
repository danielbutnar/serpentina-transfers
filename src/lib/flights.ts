import type { Locale } from "@/i18n/config";
import { addMinutes } from "./booking";
import type { AirportCode } from "./fares";

// Demo flight data for the concept, with the made-up prefix "ZZ" (no real airline); every flight is
// labelled as demo data on the page. The driver waits at arrivals 15 minutes after landing.

export type Flight = { number: string; city: Record<Locale, string>; airport: AirportCode; lands: string };

export const FLIGHTS: Flight[] = [
  { number: "ZZ 1234", city: { en: "Munich", ro: "München", de: "München" }, airport: "OTP", lands: "14:35" },
  { number: "ZZ 2081", city: { en: "London Luton", ro: "Londra Luton", de: "London-Luton" }, airport: "OTP", lands: "11:50" },
  { number: "ZZ 3310", city: { en: "Vienna", ro: "Viena", de: "Wien" }, airport: "SBZ", lands: "16:20" },
  { number: "ZZ 4402", city: { en: "Frankfurt", ro: "Frankfurt", de: "Frankfurt" }, airport: "CLJ", lands: "09:40" },
  { number: "ZZ 5120", city: { en: "Dortmund", ro: "Dortmund", de: "Dortmund" }, airport: "GHV", lands: "13:05" },
  { number: "ZZ 6017", city: { en: "Milan Bergamo", ro: "Milano Bergamo", de: "Mailand-Bergamo" }, airport: "GHV", lands: "21:15" },
];

export const PICKUP_AFTER_LANDING_MINUTES = 15;

export function normalizeFlightNumber(input: string): string {
  const compact = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const m = /^([A-Z]{2})(\d{1,4})$/.exec(compact);
  return m ? `${m[1]} ${m[2]}` : compact;
}

export function findFlight(input: string): Flight | null {
  const number = normalizeFlightNumber(input);
  return FLIGHTS.find((f) => f.number === number) ?? null;
}

export function pickupTime(flight: Flight): string {
  return addMinutes(flight.lands, PICKUP_AFTER_LANDING_MINUTES);
}
