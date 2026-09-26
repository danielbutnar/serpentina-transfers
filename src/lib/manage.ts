import { toLocalDate } from "./booking";

// Rules for changing and cancelling a booking. Free cancellation until 24 hours before pickup, 50 %
// back after that (card payments only; pay-the-driver bookings were never charged).

export const FREE_CANCEL_HOURS = 24;

export function hoursUntil(date: string, time: string, now: Date): number {
  const when = toLocalDate(date, time);
  return when ? (when.getTime() - now.getTime()) / 3_600_000 : Infinity;
}

export function refund(booking: { date: string; time: string; total: number; payment: "driver" | "card" }, now: Date) {
  const late = hoursUntil(booking.date, booking.time, now) < FREE_CANCEL_HOURS;
  const amount = booking.payment === "card" ? (late ? Math.round(booking.total / 2) : booking.total) : 0;
  return { late, amount };
}

// Fictional drivers for the demo; the same booking always gets the same driver.
export const DRIVERS = ["Mihai", "Ioana", "Radu", "Andrei", "Sorin"] as const;

export function driverFor(ref: string): string {
  let sum = 0;
  for (const ch of ref) sum += ch.charCodeAt(0);
  return DRIVERS[sum % DRIVERS.length];
}

export function isReference(value: string): boolean {
  return /^SRP-\d{4}$/.test(value.trim().toUpperCase());
}
