import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"
import React from "react"

type OrderPlacedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
}

function OrderPlacedEmailComponent({ order }: OrderPlacedEmailProps) {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  })

  const formatPrice = (price: BigNumberValue) => {
    if (typeof price === "number") {
      return formatter.format(price)
    }

    if (typeof price === "string") {
      return formatter.format(parseFloat(price))
    }

    return price?.toString() || ""
  }

  return (
    <Tailwind>
      <Html className="font-sans bg-gray-100">
        <Head />
        <Preview>Gracias por tu pedido en Sigrid Bolsos Artesanales</Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
          {/* Header */}
          <Section className="bg-[#27272a] text-white px-6 py-4">
            <Heading className="text-2xl font-bold m-0">Sigrid Bolsos</Heading>
            <Text className="text-sm m-0 mt-1">Bolsos Artesanales</Text>
          </Section>

          {/* Thank You Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-gray-800">
              ¡Gracias por tu pedido, {order.customer?.first_name || order.shipping_address?.first_name}!
            </Heading>
            <Text className="text-center text-gray-600 mt-2">
              Estamos preparando tu pedido y te notificaremos cuando se envíe.
            </Text>
          </Container>

          {/* Order Items */}
          <Container className="px-6">
            <Heading className="text-xl font-semibold text-gray-800 mb-4">
              Tus artículos
            </Heading>
            <Row>
              <Column>
                <Text className="text-sm m-0 my-2 text-gray-500">Pedido #{order.display_id}</Text>
              </Column>
            </Row>
            {order.items?.map((item) => (
              <Section key={item.id} className="border-b border-gray-200 py-4">
                <Row>
                  <Column className="w-1/3">
                    <Img
                      src={item.thumbnail ?? ""}
                      alt={item.product_title ?? ""}
                      className="rounded-lg"
                      width="100%"
                    />
                  </Column>
                  <Column className="w-2/3 pl-4">
                    <Text className="text-lg font-semibold text-gray-800">
                      {item.product_title}
                    </Text>
                    {item.variant_title && (
                      <Text className="text-gray-600">{item.variant_title}</Text>
                    )}
                    <Text className="text-gray-800 mt-2 font-bold">
                      {formatPrice(item.total)}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}

            {/* Order Summary */}
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-gray-800 mb-4">
                Resumen del pedido
              </Heading>
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">Subtotal</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">
                    {formatPrice(order.item_total)}
                  </Text>
                </Column>
              </Row>
              {order.shipping_methods?.map((method) => (
                <Row className="text-gray-600" key={method.id}>
                  <Column className="w-1/2">
                    <Text className="m-0">{method.name}</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">{formatPrice(method.total)}</Text>
                  </Column>
                </Row>
              ))}
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">IVA</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">{formatPrice(order.tax_total || 0)}</Text>
                </Column>
              </Row>
              <Row className="border-t border-gray-200 mt-4 text-gray-800 font-bold">
                <Column className="w-1/2">
                  <Text>Total</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text>{formatPrice(order.total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Shipping Address */}
            {order.shipping_address && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-gray-800 mb-4">
                  Dirección de envío
                </Heading>
                <Text className="text-gray-600 m-0">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </Text>
                <Text className="text-gray-600 m-0">{order.shipping_address.address_1}</Text>
                {order.shipping_address.address_2 && (
                  <Text className="text-gray-600 m-0">{order.shipping_address.address_2}</Text>
                )}
                <Text className="text-gray-600 m-0">
                  {order.shipping_address.postal_code} {order.shipping_address.city}
                </Text>
                <Text className="text-gray-600 m-0">{order.shipping_address.country_code?.toUpperCase()}</Text>
              </Section>
            )}
          </Container>

          {/* Footer */}
          <Section className="bg-gray-50 p-6 mt-10">
            <Text className="text-center text-gray-500 text-sm">
              Si tienes alguna pregunta, contáctanos por WhatsApp al +34 687 85 25 42 o responde a este email.
            </Text>
            <Text className="text-center text-gray-500 text-sm mt-2">
              Síguenos en <Link href="https://instagram.com/sigridbolsos" className="text-blue-600">Instagram</Link> y <Link href="https://facebook.com/p/Sigrid-Bolsos-100068897574178" className="text-blue-600">Facebook</Link>
            </Text>
            <Text className="text-center text-gray-400 text-xs mt-4">
              © {new Date().getFullYear()} Sigrid Bolsos Artesanales - Arahal, Sevilla
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
)
