"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <LocalizedClientLink
      className="relative text-black hover:text-sigrid-accent transition-colors flex items-center"
      href="/cart"
      data-testid="nav-cart-link"
    >
      <ShoppingBagIcon />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-2 bg-sigrid-accent text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </LocalizedClientLink>
  )
}

export default CartDropdown
