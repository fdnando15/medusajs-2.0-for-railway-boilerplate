import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Sigrid Bolsos Artesanales conforme al RGPD.",
  robots: "noindex, nofollow",
}

export default function PrivacidadPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-ui-fg-base">Política de Privacidad</h1>
        
        <div className="prose prose-sm max-w-none text-ui-fg-subtle">
          <p className="text-sm text-ui-fg-muted mb-8">
            Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">1. Responsable del tratamiento</h2>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Identidad:</strong> [NOMBRE COMPLETO O RAZÓN SOCIAL]</li>
            <li><strong>NIF/CIF:</strong> [NIF/CIF]</li>
            <li><strong>Dirección:</strong> [DIRECCIÓN COMPLETA], Arahal, Sevilla, España</li>
            <li><strong>Correo electrónico:</strong> sigridgg.sg@gmail.com</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">2. Datos que recopilamos</h2>
          <p>Recopilamos los siguientes datos personales:</p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Datos de contacto:</strong> nombre, apellidos, email, teléfono, dirección postal</li>
            <li><strong>Datos de facturación:</strong> dirección de facturación, datos fiscales si aplica</li>
            <li><strong>Datos de navegación:</strong> cookies técnicas y analíticas (ver Política de Cookies)</li>
            <li><strong>Datos de compra:</strong> historial de pedidos, productos adquiridos</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">3. Finalidad del tratamiento</h2>
          <p>Tratamos tus datos personales para las siguientes finalidades:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Gestionar y procesar tus pedidos</li>
            <li>Enviarte información sobre el estado de tu pedido</li>
            <li>Atender tus consultas y solicitudes</li>
            <li>Gestionar devoluciones y reclamaciones</li>
            <li>Cumplir con obligaciones legales y fiscales</li>
            <li>Mejorar nuestros servicios y experiencia de usuario</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">4. Base legal del tratamiento</h2>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Ejecución de contrato:</strong> para procesar tus pedidos y entregas</li>
            <li><strong>Obligación legal:</strong> para cumplir obligaciones fiscales y contables</li>
            <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y prevenir fraude</li>
            <li><strong>Consentimiento:</strong> para el envío de comunicaciones comerciales, si lo has autorizado</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">5. Destinatarios de los datos</h2>
          <p>Tus datos podrán ser comunicados a:</p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Proveedores de servicios de pago:</strong> Stripe, para procesar pagos de forma segura</li>
            <li><strong>Empresas de transporte:</strong> para la entrega de tus pedidos</li>
            <li><strong>Proveedores tecnológicos:</strong> servicios de hosting, email y análisis web</li>
            <li><strong>Administraciones públicas:</strong> cuando exista obligación legal</li>
          </ul>
          <p>No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">6. Conservación de los datos</h2>
          <p>
            Conservaremos tus datos personales durante el tiempo necesario para cumplir con la finalidad 
            para la que se recogieron y para cumplir con las obligaciones legales. En particular:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Datos de clientes: durante la relación comercial y los plazos legales aplicables (mínimo 5 años por obligaciones fiscales)</li>
            <li>Datos de navegación: según lo establecido en la Política de Cookies</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">7. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Acceso:</strong> conocer qué datos personales tratamos sobre ti</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias</li>
            <li><strong>Limitación:</strong> solicitar la limitación del tratamiento en ciertos casos</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado</li>
          </ul>
          <p>
            Para ejercer estos derechos, envía un correo a sigridgg.sg@gmail.com indicando tu solicitud 
            y adjuntando copia de tu DNI o documento identificativo.
          </p>
          <p>
            Si consideras que tus derechos no han sido atendidos correctamente, puedes presentar una 
            reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">8. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos personales 
            contra el acceso no autorizado, la pérdida o la destrucción. Los pagos se procesan de forma 
            segura a través de Stripe, que cumple con los estándares PCI-DSS.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">9. Modificaciones</h2>
          <p>
            Nos reservamos el derecho a modificar esta política de privacidad. Cualquier cambio será 
            publicado en esta página con la fecha de actualización.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">10. Contacto</h2>
          <p>
            Para cualquier consulta sobre esta política de privacidad, contacta con nosotros en 
            sigridgg.sg@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
