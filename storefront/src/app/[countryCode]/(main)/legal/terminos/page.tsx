import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de compra en Sigrid Bolsos Artesanales.",
  robots: "noindex, nofollow",
}

export default function TerminosPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-ui-fg-base">Términos y Condiciones</h1>
        
        <div className="prose prose-sm max-w-none text-ui-fg-subtle">
          <p className="text-sm text-ui-fg-muted mb-8">
            Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">1. Información general</h2>
          <p>
            Las presentes condiciones generales de venta regulan la relación comercial entre 
            Sigrid Bolsos (en adelante, "nosotros") y los usuarios que realicen compras a través 
            de la tienda online sigridbolsos.com (en adelante, "el cliente").
          </p>
          <p>
            Al realizar un pedido, el cliente acepta estas condiciones en su totalidad.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">2. Productos</h2>
          <p>
            Todos nuestros productos son bolsos y accesorios artesanales, elaborados a mano en 
            Arahal, Sevilla. Dado su carácter artesanal:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Cada pieza es única y puede presentar ligeras variaciones respecto a las fotografías</li>
            <li>Los colores pueden variar ligeramente según la pantalla del dispositivo</li>
            <li>Las medidas indicadas son aproximadas</li>
          </ul>
          <p>
            Estas características inherentes a los productos artesanales no se consideran defectos 
            y no dan derecho a devolución.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">3. Precios</h2>
          <p>
            Los precios mostrados incluyen el IVA aplicable. Nos reservamos el derecho a modificar 
            los precios en cualquier momento, pero los pedidos se facturarán al precio vigente en 
            el momento de la confirmación del pedido.
          </p>
          <p>
            El precio total del pedido, incluyendo gastos de envío si los hubiera, se mostrará 
            antes de confirmar la compra.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">4. Proceso de compra</h2>
          <ol className="list-decimal pl-6 my-4">
            <li>Selecciona los productos que deseas y añádelos al carrito</li>
            <li>Accede al carrito y revisa tu pedido</li>
            <li>Introduce tus datos de envío y facturación</li>
            <li>Selecciona el método de envío</li>
            <li>Realiza el pago de forma segura</li>
            <li>Recibirás un email de confirmación con los detalles de tu pedido</li>
          </ol>
          <p>
            El contrato de compraventa se perfecciona en el momento en que recibas el email de 
            confirmación del pedido.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">5. Formas de pago</h2>
          <p>Aceptamos los siguientes métodos de pago:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Tarjeta de crédito/débito (Visa, Mastercard)</li>
          </ul>
          <p>
            Los pagos se procesan de forma segura a través de Stripe. No almacenamos los datos de 
            tu tarjeta.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">6. Envíos</h2>
          <p>
            Realizamos envíos a toda España peninsular. El envío es gratuito en todos los pedidos.
          </p>
          <p>
            Los plazos de entrega estimados son de 3-5 días laborables desde la confirmación del 
            pedido. Estos plazos son orientativos y pueden variar según la disponibilidad del 
            producto y la zona de entrega.
          </p>
          <p>
            Para envíos a Baleares, Canarias, Ceuta y Melilla, consultar disponibilidad y condiciones 
            contactando con nosotros.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">7. Derecho de desistimiento</h2>
          <p>
            De acuerdo con la normativa vigente, dispones de un plazo de <strong>14 días naturales</strong> desde 
            la recepción del producto para ejercer tu derecho de desistimiento sin necesidad de 
            justificación.
          </p>
          <p>Para ejercer este derecho:</p>
          <ol className="list-decimal pl-6 my-4">
            <li>Comunícanos tu decisión enviando un email a sigridgg.sg@gmail.com</li>
            <li>El producto debe devolverse en su estado original, sin usar y con su embalaje</li>
            <li>Los gastos de devolución corren a cargo del cliente</li>
            <li>Una vez recibido y verificado el estado del producto, procederemos al reembolso en un plazo máximo de 14 días</li>
          </ol>
          <p>
            No se admitirán devoluciones de productos personalizados o hechos a medida según las 
            especificaciones del cliente.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">8. Devoluciones por defectos</h2>
          <p>
            Si recibes un producto defectuoso o dañado durante el transporte, contacta con nosotros 
            en un plazo de 48 horas desde la recepción, adjuntando fotografías del producto y del 
            embalaje.
          </p>
          <p>
            En caso de defecto confirmado, te ofreceremos la reparación, sustitución o reembolso 
            del producto, asumiendo nosotros los gastos de envío.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">9. Garantía</h2>
          <p>
            Todos nuestros productos tienen una garantía legal de 3 años para productos nuevos, 
            conforme a la legislación española. Esta garantía cubre los defectos de conformidad 
            que existieran en el momento de la entrega.
          </p>
          <p>
            La garantía no cubre el desgaste normal por uso ni los daños causados por un uso 
            inadecuado del producto.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">10. Atención al cliente</h2>
          <p>
            Para cualquier consulta, incidencia o reclamación, puedes contactar con nosotros:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Email: sigridgg.sg@gmail.com</li>
            <li>WhatsApp: +34 687 85 25 42</li>
          </ul>
          <p>Atendemos consultas de lunes a viernes, de 10:00 a 18:00.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">11. Legislación aplicable</h2>
          <p>
            Estas condiciones se rigen por la legislación española. Para la resolución de cualquier 
            controversia, las partes se someten a los Juzgados y Tribunales de Sevilla.
          </p>
          <p>
            También puedes recurrir a la plataforma de resolución de litigios en línea de la Unión 
            Europea: <a href="https://ec.europa.eu/consumers/odr" className="text-ui-fg-interactive hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>
          </p>
        </div>
      </div>
    </div>
  )
}
