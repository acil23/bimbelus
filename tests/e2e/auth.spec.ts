import { expect, test } from "@playwright/test";

test("anonymous user is redirected from admin dashboard", async ({
  page,
}) => {
  await page.goto("/admin/dashboard");

  await expect(page).toHaveURL(
    /\/admin\/login(?:\?.*)?$/,
  );
});

test("anonymous user cannot access current-user endpoint", async ({
  request,
}) => {
  const response = await request.get(
    "/api/auth/me",
  );

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body).toMatchObject({
    success: false,
    error: {
      code: "UNAUTHORIZED",
    },
  });
});

test("cross-origin admin mutation is rejected", async ({
  request,
}) => {
  const response = await request.post(
    "/api/programs",
    {
      headers: {
        Origin: "https://attacker.example",
        "Content-Type": "application/json",
      },
      data: {},
    },
  );

  expect(response.status()).toBe(403);

  const body = await response.json();

  expect(body).toMatchObject({
    success: false,
    error: {
      code: "FORBIDDEN",
      message: "Invalid request origin",
    },
  });
});

test("anonymous mutation is rejected with 401", async ({
  request,
}) => {
  const response = await request.post(
    "/api/programs",
    {
      headers: {
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      data: {},
    },
  );

  expect(response.status()).toBe(401);
});