'use client';

import { useDevicesContext } from '@/contexts/items-context-provider';

import { DispCompType, dispFormSchema, DispFormType } from '@/data/dispData/dispModel';

import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { SubmitButton } from '@/components/custom/SubmitButton';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DropdownItem, DropdownList } from '../custom/dropdown';
import { zodResolver } from '@hookform/resolvers/zod';
type ActionTypeProps = {
	actionType: 'criar' | 'editar';
	onFormSubmission: () => void;
};
type DefaultComponent = {
	component: { name?: string; style?: string; data?: unknown };
};
export default function DispForm({ actionType, onFormSubmission }: ActionTypeProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { handleAddDisp, handleEditDisp, selectedDisp } = useDevicesContext();
	const [countComponent, setCountComponent] = useState<DefaultComponent[]>(
		selectedDisp?.data?.components || [
			{
				component: {},
			},
		]
	);
	const [checkValue, setCheckValue] = useState(false);
	const {
		register,
		trigger,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<DispFormType>({
		resolver: zodResolver(dispFormSchema),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues:
			actionType === 'editar'
				? {
						name: selectedDisp?.data?.name,
						category: selectedDisp?.data?.category,
						userId: selectedDisp?.data?.userId,
						favDisp: selectedDisp?.data?.favDisp,
						components: selectedDisp?.data?.components,
					}
				: undefined,
	});

	const onSubmit = async () => {
		const result = await trigger();
		if (!result) return;
		const dispData = getValues();
		onFormSubmission();
		if (actionType === 'editar') {
			await handleEditDisp(dispData);
		} else if (actionType === 'criar') {
			await handleAddDisp(dispData);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col p-4 justify-center max-w-[450px] gap-[20px] w-full h-auto border-4 border-blue-200 ">
				<div className="flex flex-col justify-center w-full h-fit">
					<div className="flex flex-row justify-between">
						<label className="self-center">
							name
							<Input
								className="w-[320px]"
								id="name"
								type="text"
								placeholder="name"
								{...register('name')}
							/>
							{errors.name && <p>{errors.name?.message}</p>}
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
							{errors.category && <p>{errors.category?.message}</p>}
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="self-center">
							favDisp
							<Input
								className="w-[320px]"
								id="favDisp"
								type="checkbox"
								onClick={async () => setCheckValue(!checkValue)}
								placeholder="favDisp"
								{...register('favDisp')}
							/>
							{errors.favDisp && <p>{errors.favDisp?.message}</p>}
						</label>
					</div>
					{actionType === 'editar' ? (
						<DropdownList>
							{countComponent.map(({ component }, index) => (
								<DropdownItem key={index}>
									<div>
										<label className="self-start">
											name
											<Input
												className="w-[320px]"
												id={`components.${index}.component.name`}
												type="text"
												placeholder="name"
												{...register(`components.${index}.component.name`)}
											/>
										</label>
									</div>
									<div>
										<label className="self-start">
											style
											<Input
												className="w-[320px]"
												id={`components.${index}.component.style`}
												type="text"
												placeholder="style"
												{...register(`components.${index}.component.style`)}
											/>
										</label>
									</div>
									{errors.components?.[index]?.component?.style && (
										<p>{"Style deve ser 'switch', 'slider' ou 'color'"}</p>
									)}
								</DropdownItem>
							))}
						</DropdownList>
					) : null}
					<Input
						type="button"
						placeholder="adicionar component"
						onClick={async () => setCountComponent([...countComponent, { component: {} }])}
						className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
					/>
				</div>
				<div className="flex justify-end">
					<SubmitButton
						text={actionType}
						className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
					></SubmitButton>
				</div>
			</div>
		</form>
	);
}
