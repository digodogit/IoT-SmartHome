/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
"use client";
import { RouteType } from "@/data/pathRoutes/config";
import { OpenContextProvider } from "../../contexts/SideBar-Context";
import { SideBarContent } from "../organisms/SideBarContent";
import { logoutUser } from "@/data/actions/authActions";
import { useRouter } from "next/navigation";
export default function SideBar({ items }: { items: RouteType[] }) {
  const router = useRouter();
  return (
    <OpenContextProvider items={items}>
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
            className="rounded-md bg-red-500 h-fit p-2 w-full text-white"
            onClick={logoutUser}
          >
            {" "}
            logout
          </button>
        </div>
      </div>
    </OpenContextProvider>
  );
}
