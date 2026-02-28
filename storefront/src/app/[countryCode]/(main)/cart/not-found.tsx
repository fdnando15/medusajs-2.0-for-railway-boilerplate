import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Cesta no encontrada",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Cesta no encontrada</h1>
      <p className="text-small-regular text-ui-fg-base">
        La cesta que intentas acceder no existe. Limpia las cookies e intentalo
        de nuevo.
      </p>
      <InteractiveLink href="/">Ir al inicio</InteractiveLink>
    </div>
  )
}
