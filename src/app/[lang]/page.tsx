import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Fleet } from "@/components/Fleet";
import { NameSign } from "@/components/quote/NameSign";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import { RouteBoard } from "@/components/quote/RouteBoard";
import { RouteMatrix } from "@/components/quote/RouteMatrix";
import { SectionBar } from "@/components/SectionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DESTINATIONS, DESTINATION_NAMES } from "@/lib/fares";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main>
        <QuoteProvider locale={lang} t={t}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] lg:border-b-3 lg:border-ink">
            <div className="flex flex-col gap-3.5 px-5 pt-7 pb-6 lg:justify-between lg:gap-8 lg:px-12 lg:py-16">
              <div className="flex flex-col gap-3.5 lg:gap-6">
                <h1 className="text-display-sm leading-display font-black tracking-display text-balance wrap-break-word hyphens-auto lg:text-display-xl lg:leading-display-tight lg:tracking-display-tight">
                  {t.hero.title}
                </h1>
                <p className="text-base leading-normal text-pretty text-muted lg:max-w-135 lg:text-lead">{t.hero.sub}</p>
              </div>
              <ul aria-label={t.hero.destinationsLabel} className="hidden flex-wrap gap-2 lg:flex">
                {DESTINATIONS.map((id) => (
                  <li key={id} className="flex gap-2.5 bg-ink px-3.5 py-2.5 text-body-sm font-bold text-paper">
                    <span aria-hidden="true" className="text-sign">
                      →
                    </span>
                    {DESTINATION_NAMES[id]}
                  </li>
                ))}
              </ul>
              <div className="hidden items-center gap-6 lg:flex">
                <NameSign size="large" />
                <p className="max-w-50 text-body-sm leading-note text-muted">
                  <span aria-hidden="true">← </span>
                  {t.hero.signNote}
                </p>
              </div>
            </div>
            <QuoteForm />
          </div>

          <section id="routes" aria-labelledby="routes-title" className="scroll-mt-4">
            <SectionBar id="routes" number={1} title={t.routes.title} />
            <div className="flex flex-col gap-5 px-5 pt-4.5 pb-7 md:px-8 md:pt-10 md:pb-16 lg:px-12">
              <p className="hidden text-body-lg text-muted md:block">{t.routes.note}</p>
              <div className="hidden md:block">
                <RouteMatrix />
              </div>
              <div className="md:hidden">
                <RouteBoard />
              </div>
            </div>
          </section>
        </QuoteProvider>

        <Fleet t={t} />
        <Faq t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
