import * as React from 'react';
import { cn } from '@/lib/utils';

import { useOpenContext } from './sideBarContext';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: boolean;
	outline?: boolean;
}

const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
	({ className, type, icon, outline, ...props }, ref) => {
		return (
			<button
				type={type}
				data-open={outline}
				className={cn('p-1 w-full justify-center', className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
SidebarButton.displayName = 'SidebarButton';

export { SidebarButton };
