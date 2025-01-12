'use server';
/* eslint-disable prettier/prettier */
import { checkAuth, fetchServerData } from '@/lib/server-utils';
import { revalidatePath } from 'next/cache';
import { dispFormSchema } from './dispModel';

// revalidatePath provavel ser necessario.

export async function editDisp(newDispData: unknown) {
	//editar dispositivo
	//como Nome, componentes, essas coisas
	//fazer check para saber se pode editar é uma boa
	const validatedDisp = dispFormSchema.safeParse(newDispData);
	console.log(validatedDisp.data?.components);
	if (!validatedDisp.success) {
		return { message: 'dados para criar dispositivo invalido' };
	}
	const response = await fetchServerData('/dispositivos/editDisp', 'POST', {
		disp: validatedDisp.data,
	});

	if (!response) {
		return { message: 'dispositivo data invalido' };
	}
	revalidatePath('/dashboard', 'layout');
}

export async function deleteDisp(dispId: unknown) {
	//deletar dispositivo
	//fazer check para saber se pode editar é uma boa

	const response = await fetchServerData('/dispositivos/deleteDisp', 'DELETE', { id: dispId });
	if (!response) {
		return { message: 'dispositivo data invalido' };
	}
	revalidatePath('/dashboard', 'layout');
}

export async function createDisp(disp: unknown) {
	const validatedDisp = dispFormSchema.safeParse(disp);

	if (!validatedDisp.success) {
		return { message: 'dados para criar dispositivo invalido' };
	}
	const response = await fetchServerData('/dispositivos/createDisp', 'POST', validatedDisp.data);
	console.log(validatedDisp.data);
	if (!response) {
		return { message: 'não foi possivel criar dispositivo' };
	}
	revalidatePath('/dashboard', 'layout');

	//adicionar dispositivo
	//fazer check para saber se pode editar é uma boa
}
