import Link from "next/link";
import { ContactBand } from "@/components/ContactBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardNumber } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Section, SectionHeader } from "@/components/ui/Section";
import { StatRow } from "@/components/ui/Stat";
import { StatusPanel } from "@/components/ui/StatusPanel";
import { clusters, servicesInCluster } from "@/content/services";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Homepage — foundation pass.
 *
 * Phase A1 ships the 1b shell (ink hero, status panel, cluster grid, contact
 * split) so the design tokens are proven end to end. Phase A2 ports the full
 * 1b section order and writes the real copy (plan.md §5.2).
 */
export const metadata = pageMetadata({
  title: "Contador en Asunción | Estudio contable para pymes",
  description:
    "Contadores matriculados que llevan su contabilidad, presentan IVA e IRE, liquidan la nómina y lo dejan habilitado en SIFEN. Honorario mensual fijo.",
  path: "/",
});

export default function HomePage() {
  const wa = whatsappHref();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,182,43,.22), rgba(242,182,43,0) 70%)",
          }}
        />
        <div className="container-site relative grid grid-cols-1 items-end gap-12 pt-16 lg:grid-cols-2 lg:gap-14 lg:pt-20">
          <div className="flex flex-col gap-6 pb-12 lg:pb-20">
            <Pill>Contadores públicos matriculados en Asunción</Pill>
            <h1 className="m-0 text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[52px] lg:text-display-xl">
              Deje los impuestos y la contabilidad a un equipo que{" "}
              <span className="text-amber">nunca llega tarde.</span>
            </h1>
            <p className="m-0 max-w-[520px] text-lg leading-[1.55] text-white/72">
              Llevamos sus libros, presentamos IVA e IRE, liquidamos la nómina y lo
              dejamos habilitado en SIFEN. Honorario mensual fijo y un solo contacto.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contacto/" variant="primary" size="lg">
                {ui.cta.freeConsult}
              </ButtonLink>
              <ButtonLink href="/servicios/" variant="secondary" size="lg" onDark>
                {ui.cta.seeIncluded}
              </ButtonLink>
            </div>
            <StatRow stats={site.stats} />
          </div>

          <div className="self-end lg:pl-6">
            <StatusPanel />
          </div>
        </div>
      </section>

      <Section tone="surface">
        <SectionHeader
          eyebrow={ui.sections.servicesEyebrow}
          title="Un solo equipo responsable de todo su cumplimiento."
          lead="Contrate lo que necesita hoy y sume servicios cuando su empresa crezca. Todo bajo el mismo honorario mensual."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster, index) => (
            <Card key={cluster.id} as="article" className="flex flex-col gap-3.5">
              <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
              <h3 className="m-0 font-display text-card font-semibold">
                {cluster.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">{cluster.lead}</p>
              <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1.5 p-0 text-[15px]">
                {servicesInCluster(cluster.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.path}
                      className="text-amber-text no-underline hover:underline"
                    >
                      {service.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          <Card tone="ink" className="flex flex-col justify-between gap-3.5">
            <h3 className="m-0 font-display text-card font-semibold">
              ¿No sabe qué necesita?
            </h3>
            <p className="m-0 text-[15px] leading-[1.55] text-white/70">
              Cuéntenos su situación y le decimos qué corresponde, sin costo.
            </p>
            {wa ? (
              <ButtonLink
                href={wa}
                variant="primary"
                size="sm"
                target="_blank"
                rel="noopener"
                className="self-start"
                data-analytics="whatsapp_click"
                data-analytics-location="home-services"
              >
                {ui.cta.talkToAccountant}
              </ButtonLink>
            ) : (
              <ButtonLink
                href="/contacto/"
                variant="primary"
                size="sm"
                className="self-start"
              >
                {ui.cta.talkToAccountant}
              </ButtonLink>
            )}
          </Card>
        </div>
      </Section>

      <ContactBand source="home" />
    </>
  );
}
