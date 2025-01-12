import { z } from 'zod';

export type DispType = {
	_id: string | null;
	name: string;
	category: string;
	favDisp: boolean;
	userId?: string;
	components?: { component: DispCompType }[];
};
export type DispSchema = {
	_id: string | null;
	name: string;
	category: string;
	favDisp: boolean;
	userId?: string;
	components?: { component: DispCompType }[];
};

export interface DispTypeProps<DispType> {
	data: DispType | undefined;
	isOpen: boolean | null;
	handleChangeSelect?: unknown;
	onHandleChangeValue?: unknown;
}

export const dispCompSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Nome é obrigatorio.' })
		.max(20, { message: 'Maximo de caracteres é 20.' }),
	style: z.union([z.literal('switch'), z.literal('slider'), z.literal('color')]),
	data: z
		.object({
			dataType: z.coerce.string(z.union([z.boolean(), z.number(), z.string()])),
			dataValue: z.coerce.string(),
		})
		.optional(),
});

export const dispFormSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Nome é obrigatorio.' })
		.max(20, { message: 'Maximo de caracteres é 20.' }),
	category: z
		.string()
		.trim()
		.min(1, { message: 'Categoria é obrigatorio.' })
		.max(20, { message: 'Maximo de caracteres é 20.' }),
	favDisp: z.boolean({ message: 'Obrigatorio ser tipo "boolean' }),
	userId: z
		.string()
		.min(1, { message: 'Nome de usuario é obrigatorio.' })
		.max(20, { message: 'Maximo de caracteres é 20.' })
		.optional(),
	components: z.array(z.object({ component: dispCompSchema })).optional(),
});

export type DispCompType = z.infer<typeof dispCompSchema>;
export type DispFormType = z.infer<typeof dispFormSchema>;
