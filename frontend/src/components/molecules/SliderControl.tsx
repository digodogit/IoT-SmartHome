"use client";
import { DispCompType } from "@/data/dispData/dispModel";
import { ChangeEvent, useState } from "react";

interface SliderControlProps {
  value: number;
  text: string;
  className?: string;
  updateValue(text: string, newValue: number): void;
}

export default function SliderControl({
  value,
  text,
  className,
  updateValue,
}: SliderControlProps) {
  const [newValue, setNewValue] = useState<typeof value>(value);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(text, e.target.valueAsNumber);
    setNewValue(e.target.valueAsNumber);
  };
  return (
    <>
      <label htmlFor={text}>{text}</label>
      <input
        value={newValue}
        id={text}
        type="range"
        onChange={handleChangeValue}
      ></input>
    </>
  );
}
