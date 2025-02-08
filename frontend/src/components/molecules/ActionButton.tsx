"use client";

import { useState } from "react";
import DispForm from "../forms/DispForm";
import { flushSync } from "react-dom";

type ActionButtonProps = {
  actionType: "criar" | "editar";
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function ActionButton({
  actionType,
  children,
  onClick,
}: ActionButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {!isFormOpen ? (
        <button
          onClick={onClick}
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all w-[88px] h-[40px] shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        >
          {actionType}
        </button>
      ) : (
        <DispForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      )}
    </>
  );
}
