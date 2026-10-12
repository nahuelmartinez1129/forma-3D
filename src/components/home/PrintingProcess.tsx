import Image from "next/image";
import { FABRICATION } from "@/config/fabrication";
import { IMAGES } from "@/data/images";

const POINTS = [
  { title: "Capa por capa", text: "Cada pieza se construye depositando capas finas, una sobre otra." },
  { title: "Textura propia", text: "Las líneas de cada capa forman parte del carácter del objeto." },
  { title: "Variaciones naturales", text: "Pueden existir pequeñas diferencias de tono y terminación entre piezas." },
];

export function PrintingProcess() {
  return (
    <section aria-labelledby="proceso-titulo" className="relative overflow-hidden bg-graphite text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-graphite-soft lg:aspect-[5/6]">
          <Image
            src={IMAGES.layerTexture.src}
            alt={IMAGES.layerTexture.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="layer-lines-light absolute inset-0" />
        </div>
        <div>
          <p className="eyebrow !text-mint">{FABRICATION.process}</p>
          <h2 id="proceso-titulo" className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem]">
            Objetos que nacen de un archivo digital
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/75">{FABRICATION.summary}</p>
          <ol className="mt-10 space-y-6">
            {POINTS.map((point, index) => (
              <li key={point.title} className="flex gap-5 border-t border-paper/12 pt-6">
                <span aria-hidden="true" className="font-display text-sm font-semibold text-mint">
                  0{index + 1}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold">{point.title}</span>
                  <span className="mt-1 block text-paper/70">{point.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
