import { Metadata } from "next"
import JsonLd from "@modules/common/components/json-ld"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Sigrid por WhatsApp, email o Instagram. Bolsos artesanales hechos a mano en Arahal, Sevilla. Atencion personalizada.",
  openGraph: {
    title: "Contacto | Sigrid Bolsos Artesanales",
    description:
      "Contacta con Sigrid por WhatsApp, email o Instagram. Bolsos artesanales desde Arahal, Sevilla.",
    url: "https://sigridbolsos.com/es/contacto",
  },
  alternates: {
    canonical: "https://sigridbolsos.com/es/contacto",
  },
}

// Instagram icon
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

// Location icon
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Haces envios internacionales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si, enviamos a toda Espana, Europa y algunos paises internacionales. Los gastos de envio se calculan automaticamente segun tu ubicacion.",
      },
    },
    {
      "@type": "Question",
      name: "Puedo ver los bolsos en persona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Actualmente trabajo desde mi taller y solo vendo online, pero comparto muchas fotos y videos detallados de cada pieza para que puedas verla desde todos los angulos.",
      },
    },
    {
      "@type": "Question",
      name: "Cuanto tiempo tarda en llegar un pedido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los pedidos salen en un plazo de 2-3 dias laborables. El envio nacional suele tardar 2-3 dias, y el internacional entre 5-14 dias segun el destino.",
      },
    },
    {
      "@type": "Question",
      name: "Haces piezas personalizadas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ocasionalmente acepto encargos personalizados. Escribeme por WhatsApp o email contandome que tienes en mente y vere si puedo hacerlo realidad.",
      },
    },
  ],
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={faqSchema} />
      {/* Hero Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-light tracking-wide md:text-5xl">
            Hablemos
          </h1>
        </div>
      </section>

      {/* Intro Text */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            Detras de Sigrid hay una persona real que lee cada mensaje y responde
            personalmente.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            Si tienes dudas sobre algun bolso o quieres saber mas sobre el
            proceso, escribeme.
          </p>
        </div>
      </section>

      {/* Formas de contacto principales */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-light md:text-3xl">
            Elige como prefieres contactarme
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
            {/* WhatsApp */}
            <div className="border border-[var(--border)] p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="mb-3 text-xl font-medium">WhatsApp</h3>
              <p className="mb-6 text-sm text-[var(--muted-foreground)]">
                La forma mas rapida de contactarme. Respondo personalmente.
              </p>
              <a
                href="https://wa.me/34687852542"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-sigrid-primary w-full">
                  Escribir por WhatsApp
                </button>
              </a>
            </div>

            {/* Email */}
            <div className="border border-[var(--border)] p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="mb-3 text-xl font-medium">Email</h3>
              <p className="mb-6 text-sm text-[var(--muted-foreground)]">
                Prefiero emails para consultas mas detalladas.
              </p>
              <a href="mailto:sigridgg.sg@gmail.com">
                <button className="btn-sigrid-outline w-full">
                  Enviar email
                </button>
              </a>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                sigridgg.sg@gmail.com
              </p>
            </div>
          </div>

          {/* Otras formas de contacto */}
          <div
            className="p-8"
            style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
          >
            <h3 className="mb-6 text-xl font-light text-center">
              Tambien me puedes encontrar aqui
            </h3>

            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ad7777]/10">
                  <span className="text-[#ad7777]">
                    <InstagramIcon />
                  </span>
                </div>
                <div>
                  <h4 className="mb-1 font-medium">Instagram</h4>
                  <a
                    href="https://instagram.com/sigridbolsos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted-foreground)] hover:text-sigrid-accent transition-colors"
                  >
                    @sigridbolsos
                  </a>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Comparto el dia a dia del taller, nuevos disenos y el proceso
                    detras de cada pieza.
                  </p>
                </div>
              </div>

              {/* Ubicacion */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ad7777]/10">
                  <span className="text-[#ad7777]">
                    <LocationIcon />
                  </span>
                </div>
                <div>
                  <h4 className="mb-1 font-medium">Taller</h4>
                  <p className="text-[var(--muted-foreground)]">
                    Arahal, Sevilla
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Actualmente trabajo desde mi taller y solo vendo online, pero
                    comparto muchas fotos y videos detallados de cada pieza.
                  </p>
                </div>
              </div>
            </div>

            {/* Horario */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <h4 className="mb-2 font-medium">Horario de respuesta</h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                Lunes a Viernes: 9:00 - 18:00
                <br />
                Fines de semana: Respondo los lunes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-light">
            Preguntas frecuentes
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">
                Haces envios internacionales?
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Si, enviamos a toda Espana, Europa y algunos paises
                internacionales. Los gastos de envio se calculan automaticamente
                segun tu ubicacion.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">
                Puedo ver los bolsos en persona?
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Actualmente trabajo desde mi taller y solo vendo online, pero
                comparto muchas fotos y videos detallados de cada pieza para que
                puedas verla desde todos los angulos.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">
                Cuanto tiempo tarda en llegar un pedido?
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Los pedidos salen en un plazo de 2-3 dias laborables. El envio
                nacional suele tardar 2-3 dias, y el internacional entre 5-14
                dias segun el destino.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">
                Haces piezas personalizadas?
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Ocasionalmente acepto encargos personalizados. Escribeme por
                WhatsApp o email contandome que tienes en mente y vere si puedo
                hacerlo realidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-16 px-4 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-light md:text-3xl">
            Estoy aqui para ayudarte
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            Ya sea que tengas una pregunta sencilla o quieras hablar sobre un
            proyecto especial, no dudes en escribirme. Me hace feliz conectar con
            personas que valoran el trabajo artesanal.
          </p>
          <p className="text-lg font-light text-[var(--foreground)]">
            Te espero al otro lado del mensaje.
          </p>
        </div>
      </section>
    </div>
  )
}
