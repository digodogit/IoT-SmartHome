"use client";
import { DispFavCard } from "@/components/organisms/DispFavCard";
import { useDevicesContext } from "@/contexts/Items-context-provider";
import { DispType } from "@/data/dispData/dispModel";
import { useMemo } from "react";

export default function ShowDispPage() {
  const { devices } = useDevicesContext();

  const favDisp = useMemo(
    () => devices.filter((device: DispType) => device.favDisp === true),
    [devices],
  );
  return (
    <>
      <div className="col-start-1 row-start-2 col-span-1">
        <div className="flex flex-col gap-5 p-2 ">
          <h3>Dispositivos favoritos</h3>
          <div className="flex flex-row flex-wrap content-around  bg-white gap-5 border-2 rounded-lg border-slate-300 justify-center ">
            {favDisp?.map((disp) => (
              <DispFavCard
                key={disp._id}
                textHeader={disp.name}
                imgType="img3"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-start-1  row-start-3 col-span-1 ">
        <div className="flex flex-col gap-5 p-2 ">
          <h3>Ações rapidas</h3>
          <div className="flex flex-row flex-wrap bg-white  content-around gap-5 border-2 rounded-lg border-slate-300">
            <DispFavCard textHeader="uma imagem" imgType="img2" />
            <DispFavCard textHeader="uma imagem" imgType="img2" />
            <DispFavCard textHeader="uma imagem" imgType="img2" />
            <DispFavCard textHeader="uma imagem" imgType="img2" />
            <DispFavCard textHeader="uma imagem" imgType="img2" />
            <DispFavCard textHeader="uma imagem" imgType="img2" />
          </div>
        </div>
      </div>
    </>
  );
}
