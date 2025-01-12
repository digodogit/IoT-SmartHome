'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn, signOut, auth } from '@/lib/auth';

export async function loginUser(prevState: unknown, formData: FormData) {
	try {
		await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirectTo: '/dashboard',
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return { message: 'login invalido' };
		}
		throw error;
	}
}

export async function logoutUser() {
	const session = await auth();
	const headers = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session?.accessToken}`,
		},
	};
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await fetch(`http://${process.env.BASE_URL}:3001/api/auth/logoutall`, headers);
		const data = await response.json();
		if (response.ok) console.log('ok');
		await signOut({ redirectTo: '/' });
	} catch (error) {
		throw error;
	}
	return;
}
