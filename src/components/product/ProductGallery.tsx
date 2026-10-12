"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ImageAsset } from "@/lib/types";

export function ProductGallery({ images, productName }: { images: ImageAsset[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-mist sm:aspect-square lg:aspect-[4/5]">
        <SafeImage
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover motion-safe:animate-[fade-up_0.4s_ease-out]"
          fallbackLabel={productName}
        />
      </div>
      {images.length > 1 ? (
        <div role="group" aria-label="Imágenes del producto" className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1} de ${images.length}`}
              aria-pressed={index === activeIndex}
              className={`relative aspect-square w-20 overflow-hidden rounded-2xl bg-mist ring-offset-2 ring-offset-paper transition sm:w-24 ${
                index === activeIndex ? "ring-2 ring-electric" : "opacity-70 hover:opacity-100"
              }`}
            >
              <SafeImage src={image.src} alt="" fill sizes="96px" className="object-cover" fallbackLabel="" />
            </button>
          ))}
        </div>
      ) : null}
      <p className="text-xs text-ink-muted">
        Imagen de referencia ({active.credit.author} / Unsplash). No corresponde a un producto fabricado por la marca.
      </p>
    </div>
  );
}
