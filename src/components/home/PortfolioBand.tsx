import { PORTFOLIO } from "@/config/brand";

/** Banda final orientada a emprendedores: explica que el sitio es una demostración. */
export function PortfolioBand() {
  return (
    <section aria-labelledby="portfolio-titulo" className="px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-electric px-6 py-12 text-white sm:px-12 sm:py-16">
        <div aria-hidden="true" className="layer-lines-light absolute inset-0" />
        <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full border-[28px] border-mint/40" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Proyecto de demostración</p>
          <h2 id="portfolio-titulo" className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-balance sm:text-4xl">
            ¿Tenés un emprendimiento en {PORTFOLIO.market.split(",")[0]}?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            Este catálogo es un ejemplo de cómo un emprendimiento de {PORTFOLIO.market} puede mostrar sus productos,
            informar precios, ofrecer variantes y recibir consultas por WhatsApp, sin pagar plataformas de venta
            ni administrar un sistema complejo.
          </p>
        </div>
      </div>
    </section>
  );
}
