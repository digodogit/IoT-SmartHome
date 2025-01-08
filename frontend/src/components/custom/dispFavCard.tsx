'use client';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DispFavProps {
	textHeader?: string;
	imgType?: string;
	textFooter?: string;
	className?: string;
}

export function DispFavCard({
	textHeader,
	imgType,
	textFooter,
	className,
}: Readonly<DispFavProps>) {
	return (
		<Card className={cn('justify-items-center p-2')}>
			{textHeader && (
				<CardHeader>
					<p>{textHeader}</p>
				</CardHeader>
			)}

			<CardContent className={cn(imgType, className)} />

			{textFooter && (
				<CardFooter>
					<p>{textFooter}</p>
				</CardFooter>
			)}
		</Card>
	);
}
