import type { PricingPlan } from "./types";

/**
 * Plan scope only. Prices stay `null` until the owner confirms guaraní figures
 * (plan.md §1.10 / §7) — the card then renders "Cotización en 48 h" instead of
 * a number. Never USD, never a placeholder amount.
 *
 * Feature copy is finalised in phase B2; this seed keeps /precios/ renderable
 * and typed from A1 onward.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "emprendedor",
    name: "Emprendedor",
    audience: "Unipersonales y empresas que recién arrancan.",
    monthlyFromPyg: null,
    features: [],
    highlighted: false,
    cta: {
      label: "Cotización en 48 h",
      whatsappText:
        "Hola, quisiera una cotización del plan Emprendedor para mi empresa.",
    },
  },
  {
    id: "pyme",
    name: "Pyme",
    audience: "Empresas con personal en planilla y movimiento mensual.",
    monthlyFromPyg: null,
    features: [],
    highlighted: true,
    cta: {
      label: "Cotización en 48 h",
      whatsappText: "Hola, quisiera una cotización del plan Pyme para mi empresa.",
    },
  },
  {
    id: "empresa",
    name: "Empresa",
    audience: "Empresas con auditoría, varios puntos de expedición o importación.",
    monthlyFromPyg: null,
    features: [],
    highlighted: false,
    cta: {
      label: "Cotización en 48 h",
      whatsappText:
        "Hola, quisiera una cotización del plan Empresa para mi compañía.",
    },
  },
];
