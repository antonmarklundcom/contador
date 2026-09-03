import Link from "next/link";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/content/blog";
import { staticPageBySlug } from "@/content/pages";
import { ui } from "@/content/ui";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/**
 * Blog index. A1 ships the plumbing with zero articles — the five launch
 * articles are written in phase B2 as MDX under `src/content/blog/`.
 */
const page = staticPageBySlug.get("blog")!;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.metaDescription,
  path: page.path,
});

const crumbs = [
  { name: ui.nav.home, path: "/" },
  { name: page.title, path: page.path },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Blog"
        title="Guías prácticas de impuestos, nómina y facturación electrónica"
        lead="Escritas por contadores matriculados, con los formularios, los plazos y los pasos concretos ante la DNIT y el IPS."
      />

      <Section tone="surface">
        {posts.length === 0 ? (
          <p className="m-0 max-w-[560px] text-base leading-[1.6] text-muted">
            Estamos preparando las primeras guías. Mientras tanto, escríbanos su
            consulta y le respondemos por WhatsApp.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} as="article" className="flex flex-col gap-3">
                <p className="m-0 text-[13px] text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                  {post.readingMinutes} min
                </p>
                <h2 className="m-0 font-display text-card font-semibold">
                  <Link
                    href={post.path}
                    className="text-ink no-underline hover:text-amber-text"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="m-0 text-[15px] leading-[1.55] text-muted">
                  {post.description}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <ContactBand source="blog" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
