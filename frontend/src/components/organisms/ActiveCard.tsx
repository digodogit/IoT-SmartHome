"use client";

import { DropdownItem, DropdownList } from "../molecules/DropdownFeatures";
import { DispCompType } from "@/data/dispData/dispModel";
import { useDevicesContext } from "@/contexts/Items-context-provider";
import ToggleSwitch from "@/components/molecules/ToggleSwitch";
import SliderControl from "../molecules/SliderControl";
import ColorControl from "../molecules/ColorControl";

import { useEffect } from "react";

export function ActiveCard() {
  const {
    handleEditDisp,
    handleUpdateComponent,
    handleDeleteComponent,
    selectedDisp,
  } = useDevicesContext();

  const handleChangeValue = (
    name: string,
    newValue: string | boolean | number,
  ) => {
    handleUpdateComponent(name, newValue);
  };

  const handleDelComponent = (componentName: DispCompType["name"]) => {
    handleDeleteComponent(componentName);
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
              className="flex flex-row justify-between items-center py-2 border-b-2"
            >
              <div className="flex flex-row justify-between items-center flex-grow">
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
              </div>
              <button
                onClick={() => handleDelComponent(component.name)}
                className="ml-4 p-2 rounded-full hover:bg-red-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DropdownItem>
          ))}
      </DropdownList>
    </>
  );
}
