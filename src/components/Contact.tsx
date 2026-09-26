import type { Dictionary } from "@/i18n/dictionaries";
import { WhatsAppDemoButton } from "./WhatsAppDemoButton";

// Placeholder contact details: a Brașov-style number that is not assigned, and a reserved .example domain.
const PHONE = "+40 268 000 000";
const EMAIL = "hello@serpentina.example";

// Phones: one black block. Desktop: text on paper on the left, the black action block on the right.
export function Contact({ t }: { t: Dictionary }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grid scroll-mt-4 bg-ink text-paper md:grid-cols-2 md:border-t-3 md:border-ink md:bg-paper md:text-ink"
    >
      <div className="flex flex-col gap-3.5 px-5 pt-7 md:gap-3 md:p-12">
        <p aria-hidden="true" className="font-mono text-xs font-bold text-sign uppercase md:text-base md:text-label">
          04 · {t.nav.contact}
        </p>
        <h2 id="contact-title" className="text-[28px] leading-[1.05] font-black tracking-[-0.02em] md:text-[44px] md:leading-none md:tracking-[-0.03em]">
          {t.contact.title}
        </h2>
        <p className="text-[15px] text-on-ink-muted md:text-[17px] md:text-muted">{t.contact.sub}</p>
      </div>
      <div className="on-ink flex flex-col justify-center gap-3.5 bg-ink px-5 pt-3.5 pb-7 md:gap-4 md:p-12">
        <WhatsAppDemoButton label={t.contact.whatsapp} note={t.contact.demo} />
        <p className="flex flex-col gap-1 font-mono text-[13px] text-paper md:flex-row md:justify-between md:text-sm">
          <span className="whitespace-nowrap">{PHONE}</span>
          <span className="whitespace-nowrap">{EMAIL}</span>
        </p>
      </div>
    </section>
  );
}
