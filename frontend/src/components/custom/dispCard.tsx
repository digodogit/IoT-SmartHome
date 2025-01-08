'use client';
import { use, useEffect, useMemo, useState } from 'react';
import { stat } from 'fs';
import { cn } from '@/lib/utils';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';
import { DispType } from '@/data/dispData/dispModel';
import { useDevicesContext } from '@/contexts/items-context-provider';
import { ActiveCard } from './activeCard';

export function DispCard({ categoria }: { categoria: unknown }) {
	const { devices, selectedDisp, handleChangeSelectedDispId } = useDevicesContext();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const filterDisps = useMemo(
		() => devices.filter((device: DispType) => device.category === categoria),
		[categoria, devices]
	);

	return (
		<>
			{filterDisps.map((disp) => (
				
			))}
		</>
	);
}
