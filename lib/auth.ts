import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [Google({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })]
      : []),
    Credentials({
      name: "Demo",
      credentials: { email: { label: "Email", type: "text" } },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim();
        if (!email) return null;
        return { id: email, email, name: email.split("@")[0] };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.email = user.email; token.name = user.name; }
      return token;
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user = session.user || {};
        session.user.email = token.email as string;
        session.user.name = (token.name as string) || session.user.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

