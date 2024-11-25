import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === "production";

const prisma = isProduction
  ? new PrismaClient()
  : global.prisma || (global.prisma = new PrismaClient());

export const db = prisma;
