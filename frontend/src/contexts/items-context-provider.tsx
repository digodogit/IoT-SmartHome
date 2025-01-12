/* eslint-disable prettier/prettier */
'use client';
import { createDisp, deleteDisp, editDisp } from '@/data/dispData/dispActions';
import {
	DispCompType,
	DispFormType,
	DispSchema,
	DispType,
	DispTypeProps,
} from '@/data/dispData/dispModel';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useOptimistic,
	useState,
} from 'react';

// criar uma função para selecionar o component para poder edita-lo.
// provavelmente ir pelo "selectedDisp" dar "find" no nome (id) e editar.
export type TypeDevicesContext = {
	devices: DispType[];
	selectedDispId: DispType['_id'] | null;
	selectedDisp: DispTypeProps<DispType> | undefined;
	setSelectedDisp: Dispatch<SetStateAction<DispTypeProps<DispType> | undefined>>;
	handleAddDisp: (newDisp: DispFormType) => Promise<void>;
	handleEditDisp: (newDispData: DispFormType) => Promise<void>;
	handleDeleteDisp: (dispId: DispType['_id']) => Promise<void>;
	handleChangeSelectedDispId: (id: DispType['_id']) => void;
	handleUpdateComponent: (
		compData: DispCompType['data']
	) => Promise<string | boolean | number | undefined>;
};

export const DevicesContext = createContext<TypeDevicesContext | null>(null);

export default function DevicesContextProvider({
	devices,
	children,
}: {
	devices: DispType[];
	children: React.ReactNode;
}) {
	const [selectedDispId, setSelectedDispId] = useState<string | null>(null);
	//const [filterDispId, setFilterDispId] = useState<DispType[] | null>(null);
	const [selectedDisp, setSelectedDisp] = useState<DispTypeProps<DispType> | undefined>({
		data: undefined,
		isOpen: false,
	});

	const handleAddDisp = async (newDisp: DispFormType) => {
		const error = await createDisp(newDisp);
		if (error) {
			console.log(error.message);
		}
	};

	const handleEditDisp = async (newDispData: DispFormType) => {
		const error = await editDisp(newDispData);
		if (error) {
			console.log(error.message);
		}
	};
	const handleDeleteDisp = async (dispId: DispType['_id']) => {
		const error = await deleteDisp(dispId);
		if (error) {
			console.log(error.message);
		}
	};
	const handleChangeSelectedDispId = async (id: DispType['_id']) => {
		if (selectedDisp?.data?._id === id) {
			setSelectedDisp({
				data: undefined,
				isOpen: false,
			});
		} else {
			const dispFind = devices.find((device: DispType) => device._id === id);
			setSelectedDisp({ data: dispFind, isOpen: true });
		}
	};

	const handleUpdateComponent = async (compData: DispCompType['data']) => {
		switch (compData?.dataType) {
			case 'string':
				return compData.dataValue;
			case 'boolean':
				return compData.dataValue === 'true' ? true : false;
			case 'number':
				return Number(compData.dataValue);
		}
	};
	return (
		<DevicesContext.Provider
			value={{
				devices,
				selectedDispId,
				selectedDisp,
				setSelectedDisp,
				handleAddDisp,
				handleEditDisp,
				handleDeleteDisp,
				handleChangeSelectedDispId,
				handleUpdateComponent,
			}}
		>
			{children}
		</DevicesContext.Provider>
	);
}

export function useDevicesContext() {
	const context = useContext(DevicesContext);

	if (!context) {
		throw new Error('usePetContext must be used within a PetContextProvider');
	}

	return context;
}
