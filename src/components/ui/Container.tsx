import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-primary-500 text-primary-50 hover:bg-primary-900/90",
    },
    size: {
      default: "px-10 py-3",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <div className="w-full">
        <Comp
          className={cn(containerVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants };
