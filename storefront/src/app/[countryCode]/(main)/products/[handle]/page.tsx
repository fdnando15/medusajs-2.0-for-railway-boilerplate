import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import JsonLd from "@modules/common/components/json-ld"
import { HttpTypes } from "@medusajs/types"

const BASE_URL = "https://sigridbolsos.com"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

// Temporarily disabled for Railway deployment - using SSR instead of SSG
// export async function generateStaticParams() {
//   try {
//     const countryCodes = await listRegions().then((regions) =>
//       regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
//     )

//     if (!countryCodes) {
//       return []
//     }

//     const promises = countryCodes.map(async (country) => {
//       const { response } = await listProducts({
//         countryCode: country,
//         queryParams: { limit: 100, fields: "handle" },
//       })

//       return {
//         country,
//         products: response.products,
//       }
//     })

//     const countryProducts = await Promise.all(promises)

//     return countryProducts
//       .flatMap((countryData) =>
//         countryData.products.map((product) => ({
//           countryCode: countryData.country,
//           handle: product.handle,
//         }))
//       )
//       .filter((param) => param.handle)
//   } catch (error) {
//     console.error(
//       `Failed to generate static paths for product pages: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }.`
//     )
//     return []
//   }
// }

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images!.filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const description =
    product.description ||
    `${product.title} - Bolso artesanal hecho a mano por Sigrid en Arahal, Sevilla.`
  const truncatedDescription =
    description.length > 160 ? description.substring(0, 157) + "..." : description

  return {
    title: product.title,
    description: truncatedDescription,
    openGraph: {
      title: `${product.title} | Sigrid Bolsos Artesanales`,
      description: truncatedDescription,
      images: product.thumbnail ? [product.thumbnail] : [],
      url: `https://sigridbolsos.com/${params.countryCode}/products/${handle}`,
      type: "og:product",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Sigrid`,
      description: truncatedDescription,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
    alternates: {
      canonical: `https://sigridbolsos.com/${params.countryCode}/products/${handle}`,
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  if (!pricedProduct) {
    notFound()
  }

  // JSON-LD: Product schema
  const cheapestVariant = pricedProduct.variants?.reduce(
    (cheapest: any, variant: any) => {
      const price = variant.calculated_price?.calculated_amount
      const cheapestPrice = cheapest?.calculated_price?.calculated_amount
      if (!price) return cheapest
      if (!cheapestPrice || price < cheapestPrice) return variant
      return cheapest
    },
    null as any
  )

  const productPrice = cheapestVariant?.calculated_price?.calculated_amount
  const currencyCode =
    cheapestVariant?.calculated_price?.currency_code?.toUpperCase() || "EUR"

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pricedProduct.title,
    description:
      pricedProduct.description ||
      `${pricedProduct.title} - Bolso artesanal hecho a mano por Sigrid.`,
    image: pricedProduct.thumbnail || pricedProduct.images?.[0]?.url || "",
    url: `${BASE_URL}/${params.countryCode}/products/${params.handle}`,
    brand: {
      "@type": "Brand",
      name: "Sigrid Bolsos Artesanales",
    },
    ...(productPrice
      ? {
          offers: {
            "@type": "Offer",
            url: `${BASE_URL}/${params.countryCode}/products/${params.handle}`,
            priceCurrency: currencyCode,
            price: productPrice,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Sigrid Bolsos Artesanales",
            },
          },
        }
      : {}),
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${BASE_URL}/${params.countryCode}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tienda",
        item: `${BASE_URL}/${params.countryCode}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pricedProduct.title,
        item: `${BASE_URL}/${params.countryCode}/products/${params.handle}`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
    </>
  )
}
