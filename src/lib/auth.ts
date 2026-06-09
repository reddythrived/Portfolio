import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Handle case where DB is empty or disconnected during local build/test gracefully
        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          // Fallback to env variables for convenience if database is not ready
          const fallbackEmail = process.env.ADMIN_EMAIL || 'admin@thrivedreddy.com';
          const fallbackPassword = process.env.ADMIN_PASSWORD || 'super-secure-admin-password-change-me';
          
          if (credentials.email === fallbackEmail && credentials.password === fallbackPassword) {
            return {
              id: 'fallback-admin-id',
              email: fallbackEmail,
              name: 'K.P. Thrived Reddy',
            };
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
