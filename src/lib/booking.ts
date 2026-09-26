import { FARES, minibusPrice, type AirportCode, type DestinationId } from "./fares";

// Booking rules for the three-step flow. Pure functions, tested in booking.test.ts.

export const VEHICLES = ["sedan", "estate", "minibus"] as const;
export type VehicleId = (typeof VEHICLES)[number];

export type Load = { passengers: number; suitcases: number; skis: number };

// Sedan: 1–3 passengers, 3 suitcases, no skis. Estate: 1–4 passengers, 5 pieces (suitcases or ski bags).
// Minibus: 5–8 passengers (it also takes fewer), 8 suitcases and 8 ski bags.
export type FitProblem = "passengers" | "luggage" | "skis";

export function fitProblem(vehicle: VehicleId, load: Load): FitProblem | null {
  switch (vehicle) {
    case "sedan":
      if (load.passengers > 3) return "passengers";
      if (load.skis > 0) return "skis";
      return load.suitcases > 3 ? "luggage" : null;
    case "estate":
      if (load.passengers > 4) return "passengers";
      return load.suitcases + load.skis > 5 ? "luggage" : null;
    case "minibus":
      if (load.passengers > 8) return "passengers";
      return load.suitcases > 8 || load.skis > 8 ? "luggage" : null;
  }
}

export function smallestFit(load: Load): VehicleId {
  return VEHICLES.find((v) => fitProblem(v, load) === null) ?? "minibus";
}

export const SKI_BAG_PRICE = 5;
export const MAX_SUITCASES = 8;
export const MAX_SKIS = 8;
export const MAX_CHILD_SEATS = 4;
export const MIN_NOTICE_HOURS = 6;

// Sedan and estate cost the car price; the minibus costs 1.6 times as much (see fares.ts).
export function vehiclePrice(from: AirportCode, to: DestinationId, vehicle: VehicleId): number {
  const car = FARES[from][to].car;
  return vehicle === "minibus" ? minibusPrice(car) : car;
}

export type PriceInput = { from: AirportCode; to: DestinationId; vehicle: VehicleId; skis: number; returnTrip: boolean };

export function priceLines(input: PriceInput) {
  const ride = vehiclePrice(input.from, input.to, input.vehicle);
  const skis = input.skis * SKI_BAG_PRICE;
  const legs = input.returnTrip ? 2 : 1;
  return { ride, skis, legs, total: (ride + skis) * legs };
}

// Date "YYYY-MM-DD" and time "HH:MM" in the traveller's local time.
export function toLocalDate(date: string, time: string): Date | null {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const t = /^(\d{2}):(\d{2})$/.exec(time);
  if (!d || !t) return null;
  return new Date(Number(d[1]), Number(d[2]) - 1, Number(d[3]), Number(t[1]), Number(t[2]));
}

export function isTooSoon(date: string, time: string, now: Date): boolean {
  const when = toLocalDate(date, time);
  return !!when && when.getTime() < now.getTime() + MIN_NOTICE_HOURS * 3_600_000;
}

export function isAfter(date: string, time: string, afterDate: string, afterTime: string): boolean {
  const a = toLocalDate(date, time);
  const b = toLocalDate(afterDate, afterTime);
  return !!a && !!b && a.getTime() > b.getTime();
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Splits a datetime-local value ("2026-10-14T14:30") from the home form.
export function splitDateTime(value: string): { date: string; time: string } {
  const [date = "", time = ""] = value.split("T");
  return { date, time: time.slice(0, 5) };
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

// International format: a plus sign, then at least 8 digits (spaces allowed).
export function isPhone(value: string): boolean {
  const v = value.trim();
  return /^\+[\d\s]+$/.test(v) && v.replace(/\D/g, "").length >= 8;
}
