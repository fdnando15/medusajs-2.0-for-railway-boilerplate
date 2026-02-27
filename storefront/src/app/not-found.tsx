import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Link from "next/link"

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
      <Link className="flex gap-x-1 items-center group" href="/">
        <Text className="text-sigrid-accent">Ir al inicio</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--accent)"
        />
      </Link>
    </div>
  )
}
