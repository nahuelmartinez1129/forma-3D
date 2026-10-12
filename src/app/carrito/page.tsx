import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá los productos elegidos y enviá tu consulta por WhatsApp.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <p className="eyebrow">Tu selección</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Carrito</h1>
      <CartView />
    </div>
  );
}
