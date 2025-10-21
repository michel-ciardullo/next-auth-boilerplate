import { PrismaClient, Prisma } from "../app/generated/prisma";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export async function main() {
  const password = await bcrypt.hash("password", 10)

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      password: password,
    },
    {
      name: "Marie Martin",
      email: "marie.martin@example.com",
      password: password,
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
