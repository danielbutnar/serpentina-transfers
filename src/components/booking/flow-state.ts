import { smallestFit, type VehicleId } from "@/lib/booking";
import type { AirportCode, DestinationId } from "@/lib/fares";
import type { Draft } from "@/lib/storage";

export type Step = 1 | 2 | 3 | 4;

export type FlowState = {
  step: Step;
  from: AirportCode;
  to: DestinationId;
  date: string;
  time: string;
  flight: string;
  flightStatus: "idle" | "found" | "notfound";
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
  ref: string | null;
};

export type FieldKey = "date" | "time" | "childSeats" | "returnDate" | "returnTime" | "name" | "email" | "phone";
export type Errors = Partial<Record<FieldKey, string>>;

// The element each error links to (and focuses) in the error summary.
export const FIELD_IDS: Record<FieldKey, string> = {
  date: "bk-date",
  time: "bk-time",
  childSeats: "bk-child-seats-dec",
  returnDate: "bk-return-date",
  returnTime: "bk-return-time",
  name: "bk-name",
  email: "bk-email",
  phone: "bk-phone",
};

export function initialState(draft: Draft | null): FlowState {
  const passengers = draft?.passengers ?? 2;
  const suitcases = Math.min(passengers, 8);
  return {
    step: 1,
    from: draft?.from ?? "OTP",
    to: draft?.to ?? "brasov",
    date: draft?.date ?? "",
    time: draft?.time ?? "",
    flight: "",
    flightStatus: "idle",
    passengers,
    suitcases,
    skis: 0,
    childSeats: 0,
    vehicle: smallestFit({ passengers, suitcases, skis: 0 }),
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    name: draft?.name ?? "",
    email: "",
    phone: "",
    notes: "",
    payment: "driver",
    ref: null,
  };
}
