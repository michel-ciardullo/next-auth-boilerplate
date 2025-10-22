import { PrismaClient, Prisma } from "../app/generated/prisma";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export async function main() {
  const password = await bcrypt.hash("password", 10)

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "toto",
      email: "toto@local.dev",
      password: password,
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
