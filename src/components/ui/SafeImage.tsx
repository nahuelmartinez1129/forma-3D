"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  /** Texto breve que se muestra si la imagen no carga. */
  fallbackLabel?: string;
};

/**
 * Imagen con alternativa visual: si la foto falla, muestra un bloque con capas
 * y el nombre del producto en lugar de un ícono de imagen rota.
 */
export function SafeImage({ fallbackLabel, alt, className, ...props }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  if (failedSrc === props.src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="layer-lines absolute inset-0 flex items-center justify-center bg-mist p-4 text-center"
      >
        <span className="font-display text-sm font-semibold text-ink-muted">
          {fallbackLabel ?? "Imagen no disponible"}
        </span>
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailedSrc(props.src)} {...props} />;
}
