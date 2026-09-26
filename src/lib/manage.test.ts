import assert from "node:assert/strict";
import { test } from "node:test";
import { DRIVERS, driverFor, hoursUntil, isReference, refund } from "./manage";

const now = new Date(2026, 9, 13, 12, 0);

test("hours until pickup", () => {
  assert.equal(hoursUntil("2026-10-14", "12:00", now), 24);
  assert.equal(hoursUntil("", "12:00", now), Infinity);
});

test("free cancellation until 24 hours before pickup, then half back; nothing to refund when paying the driver", () => {
  assert.deepEqual(refund({ date: "2026-10-14", time: "12:00", total: 115, payment: "card" }, now), { late: false, amount: 115 });
  assert.deepEqual(refund({ date: "2026-10-14", time: "11:59", total: 115, payment: "card" }, now), { late: true, amount: 58 });
  assert.deepEqual(refund({ date: "2026-10-20", time: "09:00", total: 115, payment: "driver" }, now), { late: false, amount: 0 });
});

test("each booking always gets the same fictional driver", () => {
  assert.equal(driverFor("SRP-1234"), driverFor("SRP-1234"));
  assert.ok((DRIVERS as readonly string[]).includes(driverFor("SRP-9876")));
});

test("booking references", () => {
  assert.ok(isReference(" srp-4827 "));
  assert.ok(!isReference("SRP-48"));
});
