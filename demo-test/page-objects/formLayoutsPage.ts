import { Page } from "@playwright/test";

export class FormLayoutsPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectedOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * this method will out the inline form with user details
   * @param name - User inline input name - should be first and last name
   * @param email - User inline email - valid email for the test user
   * @param rememberMe - rememberMe checkbox
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const usingTheGridInlineInput = this.page.locator("nb-card", {
      hasText: "Inline form",
    });

    await usingTheGridInlineInput
      .getByRole("textbox", { name: "Jane Doe" })
      .fill(email);
    await usingTheGridInlineInput
      .getByRole("textbox", { name: "Email" })
      .fill(email);

    if (rememberMe) {
      await usingTheGridInlineInput
        .getByRole("checkbox")
        .check({ force: true });
      await usingTheGridInlineInput.getByRole("button").click();
    }
  }
}
