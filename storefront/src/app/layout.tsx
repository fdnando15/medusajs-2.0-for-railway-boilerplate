import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Poppins } from "next/font/google"
import "styles/globals.css"
import JsonLd from "@modules/common/components/json-ld"

const BASE_URL = "https://sigridbolsos.com"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Sigrid - Bolsos Artesanales Hechos a Mano en Sevilla",
    template: "%s | Sigrid Bolsos Artesanales",
  },
  description:
    "Bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas, piezas exclusivas y complementos artesanales. Moda artesanal espanola con disenos unicos.",
  keywords: [
    "bolsos artesanales",
    "bolsos hechos a mano",
    "bolsos edicion limitada",
    "bolsos exclusivos mujer",
    "bolsos Sevilla",
    "bolsos Arahal",
    "complementos artesanales",
    "moda artesanal espanola",
  ],
  authors: [{ name: "Sigrid Bolsos Artesanales" }],
  creator: "Sigrid Bolsos Artesanales",
  publisher: "Sigrid Bolsos Artesanales",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Sigrid Bolsos Artesanales",
    title: "Sigrid - Bolsos Artesanales Hechos a Mano en Sevilla",
    description:
      "Bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas, piezas exclusivas y complementos artesanales.",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Sigrid Bolsos Artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigrid - Bolsos Artesanales Hechos a Mano en Sevilla",
    description:
      "Bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas y piezas exclusivas.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  other: {
    "theme-color": "#ad7777",
  },
  alternates: {
    canonical: BASE_URL,
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sigrid Bolsos Artesanales",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-sigrid.png`,
  description:
    "Bolsos artesanales hechos a mano en Arahal, Sevilla. Ediciones limitadas y piezas exclusivas.",
  sameAs: [
    "https://www.facebook.com/p/Sigrid-Bolsos-100068897574178/",
    "https://www.instagram.com/sigridbolsos/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34687852542",
    email: "sigridgg.sg@gmail.com",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sigrid Bolsos Artesanales",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-sigrid.png`,
  image: `${BASE_URL}/og-image.jpg`,
  description:
    "Taller artesanal de bolsos hechos a mano. Ediciones limitadas y piezas exclusivas.",
  telephone: "+34687852542",
  email: "sigridgg.sg@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arahal",
    addressRegion: "Sevilla",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.2617,
    longitude: -5.5447,
  },
  sameAs: [
    "https://www.facebook.com/p/Sigrid-Bolsos-100068897574178/",
    "https://www.instagram.com/sigridbolsos/",
  ],
  priceRange: "$$",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light">
      <body className={`${poppins.variable} font-sans antialiased relative`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
