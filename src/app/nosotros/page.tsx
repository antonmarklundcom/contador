import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { staticPageBySlug } from "@/content/pages";
import { ui } from "@/content/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/** Route and metadata land in A1; the page copy is written in phase B2. */
const page = staticPageBySlug.get("nosotros")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Quiénes somos"
        title="Contadores públicos matriculados que responden con nombre y apellido"
        lead="Un equipo con experiencia en comercio, servicios, construcción e importación, y un contador asignado para su empresa."
      />
      <ContactBand source="nosotros" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
