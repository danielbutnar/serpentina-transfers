import assert from "node:assert/strict";
import { test } from "node:test";
import { ALL_ROUTES, parseRouteSlug, routeSlug, viaTowns } from "./routes";

test("20 routes, each with a slug that parses back", () => {
  assert.equal(ALL_ROUTES.length, 20);
  for (const r of ALL_ROUTES) assert.deepEqual(parseRouteSlug(routeSlug(r.from, r.to)), r);
  assert.equal(routeSlug("OTP", "poiana"), "otp-poiana");
  assert.equal(parseRouteSlug("OTP-poiana"), null);
  assert.equal(parseRouteSlug("otp-paris"), null);
});

test("towns on the way leave out both ends", () => {
  assert.deepEqual(viaTowns("OTP", "brasov"), ["Ploiești", "Câmpina", "Sinaia", "Predeal"]);
  assert.deepEqual(viaTowns("GHV", "brasov"), []);
  assert.deepEqual(viaTowns("CLJ", "poiana"), ["Târgu Mureș", "Sighișoara", "Brașov"]);
});
