import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from 'lib/mongo.js';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const client = await clientPromise;
        const db = client.db('app'); // Replace 'app' with your database name
        const user = await db.collection('login').findOne({ username });

        if (user && user.pass === password) {
          return {
            id: user._id.toString(),
            username: user.username,
            acc_type: user.acc_type,
          };
        }
        return null; // Invalid credentials
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.acc_type = user.acc_type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        acc_type: token.acc_type,
      };
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      if (token?.acc_type === 'manager') {
        return `${baseUrl}/smallapp/manager`;
      }
      if (token?.acc_type === 'customer') {
        return `${baseUrl}/smallapp/customer`;
      }
      return `${baseUrl}/smallapp`; // Default fallback
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
