const numberFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

/** Formatea un importe en pesos argentinos: 11000 → "$11.000". */
export function formatPrice(value: number): string {
  return `$${numberFormatter.format(Math.round(value))}`;
}
