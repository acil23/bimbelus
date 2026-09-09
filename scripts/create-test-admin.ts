import "dotenv/config";

import argon2 from "argon2";

import { prisma } from "../lib/db/prisma";

const TEST_EMAIL = "admin-test@bimbelys.local";
const TEST_PASSWORD = "BimbelYS-Test-2026!";
const TEST_NAME = "Bimbel YS Test Admin";

async function main() {
  const existing = await prisma.users.findUnique({
    where: {
      email: TEST_EMAIL,
    },
  });

  if (existing) {
    console.log(`Test admin already exists: ${TEST_EMAIL}`);
    return;
  }

  const passwordHash = await argon2.hash(TEST_PASSWORD, {
    type: argon2.argon2id,
    memoryCost: 19_456,
    timeCost: 2,
    parallelism: 1,
  });

  const user = await prisma.users.create({
    data: {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password_hash: passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Test admin created.");
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${TEST_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });