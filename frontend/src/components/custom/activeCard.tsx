'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { memo, use, useCallback, useEffect, useState } from 'react';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';
import { DispType, DispTypeProps } from '@/data/dispData/dispModel';
import { useDevicesContext } from '@/contexts/items-context-provider';
import ToggleSwitch from '@/components/ui/toggleSwitch';
import Link from 'next/link';

export function ActiveCard({ disp }: { disp: DispType }) {
	const { handleDeleteDisp } = useDevicesContext();
	return (
		<>
			<DropdownList className=" p-4 border">
				{disp.components?.map(({ component }, index) => (
					<DropdownItem key={index}>
						<DropdownButton>{component.name}</DropdownButton>
					</DropdownItem>
				))}
				<button
					onClick={async () => handleDeleteDisp(disp._id)}
					className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
				>
					deletar
				</button>
			</DropdownList>
		</>
	);
}
