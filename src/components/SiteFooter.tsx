import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="flex flex-col gap-0.5 bg-sign px-5 py-3 font-mono text-2xs font-bold tracking-footer uppercase md:flex-row-reverse md:justify-between md:px-12 md:py-3.5 md:text-xs">
      <span>{t.concept}</span>
      <span>© 2026 Serpentina Transfers · Brașov</span>
    </footer>
  );
}
