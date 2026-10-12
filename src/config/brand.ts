// Configuración de marca y contacto. Editá este archivo antes de mostrar el catálogo.

/**
 * Teléfono de WhatsApp en formato internacional, sin "+", espacios ni guiones.
 * Ejemplo para Argentina: 549 + código de área sin 0 + número sin 15 → "5492291123456".
 *
 * Mientras siga siendo el marcador "549XXXXXXXXXX", el sitio muestra una advertencia
 * y no abre enlaces de WhatsApp. También se puede definir con la variable de entorno
 * NEXT_PUBLIC_WHATSAPP_PHONE (útil en Vercel).
 */
export const WHATSAPP_PHONE: string =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim() || "549XXXXXXXXXX";

/** URL pública del sitio (para metadata, Open Graph y sitemap). */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const BRAND = {
  name: "FORMA 3D",
  descriptor: "Objetos de fabricación digital",
  slogan: "Ideas que toman forma",
  /** Aviso visible en todo el sitio. */
  demoNotice:
    "FORMA 3D es una marca ficticia creada como demostración de portfolio. Los productos, precios y disponibilidad no son reales.",
  /** Perfil social ficticio: no existe y no debe enlazar a una cuenta real. */
  demoSocial: {
    network: "Instagram",
    handle: "@forma3d.demo",
  },
} as const;

/**
 * Datos del portfolio. Completá tu nombre y un enlace de contacto propio
 * (sitio, LinkedIn, etc.) para que aparezcan en el pie de página.
 */
export const PORTFOLIO = {
  authorName: "",
  contactUrl: "",
  market: "Miramar, provincia de Buenos Aires",
} as const;
