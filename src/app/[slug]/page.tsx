import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, SectionHeader } from "@/components/ui/Section";
import { clusterById, getService, services } from "@/content/services";
import { ui } from "@/content/ui";
import type { Service } from "@/content/types";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, type Crumb } from "@/lib/jsonld";
import { fallbackServiceMeta, pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * One dynamic route serves all 14 service pages, including the flat legacy
 * slugs (`/auditoria-auditoria-forense/`) that must not change (scan §6.11).
 *
 * A1 ships the template with the content model wired up; phase B1 fills
 * `services.ts` and the pages fill out automatically. Until a page has copy it
 * is marked `noindex` — thin pages should never reach the index.
 */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

function crumbsFor(service: Service): Crumb[] {
  const cluster = clusterById[service.cluster];
  const crumbs: Crumb[] = [
    { name: ui.nav.home, path: "/" },
    { name: ui.nav.services, path: "/servicios/" },
    { name: cluster.shortTitle, path: "/servicios/" },
  ];

  if (service.parent) {
    const parent = getService(service.parent);
    if (parent) crumbs.push({ name: parent.title, path: parent.path });
  }

  crumbs.push({ name: service.title, path: service.path });
  return crumbs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const fallback = fallbackServiceMeta(service.title);
  const hasCopy = service.hero !== null;

  return pageMetadata({
    title: service.seoTitle || fallback.seoTitle,
    description: service.metaDescription || fallback.metaDescription,
    path: service.path,
    noIndex: !hasCopy,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cluster = clusterById[service.cluster];
  const crumbs = crumbsFor(service);
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((entry): entry is Service => entry !== undefined);
  const wa = whatsappHref(service.cta?.whatsappText);

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={service.hero?.eyebrow ?? cluster.shortTitle}
        title={service.hero?.h1 ?? service.title}
        lead={service.hero?.lead}
      >
        {service.hero?.h2 ? (
          <p className="m-0 max-w-[620px] font-display text-card font-semibold text-white">
            {service.hero.h2}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href="/contacto/" variant="primary">
            {service.cta?.label ?? ui.cta.quote}
          </ButtonLink>
          {wa ? (
            <ButtonLink
              href={wa}
              variant="secondary"
              onDark
              target="_blank"
              rel="noopener"
              data-analytics="whatsapp_click"
              data-analytics-location="service-hero"
            >
              {ui.cta.whatsapp}
            </ButtonLink>
          ) : null}
        </div>
      </PageHeader>

      {service.includes.length > 0 ? (
        <Section tone="surface">
          <SectionHeader title={ui.sections.includesTitle} align="stacked" />
          <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-card border border-line bg-white p-4 text-[15px]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-amber"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {service.sections.length > 0 ? (
        <Section tone="white">
          <div className="flex max-w-[760px] flex-col gap-12">
            {service.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <h2 className="m-0 text-[28px] font-extrabold tracking-[-0.02em] lg:text-display-sm">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="m-0 text-base leading-[1.65] text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-base leading-[1.6] text-muted">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {service.benefits.length > 0 ? (
        <Section tone="surface">
          <SectionHeader title={ui.sections.benefitsTitle} align="stacked" />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit) => (
              <Card key={benefit.title} as="article" className="flex flex-col gap-3">
                <h3 className="m-0 font-display text-card font-semibold">
                  {benefit.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.55] text-muted">
                  {benefit.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {service.faq.length > 0 ? (
        <Section tone="white">
          <SectionHeader title={ui.sections.faqTitle} align="stacked" />
          <div className="mt-8 max-w-[840px]">
            <FaqAccordion items={service.faq} />
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="surface">
          <SectionHeader title={ui.sections.relatedTitle} align="stacked" />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((entry) => (
              <Card key={entry.slug} as="article" className="flex flex-col gap-3">
                <h3 className="m-0 font-display text-card font-semibold">
                  <Link href={entry.path} className="text-ink no-underline hover:underline">
                    {entry.title}
                  </Link>
                </h3>
                {entry.summary ? (
                  <p className="m-0 text-[15px] leading-[1.55] text-muted">
                    {entry.summary}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <ContactBand
        source={`service:${service.slug}`}
        title={`¿Hablamos de ${service.title.toLowerCase()}?`}
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(service.faq)} />
      {service.hero ? (
        <JsonLd
          data={serviceJsonLd({
            name: service.title,
            description: service.metaDescription,
            path: service.path,
          })}
        />
      ) : null}
    </>
  );
}
