'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { useDevicesContext } from '@/contexts/items-context-provider';
import { DispType } from '@/data/dispData/dispModel';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';
import { ActiveCard } from './activeCard';
import Link from 'next/link';

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
							<DropdownList key={disp._id} className="p-4 border ">
								<DropdownItem key={disp._id}>
									<DropdownButton
										onClick={() => {
											handleChangeSelectedDispId(disp._id);
										}}
									>
										{disp.name}
									</DropdownButton>
									{disp._id === selectedDisp?.data?._id && selectedDisp?.isOpen ? (
										<ActiveCard disp={selectedDisp.data} />
									) : null}
								</DropdownItem>
							</DropdownList>
						))}
					</CardContent>
					<CardFooter className="relative" />
				</Card>
				<div className="absolute bottom-1 right-1 ">
					<Link href="/dashboard/dispositivos/criar" replace>
						<button className=" bg-indigo-400 rounded-full ring-2 ring-indigo-200 size-16 text-2xl text-sky-100">
							+
						</button>
					</Link>
				</div>
			</div>
		</>
	);
}
