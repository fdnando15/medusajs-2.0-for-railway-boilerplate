import { isSimpleProduct } from "../product"
import { HttpTypes } from "@medusajs/types"

describe("isSimpleProduct", () => {
  test("retorna true para producto simple (1 opción, 1 valor)", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_01",
      title: "Bolso Limitado",
      options: [
        {
          id: "opt_01",
          title: "Default",
          values: [
            {
              id: "val_01",
              value: "Default",
            },
          ],
        },
      ],
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(producto)).toBe(true)
  })

  test("retorna false para producto con múltiples opciones", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_02",
      title: "Producto con variantes",
      options: [
        {
          id: "opt_01",
          title: "Talla",
          values: [
            { id: "val_01", value: "S" },
            { id: "val_02", value: "M" },
            { id: "val_03", value: "L" },
          ],
        },
        {
          id: "opt_02",
          title: "Color",
          values: [
            { id: "val_04", value: "Negro" },
            { id: "val_05", value: "Blanco" },
          ],
        },
      ],
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(producto)).toBe(false)
  })

  test("retorna false para producto con 1 opción pero múltiples valores", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_03",
      title: "Producto con tallas",
      options: [
        {
          id: "opt_01",
          title: "Talla",
          values: [
            { id: "val_01", value: "S" },
            { id: "val_02", value: "M" },
            { id: "val_03", value: "L" },
          ],
        },
      ],
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(producto)).toBe(false)
  })

  test("retorna false para producto sin opciones", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_04",
      title: "Producto sin opciones",
      options: [],
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(producto)).toBe(false)
  })

  test("retorna false cuando options es undefined", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_05",
      title: "Producto sin opciones definidas",
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(producto)).toBe(false)
  })

  test("todos los productos de Sigrid Bolsos son simples (sin variantes ni tallas)", () => {
    const bolsoLimitado: HttpTypes.StoreProduct = {
      id: "prod_limitado_01",
      title: "Bolso Limitado Rosa",
      options: [
        {
          id: "opt_default",
          title: "Default",
          values: [{ id: "val_default", value: "Default" }],
        },
      ],
    } as HttpTypes.StoreProduct

    const bolsoExclusivo: HttpTypes.StoreProduct = {
      id: "prod_exclusivo_01",
      title: "Bolso Exclusivo Mauve",
      options: [
        {
          id: "opt_default",
          title: "Default",
          values: [{ id: "val_default", value: "Default" }],
        },
      ],
    } as HttpTypes.StoreProduct

    const accesorio: HttpTypes.StoreProduct = {
      id: "prod_accesorio_01",
      title: "Llavero Artesanal",
      options: [
        {
          id: "opt_default",
          title: "Default",
          values: [{ id: "val_default", value: "Default" }],
        },
      ],
    } as HttpTypes.StoreProduct

    expect(isSimpleProduct(bolsoLimitado)).toBe(true)
    expect(isSimpleProduct(bolsoExclusivo)).toBe(true)
    expect(isSimpleProduct(accesorio)).toBe(true)
  })
})
