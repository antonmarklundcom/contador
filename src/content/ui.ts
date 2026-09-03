/**
 * Every user-facing string that is not page content lives here — the
 * single-locale i18n layer (plan.md §2). Adding a second language means
 * adding a file, not refactoring components.
 *
 * Spanish (Paraguay), formal "usted" (plan.md §1.3).
 */
export const ui = {
  brand: {
    wordmark: "contador.com.py",
    tagline:
      "Despacho contable en Asunción. Contabilidad, impuestos, nómina, apertura de empresas y facturación electrónica para pymes de todo el país.",
  },

  nav: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    services: "Servicios",
    allServices: "Ver todos los servicios",
    primary: "Navegación principal",
    breadcrumb: "Ruta de navegación",
    home: "Inicio",
  },

  cta: {
    whatsapp: "Escribir por WhatsApp",
    whatsappShort: "WhatsApp",
    quote: "Pedir cotización",
    freeConsult: "Solicitar consulta gratis",
    seeIncluded: "Ver qué incluye",
    talkToAccountant: "Hablar con un contador",
    quoteIn48h: "Cotización en 48 h",
    callUs: "Llamar",
    email: "Escribir por correo",
  },

  form: {
    eyebrow: "Solicitar consulta",
    title: "Empecemos con una conversación de 30 minutos.",
    lead: "Sin costo, sin compromiso. Le respondemos en menos de 24 horas hábiles con una propuesta concreta.",
    name: "Nombre",
    namePlaceholder: "Nombre y apellido",
    company: "Empresa o rubro",
    companyPlaceholder: "Empresa o rubro",
    phone: "WhatsApp",
    phonePlaceholder: "0981 123 456",
    email: "Correo electrónico",
    emailPlaceholder: "correo@empresa.com.py",
    emailOptional: "opcional",
    needLabel: "¿Qué necesita?",
    message: "Mensaje",
    messagePlaceholder:
      "Cuéntenos brevemente: rubro, empleados, facturación aproximada…",
    submit: "Solicitar consulta gratis",
    submitting: "Enviando…",
    successTitle: "Recibimos su consulta.",
    successBody:
      "Le respondemos en menos de 24 horas hábiles. Si prefiere una respuesta más rápida, escríbanos por WhatsApp.",
    errorRequiredPhone: "Ingrese un número de WhatsApp o teléfono.",
    errorRequiredName: "Ingrese su nombre.",
    errorGeneric:
      "No pudimos enviar el formulario. Vuelva a intentarlo o escríbanos por WhatsApp.",
    privacyNote: "Sus datos se usan solo para responder esta consulta.",
  },

  /** The five chips of the "¿Qué necesita?" selector (design canvas 1b). */
  needs: [
    { id: "contabilidad-impuestos", label: "Contabilidad e impuestos" },
    { id: "abrir-empresa", label: "Abrir empresa" },
    { id: "nomina", label: "Nómina" },
    { id: "sifen", label: "SIFEN" },
    { id: "cambiar-de-contador", label: "Cambiar de contador" },
  ] as const,

  whatsapp: {
    defaultText:
      "Hola, quisiera consultar por los servicios contables de contador.com.py.",
    fabLabel: "Escribir por WhatsApp",
    unavailable:
      "Estamos configurando nuestro número de WhatsApp. Mientras tanto, use el formulario.",
  },

  sections: {
    servicesEyebrow: "Servicios",
    processEyebrow: "Cómo trabajamos",
    aboutEyebrow: "Quiénes somos",
    casesEyebrow: "Casos",
    faqTitle: "Preguntas frecuentes",
    includesTitle: "Qué incluye",
    benefitsTitle: "Beneficios",
    relatedTitle: "Servicios relacionados",
    industriesTitle: "Rubros que atendemos",
  },

  footer: {
    servicesColumn: "Servicios",
    firmColumn: "Firma",
    contactColumn: "Contacto",
    legal: "Legal",
    rights: "Todos los derechos reservados.",
  },

  notFound: {
    title: "No encontramos esta página",
    lead: "Es posible que el enlace haya cambiado. Estas son las secciones más buscadas del sitio.",
  },

  gone: {
    title: "Esta página ya no existe",
    lead: "El contenido fue retirado durante el rediseño del sitio. Puede continuar desde aquí.",
  },
} as const;
