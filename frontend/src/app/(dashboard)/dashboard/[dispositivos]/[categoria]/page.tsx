"use server";

import { baseRoutes } from "@/data/pathRoutes/baseRoutes";
import * as React from "react";
import { redirect } from "next/navigation";
import Link from "next/dist/client/link";

// Ainda em desenvolvimento

export async function getDispParams(options: string, categoria?: string) {
  const optionsComp = baseRoutes.find(
    (parent) => parent.state === options,
  );
  if (categoria && optionsComp?.child) {
    const catComponent = optionsComp?.child?.find(
      (child) => child.state === categoria,
    );
    return catComponent;
  }
  return optionsComp;
}

export default async function Page({
  params,
}: {
  params: Promise<{
    dispositivos: string;
    categoria: string;
  }>;
}) {
  const { dispositivos, categoria } = await params;
  const component = await getDispParams(dispositivos, categoria);
  if (!component) {
    redirect("/dashboard");
  }
  // esse return tem q ser um component que recebe
  return <>{component.element}</>;
}
