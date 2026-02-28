import { Html, Body, Container, Preview, Tailwind, Head, Text, Hr, Link } from '@react-email/components'
import * as React from 'react'

interface BaseProps {
  preview?: string
  children: React.ReactNode
}

export const Base: React.FC<BaseProps> = ({ preview, children }) => {
  // Colores de la marca Sigrid (minimalista estilo Zara)
  const brandColors = {
    accent: '#ad7777',      // Rosa principal
    secondary: '#bf9998',   // Rosa secundario  
    black: '#0f0f0f',       // Negro
    lightGray: '#f5f5f5',   // Gris claro
    border: '#e0e0e0'       // Gris para bordes
  }

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body style={{ 
          backgroundColor: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
          margin: 0,
          padding: 0
        }}>
          <Container style={{
            border: 'none',
            borderRadius: '0px',
            margin: '40px auto',
            padding: '30px',
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#ffffff'
          }}>
            {/* Contenido principal */}
            <div style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
              {children}
            </div>

            {/* Footer */}
            <Hr style={{ 
              margin: '40px 0 20px',
              borderColor: brandColors.border,
              borderWidth: '1px'
            }} />
            
            <div style={{ 
              textAlign: 'center',
              marginTop: '30px'
            }}>
              <Text style={{ 
                margin: '0 0 8px',
                fontSize: '13px',
                color: '#999',
                lineHeight: '20px'
              }}>
                © {new Date().getFullYear()} Sigrid. Todos los derechos reservados.
              </Text>
              
              <Text style={{ 
                margin: '0 0 15px',
                fontSize: '12px',
                color: '#bbb',
                lineHeight: '18px'
              }}>
                Este email ha sido enviado automáticamente. Por favor, no respondas a este mensaje.
              </Text>

              {/* NOTA: Descomenta estas líneas cuando tengas tu dominio configurado */}
              {/* <div style={{ marginTop: '15px' }}>
                <Link 
                  href="https://tudominio.com" 
                  style={{ 
                    color: brandColors.accent,
                    fontSize: '13px',
                    textDecoration: 'none',
                    marginRight: '15px'
                  }}
                >
                  Visitar tienda
                </Link>
                <Link 
                  href="https://tudominio.com/politica-privacidad" 
                  style={{ 
                    color: brandColors.accent,
                    fontSize: '13px',
                    textDecoration: 'none',
                    marginRight: '15px'
                  }}
                >
                  Política de privacidad
                </Link>
                <Link 
                  href="https://tudominio.com/contacto" 
                  style={{ 
                    color: brandColors.accent,
                    fontSize: '13px',
                    textDecoration: 'none'
                  }}
                >
                  Contacto
                </Link>
              </div> */}
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
