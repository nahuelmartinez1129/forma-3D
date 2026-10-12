import { Layers, Ruler } from "lucide-react";
import { FABRICATION } from "@/config/fabrication";
import type { FabricationDetails } from "@/lib/types";

export function FabricationInfo({ details }: { details: FabricationDetails }) {
  const materials = FABRICATION.confirmedMaterials;
  return (
    <section aria-labelledby="fabricacion-titulo" className="rounded-[1.6rem] border border-graphite/10 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-graphite">
          <Layers aria-hidden="true" className="size-5" />
        </span>
        <h2 id="fabricacion-titulo" className="font-display text-lg font-semibold">
          Información de fabricación
        </h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{FABRICATION.summary}</p>
      <dl className="mt-5 grid gap-4 text-sm">
        <div className="flex gap-3">
          <Ruler aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
          <div>
            <dt className="font-bold text-graphite">Medidas orientativas</dt>
            <dd className="text-ink-muted">{details.approxSize}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Layers aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
          <div>
            <dt className="font-bold text-graphite">Material y terminación</dt>
            <dd className="text-ink-muted">
              {materials.length > 0
                ? materials.map((material) => `${material.name}: ${material.description}`).join(" · ")
                : FABRICATION.unconfirmedMaterialText}
            </dd>
          </div>
        </div>
      </dl>
      <ul className="mt-5 space-y-1.5 border-t border-graphite/10 pt-5 text-xs leading-relaxed text-ink-muted">
        {[...details.notes, ...FABRICATION.generalNotes].map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-electric" />
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}
