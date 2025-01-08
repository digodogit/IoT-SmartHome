'use client';

import { useDevicesContext } from '@/contexts/items-context-provider';

import { DispSchema } from '@/data/dispData/dispModel';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { SubmitButton } from '@/components/custom/SubmitButton';
import { useState } from 'react';

export default function DispForm() {
	const { handleAddDisp } = useDevicesContext();
	const { register, getValues } = useForm<DispSchema>({ defaultValues: undefined });

	return (
		<form
			action={async () => {
				const dispData = getValues();
				await handleAddDisp(dispData);
			}}
		>
			<div className="flex flex-col p-4 justify-center max-w-[450px] gap-[20px] w-full h-auto border-4 border-blue-200 ">
				<div className="flex flex-col justify-center w-full h-fit">
					<div className="flex flex-row justify-between">
						<label className="self-center">
							email
							<Input
								className="w-[320px]"
								id="name"
								type="text"
								placeholder="name"
								{...register('name')}
							/>
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="self-center">
							id
							<Input
								className="w-[320px]"
								id="id"
								type="text"
								placeholder="id"
								{...register('id')}
							/>
						</label>
					</div>

					<div className="flex flex-row justify-between">
						<label className="self-center">
							category
							<Input
								className="w-[320px]"
								id="category"
								type="text"
								placeholder="category"
								{...register('category')}
							/>
						</label>
					</div>
				</div>
				<div className="flex justify-end">
					<SubmitButton
						text="criar"
						className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
					></SubmitButton>
				</div>
			</div>
		</form>
	);
}
