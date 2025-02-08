import * as React from "react";
import { createContext } from "react";
import { RouteType } from "@/data/pathRoutes/config";
export interface OpenContextValue {
  isMenuOpen: boolean | null;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  routeItem: RouteType[];
}

const OpenContext = createContext<OpenContextValue | undefined>(undefined);

export function OpenContextProvider({
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
    <OpenContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        routeItem,
      }}
    >
      {children}
    </OpenContext.Provider>
  );
}

export const useSideBarContext = () => {
  const openContext = React.useContext(OpenContext);
  if (openContext === undefined) {
    throw new Error("useOpenContext must be inside a OpenContextProvider");
  }
  return openContext;
};
