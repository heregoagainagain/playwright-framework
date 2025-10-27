import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // by tag name
  page.locator("input").first().click();

  //by id
  await page.locator("#inputEmail1");

  //by class name
  page.locator(".shape-rectangle");

  //by attribute
  page.locator('[placeholder="Email"]');

  //by Class value (full)
  page.locator(
    'class="input-full-width size-medium status-basic shape-rectangle nb-transition"'
  );

  // combine different locators
  page.locator("input#inputEmail1.shape-rectangle");

  // by xpath
  page.locator('//input[@id="inputEmail1"]'); // not recommended

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator('text="Using the Grid"');
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();
  await page.getByText("Using the Grid").click();
  // await page.getByTitle('IoT Dashboard').click();
  await page.getByTestId("SignIn").click();
});

test("locators finding with parent", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("reusing the locatorssss", async ({ page }) => {
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button");

  await expect(emailField).toHaveValue("test@test.com");
});

test("extracting values", async ({ page }) => {
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();

  expect(buttonText).toEqual("Submit");

  //all text values
  const allRadioButtonsLabel = await page.locator("nb-radio").allTextContents();
  console.log(allRadioButtonsLabel);
  expect(allRadioButtonsLabel).toContain("Option 1");

  // input values
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("Test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("Test@test.com");

  const placeHolderValue = await emailField.getAttribute("placeholder");
  expect(placeHolderValue).toEqual("Email");
});

test("assertions", async ({ page }) => {
  const value = 5;
  expect(value).toEqual(5);
  const basicFormButton = page
    .locator("nb-card", { hasText: "Basic form" })
    .locator("button");

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  //Locator assertion
  await expect(basicFormButton).toHaveText("Submit");

  // Soft assertion
  await expect.soft(basicFormButton).toHaveText("Submit"); // It will continue execution
  await basicFormButton.click();
});
