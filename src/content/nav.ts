import { clusters, services, servicesInCluster } from "./services";
import { staticPageBySlug } from "./pages";
import { site } from "./site";
import type { NavGroup, NavLink } from "./types";

/** The services mega-menu: one column per legacy cluster (plan.md §5.1.3). */
export const servicesMenu: NavGroup[] = clusters.map((cluster) => ({
  title: cluster.title,
  href: "/servicios/",
  links: servicesInCluster(cluster.id).map((service) => ({
    label: service.navLabel,
    href: service.path,
  })),
}));

export const headerLinks: NavLink[] = [
  { label: "Servicios", href: "/servicios/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Precios", href: "/precios/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contacto", href: "/contacto/" },
];

/** Footer column 2 — all 14 services, in cluster order. */
export const footerServiceLinks: NavLink[] = services.map((service) => ({
  label: service.navLabel,
  href: service.path,
}));

/** Footer column 3 — the firm. */
export const footerFirmLinks: NavLink[] = [
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Servicios", href: "/servicios/" },
  { label: "Precios", href: "/precios/" },
  { label: "Herramientas", href: "/herramientas/" },
  { label: "Blog", href: "/blog/" },
];

/** Footer legal links. */
export const footerLegalLinks: NavLink[] = [
  { label: "Política de privacidad", href: "/privacidad/" },
  { label: "Términos de servicio", href: "/terminos/" },
];

/** Social links render only when a URL is actually set (plan.md §6.2.7). */
export function socialLinks(): NavLink[] {
  const entries: Array<[string, string | null]> = [
    ["Facebook", site.socials.facebook],
    ["Instagram", site.socials.instagram],
    ["LinkedIn", site.socials.linkedin],
    ["YouTube", site.socials.youtube],
  ];
  return entries
    .filter((entry): entry is [string, string] => entry[1] !== null)
    .map(([label, href]) => ({ label, href }));
}

/** Helper for 404 / 410 pages: the handful of paths people actually want. */
export const rescueLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: staticPageBySlug.get("servicios")!.title, href: "/servicios/" },
  { label: staticPageBySlug.get("contacto")!.title, href: "/contacto/" },
  { label: staticPageBySlug.get("blog")!.title, href: "/blog/" },
];
