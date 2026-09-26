"use client";

import { useQuote } from "./QuoteProvider";

// The card the driver holds at arrivals. It repeats the name typed in the form, so it is hidden from
// screen readers; the visible note next to it says what it is.
export function NameSign({ size }: { size: "large" | "compact" }) {
  const { name, t } = useQuote();
  const shown = name.trim() || t.sign.yourName;
  const large = size === "large";
  return (
    <div
      aria-hidden="true"
      className={large ? "min-w-[340px] border-3 border-ink bg-white px-6 pt-3.5 pb-[18px]" : "border-2 border-ink bg-white px-3.5 pt-2.5 pb-3"}
    >
      <div className={`font-mono font-bold text-label uppercase ${large ? "mb-1.5 text-[11px] tracking-[0.12em]" : "mb-1 text-[10px] tracking-[0.12em]"}`}>
        {t.sign.company}
      </div>
      <div className={`leading-[1.05] font-black tracking-[-0.02em] [overflow-wrap:anywhere] uppercase ${large ? "text-[38px]" : "text-[26px]"}`}>{shown}</div>
    </div>
  );
}
