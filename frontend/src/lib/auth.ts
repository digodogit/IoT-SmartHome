import NextAuth, { type DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import type { Provider } from 'next-auth/providers';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
	interface User {
		token: string;
		user: {} & User & AdapterUser;
	}
	interface Session {
		accessToken: string;
		user: {} & DefaultSession['user'];
	}
}
declare module 'next-auth/jwt' {
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
			try {
				const res = await axios.post('http://localhost:3001/api/auth/login', {
					email: credentials?.email,
					password: credentials.password,
				});

				if (res.data && res.data.token) {
					return {
						user: res.data.user,
						token: res.data.token,
					};
				}
				return null;
			} catch (error) {
				throw new Error('Invalid email or password');
			}
		},
	}),
];
export const { signIn, signOut, auth, handlers } = NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: 2000,
	},
	providers,
	pages: {
		signIn: '/login',
		signOut: '/logout',
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
