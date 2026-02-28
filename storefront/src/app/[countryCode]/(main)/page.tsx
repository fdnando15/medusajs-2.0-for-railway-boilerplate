import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Sigrid - Bolsos Artesanales Hechos a Mano en Sevilla",
  description:
    "Descubre bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas, piezas exclusivas y complementos unicos. Moda artesanal espanola.",
  openGraph: {
    title: "Sigrid - Bolsos Artesanales Hechos a Mano en Sevilla",
    description:
      "Descubre bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas y piezas exclusivas.",
    url: "https://sigridbolsos.com/es",
  },
  alternates: {
    canonical: "https://sigridbolsos.com/es",
  },
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
    </>
  )
}
