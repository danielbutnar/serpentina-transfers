"use client";

import { useState, type SubmitEvent } from "react";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { AIRPORTS, DEFAULT_PRICES, DESTINATIONS, DESTINATION_NAMES, MAX_PRICE, MIN_PRICE, minibusPrice, type PriceTable } from "@/lib/fares";
import { resetPrices, savePrices } from "@/lib/prices";
import { primaryButton, secondaryButton } from "../ui/Field";

type Draft = Record<string, string>;
const key = (a: string, d: string) => `${a}:${d}`;

function toDraft(prices: PriceTable): Draft {
  return Object.fromEntries(AIRPORTS.flatMap((a) => DESTINATIONS.map((d) => [key(a, d), String(prices[a][d])])));
}

function valid(value: string): boolean {
  return /^\d+$/.test(value.trim()) && Number(value) >= MIN_PRICE && Number(value) <= MAX_PRICE;
}

// One fieldset per airport (side by side on desktop, stacked on phones), whole euros only.
export function PriceEditor({ prices, t }: { prices: PriceTable; t: Dictionary }) {
  const p = t.admin.prices;
  const [draft, setDraft] = useState<Draft>(() => toDraft(prices));
  const [showErrors, setShowErrors] = useState(false);
  const [message, setMessage] = useState("");
  const invalid = Object.entries(draft).filter(([, v]) => !valid(v));

  const save = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invalid.length) {
      setShowErrors(true);
      setMessage(p.errors);
      document.getElementById(`price-${invalid[0][0].replace(":", "-")}`)?.focus();
      return;
    }
    const table = Object.fromEntries(AIRPORTS.map((a) => [a, Object.fromEntries(DESTINATIONS.map((d) => [d, Number(draft[key(a, d)])]))])) as PriceTable;
    savePrices(table);
    setShowErrors(false);
    setMessage(p.saved);
  };

  return (
    <form noValidate onSubmit={save} className="flex flex-col gap-5">
      <p className="max-w-170 text-sm text-muted">{p.note}</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {AIRPORTS.map((a) => (
          <fieldset key={a} className="flex flex-col gap-2 border-2 border-ink bg-white p-3.5">
            <legend className="bg-paper px-1.5 font-mono text-sm font-bold">
              {a} · {t.airports[a]}
            </legend>
            {DESTINATIONS.map((d) => {
              const id = `price-${a}-${d}`;
              const value = draft[key(a, d)];
              const bad = showErrors && !valid(value);
              return (
                <div key={d} className="grid grid-cols-fill-auto items-center gap-3">
                  <label htmlFor={id} className="text-sm font-bold">
                    {DESTINATION_NAMES[d]}
                    <span className="sr-only"> ({fill(p.cell, { from: t.airports[a], to: DESTINATION_NAMES[d] })})</span>
                    <span className="block font-mono text-xs font-normal text-muted">{valid(value) ? `/ €${minibusPrice(Number(value))}` : ""}</span>
                  </label>
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true" className="font-bold">
                      €
                    </span>
                    <input
                      id={id}
                      inputMode="numeric"
                      value={value}
                      onChange={(e) => setDraft((prev) => ({ ...prev, [key(a, d)]: e.target.value }))}
                      aria-invalid={bad ? true : undefined}
                      aria-describedby={bad ? `${id}-error` : undefined}
                      className={`h-11 w-20 border-2 border-ink bg-white px-2 text-right font-bold ${bad ? "outline-2 outline-offset-1 outline-ink" : ""}`}
                    />
                  </span>
                  {bad && (
                    <p id={`${id}-error`} className="col-span-2 text-xs font-bold">
                      {p.invalid}
                    </p>
                  )}
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>
      <p role="status" className="font-bold empty:hidden">
        {message}
      </p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button type="submit" className={primaryButton}>
          <span>{p.save}</span>
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={() => {
            resetPrices();
            setDraft(toDraft(DEFAULT_PRICES));
            setShowErrors(false);
            setMessage(p.resetDone);
          }}
          className={secondaryButton}
        >
          {p.reset}
        </button>
      </div>
    </form>
  );
}
