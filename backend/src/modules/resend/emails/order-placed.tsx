import {
  Body,
  Head,
  Html,
  Img,
  Preview,
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

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d)
  }

  const firstName = order.customer?.first_name || order.shipping_address?.first_name || ""

  return (
    <Html dir="ltr" lang="es">
      <Head>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </Head>
      <div
        style={{
          display: "none",
          overflow: "hidden",
          lineHeight: "1px",
          opacity: 0,
          maxHeight: 0,
          maxWidth: 0,
        }}
      >
        Tu pedido ha sido confirmado
      </div>
      <Body style={{ backgroundColor: "#ffffff", margin: 0 }}>
        <table
          border={0}
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          align="center"
        >
          <tbody>
            <tr>
              <td
                style={{
                  backgroundColor: "#ffffff",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
                  margin: 0,
                  padding: 0,
                }}
              >
                <table
                  align="center"
                  width="100%"
                  border={0}
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    maxWidth: "600px",
                    border: "none",
                    borderRadius: "0px",
                    margin: "40px auto",
                    padding: "30px",
                    width: "100%",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <tbody>
                    <tr style={{ width: "100%" }}>
                      <td>
                        <div style={{ maxWidth: "100%", wordWrap: "break-word" }}>
                          <table
                            align="center"
                            width="100%"
                            border={0}
                            cellPadding="0"
                            cellSpacing="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <Img
                                    alt="Sigrid"
                                    src="https://mudtnolzkzjhwuyircxx.supabase.co/storage/v1/object/public/medusa-media/logo-sigrid.png"
                                    style={{
                                      display: "block",
                                      outline: "none",
                                      border: "none",
                                      textDecoration: "none",
                                      margin: "0 auto 30px",
                                    }}
                                    width="120"
                                  />
                                  <p
                                    style={{
                                      fontSize: "28px",
                                      lineHeight: "24px",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                      margin: "0 0 10px",
                                      color: "#ad7777",
                                    }}
                                  >
                                    Pedido Confirmado
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      margin: "0 0 10px",
                                      color: "#0f0f0f",
                                    }}
                                  >
                                    Hola {firstName}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "15px",
                                      lineHeight: "24px",
                                      margin: "0 0 25px",
                                      color: "#4a4a4a",
                                    }}
                                  >
                                    Gracias por tu compra. Tu pedido ha sido confirmado y estamos
                                    preparándolo con mucho cariño. Aquí tienes todos los detalles:
                                  </p>

                                  {/* Resumen del Pedido */}
                                  <div
                                    style={{
                                      backgroundColor: "#f5f5f5",
                                      padding: "20px",
                                      borderRadius: "0px",
                                      marginBottom: "25px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        fontWeight: "bold",
                                        margin: "0 0 15px",
                                        color: "#ad7777",
                                      }}
                                    >
                                      Resumen del Pedido
                                    </p>
                                    <div style={{ marginBottom: "8px" }}>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          lineHeight: "24px",
                                          margin: 0,
                                          color: "#666",
                                        }}
                                      >
                                        <strong>Número de pedido:</strong> {order.display_id}
                                      </p>
                                    </div>
                                    <div style={{ marginBottom: "8px" }}>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          lineHeight: "24px",
                                          margin: 0,
                                          color: "#666",
                                        }}
                                      >
                                        <strong>Fecha:</strong> {formatDate(order.created_at)}
                                      </p>
                                    </div>
                                    <div>
                                      <p
                                        style={{
                                          fontSize: "16px",
                                          lineHeight: "24px",
                                          margin: 0,
                                          fontWeight: "bold",
                                          color: "#0f0f0f",
                                        }}
                                      >
                                        <strong>Total:</strong> {formatPrice(order.total)}
                                      </p>
                                    </div>
                                  </div>

                                  <hr
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      borderTop: "1px solid #eaeaea",
                                      margin: "25px 0",
                                      borderColor: "#e0e0e0",
                                      borderWidth: "1px",
                                    }}
                                  />

                                  {/* Dirección de Envío */}
                                  {order.shipping_address && (
                                    <>
                                      <p
                                        style={{
                                          fontSize: "16px",
                                          lineHeight: "24px",
                                          fontWeight: "bold",
                                          margin: "0 0 12px",
                                          color: "#ad7777",
                                        }}
                                      >
                                        Dirección de Envío
                                      </p>
                                      <div style={{ marginBottom: "25px" }}>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            margin: "0 0 5px",
                                            color: "#4a4a4a",
                                          }}
                                        >
                                          {order.shipping_address.first_name}{" "}
                                          {order.shipping_address.last_name}
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            margin: "0 0 5px",
                                            color: "#4a4a4a",
                                          }}
                                        >
                                          {order.shipping_address.address_1}
                                        </p>
                                        {order.shipping_address.address_2 && (
                                          <p
                                            style={{
                                              fontSize: "14px",
                                              lineHeight: "24px",
                                              margin: "0 0 5px",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            {order.shipping_address.address_2}
                                          </p>
                                        )}
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            margin: "0 0 5px",
                                            color: "#4a4a4a",
                                          }}
                                        >
                                          {order.shipping_address.postal_code}{" "}
                                          {order.shipping_address.city}
                                        </p>
                                        {order.shipping_address.province && (
                                          <p
                                            style={{
                                              fontSize: "14px",
                                              lineHeight: "24px",
                                              margin: "0 0 5px",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            {order.shipping_address.province}
                                          </p>
                                        )}
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            margin: 0,
                                            color: "#4a4a4a",
                                          }}
                                        >
                                          {order.shipping_address.country_code?.toUpperCase()}
                                        </p>
                                      </div>
                                    </>
                                  )}

                                  <hr
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      borderTop: "1px solid #eaeaea",
                                      margin: "25px 0",
                                      borderColor: "#e0e0e0",
                                      borderWidth: "1px",
                                    }}
                                  />

                                  {/* Tus Productos */}
                                  <p
                                    style={{
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      fontWeight: "bold",
                                      margin: "0 0 15px",
                                      color: "#ad7777",
                                    }}
                                  >
                                    Tus Productos
                                  </p>
                                  <table
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                      marginBottom: "25px",
                                    }}
                                  >
                                    <thead>
                                      <tr
                                        style={{
                                          backgroundColor: "#f5f5f5",
                                          borderBottom: "2px solid #e0e0e0",
                                        }}
                                      >
                                        <th
                                          style={{
                                            padding: "12px 8px",
                                            textAlign: "left",
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            color: "#0f0f0f",
                                          }}
                                        >
                                          Producto
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 8px",
                                            textAlign: "center",
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            color: "#0f0f0f",
                                          }}
                                        >
                                          Cantidad
                                        </th>
                                        <th
                                          style={{
                                            padding: "12px 8px",
                                            textAlign: "right",
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            color: "#0f0f0f",
                                          }}
                                        >
                                          Precio
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items?.map((item) => (
                                        <tr key={item.id} style={{ borderBottom: "none" }}>
                                          <td style={{ padding: "12px 8px" }}>
                                            <p
                                              style={{
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                margin: 0,
                                                color: "#4a4a4a",
                                              }}
                                            >
                                              {item.product_title}
                                              {item.variant_title && (
                                                <span
                                                  style={{
                                                    color: "#999",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  <br />({item.variant_title})
                                                </span>
                                              )}
                                            </p>
                                          </td>
                                          <td style={{ padding: "12px 8px", textAlign: "center" }}>
                                            <p
                                              style={{
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                margin: 0,
                                                color: "#4a4a4a",
                                              }}
                                            >
                                              {item.quantity}
                                            </p>
                                          </td>
                                          <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                            <p
                                              style={{
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                margin: 0,
                                                color: "#0f0f0f",
                                              }}
                                            >
                                              {formatPrice(item.total)}
                                            </p>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>

                                  {/* Footer gracias */}
                                  <div
                                    style={{
                                      backgroundColor: "#f5f5f5",
                                      padding: "20px",
                                      borderRadius: "0px",
                                      textAlign: "center",
                                      marginTop: "30px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "15px",
                                        lineHeight: "24px",
                                        margin: "0 0 10px",
                                        color: "#0f0f0f",
                                      }}
                                    >
                                      Gracias por confiar en nosotros
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        lineHeight: "24px",
                                        margin: 0,
                                        color: "#666",
                                      }}
                                    >
                                      Si tienes alguna pregunta, no dudes en contactarnos.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <hr
                          style={{
                            width: "100%",
                            border: "none",
                            borderTop: "1px solid #eaeaea",
                            margin: "40px 0 20px",
                            borderColor: "#e0e0e0",
                            borderWidth: "1px",
                          }}
                        />

                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                          <p
                            style={{
                              fontSize: "13px",
                              lineHeight: "20px",
                              margin: "0 0 8px",
                              color: "#999",
                            }}
                          >
                            © {new Date().getFullYear()} Sigrid. Todos los derechos reservados.
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              lineHeight: "18px",
                              margin: "0 0 15px",
                              color: "#bbb",
                            }}
                          >
                            Este email ha sido enviado automáticamente. Por favor, no respondas a
                            este mensaje.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  )
}

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
)
