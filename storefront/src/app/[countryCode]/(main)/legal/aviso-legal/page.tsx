import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Sigrid Bolsos Artesanales conforme a la LSSI.",
  robots: "noindex, nofollow",
}

export default function AvisoLegalPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-ui-fg-base">Aviso Legal</h1>
        
        <div className="prose prose-sm max-w-none text-ui-fg-subtle">
          <p className="text-sm text-ui-fg-muted mb-8">
            Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
            de la Información y Comercio Electrónico (LSSI-CE), se informa al usuario de los datos del 
            titular de este sitio web:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Titular:</strong> [NOMBRE COMPLETO O RAZÓN SOCIAL]</li>
            <li><strong>NIF/CIF:</strong> [NIF/CIF]</li>
            <li><strong>Domicilio:</strong> [DIRECCIÓN COMPLETA], Arahal, Sevilla, España</li>
            <li><strong>Correo electrónico:</strong> sigridgg.sg@gmail.com</li>
            <li><strong>Sitio web:</strong> sigridbolsos.com</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">2. Objeto</h2>
          <p>
            Este sitio web tiene como objeto la venta de bolsos artesanales y accesorios de moda, 
            elaborados de forma artesanal en Arahal, Sevilla.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">3. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, 
            iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una 
            obra cuya propiedad pertenece a Sigrid Bolsos, sin que puedan entenderse cedidos al usuario 
            ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario 
            para el correcto uso de la web.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, comunicación pública y transformación de estos 
            contenidos sin autorización expresa del titular.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">4. Responsabilidad</h2>
          <p>
            El titular no se hace responsable de los daños y perjuicios de cualquier naturaleza que 
            pudieran ocasionarse por la falta de disponibilidad o continuidad del funcionamiento del 
            sitio web, ni por los errores u omisiones en los contenidos.
          </p>
          <p>
            Asimismo, no se garantiza la ausencia de virus u otros elementos que pudieran causar daños 
            en los sistemas informáticos del usuario.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">5. Enlaces a terceros</h2>
          <p>
            Este sitio web puede contener enlaces a sitios de terceros. El titular no asume ninguna 
            responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web de terceros.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">6. Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia 
            que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los 
            Juzgados y Tribunales de Sevilla, renunciando expresamente a cualquier otro fuero que 
            pudiera corresponderles.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-ui-fg-base">7. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros a 
            través del correo electrónico sigridgg.sg@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
