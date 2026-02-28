import type { MetadataRoute } from "next"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"

const BASE_URL = "https://sigridbolsos.com"
const DEFAULT_COUNTRY = "es"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Paginas estaticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/${DEFAULT_COUNTRY}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${DEFAULT_COUNTRY}/sobre-mi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/${DEFAULT_COUNTRY}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Paginas de productos (dinamicas desde Medusa)
  let productPages: MetadataRoute.Sitemap = []
  try {
    const { response } = await listProducts({
      countryCode: DEFAULT_COUNTRY,
      queryParams: { limit: 1000, fields: "handle,updated_at" },
    })

    productPages = response.products.map((product: any) => ({
      url: `${BASE_URL}/${DEFAULT_COUNTRY}/products/${product.handle}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error("Sitemap: Error al obtener productos", error)
  }

  // Paginas de categorias (dinamicas desde Medusa)
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await listCategories()

    if (categories) {
      categoryPages = categories.map((category: any) => ({
        url: `${BASE_URL}/${DEFAULT_COUNTRY}/categories/${category.handle}`,
        lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error("Sitemap: Error al obtener categorias", error)
  }

  return [...staticPages, ...categoryPages, ...productPages]
}
