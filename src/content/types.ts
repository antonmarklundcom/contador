/**
 * Content model contract (plan.md §2).
 *
 * These types are fixed in phase A1 and consumed unchanged by every later
 * phase. Later phases MAY add new optional fields; they must never rename or
 * remove an existing one.
 *
 * Identifiers are English; every string that reaches a visitor is Spanish
 * (Paraguay), formal "usted".
 */

/* ------------------------------------------------------------------ site */

/**
 * A fact about the firm. Anything not yet confirmed by the owner is `null`
 * (plan.md §1.4 / §7) — components hide or neutrally rephrase, they never
 * invent a placeholder.
 */
export interface SiteStat {
  /** Big figure, already formatted for display, e.g. "14 años". */
  value: string;
  /** Short label under the figure. */
  label: string;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  /** Business + city, e.g. "Ferretería Villalba, Fernando de la Mora". */
  authorContext: string | null;
  /** e.g. "Cliente desde 2021 · 6 empleados". */
  authorDetail: string | null;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Matrícula / credential line, e.g. "CPA UNA · Mat. 0.000". */
  credential: string | null;
  photo: string | null;
}

export interface SiteAddress {
  street: string;
  city: string;
  /** ISO 3166-2 style region label used in JSON-LD, e.g. "Asunción". */
  region: string;
  country: string;
  postalCode: string | null;
  /** Google Maps embed URL — only rendered when the address is confirmed. */
  mapEmbedUrl: string | null;
}

export interface SiteSocials {
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
}

export interface Site {
  /** Brand wordmark, e.g. "contador.com.py". */
  name: string;
  /** Legal name for JSON-LD; falls back to `name` when null. */
  legalName: string | null;
  /** Canonical origin, no trailing slash. Overridden by NEXT_PUBLIC_SITE_URL. */
  url: string;
  /** Display phone, e.g. "+595 981 000 000". */
  phone: string | null;
  /** Digits only, international, no "+", e.g. "595981000000". */
  whatsapp: string | null;
  email: string | null;
  address: SiteAddress | null;
  /** Opening hours for humans, e.g. "Lun–Vie 8:00–17:30". */
  hours: string | null;
  /** Machine-readable hours for JSON-LD, e.g. "Mo-Fr 08:00-17:30". */
  hoursSpec: string | null;
  /** Professional registration line shown in the footer. */
  matricula: string | null;
  foundedYear: number | null;
  teamSize: number | null;
  socials: SiteSocials;
  /** Hero figures. Empty until the owner confirms real numbers. */
  stats: SiteStat[];
  /** Bullet credentials for the "Quiénes somos" block. */
  credentials: string[];
  team: TeamMember[];
  /** Rendered only when non-empty (plan.md §1.4). */
  testimonials: Testimonial[];
}

/* -------------------------------------------------------------- services */

/**
 * The three legacy clusters (scan §3.1). They are the site's real information
 * architecture and drive the mega-menu, the /servicios/ hub and breadcrumbs.
 */
export type ServiceCluster =
  | "soluciones-digitales"
  | "gestion-empresarial"
  | "auditoria";

export interface ClusterMeta {
  id: ServiceCluster;
  /** Section heading on /servicios/. */
  title: string;
  /** Short label used in breadcrumbs and eyebrows. */
  shortTitle: string;
  lead: string;
}

/** A body block on a service page. Rendered in array order. */
export interface ServiceSection {
  /** H2 on the page. */
  heading: string;
  /** One or more paragraphs. */
  body: string[];
  /** Optional checklist rendered under the paragraphs. */
  bullets?: string[];
}

export interface ServiceBenefit {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceHero {
  /** Small label above the H1 — normally the cluster short title. */
  eyebrow: string;
  /** H1. Contains the legacy page title verbatim (plan.md §1.2). */
  h1: string;
  /** Descriptive headline under the H1. */
  h2: string;
  lead: string;
}

export interface ServiceCta {
  label: string;
  /** Pre-filled WhatsApp message body for this service. */
  whatsappText: string;
}

export interface Service {
  /** Flat legacy slug, no slashes, e.g. "auditoria-auditoria-forense". */
  slug: string;
  /** Legacy path with trailing slash, e.g. "/auditoria-auditoria-forense/". */
  path: string;
  /** Legacy page title / H1 label, e.g. "Auditoría Forense". */
  title: string;
  /** Label used in the mega-menu and footer. */
  navLabel: string;
  cluster: ServiceCluster;
  /** Slug of the parent service when this page is a child (auditoría silo). */
  parent?: string;
  /** Card blurb on the hub and in the mega-menu. */
  summary: string;
  /** ≤ 60 chars, keyword first, "| Contador.com.py" suffix. */
  seoTitle: string;
  /** 120–155 chars, unique per page. */
  metaDescription: string;
  hero: ServiceHero | null;
  /** "Qué incluye" checklist. */
  includes: string[];
  sections: ServiceSection[];
  benefits: ServiceBenefit[];
  faq: FaqItem[];
  cta: ServiceCta | null;
  /** Slugs of 3 sibling services. */
  related: string[];
}

/* ---------------------------------------------------------- static pages */

/** A non-service page served by the shared dynamic route. */
export interface StaticPage {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
}

/* ----------------------------------------------------------------- blog */

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-15". */
  date: string;
  tags: string[];
  /** Slugs of services the article should link to. */
  relatedServices?: string[];
  /** Minutes, computed from the MDX body. */
  readingMinutes: number;
}

/* --------------------------------------------------------------- precios */

export interface PricingPlan {
  id: string;
  name: string;
  /** Who the plan is for. */
  audience: string;
  /**
   * Monthly price in whole guaraníes (plan.md §1.10 / paraguay-business-apps
   * §1: integers only). `null` until the owner confirms prices — the card then
   * shows "Cotización en 48 h" instead.
   */
  monthlyFromPyg: number | null;
  features: string[];
  /** Marks the visually emphasised plan. */
  highlighted: boolean;
  cta: ServiceCta;
}

/* ------------------------------------------------------------------- nav */

export interface NavLink {
  label: string;
  href: string;
  /** Optional one-line description used inside the mega-menu. */
  description?: string;
}

export interface NavGroup {
  title: string;
  href?: string;
  links: NavLink[];
}

/* ------------------------------------------------------------------ lead */

/** The five chips of the "¿Qué necesita?" selector (design canvas 1b). */
export type LeadNeed =
  | "contabilidad-impuestos"
  | "abrir-empresa"
  | "nomina"
  | "sifen"
  | "cambiar-de-contador";
