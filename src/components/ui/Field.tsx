import type { InputHTMLAttributes, ReactNode } from "react";

export const control = "h-12.5 w-full min-w-0 border-2 border-ink bg-white px-3 text-base font-semibold text-ink";
export const primaryButton =
  "inline-flex h-14 items-center justify-between gap-6 bg-ink px-5.5 text-body-lg font-extrabold text-sign hover:bg-black lg:h-15 lg:text-lg";
// Same height as the inputs, for a button that sits next to one.
export const inlineButton =
  "inline-flex h-12.5 shrink-0 items-center justify-center border-2 border-ink bg-white px-5 font-bold hover:bg-sign-soft disabled:opacity-50";
export const secondaryButton = "inline-flex h-14 items-center justify-center border-2 border-ink bg-white px-5 font-bold hover:bg-sign-soft lg:h-15";

// Label, optional hint, the input, and an error line tied to it with aria-describedby.
export function Field({
  id,
  label,
  hint,
  error,
  children,
  ...input
}: { id: string; label: string; hint?: ReactNode; error?: string; children?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="label-mono">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="flex gap-2">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${control} ${error ? "outline-2 outline-offset-1 outline-ink" : ""}`}
          {...input}
        />
        {children}
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex gap-2 text-sm font-bold">
      <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center bg-ink text-xs text-sign">
        !
      </span>
      {children}
    </p>
  );
}
