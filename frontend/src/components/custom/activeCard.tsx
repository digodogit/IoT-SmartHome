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
				{disp.components.map(({ component }, index) => (
					<DropdownItem key={index}>
						<DropdownButton>{component.name}</DropdownButton>
					</DropdownItem>
				))}
			</DropdownList>
		</>
	);
}
