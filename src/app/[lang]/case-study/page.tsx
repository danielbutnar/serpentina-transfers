import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import bookingShot from "@/assets/case-study/booking-phone.jpg";
import dashboardShot from "@/assets/case-study/dashboard-desktop.jpg";
import homeShot from "@/assets/case-study/home-desktop.jpg";
import { SectionBar } from "@/components/SectionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryButton, secondaryButton } from "@/components/ui/Field";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/case-study">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getDictionary(lang).caseStudy;
  return { title: c.metaTitle, description: c.metaDescription };
}

function Shot({ src, alt, caption, eager = false }: { src: typeof homeShot; alt: string; caption: string; eager?: boolean }) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        placeholder="empty"
        loading={eager ? "eager" : "lazy"}
        className="h-auto w-full border-3 border-ink"
        sizes="(min-width: 1024px) 60vw, 100vw"
      />
      <figcaption className="text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/case-study">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = t.caseStudy;

  return (
    <>
      <SiteHeader locale={lang} t={t} />
      <main id="booking" tabIndex={-1}>
        <div className="flex flex-col gap-5 border-b-3 border-ink px-5 pt-7 pb-8 lg:px-12 lg:pt-12 lg:pb-12">
          <p className="label-mono">{c.eyebrow}</p>
          <h1 className="max-w-250 text-display-sm leading-display font-black tracking-display wrap-break-word hyphens-auto lg:text-display">{c.title}</h1>
          <p className="max-w-170 text-lg text-muted lg:text-xl">{c.lead}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link href={`/${lang}/book/`} className={primaryButton}>
              <span>{c.tryBooking}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={`/${lang}/admin/`} className={secondaryButton}>
              {c.openDashboard}
            </Link>
          </div>
        </div>

        <section aria-labelledby="brief-title">
          <SectionBar id="brief" number={1} title={c.briefTitle} />
          <div className="grid gap-8 px-5 py-8 lg:grid-cols-panel lg:px-12 lg:py-12">
            <div className="flex flex-col gap-6">
              <p className="max-w-170 text-lg">{c.brief}</p>
              <h3 className="text-title-sm font-black">{c.doesTitle}</h3>
              <ul className="flex max-w-170 flex-col border-t-2 border-ink">
                {c.does.map((line) => (
                  <li key={line} className="flex gap-3 border-b border-ink py-3">
                    <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 bg-sign outline outline-ink" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Shot src={bookingShot} alt={c.shots.booking} caption={c.shots.booking} eager />
          </div>
        </section>

        <section aria-labelledby="design-title">
          <SectionBar id="design" number={2} title={c.designTitle} />
          <div className="flex flex-col gap-6 px-5 py-8 lg:px-12 lg:py-12">
            <p className="max-w-170 text-lg">{c.design}</p>
            <Shot src={homeShot} alt={c.shots.home} caption={c.shots.home} />
          </div>
        </section>

        <section aria-labelledby="quality-title">
          <SectionBar id="quality" number={3} title={`${c.a11yTitle} · ${c.speedTitle}`} />
          <div className="grid gap-8 px-5 py-8 md:grid-cols-2 lg:px-12 lg:py-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-title-sm font-black">{c.a11yTitle}</h3>
              <p className="text-lg">{c.a11y}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-title-sm font-black">{c.speedTitle}</h3>
              <p className="text-lg">{c.speed}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="built-title">
          <SectionBar id="built" number={4} title={c.builtTitle} />
          <div className="flex flex-col gap-8 px-5 py-8 lg:px-12 lg:py-12">
            <Shot src={dashboardShot} alt={c.shots.dashboard} caption={c.shots.dashboard} />
            <div className="grid gap-8 md:grid-cols-2">
              <ul className="flex flex-col border-t-2 border-ink">
                {c.built.map((line) => (
                  <li key={line} className="border-b border-ink py-3 font-semibold">
                    {line}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 border-3 border-ink bg-sign p-5">
                <h3 className="text-title-sm font-black">{c.demoTitle}</h3>
                <p>{c.demo}</p>
              </div>
            </div>
            <p className="font-mono text-sm font-bold">{c.credit}</p>
          </div>
        </section>
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
