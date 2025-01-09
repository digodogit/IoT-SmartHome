'use server';
/* eslint-disable prettier/prettier */
import { checkAuth } from '@/lib/server-utils';
import { revalidatePath } from 'next/cache';

// revalidatePath provavel ser necessario.

async function editDisp(dispId: unknown, newDispData: unknown) {
	//editar dispositivo
	//como Nome, componentes, essas coisas
	//fazer check para saber se pode editar é uma boa
}

async function deleteDisp(dispId: unknown) {
	//deletar dispositivo
	//fazer check para saber se pode editar é uma boa
}

export async function createDisp(disp: unknown) {
	try {
		const session = await checkAuth();
		const headers = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${session?.accessToken}`,
			},
			body: JSON.stringify(disp),
		};
		const res = await fetch('http://localhost:3001/dispositivos/createDisp', headers);
		const data = await res.json();
		console.log(data);
	} catch (error) {
		console.log('nao sei');
		return error;
	}
	revalidatePath('/dashboard', 'layout');

	//adicionar dispositivo
	//fazer check para saber se pode editar é uma boa
}
