import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getProductBySlug } from "../src/data/products";
import {
  addToCart,
  getCartCount,
  getCartKey,
  getCartTotal,
  removeFromCart,
  resolveCart,
  sanitizeCart,
  updateQuantity,
} from "../src/lib/cart";
import { formatPrice } from "../src/lib/format";
import { validateSelection } from "../src/lib/selection";
import type { CartItem, ProductSelection } from "../src/lib/types";

function product(slug: string) {
  const found = getProductBySlug(slug);
  assert.ok(found, slug);
  return found;
}

const phone = product("soporte-para-celular");
const keychain = product("llavero-personalizado");
const organizer = product("organizador-modular-de-escritorio");

const blackPhone: ProductSelection = { colorId: "negro-grafito", options: {}, personalization: {} };

function add(items: CartItem[], productId: string, selection: ProductSelection, quantity = 1) {
  const result = addToCart(items, productId, selection, quantity);
  assert.ok(result.ok, result.ok ? "" : result.errors.join(", "));
  return result.items;
}

describe("formato de precios", () => {
  it("usa pesos argentinos con separador de miles", () => {
    assert.equal(formatPrice(6000), "$6.000");
    assert.equal(formatPrice(11000), "$11.000");
    assert.equal(formatPrice(2500), "$2.500");
  });
});

describe("validación de variantes", () => {
  it("exige color y opciones obligatorias", () => {
    const errors = validateSelection(organizer, { colorId: null, options: {}, personalization: {} });
    assert.deepEqual(errors.map((e) => e.field).sort(), ["color", "option:configuracion"]);
  });

  it("rechaza colores y opciones no disponibles", () => {
    const blockedColor = validateSelection(organizer, {
      colorId: "verde-menta",
      options: { configuracion: "3-modulos" },
      personalization: {},
    });
    assert.equal(blockedColor[0]?.field, "color");
    const lamp = product("lampara-decorativa");
    const blockedSize = validateSelection(lamp, {
      colorId: "blanco",
      options: { tamano: "grande" },
      personalization: {},
    });
    assert.equal(blockedSize[0]?.field, "option:tamano");
  });

  it("exige la personalización obligatoria y respeta el largo máximo", () => {
    const empty = validateSelection(keychain, { colorId: "azul-electrico", options: {}, personalization: { texto: "   " } });
    assert.equal(empty[0]?.field, "text:texto");
    const tooLong = validateSelection(keychain, {
      colorId: "azul-electrico",
      options: {},
      personalization: { texto: "Nombre demasiado largo" },
    });
    assert.equal(tooLong[0]?.field, "text:texto");
    const ok = validateSelection(keychain, { colorId: "azul-electrico", options: {}, personalization: { texto: "Sofi" } });
    assert.deepEqual(ok, []);
  });
});

describe("carrito", () => {
  it("rechaza cantidades inválidas", () => {
    for (const quantity of [0, -1, 1.5, 21, Number.NaN]) {
      assert.equal(addToCart([], phone.id, blackPhone, quantity).ok, false, String(quantity));
    }
  });

  it("no agrega productos con opciones faltantes o inexistentes", () => {
    assert.equal(addToCart([], phone.id, { colorId: null, options: {}, personalization: {} }, 1).ok, false);
    assert.equal(addToCart([], "no-existe", blackPhone, 1).ok, false);
  });

  it("suma cantidad cuando la configuración es idéntica", () => {
    let items = add([], phone.id, blackPhone, 1);
    items = add(items, phone.id, { ...blackPhone }, 2);
    assert.equal(items.length, 1);
    assert.equal(items[0].quantity, 3);
  });

  it("separa en líneas distintas las variantes y personalizaciones diferentes", () => {
    let items = add([], phone.id, blackPhone);
    items = add(items, phone.id, { ...blackPhone, colorId: "blanco" });
    items = add(items, keychain.id, { colorId: "azul-electrico", options: {}, personalization: { texto: "Sofi" } });
    items = add(items, keychain.id, { colorId: "azul-electrico", options: {}, personalization: { texto: "Juan" } });
    // Mismo texto con otras mayúsculas/espacios se considera la misma personalización.
    items = add(items, keychain.id, { colorId: "azul-electrico", options: {}, personalization: { texto: "  sofi " } });
    assert.equal(items.length, 4);
    assert.equal(items.find((i) => i.selection.personalization.texto === "Sofi")?.quantity, 2);
  });

  it("calcula subtotales y total desde los datos de productos, con recargos de opciones", () => {
    let items = add([], phone.id, blackPhone, 1);
    items = add(items, keychain.id, { colorId: "blanco", options: {}, personalization: { texto: "Sofi" } }, 2);
    items = add(items, organizer.id, { colorId: "blanco", options: { configuracion: "5-modulos" }, personalization: {} }, 1);
    const lines = resolveCart(items);
    assert.deepEqual(lines.map((l) => l.subtotal), [6000, 5000, 12000]);
    assert.equal(getCartTotal(lines), 23000);
    assert.equal(getCartCount(items), 4);
  });

  it("modifica cantidades dentro del rango permitido y elimina líneas", () => {
    let items = add([], phone.id, blackPhone, 1);
    const key = items[0].key;
    items = updateQuantity(items, key, 50);
    assert.equal(items[0].quantity, 20);
    items = updateQuantity(items, key, 0);
    assert.equal(items[0].quantity, 1);
    items = removeFromCart(items, key);
    assert.equal(items.length, 0);
  });

  it("descarta datos guardados inválidos o desactualizados", () => {
    const stored = [
      { productId: phone.id, selection: blackPhone, quantity: 2 },
      { productId: phone.id, selection: { colorId: "violeta", options: {}, personalization: {} }, quantity: 1 },
      { productId: "borrado", selection: blackPhone, quantity: 1 },
      { productId: keychain.id, selection: { colorId: "blanco", options: {}, personalization: {} }, quantity: 1 },
      { productId: phone.id, selection: blackPhone, quantity: 999 },
      "basura",
      null,
    ];
    const items = sanitizeCart(stored);
    assert.equal(items.length, 1);
    assert.equal(items[0].quantity, 20);
    assert.equal(items[0].key, getCartKey(phone.id, blackPhone));
    assert.deepEqual(sanitizeCart("no es un array"), []);
  });
});
