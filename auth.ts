import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Check fixed credentials
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@feedbacksystem.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const userEmail = process.env.USER_EMAIL || 'user@email.com';
        const userPassword = process.env.USER_PASSWORD || 'user123';

        // Admin login
        if (email === adminEmail && password === adminPassword) {
          return {
            id: 'admin',
            email: adminEmail,
            role: 'admin',
          };
        }

        // User login
        if (email === userEmail && password === userPassword) {
          return {
            id: 'user',
            email: userEmail,
            role: 'user',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
