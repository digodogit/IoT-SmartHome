'use server';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { dispTest } from '@/data/dispData/dispDataTest';
import { baseRoutes } from '@/data/pathRoutes/baseRoutes';
import { getAllUserDisp } from '@/lib/server-utils';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Metadata } from 'next';
import DispositivosTemplate from '@/components/custom/dispositivos';
import { redirect } from 'next/navigation';
import DispForm from '@/components/forms/dispForm';
import Link from 'next/dist/client/link';

// Ainda em desenvolvimento
// não está indo para o form para criar dispositivo da melhor forma
export async function getDispParams(options: string, categoria?: string) {
	if (categoria === 'criar') {
		return { element: <DispForm /> };
	}
	const optionsComp = baseRoutes.find((parent) => parent.state === options);
	if (categoria && optionsComp?.child) {
		const catComponent = optionsComp?.child?.find((child) => child.state === categoria);
		return catComponent;
	}
	return optionsComp;
}

export default async function Page({
	params,
}: {
	params: Promise<{ dispositivos: string; categoria: string }>;
}) {
	const { dispositivos, categoria } = await params;
	const component = await getDispParams(dispositivos, categoria);
	if (!component) {
		redirect('/dashboard');
	}
	// esse return tem q ser um component que recebe
	return (
		<>
			<Link href="/dashboard" replace>
				<button className=" bg-indigo-400 ring-1 ring-indigo-200 size-12 text-m text-sky-100">
					voltar
				</button>
			</Link>
			{component.element}
		</>
	);
}
