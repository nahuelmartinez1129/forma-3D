import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { ProductBadge } from "./ProductBadge";

interface ProductCardProps {
  product: Product;
  /** Nivel del título según la sección donde se usa la tarjeta. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}

export function ProductCard({ product, headingLevel: Heading = "h3", priority = false }: ProductCardProps) {
  const [image] = product.images;
  const hasPriceOptions = product.options.some((option) => option.choices.some((choice) => choice.priceDelta));

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-mist">
        <SafeImage
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fallbackLabel={product.name}
        />
        {product.badge ? <ProductBadge badge={product.badge} className="absolute left-3 top-3" /> : null}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex size-10 translate-y-1 items-center justify-center rounded-full bg-paper text-graphite opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {getCategory(product.categories[0]).name}
        </p>
        <Heading className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-graphite">
          <Link href={`/producto/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[1.4rem]">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">{product.shortDescription}</p>
        <p className="mt-auto pt-3 font-display text-lg font-semibold text-graphite">
          {hasPriceOptions ? <span className="mr-1 text-xs font-medium text-ink-muted">Desde</span> : null}
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
