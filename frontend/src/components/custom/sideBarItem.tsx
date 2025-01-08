import * as React from 'react';
import { cn } from '@/lib/utils';
import { useOpenContext } from './sideBarContext';
import { RouteType } from 'next/dist/lib/load-custom-routes';

export interface SideBarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
	item?: RouteType;
	isActive?: boolean;
	children?: React.ReactNode;
}

const SideBarItem = React.forwardRef<HTMLLIElement, SideBarItemProps>(
	({ className, children, item, isActive = false, ...props }, ref) => {
		return (
			<li ref={ref} className={cn(className)} {...props}>
				{children}
			</li>
		);
	}
);

SideBarItem.displayName = 'SideBarItem';

export { SideBarItem };
