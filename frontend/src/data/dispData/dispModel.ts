import { ReactNode, Dispatch, SetStateAction } from 'react';

export type DispType = {
	_id: string | null;
	name: string;
	category: string;
	element?: ReactNode;
	state?: string;
	path?: string;
	favDisp?: boolean;
	userId?: string;
	components: { component: DispCompType }[];
};

export interface DispCompType {
	name: string;
	style: 'switch' | 'slider' | 'rgb';
	type: unknown;
}

export type DispSchema = {
	name: string;
	category: string;
	favDisp: boolean;
	userId?: string;
};

export interface DispTypeProps<DispType> {
	data: DispType | undefined;
	isOpen: boolean | null;
	handleChangeSelect?: unknown;
	onHandleChangeValue?: unknown;
}
