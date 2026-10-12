import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView, ProductGrid } from "@/components/catalog/CatalogView";
import { PRODUCTS } from "@/data/products";
import { applyFilters, DEFAULT_FILTERS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Organizadores, macetas, lámparas, soportes y objetos personalizados fabricados en 3D. Precios demostrativos en pesos argentinos.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <header className="max-w-3xl">
        <p className="eyebrow">Catálogo</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
          Objetos para ordenar, decorar y regalar
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Precios demostrativos en pesos argentinos. La disponibilidad y el precio final se confirman por WhatsApp.
        </p>
      </header>
      <div className="mt-10">
        {/* Los filtros leen la URL en el navegador; mientras tanto se muestra el catálogo completo. */}
        <Suspense fallback={<ProductGrid products={applyFilters(PRODUCTS, DEFAULT_FILTERS)} />}>
          <CatalogView />
        </Suspense>
      </div>
    </div>
  );
}
