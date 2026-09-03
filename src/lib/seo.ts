import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * SEO infrastructure (plan.md §5.1.7). One helper builds every page's
 * metadata so the title template, canonical and OG defaults can never drift
 * between pages.
 */

/** Canonical origin. Env wins so staging never canonicalises to production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? site.url
).replace(/\/$/, "");

export const TITLE_SUFFIX = "Contador.com.py";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface PageMetaInput {
  /** Full <title> without the suffix. The suffix is appended when missing. */
  title: string;
  description: string;
  /** Site-relative path with trailing slash, e.g. "/iva/". */
  path: string;
  /** Defaults to the site OG image route. */
  ogImage?: string;
  /** Set on pages that must not be indexed. */
  noIndex?: boolean;
  /** "article" for blog posts. */
  type?: "website" | "article";
  publishedTime?: string;
}

function withSuffix(title: string): string {
  return title.includes(TITLE_SUFFIX) ? title : `${title} | ${TITLE_SUFFIX}`;
}

export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/opengraph-image",
  noIndex = false,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = withSuffix(title);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "es_PY",
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630 }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

/**
 * Fallback metadata for a page whose copy has not been written yet (services
 * are seeded empty in A1 and filled in B1). Keeps every URL indexable and
 * unique instead of shipping a duplicated default.
 */
export function fallbackServiceMeta(title: string): {
  seoTitle: string;
  metaDescription: string;
} {
  return {
    seoTitle: `${title} | ${TITLE_SUFFIX}`,
    metaDescription: `${title}: servicio contable y tributario para empresas en Paraguay. Contadores matriculados, honorario mensual fijo y respuesta en menos de 24 horas hábiles.`,
  };
}
