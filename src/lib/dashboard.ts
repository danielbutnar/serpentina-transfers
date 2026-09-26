import type { VehicleId } from "./booking";
import { FARES, type AirportCode, type DestinationId } from "./fares";

// Sample data for the owner dashboard: a fictional day of rides. Statuses follow the clock, so the
// board looks live whenever it is opened.

export type Ride = {
  id: string;
  pickup: string;
  passenger: string;
  from: AirportCode;
  to: DestinationId;
  flight: string | null;
  vehicle: VehicleId;
  passengers: number;
  driver: string | null;
  delayMinutes?: number;
};

export const SAMPLE_RIDES: Ride[] = [
  { id: "r1", pickup: "07:30", passenger: "Maria Popescu", from: "OTP", to: "sinaia", flight: null, vehicle: "sedan", passengers: 2, driver: "Radu" },
  { id: "r2", pickup: "09:55", passenger: "Jonas Weber", from: "CLJ", to: "brasov", flight: "ZZ 4402", vehicle: "minibus", passengers: 5, driver: "Sorin" },
  { id: "r3", pickup: "12:05", passenger: "Emma Clarke", from: "OTP", to: "brasov", flight: "ZZ 2081", vehicle: "estate", passengers: 3, driver: "Ioana" },
  { id: "r4", pickup: "13:20", passenger: "Lukas Brandt", from: "GHV", to: "poiana", flight: "ZZ 5120", vehicle: "estate", passengers: 2, driver: "Radu" },
  {
    id: "r5",
    pickup: "14:50",
    passenger: "Anna Schmidt",
    from: "OTP",
    to: "poiana",
    flight: "ZZ 1234",
    vehicle: "sedan",
    passengers: 2,
    driver: "Mihai",
    delayMinutes: 40,
  },
  { id: "r6", pickup: "16:35", passenger: "Sofia Marin", from: "SBZ", to: "bran", flight: "ZZ 3310", vehicle: "sedan", passengers: 1, driver: "Andrei" },
  { id: "r7", pickup: "18:00", passenger: "Petra Novak", from: "GHV", to: "predeal", flight: null, vehicle: "minibus", passengers: 6, driver: null },
  { id: "r8", pickup: "21:30", passenger: "Chiara Rossi", from: "GHV", to: "brasov", flight: "ZZ 6017", vehicle: "sedan", passengers: 2, driver: null },
];

export const DRIVER_LANGUAGES: Record<string, string[]> = {
  Mihai: ["RO", "EN"],
  Ioana: ["RO", "EN", "DE"],
  Radu: ["RO", "EN"],
  Andrei: ["RO", "DE"],
  Sorin: ["RO", "EN", "IT"],
};

export type RideStatus = "unassigned" | "scheduled" | "enRoute" | "waiting" | "onBoard" | "completed";

export function pickupAt(ride: Ride, day: Date): Date {
  const [h, m] = ride.pickup.split(":").map(Number);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m + (ride.delayMinutes ?? 0));
}

// Driver sets off 90 minutes before pickup and is at arrivals 30 minutes before. A ride without a
// driver stays "unassigned" whatever the time: it cannot be on its way.
export function rideStatus(ride: Ride, now: Date): RideStatus {
  if (!ride.driver) return "unassigned";
  const start = pickupAt(ride, now).getTime();
  const t = now.getTime();
  const minute = 60_000;
  if (t >= start + FARES[ride.from][ride.to].minutes * minute) return "completed";
  if (t >= start) return "onBoard";
  if (t >= start - 30 * minute) return "waiting";
  if (t >= start - 90 * minute) return "enRoute";
  return "scheduled";
}

export function withAssignments(rides: Ride[], assignments: Record<string, string>): Ride[] {
  return rides.map((r) => (assignments[r.id] ? { ...r, driver: assignments[r.id] } : r));
}

export function ridesPerDriver(rides: Ride[]): Record<string, number> {
  const counts: Record<string, number> = Object.fromEntries(Object.keys(DRIVER_LANGUAGES).map((d) => [d, 0]));
  for (const r of rides) if (r.driver) counts[r.driver] = (counts[r.driver] ?? 0) + 1;
  return counts;
}
