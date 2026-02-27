"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname, useParams } from "next/navigation"
import Link from "next/link"
import React from "react"

const navItems = [
  { href: "/", label: "Inicio" },
  {
    href: "/store",
    label: "Tienda",
    submenu: [
      {
        href: "/categories/limitados",
        label: "Ediciones Limitadas",
        image: "/sigrid-bolso-edicion.webp",
      },
      {
        href: "/categories/exclusivos",
        label: "Exclusivos",
        image: "/sigrid-bolso-exclusivo.png",
      },
      {
        href: "/categories/accesorios",
        label: "Accesorios",
        image: "/sigrid-bolso-exclusivo.png",
      },
    ],
  },
  { href: "/sobre-mi", label: "Sobre mi" },
  { href: "/contacto", label: "Contacto" },
]

export default function SigridNavClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false)
  const pathname = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  // Bloquear scroll cuando el menu movil esta abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // Cerrar menu movil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSubmenuOpen(false)
    setDesktopSubmenuOpen(false)
  }, [pathname])

  const localizedHref = (href: string) => `/${countryCode}${href}`

  const isActive = (href: string) => {
    const localized = localizedHref(href)
    if (href === "/") return pathname === localized
    return pathname.startsWith(localized)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[var(--border)]">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href={localizedHref("/")} className="flex items-center z-50">
          <Image
            src="/logo-sigrid.png"
            alt="Sigrid"
            width={180}
            height={72}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              {item.submenu ? (
                <button
                  onMouseEnter={() => setDesktopSubmenuOpen(true)}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    isActive(item.href)
                      ? "text-sigrid-accent"
                      : "text-[var(--foreground)] hover:text-sigrid-accent"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={localizedHref(item.href)}
                  onMouseEnter={() => setDesktopSubmenuOpen(false)}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    isActive(item.href)
                      ? "text-sigrid-accent"
                      : "text-[var(--foreground)] hover:text-sigrid-accent"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Submenu - 3 columnas en fila */}
        {desktopSubmenuOpen && (
          <>
            <div
              className="hidden md:block fixed inset-0 top-14 z-30"
              onClick={() => setDesktopSubmenuOpen(false)}
            />
            <div className="hidden md:block fixed left-0 right-0 top-14 bg-white border-b border-[var(--border)] shadow-lg z-40">
              <div className="max-w-4xl mx-auto px-8 py-10 relative">
                <div className="grid grid-cols-3 gap-8">
                  {navItems
                    .find((item) => item.submenu)
                    ?.submenu?.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={localizedHref(subitem.href)}
                        onClick={() => setDesktopSubmenuOpen(false)}
                        className="group"
                      >
                        <div className="relative aspect-[4/3] mb-3 overflow-hidden bg-[var(--muted)]/20">
                          <Image
                            src={subitem.image}
                            alt={subitem.label}
                            fill
                            className="object-contain transition-transform group-hover:scale-105"
                          />
                        </div>
                        <p className="text-sm font-light text-center group-hover:text-sigrid-accent transition-colors">
                          {subitem.label}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
              <button
                onClick={() => setDesktopSubmenuOpen(false)}
                className="absolute top-4 right-4 text-[var(--foreground)] hover:text-sigrid-accent transition-colors"
                aria-label="Cerrar menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Right side - Cart + Mobile Menu (sin Mi cuenta) */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart (Medusa integrated) */}
          <div className="relative">{children}</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative text-black hover:text-sigrid-accent transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (sin Mi cuenta) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white z-40 overflow-y-auto">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                      className="flex items-center justify-between w-full px-6 py-5 border-b border-[var(--border)] text-base font-light text-left"
                    >
                      <span
                        className={
                          isActive(item.href)
                            ? "text-sigrid-accent"
                            : "text-[var(--foreground)]"
                        }
                      >
                        {item.label}
                      </span>
                      <span className="text-[var(--muted-foreground)]">
                        {mobileSubmenuOpen ? "\u2212" : "+"}
                      </span>
                    </button>
                    {mobileSubmenuOpen && (
                      <div className="bg-[var(--muted)]/30">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={localizedHref(subitem.href)}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setMobileSubmenuOpen(false)
                            }}
                            className="flex items-center gap-4 px-6 py-4 border-b border-[var(--border)]/50"
                          >
                            <div className="relative w-20 h-20 flex-shrink-0 bg-[var(--muted)]/20">
                              <Image
                                src={subitem.image}
                                alt={subitem.label}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="text-base font-light">
                              {subitem.label}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={localizedHref(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-5 border-b border-[var(--border)] text-base font-light transition-colors ${
                      isActive(item.href)
                        ? "text-sigrid-accent"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
