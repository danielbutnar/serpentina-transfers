// The black wayfinding bar that opens each section: number, title and an arrow, like an airport sign.
export function SectionBar({ id, number, title }: { id: string; number: number; title: string }) {
  return (
    <div className="flex items-center justify-between bg-ink px-5 py-3.5 text-paper lg:px-12 lg:py-[18px]">
      <h2 id={`${id}-title`} className="flex items-baseline gap-3.5 lg:gap-5">
        <span aria-hidden="true" className="font-mono text-[13px] font-bold text-sign lg:text-base">
          {String(number).padStart(2, "0")}
        </span>
        <span className="text-[21px] font-black tracking-[-0.02em] lg:text-[28px]">{title}</span>
      </h2>
      <span aria-hidden="true" className="hidden text-[28px] text-sign lg:inline">
        →
      </span>
    </div>
  );
}
