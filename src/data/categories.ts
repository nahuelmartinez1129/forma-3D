import type { Category, CategoryId } from "../lib/types";
import { IMAGES } from "./images";

export const CATEGORIES: Category[] = [
  {
    id: "organizacion",
    name: "Organización",
    description: "Orden práctico para el escritorio, el baño y cada rincón.",
    image: IMAGES.deskOrganizer,
  },
  {
    id: "decoracion",
    name: "Decoración",
    description: "Piezas con volumen, luz y textura para tus espacios.",
    image: IMAGES.lampScene,
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Pequeños objetos útiles para llevar o regalar.",
    image: IMAGES.keychains,
  },
  {
    id: "escritorio-tecnologia",
    name: "Escritorio y tecnología",
    description: "Soportes pensados para tus dispositivos.",
    image: IMAGES.headphoneStand,
  },
  {
    id: "macetas-soportes",
    name: "Macetas y soportes",
    description: "Formas geométricas y orgánicas para tus plantas.",
    image: IMAGES.geometricPot,
  },
  {
    id: "personalizados",
    name: "Personalizados",
    description: "Nombres, textos y colores a elección, a confirmar.",
    image: IMAGES.letterSign,
  },
];

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((category) => category.id));

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return typeof value === "string" && CATEGORY_IDS.has(value);
}

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find((item) => item.id === id);
  if (!category) throw new Error(`Categoría inexistente: ${id}`);
  return category;
}
