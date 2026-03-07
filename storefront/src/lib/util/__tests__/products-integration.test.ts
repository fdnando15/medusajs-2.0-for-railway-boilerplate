import { getProductPrice } from "../get-product-price"
import { sortProducts } from "../sort-products"
import { isSimpleProduct } from "../product"
import { convertToLocale } from "../money"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

describe("Integración: Productos de las 3 categorías de Sigrid Bolsos", () => {
  const productoLimitado: HttpTypes.StoreProduct = {
    id: "limitado_rosa_01",
    title: "Bolso Limitado Rosa Palo",
    handle: "bolso-limitado-rosa-palo",
    created_at: "2024-03-01T00:00:00Z",
    category_ids: ["cat_limitados"],
    options: [
      {
        id: "opt_default",
        title: "Default",
        values: [{ id: "val_default", value: "Default" }],
      },
    ],
    variants: [
      {
        id: "var_lim_01",
        title: "Default",
        calculated_price: {
          calculated_amount: 75,
          original_amount: 75,
          currency_code: "eur",
          calculated_price: {
            price_list_type: "default",
          },
        },
      } as any,
    ],
  } as HttpTypes.StoreProduct

  const productoExclusivo: HttpTypes.StoreProduct = {
    id: "exclusivo_mauve_01",
    title: "Bolso Exclusivo Mauve",
    handle: "bolso-exclusivo-mauve",
    created_at: "2024-02-15T00:00:00Z",
    category_ids: ["cat_exclusivos"],
    options: [
      {
        id: "opt_default",
        title: "Default",
        values: [{ id: "val_default", value: "Default" }],
      },
    ],
    variants: [
      {
        id: "var_exc_01",
        title: "Default",
        calculated_price: {
          calculated_amount: 120,
          original_amount: 120,
          currency_code: "eur",
          calculated_price: {
            price_list_type: "default",
          },
        },
      } as any,
    ],
  } as HttpTypes.StoreProduct

  const productoAccesorio: HttpTypes.StoreProduct = {
    id: "accesorio_llavero_01",
    title: "Llavero Artesanal",
    handle: "llavero-artesanal",
    created_at: "2024-03-10T00:00:00Z",
    category_ids: ["cat_accesorios"],
    options: [
      {
        id: "opt_default",
        title: "Default",
        values: [{ id: "val_default", value: "Default" }],
      },
    ],
    variants: [
      {
        id: "var_acc_01",
        title: "Default",
        calculated_price: {
          calculated_amount: 15,
          original_amount: 15,
          currency_code: "eur",
          calculated_price: {
            price_list_type: "default",
          },
        },
      } as any,
    ],
  } as HttpTypes.StoreProduct

  describe("Validación de productos simples", () => {
    test("todos los productos de Sigrid son productos simples (sin variantes ni tallas)", () => {
      expect(isSimpleProduct(productoLimitado)).toBe(true)
      expect(isSimpleProduct(productoExclusivo)).toBe(true)
      expect(isSimpleProduct(productoAccesorio)).toBe(true)
    })
  })

  describe("Cálculo de precios", () => {
    test("Bolso Limitado (€75) - categoría limitados", () => {
      const resultado = getProductPrice({ product: productoLimitado })
      
      expect(resultado.cheapestPrice).not.toBeNull()
      expect(resultado.cheapestPrice?.calculated_price_number).toBe(75)
      expect(resultado.cheapestPrice?.currency_code).toBe("eur")
      expect(resultado.cheapestPrice?.percentage_diff).toBe("0")
    })

    test("Bolso Exclusivo (€120) - categoría exclusivos", () => {
      const resultado = getProductPrice({ product: productoExclusivo })
      
      expect(resultado.cheapestPrice).not.toBeNull()
      expect(resultado.cheapestPrice?.calculated_price_number).toBe(120)
      expect(resultado.cheapestPrice?.currency_code).toBe("eur")
      expect(resultado.cheapestPrice?.percentage_diff).toBe("0")
    })

    test("Llavero Artesanal (€15) - categoría accesorios", () => {
      const resultado = getProductPrice({ product: productoAccesorio })
      
      expect(resultado.cheapestPrice).not.toBeNull()
      expect(resultado.cheapestPrice?.calculated_price_number).toBe(15)
      expect(resultado.cheapestPrice?.currency_code).toBe("eur")
      expect(resultado.cheapestPrice?.percentage_diff).toBe("0")
    })
  })

  describe("Formateo de precios en español", () => {
    test("formatea precios en EUR con locale es-ES", () => {
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
  })

  describe("Ordenamiento por precio", () => {
    test("ordena productos de menor a mayor precio", () => {
      const productos = [productoLimitado, productoExclusivo, productoAccesorio]
      const ordenados = sortProducts(productos, "price_asc" as SortOptions)
      
      expect(ordenados[0].id).toBe("accesorio_llavero_01") // €15
      expect(ordenados[1].id).toBe("limitado_rosa_01") // €75
      expect(ordenados[2].id).toBe("exclusivo_mauve_01") // €120
    })

    test("ordena productos de mayor a menor precio", () => {
      const productos = [productoAccesorio, productoLimitado, productoExclusivo]
      const ordenados = sortProducts(productos, "price_desc" as SortOptions)
      
      expect(ordenados[0].id).toBe("exclusivo_mauve_01") // €120
      expect(ordenados[1].id).toBe("limitado_rosa_01") // €75
      expect(ordenados[2].id).toBe("accesorio_llavero_01") // €15
    })

    test("ordena productos por fecha de creación (más reciente primero)", () => {
      const productos = [productoLimitado, productoExclusivo, productoAccesorio]
      const ordenados = sortProducts(productos, "created_at" as SortOptions)
      
      expect(ordenados[0].id).toBe("accesorio_llavero_01") // 2024-03-10
      expect(ordenados[1].id).toBe("limitado_rosa_01") // 2024-03-01
      expect(ordenados[2].id).toBe("exclusivo_mauve_01") // 2024-02-15
    })
  })

  describe("Categorías específicas", () => {
    test("filtra productos de categoría limitados", () => {
      const productos = [productoLimitado, productoExclusivo, productoAccesorio]
      const limitados = productos.filter(p => 
        p.category_ids?.includes("cat_limitados")
      )
      
      expect(limitados).toHaveLength(1)
      expect(limitados[0].id).toBe("limitado_rosa_01")
    })

    test("filtra productos de categoría exclusivos", () => {
      const productos = [productoLimitado, productoExclusivo, productoAccesorio]
      const exclusivos = productos.filter(p => 
        p.category_ids?.includes("cat_exclusivos")
      )
      
      expect(exclusivos).toHaveLength(1)
      expect(exclusivos[0].id).toBe("exclusivo_mauve_01")
    })

    test("filtra productos de categoría accesorios", () => {
      const productos = [productoLimitado, productoExclusivo, productoAccesorio]
      const accesorios = productos.filter(p => 
        p.category_ids?.includes("cat_accesorios")
      )
      
      expect(accesorios).toHaveLength(1)
      expect(accesorios[0].id).toBe("accesorio_llavero_01")
    })
  })

  describe("Validación completa de producto", () => {
    test("un producto típico de Sigrid tiene todas las propiedades correctas", () => {
      const producto = productoLimitado
      
      // Es producto simple (sin variantes)
      expect(isSimpleProduct(producto)).toBe(true)
      
      // Tiene precio calculado
      const { cheapestPrice } = getProductPrice({ product: producto })
      expect(cheapestPrice).not.toBeNull()
      expect(cheapestPrice?.calculated_price_number).toBeGreaterThan(0)
      
      // Precio en euros
      expect(cheapestPrice?.currency_code).toBe("eur")
      
      // Sin descuentos (precio original = precio calculado)
      expect(cheapestPrice?.calculated_price_number).toBe(
        cheapestPrice?.original_price_number
      )
      expect(cheapestPrice?.percentage_diff).toBe("0")
      
      // Tiene categoría asignada
      expect(producto.category_ids).toBeDefined()
      expect(producto.category_ids!.length).toBeGreaterThan(0)
      
      // Tiene handle para URL
      expect(producto.handle).toBeDefined()
      expect(producto.handle).toMatch(/^[a-z0-9-]+$/)
    })
  })
})
