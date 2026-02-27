import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import MobileCartItem from "@modules/cart/components/item/mobile-item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const sortedItems = items
    ? items.sort((a, b) => {
        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      })
    : []

  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">Cesta</Heading>
      </div>

      {/* Vista móvil - Cards */}
      <div className="block small:hidden space-y-3">
        {items
          ? sortedItems.map((item) => {
              return (
                <MobileCartItem
                  key={item.id}
                  item={item}
                  currencyCode={cart?.currency_code || "EUR"}
                />
              )
            })
          : repeat(3).map((i) => {
              return (
                <div 
                  key={i} 
                  className="h-28 bg-gray-100 rounded-lg animate-pulse"
                />
              )
            })}
      </div>

      {/* Vista desktop - Tabla */}
      <div className="hidden small:block">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row className="text-ui-fg-subtle txt-medium-plus">
              <Table.HeaderCell className="pl-4">Producto</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell">
                Precio
              </Table.HeaderCell>
              <Table.HeaderCell className="text-right pr-4">
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items
              ? sortedItems.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ItemsTemplate
