import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Poppins } from "next/font/google"
import "styles/globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Sigrid - Bolsos Artesanales",
  description:
    "Tienda online de bolsos artesanales de edicion limitada y exclusivos. Hechos a mano en Arahal, Sevilla.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light">
      <body className={`${poppins.variable} font-sans antialiased relative`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
