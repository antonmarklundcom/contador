import type { ClusterMeta, Service, ServiceCluster } from "./types";

/**
 * The three legacy clusters (scan §3.1, plan.md §1.9). This grouping is the
 * site's existing information architecture — keep it.
 */
export const clusters: ClusterMeta[] = [
  {
    id: "soluciones-digitales",
    title: "Soluciones digitales de cumplimiento",
    shortTitle: "Soluciones digitales",
    lead: "Facturación electrónica, gestión en Marangatu e inscripción de RUC ante la DNIT.",
  },
  {
    id: "gestion-empresarial",
    title: "Servicios de gestión empresarial",
    shortTitle: "Gestión empresarial",
    lead: "Contabilidad mensual, impuestos, nómina y apertura de empresas para pymes.",
  },
  {
    id: "auditoria",
    title: "Auditoría",
    shortTitle: "Auditoría",
    lead: "Auditoría externa obligatoria, auditoría interna y peritajes forenses.",
  },
];

export const clusterById: Record<ServiceCluster, ClusterMeta> = Object.fromEntries(
  clusters.map((c) => [c.id, c]),
) as Record<ServiceCluster, ClusterMeta>;

/**
 * A1 seeds identity only — slug, path, title, navLabel, cluster, parent
 * (plan.md §5.1.4). Every copy field is intentionally empty; phase B1 fills
 * them. Do not write service copy here outside B1.
 *
 * The 12 legacy paths are reproduced verbatim from scan §2, including the
 * awkward flat `auditoria-auditoria-*` slugs, which must not change.
 */
export const services: Service[] = [
  /* ---------------------------- soluciones digitales de cumplimiento --- */
  {
    slug: "ekuatia",
    path: "/ekuatia/",
    title: "Ekuatia",
    navLabel: "Ekuatia",
    cluster: "soluciones-digitales",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "marangatu",
    path: "/marangatu/",
    title: "Marangatu",
    navLabel: "Marangatu",
    cluster: "soluciones-digitales",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "ruc",
    path: "/ruc/",
    title: "RUC",
    navLabel: "RUC",
    cluster: "soluciones-digitales",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },

  /* ------------------------------- servicios de gestión empresarial ---- */
  {
    // New page (plan.md §6.1.3) — no legacy URL, so no redirect to preserve.
    slug: "contabilidad",
    path: "/contabilidad/",
    title: "Contabilidad mensual",
    navLabel: "Contabilidad mensual",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "eas",
    path: "/eas/",
    title: "EAS",
    navLabel: "EAS",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "ire-simple",
    path: "/ire-simple/",
    title: "IRE-simple",
    navLabel: "IRE-simple",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    // New page (plan.md §6.1.3b).
    slug: "irp",
    path: "/irp/",
    title: "IRP",
    navLabel: "IRP",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "iva",
    path: "/iva/",
    title: "IVA",
    navLabel: "IVA",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "ips",
    path: "/ips/",
    title: "IPS",
    navLabel: "IPS",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "asesoria",
    path: "/asesoria/",
    title: "Asesoría",
    navLabel: "Asesoría",
    cluster: "gestion-empresarial",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },

  /* ----------------------------------------------- silo de auditoría --- */
  {
    slug: "auditoria",
    path: "/auditoria/",
    title: "Auditoría",
    navLabel: "Auditoría",
    cluster: "auditoria",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "auditoria-auditoria-impositiva",
    path: "/auditoria-auditoria-impositiva/",
    title: "Auditoria Impositiva",
    navLabel: "Auditoria Impositiva",
    cluster: "auditoria",
    parent: "auditoria",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "auditoria-auditoria-interna",
    path: "/auditoria-auditoria-interna/",
    title: "Auditoría Interna",
    navLabel: "Auditoría Interna",
    cluster: "auditoria",
    parent: "auditoria",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
  {
    slug: "auditoria-auditoria-forense",
    path: "/auditoria-auditoria-forense/",
    title: "Auditoría Forense",
    navLabel: "Auditoría Forense",
    cluster: "auditoria",
    parent: "auditoria",
    summary: "",
    seoTitle: "",
    metaDescription: "",
    hero: null,
    includes: [],
    sections: [],
    benefits: [],
    faq: [],
    cta: null,
    related: [],
  },
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug);
}

export function servicesInCluster(cluster: ServiceCluster): Service[] {
  return services.filter((s) => s.cluster === cluster);
}

/** Children of a service in the auditoría silo. */
export function childServices(slug: string): Service[] {
  return services.filter((s) => s.parent === slug);
}
