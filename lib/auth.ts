import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import prisma from '@/lib/prisma'

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
        
        /*
        {
          id: 2,
          name: 'toto',
          email: 'toto@local.dev',
          password: '...',
          emailVerified: false,
          emailVerificationToken: null,
          createdAt: 2025-10-22T00:19:55.618Z,
          updatedAt: 2025-10-22T00:19:55.618Z
        }
        */

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
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt", // or 'database'

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
        token.email = session.email
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId!;
        session.user.name = token.name!;
        session.user.email = token.email!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    verifyRequest: '/auth/verify-request',  // (used for check email message)
    newUser: '/auth/register',              // New users will be directed here on first sign in (leave the property out if not of interest)
    error: '/auth/error',                   // Error code passed in query string as ?error=
  }
}
