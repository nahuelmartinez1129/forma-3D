import { getProductById } from "../data/products";
import {
  clampQuantity,
  describePersonalization,
  describeVariants,
  getUnitPrice,
  isValidQuantity,
  MAX_QUANTITY,
  normalizeSelection,
  validateSelection,
} from "./selection";
import type { CartItem, ProductSelection, ResolvedCartLine } from "./types";

// Lógica pura del carrito. No guarda precios: siempre se calculan desde los datos de productos.

/**
 * Clave estable por configuración. Mismo producto + mismas variantes + misma
 * personalización = misma línea; cualquier diferencia genera una línea nueva.
 */
export function getCartKey(productId: string, selection: ProductSelection): string {
  const normalized = normalizeSelection(selection);
  const sortedEntries = (record: Record<string, string>) =>
    Object.keys(record)
      .sort()
      .map((key) => [key, record[key]]);
  return JSON.stringify([
    productId,
    normalized.colorId ?? "",
    sortedEntries(normalized.options),
    // La comparación de textos ignora mayúsculas y espacios extra.
    sortedEntries(normalized.personalization).map(([key, value]) => [key, value.toLowerCase()]),
  ]);
}

export type AddResult =
  | { ok: true; items: CartItem[] }
  | { ok: false; items: CartItem[]; errors: string[] };

export function addToCart(
  items: CartItem[],
  productId: string,
  selection: ProductSelection,
  quantity: number,
): AddResult {
  const product = getProductById(productId);
  if (!product) return { ok: false, items, errors: ["El producto no existe."] };
  if (!isValidQuantity(quantity)) {
    return { ok: false, items, errors: [`La cantidad debe ser un número entero entre 1 y ${MAX_QUANTITY}.`] };
  }
  const errors = validateSelection(product, selection);
  if (errors.length > 0) {
    return { ok: false, items, errors: errors.map((error) => error.message) };
  }

  const normalized = normalizeSelection(selection);
  const key = getCartKey(productId, normalized);
  const existing = items.find((item) => item.key === key);
  if (existing) {
    return {
      ok: true,
      items: items.map((item) =>
        item.key === key ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
      ),
    };
  }
  return { ok: true, items: [...items, { key, productId, selection: normalized, quantity }] };
}

export function updateQuantity(items: CartItem[], key: string, quantity: number): CartItem[] {
  return items.map((item) => (item.key === key ? { ...item, quantity: clampQuantity(quantity) } : item));
}

export function removeFromCart(items: CartItem[], key: string): CartItem[] {
  return items.filter((item) => item.key !== key);
}

/**
 * Descarta líneas inválidas (por ejemplo, datos viejos en localStorage después de editar
 * el catálogo): productos inexistentes, variantes no disponibles o cantidades fuera de rango.
 */
export function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const result: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const candidate = entry as Partial<CartItem>;
    if (typeof candidate.productId !== "string" || !candidate.selection) continue;
    const selection = candidate.selection as Partial<ProductSelection>;
    const parsed: ProductSelection = {
      colorId: typeof selection.colorId === "string" ? selection.colorId : null,
      options: toStringRecord(selection.options),
      personalization: toStringRecord(selection.personalization),
    };
    const quantity = typeof candidate.quantity === "number" ? clampQuantity(candidate.quantity) : 1;
    const added = addToCart(result, candidate.productId, parsed, quantity);
    if (added.ok) result.splice(0, result.length, ...added.items);
  }
  return result;
}

function toStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const record: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string") record[key] = item;
  }
  return record;
}

export function resolveCart(items: CartItem[]): ResolvedCartLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId);
    if (!product) return [];
    const unitPrice = getUnitPrice(product, item.selection);
    return [
      {
        item,
        product,
        unitPrice,
        subtotal: unitPrice * item.quantity,
        details: describeVariants(product, item.selection),
        personalization: describePersonalization(product, item.selection),
      },
    ];
  });
}

export function getCartTotal(lines: ResolvedCartLine[]): number {
  return lines.reduce((total, line) => total + line.subtotal, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
