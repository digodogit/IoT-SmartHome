/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function checkAuth() {
	const session = await auth();
	if (!session?.user) {
		redirect('/login');
	}
	return session;
}

export async function fetchServerData(path?: string, method?: string, payload?: any) {
	const session = await checkAuth();

	const options = {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session?.accessToken}`,
		},
		body: payload ? JSON.stringify({ ...payload }) : undefined,
	};
	try {
		const res = await fetch(`http://${process.env.BASE_URL}:3001${path}`, options);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
export async function getAllUserDisp() {
	const response = await fetchServerData('/dispositivos/allDisp', 'GET');

	return response.disps;
	//headers
	// data
	// //method
}
