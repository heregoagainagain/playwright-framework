import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  formLayoutsPage() {
    this.page.getByText("Forms").click();
    this.page.getByText("Form Layouts").click();
  }
}
