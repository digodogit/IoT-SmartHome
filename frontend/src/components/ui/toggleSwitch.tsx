import { Input } from '@/components/ui/Input';
import { useDevicesContext } from '@/contexts/items-context-provider';
import { useState } from 'react';

interface ToggleBtnProps {
	isChecked?: string;
	className?: string;
}

export default function ToggleSwitch({ isChecked, className }: ToggleBtnProps) {
	return (
		<div className="relative inline-block w-11 h-5">
			<Input
				id="switch-component"
				type="checkbox"
				className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
			/>
			<label
				htmlFor="switch-component"
				className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
			></label>
		</div>
	);
}
