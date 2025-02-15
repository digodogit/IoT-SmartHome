"use client";
import { logoutUser } from "@/data/actions/authActions";
import { useRouter } from "next/navigation";
import { SideBarContent } from "../organisms/SideBarContent";
export default function SideBar() {
  const router = useRouter();
  return (
    <aside className="min-h-screen flex-none flex-col justify-between p-1 border-2 rounded-lg border-sky-800">
      <div className="flex flex-col w-[250px]  h-full">
        <div className="flex flex-row h-32 min-h-[150px] gap-2 ">
          <div className=" img4"></div>
          <h3>avatar</h3>
        </div>
        <button
          className="border-2 h-fit"
          onClick={() => router.push("/dashboard")}
        >
          dashboard
        </button>
        <SideBarContent className="flex flex-col grow gap-y-5 justify-self-start" />
        <div className="flex h-32 min-h-[150px] items-end">
          <button
            className="rounded-md bg-sky-500 h-fit p-2 w-full text-white"
            onClick={logoutUser}
          >
            logout
          </button>
        </div>
      </div>
    </aside>
  );
}
