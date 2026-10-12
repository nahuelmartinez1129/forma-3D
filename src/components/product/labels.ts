import type { AvailabilityStatus, ProductBadge } from "@/lib/types";

export const BADGE_LABELS: Record<ProductBadge, string> = {
  destacado: "Destacado",
  nuevo: "Nuevo",
  personalizable: "Personalizable",
};

export const BADGE_STYLES: Record<ProductBadge, string> = {
  destacado: "bg-graphite text-paper",
  nuevo: "bg-mint text-graphite",
  personalizable: "bg-electric text-white",
};

export const AVAILABILITY: Record<AvailabilityStatus, { label: string; description: string; dot: string }> = {
  "stock-demo": {
    label: "Stock de muestra",
    description: "Estado ficticio: la disponibilidad real se confirma al consultar.",
    dot: "bg-emerald-500",
  },
  "a-pedido": {
    label: "Se fabrica a pedido",
    description: "Los tiempos de fabricación se coordinan con el comercio.",
    dot: "bg-electric",
  },
  consultar: {
    label: "Consultar disponibilidad",
    description: "Escribinos para confirmar opciones y disponibilidad.",
    dot: "bg-amber-500",
  },
};
