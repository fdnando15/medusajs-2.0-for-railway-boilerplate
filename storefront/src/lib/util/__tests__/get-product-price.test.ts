import { getProductPrice, getPricesForVariant } from "../get-product-price"
import { HttpTypes } from "@medusajs/types"

describe("getProductPrice", () => {
  test("lanza error si no hay producto", () => {
    expect(() => {
      getProductPrice({ product: null as any })
    }).toThrow("No product provided")
  })

  test("lanza error si el producto no tiene id", () => {
    expect(() => {
      getProductPrice({ product: {} as any })
    }).toThrow("No product provided")
  })

  test("retorna el precio más barato cuando no se especifica variantId", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_01",
      title: "Bolso Limitado",
      variants: [
        {
          id: "var_01",
          calculated_price: {
            calculated_amount: 100,
            original_amount: 100,
            currency_code: "eur",
            calculated_price: {
              price_list_type: "default",
            },
          },
        } as any,
        {
          id: "var_02",
          calculated_price: {
            calculated_amount: 75,
            original_amount: 75,
            currency_code: "eur",
            calculated_price: {
              price_list_type: "default",
            },
          },
        } as any,
        {
          id: "var_03",
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

    const resultado = getProductPrice({ product: producto })
    
    expect(resultado.cheapestPrice).not.toBeNull()
    expect(resultado.cheapestPrice?.calculated_price_number).toBe(75)
    expect(resultado.variantPrice).toBeNull()
  })

  test("retorna precio de variante específica cuando se proporciona variantId", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_01",
      title: "Bolso",
      variants: [
        {
          id: "var_especifica",
          calculated_price: {
            calculated_amount: 85,
            original_amount: 85,
            currency_code: "eur",
            calculated_price: {
              price_list_type: "default",
            },
          },
        } as any,
        {
          id: "var_otra",
          calculated_price: {
            calculated_amount: 60,
            original_amount: 60,
            currency_code: "eur",
            calculated_price: {
              price_list_type: "default",
            },
          },
        } as any,
      ],
    } as HttpTypes.StoreProduct

    const resultado = getProductPrice({ 
      product: producto, 
      variantId: "var_especifica" 
    })
    
    expect(resultado.variantPrice).not.toBeNull()
    expect(resultado.variantPrice?.calculated_price_number).toBe(85)
  })

  test("retorna null cuando no hay variantes", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_01",
      title: "Bolso sin variantes",
      variants: [],
    } as HttpTypes.StoreProduct

    const resultado = getProductPrice({ product: producto })
    
    expect(resultado.cheapestPrice).toBeNull()
  })

  test("producto simple de Sigrid Bolsos (sin descuentos)", () => {
    const bolsoLimitado: HttpTypes.StoreProduct = {
      id: "limitado_01",
      title: "Bolso Limitado Rosa",
      variants: [
        {
          id: "var_lim_01",
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

    const resultado = getProductPrice({ product: bolsoLimitado })
    
    expect(resultado.cheapestPrice).not.toBeNull()
    expect(resultado.cheapestPrice?.calculated_price_number).toBe(75)
    expect(resultado.cheapestPrice?.original_price_number).toBe(75)
    expect(resultado.cheapestPrice?.currency_code).toBe("eur")
    expect(resultado.cheapestPrice?.percentage_diff).toBe("0")
  })

  test("ignora variantes sin calculated_price", () => {
    const producto: HttpTypes.StoreProduct = {
      id: "prod_01",
      title: "Producto con variante inválida",
      variants: [
        {
          id: "var_sin_precio",
          calculated_price: null,
        } as any,
        {
          id: "var_con_precio",
          calculated_price: {
            calculated_amount: 50,
            original_amount: 50,
            currency_code: "eur",
            calculated_price: {
              price_list_type: "default",
            },
          },
        } as any,
      ],
    } as HttpTypes.StoreProduct

    const resultado = getProductPrice({ product: producto })
    
    expect(resultado.cheapestPrice).not.toBeNull()
    expect(resultado.cheapestPrice?.calculated_price_number).toBe(50)
  })
})

describe("getPricesForVariant", () => {
  test("retorna null si la variante no tiene calculated_price", () => {
    const variante = {
      id: "var_01",
      calculated_price: null,
    }
    
    expect(getPricesForVariant(variante)).toBeNull()
  })

  test("retorna null si calculated_price no tiene calculated_amount", () => {
    const variante = {
      id: "var_01",
      calculated_price: {
        calculated_amount: null,
      },
    }
    
    expect(getPricesForVariant(variante)).toBeNull()
  })

  test("calcula correctamente todos los campos de precio", () => {
    const variante = {
      id: "var_01",
      calculated_price: {
        calculated_amount: 100,
        original_amount: 100,
        currency_code: "eur",
        calculated_price: {
          price_list_type: "default",
        },
      },
    }
    
    const resultado = getPricesForVariant(variante)
    
    expect(resultado).not.toBeNull()
    expect(resultado?.calculated_price_number).toBe(100)
    expect(resultado?.original_price_number).toBe(100)
    expect(resultado?.currency_code).toBe("eur")
    expect(resultado?.price_type).toBe("default")
    expect(resultado?.percentage_diff).toBe("0")
  })

  test("formatea precio con convertToLocale", () => {
    const variante = {
      id: "var_01",
      calculated_price: {
        calculated_amount: 75,
        original_amount: 75,
        currency_code: "eur",
        calculated_price: {
          price_list_type: "default",
        },
      },
    }
    
    const resultado = getPricesForVariant(variante)
    
    expect(resultado?.calculated_price).toContain("75")
    expect(resultado?.original_price).toContain("75")
  })
})
