/**
 * Script de tests para verificar la Store API de Medusa
 * 
 * Uso:
 *   npx ts-node src/scripts/test-store.ts
 * 
 * O con URL personalizada:
 *   BACKEND_URL=https://tu-backend.railway.app PUBLISHABLE_KEY=pk_xxx npx ts-node src/scripts/test-store.ts
 * 
 * La Publishable API Key se puede obtener del Admin de Medusa en Settings > API Keys
 */

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY || ""

interface TestResult {
  name: string
  passed: boolean
  message: string
  details?: any
}

const results: TestResult[] = []

function log(message: string, type: "info" | "success" | "error" | "warn" = "info") {
  const colors = {
    info: "\x1b[36m",    // cyan
    success: "\x1b[32m", // green
    error: "\x1b[31m",   // red
    warn: "\x1b[33m",    // yellow
  }
  const reset = "\x1b[0m"
  const prefix = {
    info: "ℹ",
    success: "✓",
    error: "✗",
    warn: "⚠",
  }
  console.log(`${colors[type]}${prefix[type]} ${message}${reset}`)
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL}${endpoint}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  
  if (PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = PUBLISHABLE_KEY
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })
  
  const data = await response.json()
  return { response, data }
}

// ============================================================
// TEST 1: Verificar listado de categorías y productos
// ============================================================
async function test1_CategoriesAndProducts(): Promise<TestResult> {
  const testName = "Test 1: Listado de categorías y productos"
  log(`\nEjecutando: ${testName}`, "info")
  
  try {
    // 1.1 Obtener categorías
    log("  1.1 Obteniendo categorías...", "info")
    const { response: catRes, data: catData } = await fetchAPI("/store/product-categories")
    
    if (!catRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al obtener categorías: ${catRes.status}`,
        details: catData,
      }
    }
    
    const categories = catData.product_categories || []
    log(`      Encontradas ${categories.length} categorías`, "info")
    
    if (categories.length === 0) {
      return {
        name: testName,
        passed: false,
        message: "No se encontraron categorías",
      }
    }
    
    // Mostrar categorías
    categories.forEach((cat: any) => {
      log(`      - ${cat.name} (handle: ${cat.handle})`, "info")
    })
    
    // 1.2 Obtener productos de la primera categoría
    const firstCategory = categories[0]
    log(`  1.2 Obteniendo productos de "${firstCategory.name}"...`, "info")
    
    const { response: prodRes, data: prodData } = await fetchAPI(
      `/store/products?category_id=${firstCategory.id}`
    )
    
    if (!prodRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al obtener productos: ${prodRes.status}`,
        details: prodData,
      }
    }
    
    const products = prodData.products || []
    log(`      Encontrados ${products.length} productos en "${firstCategory.name}"`, "info")
    
    // Mostrar primeros 5 productos
    products.slice(0, 5).forEach((prod: any) => {
      const variant = prod.variants?.[0]
      const price = variant?.calculated_price?.calculated_amount
      const currency = variant?.calculated_price?.currency_code || "EUR"
      const priceStr = price ? `${price} ${currency}` : "Sin precio"
      log(`      - ${prod.title} (${priceStr})`, "info")
    })
    
    return {
      name: testName,
      passed: true,
      message: `OK: ${categories.length} categorías, ${products.length} productos en "${firstCategory.name}"`,
      details: {
        categoriesCount: categories.length,
        productsCount: products.length,
        firstCategory: firstCategory.name,
      },
    }
    
  } catch (error: any) {
    return {
      name: testName,
      passed: false,
      message: `Error: ${error.message}`,
    }
  }
}

// ============================================================
// TEST 2: Crear carrito, añadir producto, verificar
// ============================================================
async function test2_CartFlow(): Promise<TestResult> {
  const testName = "Test 2: Flujo de carrito (crear, añadir producto, verificar)"
  log(`\nEjecutando: ${testName}`, "info")
  
  try {
    // 2.1 Obtener regiones disponibles
    log("  2.1 Obteniendo regiones...", "info")
    const { response: regRes, data: regData } = await fetchAPI("/store/regions")
    
    if (!regRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al obtener regiones: ${regRes.status}`,
      }
    }
    
    const regions = regData.regions || []
    if (regions.length === 0) {
      return {
        name: testName,
        passed: false,
        message: "No se encontraron regiones configuradas",
      }
    }
    
    const region = regions[0]
    log(`      Usando región: ${region.name} (${region.currency_code})`, "info")
    
    // 2.2 Obtener un producto disponible
    log("  2.2 Buscando un producto disponible...", "info")
    const { response: prodRes, data: prodData } = await fetchAPI(
      `/store/products?limit=1&region_id=${region.id}`
    )
    
    if (!prodRes.ok || !prodData.products?.length) {
      return {
        name: testName,
        passed: false,
        message: "No se encontraron productos disponibles",
      }
    }
    
    const product = prodData.products[0]
    const variant = product.variants?.[0]
    
    if (!variant) {
      return {
        name: testName,
        passed: false,
        message: `El producto "${product.title}" no tiene variantes`,
      }
    }
    
    log(`      Producto: ${product.title}`, "info")
    log(`      Variante ID: ${variant.id}`, "info")
    
    // 2.3 Crear carrito
    log("  2.3 Creando carrito...", "info")
    const { response: cartRes, data: cartData } = await fetchAPI("/store/carts", {
      method: "POST",
      body: JSON.stringify({
        region_id: region.id,
      }),
    })
    
    if (!cartRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al crear carrito: ${cartRes.status}`,
        details: cartData,
      }
    }
    
    const cart = cartData.cart
    log(`      Carrito creado: ${cart.id}`, "info")
    
    // 2.4 Añadir producto al carrito
    log("  2.4 Añadiendo producto al carrito...", "info")
    const { response: addRes, data: addData } = await fetchAPI(
      `/store/carts/${cart.id}/line-items`,
      {
        method: "POST",
        body: JSON.stringify({
          variant_id: variant.id,
          quantity: 1,
        }),
      }
    )
    
    if (!addRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al añadir producto: ${addRes.status}`,
        details: addData,
      }
    }
    
    log(`      Producto añadido correctamente`, "success")
    
    // 2.5 Verificar que el carrito tiene el producto
    log("  2.5 Verificando contenido del carrito...", "info")
    const { response: getRes, data: getData } = await fetchAPI(`/store/carts/${cart.id}`)
    
    if (!getRes.ok) {
      return {
        name: testName,
        passed: false,
        message: `Error al obtener carrito: ${getRes.status}`,
      }
    }
    
    const updatedCart = getData.cart
    const items = updatedCart.items || []
    
    if (items.length === 0) {
      return {
        name: testName,
        passed: false,
        message: "El carrito está vacío después de añadir el producto",
      }
    }
    
    const addedItem = items.find((item: any) => item.variant_id === variant.id)
    
    if (!addedItem) {
      return {
        name: testName,
        passed: false,
        message: "El producto no se encontró en el carrito",
      }
    }
    
    log(`      Carrito contiene ${items.length} item(s)`, "info")
    log(`      - ${addedItem.title} x${addedItem.quantity}`, "info")
    
    // Mostrar total del carrito
    const total = updatedCart.total || 0
    const currency = updatedCart.currency_code || "EUR"
    log(`      Total: ${total} ${currency.toUpperCase()}`, "info")
    
    return {
      name: testName,
      passed: true,
      message: `OK: Carrito creado, producto "${product.title}" añadido, verificado correctamente`,
      details: {
        cartId: cart.id,
        productTitle: product.title,
        variantId: variant.id,
        itemsCount: items.length,
        total: `${total} ${currency}`,
      },
    }
    
  } catch (error: any) {
    return {
      name: testName,
      passed: false,
      message: `Error: ${error.message}`,
    }
  }
}

// ============================================================
// EJECUTAR TODOS LOS TESTS
// ============================================================
async function runAllTests() {
  console.log("\n" + "=".repeat(60))
  console.log("  TESTS DE STORE API - Sigrid Bolsos")
  console.log("=".repeat(60))
  log(`Backend URL: ${BACKEND_URL}`, "info")
  
  if (!PUBLISHABLE_KEY) {
    log("PUBLISHABLE_KEY no configurada", "error")
    log("Obtén la Publishable API Key del Admin de Medusa:", "warn")
    log("  1. Ve al Admin: https://tu-admin.railway.app/app", "info")
    log("  2. Settings > API Keys > Publishable Keys", "info")
    log("  3. Copia la key y ejecuta:", "info")
    log("     PUBLISHABLE_KEY=pk_xxx pnpm test:store", "info")
    process.exit(1)
  }
  log(`Publishable Key: ${PUBLISHABLE_KEY.substring(0, 10)}...`, "info")
  
  // Verificar conectividad
  log("\nVerificando conectividad...", "info")
  try {
    const response = await fetch(`${BACKEND_URL}/health`)
    if (response.ok) {
      log("Backend accesible", "success")
    } else {
      log(`Backend respondió con status ${response.status}`, "warn")
    }
  } catch (error: any) {
    log(`No se puede conectar al backend: ${error.message}`, "error")
    log("Asegúrate de que el backend está corriendo y la URL es correcta", "warn")
    process.exit(1)
  }
  
  // Ejecutar tests
  results.push(await test1_CategoriesAndProducts())
  results.push(await test2_CartFlow())
  
  // Resumen
  console.log("\n" + "=".repeat(60))
  console.log("  RESUMEN DE TESTS")
  console.log("=".repeat(60))
  
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  
  results.forEach(result => {
    if (result.passed) {
      log(`${result.name}: ${result.message}`, "success")
    } else {
      log(`${result.name}: ${result.message}`, "error")
      if (result.details) {
        console.log("    Detalles:", JSON.stringify(result.details, null, 2))
      }
    }
  })
  
  console.log("\n" + "-".repeat(60))
  if (failed === 0) {
    log(`Todos los tests pasaron (${passed}/${results.length})`, "success")
  } else {
    log(`Tests: ${passed} pasaron, ${failed} fallaron`, failed > 0 ? "error" : "success")
  }
  console.log("")
  
  process.exit(failed > 0 ? 1 : 0)
}

// Ejecutar
runAllTests()
