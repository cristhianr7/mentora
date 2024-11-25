import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  /*pages: {
    signIn: "/sign-in",
    error: "/error",
  },*/
  adapter: PrismaAdapter(db),
  ...authConfig,
});
