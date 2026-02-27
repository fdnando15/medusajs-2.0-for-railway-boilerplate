import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b border-[var(--border)]">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              Volver a la cesta
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              Volver
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center"
            data-testid="store-link"
          >
            <Image
              src="/logo-sigrid.png"
              alt="Sigrid"
              width={120}
              height={48}
              className="h-8 w-auto"
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-4 w-full flex items-center justify-center">
        <p className="text-sm text-[var(--muted-foreground)]">
          Sigrid - Bolsos Artesanales
        </p>
      </div>
    </div>
  )
}
