// The black wayfinding bar that opens each section: number, title and an arrow, like an airport sign.
export function SectionBar({ id, number, title }: { id: string; number: number; title: string }) {
  return (
    <div className="flex items-center justify-between bg-ink px-5 py-3.5 text-paper lg:px-12 lg:py-4.5">
      <h2 id={`${id}-title`} className="flex items-baseline gap-3.5 lg:gap-5">
        <span aria-hidden="true" className="font-mono text-caption font-bold text-sign lg:text-base">
          {String(number).padStart(2, "0")}
        </span>
        <span className="text-title-xs font-black tracking-heading lg:text-title">{title}</span>
      </h2>
      <span aria-hidden="true" className="hidden text-title text-sign lg:inline">
        →
      </span>
    </div>
  );
}
