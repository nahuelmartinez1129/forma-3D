import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="layer-lines absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center">
        <p className="font-display text-8xl font-bold tracking-[-0.06em] text-electric">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">Esta página todavía no tomó forma</h1>
        <p className="mt-3 text-ink-muted">El enlace puede estar mal escrito o el producto ya no forma parte del catálogo.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/catalogo" className="btn btn-primary">
            Ir al catálogo
          </Link>
          <Link href="/" className="btn btn-outline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
