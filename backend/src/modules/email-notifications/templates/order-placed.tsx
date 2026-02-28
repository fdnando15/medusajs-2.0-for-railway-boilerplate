import { Text, Section, Hr, Img } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_PLACED = 'order-placed'

interface OrderPlacedPreviewProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
}

export interface OrderPlacedTemplateProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
  preview?: string
}

export const isOrderPlacedTemplateData = (data: any): data is OrderPlacedTemplateProps =>
  typeof data.order === 'object' && typeof data.shippingAddress === 'object'

export const OrderPlacedTemplate: React.FC<OrderPlacedTemplateProps> & {
  PreviewProps: OrderPlacedPreviewProps
} = ({ order, shippingAddress, preview = '¡Tu pedido ha sido confirmado!' }) => {
  const logoUrl = 'https://mudtnolzkzjhwuyircxx.supabase.co/storage/v1/object/public/medusa-media/logo-sigrid.png'
  
  // Colores de la marca Sigrid
  const brandColors = {
    accent: '#ad7777',      // Rosa principal
    secondary: '#bf9998',   // Rosa secundario
    black: '#0f0f0f',       // Negro
    lightGray: '#f5f5f5',   // Gris claro para fondos
    border: '#e0e0e0'       // Gris para bordes
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price)
  }

  return (
    <Base preview={preview}>
      <Section>
        {/* Logo de Sigrid */}
        <Img 
          src={logoUrl}
          alt="Sigrid"
          width="120"
          style={{ 
            margin: '0 auto 30px',
            display: 'block'
          }}
        />

        {/* Título */}
        <Text style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          margin: '0 0 10px',
          color: brandColors.accent
        }}>
          ¡Pedido Confirmado!
        </Text>

        {/* Saludo casual */}
        <Text style={{ 
          margin: '0 0 10px',
          fontSize: '16px',
          color: brandColors.black
        }}>
          Hola {shippingAddress.first_name},
        </Text>

        <Text style={{ 
          margin: '0 0 25px',
          fontSize: '15px',
          lineHeight: '24px',
          color: '#4a4a4a'
        }}>
          Gracias por tu compra. Tu pedido ha sido confirmado y estamos preparándolo con mucho cariño. 
          Aquí tienes todos los detalles:
        </Text>

        {/* Resumen del Pedido */}
        <div style={{
          backgroundColor: brandColors.lightGray,
          padding: '20px',
          borderRadius: '0px',
          marginBottom: '25px'
        }}>
          <Text style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            margin: '0 0 15px',
            color: brandColors.accent
          }}>
            Resumen del Pedido
          </Text>
          
          <div style={{ marginBottom: '8px' }}>
            <Text style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              <strong>Número de pedido:</strong> {order.display_id}
            </Text>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <Text style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              <strong>Fecha:</strong> {new Date(order.created_at).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </Text>
          </div>
          
          <div>
            <Text style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: brandColors.black }}>
              <strong>Total:</strong> {formatPrice(order.summary.raw_current_order_total.value, order.currency_code)}
            </Text>
          </div>
        </div>

        <Hr style={{ 
          margin: '25px 0',
          borderColor: brandColors.border,
          borderWidth: '1px'
        }} />

        {/* Dirección de Envío */}
        <Text style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          margin: '0 0 12px',
          color: brandColors.accent
        }}>
          Dirección de Envío
        </Text>
        
        <div style={{ marginBottom: '25px' }}>
          <Text style={{ margin: '0 0 5px', fontSize: '14px', color: '#4a4a4a' }}>
            {shippingAddress.first_name} {shippingAddress.last_name}
          </Text>
          <Text style={{ margin: '0 0 5px', fontSize: '14px', color: '#4a4a4a' }}>
            {shippingAddress.address_1}
          </Text>
          <Text style={{ margin: '0 0 5px', fontSize: '14px', color: '#4a4a4a' }}>
            {shippingAddress.postal_code} {shippingAddress.city}
          </Text>
          {shippingAddress.province && (
            <Text style={{ margin: '0 0 5px', fontSize: '14px', color: '#4a4a4a' }}>
              {shippingAddress.province}
            </Text>
          )}
          <Text style={{ margin: '0', fontSize: '14px', color: '#4a4a4a' }}>
            {shippingAddress.country_code?.toUpperCase()}
          </Text>
        </div>

        <Hr style={{ 
          margin: '25px 0',
          borderColor: brandColors.border,
          borderWidth: '1px'
        }} />

        {/* Productos */}
        <Text style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          margin: '0 0 15px',
          color: brandColors.accent
        }}>
          Tus Productos
        </Text>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '25px'
        }}>
          <thead>
            <tr style={{
              backgroundColor: brandColors.lightGray,
              borderBottom: `2px solid ${brandColors.border}`
            }}>
              <th style={{ 
                padding: '12px 8px', 
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: 'bold',
                color: brandColors.black
              }}>
                Producto
              </th>
              <th style={{ 
                padding: '12px 8px', 
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 'bold',
                color: brandColors.black
              }}>
                Cantidad
              </th>
              <th style={{ 
                padding: '12px 8px', 
                textAlign: 'right',
                fontSize: '13px',
                fontWeight: 'bold',
                color: brandColors.black
              }}>
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.id} style={{
                borderBottom: index < order.items.length - 1 ? `1px solid ${brandColors.border}` : 'none'
              }}>
                <td style={{ padding: '12px 8px' }}>
                  <Text style={{ margin: '0', fontSize: '14px', color: '#4a4a4a' }}>
                    {item.product_title}
                    {item.variant_title && item.variant_title !== 'Default Variant' && (
                      <span style={{ color: '#999', fontSize: '13px' }}>
                        <br />({item.variant_title})
                      </span>
                    )}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                  <Text style={{ margin: '0', fontSize: '14px', color: '#4a4a4a' }}>
                    {item.quantity}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                  <Text style={{ margin: '0', fontSize: '14px', color: brandColors.black }}>
                    {formatPrice(item.unit_price * item.quantity, order.currency_code)}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensaje de cierre */}
        <div style={{
          backgroundColor: brandColors.lightGray,
          padding: '20px',
          borderRadius: '0px',
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <Text style={{ 
            margin: '0 0 10px',
            fontSize: '15px',
            color: brandColors.black
          }}>
            Gracias por confiar en nosotros.
          </Text>
          <Text style={{ 
            margin: '0',
            fontSize: '14px',
            color: '#666'
          }}>
            Si tienes alguna pregunta, no dudes en contactarnos.
          </Text>
        </div>
      </Section>
    </Base>
  )
}

OrderPlacedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'PED-123',
    created_at: new Date().toISOString(),
    email: 'cliente@ejemplo.com',
    currency_code: 'EUR',
    items: [
      { 
        id: 'item-1', 
        title: 'Vestido Rosa', 
        product_title: 'Vestido Rosa Elegante', 
        variant_title: 'Talla M',
        quantity: 1, 
        unit_price: 45
      },
      { 
        id: 'item-2', 
        title: 'Bolso', 
        product_title: 'Bolso de Mano', 
        variant_title: 'Default Variant',
        quantity: 1, 
        unit_price: 32
      }
    ],
    shipping_address: {
      first_name: 'María',
      last_name: 'García',
      address_1: 'Calle Mayor 123',
      city: 'Madrid',
      province: 'Madrid',
      postal_code: '28013',
      country_code: 'ES'
    },
    summary: { raw_current_order_total: { value: 77 } }
  },
  shippingAddress: {
    first_name: 'María',
    last_name: 'García',
    address_1: 'Calle Mayor 123',
    city: 'Madrid',
    province: 'Madrid',
    postal_code: '28013',
    country_code: 'ES'
  }
} as OrderPlacedPreviewProps

export default OrderPlacedTemplate
