import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username(), nextCookies()],
  advanced: {
    cookiePrefix: "forge_session",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3d
    updateAge: 60 * 60 * 24, // 1d
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});
