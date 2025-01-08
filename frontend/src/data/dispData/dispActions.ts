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

export async function addDisp(disp: unknown) {
	try {
		const session = await checkAuth();
		console.log(disp);
	} catch (error) {
		console.log('nao sei');
		return error;
	}
	revalidatePath('/dashboard', 'layout');

	//adicionar dispositivo
	//fazer check para saber se pode editar é uma boa
}
