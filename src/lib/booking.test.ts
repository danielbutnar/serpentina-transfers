import assert from "node:assert/strict";
import { test } from "node:test";
import { addMinutes, fitProblem, isAfter, isEmail, isPhone, isTooSoon, priceLines, smallestFit, splitDateTime, toLocalDate, vehiclePrice } from "./booking";
import { AIRPORTS, DESTINATIONS } from "./fares";
import { findFlight, normalizeFlightNumber, pickupTime } from "./flights";
import { buildIcs } from "./ics";
import { MAP_HEIGHT, MAP_WIDTH, NODES, ROUTES, project, routeViewBox } from "./route-map";

test("vehicles refuse loads they cannot carry", () => {
  assert.equal(fitProblem("sedan", { passengers: 3, suitcases: 3, skis: 0 }), null);
  assert.equal(fitProblem("sedan", { passengers: 4, suitcases: 0, skis: 0 }), "passengers");
  assert.equal(fitProblem("sedan", { passengers: 2, suitcases: 1, skis: 1 }), "skis");
  assert.equal(fitProblem("estate", { passengers: 4, suitcases: 3, skis: 2 }), null);
  assert.equal(fitProblem("estate", { passengers: 4, suitcases: 4, skis: 2 }), "luggage");
  assert.equal(fitProblem("minibus", { passengers: 8, suitcases: 8, skis: 8 }), null);
});

test("the smallest vehicle that fits is chosen", () => {
  assert.equal(smallestFit({ passengers: 2, suitcases: 2, skis: 0 }), "sedan");
  assert.equal(smallestFit({ passengers: 2, suitcases: 2, skis: 2 }), "estate");
  assert.equal(smallestFit({ passengers: 5, suitcases: 0, skis: 0 }), "minibus");
});

test("prices: car price for sedan and estate, ski bags 5 € each, return doubles everything", () => {
  assert.equal(vehiclePrice("OTP", "brasov", "sedan"), 105);
  assert.equal(vehiclePrice("OTP", "brasov", "estate"), 105);
  assert.equal(vehiclePrice("OTP", "brasov", "minibus"), 170);
  assert.deepEqual(priceLines({ from: "OTP", to: "poiana", vehicle: "estate", skis: 2, returnTrip: true }), { ride: 115, skis: 10, legs: 2, total: 250 });
});

test("pickups need 6 hours' notice", () => {
  const now = new Date(2026, 9, 14, 8, 0);
  assert.ok(isTooSoon("2026-10-14", "13:59", now));
  assert.ok(!isTooSoon("2026-10-14", "14:00", now));
  assert.ok(isAfter("2026-10-20", "09:00", "2026-10-14", "14:30"));
  assert.ok(!isAfter("2026-10-14", "14:30", "2026-10-14", "14:30"));
  assert.equal(toLocalDate("", "10:00"), null);
});

test("time helpers", () => {
  assert.equal(addMinutes("14:35", 15), "14:50");
  assert.equal(addMinutes("23:55", 15), "00:10");
  assert.deepEqual(splitDateTime("2026-10-14T14:30"), { date: "2026-10-14", time: "14:30" });
  assert.deepEqual(splitDateTime(""), { date: "", time: "" });
});

test("contact checks", () => {
  assert.ok(isEmail("anna@example.com"));
  assert.ok(!isEmail("anna@example"));
  assert.ok(isPhone("+49 151 23456789"));
  assert.ok(!isPhone("0722 123 456"));
  assert.ok(!isPhone("+40 12"));
});

test("demo flights are found however the number is typed", () => {
  assert.equal(normalizeFlightNumber(" zz-1234 "), "ZZ 1234");
  const flight = findFlight("zz1234");
  assert.equal(flight?.airport, "OTP");
  assert.equal(pickupTime(flight!), "14:50");
  assert.equal(findFlight("ZZ 9999"), null);
});

test("calendar file has one event per leg and escapes text", () => {
  const ics = buildIcs(
    [
      {
        uid: "SRP-1000-out@serpentina.example",
        title: "Transfer, Otopeni",
        description: "a;b",
        location: "Otopeni",
        date: "2026-10-14",
        time: "14:50",
        minutes: 180,
      },
    ],
    new Date(Date.UTC(2026, 8, 26, 10, 0, 0)),
  );
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART:20261014T145000\r\n/);
  assert.match(ics, /DURATION:PT3H0M\r\n/);
  assert.match(ics, /SUMMARY:Transfer\\, Otopeni\r\n/);
  assert.match(ics, /DESCRIPTION:a\\;b\r\n/);
  assert.match(ics, /DTSTAMP:20260926T100000Z\r\n/);
});

test("every route has a path on the map, inside the map", () => {
  for (const a of AIRPORTS)
    for (const d of DESTINATIONS) {
      const path = ROUTES[a][d];
      assert.equal(path[0], a);
      assert.equal(path.at(-1), d);
    }
  for (const node of Object.values(NODES)) {
    const p = project(node);
    assert.ok(p.x >= 0 && p.x <= MAP_WIDTH && p.y >= 0 && p.y <= MAP_HEIGHT, JSON.stringify(node));
  }
});

test("the map frame contains the whole route in a 4:3 box", () => {
  for (const a of AIRPORTS)
    for (const d of DESTINATIONS) {
      const vb = routeViewBox(a, d);
      assert.ok(Math.abs(vb.w / vb.h - 4 / 3) < 1e-9);
      for (const id of ROUTES[a][d]) {
        const p = project(NODES[id]);
        assert.ok(p.x > vb.x && p.x < vb.x + vb.w && p.y > vb.y && p.y < vb.y + vb.h, `${a} → ${d}: ${id}`);
      }
    }
});
