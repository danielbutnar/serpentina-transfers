// The card the driver holds at arrivals. It repeats a name shown elsewhere on the page, so it is
// hidden from screen readers.
export function NameSignCard({
  name,
  placeholder,
  company,
  size = "large",
}: {
  name: string;
  placeholder: string;
  company: string;
  size?: "large" | "compact";
}) {
  const large = size === "large";
  return (
    <div
      aria-hidden="true"
      className={large ? "min-w-0 border-3 border-ink bg-white px-6 pt-3.5 pb-4.5 sm:min-w-85" : "border-2 border-ink bg-white px-3.5 pt-2.5 pb-3"}
    >
      <div className={`font-mono font-bold tracking-label text-label uppercase ${large ? "mb-1.5 text-2xs" : "mb-1 text-3xs"}`}>{company}</div>
      <div className={`leading-sign font-black tracking-heading wrap-anywhere uppercase ${large ? "text-namecard" : "text-namecard-sm"}`}>
        {name.trim() || placeholder}
      </div>
    </div>
  );
}
