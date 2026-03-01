import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Sigrid Bolsos Artesanales.",
  robots: "noindex, nofollow",
}

export default function CookiesPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-ui-fg-base">Política de Cookies</h1>
        
        <div className="prose prose-sm max-w-none text-ui-fg-subtle">
          <p className="text-sm text-ui-fg-muted mb-8">
            Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo 
            (ordenador, móvil o tablet) cuando los visitas. Sirven para recordar tus preferencias, 
            mejorar tu experiencia de navegación y permitir ciertas funcionalidades del sitio.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">2. ¿Qué cookies utilizamos?</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-3 text-ui-fg-base">Cookies técnicas (necesarias)</h3>
          <p>Son imprescindibles para el funcionamiento del sitio web. Sin ellas, no podrías navegar ni realizar compras.</p>
          <table className="w-full my-4 text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Cookie</th>
                <th className="text-left py-2">Finalidad</th>
                <th className="text-left py-2">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">_medusa_cart_id</td>
                <td className="py-2">Identificador del carrito de compra</td>
                <td className="py-2">Sesión</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">_medusa_region</td>
                <td className="py-2">Región/país seleccionado</td>
                <td className="py-2">1 año</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-medium mt-6 mb-3 text-ui-fg-base">Cookies de terceros</h3>
          
          <p><strong>Stripe (procesamiento de pagos)</strong></p>
          <p>
            Utilizamos Stripe para procesar los pagos de forma segura. Stripe puede establecer 
            cookies necesarias para la prevención del fraude y el procesamiento seguro del pago.
          </p>
          <table className="w-full my-4 text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Cookie</th>
                <th className="text-left py-2">Finalidad</th>
                <th className="text-left py-2">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">__stripe_mid</td>
                <td className="py-2">Prevención de fraude</td>
                <td className="py-2">1 año</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">__stripe_sid</td>
                <td className="py-2">Sesión de pago</td>
                <td className="py-2">30 minutos</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">3. ¿Cómo gestionar las cookies?</h2>
          <p>
            Puedes configurar tu navegador para rechazar cookies o para que te avise cuando se envíen. 
            Ten en cuenta que si desactivas las cookies técnicas, algunas funcionalidades del sitio 
            (como el carrito de compra) podrían no funcionar correctamente.
          </p>
          <p>Instrucciones para los navegadores más comunes:</p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
            <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">4. Actualizaciones</h2>
          <p>
            Esta política de cookies puede actualizarse. Te recomendamos revisarla periódicamente. 
            La fecha de la última actualización aparece al inicio de esta página.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">5. Contacto</h2>
          <p>
            Si tienes dudas sobre nuestra política de cookies, contacta con nosotros en 
            sigridgg.sg@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
