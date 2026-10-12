import { Info } from "lucide-react";

export function DemoBar() {
  return (
    <div className="bg-graphite text-paper">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-[0.72rem] leading-snug sm:text-xs">
        <Info aria-hidden="true" className="hidden size-3.5 shrink-0 text-mint sm:block" />
        <span>
          <strong className="font-semibold text-mint">Demostración de portfolio.</strong> FORMA 3D es una marca ficticia: precios y disponibilidad no son reales.
        </span>
      </p>
    </div>
  );
}
