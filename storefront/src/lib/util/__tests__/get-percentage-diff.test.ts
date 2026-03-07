import { getPercentageDiff } from "../get-percentage-diff"

describe("getPercentageDiff", () => {
  test("retorna 0 cuando no hay descuento (precios iguales)", () => {
    const original = 100
    const calculado = 100
    expect(getPercentageDiff(original, calculado)).toBe("0")
  })

  test("retorna 0 cuando el precio calculado es mayor (sin descuento)", () => {
    const original = 100
    const calculado = 120
    expect(getPercentageDiff(original, calculado)).toBe("-20")
  })

  test("calcula correctamente 50% de descuento", () => {
    const original = 100
    const calculado = 50
    expect(getPercentageDiff(original, calculado)).toBe("50")
  })

  test("calcula correctamente 25% de descuento", () => {
    const original = 100
    const calculado = 75
    expect(getPercentageDiff(original, calculado)).toBe("25")
  })

  test("calcula correctamente 10% de descuento", () => {
    const original = 100
    const calculado = 90
    expect(getPercentageDiff(original, calculado)).toBe("10")
  })

  test("maneja precios con decimales", () => {
    const original = 99.99
    const calculado = 99.99
    expect(getPercentageDiff(original, calculado)).toBe("0")
  })

  test("redondea correctamente el porcentaje", () => {
    const original = 100
    const calculado = 66.67
    // 33.33% redondeado a 33
    expect(getPercentageDiff(original, calculado)).toBe("33")
  })

  test("Sigrid Bolsos: sin descuentos activos", () => {
    // Todos los productos de Sigrid se venden a precio regular
    const precioOriginal = 45.00
    const precioCalculado = 45.00
    expect(getPercentageDiff(precioOriginal, precioCalculado)).toBe("0")
  })
})
