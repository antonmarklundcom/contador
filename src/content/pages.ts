import type { StaticPage } from "./types";

/**
 * Non-service pages that have their own route file. Listed here so the SEO
 * helpers, the sitemap and the route smoke test all read from one place.
 *
 * Copy for these pages is written in phase B2; A1 only fixes the paths and
 * baseline metadata so every legacy URL answers 200 from day one.
 */
export const staticPages: StaticPage[] = [
  {
    slug: "servicios",
    path: "/servicios/",
    title: "Servicios",
    seoTitle: "Servicios contables en Paraguay | Contador.com.py",
    metaDescription:
      "Contabilidad mensual, impuestos, nómina, apertura de empresas, facturación electrónica y auditoría para pymes en Paraguay. Honorario mensual fijo.",
  },
  {
    slug: "nosotros",
    path: "/nosotros/",
    title: "Nosotros",
    seoTitle: "Nosotros | Estudio contable en Asunción | Contador.com.py",
    metaDescription:
      "Contadores públicos matriculados en Asunción. Conozca cómo trabajamos, qué incluye el servicio mensual y con quién va a hablar cada mes.",
  },
  {
    slug: "precios",
    path: "/precios/",
    title: "Precios",
    seoTitle: "Precios de servicios contables | Contador.com.py",
    metaDescription:
      "Planes contables para emprendedores, pymes y empresas: alcance de cada plan y cotización con honorario mensual fijo en 48 horas hábiles.",
  },
  {
    slug: "contacto",
    path: "/contacto/",
    title: "Contacto",
    seoTitle: "Contacto | Estudio contable en Asunción | Contador.com.py",
    metaDescription:
      "Escríbanos por WhatsApp o deje su consulta en el formulario. Le respondemos en menos de 24 horas hábiles con una propuesta concreta.",
  },
  {
    slug: "blog",
    path: "/blog/",
    title: "Blog",
    seoTitle: "Blog contable y tributario en Paraguay | Contador.com.py",
    metaDescription:
      "Guías prácticas sobre impuestos, nómina y facturación electrónica en Paraguay, escritas por contadores matriculados y actualizadas cada mes.",
  },
  {
    slug: "herramientas",
    path: "/herramientas/",
    title: "Herramientas",
    seoTitle: "Calculadoras contables y laborales | Contador.com.py",
    metaDescription:
      "Calculadoras gratuitas de aguinaldo, liquidación de salario e IVA, y calendario de vencimientos de la DNIT según la terminación de su RUC.",
  },
  {
    slug: "privacidad",
    path: "/privacidad/",
    title: "Política de privacidad",
    seoTitle: "Política de privacidad | Contador.com.py",
    metaDescription:
      "Cómo tratamos los datos personales y las credenciales tributarias que nos confía, y cómo puede solicitar su corrección o eliminación.",
  },
  {
    slug: "terminos",
    path: "/terminos/",
    title: "Términos de servicio",
    seoTitle: "Términos de servicio | Contador.com.py",
    metaDescription:
      "Condiciones de uso del sitio y del servicio contable: alcance, responsabilidades, confidencialidad y forma de contratación.",
  },
];

export const staticPageBySlug = new Map(staticPages.map((p) => [p.slug, p]));
