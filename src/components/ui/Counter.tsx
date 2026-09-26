import { fill } from "@/i18n/config";

// A labelled − n + stepper. Button names read "Fewer: Suitcases" / "More: Suitcases".
export function Counter({
  id,
  label,
  hint,
  value,
  min,
  max,
  onChange,
  fewer,
  more,
  invalid,
  errorId,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  fewer: string;
  more: string;
  invalid?: boolean;
  errorId?: string;
}) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} aria-describedby={invalid ? errorId : undefined} className="flex min-w-0 flex-col gap-1.5">
      <span id={`${id}-label`} className="label-mono">
        {label}
        {hint && <span className="ml-2 font-sans text-xs font-semibold tracking-normal text-muted normal-case">{hint}</span>}
      </span>
      <div
        className={`grid h-12.5 grid-cols-[48px_1fr_48px] border-2 bg-white ${invalid ? "border-ink outline-2 outline-offset-1 outline-ink" : "border-ink"}`}
      >
        <button
          id={`${id}-dec`}
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={fill(fewer, { item: label })}
          className="border-r-2 border-ink text-xl font-bold disabled:text-ink/35"
        >
          −
        </button>
        <output aria-live="polite" className="flex items-center justify-center text-body-lg font-extrabold">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={fill(more, { item: label })}
          className="border-l-2 border-ink text-xl font-bold disabled:text-ink/35"
        >
          +
        </button>
      </div>
    </div>
  );
}
