import * as React from 'react';
import { cn } from '@/lib/utils';
import { RouteType } from '@/data/pathRoutes/config';
import { OpenContextProvider } from './sideBarContext';
import { SidebarButton } from './sideBarButton';

export interface SideBarContentProps extends React.HTMLAttributes<HTMLMenuElement> {
	item?: RouteType;
	isCollapse?: boolean;
	children?: React.ReactNode | React.ReactNode[];
}

const SideBarContent = React.forwardRef<HTMLMenuElement, SideBarContentProps>(
	({ className, children, isCollapse, item, ...props }, ref) => {
		return (
			<menu ref={ref} className={cn(className)} {...props}>
				{children}
			</menu>
		);
	}
);

SideBarContent.displayName = 'SideBarContent';

export { SideBarContent };
