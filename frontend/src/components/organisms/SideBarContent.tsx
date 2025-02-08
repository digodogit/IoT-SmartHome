"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSideBarContext } from "../../contexts/SideBar-Context";
import { useState } from "react";
import { SideBarItem } from "../molecules/SideBarItem";
import {
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../molecules/DropdownFeatures";

export interface SideBarContentProps
  extends React.HTMLAttributes<HTMLMenuElement> {
  children?: React.ReactNode | React.ReactNode[];
}

export const SideBarContent = React.forwardRef<
  HTMLMenuElement,
  SideBarContentProps
>(({ className, children, ...props }, ref) => {
  const { routeItem, isMenuOpen, setIsMenuOpen } = useSideBarContext();
  const routePath = useRouter();
  const pathName = usePathname();

  const handleRoute = (path: string) => {
    if (pathName !== path) {
      routePath.push(path);
    }
  };
  return (
    <menu ref={ref} className={cn(className)} {...props}>
      <ul>
        {routeItem.map((item, index) => (
          <SideBarItem
            item={item}
            key={item.path}
            className="border-2 border-neutral-200 p-2"
          >
            <DropdownList
              label="Categorias"
              className="border-b-2 border-neutral-500 mt-1 shadow-md rounded-lg bg-gray-300  p-1 list-disc list-inside"
            >
              {item?.child?.map((route, index) => {
                return (
                  <DropdownItem key={index} className="py-1.5">
                    <DropdownButton
                      text={route.state}
                      onClick={() =>
                        handleRoute("/dashboard" + route.path)
                      }
                    />
                  </DropdownItem>
                );
              })}
            </DropdownList>
          </SideBarItem>
        ))}
      </ul>
    </menu>
  );
});

SideBarContent.displayName = "SideBarContent";
