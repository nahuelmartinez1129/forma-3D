import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { BRAND, PORTFOLIO } from "@/config/brand";
import { NAV_LINKS } from "@/config/navigation";
import { CATEGORIES } from "@/data/categories";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-paper">
      <div aria-hidden="true" className="layer-lines-light absolute inset-x-0 top-0 h-40 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo tone="light" showDescriptor />
            <p className="mt-6 text-sm leading-relaxed text-paper/70">
              {BRAND.slogan}. Objetos funcionales, decoración y accesorios fabricados en 3D.
            </p>
            <div className="mt-6">
              <WhatsAppLink
                message={`Hola, ${BRAND.name}. Quiero hacer una consulta.`}
                label="Escribinos por WhatsApp"
                className="btn btn-whatsapp"
              />
            </div>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-mint">Navegación</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper/75 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/carrito" className="text-paper/75 transition-colors hover:text-paper">
                  Carrito
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-mint">Categorías</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalogo?categoria=${category.id}`}
                    className="text-paper/75 transition-colors hover:text-paper"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalogo" className="font-semibold text-paper transition-colors hover:text-mint">
                  Ver todo el catálogo →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-mint">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>Consultas y pedidos por WhatsApp.</li>
              <li>
                {BRAND.demoSocial.network}: <span className="text-paper">{BRAND.demoSocial.handle}</span>{" "}
                <span className="ml-1 rounded-full border border-paper/25 px-2 py-0.5 text-[0.68rem] uppercase tracking-wider text-paper/60">
                  perfil ficticio
                </span>
              </li>
              <li>
                <Link href="/creditos" className="underline decoration-paper/30 underline-offset-4 hover:text-paper">
                  Créditos de imágenes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="aviso-demo" className="mt-14 rounded-2xl border border-paper/15 bg-paper/5 p-5 text-sm leading-relaxed text-paper/75">
          <p>
            <strong className="text-mint">Aviso:</strong> {BRAND.demoNotice} Las fotografías son imágenes de referencia
            de bancos libres y no muestran productos fabricados por la marca.
          </p>
          <p className="mt-2">
            Proyecto de portfolio que muestra cómo un emprendimiento de {PORTFOLIO.market} puede presentar su catálogo
            y recibir consultas por WhatsApp
            {PORTFOLIO.authorName ? (
              <>
                {" "}— desarrollado por{" "}
                {PORTFOLIO.contactUrl ? (
                  <a href={PORTFOLIO.contactUrl} className="font-semibold text-paper underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    {PORTFOLIO.authorName}
                  </a>
                ) : (
                  <span className="font-semibold text-paper">{PORTFOLIO.authorName}</span>
                )}
              </>
            ) : null}
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {BRAND.name} · Marca ficticia de demostración
          </p>
          <p>{BRAND.descriptor}</p>
        </div>
      </div>
    </footer>
  );
}
