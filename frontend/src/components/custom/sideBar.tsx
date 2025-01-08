/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
'use client';
import { useState } from 'react';
import { RouteType } from '@/data/pathRoutes/config';
import { OpenContextProvider } from './sideBarContext';
import { SideBarConstructor } from './sideBarConstructor';
import { SideBarContent } from './sideBarContent';
import { logoutUser } from '@/data/actions/authActions';
import { fetchUserLogout } from '@/data/loaders';
export default function SideBar({ items }: { items: RouteType[] }) {
	return (
		<OpenContextProvider items={items}>
			<div className="flex flex-col w-[250px]  h-full">
				<div className="flex flex-row h-32 min-h-[150px] gap-2 ">
					<div className=" img4"></div>
					<h3>avatar</h3>
				</div>
				<SideBarContent className="flex flex-col grow gap-y-5 justify-self-start">
					{items.map((route, index) => {
						return (
							<SideBarConstructor
								item={route}
								key={index}
								className="border-2 border-neutral-200 p-2 "
							/>
						);
					})}
				</SideBarContent>
				<div className="flex h-32 min-h-[150px] items-end">
					<button onClick={logoutUser}> logout</button>
				</div>
			</div>
		</OpenContextProvider>
	);
}
