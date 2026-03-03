import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useAdminGuard } from "./admin-guard"

const Widget = () => {
  useAdminGuard()
  return null
}

export const config = defineWidgetConfig({
  zone: "inventory_item.list.before",
})

export default Widget
