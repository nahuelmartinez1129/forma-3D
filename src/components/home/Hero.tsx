import { ArrowRight, Layers, MessageCircle, Palette, PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { IMAGES } from "@/data/images";

const HIGHLIGHTS = [
  { icon: Palette, label: "Colores a elección" },
  { icon: PenLine, label: "Opciones personalizables" },
  { icon: MessageCircle, label: "Consultas por WhatsApp" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="motion-safe:animate-fade-up">
          <p className="eyebrow">{BRAND.descriptor}</p>
          <h1
            id="hero-titulo"
            className="mt-5 font-display text-[2.85rem] font-bold leading-[0.98] tracking-[-0.045em] text-balance text-graphite sm:text-6xl lg:text-[4.6rem]"
          >
            Diseño que toma{" "}
            <span className="relative inline-block text-electric">
              forma
              <svg aria-hidden="true" viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-3 w-full text-mint" preserveAspectRatio="none">
                <path d="M2 8 Q 50 2 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            Objetos funcionales, decoración y accesorios fabricados en 3D para dar vida a tus ideas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalogo" className="btn btn-primary">
              Explorar productos
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/#personalizados" className="btn btn-outline">
              Consultar por un diseño personalizado
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-graphite/80">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-electric" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
          <div className="grid grid-cols-[1.15fr_1fr] grid-rows-[1fr_1fr] gap-3 sm:gap-4">
            <div className="relative row-span-2 min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-mist sm:min-h-[30rem]">
              <Image
                src={IMAGES.spiralVase.src}
                alt={IMAGES.spiralVase.alt}
                fill
                priority
                sizes="(min-width: 1024px) 26vw, 52vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-mist">
              <Image
                src={IMAGES.lampTable.src}
                alt={IMAGES.lampTable.alt}
                fill
                priority
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-mist">
              <Image
                src={IMAGES.geometricPotsPair.src}
                alt={IMAGES.geometricPotsPair.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-graphite/10 bg-paper/95 px-4 py-3 shadow-[0_12px_30px_-12px_rgba(32,35,41,0.35)] backdrop-blur sm:left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-graphite">
              <Layers aria-hidden="true" className="size-5" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-display font-semibold text-graphite">Capa por capa</span>
              <span className="text-ink-muted">{BRAND.slogan}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
