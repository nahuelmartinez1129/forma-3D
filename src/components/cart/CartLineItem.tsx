"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { QuantityInput } from "@/components/product/VariantSelectors";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatPrice } from "@/lib/format";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/lib/selection";
import type { ResolvedCartLine } from "@/lib/types";

interface CartLineItemProps {
  line: ResolvedCartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartLineItem({ line, onQuantityChange, onRemove }: CartLineItemProps) {
  const { product, item } = line;
  const [image] = product.images;
  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link
        href={`/producto/${product.slug}`}
        className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-mist sm:w-32"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage src={image.src} alt="" fill sizes="128px" className="object-cover" fallbackLabel={product.name} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold leading-snug">
              <Link href={`/producto/${product.slug}`} className="hover:text-electric-dark">
                {product.name}
              </Link>
            </h2>
            {line.details.length > 0 ? (
              <ul className="mt-1 text-sm text-ink-muted">
                {line.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
            {line.personalization.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {line.personalization.map((text) => (
                  <li key={text} className="inline-block break-words rounded-lg bg-electric/8 px-2 py-1 text-xs font-semibold text-electric-dark">
                    {text}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p className="shrink-0 text-right font-display text-lg font-semibold">{formatPrice(line.subtotal)}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-3">
            <QuantityInput value={item.quantity} min={MIN_QUANTITY} max={MAX_QUANTITY} onChange={onQuantityChange} />
            <span className="text-xs text-ink-muted">{formatPrice(line.unitPrice)} c/u</span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-mist hover:text-graphite"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            Eliminar<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
