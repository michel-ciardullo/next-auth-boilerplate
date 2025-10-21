import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("MISSING_CREDENTIALS")
        }

        // 🔍 Recherche de l'utilisateur dans la base de données
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("INVALID_EMAIL")
        }

        // 🧠 Vérification du mot de passe (comparaison hash bcrypt)
        const isValidPassword = await bcrypt.compare(credentials.password, user.password)

        if (!isValidPassword) {
          throw new Error("INVALID_PASSWORD")
        }

        // ✅ Retour de l'utilisateur si la connexion est valide
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        }
      }
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId!;
      }
      return session;
    },
  },
  pages: {
    newUser: '/auth/register',
    signIn: '/auth/login',
    signOut: '/auth/logout',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
