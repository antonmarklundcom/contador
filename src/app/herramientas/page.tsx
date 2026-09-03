import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { staticPageBySlug } from "@/content/pages";
import { ui } from "@/content/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/** Route and metadata land in A1; the page copy is written in phase B3. */
const page = staticPageBySlug.get("herramientas")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function HerramientasPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Herramientas"
        title="Calculadoras y calendarios para su empresa"
        lead="Aguinaldo, liquidación de salario, IVA y vencimientos de la DNIT según la terminación de su RUC."
      />
      <ContactBand source="herramientas" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
