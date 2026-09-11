import { expect, test } from "@playwright/test";

const TEST_EMAIL = "admin-test@bimbelys.local";
const TEST_PASSWORD = "TestPassword-2026!";

test.beforeEach(async ({ context }) => {
  const response = await context.request.post(
    "/api/auth/login",
    {
      headers: {
        Origin: "http://localhost:3000",
      },
      data: {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    },
  );

  expect(response.status()).toBe(200);
});

test("authenticated ADMIN can access /api/auth/me", async ({
  request,
}) => {
  const response = await request.get(
    "/api/auth/me",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toMatchObject({
    success: true,
    data: {
      user: {
        email: TEST_EMAIL,
        role: "ADMIN",
      },
    },
  });

  expect(
    JSON.stringify(body),
  ).not.toContain("password_hash");
});

test("authenticated ADMIN can access admin dashboard", async ({
  page,
}) => {
  await page.goto("/admin/dashboard");

  await expect(page).toHaveURL(
    /\/admin\/dashboard/,
  );
});

test("logout invalidates the session", async ({
  context,
  request,
}) => {
  const response = await context.request.post(
    "/api/auth/logout",
    {
      headers: {
        Origin: "http://localhost:3000",
      },
    },
  );

  expect(response.status()).toBe(200);

  const meResponse = await request.get(
    "/api/auth/me",
  );

  expect(meResponse.status()).toBe(401);
});