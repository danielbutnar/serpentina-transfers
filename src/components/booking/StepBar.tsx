import { fill } from "@/i18n/config";
import type { BookDictionary } from "@/i18n/book-en";
import type { Step } from "./flow-state";

// The three steps as a black wayfinding bar. The current step is yellow, finished steps get a tick.
export function StepBar({ step, t }: { step: Step; t: BookDictionary }) {
  const names = [t.steps.trip, t.steps.details, t.steps.payment];
  return (
    <ol className="grid grid-cols-3 bg-ink text-paper">
      {names.map((name, i) => {
        const n = i + 1;
        const current = n === step;
        const done = n < step;
        return (
          <li
            key={name}
            aria-current={current ? "step" : undefined}
            className={`flex min-w-0 flex-col gap-0.5 border-r border-paper/20 px-3 py-3 last:border-r-0 sm:flex-row sm:items-baseline sm:gap-3 lg:px-12 lg:py-4.5 ${current ? "bg-sign text-ink" : ""}`}
          >
            <span aria-hidden="true" className={`font-mono text-caption font-bold ${current ? "text-ink" : "text-sign"}`}>
              {done ? "✓" : String(n).padStart(2, "0")}
            </span>
            <span className="truncate text-sm font-black sm:text-base lg:text-xl">
              <span className="sr-only">{fill(t.stepLabel, { n })}: </span>
              {name}
              {done && <span className="sr-only"> ({t.completed})</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
