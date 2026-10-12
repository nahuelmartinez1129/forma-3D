import { ArrowRight, Check, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { BRAND } from "@/config/brand";
import { IMAGES } from "@/data/images";
import { buildCustomRequestMessage } from "@/lib/whatsapp";

const EXAMPLES = [
  { title: "Llaveros con nombre", text: "Un nombre, una palabra o unas iniciales en relieve.", href: "/producto/llavero-personalizado" },
  { title: "Carteles decorativos", text: "Letras con volumen para cuartos, estudios o emprendimientos.", href: "/producto/cartel-decorativo-con-nombre" },
  { title: "Organizadores con iniciales", text: "Un detalle propio sobre un objeto de uso diario.", href: "/producto/organizador-modular-de-escritorio" },
  { title: "Colores a elección", text: "Combiná los colores disponibles de cada producto.", href: "/catalogo?categoria=personalizados" },
];

export function CustomizationSection() {
  return (
    <section id="personalizados" aria-labelledby="personalizados-titulo" className="relative overflow-hidden">
      <div aria-hidden="true" className="layer-lines absolute inset-y-0 right-0 hidden w-1/3 lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
        <div className="order-2 grid grid-cols-2 content-start gap-3 sm:gap-4 lg:order-1">
          <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-mist">
            <Image src={IMAGES.letterSign.src} alt={IMAGES.letterSign.alt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-graphite">
              Ejemplo: letras con volumen
            </figcaption>
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-mist">
            <Image src={IMAGES.keychains.src} alt={IMAGES.keychains.alt} fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-graphite">
              Ejemplo: llaveros
            </figcaption>
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-mist">
            <Image src={IMAGES.heartBox.src} alt={IMAGES.heartBox.alt} fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-graphite">
              Ejemplo: regalos
            </figcaption>
          </figure>
        </div>

        <div className="order-1 lg:order-2 lg:pt-6">
          <p className="eyebrow">Personalizados</p>
          <h2 id="personalizados-titulo" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
            Tu idea, hecha objeto
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Algunos productos pueden personalizarse con un texto, un nombre, un color u otras opciones disponibles.
            Contanos qué tenés en mente y lo evaluamos juntos.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {EXAMPLES.map((example) => (
              <li key={example.title}>
                <Link
                  href={example.href}
                  className="group flex h-full flex-col rounded-2xl border border-graphite/10 bg-white p-4 transition-colors hover:border-electric"
                >
                  <span className="flex items-center gap-2 font-display font-semibold text-graphite">
                    <Check aria-hidden="true" className="size-4 text-electric" />
                    {example.title}
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-ink-muted">{example.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
            <WhatsAppLink message={buildCustomRequestMessage(BRAND.name)} label="Consultar por WhatsApp" />
            <Link href="/catalogo?categoria=personalizados" className="btn btn-outline shrink-0 whitespace-nowrap">
              Ver personalizables
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <p className="mt-6 flex gap-3 rounded-2xl bg-mint-soft p-4 text-sm leading-relaxed text-graphite">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-dark" />
            <span>
              Cada solicitud se evalúa antes de confirmarse: la personalización es una consulta, no una garantía de
              fabricación. El diseño final, el precio y los tiempos se acuerdan con el comercio.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
