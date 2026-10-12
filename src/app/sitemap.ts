import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/catalogo`, priority: 0.9 },
    ...PRODUCTS.map((product) => ({
      url: `${SITE_URL}/producto/${product.slug}`,
      priority: 0.7,
    })),
  ];
}
