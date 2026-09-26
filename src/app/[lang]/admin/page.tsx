import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardLoader } from "@/components/admin/DashboardLoader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/admin">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).admin.metaTitle };
}

export default async function AdminPage({ params }: PageProps<"/[lang]/admin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main id="booking" tabIndex={-1}>
        <div className="border-b-3 border-ink px-5 pt-7 pb-6 lg:px-12 lg:pt-12 lg:pb-9">
          <h1 className="text-display-sm leading-display font-black tracking-display lg:text-display-lg">{t.admin.title}</h1>
        </div>
        <DashboardLoader locale={lang} t={t} />
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
