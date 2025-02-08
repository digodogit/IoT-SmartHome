import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  text?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, onClick, text, ...props }, ref) => {
    return (
      <button
        name={text}
        type={type}
        className={cn(className)}
        ref={ref}
        onClick={() => onClick && onClick()}
        {...props}
      >
        {text}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
