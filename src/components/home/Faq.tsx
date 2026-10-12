import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/data/faq";

export function Faq() {
  return (
    <section id="preguntas-frecuentes" aria-labelledby="faq-titulo" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-titulo"
            eyebrow="Preguntas frecuentes"
            title="Lo que conviene saber antes de consultar"
            description="Si tu duda no aparece acá, escribinos por WhatsApp."
          />
        </div>
        <div className="divide-y divide-graphite/10 border-y border-graphite/10">
          {FAQ.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-tight text-graphite [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-graphite/15 transition-all duration-300 group-open:rotate-45 group-open:border-electric group-open:bg-electric group-open:text-white"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="pb-6 pr-12 leading-relaxed text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
