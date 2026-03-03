import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useEffect } from "react";

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

const STYLE_ID = "admin-guard-css";

const CSS = `
  /* =============================================
     Admin Guard: Ocultar secciones restringidas
     ============================================= */
  
  /* Oculta cualquier enlace del sidebar que apunte a estas rutas */
  aside a[href*="/customers"],
  aside a[href*="/customer-groups"],
  aside a[href*="/promotions"],
  aside a[href*="/campaigns"],
  aside a[href*="/price-lists"],
  aside a[href*="/settings"] { 
      display: none !important; 
  }

  /* Si el enlace está dentro de un contenedor de lista en el sidebar, ocultamos el contenedor padre para no dejar huecos */
  aside div:has(> a[href*="/customers"]),
  aside div:has(> a[href*="/promotions"]),
  aside div:has(> a[href*="/price-lists"]),
  aside div:has(> a[href*="/settings"]) {
      display: none !important;
  }
`;

export function useAdminGuard() {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
  }, []);
}

const AdminGuardWidget = () => {
  useAdminGuard();
  return null;
};

export const config = defineWidgetConfig({
  zone: "order.list.before",
});

export default AdminGuardWidget;
