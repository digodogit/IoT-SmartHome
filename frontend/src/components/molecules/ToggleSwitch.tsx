"use client";
import { DispCompType } from "@/data/dispData/dispModel";
import { ChangeEvent, useState } from "react";

interface ToggleBtnProps {
  value: boolean;
  text: string;
  className?: string;
  updateValue(text: string, newValue: boolean): void;
}

export default function ToggleSwitch({
  text,
  value,
  className,
  updateValue,
}: ToggleBtnProps) {
  const [isChecked, setIsChecked] = useState<typeof value>(value);

  const handleChangeValue = async (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(text, !isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div className="relative inline-block w-11 h-5">
      <input
        checked={isChecked}
        id={`switch-component-${text}`}
        type="checkbox"
        onChange={handleChangeValue}
        className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
      />
      <label
        htmlFor={`switch-component-${text}`}
        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
      ></label>
    </div>
  );
}
