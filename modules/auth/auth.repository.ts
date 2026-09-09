import { prisma } from "@/lib/db/prisma";

export function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}
