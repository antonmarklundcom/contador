import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { staticPageBySlug } from "@/content/pages";
import { ui } from "@/content/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/** Route and metadata land in A1; the page copy is written in phase B2. */
const page = staticPageBySlug.get("contacto")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Solicitar consulta"
        title="Hablemos de su empresa en 30 minutos"
        lead="Sin costo y sin compromiso. Le respondemos en menos de 24 horas hábiles con una propuesta concreta."
      />
      <ContactBand source="contacto" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
