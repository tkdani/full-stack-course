const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Takács Dániel",
        username: "danitakacs",
        password: "jelszo",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByRole("textbox").first().fill("danitakacs");
      await page.getByRole("textbox").last().fill("jelszo");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Takács Dániel logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByRole("textbox").first().fill("masik");
      await page.getByRole("textbox").last().fill("nemjo");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "login" }).click();
        await page.getByRole("textbox").first().fill("danitakacs");
        await page.getByRole("textbox").last().fill("jelszo");
        await page.getByRole("button", { name: "login" }).click();
      });

      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "new blog" }).click();
        await page.getByLabel("Title").fill("Test cim");
        await page.getByLabel("Author").fill("Takács Dániel");
        await page.getByLabel("Url").fill("test url");
        await page.getByRole("button", { name: "save" }).click();
        await expect(page.getByText("Test cim - Takács Dániel")).toBeVisible();
      });

      describe("A blog exists", () => {
        beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "new blog" }).click();
          await page.getByLabel("Title").fill("Test cim");
          await page.getByLabel("Author").fill("Takács Dániel");
          await page.getByLabel("Url").fill("test url");
          await page.getByRole("button", { name: "save" }).click();
        });

        test("A blog can be liked", async ({ page }) => {
          await page.getByRole("button", { name: "show" }).click();
          const likeButton = page.getByRole("button", { name: "like" });
          const likesDiv = page.locator("text=Likes 0");
          await expect(likesDiv).toBeVisible();

          likeButton.click();
          const likesDivAfter = page.locator("text=Likes 1");

          await expect(likesDivAfter).toHaveText("Likes 1like");
        });

        test("A user who made the blog can delete it", async ({ page }) => {
          await page.getByRole("button", { name: "show" }).click();
          const removeButton = page.getByRole("button", { name: "remove" });
          await expect(removeButton).toBeVisible();
          await removeButton.click();
          await expect(
            page.getByText("Test cim - Takács Dániel")
          ).not.toBeVisible();
          await expect(page.getByText('Blog "Test cim" deleted')).toBeVisible();
        });

        test("Only the user who added the blog sees the delete button", async ({
          page,
          request,
        }) => {
          await request.post("http://localhost:3003/api/users", {
            data: {
              name: "Másik János",
              username: "masikuser",
              password: "pass",
            },
          });

          await page.getByRole("button", { name: "logout" }).click();

          await page.getByRole("button", { name: "login" }).click();
          await page.getByRole("textbox").first().fill("masikuser");
          await page.getByRole("textbox").last().fill("pass");
          await page.getByRole("button", { name: "login" }).click();

          await expect(page.getByText("Másik János logged in")).toBeVisible();

          const blogLocator = page.locator(
            '.blogName:has-text("Test cim - Takács Dániel")'
          );
          await blogLocator.getByRole("button", { name: "show" }).click();

          const removeButton = page.getByRole("button", { name: "remove" });

          await expect(removeButton).toHaveCount(0);
        });
      });

      test("blogs are ordered by likes, most liked first", async ({ page }) => {
        await expect(
          page.getByRole("button", { name: "logout" })
        ).toBeVisible();

        await page.getByRole("button", { name: "new blog" }).click();
        await page.getByLabel("Title").fill("Blog A - Few Likes");
        await page.getByLabel("Author").fill("Author A");
        await page.getByLabel("Url").fill("url-a");
        await page.getByRole("button", { name: "save" }).click();
        await page.getByText("Blog A - Few Likes - Author A").waitFor();

        await page.getByLabel("Title").fill("Blog B - Many Likes");
        await page.getByLabel("Author").fill("Author B");
        await page.getByLabel("Url").fill("url-b");
        await page.getByRole("button", { name: "save" }).click();
        await page.getByText("Blog B - Many Likes - Author B").waitFor();

        const blogBTitleLocator = page.locator(
          '.blogName:has-text("Blog B - Many Likes")'
        );
        await blogBTitleLocator.getByRole("button", { name: "show" }).click();

        const likeButtonB = page
          .locator('.blogNameClick:has-text("Blog B - Many Likes")')
          .getByRole("button", { name: "like" });

        await likeButtonB.click();
        await likeButtonB.click();
        await likeButtonB.click();

        await expect(
          page
            .locator('.blogNameClick:has-text("Blog B - Many Likes")')
            .getByText("Likes 3")
        ).toBeVisible();

        await page
          .locator('.blogNameClick:has-text("Blog B - Many Likes")')
          .getByRole("button", { name: "hide" })
          .click();

        const blogTitles = await page.locator(".blogName").allTextContents();

        expect(blogTitles[0]).toContain("Blog B - Many Likes - Author B");
        expect(blogTitles[1]).toContain("Blog A - Few Likes - Author A");
      });
    });
  });
});
