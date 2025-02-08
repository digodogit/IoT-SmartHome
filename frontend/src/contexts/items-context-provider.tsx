/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  createDisp,
  deleteDisp,
  editDisp,
} from "@/data/dispData/dispActions";
import {
  DispCompType,
  DispFormType,
  DispSchema,
  DispType,
  DispTypeProps,
} from "@/data/dispData/dispModel";

import {
  Component,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useOptimistic,
  useState,
} from "react";

// criar uma função para selecionar o component para poder edita-lo.
// provavelmente ir pelo "selectedDisp" dar "find" no nome (id) e editar.
export type TypeDevicesContext = {
  devices: DispType[];

  selectedDisp: DispTypeProps<DispType> | null;
  setSelectedDisp: Dispatch<
    SetStateAction<DispTypeProps<DispType> | null>
  >;
  handleAddDisp: (newDisp: DispFormType) => Promise<void>;
  handleEditDisp: (newDispData: DispFormType) => Promise<void>;
  handleDeleteDisp: (dispId: DispType["_id"]) => Promise<void>;
  handleChangeSelectedDispId: (id: DispType["_id"]) => void;
  handleUpdateComponent: (
    compName: string,
    newValue: string | boolean | number,
  ) => void;
};

export const DevicesContext = createContext<TypeDevicesContext | null>(
  null,
);

export default function DevicesContextProvider({
  devices,
  children,
}: {
  devices: DispType[];
  children: React.ReactNode;
}) {
  const [selectedDisp, setSelectedDisp] =
    useState<DispTypeProps<DispType> | null>(null);
  const [optimisticDisp, setOptimisticDisp] = useOptimistic(selectedDisp);
  const handleAddDisp = async (newDisp: DispFormType) => {
    const error = await createDisp(newDisp);
    if (error) {
      console.log(error.message);
    }
  };

  const handleEditDisp = async (newDispData: DispFormType) => {
    const error = await editDisp(newDispData);
    if (error) {
      console.log(error.message);
    }
  };
  const handleDeleteDisp = async (dispId: DispType["_id"]) => {
    const error = await deleteDisp(dispId);
    if (error) {
      console.log(error.message);
    }
  };
  const handleChangeSelectedDispId = useCallback(
    async (id: DispType["_id"]) => {
      if (
        selectedDisp &&
        selectedDisp.data._id === id &&
        selectedDisp.isOpen
      ) {
        setSelectedDisp((prevState) => {
          return {
            ...prevState,
            isOpen: false,
          };
        });
      } else {
        const dispFind = devices.find((device: DispType) => {
          return device._id === id;
        });
        if (dispFind)
          setSelectedDisp(() => {
            return {
              data: dispFind,
              isOpen: true,
            };
          });
      }
    },
    [selectedDisp, devices, setSelectedDisp],
  );

  const handleUpdateComponent = async (
    compName: string,
    newValue: string | boolean | number,
  ) => {
    if (selectedDisp && selectedDisp.data.components) {
      const disp = selectedDisp.data.components.map(
        ({ component }, index, obj) => {
          if (component.name === compName && component.data) {
            component.data.value = newValue;
          }
          return { component: component };
        },
      );

      setSelectedDisp((prevState) => {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            components: disp,
          },
        };
      });
    }
  };
  return (
    <DevicesContext.Provider
      value={{
        devices,
        selectedDisp,
        setSelectedDisp,
        handleAddDisp,
        handleEditDisp,
        handleDeleteDisp,
        handleChangeSelectedDispId,
        handleUpdateComponent,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
}

export function useDevicesContext() {
  const context = useContext(DevicesContext);

  if (!context) {
    throw new Error(
      "usePetContext must be used within a PetContextProvider",
    );
  }

  return context;
}
