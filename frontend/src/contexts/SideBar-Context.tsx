"use client";
import * as React from "react";
import { createContext } from "react";
import { RouteType } from "@/data/pathRoutes/config";
export interface SideBarContextValue {
  isMenuOpen: boolean | null;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  routeItem: RouteType[];
}

const SideBarContext = createContext<SideBarContextValue | undefined>(
  undefined,
);

export function SideBarContextProvider({
  items,
  children,
}: {
  items: RouteType[];
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | null>(
    false,
  );
  const routeItem = items;
  return (
    <SideBarContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        routeItem,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBarContext = () => {
  const sideBarContext = React.useContext(SideBarContext);
  if (sideBarContext === undefined) {
    throw new Error(
      "useSideBarContext must be inside a SideBarContextProvider",
    );
  }
  return sideBarContext;
};
