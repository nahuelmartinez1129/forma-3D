import Link from "next/link";
import { BRAND } from "@/config/brand";

interface LogoProps {
  tone?: "dark" | "light";
  showDescriptor?: boolean;
}

/** Logotipo tipográfico: "FORMA" como palabra principal y "3D" destacado en un bloque azul con capas. */
export function Logo({ tone = "dark", showDescriptor = false }: LogoProps) {
  const text = tone === "dark" ? "text-graphite" : "text-paper";
  return (
    <Link href="/" className={`group inline-flex flex-col leading-none ${text}`} aria-label={`${BRAND.name}, ir al inicio`}>
      <span className="flex items-center gap-1.5">
        <span className="font-display text-[1.45rem] font-bold tracking-[-0.04em]">FORMA</span>
        <span className="relative inline-flex h-[1.6rem] items-center overflow-hidden rounded-[0.4rem] bg-electric px-1.5 font-display text-[0.95rem] font-bold tracking-tight text-white transition-transform duration-300 group-hover:-rotate-3">
          <span aria-hidden="true" className="layer-lines-light absolute inset-0" />
          <span className="relative">3D</span>
        </span>
      </span>
      {showDescriptor ? (
        <span className={`mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-ink-muted" : "text-paper/70"}`}>
          {BRAND.descriptor}
        </span>
      ) : null}
    </Link>
  );
}
