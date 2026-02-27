import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-2 small:gap-y-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs small:text-sm text-ui-fg-muted hover:text-ui-fg-subtle text-left"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="text-2xl small:text-3xl leading-tight small:leading-10 text-ui-fg-base text-left"
          data-testid="product-title"
          style={{ whiteSpace: "normal" }}
        >
          {product.title}
        </Heading>
      </div>
    </div>
  )
}

export default ProductInfo
