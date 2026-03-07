import { sortProducts } from "../sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

describe("sortProducts", () => {
  const mockProducts: HttpTypes.StoreProduct[] = [
    {
      id: "prod_01",
      title: "Bolso Caro",
      created_at: "2024-01-15T00:00:00Z",
      variants: [
        {
          id: "var_01",
          calculated_price: {
            calculated_amount: 100,
          },
        } as any,
      ],
    } as HttpTypes.StoreProduct,
    {
      id: "prod_02",
      title: "Bolso Barato",
      created_at: "2024-01-10T00:00:00Z",
      variants: [
        {
          id: "var_02",
          calculated_price: {
            calculated_amount: 30,
          },
        } as any,
      ],
    } as HttpTypes.StoreProduct,
    {
      id: "prod_03",
      title: "Bolso Medio",
      created_at: "2024-01-20T00:00:00Z",
      variants: [
        {
          id: "var_03",
          calculated_price: {
            calculated_amount: 60,
          },
        } as any,
      ],
    } as HttpTypes.StoreProduct,
  ]

  test("ordena productos por precio ascendente", () => {
    const resultado = sortProducts([...mockProducts], "price_asc" as SortOptions)
    
    expect(resultado[0].id).toBe("prod_02") // 30
    expect(resultado[1].id).toBe("prod_03") // 60
    expect(resultado[2].id).toBe("prod_01") // 100
  })

  test("ordena productos por precio descendente", () => {
    const resultado = sortProducts([...mockProducts], "price_desc" as SortOptions)
    
    expect(resultado[0].id).toBe("prod_01") // 100
    expect(resultado[1].id).toBe("prod_03") // 60
    expect(resultado[2].id).toBe("prod_02") // 30
  })

  test("ordena productos por fecha de creación (más reciente primero)", () => {
    const resultado = sortProducts([...mockProducts], "created_at" as SortOptions)
    
    expect(resultado[0].id).toBe("prod_03") // 2024-01-20
    expect(resultado[1].id).toBe("prod_01") // 2024-01-15
    expect(resultado[2].id).toBe("prod_02") // 2024-01-10
  })

  test("maneja productos sin variantes", () => {
    const productosSinVariantes: HttpTypes.StoreProduct[] = [
      {
        id: "prod_sin_var",
        title: "Producto sin variantes",
        variants: [],
      } as HttpTypes.StoreProduct,
    ]

    const resultado = sortProducts(productosSinVariantes, "price_asc" as SortOptions)
    expect(resultado).toHaveLength(1)
  })

  test("maneja productos con variantes sin precio calculado", () => {
    const productosInvalidos: HttpTypes.StoreProduct[] = [
      {
        id: "prod_invalido",
        title: "Producto sin precio",
        variants: [
          {
            id: "var_invalido",
            calculated_price: null,
          } as any,
        ],
      } as HttpTypes.StoreProduct,
    ]

    const resultado = sortProducts(productosInvalidos, "price_asc" as SortOptions)
    expect(resultado).toHaveLength(1)
  })

  test("ordena productos de Sigrid Bolsos (3 categorías)", () => {
    const productosSigrid: HttpTypes.StoreProduct[] = [
      {
        id: "limitado_01",
        title: "Bolso Limitado Rosa",
        created_at: "2024-03-01T00:00:00Z",
        category_ids: ["cat_limitados"],
        variants: [
          {
            id: "var_lim_01",
            calculated_price: { calculated_amount: 75 },
          } as any,
        ],
      } as HttpTypes.StoreProduct,
      {
        id: "exclusivo_01",
        title: "Bolso Exclusivo Mauve",
        created_at: "2024-02-15T00:00:00Z",
        category_ids: ["cat_exclusivos"],
        variants: [
          {
            id: "var_exc_01",
            calculated_price: { calculated_amount: 120 },
          } as any,
        ],
      } as HttpTypes.StoreProduct,
      {
        id: "accesorio_01",
        title: "Llavero Artesanal",
        created_at: "2024-03-10T00:00:00Z",
        category_ids: ["cat_accesorios"],
        variants: [
          {
            id: "var_acc_01",
            calculated_price: { calculated_amount: 15 },
          } as any,
        ],
      } as HttpTypes.StoreProduct,
    ]

    const ordenAscendente = sortProducts([...productosSigrid], "price_asc" as SortOptions)
    expect(ordenAscendente[0].id).toBe("accesorio_01") // 15€
    expect(ordenAscendente[1].id).toBe("limitado_01") // 75€
    expect(ordenAscendente[2].id).toBe("exclusivo_01") // 120€
  })

  test("ordena el array en el lugar (muta el array)", () => {
    const original = [...mockProducts]
    
    const resultado = sortProducts(original, "price_asc" as SortOptions)
    
    // La función retorna el mismo array (mutado)
    expect(resultado).toBe(original)
    // Y el array está ordenado
    expect(resultado[0].id).toBe("prod_02")
  })
})
