import { test, expect } from "@playwright/test";

const randomFrom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

test("multiple users leave reviews on multiple random books", async ({ page }) => {
  test.setTimeout(180_000);
  const reviewMessages = [
    "it was fun",
    "best book i have ever read",
    "eh not bad i guess",
    "it bad....like very bad",
    "life changing",
    "a bit slow but pretty good",
    "its generic"
  ];

  const numberOfUsers = 20;
  const reviewsPerUser = 4;

  for (let i = 1; i <= numberOfUsers; i++) {
    const email = `user${Date.now()}_${i}@critiq.com`;
    const password = "test123";

    // Register user
//     await page.addStyleTag({
//   content: `
//     *, *::before, *::after {
//       transition: none !important;
//       animation: none !important;
//     }
//   `
// });
    await page.goto("http://localhost:5173/register");
    await page.fill('input[placeholder="Username"]', `User${i}`);
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    //await page.getByRole("button", { name: "Register" }).click();
    const registerBtn = page.getByRole("button", { name: "Register" });
    await expect(registerBtn).toBeVisible();
    await registerBtn.click();
    await page.waitForURL("/");

    for (let j = 0; j < reviewsPerUser; j++) {
      await page.goto("http://localhost:5173/");

      // Get random book
      await page.waitForFunction(
        () =>
          document.querySelectorAll('[data-testid="book-link"]').length >= 28
      );
    const bookLinks = page.locator('[data-testid="book-link"]');
    //const bookLinks = await page.locator('[data-testid="book-link"]').all();//this is returning an array where we cant use count,nth
    //.book-list-container fade-in .book-grid .card slide-up book-card

        //console.log('Waiting for .book-card...');
        //await page.waitForSelector('.book-card', { state: 'visible' });
        //const bookLinks = page.locator('.book-card');
        const count = await bookLinks.count();
        console.log(`Found ${count} book cards`);
        const randomBookIndex = Math.floor(Math.random() * count);
        await bookLinks.nth(randomBookIndex).click();

      // Add review
      await page.getByRole("button", { name: "Add Your Review" }).click();
      await page.fill(
        'textarea[placeholder="Write your review here"]',
        randomFrom(reviewMessages)
      );


      await page.waitForSelector('.star-rating .star', { state: 'visible' });
      const starElements = page.locator(".star-rating .star");
      const starCount = await starElements.count();
      const randomIndex = Math.floor(Math.random() * starCount);
    //   await starElements.nth(randomIndex).click();
      const star = starElements.nth(randomIndex);
    await star.waitFor({ state: 'visible' });
    console.log(`Clicking star index: ${randomIndex}`);
    await star.click();
    //await page.waitForTimeout(500); // time to let animation complete 


      await page.getByRole("button", { name: "Submit Review" }).click();

      // Optional: take screenshot
      //await page.screenshot({ path: `test_images/review_${i}_${j}.png` });
    }

    // Logout
    const logoutBtn = page.getByRole("button", { name: "Logout" });
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();
  }
});
