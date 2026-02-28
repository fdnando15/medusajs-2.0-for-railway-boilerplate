import type { MetadataRoute } from "next"

/**
 * CONFIGURACION DE ROBOTS.TXT
 *
 * Estado actual: BLOQUEANDO toda indexacion (pre-lanzamiento).
 *
 * CUANDO LANCES LA WEB, cambia esta configuracion por:
 *
 * rules: [
 *   {
 *     userAgent: "*",
 *     allow: "/",
 *     disallow: ["/cart", "/checkout", "/account", "/order"],
 *   },
 * ],
 * sitemap: "https://sigridbolsos.com/sitemap.xml",
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: "https://sigridbolsos.com/sitemap.xml",
  }
}
