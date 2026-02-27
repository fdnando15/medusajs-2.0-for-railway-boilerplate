import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404 - Sigrid",
  description: "Pagina no encontrada",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi">Pagina no encontrada</h1>
      <p className="text-small-regular text-[var(--muted-foreground)]">
        La pagina que intentas acceder no existe.
      </p>
      <InteractiveLink href="/">Ir al inicio</InteractiveLink>
    </div>
  )
}
