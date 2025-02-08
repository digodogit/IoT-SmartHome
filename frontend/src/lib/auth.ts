import NextAuth, { type DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import type { Provider } from "next-auth/providers";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { userLogInSchema } from "./user/userSchema";

declare module "next-auth" {
  interface User {
    token: string;
    user: {} & User & AdapterUser;
  }
  interface Session {
    accessToken: string;
    user: {} & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: User & AdapterUser;
  }
}

const providers: Provider[] = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials): Promise<null | User> => {
      if (credentials === null) return null;
      const validatedUserData = userLogInSchema.safeParse(credentials);
      if (!validatedUserData.success) {
        return null;
      }

      const { email, password } = validatedUserData.data;
      try {
        const res = await fetch(
          `http://${process.env.BASE_URL}:3001/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        );

        const data = await res.json();
        if (data && data.token) {
          return {
            user: data.user,
            token: data.token,
          };
        }
        return null;
      } catch (error) {
        throw new Error("Invalid email or password");
      }
    },
  }),
];
export const { signIn, signOut, auth, handlers } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 2000,
  },
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    jwt: ({ token, user, account }) => {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    },
  },
});
