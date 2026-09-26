import type { Ref } from "react";
import { FIELD_IDS, type Errors, type FieldKey } from "./flow-state";

// Listed at the top of a step after a failed "Continue"; it takes focus, and each line jumps to its field.
export function ErrorSummary({ title, errors, ref }: { title: string; errors: Errors; ref?: Ref<HTMLDivElement> }) {
  const entries = Object.entries(errors) as [FieldKey, string][];
  if (entries.length === 0) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="border-3 border-ink bg-white p-5">
      <p className="text-lg font-black">{title}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {entries.map(([key, message]) => (
          <li key={key}>
            <a
              href={`#${FIELD_IDS[key]}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(FIELD_IDS[key])?.focus();
              }}
              className="font-semibold underline underline-offset-2"
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
