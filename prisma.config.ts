import { join } from "node:path";
import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: join("prisma", "schema.prisma"),
  migrations: {
    path: join("prisma", "migrations"),
    seed: `tsx prisma/seed.ts`,
  },
  views: {
    path: join("prisma", "views"),
  },
  typedSql: {
    path: join("prisma", "queries"),
  },
});
