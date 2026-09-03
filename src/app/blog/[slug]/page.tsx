import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { getAllPosts, getPost } from "@/content/blog";
import { ui } from "@/content/ui";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/**
 * Article template. The MDX body is imported by slug; frontmatter comes from
 * the same file via the loader in `src/content/blog/index.ts`.
 */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);

  const crumbs = [
    { name: ui.nav.home, path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: post.path },
  ];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Blog"
        title={post.title}
        lead={post.description}
      >
        <p className="m-0 text-sm text-white/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {post.readingMinutes} min de lectura
        </p>
      </PageHeader>

      <Section tone="white">
        <article className="prose-article flex max-w-[760px] flex-col gap-5 text-base leading-[1.7] text-muted [&_a]:text-amber-text [&_h2]:m-0 [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-[28px] [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h3]:m-0 [&_h3]:pt-2 [&_h3]:font-display [&_h3]:text-card [&_h3]:font-semibold [&_h3]:text-ink [&_li]:leading-[1.7] [&_ol]:m-0 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_p]:m-0 [&_strong]:text-ink [&_table]:w-full [&_table]:text-[15px] [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
          <Body />
        </article>
      </Section>

      <ContactBand source={`blog:${post.slug}`} />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: post.path,
          datePublished: post.date,
        })}
      />
    </>
  );
}
