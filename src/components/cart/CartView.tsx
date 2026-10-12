"use client";

import { ArrowLeft, Info, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-store";
import { CartLineItem } from "./CartLineItem";
import { WhatsAppCheckout } from "./WhatsAppCheckout";

export function CartView() {
  const { ready, lines, count, total, setQuantity, remove, clear } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!ready) {
    return (
      <div aria-busy="true" className="mt-10 space-y-4">
        <span className="sr-only">Cargando carrito…</span>
        {[0, 1].map((key) => (
          <div key={key} className="h-32 animate-pulse rounded-2xl bg-mist" />
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-[1.75rem] border border-dashed border-graphite/20 bg-white px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-mist">
          <ShoppingBag aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">Tu carrito está vacío</h2>
        <p className="mt-2 max-w-md text-ink-muted">
          Explorá el catálogo, elegí las opciones de cada producto y armá tu consulta.
        </p>
        <Link href="/catalogo" className="btn btn-primary mt-6">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-12">
      <div>
        <ul className="divide-y divide-graphite/10 border-y border-graphite/10">
          {lines.map((line) => (
            <CartLineItem
              key={line.item.key}
              line={line}
              onQuantityChange={(quantity) => setQuantity(line.item.key, quantity)}
              onRemove={() => remove(line.item.key)}
            />
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-sm font-bold text-electric-dark hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Continuar comprando
          </Link>
          {confirmClear ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">¿Vaciar el carrito?</span>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setConfirmClear(false);
                }}
                className="rounded-full bg-graphite px-3 py-1.5 font-semibold text-paper"
              >
                Sí, vaciar
              </button>
              <button type="button" onClick={() => setConfirmClear(false)} className="rounded-full px-3 py-1.5 font-semibold hover:bg-mist">
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-ink-muted hover:bg-mist hover:text-graphite"
            >
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      <aside aria-labelledby="resumen-titulo" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[1.75rem] border border-graphite/10 bg-white p-6">
          <h2 id="resumen-titulo" className="font-display text-xl font-semibold">
            Resumen de la consulta
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            {lines.map((line) => (
              <div key={line.item.key} className="flex justify-between gap-4">
                <dt className="text-ink-muted">
                  {line.product.name} × {line.item.quantity}
                </dt>
                <dd className="shrink-0 font-semibold">{formatPrice(line.subtotal)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 border-t border-graphite/10 pt-4">
              <dt className="font-bold">
                Total estimado
                <span className="block text-xs font-medium text-ink-muted">
                  {count} {count === 1 ? "unidad" : "unidades"}
                </span>
              </dt>
              <dd className="font-display text-3xl font-semibold tracking-tight">{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-5 flex gap-2 rounded-xl bg-mist/60 p-3 text-xs leading-relaxed text-graphite/80">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-dark" />
            Esto no es una compra: es una consulta. El comercio confirma disponibilidad, precio final, tiempos y entrega
            por WhatsApp. No se realizan pagos en este sitio.
          </p>
          <div className="mt-5">
            <WhatsAppCheckout lines={lines} />
          </div>
        </div>
      </aside>
    </div>
  );
}
