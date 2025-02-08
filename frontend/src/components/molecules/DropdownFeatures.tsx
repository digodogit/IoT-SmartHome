/* eslint-disable prettier/prettier */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../atoms/Button";

interface DropdownListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode | React.ReactNode[];
  label?: string;
}
const DropdownList = React.forwardRef<HTMLUListElement, DropdownListProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn(className)} {...props}>
        {label ? (
          <label className="border-b-2 border-neutral-400">{label}</label>
        ) : null}
        {children}
      </ul>
    );
  },
);
DropdownList.displayName = "DropdownList";

interface DropdownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(className)} {...props}>
        {children}
      </li>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

interface DropdownButtonProps extends ButtonProps {
  children?: React.ReactNode;
  icon?: boolean;
}

function DropdownButton({
  className,
  children,
  ...props
}: DropdownButtonProps) {
  return (
    <>
      <Button
        className={cn("gap-2 justify-start", className)}
        {...props}
      />
      {children}
    </>
  );
}

DropdownButton.displayName = "DropdownButton";
export { DropdownList, DropdownItem, DropdownButton };
