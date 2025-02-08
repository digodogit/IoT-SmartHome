"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { RouteType } from "@/data/pathRoutes/config";
import { ReactNode, useState } from "react";
import { Button } from "../atoms/Button";

//sidebar item se encaixa como molecula. Talvez seja possivel juntar o botão aqui.

export interface SideBarItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  item: RouteType;

  children?: ReactNode | ReactNode[];
}

const SideBarItem = React.forwardRef<HTMLLIElement, SideBarItemProps>(
  ({ className, children, item, ...props }, ref) => {
    const [isDropOpen, setIsDropOpen] = useState(false);
    const handleDropOpen = () => {
      setIsDropOpen(!isDropOpen);
    };
    return (
      <li ref={ref} className={cn(className)} {...props}>
        <Button
          text={item.path}
          type="button"
          className={cn(
            "p-1 w-full justify-center data-[open=true]:border-b-2 border-gray-500",
          )}
          onClick={handleDropOpen}
        />
        {isDropOpen && item.child && children}
      </li>
    );
  },
);

SideBarItem.displayName = "SideBarItem";

export { SideBarItem };
