import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly fromLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromLayoutsMenuItem = this.page.getByText("Form Layouts");
    this.datePickerMenuItem = this.page.getByText("Datepicker");
    this.smartTableMenuItem = this.page.getByText("Smart Table");
    this.toastrMenuItem = this.page.getByText("Toastr");
    this.tooltipMenuItem = this.page.getByText("Tooltip");
  }
  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.fromLayoutsMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datePickerMenuItem.click();
  }
  async smartTablePage() {
    await this.page.getByText("Tables & Data").click();
    await this.smartTableMenuItem.click();
  }
  async toastrPage() {
    await this.page.getByText("Modal & Overlays").click();
    await this.toastrMenuItem.click();
  }
  async toolTipPage() {
    await this.page.getByText("Modal & Overlays").click();
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      groupMenuItem.click();
    }
  }
}
