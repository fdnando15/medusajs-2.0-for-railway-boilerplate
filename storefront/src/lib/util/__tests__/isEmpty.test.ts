import { isEmpty, isObject, isArray } from "../isEmpty"

describe("isEmpty", () => {
  test("retorna true para null", () => {
    expect(isEmpty(null)).toBe(true)
  })

  test("retorna true para undefined", () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  test("retorna true para objeto vacío", () => {
    expect(isEmpty({})).toBe(true)
  })

  test("retorna true para array vacío", () => {
    expect(isEmpty([])).toBe(true)
  })

  test("retorna true para string vacío", () => {
    expect(isEmpty("")).toBe(true)
  })

  test("retorna true para string solo con espacios", () => {
    expect(isEmpty("   ")).toBe(true)
  })

  test("retorna false para objeto con propiedades", () => {
    expect(isEmpty({ name: "Bolso" })).toBe(false)
  })

  test("retorna false para array con elementos", () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  test("retorna false para string con contenido", () => {
    expect(isEmpty("Sigrid Bolsos")).toBe(false)
  })

  test("retorna false para número 0", () => {
    expect(isEmpty(0)).toBe(false)
  })
})

describe("isObject", () => {
  test("retorna true para objeto literal", () => {
    expect(isObject({})).toBe(true)
  })

  test("retorna true para array", () => {
    expect(isObject([])).toBe(true)
  })

  test("retorna false para string", () => {
    expect(isObject("test")).toBe(false)
  })

  test("retorna false para número", () => {
    expect(isObject(123)).toBe(false)
  })

  test("retorna false para null", () => {
    expect(isObject(null)).toBe(false)
  })
})

describe("isArray", () => {
  test("retorna true para array", () => {
    expect(isArray([])).toBe(true)
  })

  test("retorna true para array con elementos", () => {
    expect(isArray([1, 2, 3])).toBe(true)
  })

  test("retorna false para objeto", () => {
    expect(isArray({})).toBe(false)
  })

  test("retorna false para string", () => {
    expect(isArray("test")).toBe(false)
  })
})
