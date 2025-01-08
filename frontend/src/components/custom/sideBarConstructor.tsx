'use client';
import { HTMLAttributes, useState } from 'react';
import { SidebarButton } from './sideBarButton';
import { SideBarContent } from './sideBarContent';
import { SideBarItem } from './sideBarItem';
import { SubmitButton } from './SubmitButton';
import { RouteType } from '@/data/pathRoutes/config';
import { useOpenContext } from './sideBarContext';
import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { DropdownButton, DropdownItem, DropdownList } from './dropdown';

export interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
	item: RouteType;
	children?: React.ReactNode | React.ReactNode[];
}

const SideBarConstructor = React.forwardRef<HTMLDivElement, SideBarProps>(
	({ className, children, item, ...props }, ref) => {
		const { isMenuOpen, setIsMenuOpen } = useOpenContext();
		const [isOpen, setIsOpen] = useState(false);
		const routePath = useRouter();
		const pathName = usePathname();

		const handleClick = () => {
			setIsOpen(!isOpen);
			console.log(`path: ${item.path}: status: ${isOpen}`);
		};

		const handleRoute = (path: string) => {
			if (pathName !== path) {
				setIsOpen(false);
				routePath.push(path);
			}
		};
		return (
			<div ref={ref} className={cn(className)} {...props}>
				<SideBarItem>
					<SidebarButton
						outline={isOpen}
						className={`data-[open=true]:border-b-2 border-gray-500`}
						onClick={handleClick}
					>
						{item.path}
					</SidebarButton>
					{isOpen && item.child ? (
						<DropdownList
							label="Categorias"
							className="border-b-2 border-neutral-500 mt-1 shadow-md rounded-lg bg-gray-300  p-1 list-disc list-inside"
						>
							{item.child.map((route, index) => {
								return (
									<DropdownItem key={index} className="py-1.5">
										<DropdownButton onClick={() => handleRoute('/dashboard' + route.path)}>
											{route.sidebarProps?.displayText}
										</DropdownButton>
									</DropdownItem>
								);
							})}
						</DropdownList>
					) : null}
				</SideBarItem>
			</div>
		);
	}
);
SideBarConstructor.displayName = 'SideBarConstructor';

export { SideBarConstructor };
