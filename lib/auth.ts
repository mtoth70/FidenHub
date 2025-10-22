// FILE: lib/auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    // Google OAuth (opcional: solo se activa si existen las vars en .env)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),

    // Email + Password contra tu base (Prisma)
    Credentials({
      name: "Email y contraseña",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim();
        const password = credentials?.password?.toString();
        if (!email || !password) return null;

        // Ajusta a tu esquema Prisma: user.passwordHash, firstName, lastName, role
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name:
            `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
            user.email,
          role: (user as any).role ?? "buyer",
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", // si tienes página de login personalizada
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        (token as any).role = (user as any).role ?? "buyer";
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        (session.user as any) = {
          ...(session.user || {}),
          id: token.id as string,
          role: (token as any).role,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

// Helpers v5: route handlers + server helpers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
