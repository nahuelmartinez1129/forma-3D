"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-store";

export function CartIndicator() {
  const { count } = useCart();
  const label = count === 0 ? "Carrito vacío" : `Carrito: ${count} ${count === 1 ? "producto" : "productos"}`;

  return (
    <Link
      href="/carrito"
      aria-label={label}
      className="relative inline-flex size-11 items-center justify-center rounded-full text-graphite transition-colors hover:bg-mist"
    >
      <ShoppingBag aria-hidden="true" className="size-[1.35rem]" strokeWidth={1.8} />
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-0.5 flex min-w-5 items-center justify-center rounded-full bg-electric px-1 text-[0.68rem] font-bold leading-5 text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
