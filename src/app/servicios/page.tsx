import Link from "next/link";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, SectionHeader } from "@/components/ui/Section";
import { staticPageBySlug } from "@/content/pages";
import { clusters, servicesInCluster } from "@/content/services";
import { ui } from "@/content/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/**
 * Servicios hub. Keeps the three legacy clusters as section headings because
 * that grouping is the site's real IA (plan.md §1.9). Phase A2 adds the hero
 * copy, process block and CTA band per §5.2.4.
 */
const page = staticPageBySlug.get("servicios")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Servicios integrales"
        title="Servicios contables y tributarios para empresas en Paraguay"
        lead="Desde la apertura de su empresa hasta la auditoría externa obligatoria, con un contador asignado y un honorario mensual fijo."
      />

      {clusters.map((cluster, index) => (
        <Section key={cluster.id} tone={index % 2 === 0 ? "white" : "surface"}>
          <SectionHeader
            eyebrow={cluster.shortTitle}
            title={cluster.title}
            lead={cluster.lead}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicesInCluster(cluster.id).map((service) => (
              <Card key={service.slug} as="article" className="flex flex-col gap-3">
                <h3 className="m-0 font-display text-card font-semibold">
                  <Link
                    href={service.path}
                    className="text-ink no-underline hover:text-amber-text"
                  >
                    {service.title}
                  </Link>
                </h3>
                {service.summary ? (
                  <p className="m-0 text-[15px] leading-[1.55] text-muted">
                    {service.summary}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>
      ))}

      <ContactBand source="servicios" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
