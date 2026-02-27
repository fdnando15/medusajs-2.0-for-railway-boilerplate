import { Heading, Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Cesta
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        No has añadido ningun producto a la cesta
      </Text>
      <div>
        <LocalizedClientLink href="/#colecciones">
          <button className="btn-sigrid-primary">Ver la coleccion</button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
