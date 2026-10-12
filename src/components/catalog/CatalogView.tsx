"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import { applyFilters, filtersToParams, parseFilters } from "@/lib/catalog";
import type { CatalogFilters } from "@/lib/types";
import { CatalogToolbar } from "./CatalogToolbar";

/**
 * La URL es la única fuente de verdad de los filtros: se pueden compartir enlaces
 * filtrados y los botones atrás/adelante del navegador funcionan.
 */
export function CatalogView() {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const results = useMemo(() => applyFilters(PRODUCTS, filters), [filters]);

  const setFilters = useCallback((next: CatalogFilters) => {
    const query = filtersToParams(next).toString();
    // replaceState se integra con el router de Next y actualiza useSearchParams sin recargar.
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, []);

  return (
    <div>
      <CatalogToolbar filters={filters} resultCount={results.length} onChange={setFilters} />
      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-[1.75rem] border border-dashed border-graphite/20 bg-white px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-mist text-graphite">
            <SearchX aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold">No encontramos productos con esos filtros</h2>
          <p className="mt-2 max-w-md text-ink-muted">
            Probá con otra palabra, elegí otra categoría o limpiá los filtros para ver el catálogo completo.
          </p>
          <button
            type="button"
            className="btn btn-dark mt-6"
            onClick={() => setFilters({ category: null, query: "", sort: "destacados" })}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductGrid({ products }: { products: typeof PRODUCTS }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} headingLevel="h2" priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
