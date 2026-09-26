"use client";

import { useSyncExternalStore } from "react";
import type { VehicleId } from "./booking";
import type { AirportCode, DestinationId } from "./fares";

// Demo persistence in the visitor's own browser. Nothing leaves the device: the draft from the home
// form lives in sessionStorage, finished demo bookings in localStorage. Every access is wrapped in
// try/catch because storage can be blocked (private mode, strict settings).

export type Draft = { from: AirportCode; to: DestinationId; passengers: number; name: string; date: string; time: string };

export type StoredBooking = {
  ref: string;
  createdAt: string;
  from: AirportCode;
  to: DestinationId;
  date: string;
  time: string;
  flight: string | null;
  passengers: number;
  suitcases: number;
  skis: number;
  childSeats: number;
  vehicle: VehicleId;
  returnTrip: boolean;
  returnDate: string;
  returnTime: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  payment: "driver" | "card";
  total: number;
  status: "confirmed" | "cancelled";
};

const DRAFT_KEY = "serpentina:draft";
const BOOKINGS_KEY = "serpentina:bookings";

function read<T>(storage: () => Storage, key: string): T | null {
  try {
    const raw = storage().getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(storage: () => Storage, key: string, value: unknown): void {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked or full: the demo still works for this page view.
  }
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

// A new draft from the home form replaces any booking in progress.
export function saveDraft(draft: Draft): void {
  write(session, DRAFT_KEY, draft);
  clearFlow();
}

const FLOW_KEY = "serpentina:flow";

export function saveFlow(state: unknown): void {
  write(session, FLOW_KEY, state);
}

export function loadFlow<T>(): T | null {
  return read<T>(session, FLOW_KEY);
}

export function clearFlow(): void {
  try {
    session().removeItem(FLOW_KEY);
  } catch {
    // Storage blocked: nothing to clear.
  }
}

export function loadDraft(): Draft | null {
  return read<Draft>(session, DRAFT_KEY);
}

export function loadBookings(): StoredBooking[] {
  const list = read<StoredBooking[]>(local, BOOKINGS_KEY);
  return Array.isArray(list) ? list : [];
}

export function saveBooking(booking: StoredBooking): void {
  write(local, BOOKINGS_KEY, [booking, ...loadBookings().filter((b) => b.ref !== booking.ref)]);
}

export function updateBooking(ref: string, patch: Partial<StoredBooking>): StoredBooking | null {
  const list = loadBookings();
  const i = list.findIndex((b) => b.ref === ref);
  if (i < 0) return null;
  list[i] = { ...list[i], ...patch };
  write(local, BOOKINGS_KEY, list);
  return list[i];
}

export function findBooking(ref: string, email: string): StoredBooking | null {
  const r = ref.trim().toUpperCase();
  const e = email.trim().toLowerCase();
  return loadBookings().find((b) => b.ref === r && b.email.toLowerCase() === e) ?? null;
}

// True after hydration. Components that read browser storage render only then, so the prerendered
// HTML and the first client render match.
const subscribe = () => () => {};
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
