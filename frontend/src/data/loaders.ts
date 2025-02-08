"use server";
import { signOut } from "@/lib/auth";
import { checkAuth } from "@/lib/server-utils";

export async function fetchUserLogout() {
  const session = await checkAuth();
  console.log(session);
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.accessToken}`,
    },
  };
  try {
    const res = await fetch(
      `http://${process.env.BASE_URL}:3001/api/auth/logoutall`,
      headers,
    );
    const data = await res.json();
    if (res.ok) {
      await signOut({
        redirectTo: "http://localhost:3000",
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
}
