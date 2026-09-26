import assert from "node:assert/strict";
import { test } from "node:test";
import { AIRPORTS, DESTINATIONS, FARES, bookingReference, clampPassengers, isAirport, isDestination, minibusPrice, quote } from "./fares";

test("every airport has a fare to every destination", () => {
  for (const airport of AIRPORTS) {
    for (const destination of DESTINATIONS) {
      const fare = FARES[airport][destination];
      assert.ok(fare.car > 0 && fare.km > 0 && fare.minutes > 0, `${airport} → ${destination}`);
    }
  }
});

test("minibus price is 1.6 times the car price, rounded to 5", () => {
  assert.equal(minibusPrice(105), 170);
  assert.equal(minibusPrice(20), 30);
  assert.equal(minibusPrice(195), 310);
  for (const airport of AIRPORTS) for (const d of DESTINATIONS) assert.equal(minibusPrice(FARES[airport][d].car) % 5, 0);
});

test("up to 4 passengers ride in a car, 5 to 8 in a minibus", () => {
  assert.deepEqual(quote("OTP", "brasov", 4), { price: 105, vehicle: "car", km: 170, minutes: 165 });
  assert.deepEqual(quote("OTP", "brasov", 5), { price: 170, vehicle: "minibus", km: 170, minutes: 165 });
  assert.equal(quote("GHV", "poiana", 1).price, 30);
});

test("passenger counts are kept between 1 and 8", () => {
  assert.equal(clampPassengers(0), 1);
  assert.equal(clampPassengers(12), 8);
  assert.equal(clampPassengers(3.4), 3);
});

test("airport and destination guards accept only known values", () => {
  assert.ok(isAirport("SBZ"));
  assert.ok(!isAirport("BBU"));
  assert.ok(isDestination("bran"));
  assert.ok(!isDestination("Bran"));
});

test("booking references are SRP- plus four digits", () => {
  assert.equal(
    bookingReference(() => 0),
    "SRP-1000",
  );
  assert.equal(
    bookingReference(() => 0.99999),
    "SRP-9999",
  );
  assert.match(bookingReference(), /^SRP-\d{4}$/);
});
