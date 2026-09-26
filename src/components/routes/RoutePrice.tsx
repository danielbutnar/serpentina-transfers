"use client";

import { formatPrice, type Locale } from "@/i18n/config";
import { minibusPrice, type AirportCode, type DestinationId } from "@/lib/fares";
import { usePrices } from "@/lib/prices";

// A route's price from the current price table (the owner demo can change it in this browser).
export function RoutePrice({ from, to, locale, vehicle = "car" }: { from: AirportCode; to: DestinationId; locale: Locale; vehicle?: "car" | "minibus" }) {
  const car = usePrices()[from][to];
  return <>{formatPrice(vehicle === "car" ? car : minibusPrice(car), locale)}</>;
}
