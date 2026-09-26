import type { Dictionary } from "@/i18n/dictionaries";
import { SectionBar } from "./SectionBar";

// Native <details> sharing one name: opening a question closes the others, no script needed.
export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-4">
      <SectionBar id="faq" number={3} title={t.faq.title} />
      <div className="px-5 pt-1 pb-6 lg:px-12 lg:pt-4 lg:pb-14">
        {t.faq.items.map((item, i) => (
          <details key={item.q} name="faq" open={i === 0} className="group border-b border-ink">
            <summary className="grid min-h-14 cursor-pointer grid-cols-[1fr_28px] items-center gap-3 py-3.5 text-base font-extrabold lg:grid-cols-[48px_1fr_32px] lg:gap-0 lg:py-5.5 lg:text-lead">
              <span aria-hidden="true" className="hidden font-mono text-sm font-normal text-label lg:inline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.q}</span>
              <span aria-hidden="true" className="flex size-7 items-center justify-center bg-sign text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="mb-4 max-w-170 text-body-sm leading-copy text-muted lg:mb-6 lg:ml-12 lg:text-base">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
