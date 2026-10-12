import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { DemoBar } from "@/components/layout/DemoBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BRAND, SITE_URL } from "@/config/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const description =
  "Catálogo digital de objetos funcionales, decoración y accesorios fabricados en 3D. Marca ficticia de demostración para emprendedores de Miramar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.slogan}`,
    template: `%s · ${BRAND.name}`,
  },
  description,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.slogan}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.slogan}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#202329",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-[60] rounded-full bg-electric px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <DemoBar />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
