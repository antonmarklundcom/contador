import type { Site } from "./types";

/**
 * Every fact about the firm lives here (plan.md §1.4). Anything the owner has
 * not confirmed yet (plan.md §7) stays `null` or empty — components hide the
 * block or use neutral phrasing. Never write a placeholder number here.
 */
export const site: Site = {
  name: "contador.com.py",
  legalName: null,
  url: "https://contador.com.py",

  // §7 pending: real phone / WhatsApp / email / address / hours.
  // Env overrides let Anton switch the conversion path on without a code
  // change; until one is set the components hide the row (plan.md §1.4).
  phone: process.env.NEXT_PUBLIC_PHONE ?? null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null,
  email: process.env.NEXT_PUBLIC_EMAIL ?? null,
  address: null,
  hours: null,
  hoursSpec: null,

  matricula: null,
  foundedYear: null,
  teamSize: null,

  socials: {
    facebook: null,
    instagram: null,
    linkedin: null,
    youtube: null,
  },

  // §7 pending: real client counts / on-time percentages.
  stats: [],

  // Neutral, verifiable positioning only — no numbers, no names.
  credentials: [
    "Contadores públicos matriculados",
    "Atención directa por WhatsApp con un contador asignado",
    "Presentaciones ante la DNIT e IPS dentro de plazo",
    "Experiencia en comercio, servicios, construcción e importación",
  ],

  team: [],
  testimonials: [],
};

/** True when the firm has a WhatsApp number configured. */
export const hasWhatsApp = site.whatsapp !== null;
