"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_PRICES, parsePriceTable, type PriceTable } from "./fares";

// Route prices edited in the owner dashboard, kept in this browser. Components read them with
// usePrices(); the prerendered HTML always shows the default prices, and the stored ones replace them
// right after hydration. Other tabs follow through the "storage" event.

const KEY = "serpentina:prices";
const listeners = new Set<() => void>();
let cache: { raw: string | null; table: PriceTable } = { raw: null, table: DEFAULT_PRICES };

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function snapshot(): PriceTable {
  const raw = readRaw();
  if (raw === cache.raw) return cache.table;
  let table = DEFAULT_PRICES;
  try {
    table = (raw && parsePriceTable(JSON.parse(raw))) || DEFAULT_PRICES;
  } catch {
    table = DEFAULT_PRICES;
  }
  cache = { raw, table };
  return table;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => e.key === KEY && onChange();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function usePrices(): PriceTable {
  return useSyncExternalStore(subscribe, snapshot, () => DEFAULT_PRICES);
}

export function savePrices(table: PriceTable): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(table));
  } catch {
    // Storage blocked: the prices stay as they were.
  }
  listeners.forEach((l) => l());
}

export function resetPrices(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing stored.
  }
  listeners.forEach((l) => l());
}
