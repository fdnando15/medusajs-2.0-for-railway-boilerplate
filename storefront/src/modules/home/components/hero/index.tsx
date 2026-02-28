import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Video a pantalla completa */}
      <section className="relative h-screen w-full overflow-hidden" id="hero">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center blur-md brightness-[0.6] contrast-75 saturate-75 scale-110"
          aria-label="Video de Sigrid cosiendo bolsos artesanales"
        >
          <source src="/video-sigrid-herosection.webm" type="video/webm" />
        </video>

        {/* Contenido centrado */}
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="mb-6 text-xl font-semibold tracking-wide text-sigrid-accent md:text-3xl md:tracking-widest lg:text-4xl">
            PRIMAVERA-VERANO 2026
          </p>
          <a href="#colecciones">
            <button className="btn-sigrid-primary text-base md:text-lg px-8 py-4">
              Ver coleccion
            </button>
          </a>
        </div>
      </section>

      {/* Seccion: Por que Sigrid? */}
      <section className="bg-white py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <h3 className="mb-3 text-xl font-semibold">Disenos unicos</h3>
              <p className="text-[var(--muted-foreground)]">
                Cada bolso es una creacion exclusiva. No encontraras dos piezas
                iguales. Tu estilo merece algo tan unico como tu.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="mb-3 text-xl font-semibold">Hechos a mano</h3>
              <p className="text-[var(--muted-foreground)]">
                Cada puntada, cada detalle, esta cuidado con dedicacion. Creamos
                bolsos con tiempo, paciencia y amor por el oficio.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="mb-3 text-xl font-semibold">Edicion limitada</h3>
              <p className="text-[var(--muted-foreground)]">
                Producimos pocas unidades de cada modelo. Cuando tienes un
                Sigrid, llevas contigo una pieza especial y dificil de
                encontrar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion: Colecciones */}
      <section
        className="py-24 px-4"
        id="colecciones"
        style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Encuentra tu companero perfecto
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card: Ediciones Limitadas */}
            <div className="overflow-hidden border border-[var(--border)] bg-white transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-[var(--muted)]/20">
                <Image
                  src="/sigrid-bolso-edicion.webp"
                  alt="Bolsos de edicion limitada Sigrid"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-semibold">
                  Ediciones Limitadas
                </h3>
                <p className="mb-6 text-[var(--muted-foreground)]">
                  Colecciones de temporada. Pocas unidades, mucho caracter.
                </p>
                <LocalizedClientLink href="/categories/limitados">
                  <button className="btn-sigrid-outline w-full">
                    Ver ediciones limitadas
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Card: Exclusivos */}
            <div className="overflow-hidden border border-[var(--border)] bg-white transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-[var(--muted)]/20">
                <Image
                  src="/sigrid-bolso-exclusivo.png"
                  alt="Bolsos exclusivos Sigrid"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-semibold">Exclusivos</h3>
                <p className="mb-6 text-[var(--muted-foreground)]">
                  Piezas únicas y exclusivas. No encontrarás dos iguales.
                </p>
                <LocalizedClientLink href="/categories/exclusivos">
                  <button className="btn-sigrid-outline w-full">
                    Ver exclusivos
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Card: Accesorios */}
            <div className="overflow-hidden border border-[var(--border)] bg-white transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-[var(--muted)]/20">
                <Image
                  src="/sigrid-bolso-exclusivo.png"
                  alt="Accesorios Sigrid"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-semibold">Accesorios</h3>
                <p className="mb-6 text-[var(--muted-foreground)]">
                  Bisutería y coleteros para complementar tu look.
                </p>
                <LocalizedClientLink href="/categories/accesorios">
                  <button className="btn-sigrid-outline w-full">
                    Ver accesorios
                  </button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
