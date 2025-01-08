'use client';
import { auth } from '@/lib/auth';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';

import { useRouter, useParams, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { stat } from 'fs';
import { cn } from '@/lib/utils';

interface CardContentProps {
	textHeader?: string;
	imgType?: string;
	textFooter?: string;
	className?: string;
}

export function AnalyticCard({
	textHeader,
	imgType,
	textFooter,
	className,
}: Readonly<CardContentProps>) {
	return (
		<Card className={cn('flex flex-row p-2')}>
			{textHeader && (
				<CardHeader>
					<p>{textHeader}</p>
				</CardHeader>
			)}

			<CardContent className={cn(className, imgType)}></CardContent>

			{textFooter && (
				<CardFooter>
					<p>{textFooter}</p>
				</CardFooter>
			)}
		</Card>
	);
}
