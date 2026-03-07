import { test, expect } from "../../index"

test.describe("Flujo completo de compra - Ediciones Limitadas Sigrid Bolsos", async () => {
  test("Compra exitosa de bolso de edición limitada desde homepage", async ({
    homePage,
    categoryPage,
    productPage,
    cartPage,
    checkoutPage,
    orderPage,
  }) => {
    
    await test.step("1. Navegar a la homepage", async () => {
      await homePage.goto()
      await expect(homePage.heroSection).toBeVisible()
    })

    await test.step("2. Click en 'Ver colección' (scroll a #colecciones)", async () => {
      await homePage.goToColecciones()
      await expect(homePage.coleccionesSection).toBeVisible()
    })

    await test.step("3. Click en 'Ver ediciones limitadas'", async () => {
      await homePage.goToLimitados()
      await categoryPage.container.waitFor({ state: "visible" })
      // Verificar que estamos en la página correcta
      await expect(categoryPage.pageTitle).toBeVisible()
    })

    await test.step("4. Click en el primer bolso de la página", async () => {
      // Esperar a que carguen los productos
      await categoryPage.productsListLoader.waitFor({ state: "hidden" })
      const primerBolso = categoryPage.productWrapper.first()
      await primerBolso.waitFor({ state: "visible" })
      await primerBolso.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("5. Añadir a la cesta (sin seleccionar variantes - productos simples)", async () => {
      // Los productos de Sigrid no tienen variantes, click directo en añadir
      await productPage.clickAddProduct()
      await expect(productPage.cartDropdown.navCartLink).toContainText("(1)")
    })

    await test.step("6. Abrir cesta y finalizar compra", async () => {
      await productPage.cartDropdown.navCartLink.click()
      await productPage.cartDropdown.goToCartButton.click()
      await cartPage.container.waitFor({ state: "visible" })
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
    })

    await test.step("7. Rellenar dirección de envío", async () => {
      await checkoutPage.shippingFirstNameInput.fill("Antonio")
      await checkoutPage.shippingLastNameInput.fill("Sanchez")
      await checkoutPage.shippingAddressInput.fill("calle prueba")
      // Empresa vacía (no rellenamos shippingCompanyInput)
      await checkoutPage.shippingPostalCodeInput.fill("41600")
      await checkoutPage.shippingCityInput.fill("Arahal")
      await checkoutPage.shippingProvinceInput.fill("Sevilla")
      await checkoutPage.shippingCountrySelect.selectOption("Spain")
      await checkoutPage.shippingEmailInput.fill("fermurbra@gmail.com")
      await checkoutPage.shippingPhoneInput.fill("606579011")
      // Billing same as shipping (checkbox checked por defecto)
      await checkoutPage.submitAddressButton.click()
    })

    await test.step("8. Continuar con el envío (seleccionar opción de envío)", async () => {
      await checkoutPage.deliveryOptionRadio.first().waitFor({ state: "visible" })
      // Solo hay una opción de envío, seleccionar la primera
      await checkoutPage.deliveryOptionRadio.first().click()
      await checkoutPage.submitDeliveryOptionButton.click()
    })

    await test.step("9. Rellenar datos de tarjeta Stripe (test)", async () => {
      // Esperar a que aparezca el botón de pago
      await checkoutPage.submitPaymentButton.waitFor({ state: "visible" })
      
      // Click en el botón para mostrar el formulario de Stripe
      await checkoutPage.submitPaymentButton.click()
      
      // Stripe carga su iframe, necesitamos cambiar de contexto
      // Esperar a que aparezca el iframe de Stripe
      const stripeCardNumberFrame = checkoutPage.page.frameLocator('iframe[name^="__privateStripeFrame"]').first()
      
      // Rellenar número de tarjeta (4242 4242 4242 4242)
      await stripeCardNumberFrame.locator('[name="cardnumber"]').fill("4242424242424242")
      
      // Rellenar fecha de expiración (01/28)
      await stripeCardNumberFrame.locator('[name="exp-date"]').fill("0128")
      
      // Rellenar CVC (424)
      await stripeCardNumberFrame.locator('[name="cvc"]').fill("424")
      
      // Rellenar código postal (22222)
      await stripeCardNumberFrame.locator('[name="postal"]').fill("22222")
    })

    await test.step("10. Continuar con la revisión y realizar pedido", async () => {
      // El botón de pago ya debería estar visible después de rellenar Stripe
      // Si hay un botón de "Continuar con la revisión", clickearlo
      // De lo contrario, ir directamente a submitOrderButton
      
      // Esperar al botón de realizar pedido
      await checkoutPage.submitOrderButton.waitFor({ state: "visible", timeout: 10000 })
      await checkoutPage.submitOrderButton.click()
      
      // Esperar a la página de confirmación del pedido
      await orderPage.container.waitFor({ state: "visible", timeout: 30000 })
    })

    await test.step("11. Verificar que el pedido se completó exitosamente", async () => {
      // Verificar que estamos en la página de orden
      await expect(orderPage.container).toBeVisible()
      
      // Verificar que aparece el número de pedido
      // El orderPage debería tener un locator para el número de pedido
      const orderNumber = orderPage.page.getByTestId("order-number")
      await expect(orderNumber).toBeVisible()
      
      // Verificar que el texto contiene "Número de pedido:"
      await expect(orderNumber).toContainText(/Número de pedido:|Order number:|#/)
      
      // Test exitoso!
    })
  })
})
