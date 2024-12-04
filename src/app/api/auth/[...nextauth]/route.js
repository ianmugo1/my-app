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
        console.log('Authorize Triggered:', credentials);

        const { username, password } = credentials;
        const client = await clientPromise;
        const db = client.db('app'); // Replace with your database name
        const user = await db.collection('login').findOne({ username });

        if (user && user.pass === password) {
          console.log('Authorize Success:', {
            id: user._id.toString(),
            username: user.username,
            acc_type: user.acc_type,
          });
          return {
            id: user._id.toString(),
            username: user.username,
            acc_type: user.acc_type,
          };
        }

        console.log('Authorize Failed: Invalid credentials');
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback Triggered:', { tokenBefore: token, user });

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.acc_type = user.acc_type;
      }

      console.log('JWT Callback Result:', token);
      return token;
    },

    async session({ session, token }) {
      console.log('Session Callback Triggered:', { sessionBefore: session, token });

      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          acc_type: token.acc_type,
        };
      }

      console.log('Session Callback Result:', session);
      return session;
    },

    async redirect({ url, baseUrl, token }) {
      console.log('Redirect Callback Triggered:', { url, baseUrl, token });

      if (token?.acc_type === 'manager') {
        console.log('Redirecting to Manager Dashboard');
        return `${baseUrl}/smallapp/manager`;
      }

      if (token?.acc_type === 'customer') {
        console.log('Redirecting to Customer Dashboard');
        return `${baseUrl}/smallapp/customer`;
      }

      console.log('Fallback to Base URL');
      return `${baseUrl}/smallapp`; // Default fallback
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
