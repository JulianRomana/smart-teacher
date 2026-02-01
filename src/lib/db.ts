import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client Singleton Pattern
 *
 * In development, Next.js hot-reloading can create multiple PrismaClient instances,
 * which exhausts database connections. This pattern ensures we reuse a single instance.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
