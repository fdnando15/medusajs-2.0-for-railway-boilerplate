# Testing - Storefront Sigrid Bolsos

Documentación completa de la suite de tests unitarios para el storefront de Sigrid Bolsos.

## Resumen Ejecutivo

✅ **73 tests unitarios** implementados  
📊 **70.11% de cobertura** en funciones utilitarias  
🎯 **100% de cobertura** en 5 módulos críticos  
🛍️ **3 categorías** de productos cubiertas: limitados, exclusivos, accesorios

## Comandos

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch (desarrollo)
pnpm test:watch

# Generar reporte de cobertura HTML
pnpm test:coverage
```

## Estructura de Tests

```
storefront/src/lib/util/__tests__/
├── isEmpty.test.ts                    # Validaciones de valores vacíos (11 tests)
├── product.test.ts                    # Productos simples sin variantes (6 tests)
├── get-percentage-diff.test.ts        # Cálculo de descuentos (8 tests)
├── sort-products.test.ts              # Ordenamiento por precio/fecha (8 tests)
├── money.test.ts                      # Formateo EUR con locale es-ES (11 tests)
├── get-product-price.test.ts          # Cálculo de precios (14 tests)
├── products-integration.test.ts       # Integración 3 categorías (15 tests)
└── README.md                          # Documentación detallada
```

## Cobertura por Módulo

| Módulo                  | Statements | Branches | Functions | Lines |
|------------------------|------------|----------|-----------|-------|
| `get-percentage-diff.ts` | 100%      | 100%     | 100%      | 100%  |
| `isEmpty.ts`            | 100%      | 100%     | 100%      | 100%  |
| `money.ts`              | 100%      | 100%     | 100%      | 100%  |
| `product.ts`            | 100%      | 100%     | 100%      | 100%  |
| `sort-products.ts`      | 100%      | 100%     | 100%      | 100%  |
| `get-product-price.ts`  | 96.15%    | 88.88%   | 100%      | 96%   |

## Categorías de Productos Testeadas

### 1. Limitados
- Ejemplo: "Bolso Limitado Rosa Palo"
- Precio: €75
- Handle: `bolso-limitado-rosa-palo`
- Category ID: `cat_limitados`
- URL: `/es/categories/limitados`

### 2. Exclusivos
- Ejemplo: "Bolso Exclusivo Mauve"
- Precio: €120
- Handle: `bolso-exclusivo-mauve`
- Category ID: `cat_exclusivos`
- URL: `/es/categories/exclusivos`

### 3. Accesorios
- Ejemplo: "Llavero Artesanal"
- Precio: €15
- Handle: `llavero-artesanal`
- Category ID: `cat_accesorios`
- URL: `/es/categories/accesorios`

## Características Específicas de Sigrid Bolsos

### Productos
- ✅ **Sin variantes**: Todos los productos son únicos (1 opción "Default", 1 valor "Default")
- ✅ **Sin tallas**: No hay opciones de tamaño
- ✅ **Sin descuentos**: `calculated_price === original_price`
- ✅ **Productos simples**: Detectados por `isSimpleProduct()`

### Precios
- 💶 **Moneda única**: EUR (euros)
- 🌍 **Locale**: es-ES (español de España)
- 📊 **Formato**: "75,00 €" (coma para decimales, espacio no-breakable antes de €)

### Ordenamiento
- 📈 Ascendente por precio (accesorios → limitados → exclusivos)
- 📅 Por fecha de creación (más recientes primero)

## Ejemplos de Tests

### Test de producto simple (sin variantes)

```typescript
test("todos los productos de Sigrid son simples", () => {
  const bolsoLimitado = {
    id: "limitado_01",
    title: "Bolso Limitado Rosa",
    options: [
      {
        id: "opt_default",
        title: "Default",
        values: [{ id: "val_default", value: "Default" }],
      },
    ],
  }

  expect(isSimpleProduct(bolsoLimitado)).toBe(true)
})
```

### Test de formateo de precio en español

```typescript
test("formatea precios en EUR con locale es-ES", () => {
  const precio = convertToLocale({
    amount: 75,
    currency_code: "eur",
    locale: "es-ES",
  })
  
  expect(precio).toMatch(/75,00\s€/)
})
```

### Test de ordenamiento por categorías

```typescript
test("ordena productos de las 3 categorías por precio", () => {
  const productos = [productoLimitado, productoExclusivo, productoAccesorio]
  const ordenados = sortProducts(productos, "price_asc")
  
  expect(ordenados[0].id).toBe("accesorio_01") // €15
  expect(ordenados[1].id).toBe("limitado_01")  // €75
  expect(ordenados[2].id).toBe("exclusivo_01") // €120
})
```

## Configuración Jest

### `jest.config.js`
- **Transform**: `@swc/jest` para TypeScript/JSX rápido
- **Environment**: `jsdom` para componentes React
- **Module mapping**: Aliases `@lib/*` y `@modules/*`
- **Coverage**: Incluye `src/lib/util/**/*.ts`

### Variables de entorno (test)
```javascript
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY="test-publishable-key"
NEXT_PUBLIC_BASE_URL="http://localhost:8000"
NEXT_PUBLIC_MEDUSA_BACKEND_URL="http://localhost:9000"
```

## Tecnologías

- **Jest** 30.2.0 - Test runner
- **@testing-library/react** 16.3.2 - Testing utilities
- **@testing-library/jest-dom** 6.9.1 - Matchers extendidos
- **@swc/jest** 0.2.39 - Transformación rápida
- **jest-environment-jsdom** 30.2.0 - DOM simulado

## Notas Técnicas

### Formateo de moneda con locale español
El locale `es-ES` usa espacio no-breakable (`\u00A0`) antes del símbolo €. Los tests usan regex `/\s€/` en lugar de comparación exacta con `toBe()`.

### Mutación de arrays
`sortProducts()` **muta el array original** para optimización. El test verifica que retorna el mismo array (no una copia).

### Mocks de productos
Los datos de test replican la estructura real de Medusa:
- `HttpTypes.StoreProduct` con tipado completo
- `calculated_price` con todos los campos requeridos
- `category_ids` con IDs reales de categorías

## CI/CD

Los tests se ejecutan automáticamente en:
- ✅ Pre-commit (opcional)
- ✅ Pull requests
- ✅ Merge a main/master

## Próximos Pasos (Opcional)

### Tests pendientes (no prioritarios)
- [ ] Tests de componentes React (ProductPrice, ProductActions)
- [ ] Tests de data fetching con SDK mockeado
- [ ] Tests de formularios (checkout, login)
- [ ] Tests E2E con Playwright (ya existen en `e2e/`)

### Mejoras futuras
- [ ] Aumentar cobertura a >90% en lib/util/
- [ ] Snapshot testing para componentes críticos
- [ ] Tests de accesibilidad (a11y)
- [ ] Tests de performance (Lighthouse)

## Recursos

- [Documentación Jest](https://jestjs.io/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [Tests detallados](./src/lib/util/__tests__/README.md)

---

**Última actualización**: 7 de marzo de 2026  
**Autor**: Equipo Sigrid Bolsos
