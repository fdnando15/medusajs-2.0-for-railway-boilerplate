import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import JsonLd from "@modules/common/components/json-ld"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const BASE_URL = "https://sigridbolsos.com"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

// Temporarily disabled for Railway deployment - using SSR instead of SSG
// export async function generateStaticParams() {
//   const product_categories = await listCategories()

//   if (!product_categories) {
//     return []
//   }

//   const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
//     regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
//   )

//   const categoryHandles = product_categories.map(
//     (category: any) => category.handle
//   )

//   const staticParams = countryCodes
//     ?.map((countryCode: string | undefined) =>
//       categoryHandles.map((handle: any) => ({
//         countryCode,
//         category: [handle],
//       }))
//     )
//     .flat()

//   return staticParams
// }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const categoryName = productCategory.name
    const description =
      productCategory.description ??
      `${categoryName} - Bolsos artesanales hechos a mano en Arahal, Sevilla. Descubre la coleccion de Sigrid.`

    const categoryPath = params.category.join("/")

    return {
      title: categoryName,
      description,
      openGraph: {
        title: `${categoryName} | Sigrid Bolsos Artesanales`,
        description,
        url: `https://sigridbolsos.com/${params.countryCode}/categories/${categoryPath}`,
      },
      alternates: {
        canonical: `https://sigridbolsos.com/${params.countryCode}/categories/${categoryPath}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  // Redirigir si la categoría es padre (tiene hijos pero queremos evitar acceso directo)
  if (productCategory.category_children && productCategory.category_children.length > 0) {
    redirect(`/${params.countryCode}`)
  }

  const categoryPath = params.category.join("/")

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
        name: productCategory.name,
        item: `${BASE_URL}/${params.countryCode}/categories/${categoryPath}`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CategoryTemplate
        category={productCategory}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}
