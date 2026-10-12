import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AVAILABILITY } from "@/components/product/labels";
import { FabricationInfo } from "@/components/product/FabricationInfo";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BRAND } from "@/config/brand";
import { getCategory } from "@/data/categories";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  const [image] = product.images;
  return {
    title: product.name,
    description: `${product.shortDescription} Precio demostrativo: ${formatPrice(product.price)}.`,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${BRAND.name}`,
      description: product.shortDescription,
      images: [{ url: image.src, alt: image.alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.categories[0]);
  const availability = AVAILABILITY[product.availability];
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:pt-10">
      <nav aria-label="Ruta de navegación" className="text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-graphite">
              Inicio
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <Link href="/catalogo" className="hover:text-graphite">
              Catálogo
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <Link href={`/catalogo?categoria=${category.id}`} className="hover:text-graphite">
              {category.name}
            </Link>
          </li>
          <li className="flex items-center gap-1.5 font-semibold text-graphite" aria-current="page">
            <ChevronRight aria-hidden="true" className="size-3.5" />
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge ? <ProductBadge badge={product.badge} /> : null}
            <Link
              href={`/catalogo?categoria=${category.id}`}
              className="rounded-full border border-graphite/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-graphite/75 hover:border-graphite/40"
            >
              {category.name}
            </Link>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-balance sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl font-semibold text-graphite">
            {formatPrice(product.price)}
            {product.options.some((option) => option.choices.some((choice) => choice.priceDelta)) ? (
              <span className="ml-2 align-middle text-sm font-medium text-ink-muted">precio base</span>
            ) : null}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Precio demostrativo en pesos argentinos (ARS).</p>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{product.description}</p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-mist/60 px-4 py-3 text-sm">
            <span aria-hidden="true" className={`mt-1.5 size-2.5 shrink-0 rounded-full ${availability.dot}`} />
            <p>
              <strong className="text-graphite">{availability.label}.</strong>{" "}
              <span className="text-ink-muted">{availability.description} Estado demostrativo, no es stock real.</span>
            </p>
          </div>

          <div className="mt-8">
            <ProductConfigurator key={product.id} product={product} />
          </div>

          <div className="mt-10">
            <FabricationInfo details={product.fabrication} />
          </div>
        </div>
      </div>

      <section aria-labelledby="relacionados-titulo" className="mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 id="relacionados-titulo" className="font-display text-3xl font-semibold tracking-[-0.03em]">
            También te puede interesar
          </h2>
          <Link href="/catalogo" className="hidden text-sm font-bold text-electric-dark hover:underline sm:block">
            Ver catálogo
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <li key={item.id}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
