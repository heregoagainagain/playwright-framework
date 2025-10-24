import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
   await page.goto('http://localhost:4200/');
   await page.getByText('Forms').click();
     await page.getByText('Form Layouts').click();
});



test('Locator syntax rules', async ({page}) => {
    // by tag name
    page.locator('input').first().click();

    //by id
    await page.locator('#inputEmail1')
    
    //by class name
    page.locator('.shape-rectangle');
    
    //by attribute
    page.locator('[placeholder="Email"]');

    //by Class value (full)
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"');

    // combine different locators
    page.locator('input#inputEmail1.shape-rectangle');

    // by xpath
    page.locator('//input[@id="inputEmail1"]'); // not recommended

    // by partial text match
    page.locator(':text("Using")');

    // by exact text match
    page.locator('text="Using the Grid"');
});

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "Sign in"}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    // await page.getByTitle('IoT Dashboard').click();
    await page.getByTestId('SignIn').click();
});

test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', {name:'Sign in'}).first().click();

    await page.locator('nb-card').nth(3).getByRole('button').click(); // avoid using this
});