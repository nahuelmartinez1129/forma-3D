import type { ImageAsset } from "../lib/types";

// Fotografías de Unsplash (Licencia Unsplash: uso libre, incluso comercial).
// Son imágenes de referencia: no pertenecen a FORMA 3D ni muestran productos fabricados por la marca.
// Para reemplazarlas, cambiá `src` por una URL propia o por una ruta de /public (ej. "/productos/maceta.jpg").

function unsplash(
  photo: string,
  unsplashId: string,
  author: string,
  alt: string,
): ImageAsset {
  return {
    src: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1600&q=80`,
    alt,
    credit: { author, sourceUrl: `https://unsplash.com/photos/${unsplashId}` },
  };
}

export const IMAGES = {
  spiralVase: unsplash(
    "photo-1703221561813-cdaa308cf9e7",
    "C165O0AD8Ec",
    "David Clode",
    "Maceta con relieve en espiral y capas visibles, en tonos violeta y naranja",
  ),
  heartVases: unsplash(
    "photo-1730266387504-b91e002c61b2",
    "KZavTzJzyRw",
    "Vertex Designs",
    "Dos jarrones de formas curvas que encastran entre sí, en color verde agua sobre fondo gris",
  ),
  geometricPotsPair: unsplash(
    "photo-1730266398563-b722b4b68db9",
    "5przPZBLkhE",
    "Vertex Designs",
    "Dos macetas de caras geométricas en color verde menta sobre fondo oscuro",
  ),
  geometricPot: unsplash(
    "photo-1730266432861-526295d015d5",
    "AZkKtwzRzo8",
    "Vertex Designs",
    "Maceta pequeña de facetas geométricas en tono pastel sobre fondo neutro",
  ),
  patternPot: unsplash(
    "photo-1775736300402-320bc6f26845",
    "7yJFi0JsvD0",
    "Phillip Flores",
    "Maceta con patrón geométrico en blanco y negro sobre fondo claro",
  ),
  blackGeometricPlanter: unsplash(
    "photo-1745848038202-a82b6e6ad454",
    "3UB0E1ipQPY",
    "DLXmedia.hu",
    "Planta verde en una maceta geométrica negra con soporte metálico",
  ),
  plantPot: unsplash(
    "photo-1730267252256-67bee55353e8",
    "6610mzPAU3o",
    "Vertex Designs",
    "Maceta de diseño orgánico con una planta suculenta sobre fondo claro",
  ),
  lampTable: unsplash(
    "photo-1732552599124-f3dd512c02ff",
    "6hbEh_1VDhw",
    "Eprojets Lab",
    "Lámpara de mesa con pantalla ondulada de capas impresas, encendida con luz cálida",
  ),
  lampScene: unsplash(
    "photo-1732552232770-1a116f777c93",
    "dgvD77juPZ8",
    "Eprojets Lab",
    "Lámpara blanca de formas onduladas junto a un cactus sobre una mesa turquesa",
  ),
  lampGlow: unsplash(
    "photo-1748682492528-8b0582128c7a",
    "xsM1cG3XRRQ",
    "Alexey Demidov",
    "Primer plano de una lámpara con textura acanalada encendida en un ambiente oscuro",
  ),
  layerTexture: unsplash(
    "photo-1748682492578-513b4f1cfe1c",
    "pgegshOgpvA",
    "Alexey Demidov",
    "Detalle de la textura en capas de una pieza impresa en 3D iluminada desde adentro",
  ),
  phoneStand: unsplash(
    "photo-1760443728221-0feabf5a0130",
    "FpA7Y8c5lOQ",
    "Todd Jiang",
    "Celular apoyado en un soporte minimalista junto a una taza sobre un escritorio claro",
  ),
  phoneStandDark: unsplash(
    "photo-1676300463288-0a1183aef2fa",
    "RRtv4cviT08",
    "Florinel Zone",
    "Celular sobre un soporte de escritorio en una composición de luces y sombras",
  ),
  headphoneStand: unsplash(
    "photo-1646771032150-6243ff3aea4d",
    "8NHxsdy_CII",
    "Charles Patterson",
    "Auriculares de vincha colgados de un soporte negro sobre un escritorio blanco",
  ),
  headphoneStandWood: unsplash(
    "photo-1612465289702-7c84b5258fde",
    "SrJA7t3Tsmc",
    "Faizur Rehman",
    "Auriculares apoyados en un soporte de escritorio junto a una planta",
  ),
  tabletStand: unsplash(
    "photo-1780802369931-d6eee63ea4c2",
    "sIKWKV8IheY",
    "Juan Pablo",
    "Soporte para tablet gris de diseño moderno sobre un escritorio de madera",
  ),
  controllerStand: unsplash(
    "photo-1705910308334-568c0ed901df",
    "Rmgc6xZ_CJA",
    "Rohan Krishnan",
    "Joystick de consola apoyado sobre un soporte de escritorio",
  ),
  controllers: unsplash(
    "photo-1675701298988-eaeb8f3494ff",
    "bCLB7z_gw60",
    "Eugene Chystiakov",
    "Dos joysticks de consola sobre un fondo de colores cálidos",
  ),
  deskOrganizer: unsplash(
    "photo-1777917845221-f92884c1b61b",
    "V-OCHNjTLAU",
    "Sou Jest",
    "Organizador de escritorio blanco con compartimentos y papeles en un escritorio claro",
  ),
  penHolder: unsplash(
    "photo-1751107807635-a2ac6035e8dd",
    "2vrbec8atp0",
    "Zoshua Colah",
    "Portalápices cilíndrico con lapiceras y marcadores sobre un escritorio",
  ),
  cableOrganizer: unsplash(
    "photo-1760348213270-7cd00b8c3405",
    "I_3D0pVrMhY",
    "Bedirhan Gül",
    "Organizador de cables que sostiene un cable blanco enrollado bajo un escritorio",
  ),
  makeupOrganizer: unsplash(
    "photo-1766242281507-dca096a98464",
    "gIi2lPbyQY4",
    "Stacy",
    "Organizador de maquillaje blanco y rosa con compartimentos y cajones",
  ),
  incenseHolder: unsplash(
    "photo-1777441791197-12e47b6986b2",
    "-Nv-e7HJZt4",
    "Roya Hsu",
    "Porta sahumerios con forma de flor de loto sobre una superficie de cemento",
  ),
  incenseHolderTop: unsplash(
    "photo-1777441791200-8f367ded2fa7",
    "hBXMdJinMcQ",
    "Roya Hsu",
    "Vista superior de un porta sahumerios con pétalos geométricos",
  ),
  lowPolyFigure: unsplash(
    "photo-1616427030011-214e41469f40",
    "pikP0UyB7I0",
    "Karl Hornfeldt",
    "Figura decorativa de facetas geométricas en gris sobre fondo oscuro",
  ),
  abstractCurves: unsplash(
    "photo-1782879546823-4aaae7785cba",
    "qBMmtZ5l0CI",
    "Declan Sun",
    "Formas blancas curvas que proyectan sombras suaves",
  ),
  wavySculpture: unsplash(
    "photo-1694540784497-ed3697d41952",
    "J7en76WCGdU",
    "Pawel Czerwinski",
    "Primer plano de una superficie blanca de líneas onduladas, similar a capas de impresión",
  ),
  keychains: unsplash(
    "photo-1687363714985-990685339050",
    "X6P42vrC-v4",
    "Sooji Min",
    "Llaveros decorativos con colgantes de colores",
  ),
  letterSign: unsplash(
    "photo-1672268930879-e275cd8267d7",
    "210NeN_CQRM",
    "Gustavo Sánchez",
    "Letra decorativa blanca apoyada sobre una mesa",
  ),
  letterM: unsplash(
    "photo-1767037426287-54717e5c8044",
    "w4eShKuAWDc",
    "Donald Teel",
    "Letra M negra de gran tamaño sobre fondo blanco",
  ),
  heartBox: unsplash(
    "photo-1739446700418-ce4b263f4cf2",
    "fZqQO487ySI",
    "Vertex Designs",
    "Caja decorativa con tapa en forma de corazón, en turquesa y rojo",
  ),
  filament: unsplash(
    "photo-1742971239045-afabc9f7d744",
    "MzLDrWp3NYc",
    "Jakub Żerdzicki",
    "Bobinas de filamento de colores para impresión 3D",
  ),
  printerNozzle: unsplash(
    "photo-1742971500442-8fb8610dfbf5",
    "46dKqAGqQAw",
    "Jakub Żerdzicki",
    "Primer plano del extrusor de una impresora 3D depositando filamento naranja",
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;
