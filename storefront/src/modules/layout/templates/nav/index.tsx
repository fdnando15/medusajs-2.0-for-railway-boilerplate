import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SigridNavClient from "@modules/layout/components/sigrid-nav-client"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <SigridNavClient>
        <Suspense
          fallback={
            <LocalizedClientLink
              className="relative text-black hover:text-sigrid-accent transition-colors"
              href="/cart"
              data-testid="nav-cart-link"
            >
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
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      </SigridNavClient>
    </div>
  )
}
