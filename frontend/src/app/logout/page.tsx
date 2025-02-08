"use client";
import { logoutUser } from "@/data/actions/authActions";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    "use server";
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }, []);

  return (
    <div>
      <p>haha</p>
    </div>
  );
}

export default LogoutPage;
