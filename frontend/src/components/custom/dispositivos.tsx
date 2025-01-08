'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { DispCard } from './dispCard';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { useDevicesContext } from '@/contexts/items-context-provider';
import { DispType } from '@/data/dispData/dispModel';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';
import { ActiveCard } from './activeCard';

export default function DispositivosTemplate({ categoria }: { categoria?: string }) {
	const router = useRouter();
	const { devices, selectedDisp, handleChangeSelectedDispId } = useDevicesContext();
	const filterDisps = React.useMemo(
		() => devices.filter((device: DispType) => device.category === categoria),
		[categoria, devices]
	);

	if (!categoria) {
		router.push('/dashboard');
	}

	return (
		<>
			<div className="relative w-fit">
				<Card className="relative p-2 w-[600px] rounded-xl border-2 border-slate-500">
					<CardHeader>
						<CardTitle>{categoria}</CardTitle>
					</CardHeader>
					<CardContent className="w-full ">
						{filterDisps.map((disp) => (
							<DropdownList key={disp.id} className="p-4 border ">
								<DropdownItem key={disp.id}>
									<DropdownButton
										onClick={() => {
											handleChangeSelectedDispId(disp.id);
										}}
									>
										{disp.name}
									</DropdownButton>
									{disp.id === selectedDisp?.data?.id && selectedDisp?.isOpen ? (
										<ActiveCard disp={selectedDisp.data} />
									) : null}
								</DropdownItem>
							</DropdownList>
						))}
					</CardContent>
					<CardFooter className="relative" />
				</Card>
				<div className="absolute bottom-1 right-1 ">
					<button className=" bg-indigo-400 rounded-full ring-2 ring-indigo-200 size-16 text-2xl text-sky-100">
						+
					</button>
				</div>
			</div>
		</>
	);
}
