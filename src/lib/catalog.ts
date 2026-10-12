import { isCategoryId } from "../data/categories";
import type { CatalogFilters, Product, SortOrder } from "./types";

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

export const DEFAULT_FILTERS: CatalogFilters = { category: null, query: "", sort: "destacados" };

function isSortOrder(value: string | null): value is SortOrder {
  return SORT_OPTIONS.some((option) => option.value === value);
}

/** Convierte "Organizador Más" en "organizador mas" para comparar sin tildes ni mayúsculas. */
export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function parseFilters(params: URLSearchParams): CatalogFilters {
  const category = params.get("categoria");
  const sort = params.get("orden");
  return {
    category: isCategoryId(category) ? category : null,
    query: params.get("q") ?? "",
    sort: isSortOrder(sort) ? sort : "destacados",
  };
}

export function filtersToParams(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category) params.set("categoria", filters.category);
  if (filters.query) params.set("q", filters.query);
  if (filters.sort !== "destacados") params.set("orden", filters.sort);
  return params;
}

export function applyFilters(products: Product[], filters: CatalogFilters): Product[] {
  const query = normalizeSearch(filters.query);
  const filtered = products.filter((product) => {
    if (filters.category && !product.categories.includes(filters.category)) return false;
    if (query && !normalizeSearch(product.name).includes(query)) return false;
    return true;
  });

  const byFeatured = (a: Product, b: Product) =>
    (a.featuredRank ?? Infinity) - (b.featuredRank ?? Infinity);

  return [...filtered].sort((a, b) => {
    if (filters.sort === "precio-asc") return a.price - b.price || byFeatured(a, b);
    if (filters.sort === "precio-desc") return b.price - a.price || byFeatured(a, b);
    return byFeatured(a, b);
  });
}

export function hasActiveFilters(filters: CatalogFilters): boolean {
  return filters.category !== null || filters.query.trim() !== "" || filters.sort !== "destacados";
}
