import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

/**
 * Widget que oculta secciones restringidas del admin dashboard.
 * Inyecta CSS global para ocultar items del sidebar.
 * 
 * Rutas ocultadas del sidebar:
 * - /settings (toda la sección)
 * - /promotions (y /campaigns anidado)
 * - /price-lists
 * - /customers (y /customer-groups anidado)
 * 
 * Para desactivar esta restricción, eliminar o renombrar este archivo.
 */

const STYLE_ID = "admin-guard-css"

const CSS = `
  /* =============================================
     Admin Guard: Ocultar secciones restringidas
     Eliminar src/admin/widgets/admin-guard*.tsx para desactivar
     ============================================= */

  /* Sidebar principal: Customers */
  aside div.px-3:has(> div > a[href="/customers"]) { display: none !important; }

  /* Sidebar principal: Promotions (incluye Campaigns como sub-item) */
  aside div.px-3:has(> div > a[href="/promotions"]) { display: none !important; }

  /* Sidebar principal: Price Lists */
  aside div.px-3:has(> div > a[href="/price-lists"]) { display: none !important; }

  /* Sidebar principal: Settings (icono engranaje abajo) */
  aside div.px-3:has(a[href="/settings"]) { display: none !important; }
`

export function useAdminGuard() {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style")
      style.id = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])
}

const AdminGuardWidget = () => {
  useAdminGuard()
  return null
}

export const config = defineWidgetConfig({
  zone: "order.list.before",
})

export default AdminGuardWidget
