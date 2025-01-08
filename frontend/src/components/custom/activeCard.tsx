'use client';

import { memo, use, useCallback, useEffect, useState } from 'react';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';
import { DispType, DispTypeProps } from '@/data/dispData/dispModel';
import { useDevicesContext } from '@/contexts/items-context-provider';

export function ActiveCard({ disp }: { disp: DispType }) {
	console.log(disp);
	return (
		<>
			<DropdownList className=" p-4 border">
				{disp.dispProps.components.map((comp, index) => (
					<DropdownItem key={index}>
						<DropdownButton>{comp.name}</DropdownButton>
					</DropdownItem>
				))}
			</DropdownList>
		</>
	);
}
