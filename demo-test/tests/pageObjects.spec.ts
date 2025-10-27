import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().toolTipPage();
});

test("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectedOption(
      "test@test.com",
      "Welcome1",
      "Option 2"
    );

  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      "Baver Sul",
      "baver@baver.com",
      true
    );
});
