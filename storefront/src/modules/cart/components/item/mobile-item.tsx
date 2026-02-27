"use client"

import { clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type MobileItemProps = {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
}

const MobileCartItem = ({ item, currencyCode }: MobileItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div 
      className="flex flex-col gap-5 p-6 bg-white border border-gray-200 rounded-lg"
      data-testid="mobile-cart-item"
    >
      {/* Fila superior: Imagen + Título + Precio total */}
      <div className="flex gap-5">
        {/* Imagen del producto */}
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="flex-shrink-0"
        >
          <div className="w-24 h-24">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          </div>
        </LocalizedClientLink>

        {/* Título */}
        <div className="flex-1 min-w-0">
          <LocalizedClientLink href={`/products/${item.product_handle}`}>
            <h3 
              className="text-base font-medium text-ui-fg-base line-clamp-2 leading-relaxed mb-2"
              data-testid="product-title"
            >
              {item.product_title}
            </h3>
          </LocalizedClientLink>
          
          {/* Precio total debajo del título */}
          <div className="text-lg font-semibold text-ui-fg-base">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </div>

      {/* Fila inferior: Controles */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="text-sm text-ui-fg-subtle font-medium">Cantidad:</span>
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="w-20 h-11 text-base"
            data-testid="product-select-button"
          >
            {Array.from(
              {
                length: Math.min(maxQuantity, 10),
              },
              (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              )
            )}
          </CartItemSelect>
          {updating && <Spinner />}
        </div>

        <DeleteButton 
          id={item.id} 
          data-testid="product-delete-button"
          className="text-ui-fg-subtle hover:text-ui-fg-base"
        />
      </div>

      {/* Error message */}
      {error && (
        <ErrorMessage 
          error={error} 
          data-testid="product-error-message"
          className="mt-2"
        />
      )}
    </div>
  )
}

export default MobileCartItem
