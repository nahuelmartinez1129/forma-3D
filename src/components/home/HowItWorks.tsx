import { MessagesSquare, Search, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    icon: Search,
    title: "Elegí tu producto",
    text: "Explorá el catálogo y encontrá el objeto que necesitás.",
  },
  {
    icon: SlidersHorizontal,
    title: "Configurá tu pedido",
    text: "Elegí las opciones disponibles y enviá tu consulta por WhatsApp.",
  },
  {
    icon: MessagesSquare,
    title: "Confirmá los detalles",
    text: "El comercio confirma disponibilidad, posibles personalizaciones, precio final y condiciones de entrega.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="border-y border-graphite/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          id="como-funciona-titulo"
          eyebrow="Cómo funciona"
          title="Tres pasos, sin vueltas"
          description="Sin registros ni pagos en línea: tu pedido empieza como una consulta."
          align="center"
        />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-3">
          <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-11 hidden border-t-2 border-dashed border-graphite/15 md:block" />
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-[1.6rem] border border-graphite/10 bg-paper p-7 text-center">
              <span className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-graphite text-paper">
                <Icon aria-hidden="true" className="size-7" strokeWidth={1.6} />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-mint font-display text-xs font-bold text-graphite">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                <span className="sr-only">Paso {index + 1}. </span>
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
