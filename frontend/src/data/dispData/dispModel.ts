import { ReactNode, Dispatch, SetStateAction } from 'react';

export type DispType = {
	id: string | null;
	name: string;
	category: string;
	element?: ReactNode;
	state?: string;
	path?: string;
	favDisp?: boolean;
	dispProps?: {
		components: DispCompType[];
		icon?: ReactNode;
	};
};

export type DispCompType = {
	name?: string;
	style?: 'switch' | 'slider' | 'rgb';
	type?: unknown;
};

export type DispSchema = {
	id: string | null;
	name: string;
	category: string;
};

export interface DispTypeProps<DispType> {
	data: DispType | undefined;
	isOpen: boolean | null;
	handleChangeSelect?: unknown;
	onHandleChangeValue?: unknown;
}
