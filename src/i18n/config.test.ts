import assert from "node:assert/strict";
import { test } from "node:test";
import { fill, formatDuration, formatPrice, hasLocale } from "./config";
import { de } from "./de";
import { en } from "./en";
import { ro } from "./ro";

test("only en, ro and de are locales", () => {
  assert.ok(hasLocale("ro"));
  assert.ok(!hasLocale("fr"));
});

test("prices follow each language's currency format", () => {
  assert.equal(formatPrice(105, "en"), "€105");
  assert.equal(formatPrice(105, "de").replace(/\s/g, " "), "105 €");
  assert.equal(formatPrice(1050, "ro").replace(/\s/g, " "), "1.050 €");
});

test("durations match the design and read naturally in German", () => {
  assert.equal(formatDuration(165, "en"), "2h 45m");
  assert.equal(formatDuration(240, "ro"), "4h");
  assert.equal(formatDuration(20, "en"), "20m");
  assert.equal(formatDuration(65, "en"), "1h 05m");
  assert.equal(formatDuration(165, "de"), "2 Std. 45 Min.");
});

test("fill replaces known placeholders and keeps unknown ones", () => {
  assert.equal(fill("{from} to {to}", { from: "OTP", to: "Bran" }), "OTP to Bran");
  assert.equal(fill("{x}", {}), "{x}");
});

test("every language has the same number of FAQ entries and vehicles", () => {
  for (const d of [ro, de]) {
    assert.equal(d.faq.items.length, en.faq.items.length);
    assert.equal(d.fleet.items.length, en.fleet.items.length);
  }
});
