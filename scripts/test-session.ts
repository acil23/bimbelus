import { createHash } from "node:crypto";

import { prisma } from "../lib/db/prisma";
import { hashPassword } from "../lib/security/password";
import {
  createSession,
  deleteSession,
  getSession,
} from "../lib/auth/session";

async function main() {
  console.log("Session integration test");
  console.log("========================");

  const email = `session-test-${Date.now()}@example.local`;

  try {
    // 1. Create temporary development user
    const passwordHash = await hashPassword("TestPassword-2026!");

    const user = await prisma.users.create({
      data: {
        name: "Session Test User",
        email,
        password_hash: passwordHash,
        role: "ADMIN",
      },
    });

    console.log("1. Test user created       ✅");

    // 2. Create normal session
    const created = await createSession(user.id);

    if (!created.token) {
      throw new Error("Session token was not generated");
    }

    console.log("2. Session created         ✅");
    console.log(`   Token length: ${created.token.length}`);

    // 3. Retrieve normal session
    const session = await getSession(created.token);

    if (!session) {
      throw new Error("Created session could not be retrieved");
    }

    if (session.user.id !== user.id) {
      throw new Error("Session user does not match test user");
    }

    console.log("3. Session retrieved       ✅");
    console.log(`   User: ${session.user.email}`);
    console.log(`   Role: ${session.user.role}`);
    console.log(`   Expires: ${session.expiresAt.toISOString()}`);

    // 4. Invalid token must be rejected
    const wrongSession = await getSession("invalid-session-token");

    if (wrongSession !== null) {
      throw new Error("Invalid token was accepted");
    }

    console.log("4. Invalid token rejected  ✅");

    // 5. Create an already-expired session directly in the database.
    const expiredToken = `expired-${Date.now()}`;
    
    const expiredTokenHash = createHash("sha256")
      .update(expiredToken)
      .digest("hex");

    const expiredSession = await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: expiredTokenHash,
        expiresAt: new Date(Date.now() - 60_000),
      },
    });

    console.log("5. Expired session created ✅");

    // 6. Expired session must be rejected and cleaned up.
    const expiredResult = await getSession(expiredToken);

    if (expiredResult !== null) {
      throw new Error("Expired session was accepted");
    }

    const expiredStillExists = await prisma.session.findUnique({
      where: {
        id: expiredSession.id,
      },
    });

    if (expiredStillExists !== null) {
      throw new Error("Expired session was not cleaned up");
    }

    console.log("6. Expired session rejected ✅");
    console.log("   Expired session cleaned  ✅");

    // 7. Delete normal session
    await deleteSession(created.token);

    const afterDelete = await getSession(created.token);

    if (afterDelete !== null) {
      throw new Error("Deleted session is still retrievable");
    }

    console.log("7. Session deleted         ✅");

    console.log("");
    console.log("All session tests passed.");
  } finally {
    // Clean up all temporary test data.
    await prisma.session.deleteMany({
      where: {
        user: {
          email,
        },
      },
    });

    await prisma.users.deleteMany({
      where: {
        email,
      },
    });

    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("");
  console.error("Session test failed:");
  console.error(error);
  process.exit(1);
});