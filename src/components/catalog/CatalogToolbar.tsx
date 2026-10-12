"use client";

import { RotateCcw, Search, X } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { hasActiveFilters, SORT_OPTIONS } from "@/lib/catalog";
import type { CatalogFilters, CategoryId, SortOrder } from "@/lib/types";

interface CatalogToolbarProps {
  filters: CatalogFilters;
  resultCount: number;
  onChange: (filters: CatalogFilters) => void;
}

export function CatalogToolbar({ filters, resultCount, onChange }: CatalogToolbarProps) {
  const active = hasActiveFilters(filters);

  function setCategory(category: CategoryId | null) {
    onChange({ ...filters, category });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <label htmlFor="buscar" className="sr-only">
            Buscar productos por nombre
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
          <input
            id="buscar"
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder="Buscar por nombre: maceta, soporte, llavero…"
            autoComplete="off"
            enterKeyHint="search"
            className="field !rounded-full pl-12 pr-12 [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.query ? (
            <button
              type="button"
              aria-label="Borrar búsqueda"
              onClick={() => onChange({ ...filters, query: "" })}
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-mist hover:text-graphite"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="orden" className="shrink-0 text-sm font-semibold text-ink-muted">
            Ordenar por
          </label>
          <select
            id="orden"
            value={filters.sort}
            onChange={(event) => onChange({ ...filters, sort: event.target.value as SortOrder })}
            className="field !rounded-full md:w-60"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="sr-only">Filtrar por categoría</legend>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <CategoryChip label="Todos" active={filters.category === null} onClick={() => setCategory(null)} />
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              active={filters.category === category.id}
              onClick={() => setCategory(filters.category === category.id ? null : category.id)}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-b border-graphite/10 pb-4">
        <p role="status" aria-live="polite" className="text-sm text-ink-muted">
          <strong className="font-display text-base text-graphite">{resultCount}</strong>{" "}
          {resultCount === 1 ? "producto encontrado" : "productos encontrados"}
        </p>
        {active ? (
          <button
            type="button"
            onClick={() => onChange({ category: null, query: "", sort: "destacados" })}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-electric-dark transition-colors hover:bg-electric/10"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Limpiar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? "border-graphite bg-graphite text-paper"
          : "border-graphite/15 bg-white text-graphite hover:border-graphite/40"
      }`}
    >
      {label}
    </button>
  );
}
