import { site } from "@/content/site";
import type { FaqItem } from "@/content/types";
import { absoluteUrl, siteUrl } from "./seo";

/**
 * JSON-LD builders (plan.md §5.1.7). Every value comes from `site.ts`; a field
 * the owner has not confirmed is simply omitted rather than invented.
 */

type JsonLd = Record<string, unknown>;

function compact(object: JsonLd): JsonLd {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && value !== null),
  );
}

function postalAddress(): JsonLd | undefined {
  if (!site.address) return undefined;
  return compact({
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "PY",
  });
}

/** AccountingService + LocalBusiness, emitted once from the root layout. */
export function organizationJsonLd(): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": ["AccountingService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: site.legalName ?? site.name,
    alternateName: site.legalName ? site.name : undefined,
    url: siteUrl,
    description:
      "Estudio contable en Asunción: contabilidad mensual, impuestos, nómina, apertura de empresas, facturación electrónica y auditoría para pymes de Paraguay.",
    telephone: site.phone ?? undefined,
    email: site.email ?? undefined,
    address: postalAddress(),
    areaServed: { "@type": "Country", name: "Paraguay" },
    openingHours: site.hoursSpec ?? undefined,
    foundingDate: site.foundedYear ? String(site.foundedYear) : undefined,
    priceRange: undefined,
    sameAs: Object.values(site.socials).filter((value): value is string => value !== null),
    image: absoluteUrl("/opengraph-image"),
  });
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]): JsonLd | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}

export function articleJsonLd(input: ArticleJsonLdInput): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Organization", name: site.legalName ?? site.name, url: siteUrl },
    publisher: { "@type": "Organization", name: site.legalName ?? site.name, url: siteUrl },
    image: absoluteUrl("/opengraph-image"),
  });
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "Paraguay" },
    url: absoluteUrl(input.path),
  };
}
