import { AIRPORTS, DESTINATIONS, isAirport, isDestination, type AirportCode, type DestinationId } from "./fares";
import { ROUTES, type NodeId } from "./route-map";

// Route pages: one per airport and destination, e.g. /en/routes/otp-poiana/.

export type RouteKey = { from: AirportCode; to: DestinationId };

export function routeSlug(from: AirportCode, to: DestinationId): string {
  return `${from.toLowerCase()}-${to}`;
}

export function parseRouteSlug(slug: string): RouteKey | null {
  const [a, d] = slug.split("-");
  const from = a?.toUpperCase() ?? "";
  if (!isAirport(from) || !d || !isDestination(d) || slug !== routeSlug(from, d)) return null;
  return { from, to: d };
}

export const ALL_ROUTES: RouteKey[] = AIRPORTS.flatMap((from) => DESTINATIONS.map((to) => ({ from, to })));

// Towns on the way, for "via …" (the airport and the destination themselves are left out).
const PLACE_NAMES: Record<NodeId, string> = {
  OTP: "Otopeni",
  GHV: "Ghimbav",
  SBZ: "Sibiu",
  CLJ: "Cluj-Napoca",
  brasov: "Brașov",
  poiana: "Poiana Brașov",
  bran: "Bran",
  predeal: "Predeal",
  sinaia: "Sinaia",
  ploiesti: "Ploiești",
  campina: "Câmpina",
  rasnov: "Râșnov",
  fagaras: "Făgăraș",
  targuMures: "Târgu Mureș",
  sighisoara: "Sighișoara",
};

export function viaTowns(from: AirportCode, to: DestinationId): string[] {
  return ROUTES[from][to].slice(1, -1).map((id) => PLACE_NAMES[id]);
}

// Which road note fits the route, and whether it climbs into the mountains.
export const ROAD_BY_AIRPORT: Record<AirportCode, "prahova" | "local" | "fagaras" | "transylvania"> = {
  OTP: "prahova",
  GHV: "local",
  SBZ: "fagaras",
  CLJ: "transylvania",
};

export const MOUNTAIN_DESTINATIONS: DestinationId[] = ["poiana", "bran", "predeal", "sinaia"];
