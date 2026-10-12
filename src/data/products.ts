import type { ColorChoice, Product } from "../lib/types";
import { IMAGES } from "./images";

// Catálogo ficticio. Precios en ARS exclusivamente demostrativos.
// Para editar un producto, modificá su entrada; para agregar uno, copiá una existente
// y cambiá `id` y `slug` (ambos deben ser únicos).

/** Paleta de colores disponible. `available: false` muestra la opción bloqueada. */
const COLOR = {
  grafito: { id: "negro-grafito", name: "Negro grafito", hex: "#202329", available: true },
  blanco: { id: "blanco", name: "Blanco", hex: "#F4F4F0", available: true },
  gris: { id: "gris-claro", name: "Gris claro", hex: "#C9CDD3", available: true },
  azul: { id: "azul-electrico", name: "Azul eléctrico", hex: "#5267E8", available: true },
  menta: { id: "verde-menta", name: "Verde menta", hex: "#A6E5CC", available: true },
  terracota: { id: "terracota", name: "Terracota", hex: "#C8714E", available: true },
  rosa: { id: "rosa-pastel", name: "Rosa pastel", hex: "#F2C4CE", available: true },
  marfil: { id: "marfil", name: "Marfil", hex: "#EFE7D6", available: true },
} satisfies Record<string, ColorChoice>;

/** Devuelve una copia del color marcada como no disponible. */
function unavailable(color: ColorChoice): ColorChoice {
  return { ...color, available: false };
}

export const PRODUCTS: Product[] = [
  {
    id: "f3d-001",
    slug: "organizador-modular-de-escritorio",
    name: "Organizador modular de escritorio",
    shortDescription: "Compartimentos combinables para lápices, notas y pequeños objetos.",
    description:
      "Un organizador pensado para crecer con tu escritorio. Sus módulos encastran entre sí para que armes la combinación que necesitás: lápices, tarjetas, cables cortos o cuadernos pequeños. Líneas limpias y un volumen compacto que acompaña cualquier espacio de trabajo.",
    price: 8500,
    categories: ["organizacion", "escritorio-tecnologia"],
    images: [IMAGES.deskOrganizer, IMAGES.penHolder],
    badge: "destacado",
    featuredRank: 1,
    showOnHome: true,
    colors: [COLOR.blanco, COLOR.grafito, COLOR.gris, COLOR.azul, unavailable(COLOR.menta)],
    options: [
      {
        id: "configuracion",
        label: "Configuración",
        required: true,
        choices: [
          { id: "3-modulos", label: "3 módulos", available: true },
          { id: "5-modulos", label: "5 módulos", priceDelta: 3500, available: true },
        ],
      },
    ],
    personalization: [
      {
        id: "iniciales",
        label: "Iniciales grabadas (opcional)",
        placeholder: "Ej.: MJ",
        maxLength: 3,
        required: false,
        helpText: "Hasta 3 caracteres. El diseño final se confirma con el comercio.",
      },
    ],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 20 × 10 × 9 cm en la versión de 3 módulos (orientativo).",
      notes: ["Los módulos se entregan separados para que elijas su disposición."],
    },
  },
  {
    id: "f3d-002",
    slug: "soporte-para-celular",
    name: "Soporte para celular",
    shortDescription: "Mantiene tu celular a la vista para videollamadas, recetas o videos.",
    description:
      "Un soporte de perfil bajo que sostiene el celular en un ángulo cómodo, tanto vertical como horizontal. Deja espacio para el cable de carga y ocupa muy poco lugar sobre el escritorio, la mesada o la mesa de luz.",
    price: 6000,
    categories: ["accesorios", "escritorio-tecnologia"],
    images: [IMAGES.phoneStand, IMAGES.phoneStandDark],
    badge: "destacado",
    featuredRank: 2,
    showOnHome: true,
    colors: [COLOR.grafito, COLOR.blanco, COLOR.azul, COLOR.gris],
    options: [],
    personalization: [],
    availability: "stock-demo",
    fabrication: {
      approxSize: "Aprox. 8 × 9 × 11 cm (orientativo).",
      notes: ["Compatible con la mayoría de los celulares; confirmá el modelo si usás una funda gruesa."],
    },
  },
  {
    id: "f3d-003",
    slug: "soporte-para-auriculares",
    name: "Soporte para auriculares",
    shortDescription: "Un lugar fijo para tus auriculares de vincha, sin enredos.",
    description:
      "Diseñado para que los auriculares de vincha descansen sin presionar las almohadillas. Su base estable y su silueta curva lo convierten en un objeto decorativo cuando no está en uso.",
    price: 12000,
    categories: ["escritorio-tecnologia"],
    images: [IMAGES.headphoneStand, IMAGES.headphoneStandWood],
    badge: "nuevo",
    featuredRank: 6,
    colors: [COLOR.grafito, COLOR.blanco, COLOR.gris],
    options: [
      {
        id: "base",
        label: "Base",
        required: true,
        choices: [
          { id: "simple", label: "Base simple", available: true },
          {
            id: "con-guia-de-cable",
            label: "Base con guía de cable",
            priceDelta: 2500,
            available: true,
          },
        ],
      },
    ],
    personalization: [],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 12 × 12 × 26 cm (orientativo).",
      notes: [],
    },
  },
  {
    id: "f3d-004",
    slug: "maceta-geometrica-pequena",
    name: "Maceta geométrica pequeña",
    shortDescription: "Facetas marcadas para suculentas y cactus de escritorio.",
    description:
      "Una maceta compacta de caras geométricas que juega con la luz y las sombras. Ideal para suculentas, cactus o plantas pequeñas en estantes, escritorios y ventanas.",
    price: 7500,
    categories: ["macetas-soportes", "decoracion"],
    images: [IMAGES.geometricPot, IMAGES.geometricPotsPair],
    featuredRank: 7,
    colors: [COLOR.menta, COLOR.blanco, COLOR.gris, COLOR.terracota, unavailable(COLOR.rosa)],
    options: [
      {
        id: "plato",
        label: "Plato inferior",
        required: true,
        choices: [
          { id: "sin-plato", label: "Sin plato", available: true },
          { id: "con-plato", label: "Con plato", priceDelta: 1500, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "stock-demo",
    fabrication: {
      approxSize: "Aprox. 9 cm de diámetro × 8 cm de alto (orientativo).",
      notes: ["Consultá con el comercio si la pieza es apta para riego directo o si conviene usar una maceta interior."],
    },
  },
  {
    id: "f3d-005",
    slug: "maceta-geometrica-grande",
    name: "Maceta geométrica grande",
    shortDescription: "La versión amplia de nuestra maceta facetada, para plantas de interior.",
    description:
      "El mismo lenguaje geométrico en un tamaño generoso, pensado para plantas de interior medianas. Funciona sola o combinada con la versión pequeña para armar composiciones en distintas alturas.",
    price: 12500,
    categories: ["macetas-soportes", "decoracion"],
    images: [IMAGES.geometricPotsPair, IMAGES.patternPot],
    badge: "destacado",
    featuredRank: 4,
    showOnHome: true,
    colors: [COLOR.menta, COLOR.blanco, COLOR.grafito, COLOR.terracota],
    options: [
      {
        id: "plato",
        label: "Plato inferior",
        required: true,
        choices: [
          { id: "sin-plato", label: "Sin plato", available: true },
          { id: "con-plato", label: "Con plato", priceDelta: 2000, available: false },
        ],
      },
    ],
    personalization: [],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 16 cm de diámetro × 14 cm de alto (orientativo).",
      notes: ["Consultá con el comercio si la pieza es apta para riego directo o si conviene usar una maceta interior."],
    },
  },
  {
    id: "f3d-006",
    slug: "lampara-decorativa",
    name: "Lámpara decorativa",
    shortDescription: "Pantalla ondulada que convierte la luz en textura.",
    description:
      "Una lámpara de mesa cuya pantalla, formada por capas finas, difumina la luz y dibuja líneas suaves sobre su superficie. Un objeto protagonista para livings, dormitorios o estudios.",
    price: 24000,
    categories: ["decoracion"],
    images: [IMAGES.lampTable, IMAGES.lampScene, IMAGES.lampGlow],
    badge: "destacado",
    featuredRank: 3,
    showOnHome: true,
    colors: [COLOR.blanco, COLOR.marfil, unavailable(COLOR.gris)],
    options: [
      {
        id: "tamano",
        label: "Tamaño",
        required: true,
        choices: [
          { id: "mediana", label: "Mediana", available: true },
          { id: "grande", label: "Grande", priceDelta: 8000, available: false },
        ],
      },
    ],
    personalization: [],
    availability: "consultar",
    fabrication: {
      approxSize: "Mediana: aprox. 15 cm de diámetro × 22 cm de alto (orientativo).",
      notes: [
        "Los componentes eléctricos (portalámparas, cable, lámpara) y sus características deben confirmarse con el comercio.",
      ],
    },
  },
  {
    id: "f3d-007",
    slug: "porta-sahumerios-geometrico",
    name: "Porta sahumerios geométrico",
    shortDescription: "Pétalos facetados que recogen la ceniza con estilo.",
    description:
      "Un pequeño objeto ritual de geometría floral. Sostiene el sahumerio en el centro y su forma de pétalos ayuda a contener la ceniza.",
    price: 5500,
    categories: ["decoracion"],
    images: [IMAGES.incenseHolder, IMAGES.incenseHolderTop],
    featuredRank: 10,
    colors: [COLOR.grafito, COLOR.blanco, COLOR.terracota],
    options: [],
    personalization: [],
    availability: "stock-demo",
    fabrication: {
      approxSize: "Aprox. 10 cm de diámetro (orientativo).",
      notes: [
        "Consultá con el comercio el uso recomendado y las precauciones con brasas y calor antes de usarlo.",
      ],
    },
  },
  {
    id: "f3d-008",
    slug: "organizador-de-cables",
    name: "Organizador de cables",
    shortDescription: "Clips para mantener cargadores y cables siempre en su lugar.",
    description:
      "Pequeños organizadores para fijar cables al borde del escritorio o enrollar cargadores. Un detalle simple que hace una gran diferencia en el orden diario.",
    price: 3500,
    categories: ["organizacion", "escritorio-tecnologia"],
    images: [IMAGES.cableOrganizer],
    badge: "nuevo",
    featuredRank: 9,
    colors: [COLOR.grafito, COLOR.blanco, COLOR.azul, COLOR.menta],
    options: [
      {
        id: "pack",
        label: "Presentación",
        required: true,
        choices: [
          { id: "pack-3", label: "Pack x3", available: true },
          { id: "pack-6", label: "Pack x6", priceDelta: 2500, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "stock-demo",
    fabrication: {
      approxSize: "Cada clip mide aprox. 4 × 3 cm (orientativo).",
      notes: ["El método de fijación se confirma con el comercio según la superficie."],
    },
  },
  {
    id: "f3d-009",
    slug: "soporte-para-controles-de-videojuegos",
    name: "Soporte para controles de videojuegos",
    shortDescription: "Tus joysticks ordenados y a mano junto a la consola.",
    description:
      "Un soporte que mantiene los controles en posición vertical, ordenados y listos para jugar. Su base ancha le da estabilidad junto al televisor o al monitor.",
    price: 9000,
    categories: ["escritorio-tecnologia"],
    images: [IMAGES.controllerStand, IMAGES.controllers],
    featuredRank: 11,
    colors: [COLOR.grafito, COLOR.blanco, COLOR.gris],
    options: [
      {
        id: "capacidad",
        label: "Capacidad",
        required: true,
        choices: [
          { id: "1-control", label: "1 control", available: true },
          { id: "2-controles", label: "2 controles", priceDelta: 3000, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 10 × 9 × 12 cm en la versión para 1 control (orientativo).",
      notes: ["Indicá el modelo de control en tu consulta para confirmar la compatibilidad."],
    },
  },
  {
    id: "f3d-010",
    slug: "llavero-personalizado",
    name: "Llavero personalizado",
    shortDescription: "Tu nombre o una palabra corta en relieve.",
    description:
      "Un llavero liviano con el texto que elijas en relieve. Una buena idea para regalos, souvenirs o para identificar llaves rápidamente.",
    price: 2500,
    categories: ["accesorios", "personalizados"],
    images: [IMAGES.keychains, IMAGES.letterM],
    badge: "personalizable",
    featuredRank: 5,
    showOnHome: true,
    colors: [COLOR.azul, COLOR.grafito, COLOR.blanco, COLOR.menta, COLOR.rosa, COLOR.terracota],
    options: [],
    personalization: [
      {
        id: "texto",
        label: "Nombre o texto",
        placeholder: "Ej.: Sofi",
        maxLength: 12,
        required: true,
        helpText: "Hasta 12 caracteres. Se confirma la legibilidad antes de fabricar.",
      },
    ],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 6 × 2,5 cm según el largo del texto (orientativo).",
      notes: [],
    },
  },
  {
    id: "f3d-011",
    slug: "cartel-decorativo-con-nombre",
    name: "Cartel decorativo con nombre",
    shortDescription: "Letras con volumen para cuartos, estudios o emprendimientos.",
    description:
      "Un cartel de letras con volumen y trazo geométrico para identificar un espacio o darle personalidad a una pared o estante. Elegí el texto, el color y el tamaño, y lo revisamos juntos antes de fabricarlo.",
    price: 8000,
    categories: ["decoracion", "personalizados"],
    images: [IMAGES.letterSign, IMAGES.letterM],
    badge: "personalizable",
    featuredRank: 8,
    colors: [COLOR.blanco, COLOR.grafito, COLOR.azul, COLOR.menta, COLOR.rosa],
    options: [
      {
        id: "tamano",
        label: "Ancho aproximado",
        required: true,
        choices: [
          { id: "20cm", label: "20 cm", available: true },
          { id: "30cm", label: "30 cm", priceDelta: 3500, available: true },
          { id: "45cm", label: "45 cm", priceDelta: 7500, available: false },
        ],
      },
    ],
    personalization: [
      {
        id: "nombre",
        label: "Texto del cartel",
        placeholder: "Ej.: Martina",
        maxLength: 14,
        required: true,
        helpText: "Hasta 14 caracteres.",
      },
      {
        id: "indicaciones",
        label: "Indicaciones (opcional)",
        placeholder: "Ej.: todo en minúsculas, con un corazón al final",
        maxLength: 120,
        required: false,
        multiline: true,
      },
    ],
    availability: "a-pedido",
    fabrication: {
      approxSize: "El alto de las letras depende del largo del texto (orientativo).",
      notes: ["El método de colocación (apoyado o colgado) se coordina con el comercio."],
    },
  },
  {
    id: "f3d-012",
    slug: "organizador-de-maquillaje",
    name: "Organizador de maquillaje",
    shortDescription: "Compartimentos a medida para brochas, labiales y frascos.",
    description:
      "Un organizador con compartimentos de distintas alturas para tener a la vista brochas, labiales, bases y frascos. Pensado para tocadores, baños y estantes.",
    price: 10500,
    categories: ["organizacion"],
    images: [IMAGES.makeupOrganizer],
    badge: "nuevo",
    featuredRank: 12,
    colors: [COLOR.blanco, COLOR.rosa, COLOR.menta, unavailable(COLOR.grafito)],
    options: [
      {
        id: "cajon",
        label: "Cajón inferior",
        required: true,
        choices: [
          { id: "sin-cajon", label: "Sin cajón", available: true },
          { id: "con-cajon", label: "Con cajón", priceDelta: 4000, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Aprox. 24 × 14 × 12 cm (orientativo).",
      notes: [],
    },
  },
  {
    id: "f3d-013",
    slug: "soporte-para-tablet",
    name: "Soporte para tablet",
    shortDescription: "Ángulo cómodo para leer, dibujar o seguir una receta.",
    description:
      "Un soporte firme para tablets que mantiene la pantalla a una inclinación cómoda. Ideal para leer, ver contenido o tener una receta a la vista en la cocina.",
    price: 11500,
    categories: ["escritorio-tecnologia"],
    images: [IMAGES.tabletStand],
    featuredRank: 13,
    colors: [COLOR.gris, COLOR.grafito, COLOR.blanco],
    options: [
      {
        id: "tamano-tablet",
        label: "Tamaño de tablet",
        required: true,
        choices: [
          { id: "hasta-11", label: "Hasta 11 pulgadas", available: true },
          { id: "hasta-13", label: "Hasta 13 pulgadas", priceDelta: 2000, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "consultar",
    fabrication: {
      approxSize: "Aprox. 14 × 12 × 16 cm para tablets de hasta 11 pulgadas (orientativo).",
      notes: ["Indicá el modelo de tu tablet en la consulta para confirmar la compatibilidad."],
    },
  },
  {
    id: "f3d-014",
    slug: "figura-decorativa-abstracta",
    name: "Figura decorativa abstracta",
    shortDescription: "Volúmenes facetados para estantes y bibliotecas.",
    description:
      "Una escultura de pequeño formato construida a partir de planos y aristas. Suma interés visual a estantes, bibliotecas o escritorios y cambia de carácter según la luz.",
    price: 9500,
    categories: ["decoracion"],
    images: [IMAGES.lowPolyFigure, IMAGES.abstractCurves],
    featuredRank: 14,
    colors: [COLOR.gris, COLOR.blanco, COLOR.azul, COLOR.grafito],
    options: [
      {
        id: "tamano",
        label: "Tamaño",
        required: true,
        choices: [
          { id: "pequena", label: "Pequeña", available: true },
          { id: "mediana", label: "Mediana", priceDelta: 3000, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "stock-demo",
    fabrication: {
      approxSize: "Pequeña: aprox. 12 cm de alto (orientativo).",
      notes: [],
    },
  },
  {
    id: "f3d-015",
    slug: "maceta-con-diseno-organico",
    name: "Maceta con diseño orgánico",
    shortDescription: "Curvas en espiral que dejan ver cada capa de impresión.",
    description:
      "Una maceta de líneas fluidas en espiral donde la textura de las capas se vuelve parte del diseño. Pensada para plantas de interior y para destacarse incluso vacía.",
    price: 14000,
    categories: ["macetas-soportes", "decoracion"],
    images: [IMAGES.spiralVase, IMAGES.plantPot],
    badge: "nuevo",
    featuredRank: 15,
    showOnHome: true,
    colors: [COLOR.azul, COLOR.terracota, COLOR.blanco, COLOR.menta, unavailable(COLOR.rosa)],
    options: [
      {
        id: "tamano",
        label: "Tamaño",
        required: true,
        choices: [
          { id: "mediana", label: "Mediana", available: true },
          { id: "grande", label: "Grande", priceDelta: 5000, available: true },
        ],
      },
    ],
    personalization: [],
    availability: "a-pedido",
    fabrication: {
      approxSize: "Mediana: aprox. 13 cm de diámetro × 18 cm de alto (orientativo).",
      notes: ["Consultá con el comercio si la pieza es apta para riego directo o si conviene usar una maceta interior."],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getHomeProducts(): Product[] {
  return PRODUCTS.filter((product) => product.showOnHome).sort(
    (a, b) => (a.featuredRank ?? Infinity) - (b.featuredRank ?? Infinity),
  );
}

/** Productos relacionados: primero los que comparten categoría principal, luego el resto. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const [mainCategory] = product.categories;
  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.categories.includes(mainCategory));
  const rest = others.filter((item) => !item.categories.includes(mainCategory));
  return [...sameCategory, ...rest].slice(0, limit);
}
