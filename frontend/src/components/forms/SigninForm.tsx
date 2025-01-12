'use client';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { SubmitButton } from '@/components/custom/SubmitButton';
import { signIn, auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { useActionState } from 'react';
import { loginUser } from '@/data/actions/authActions';

export function SigninForm() {
	const [formState, formAction] = useActionState(loginUser, null);
	return (
		<form action={formAction}>
			<div className="flex flex-col p-4 justify-center max-w-[450px] gap-[20px] w-full h-auto border-4 border-blue-200 ">
				<div className="flex flex-col justify-center w-full h-fit">
					<div className="flex flex-row justify-between">
						<label className="self-center">email</label>
						<Input className="w-[320px]" id="email" name="email" type="text" placeholder="email" />
					</div>
					<div className="flex flex-row justify-between">
						<label className="self-center">senha</label>
						<Input
							className="w-[320px]"
							id="password"
							name="password"
							type="text"
							placeholder="senha"
						/>
					</div>
				</div>
				<div className="flex justify-end">
					<SubmitButton
						text="login"
						className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
					></SubmitButton>
				</div>
				{formState && <p>{formState.message}</p>}
			</div>
		</form>
	);
}
