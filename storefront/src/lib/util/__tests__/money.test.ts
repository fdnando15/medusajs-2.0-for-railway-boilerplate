import { convertToLocale } from "../money"

describe("convertToLocale", () => {
  test("formatea correctamente euros (EUR)", () => {
    const resultado = convertToLocale({
      amount: 45.99,
      currency_code: "eur",
    })
    
    expect(resultado).toBe("€45.99")
  })

  test("formatea euros con locale español", () => {
    const resultado = convertToLocale({
      amount: 45.99,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    // El formato español usa espacio no-breakable (U+00A0)
    expect(resultado).toMatch(/45,99\s€/)
    expect(resultado).toContain("45,99")
    expect(resultado).toContain("€")
  })

  test("formatea precios enteros en euros", () => {
    const resultado = convertToLocale({
      amount: 100,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    expect(resultado).toMatch(/100,00\s€/)
  })

  test("respeta minimumFractionDigits", () => {
    const resultado = convertToLocale({
      amount: 45,
      currency_code: "eur",
      minimumFractionDigits: 2,
      locale: "es-ES",
    })
    
    expect(resultado).toContain("45,00")
  })

  test("respeta maximumFractionDigits", () => {
    const resultado = convertToLocale({
      amount: 45.999,
      currency_code: "eur",
      maximumFractionDigits: 2,
      locale: "es-ES",
    })
    
    expect(resultado).toMatch(/46,00\s€/)
  })

  test("retorna string cuando currency_code está vacío", () => {
    const resultado = convertToLocale({
      amount: 45.99,
      currency_code: "",
    })
    
    expect(resultado).toBe("45.99")
  })

  test("maneja cantidad cero", () => {
    const resultado = convertToLocale({
      amount: 0,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    expect(resultado).toMatch(/0,00\s€/)
  })

  test("maneja cantidades negativas", () => {
    const resultado = convertToLocale({
      amount: -25.50,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    expect(resultado).toMatch(/-25,50\s€/)
  })

  test("formatea precios típicos de Sigrid Bolsos", () => {
    const precioLimitado = convertToLocale({
      amount: 75,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    const precioExclusivo = convertToLocale({
      amount: 120,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    const precioAccesorio = convertToLocale({
      amount: 15,
      currency_code: "eur",
      locale: "es-ES",
    })
    
    expect(precioLimitado).toMatch(/75,00\s€/)
    expect(precioExclusivo).toMatch(/120,00\s€/)
    expect(precioAccesorio).toMatch(/15,00\s€/)
  })

  test("usa locale en-US por defecto", () => {
    const resultado = convertToLocale({
      amount: 45.99,
      currency_code: "eur",
    })
    
    // en-US formatea EUR como €45.99
    expect(resultado).toMatch(/€.*45\.99/)
  })
})
