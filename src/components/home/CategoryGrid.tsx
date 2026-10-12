import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categorias-titulo" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="categorias-titulo"
          eyebrow="Categorías"
          title="Encontrá el objeto que estabas buscando"
        />
        <Link href="/catalogo" className="btn btn-outline shrink-0 self-start sm:self-auto">
          Ver todo el catálogo
        </Link>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {CATEGORIES.map((category, index) => {
          const count = PRODUCTS.filter((product) => product.categories.includes(category.id)).length;
          return (
            <li key={category.id}>
              <Link
                href={`/catalogo?categoria=${category.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-mist sm:aspect-[5/4]"
              >
                <SafeImage
                  src={category.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 48vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fallbackLabel={category.name}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/20 to-transparent" />
                <span aria-hidden="true" className="absolute left-4 top-4 font-display text-xs font-semibold text-paper/80">
                  0{index + 1}
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight text-paper sm:text-2xl">
                      {category.name}
                    </span>
                    <span className="mt-1 hidden text-sm text-paper/80 sm:block">{category.description}</span>
                    <span className="mt-1 block text-xs font-semibold text-mint">
                      {count} {count === 1 ? "producto" : "productos"}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-paper text-graphite transition-transform duration-300 group-hover:rotate-45 sm:flex"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
