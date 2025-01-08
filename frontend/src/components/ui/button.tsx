import * as React from 'react';

import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, type, ...props }, ref) => {
		return <button type={type} className={cn(className)} ref={ref} {...props} />;
	}
);
Button.displayName = 'Button';

export { Button };
