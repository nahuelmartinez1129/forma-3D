import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATEGORIES } from "../src/data/categories";
import { getProductBySlug, PRODUCTS } from "../src/data/products";
import { applyFilters, DEFAULT_FILTERS, filtersToParams, parseFilters } from "../src/lib/catalog";

describe("datos del catálogo", () => {
  it("incluye los 15 productos iniciales con IDs y slugs únicos", () => {
    assert.ok(PRODUCTS.length >= 15);
    assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, PRODUCTS.length);
    assert.equal(new Set(PRODUCTS.map((p) => p.slug)).size, PRODUCTS.length);
  });

  it("respeta los precios iniciales solicitados", () => {
    const expected: Record<string, number> = {
      "organizador-modular-de-escritorio": 8500,
      "soporte-para-celular": 6000,
      "soporte-para-auriculares": 12000,
      "maceta-geometrica-pequena": 7500,
      "maceta-geometrica-grande": 12500,
      "lampara-decorativa": 24000,
      "porta-sahumerios-geometrico": 5500,
      "organizador-de-cables": 3500,
      "soporte-para-controles-de-videojuegos": 9000,
      "llavero-personalizado": 2500,
      "cartel-decorativo-con-nombre": 8000,
      "organizador-de-maquillaje": 10500,
      "soporte-para-tablet": 11500,
      "figura-decorativa-abstracta": 9500,
      "maceta-con-diseno-organico": 14000,
    };
    for (const [slug, price] of Object.entries(expected)) {
      assert.equal(getProductBySlug(slug)?.price, price, slug);
    }
  });

  it("cada categoría tiene al menos un producto y cada producto tiene imagen", () => {
    for (const category of CATEGORIES) {
      assert.ok(PRODUCTS.some((p) => p.categories.includes(category.id)), category.id);
    }
    for (const product of PRODUCTS) {
      assert.ok(product.images.length > 0 && product.images.every((image) => image.alt.length > 0));
    }
  });

  it("las imágenes principales no se repiten entre productos", () => {
    const mainImages = PRODUCTS.map((p) => p.images[0].src);
    assert.equal(new Set(mainImages).size, mainImages.length);
  });

  it("ningún producto tiene todas sus opciones de color bloqueadas", () => {
    for (const product of PRODUCTS) {
      if (product.colors.length > 0) assert.ok(product.colors.some((c) => c.available), product.slug);
      for (const option of product.options) {
        assert.ok(option.choices.some((c) => c.available), `${product.slug}/${option.id}`);
      }
    }
  });
});

describe("filtros y búsqueda", () => {
  it("sin filtros devuelve todos los productos", () => {
    assert.equal(applyFilters(PRODUCTS, DEFAULT_FILTERS).length, PRODUCTS.length);
  });

  it("filtra por categoría, incluidas las categorías secundarias", () => {
    const result = applyFilters(PRODUCTS, { ...DEFAULT_FILTERS, category: "personalizados" });
    const slugs = result.map((p) => p.slug);
    assert.ok(slugs.includes("llavero-personalizado"));
    assert.ok(slugs.includes("cartel-decorativo-con-nombre"));
    assert.ok(result.every((p) => p.categories.includes("personalizados")));
  });

  it("busca por nombre ignorando tildes y mayúsculas", () => {
    const result = applyFilters(PRODUCTS, { ...DEFAULT_FILTERS, query: "LAMPARA" });
    assert.deepEqual(result.map((p) => p.slug), ["lampara-decorativa"]);
    const macetas = applyFilters(PRODUCTS, { ...DEFAULT_FILTERS, query: "maceta" });
    assert.equal(macetas.length, 3);
  });

  it("combina búsqueda y categoría y devuelve vacío cuando no hay coincidencias", () => {
    const result = applyFilters(PRODUCTS, {
      ...DEFAULT_FILTERS,
      category: "organizacion",
      query: "maceta",
    });
    assert.equal(result.length, 0);
  });

  it("ordena por precio ascendente y descendente", () => {
    const asc = applyFilters(PRODUCTS, { ...DEFAULT_FILTERS, sort: "precio-asc" }).map((p) => p.price);
    const desc = applyFilters(PRODUCTS, { ...DEFAULT_FILTERS, sort: "precio-desc" }).map((p) => p.price);
    assert.deepEqual(asc, [...asc].sort((a, b) => a - b));
    assert.deepEqual(desc, [...desc].sort((a, b) => b - a));
    assert.equal(asc[0], 2500);
    assert.equal(desc[0], 24000);
  });

  it("ordena por destacados según featuredRank", () => {
    const result = applyFilters(PRODUCTS, DEFAULT_FILTERS);
    assert.equal(result[0].slug, "organizador-modular-de-escritorio");
  });

  it("lee y escribe los filtros en la URL ignorando valores inválidos", () => {
    const parsed = parseFilters(new URLSearchParams("categoria=decoracion&q=lamp&orden=precio-desc"));
    assert.deepEqual(parsed, { category: "decoracion", query: "lamp", sort: "precio-desc" });
    assert.equal(filtersToParams(parsed).toString(), "categoria=decoracion&q=lamp&orden=precio-desc");
    const invalid = parseFilters(new URLSearchParams("categoria=mendoza&orden=random"));
    assert.deepEqual(invalid, DEFAULT_FILTERS);
  });
});
