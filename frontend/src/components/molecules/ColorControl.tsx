"use client";
import { DispCompType } from "@/data/dispData/dispModel";
import { ChangeEvent, useState } from "react";

interface ColorControlProps {
  value: string;
  text: string;
  className?: string;
  updateValue(text: string, newValue: string): void;
}

export default function ColorControl({
  value,
  text,
  className,
  updateValue,
}: ColorControlProps) {
  const [newValue, setNewValue] = useState<string>(value);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(text, e.target.value);
    setNewValue(e.target.value);
  };
  return (
    <>
      <label htmlFor={text}>{text}</label>
      <input
        className="w-[120px]"
        value={newValue}
        id={text}
        type="text"
        onChange={handleChangeValue}
      ></input>
    </>
  );
}
