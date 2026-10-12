import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getProductBySlug } from "../src/data/products";
import { addToCart, resolveCart } from "../src/lib/cart";
import type { CartItem } from "../src/lib/types";
import {
  buildOrderMessage,
  buildProductInquiryMessage,
  buildWhatsAppUrl,
  isPhoneConfigured,
} from "../src/lib/whatsapp";

function sampleCart(): CartItem[] {
  const phone = getProductBySlug("soporte-para-celular")!;
  const keychain = getProductBySlug("llavero-personalizado")!;
  let items: CartItem[] = [];
  const first = addToCart(items, phone.id, { colorId: "negro-grafito", options: {}, personalization: {} }, 1);
  assert.ok(first.ok);
  items = first.items;
  const second = addToCart(items, keychain.id, { colorId: "azul-electrico", options: {}, personalization: { texto: "Sofi & Juan" } }, 2);
  assert.ok(second.ok);
  return second.items;
}

describe("teléfono de WhatsApp", () => {
  it("detecta el marcador sin configurar y formatos inválidos", () => {
    assert.equal(isPhoneConfigured("549XXXXXXXXXX"), false);
    assert.equal(isPhoneConfigured(""), false);
    assert.equal(isPhoneConfigured("+54 9 2291 12-3456"), false);
    assert.equal(isPhoneConfigured("123"), false);
    assert.equal(isPhoneConfigured("5492291123456"), true);
  });

  it("no genera enlaces con el teléfono sin configurar", () => {
    assert.equal(buildWhatsAppUrl("549XXXXXXXXXX", "Hola"), null);
  });
});

describe("mensaje del pedido", () => {
  const message = buildOrderMessage(resolveCart(sampleCart()), "FORMA 3D");

  it("incluye productos, variantes, cantidades, precios, personalización y total", () => {
    assert.match(message, /^Hola, FORMA 3D\. Quiero consultar por este pedido:/);
    assert.match(message, /- Soporte para celular, negro grafito x 1 — \$6\.000/);
    assert.match(message, /- Llavero personalizado, azul eléctrico x 2 — \$5\.000/);
    assert.match(message, /Precio unitario: \$2\.500/);
    assert.match(message, /Personalización: Nombre o texto: "Sofi & Juan"/);
    assert.match(message, /Total estimado: \$11\.000/);
    assert.match(message, /¿Me confirman disponibilidad, opciones de fabricación y condiciones de entrega\?$/);
  });

  it("no afirma que el pedido está confirmado ni simula pagos", () => {
    assert.doesNotMatch(message, /confirmado|pagado|pago realizado|pedido recibido/i);
  });

  it("codifica correctamente el texto en el enlace", () => {
    const url = buildWhatsAppUrl("5492291123456", message);
    assert.ok(url);
    assert.ok(url.startsWith("https://wa.me/5492291123456?text="));
    const encoded = url.split("?text=")[1];
    assert.doesNotMatch(encoded, /[ \n&#]/);
    assert.equal(decodeURIComponent(encoded), message);
  });

  it("arma consultas individuales de producto con las opciones elegidas", () => {
    const inquiry = buildProductInquiryMessage("Lámpara decorativa", ["Color: Blanco"], [], "FORMA 3D");
    assert.match(inquiry, /"Lámpara decorativa"/);
    assert.match(inquiry, /- Color: Blanco/);
  });
});
