"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/config/navigation";

export function MobileMenu() {
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // El menú queda abierto solo en la ruta donde se abrió: si se navega, se cierra.
  const isOpen = openedAt !== null && openedAt === pathname;

  function close() {
    setOpenedAt(null);
    openButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedAt(null);
        openButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="menu-movil"
        aria-label="Abrir menú"
        onClick={() => setOpenedAt(pathname)}
        className="inline-flex size-11 items-center justify-center rounded-full text-graphite transition-colors hover:bg-mist"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!isOpen}
        className="fixed inset-0 z-50 overflow-y-auto bg-paper"
      >
        <div className="mx-auto flex min-h-full max-w-7xl flex-col px-5 pb-8 sm:px-8">
          <div className="flex h-[4.25rem] items-center justify-between">
            <div onClick={() => setOpenedAt(null)}>
              <Logo />
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Cerrar menú"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full text-graphite transition-colors hover:bg-mist"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <nav aria-label="Menú móvil" className="mt-4">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="border-b border-graphite/10">
                  <Link
                    href={link.href}
                    onClick={() => setOpenedAt(null)}
                    className="flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight text-graphite"
                  >
                    <span>
                      <span aria-hidden="true" className="mr-3 align-middle text-xs font-medium text-electric">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-graphite/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/carrito" onClick={() => setOpenedAt(null)} className="btn btn-primary mt-8 w-full">
            Ver carrito
          </Link>
          <div aria-hidden="true" className="layer-lines mt-auto h-24 rounded-2xl opacity-70" />
        </div>
      </div>
    </div>
  );
}
