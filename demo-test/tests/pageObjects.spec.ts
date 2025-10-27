import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.smartTablePage();
  await navigateTo.datePickerPage();
  await navigateTo.toastrPage();
  await navigateTo.toolTipPage();
});

test("parametrized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayouts = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayouts.submitUsingTheGridFormWithCredentialsAndSelectedOption(
    "test@test.com",
    "Welcome1",
    "Option 2"
  );

  await onFormLayouts.submitInlineFormWithNameEmailAndCheckbox(
    "Baver Sul",
    "baver@baver.com",
    true
  );
});
