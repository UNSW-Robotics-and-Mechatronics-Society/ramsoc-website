import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xl ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-primary-50 hover:bg-primary-900/90",
        destructive: "bg-red-500 text-primary-50 hover:bg-red-500/90 ",
        outline:
          "border border-primary-600 bg-transparent text-primary-500 hover:border-primary-800 hover:text-primary-800",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-100/80",
        ghost: "hover:bg-primary-100 hover:text-primary-900 ",
        link: "text-primary-900 underline-offset-4 hover:underline",
        outline_prime_dark:
          "rounded-lg border-[1.5px] border-primary-800 text-primary-800 duration-100 hover:scale-[1.05] hover:border-primary-600 hover:bg-primary-600 hover:text-primary-50 hover:shadow",
        outline_prime_light:
          "rounded-lg border-[1.5px] border-primary-50 text-primary-50 duration-100 hover:scale-[1.05] hover:border-primary-600 hover:bg-primary-600 hover:text-primary-50 hover:shadow",
        outline_prime_BW:
          "rounded-lg border-[1.5px] border-primary-50 text-primary-50 duration-100 hover:scale-[1.05] hover:border-primary-50 hover:bg-primary-50 hover:text-primary-950 hover:shadow",
      },
      size: {
        none: "",
        default: "px-10 py-3",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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
