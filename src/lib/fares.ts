// Sample fares for the concept. Prices are per vehicle in euro; the car price covers 1–4 passengers,
// the minibus (5–8 passengers) costs 1.6 times as much, rounded to 5 €. Figures come from the
// Claude Design hand-off (design-v2/Serpentina Transfers v2.dc.html) and are approximate.

export const AIRPORTS = ["OTP", "GHV", "SBZ", "CLJ"] as const;
export type AirportCode = (typeof AIRPORTS)[number];

export const DESTINATIONS = ["brasov", "poiana", "bran", "predeal", "sinaia"] as const;
export type DestinationId = (typeof DESTINATIONS)[number];

// Place names are the same in every language.
export const DESTINATION_NAMES: Record<DestinationId, string> = {
  brasov: "Brașov",
  poiana: "Poiana Brașov",
  bran: "Bran",
  predeal: "Predeal",
  sinaia: "Sinaia",
};

export type Fare = { car: number; km: number; minutes: number };

export const FARES: Record<AirportCode, Record<DestinationId, Fare>> = {
  OTP: {
    brasov: { car: 105, km: 170, minutes: 165 },
    poiana: { car: 115, km: 182, minutes: 180 },
    bran: { car: 125, km: 190, minutes: 190 },
    predeal: { car: 90, km: 145, minutes: 140 },
    sinaia: { car: 80, km: 125, minutes: 120 },
  },
  GHV: {
    brasov: { car: 20, km: 12, minutes: 20 },
    poiana: { car: 30, km: 25, minutes: 35 },
    bran: { car: 30, km: 30, minutes: 40 },
    predeal: { car: 35, km: 38, minutes: 45 },
    sinaia: { car: 45, km: 60, minutes: 65 },
  },
  SBZ: {
    brasov: { car: 95, km: 145, minutes: 135 },
    poiana: { car: 105, km: 158, minutes: 150 },
    bran: { car: 90, km: 140, minutes: 130 },
    predeal: { car: 110, km: 170, minutes: 165 },
    sinaia: { car: 120, km: 190, minutes: 185 },
  },
  CLJ: {
    brasov: { car: 170, km: 275, minutes: 240 },
    poiana: { car: 180, km: 288, minutes: 255 },
    bran: { car: 165, km: 290, minutes: 260 },
    predeal: { car: 185, km: 300, minutes: 270 },
    sinaia: { car: 195, km: 320, minutes: 290 },
  },
};

export const MIN_PASSENGERS = 1;
export const MAX_PASSENGERS = 8;
export const CAR_MAX_PASSENGERS = 4;

export type Vehicle = "car" | "minibus";

export function minibusPrice(carPrice: number): number {
  return Math.round((carPrice * 1.6) / 5) * 5;
}

export function isAirport(value: string): value is AirportCode {
  return (AIRPORTS as readonly string[]).includes(value);
}

export function isDestination(value: string): value is DestinationId {
  return (DESTINATIONS as readonly string[]).includes(value);
}

export function clampPassengers(passengers: number): number {
  return Math.min(MAX_PASSENGERS, Math.max(MIN_PASSENGERS, Math.round(passengers)));
}

// Car prices per route. The owner dashboard can override them (stored in the browser, see prices.ts);
// everything that shows or charges a price takes the table as an argument.
export type PriceTable = Record<AirportCode, Record<DestinationId, number>>;

export const DEFAULT_PRICES: PriceTable = Object.fromEntries(
  AIRPORTS.map((a) => [a, Object.fromEntries(DESTINATIONS.map((d) => [d, FARES[a][d].car]))]),
) as PriceTable;

export const MIN_PRICE = 10;
export const MAX_PRICE = 1000;

// Accepts a stored table only if every route has a whole-euro price in range; anything else is ignored.
export function parsePriceTable(value: unknown): PriceTable | null {
  if (!value || typeof value !== "object") return null;
  const table = value as Record<string, Record<string, unknown>>;
  for (const a of AIRPORTS)
    for (const d of DESTINATIONS) {
      const v = table[a]?.[d];
      if (typeof v !== "number" || !Number.isInteger(v) || v < MIN_PRICE || v > MAX_PRICE) return null;
    }
  return table as PriceTable;
}

export type Quote = { price: number; vehicle: Vehicle; km: number; minutes: number };

export function quote(from: AirportCode, to: DestinationId, passengers: number, prices: PriceTable = DEFAULT_PRICES): Quote {
  const fare = FARES[from][to];
  const car = prices[from][to];
  const vehicle: Vehicle = clampPassengers(passengers) > CAR_MAX_PASSENGERS ? "minibus" : "car";
  return { price: vehicle === "car" ? car : minibusPrice(car), vehicle, km: fare.km, minutes: fare.minutes };
}

// "SRP-" plus four digits, as in the design's demo confirmation.
export function bookingReference(random: () => number = Math.random): string {
  return `SRP-${1000 + Math.floor(random() * 9000)}`;
}
