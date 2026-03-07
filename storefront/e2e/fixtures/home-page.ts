import { Locator, Page } from "@playwright/test"
import { BasePage } from "./base/base-page"

export class HomePage extends BasePage {
  // Hero section
  heroSection: Locator
  viewCollectionButton: Locator
  
  // Colecciones section
  coleccionesSection: Locator
  edicionesLimitadasButton: Locator
  edicionesExclusivasButton: Locator
  accesoriosButton: Locator

  constructor(page: Page) {
    super(page)
    this.heroSection = page.locator("#hero")
    this.viewCollectionButton = page.getByTestId("hero-view-collection-btn")
    
    this.coleccionesSection = page.locator("#colecciones")
    this.edicionesLimitadasButton = page.getByTestId("category-limitados-btn")
    this.edicionesExclusivasButton = page.getByTestId("category-exclusivos-btn")
    this.accesoriosButton = page.getByTestId("category-accesorios-btn")
  }

  async goto() {
    await this.page.goto("/")
    await this.heroSection.waitFor({ state: "visible" })
  }

  async goToColecciones() {
    await this.viewCollectionButton.click()
    await this.coleccionesSection.waitFor({ state: "visible" })
  }

  async goToLimitados() {
    await this.edicionesLimitadasButton.click()
    await this.page.waitForURL("**/categories/limitados")
  }

  async goToExclusivos() {
    await this.edicionesExclusivasButton.click()
    await this.page.waitForURL("**/categories/exclusivos")
  }

  async goToAccesorios() {
    await this.accesoriosButton.click()
    await this.page.waitForURL("**/categories/accesorios")
  }
}
