'use client';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
	text: string;
	className?: string;
	onclick?: unknown;
}

export function SubmitButton({ text, className }: Readonly<SubmitButtonProps>) {
	return (
		<Button type="submit" className={cn(className)}>
			{text}
		</Button>
	);
}

export function addDispButton({ text, onclick, className }: Readonly<SubmitButtonProps>) {
	return (
		<Button type="submit" className={cn(className)}>
			{text}
		</Button>
	);
}
