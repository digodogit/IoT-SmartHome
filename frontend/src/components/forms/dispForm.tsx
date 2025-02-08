"use client";

import { useDevicesContext } from "@/contexts/Items-context-provider";

import { dispFormSchema, DispFormType } from "@/data/dispData/dispModel";

import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DropdownItem, DropdownList } from "../molecules/DropdownFeatures";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../atoms/Button";
type ActionTypeProps = {
  actionType: "criar" | "editar";
  onFormSubmission: () => void;
};
type DefaultComponent = {
  component: {
    name?: string;
    style?: string;
    data?: {
      type: string;
      value: string | boolean | number;
    };
  };
};

// Melhorar form dos dispositivos.
export default function DispForm({
  actionType,
  onFormSubmission,
}: ActionTypeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { handleAddDisp, handleEditDisp, selectedDisp } =
    useDevicesContext();
  const [countComponent, setCountComponent] = useState<DefaultComponent[]>(
    selectedDisp?.data?.components || [
      {
        component: {
          name: "",
          style: "",
          data: undefined,
        },
      },
    ],
  );
  const [checkValue, setCheckValue] = useState(false);
  const {
    register,
    trigger,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<DispFormType>({
    resolver: zodResolver(dispFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues:
      actionType === "editar"
        ? {
            name: selectedDisp?.data?.name,
            category: selectedDisp?.data?.category,
            userId: selectedDisp?.data?.userId,
            favDisp: selectedDisp?.data?.favDisp,
            components: selectedDisp?.data?.components,
          }
        : undefined,
  });

  const onSubmit = async () => {
    const result = await trigger();
    if (!result) return;
    const dispData = getValues();
    onFormSubmission();
    if (actionType === "editar") {
      await handleEditDisp(dispData);
    } else if (actionType === "criar") {
      await handleAddDisp(dispData);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col p-4 justify-center max-w-[450px] gap-[20px] w-full h-auto border-4 border-blue-200 ">
        <div className="flex flex-col justify-center w-full h-fit gap-2">
          <div className="flex flex-row justify-between">
            <label htmlFor="name" className="self-center">
              Nome do dispositivo:
            </label>
            <Input
              className="w-[120px]"
              id="name"
              type="text"
              placeholder="name"
              {...register("name")}
            />
            {errors.name && <p>{errors.name?.message}</p>}
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="category" className="self-center">
              Categoria do dispositivo:
            </label>
            <Input
              className="w-[120px] "
              id="category"
              type="text"
              placeholder="category"
              {...register("category")}
            />
            {errors.category && <p>{errors.category?.message}</p>}
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="favDisp" className="self-center">
              Favoritar dispositivo:
            </label>
            <Input
              className="w-[120px]"
              id="favDisp"
              type="checkbox"
              onClick={async () => setCheckValue(!checkValue)}
              placeholder="favDisp"
              {...register("favDisp")}
            />
            {errors.favDisp && <p>{errors.favDisp?.message}</p>}
          </div>
          {actionType === "editar" ? (
            <DropdownList>
              {countComponent.map(({ component }, index) => (
                <>
                  <p key={`components.${index}`}>
                    {" "}
                    {`Componente ${index}:`}{" "}
                  </p>
                  <DropdownItem key={index} className="px-1">
                    <div className="flex flex-row justify-between">
                      <label
                        className="self-center"
                        htmlFor={`components.${index}.component.name`}
                      >
                        Nome
                      </label>
                      <Input
                        className="w-[220px]"
                        id={`components.${index}.component.name`}
                        type="text"
                        placeholder="Nome"
                        {...register(`components.${index}.component.name`)}
                      />
                    </div>
                    <div className="flex flex-row justify-between">
                      <label
                        className="self-start"
                        htmlFor={`components.${index}.component.style`}
                      >
                        Estilo
                      </label>
                      <Input
                        className="self-center w-[220px]"
                        id={`components.${index}.component.style`}
                        type="text"
                        value={component.style}
                        placeholder="Estilo"
                        {...(register(
                          `components.${index}.component.style`,
                        ),
                        {
                          onChange: async (e) => {
                            if (e.target.value === "switch") {
                              setValue(
                                `components.${index}.component.style`,
                                "switch",
                              );
                              setValue(
                                `components.${index}.component.data.type`,
                                "boolean",
                              );
                              setValue(
                                `components.${index}.component.data.value`,
                                false,
                              );
                            } else if (e.target.value === "slider") {
                              setValue(
                                `components.${index}.component.style`,
                                "slider",
                              );
                              setValue(
                                `components.${index}.component.data.type`,
                                "number",
                              );
                              setValue(
                                `components.${index}.component.data.value`,
                                100,
                              );
                            } else if (e.target.value === "color") {
                              setValue(
                                `components.${index}.component.style`,
                                "color",
                              );
                              setValue(
                                `components.${index}.component.data.type`,
                                "string",
                              );
                              setValue(
                                `components.${index}.component.data.value`,
                                "white",
                              );
                            }
                          },
                        })}
                      />
                    </div>
                    {errors.components?.[index]?.component?.style && (
                      <p>
                        {"Style deve ser 'switch', 'slider' ou 'color'"}
                      </p>
                    )}
                  </DropdownItem>
                </>
              ))}
            </DropdownList>
          ) : null}
          <Input
            type="button"
            placeholder="adicionar"
            defaultValue="adicionar"
            onClick={async () =>
              setCountComponent([
                ...countComponent,
                {
                  component: {
                    name: "",
                    style: "",
                    data: undefined,
                  },
                },
              ])
            }
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            text={actionType}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          />
        </div>
      </div>
    </form>
  );
}
