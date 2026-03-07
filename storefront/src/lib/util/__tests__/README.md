# Tests Unitarios - Storefront Sigrid Bolsos

Suite de tests unitarios para las funciones utilitarias del storefront de Sigrid Bolsos.

## Cobertura

**Funciones utilitarias (`lib/util/`)**: 70.11% statements | 81.13% branches | 78.26% functions

### Archivos con 100% de cobertura

- ✅ `get-percentage-diff.ts` - Cálculo de descuentos
- ✅ `isEmpty.ts` - Validaciones de vacío
- ✅ `money.ts` - Formateo de precios en EUR
- ✅ `product.ts` - Validación de productos simples
- ✅ `sort-products.ts` - Ordenamiento de productos
- ✅ `get-product-price.ts` - 96.15% (casi completo)

## Estructura de Tests

### 1. `isEmpty.test.ts` (11 tests)
Valida funciones de detección de valores vacíos:
- null, undefined, objetos vacíos, arrays vacíos
- strings vacíos y solo espacios
- Validación de tipos (isObject, isArray)

### 2. `product.test.ts` (6 tests)
Valida identificación de productos simples:
- Productos sin variantes (1 opción, 1 valor)
- Productos con múltiples opciones/valores
- **Específico para Sigrid**: Todos los productos son simples (sin tallas ni variantes)

### 3. `get-percentage-diff.test.ts` (8 tests)
Calcula porcentajes de descuento:
- Sin descuentos (precio original = calculado)
- Descuentos del 10%, 25%, 50%
- **Específico para Sigrid**: Sin descuentos activos

### 4. `sort-products.test.ts` (8 tests)
Ordena productos por precio y fecha:
- Orden ascendente/descendente por precio
- Orden por fecha de creación (más reciente primero)
- Manejo de productos sin variantes o sin precios
- **Incluye productos de las 3 categorías**: limitados, exclusivos, accesorios

### 5. `money.test.ts` (11 tests)
Formatea precios en euros con locale español:
- Formato EUR con locale `es-ES` (ej: "75,00 €")
- Respeta `minimumFractionDigits` y `maximumFractionDigits`
- Maneja valores cero y negativos
- **Específico para Sigrid**: Precios típicos (€15, €75, €120)

### 6. `get-product-price.test.ts` (14 tests)
Calcula precios de productos y variantes:
- Lanza error si no hay producto
- Retorna precio más barato cuando no hay variante especificada
- Retorna precio de variante específica por ID
- Ignora variantes sin `calculated_price`
- **Específico para Sigrid**: Productos simples sin descuentos

### 7. `products-integration.test.ts` (15 tests)
**Tests de integración con las 3 categorías de Sigrid Bolsos**:

#### Categorías cubiertas
- **Limitados** (ej: Bolso Limitado Rosa Palo - €75)
- **Exclusivos** (ej: Bolso Exclusivo Mauve - €120)
- **Accesorios** (ej: Llavero Artesanal - €15)

#### Pruebas
- ✅ Todos los productos son simples (sin variantes)
- ✅ Cálculo de precios por categoría
- ✅ Formateo en español (locale es-ES)
- ✅ Ordenamiento por precio (asc/desc)
- ✅ Ordenamiento por fecha de creación
- ✅ Filtrado por categoría
- ✅ Validación completa de producto (handle, precio, categoría)

## Comandos

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Generar reporte de cobertura
pnpm test:coverage
```

## Características del Proyecto

### Configuración específica de Sigrid Bolsos
- **Moneda única**: EUR (euros)
- **Sin variantes**: Todos los productos son únicos (sin tallas ni colores)
- **Sin descuentos**: `calculated_price === original_price`
- **3 categorías**: limitados, exclusivos, accesorios
- **Locale**: es-ES (español de España)

### Tecnologías
- **Jest** 30.2.0
- **Testing Library React** 16.3.2
- **@swc/jest** para transformación rápida
- **jest-environment-jsdom** para tests de React

## Notas Técnicas

### Formateo de precios
El locale `es-ES` formatea EUR como `"75,00 €"` con:
- Coma (`,`) para decimales
- Espacio no-breakable (`\u00A0`) antes del símbolo `€`
- Símbolo de moneda al final

Los tests usan regex `/75,00\s€/` para validar el formato correcto.

### Ordenamiento de productos
La función `sortProducts()` **muta el array original** (no crea una copia). Esto es intencional para optimización de performance.

### Mocks de productos
Los tests usan datos que replican la estructura real de productos de Sigrid Bolsos:
- 1 opción "Default" con 1 valor "Default"
- 1 variante por producto
- Categorías reales: `cat_limitados`, `cat_exclusivos`, `cat_accesorios`
- Handles en kebab-case: `bolso-limitado-rosa-palo`

## Total de Tests

**73 tests** pasando exitosamente ✅
- 11 tests de isEmpty
- 6 tests de isSimpleProduct
- 8 tests de getPercentageDiff
- 8 tests de sortProducts
- 11 tests de money formatting
- 14 tests de getProductPrice
- 15 tests de integración con categorías
