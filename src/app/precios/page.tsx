import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { staticPageBySlug } from "@/content/pages";
import { pricingPlans } from "@/content/precios";
import { ui } from "@/content/ui";
import { formatGuaranies } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/**
 * Precios. Prices render only when `monthlyFromPyg` is set (plan.md §1.10) —
 * otherwise the card shows "Cotización en 48 h" and no number. Never USD,
 * never a placeholder amount. Plan copy is finalised in phase B2.
 */
const page = staticPageBySlug.get("precios")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function PreciosPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Precios"
        title="Un honorario mensual fijo, acordado antes de empezar"
        lead="Elegimos el plan según su rubro, su volumen de comprobantes y la cantidad de personas en planilla. Le enviamos la propuesta en 48 horas hábiles."
      />

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              as="article"
              tone={plan.highlighted ? "ink" : "light"}
              className="flex flex-col gap-4"
            >
              <h2 className="m-0 font-display text-card font-semibold">{plan.name}</h2>
              <p
                className={`m-0 text-[15px] leading-[1.55] ${
                  plan.highlighted ? "text-white/70" : "text-muted"
                }`}
              >
                {plan.audience}
              </p>

              <p className="m-0 font-display text-display-sm font-extrabold">
                {plan.monthlyFromPyg === null ? (
                  <span className="text-base font-semibold">{ui.cta.quoteIn48h}</span>
                ) : (
                  <>
                    desde {formatGuaranies(plan.monthlyFromPyg)}
                    <span className="text-base font-medium"> /mes</span>
                  </>
                )}
              </p>

              {plan.features.length > 0 ? (
                <ul
                  className={`m-0 flex list-none flex-col gap-2 p-0 text-[15px] ${
                    plan.highlighted ? "text-white/80" : "text-muted"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="text-amber">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              <ButtonLink
                href="/contacto/"
                variant="primary"
                size="sm"
                className="mt-auto self-start"
              >
                {plan.cta.label}
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>

      <ContactBand source="precios" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
