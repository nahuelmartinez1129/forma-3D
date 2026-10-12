import { formatPrice } from "./format";
import type { ResolvedCartLine } from "./types";

// Utilidades para armar consultas por WhatsApp. El mensaje es una consulta:
// nunca confirma pedidos, pagos ni disponibilidad.

const PLACEHOLDER_PATTERN = /x/i;

/** Un teléfono es válido si tiene solo dígitos (10 a 15) y ya no contiene el marcador "X". */
export function isPhoneConfigured(phone: string): boolean {
  return !PLACEHOLDER_PATTERN.test(phone) && /^\d{10,15}$/.test(phone);
}

export function buildWhatsAppUrl(phone: string, message: string): string | null {
  if (!isPhoneConfigured(phone)) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const CLOSING_QUESTION =
  "¿Me confirman disponibilidad, opciones de fabricación y condiciones de entrega?";

export function buildOrderMessage(lines: ResolvedCartLine[], brandName: string): string {
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const body = lines.map((line) => {
    const variants = line.details.map((detail) => detail.replace(/^Color: /, "").toLowerCase());
    const title = [line.product.name, ...variants].join(", ");
    const rows = [
      `- ${title} x ${line.item.quantity} — ${formatPrice(line.subtotal)}`,
      `  Precio unitario: ${formatPrice(line.unitPrice)}`,
    ];
    for (const text of line.personalization) rows.push(`  Personalización: ${text}`);
    return rows.join("\n");
  });

  const needsReview = lines.some((line) => line.personalization.length > 0);

  return [
    `Hola, ${brandName}. Quiero consultar por este pedido:`,
    "",
    ...body,
    "",
    `Total estimado: ${formatPrice(total)}`,
    ...(needsReview
      ? ["", "Incluye personalizaciones: entiendo que el diseño debe revisarse antes de confirmar."]
      : []),
    "",
    CLOSING_QUESTION,
  ].join("\n");
}

export function buildProductInquiryMessage(
  productName: string,
  details: string[],
  personalization: string[],
  brandName: string,
): string {
  const lines = [`Hola, ${brandName}. Quiero consultar por el producto "${productName}".`];
  if (details.length > 0 || personalization.length > 0) {
    lines.push("", "Opciones que me interesan:");
    for (const detail of details) lines.push(`- ${detail}`);
    for (const text of personalization) lines.push(`- Personalización: ${text}`);
  }
  lines.push("", CLOSING_QUESTION);
  return lines.join("\n");
}

export function buildCustomRequestMessage(brandName: string): string {
  return [
    `Hola, ${brandName}. Quiero consultar por un diseño personalizado.`,
    "",
    "Idea: ",
    "Medidas aproximadas: ",
    "Color preferido: ",
    "",
    "¿Me cuentan si es posible fabricarlo y qué opciones hay?",
  ].join("\n");
}
