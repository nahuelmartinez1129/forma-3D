import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHomeProducts } from "@/data/products";

export function FeaturedProducts() {
  const products = getHomeProducts();
  return (
    <section aria-labelledby="destacados-titulo" className="border-y border-graphite/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="destacados-titulo"
            eyebrow="Selección"
            title="Diseñados para tu día a día"
            description="Objetos pensados para ordenar, decorar y acompañar tu rutina."
          />
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 self-start text-sm font-bold text-electric-dark underline-offset-4 hover:underline sm:self-auto"
          >
            Ver catálogo completo
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
