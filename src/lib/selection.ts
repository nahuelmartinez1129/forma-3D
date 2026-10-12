import type { Product, ProductSelection, SelectionError } from "./types";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 20;

export function emptySelection(): ProductSelection {
  return { colorId: null, options: {}, personalization: {} };
}

/** Normaliza espacios del texto personalizado: "  Sofi   M " → "Sofi M". */
export function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isValidQuantity(quantity: unknown): quantity is number {
  return (
    typeof quantity === "number" &&
    Number.isInteger(quantity) &&
    quantity >= MIN_QUANTITY &&
    quantity <= MAX_QUANTITY
  );
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(quantity)));
}

/**
 * Valida una selección contra los datos del producto: colores y opciones existentes
 * y disponibles, campos obligatorios completos y largos máximos respetados.
 */
export function validateSelection(
  product: Product,
  selection: ProductSelection,
): SelectionError[] {
  const errors: SelectionError[] = [];

  if (product.colors.length > 0) {
    const color = product.colors.find((item) => item.id === selection.colorId);
    if (!selection.colorId) {
      errors.push({ field: "color", message: "Elegí un color." });
    } else if (!color) {
      errors.push({ field: "color", message: "El color elegido no existe." });
    } else if (!color.available) {
      errors.push({ field: "color", message: `El color ${color.name} no está disponible.` });
    }
  } else if (selection.colorId) {
    errors.push({ field: "color", message: "Este producto no tiene opciones de color." });
  }

  for (const option of product.options) {
    const choiceId = selection.options[option.id];
    const choice = option.choices.find((item) => item.id === choiceId);
    if (!choiceId) {
      if (option.required) {
        errors.push({ field: `option:${option.id}`, message: `Elegí ${option.label.toLowerCase()}.` });
      }
    } else if (!choice) {
      errors.push({ field: `option:${option.id}`, message: `La opción elegida en ${option.label} no existe.` });
    } else if (!choice.available) {
      errors.push({
        field: `option:${option.id}`,
        message: `${choice.label} no está disponible.`,
      });
    }
  }

  for (const key of Object.keys(selection.options)) {
    if (!product.options.some((option) => option.id === key)) {
      errors.push({ field: `option:${key}`, message: "Opción no válida para este producto." });
    }
  }

  for (const field of product.personalization) {
    const value = normalizeText(selection.personalization[field.id] ?? "");
    if (field.required && value.length === 0) {
      errors.push({ field: `text:${field.id}`, message: `Completá "${field.label}".` });
    } else if (value.length > field.maxLength) {
      errors.push({
        field: `text:${field.id}`,
        message: `"${field.label}" admite hasta ${field.maxLength} caracteres.`,
      });
    }
  }

  for (const key of Object.keys(selection.personalization)) {
    if (!product.personalization.some((field) => field.id === key)) {
      errors.push({ field: `text:${key}`, message: "Campo de personalización no válido." });
    }
  }

  return errors;
}

/** Limpia la selección: normaliza textos y descarta campos vacíos. */
export function normalizeSelection(selection: ProductSelection): ProductSelection {
  const personalization: Record<string, string> = {};
  for (const [key, value] of Object.entries(selection.personalization)) {
    const text = normalizeText(value);
    if (text) personalization[key] = text;
  }
  const options: Record<string, string> = {};
  for (const [key, value] of Object.entries(selection.options)) {
    if (value) options[key] = value;
  }
  return { colorId: selection.colorId, options, personalization };
}

/** Precio unitario = precio base + recargos de las opciones elegidas. */
export function getUnitPrice(product: Product, selection: ProductSelection): number {
  let price = product.price;
  for (const option of product.options) {
    const choice = option.choices.find((item) => item.id === selection.options[option.id]);
    price += choice?.priceDelta ?? 0;
  }
  return price;
}

/** Descripción legible de las variantes: ["Color: Negro grafito", "Tamaño: Grande"]. */
export function describeVariants(product: Product, selection: ProductSelection): string[] {
  const details: string[] = [];
  const color = product.colors.find((item) => item.id === selection.colorId);
  if (color) details.push(`Color: ${color.name}`);
  for (const option of product.options) {
    const choice = option.choices.find((item) => item.id === selection.options[option.id]);
    if (choice) details.push(`${option.label}: ${choice.label}`);
  }
  return details;
}

export function describePersonalization(
  product: Product,
  selection: ProductSelection,
): string[] {
  return product.personalization.flatMap((field) => {
    const value = normalizeText(selection.personalization[field.id] ?? "");
    return value ? [`${field.label.replace(/\s*\(opcional\)$/i, "")}: "${value}"`] : [];
  });
}

/** Indica si la configuración elegida necesita revisión manual del comercio. */
export function needsManualConfirmation(product: Product, selection: ProductSelection): boolean {
  return product.personalization.some(
    (field) => normalizeText(selection.personalization[field.id] ?? "").length > 0,
  );
}
