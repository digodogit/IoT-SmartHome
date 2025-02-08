"use client";

import {
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../molecules/DropdownFeatures";
import { DispCompType, DispType } from "@/data/dispData/dispModel";
import { useDevicesContext } from "@/contexts/Items-context-provider";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import SliderControl from "../molecules/SliderControl";
import ColorControl from "../molecules/ColorControl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ActiveCard({ disp }: { disp: DispType }) {
  const {
    handleDeleteDisp,
    handleEditDisp,
    handleUpdateComponent,
    selectedDisp,
  } = useDevicesContext();

  const handleChangeValue = (
    name: string,
    newValue: string | boolean | number,
  ) => {
    handleUpdateComponent(name, newValue);
  };

  useEffect(() => {
    if (selectedDisp) {
      handleEditDisp(selectedDisp.data);
    }
  }, [selectedDisp?.data]);
  return (
    <>
      <DropdownList className="py-2 px-4 border">
        {selectedDisp?.data?.components &&
          selectedDisp?.data.components.map(({ component }, index) => (
            <DropdownItem
              key={index}
              className="flex flex-row justify-between py-2 border-b-2"
            >
              {component.style === "switch" && (
                <>
                  <p>{component.name}</p>
                  <ToggleSwitch
                    key={component.name}
                    value={component.data.value as boolean}
                    text={component.name}
                    updateValue={handleChangeValue}
                  />
                </>
              )}
              {component.style === "slider" && (
                <SliderControl
                  key={component.name}
                  value={component.data.value as number}
                  text={component.name}
                  updateValue={handleChangeValue}
                />
              )}
              {component.style === "color" && (
                <ColorControl
                  key={component.name}
                  value={component.data.value as string}
                  text={component.name}
                  updateValue={handleChangeValue}
                />
              )}
            </DropdownItem>
          ))}
        <div className="flex flex-row justify-end py-2">
          <button
            onClick={async () => handleDeleteDisp(disp._id)}
            className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            deletar
          </button>
        </div>
      </DropdownList>
    </>
  );
}
