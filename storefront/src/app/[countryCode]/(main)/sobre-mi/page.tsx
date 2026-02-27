import Image from "next/image"
import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Sobre mi - Sigrid Bolsos Artesanales",
  description:
    "Conoce la historia de Sigrid, bolsos artesanales hechos a mano en Arahal, Sevilla.",
}

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-light tracking-wide md:text-5xl">
            Hola, soy Sigrid
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] md:text-xl">
            La persona detras de cada puntada
          </p>
        </div>
      </section>

      {/* Imagen maquina de coser */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/sigrid-sobremi.webp"
              alt="Maquina de coser - Taller Sigrid"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Historia Personal */}
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-light md:text-3xl">
            Todo empezo con una fascinacion por lo hecho a mano.
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            <p>
              Desde pequena me atraian los objetos con historia, esos que puedes
              sentir que alguien creo con sus manos. Creci viendo como mi abuela
              trabajaba la tela, transformando materiales simples en piezas que
              duraban generaciones.
            </p>
            <p>
              Ese respeto por el proceso artesanal nunca me abandono. Me he
              formado sobre patronaje y tejidos pero siempre sentia que faltaba
              algo: la conexion directa con el objeto, el tiempo dedicado a cada
              detalle, la posibilidad de crear algo verdaderamente unico.
            </p>
            <p>
              Asi nacio Sigrid. Un espacio donde puedo trabajar a mi ritmo,
              elegir cada material con cuidado, y crear bolsos que no son solo
              accesorios, sino companeros de vida.
            </p>
          </div>
        </div>
      </section>

      {/* El Proceso Creativo */}
      <section className="py-16 px-4 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-light md:text-3xl">
            Crear un bolso Sigrid es un proceso lento y reflexivo
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            <p>
              Cada modelo nace de un boceto en papel. Pienso en las personas que
              conozco, en sus vidas ocupadas, en lo que necesitan llevar consigo.
              Funcionalidad, si, pero tambien belleza.
            </p>
            <p>
              Elijo los materiales tocandolos, sintiendo su textura. Pruebo
              combinaciones, descarto, vuelvo a empezar. Y cuando finalmente
              empiezo a coser, cada puntada lleva mi atencion completa.
            </p>
            <p>
              No trabajo en cadena. No hay prisa. Porque lo que vale la pena
              lleva tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* La Filosofia */}
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-light md:text-3xl">
            Creo en lo autentico.
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            <p>
              En un mundo de produccion masiva, elegir un objeto artesanal es un
              acto de resistencia. Valoro el tiempo, el talento y el cuidado.
            </p>
            <p>
              Los bolsos Sigrid son para personas que entienden esto, que
              prefieren tener menos piezas, pero que cada una cuente. Que valoran
              la calidad y exclusividad sobre la cantidad.
            </p>
            <p>Si estas aqui, probablemente eres una de ellas.</p>
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="py-16 px-4 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-light md:text-3xl">
            Cada bolso es una promesa
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            <p>
              Una promesa de que esta hecho con los mejores materiales que puedo
              encontrar. De que cada costura esta reforzada, cada detalle
              revisado. De que si algo no me convence, lo deshago y empiezo de
              nuevo.
            </p>
            <p>
              Porque cuando llevas un Sigrid, llevas algo que hice pensando en
              que durara, en que te acompanara en tu dia a dia, en que te hiciera
              sentir especial.
            </p>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: "oklch(0.68 0.05 20 / 0.2)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-light md:text-3xl">
            Gracias por valorar lo hecho a mano
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            Gracias por tomarte el tiempo de conocer la historia detras de estos
            bolsos. Espero que encuentres una pieza que te acompane y que, con el
            tiempo, tambien cuente tu historia.
          </p>
          <p className="mb-8 text-lg font-light italic text-[var(--foreground)]">
            Con carino,
            <br />
            Sigrid
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocalizedClientLink href="/#colecciones">
              <button className="btn-sigrid-primary">Ver la coleccion</button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/contacto">
              <button className="btn-sigrid-outline">Escribeme</button>
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
