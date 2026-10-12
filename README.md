# FORMA 3D — Catálogo digital de objetos impresos en 3D

> **Demostración de portfolio.** FORMA 3D es una marca ficticia. Los productos, precios y disponibilidad no son reales, y las fotografías son imágenes de referencia de Unsplash que no muestran productos fabricados por la marca.

Catálogo digital pensado como ejemplo para emprendedores y comercios de **Miramar, provincia de Buenos Aires**: muestra productos con precios en ARS, permite elegir variantes y personalizaciones, arma un carrito y envía la consulta por **WhatsApp**. Sin backend, sin base de datos y sin pagos en línea.

## Funcionalidades

- **Catálogo** con 15 productos ficticios en 6 categorías (un producto puede pertenecer a más de una).
- **Filtros reales**: categoría, búsqueda por nombre (ignora tildes y mayúsculas), orden por destacados o precio, limpiar filtros, contador de resultados y estado vacío. Los filtros viven en la URL (`/catalogo?categoria=decoracion&q=maceta&orden=precio-asc`), así que se pueden compartir.
- **Ficha de producto** (`/producto/[slug]`) con galería, color, opciones (tamaño, presentación, etc.), personalización con texto, cantidad, información de fabricación, consulta individual por WhatsApp y productos relacionados.
- **Validaciones**: no se puede agregar al carrito si falta una opción obligatoria; las opciones no disponibles se muestran tachadas y bloqueadas; cantidades entre 1 y 20.
- **Carrito**: cada configuración distinta es una línea separada y la misma configuración suma cantidad. Calcula subtotales y total a partir de los datos de productos (no guarda precios). Se guarda en `localStorage`, pero también funciona si el almacenamiento no está disponible, y sin errores de hidratación.
- **Pedido por WhatsApp**: mensaje con productos, variantes, personalización, precio unitario, subtotales y total estimado, correctamente codificado. Si el teléfono no está configurado, el botón se desactiva y se muestra un aviso. El carrito **no** se vacía al enviar.
- Secciones de portada: hero, categorías, destacados, proceso de impresión 3D, "Tu idea, hecha objeto", cómo funciona, preguntas frecuentes y una banda para emprendedores de Miramar.
- SEO: metadata por página, Open Graph (imagen generada), `sitemap.xml`, `robots.txt` y URLs amigables.
- Accesibilidad: navegación por teclado, foco visible, menú móvil accesible (Escape, foco), etiquetas en todos los controles, soporte para `prefers-reduced-motion`.

## Tecnologías

Next.js 16.4 (App Router, Cache Components) · React 19.3 · TypeScript · Tailwind CSS 4 · Lucide React. Node.js 20.9 o superior (probado con Node 22.17).

## Ejecutar localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

Otros comandos:

```bash
npm run build        # build de producción
npm start            # sirve el build de producción
npm run lint         # ESLint
npm test             # tests unitarios (catálogo, carrito, WhatsApp) con el runner nativo de Node
```

## Configuración antes de mostrarlo

| Qué | Dónde |
| --- | --- |
| **Teléfono de WhatsApp** (formato `549` + característica sin 0 + número sin 15, ej. `5492291123456`) | `WHATSAPP_PHONE` en `src/config/brand.ts` o variable de entorno `NEXT_PUBLIC_WHATSAPP_PHONE` |
| URL pública del sitio (para Open Graph y sitemap) | variable de entorno `NEXT_PUBLIC_SITE_URL` (ej. `https://forma-3d.vercel.app`) |
| Tu nombre y enlace de contacto en el pie de página | `PORTFOLIO` en `src/config/brand.ts` |
| Productos, precios, variantes, disponibilidad | `src/data/products.ts` |
| Categorías | `src/data/categories.ts` |
| Imágenes y créditos | `src/data/images.ts` |
| Materiales y notas de fabricación (solo datos verificados) | `src/config/fabrication.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |

Las variables `NEXT_PUBLIC_*` se incorporan al compilar: después de cambiarlas hay que volver a hacer el build o redeploy. Hay un ejemplo en `.env.example`.

### Editar productos

Cada producto en `src/data/products.ts` tiene `id` y `slug` únicos, `price` en ARS, `categories` (la primera es la principal), `images`, `badge` opcional (`destacado`, `nuevo`, `personalizable`), `featuredRank` (orden en "Destacados"), `showOnHome`, `colors`, `options` (con `priceDelta` y `available`), `personalization` (campos de texto con `required` y `maxLength`), `availability` (`stock-demo`, `a-pedido`, `consultar`) y `fabrication`. Los tests (`npm test`) detectan slugs duplicados, productos sin imagen o con todas las opciones bloqueadas.

## Publicar en GitHub y Vercel

1. Creá un repositorio vacío en GitHub (por ejemplo, `forma-3d`).
2. Desde la carpeta del proyecto (el repositorio git ya está inicializado):
   ```bash
   git add .
   git commit -m "Catálogo FORMA 3D"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/forma-3d.git
   git push -u origin main
   ```
3. En [vercel.com](https://vercel.com) → **Add New… → Project**, importá el repositorio. Vercel detecta Next.js automáticamente.
4. En **Settings → Environment Variables**, agregá `NEXT_PUBLIC_WHATSAPP_PHONE` y `NEXT_PUBLIC_SITE_URL`, y hacé **Redeploy**.

### Sobre el plan de Vercel

Según la documentación vigente de Vercel (consultada en octubre de 2026), el plan **Hobby** es gratuito pero está **restringido a uso personal y no comercial**. Sirve para publicar esta demo en tu portfolio. Si un cliente va a usar el catálogo para su negocio real, corresponde el plan **Pro** (o otro hosting compatible con Next.js). El plan Hobby incluye 5.000 transformaciones de imagen por mes, suficientes para una demo. Revisá las condiciones actualizadas antes de cada despliegue comercial.

## Imágenes

Las fotos se cargan desde la CDN de Unsplash (`images.unsplash.com`, configurada en `next.config.ts`) bajo la [Licencia Unsplash](https://unsplash.com/license), que permite uso libre, incluso comercial. Los autores se acreditan en `/creditos` y en cada ficha. Si una imagen falla, se muestra un bloque alternativo con el nombre del producto. Para un cliente real, reemplazá las URLs por fotos propias de sus productos.

## Estructura

```
src/
  app/            rutas: inicio, /catalogo, /producto/[slug], /carrito, /creditos, sitemap, robots, OG
  components/
    layout/       cabecera, menú móvil, contador del carrito, pie, aviso de demo
    home/         hero, categorías, destacados, proceso, personalizados, cómo funciona, FAQ
    catalog/      vista del catálogo y barra de filtros
    product/      tarjeta, galería, selectores de variantes, configurador, fabricación
    cart/         store (useSyncExternalStore + localStorage), líneas, checkout por WhatsApp
    whatsapp/     enlace con manejo de teléfono no configurado
    ui/           imagen con alternativa, encabezados de sección
  config/         marca, WhatsApp, navegación, fabricación
  data/           productos, categorías, imágenes, preguntas frecuentes
  lib/            tipos, formato ARS, selección/validación, carrito, catálogo, WhatsApp (lógica pura y testeada)
tests/            tests unitarios
```
