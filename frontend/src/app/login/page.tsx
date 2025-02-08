"use client";
import { SigninForm } from "@/components/forms/SigninForm";

function LoginPage() {
  return (
    <div className="flex flex-row min-w-svh w-svh h-svh">
      <div className="bg-cyan-100 w-full h-full self-stretch"></div>
      <SigninForm />
    </div>
  );
}

export default LoginPage;
