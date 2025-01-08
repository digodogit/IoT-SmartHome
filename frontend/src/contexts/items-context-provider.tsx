/* eslint-disable prettier/prettier */
'use client';
import { addDisp } from '@/data/dispData/dispActions';
import { DispSchema, DispType, DispTypeProps } from '@/data/dispData/dispModel';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useOptimistic,
	useState,
} from 'react';

export type TypeDevicesContext = {
	devices: DispType[];
	selectedDispId: DispType['id'] | null;
	selectedDisp: DispTypeProps<DispType> | undefined;
	setSelectedDisp: Dispatch<SetStateAction<DispTypeProps<DispType> | undefined>>;
	handleAddDisp: (newDisp: DispType) => Promise<void>;
	handleEditDisp: (dispId: DispType['id'], newDispData: DispType) => Promise<void>;
	handleDeleteDisp: (dispId: DispType['id']) => Promise<void>;
	handleChangeSelectedDispId: (id: DispType['id']) => void;
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

	const handleAddDisp = async (newDisp: DispType) => {
		const session = await addDisp(newDisp);
		console.log(session);
	};

	const handleEditDisp = async (dispId: DispType['id'], newDispData: DispType) => {
		console.log(dispId);
	};
	const handleDeleteDisp = async (dispId: DispType['id']) => {
		console.log(dispId);
	};
	const handleChangeSelectedDispId = async (id: DispType['id']) => {
		if (selectedDisp?.data?.id === id) {
			setSelectedDisp({
				data: undefined,
				isOpen: false,
			});
		} else {
			const dispFind = devices.find((device: DispType) => device.id === id);
			setSelectedDisp({ data: dispFind, isOpen: true });
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
