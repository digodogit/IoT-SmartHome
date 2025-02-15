"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../atoms/Card";
import { useDevicesContext } from "@/contexts/Items-context-provider";
import { DispType } from "@/data/dispData/dispModel";
import {
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../molecules/DropdownFeatures";
import { ActiveCard } from "./ActiveCard";
import Link from "next/link";
import DispForm from "../forms/DispForm";
import { flushSync } from "react-dom";

type ActionFormType = {
  actionType: "editar" | "criar" | null;
  isFormOpen: boolean;
};
export default function DispositivosTemplate({
  categoria,
}: {
  categoria?: string;
}) {
  const [actionForm, setActionForm] = useState<ActionFormType>({
    actionType: null,
    isFormOpen: false,
  });
  const router = useRouter();
  const {
    devices,
    selectedDisp,
    handleChangeSelectedDispId,
    handleDeleteDisp,
  } = useDevicesContext();
  const filterDisps = useMemo(
    () =>
      devices.filter((device: DispType) => device.category === categoria),
    [categoria, devices],
  );
  if (!categoria) {
    router.push("/dashboard");
  }

  return (
    <>
      {actionForm.actionType ? (
        <DispForm
          actionType={actionForm.actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setActionForm({
                actionType: null,
                isFormOpen: false,
              });
            });
          }}
        />
      ) : (
        <div className="relative w-fit">
          <Card className="relative p-2 w-[600px] rounded-xl border-2 border-slate-500 bg-white">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Link href={`/dashboard/dispositivos/${categoria}`}>
                  <button className="rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors px-4 py-2 text-sm text-white font-medium flex items-center gap-2">
                    <span>←</span>
                    Voltar
                  </button>
                </Link>
              </div>
              <CardTitle className="py-2 border-b-2">
                {categoria}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full ">
              {filterDisps.map((disp) => (
                <DropdownList key={disp._id} className="p-4 border">
                  <DropdownItem key={disp._id}>
                    <label className="font-semibold">
                      <input
                        type="button"
                        onClick={() => {
                          handleChangeSelectedDispId(disp._id);
                        }}
                      />
                      {disp.name}
                    </label>

                    {disp._id === selectedDisp?.data?._id &&
                      selectedDisp?.isOpen && (
                        <div className="py-2">
                          <ActiveCard />
                          <div className="flex justify-end py-1">
                            <button
                              onClick={async () =>
                                setActionForm({
                                  actionType: "editar",
                                  isFormOpen: true,
                                })
                              }
                              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            >
                              editar
                            </button>
                            <button
                              onClick={async () =>
                                handleDeleteDisp(selectedDisp.data._id)
                              }
                              className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            >
                              deletar
                            </button>
                          </div>
                        </div>
                      )}
                  </DropdownItem>
                </DropdownList>
              ))}
            </CardContent>
            <CardFooter className="relative" />
          </Card>
          <div className="absolute bottom-1 right-1 ">
            <button
              onClick={async () =>
                setActionForm({
                  actionType: "criar",
                  isFormOpen: true,
                })
              }
              className=" bg-indigo-400 rounded-full ring-2 ring-indigo-200 size-16 text-2xl text-sky-100"
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
}
