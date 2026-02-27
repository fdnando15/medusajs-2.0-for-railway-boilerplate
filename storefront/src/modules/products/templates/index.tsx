import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:grid small:grid-cols-2 small:gap-8 py-6 relative"
        data-testid="product-container"
      >
        {/* Columna izquierda: Galería */}
        <div className="block w-full relative order-1">
          <ImageGallery images={images} />
        </div>

        {/* Columna derecha: Info + CTA + Descripción */}
        <div className="flex flex-col w-full py-4 small:py-0 gap-y-4 small:gap-y-6 order-2">
          {/* Colección + Título */}
          <ProductInfo product={product} />
          
          {/* CTA Onboarding */}
          <ProductOnboardingCta />
          
          {/* Variantes + Precio + Botón */}
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          {/* Descripción al final */}
          <div>
            <p className="text-sm small:text-medium text-ui-fg-subtle whitespace-pre-line" data-testid="product-description">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
