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

async function fetchServerData(path?: string, method?: string, payload?: unknown) {
	const session = await checkAuth();

	const options = {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session?.accessToken}`,
		},
	};

	try {
		const res = await fetch(`http://backend-express:3001${path}`, options);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
export async function getAllUserDisp() {
	const response = await fetchServerData('/dispositivos/allDisp', 'GET');
	console.log(response.disps);
	return response.disps;
	//headers
	// data
	// //method
}
