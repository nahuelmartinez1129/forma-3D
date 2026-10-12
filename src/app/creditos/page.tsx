import type { Metadata } from "next";
import Image from "next/image";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Créditos de imágenes",
  description: "Fotografías de referencia utilizadas en esta demostración y sus autores.",
};

export default function CreditsPage() {
  const images = Object.values(IMAGES);
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <p className="eyebrow">Créditos</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Créditos de imágenes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Las fotografías provienen de Unsplash y se usan bajo la Licencia Unsplash. Son imágenes de referencia: no
        pertenecen a FORMA 3D ni muestran productos fabricados por esta marca ficticia.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <li key={image.src} className="flex gap-4 rounded-2xl border border-graphite/10 bg-white p-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-mist">
              <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="line-clamp-2 text-graphite">{image.alt}</p>
              <p className="mt-1 text-ink-muted">
                Foto de{" "}
                <a href={image.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-electric-dark underline underline-offset-2">
                  {image.credit.author}
                </a>{" "}
                en Unsplash
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
