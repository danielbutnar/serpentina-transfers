import assert from "node:assert/strict";
import { test } from "node:test";
import { SAMPLE_RIDES, pickupAt, rideStatus, ridesPerDriver, withAssignments } from "./dashboard";

const at = (h: number, m: number) => new Date(2026, 9, 14, h, m);
const anna = SAMPLE_RIDES.find((r) => r.id === "r5")!; // OTP → Poiana, 14:50 + 40 min delay, 180 min drive

test("a delayed flight moves the pickup", () => {
  assert.equal(pickupAt(anna, at(8, 0)).getHours() * 60 + pickupAt(anna, at(8, 0)).getMinutes(), 15 * 60 + 30);
});

test("the status follows the clock", () => {
  assert.equal(rideStatus(anna, at(13, 59)), "scheduled");
  assert.equal(rideStatus(anna, at(14, 0)), "enRoute");
  assert.equal(rideStatus(anna, at(15, 0)), "waiting");
  assert.equal(rideStatus(anna, at(15, 30)), "onBoard");
  assert.equal(rideStatus(anna, at(18, 30)), "completed");
});

test("assigning a driver fills the gap and counts per driver", () => {
  const rides = withAssignments(SAMPLE_RIDES, { r4: "Ioana" });
  assert.equal(rides.find((r) => r.id === "r4")!.driver, "Ioana");
  const counts = ridesPerDriver(rides);
  assert.equal(counts.Ioana, 2);
  assert.equal(counts.Sorin, 2);
});
