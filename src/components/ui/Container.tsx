import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xl ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-primary-50 hover:bg-primary-900/90",
        destructive: "bg-red-500 text-primary-50 hover:bg-red-500/90 ",
        outline:
          "border text-primary-500 border-primary-600 bg-transparent hover:text-primary-800 hover:border-primary-800",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-100/80",
        ghost: "hover:bg-primary-100 hover:text-primary-900 ",
        link: "text-primary-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-10 py-3",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(containerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants };
