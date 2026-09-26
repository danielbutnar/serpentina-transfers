import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ t, locale }: { t: Dictionary; locale: Locale }) {
  const links = [
    { href: `/${locale}/book/`, label: t.links.book },
    { href: `/${locale}/manage/`, label: t.links.manage },
    { href: `/${locale}/admin/`, label: t.links.owner },
  ];
  return (
    <footer className="flex flex-col gap-3 bg-sign px-5 py-4 font-mono text-2xs font-bold tracking-footer uppercase md:flex-row md:items-center md:justify-between md:px-12 md:text-xs">
      <nav aria-label={t.links.label}>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-6 items-center underline underline-offset-4 hover:no-underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="flex flex-col gap-0.5 md:items-end">
        <span>{t.concept}</span>
        <span>© 2026 Serpentina Transfers · Brașov</span>
      </p>
    </footer>
  );
}
