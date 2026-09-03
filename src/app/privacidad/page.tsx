import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { staticPageBySlug } from "@/content/pages";
import { ui } from "@/content/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/** Route and metadata land in A1; the page copy is written in phase B2. */
const page = staticPageBySlug.get("privacidad")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Legal"
        title="Política de privacidad"
        lead="Cómo tratamos sus datos personales y las credenciales tributarias que nos confía."
      />
      <ContactBand source="privacidad" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
