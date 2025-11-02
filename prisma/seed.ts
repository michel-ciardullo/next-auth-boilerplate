import { PrismaClient, Prisma, Role } from "@/app/generated/prisma";
import { hashPassword } from "@/features/password";

const prisma = new PrismaClient();

export async function main() {
  const password = await hashPassword("password")

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "toto",
      email: "toto@local.dev",
      password: password,
      emailVerifiedAt: new Date(),
      role: Role.ADMIN
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
