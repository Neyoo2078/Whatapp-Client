import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import { connectionDb } from '@/utils/dataBase';
import Users from '../../../../model/User';

export const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile) {
        await connectionDb();
        const exist = await Users.findOne({ email: profile.email });

        if (exist) {
          return true;
        }
        if (!exist) {
          const { email, name, picture: image } = profile;
          const data = await Users.create({ name, email, image });

          return true;
        }
      }
    },
    async redirect({ url, baseUrl }) {
      baseUrl = '/onboarding';
      return baseUrl;
    },
    async session({ session, user, token }) {
      await connectionDb();
      const data = await Users.findOne({ email: session.user.email });
      session.user.id = data.id;
      session.user.newUser = data.newUser;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
