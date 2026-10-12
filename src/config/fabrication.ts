// Información de fabricación centralizada y editable.
// No incluir materiales, resistencias, aptitud alimentaria, térmica o para exteriores
// hasta que el comercio los haya verificado.

export interface MaterialInfo {
  name: string;
  description: string;
}

export const FABRICATION = {
  process: "Impresión 3D",
  summary:
    "Cada objeto se fabrica capa por capa mediante impresión 3D. Por eso pueden presentarse pequeñas variaciones de textura, tono y terminación entre una pieza y otra: son parte del proceso, no un defecto.",
  /**
   * Materiales confirmados por el comercio. Mientras la lista esté vacía, el sitio
   * indica que el material se confirma al momento de la consulta.
   */
  confirmedMaterials: [] as MaterialInfo[],
  unconfirmedMaterialText:
    "El material y la terminación se confirman con el comercio al momento de la consulta.",
  /** Aclaraciones generales que se muestran en la ficha de cada producto. */
  generalNotes: [
    "Las medidas son orientativas y pueden variar según el diseño final.",
    "Los colores en pantalla pueden diferir levemente del color real.",
    "Los tiempos de fabricación y entrega se coordinan con el comercio.",
  ],
} as const;
