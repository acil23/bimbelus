import { DUMMY_PASSWORD_HASH } from "@/lib/auth/constants";
import { createSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/security/password";
import { findUserByEmail } from "./auth.repository";
import { deleteSession } from "@/lib/auth/session";

const INVALID_CREDENTIALS_MESSAGE =
  "Invalid email or password.";

export async function login(
  email: string,
  password: string,
) {
  const user = await findUserByEmail(email);

  if (!user) {
    await verifyPassword(DUMMY_PASSWORD_HASH, password);

    return {
      success: false as const,
      message: INVALID_CREDENTIALS_MESSAGE,
    };
  }

  const isValidPassword = await verifyPassword(
    user.password_hash,
    password,
  );

  if (!isValidPassword) {
    return {
      success: false as const,
      message: INVALID_CREDENTIALS_MESSAGE,
    };
  }

  const session = await createSession(user.id);

  return {
    success: true as const,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    session,
  };
}

export async function logout(token?: string): Promise<void> {
  if (!token) {
    return;
  }

  await deleteSession(token);
}