import type { ProductBadge as Badge } from "@/lib/types";
import { BADGE_LABELS, BADGE_STYLES } from "./labels";

export function ProductBadge({ badge, className = "" }: { badge: Badge; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${BADGE_STYLES[badge]} ${className}`}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
