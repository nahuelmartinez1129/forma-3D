// Tipos centrales del catálogo. Todo el contenido editable (productos, categorías,
// imágenes, fabricación) se valida contra estas definiciones.

export type CategoryId =
  | "organizacion"
  | "decoracion"
  | "accesorios"
  | "escritorio-tecnologia"
  | "macetas-soportes"
  | "personalizados";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: ImageAsset;
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** Crédito de la fotografía (las imágenes no pertenecen a FORMA 3D). */
  credit: {
    author: string;
    sourceUrl: string;
  };
}

export type ProductBadge = "destacado" | "nuevo" | "personalizable";

/** Estado ficticio: no representa stock real. */
export type AvailabilityStatus = "stock-demo" | "a-pedido" | "consultar";

export interface ColorChoice {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

export interface OptionChoice {
  id: string;
  label: string;
  /** Diferencia de precio en ARS respecto del precio base. */
  priceDelta?: number;
  available: boolean;
}

/** Opción genérica de variante (tamaño, configuración, accesorios, etc.). */
export interface ProductOption {
  id: string;
  label: string;
  required: boolean;
  choices: OptionChoice[];
}

export interface PersonalizationField {
  id: string;
  label: string;
  placeholder: string;
  maxLength: number;
  required: boolean;
  helpText?: string;
  multiline?: boolean;
}

export interface FabricationDetails {
  /** Medidas orientativas; deben confirmarse con el comercio. */
  approxSize: string;
  /** Notas específicas del producto (uso recomendado, precauciones, etc.). */
  notes: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Precio base demostrativo en ARS. */
  price: number;
  /** La primera categoría es la principal; las demás permiten filtrarlo en más de una. */
  categories: [CategoryId, ...CategoryId[]];
  images: [ImageAsset, ...ImageAsset[]];
  badge?: ProductBadge;
  /** Posición en el orden "Destacados" (menor = primero). */
  featuredRank?: number;
  /** Si es true, aparece en la portada. */
  showOnHome?: boolean;
  colors: ColorChoice[];
  options: ProductOption[];
  personalization: PersonalizationField[];
  availability: AvailabilityStatus;
  fabrication: FabricationDetails;
}

/** Configuración elegida por el usuario para un producto. */
export interface ProductSelection {
  colorId: string | null;
  options: Record<string, string>;
  personalization: Record<string, string>;
}

export interface CartItem {
  /** Clave única por configuración: mismo producto con otras variantes = otra línea. */
  key: string;
  productId: string;
  selection: ProductSelection;
  quantity: number;
}

/** Línea del carrito ya resuelta contra los datos de productos. */
export interface ResolvedCartLine {
  item: CartItem;
  product: Product;
  unitPrice: number;
  subtotal: number;
  /** Descripciones legibles de las variantes elegidas ("Color: Negro grafito"). */
  details: string[];
  /** Personalización con su etiqueta ("Nombre: Sofi"). */
  personalization: string[];
}

export type SortOrder = "destacados" | "precio-asc" | "precio-desc";

export interface CatalogFilters {
  category: CategoryId | null;
  query: string;
  sort: SortOrder;
}

export type SelectionError = {
  field: string;
  message: string;
};
