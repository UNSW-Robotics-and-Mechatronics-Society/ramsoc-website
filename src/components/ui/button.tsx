// FILE: src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal font-mono tracking-tight transition-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase",
  {
    variants: {
      variant: {
        default:
          "bg-[#1076eb] text-white hover:bg-[#0d5fc7] border-2 border-[#1076eb] hover:border-[#0d5fc7]",
        destructive: "bg-black text-white hover:bg-[#333333] border-2 border-black",
        outline:
          "border-3 border-[#1076eb] bg-transparent text-[#1076eb] hover:bg-[#1076eb] hover:text-white",
        secondary:
          "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white",
        ghost: "hover:bg-[#f5f5f5] text-black border-2 border-transparent",
        link: "text-[#1076eb] underline-offset-4 hover:underline border-0",
      },
      size: {
        none: "",
        default: "px-8 py-3 h-12",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
