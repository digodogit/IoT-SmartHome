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

async function fetchServerData(path?: string, method?: string, payload?: any) {
	const session = await checkAuth();

	return session;
	/* const options = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    }
  };

  try {
    const res = await fetch(`http://localhost:3001${path}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error); 
  }*/
}
export async function getAllUserDisp() {
	const response = await fetchServerData('/api/user/allDisp', 'GET');

	return response;
	//headers
	// data
	// //method
}
