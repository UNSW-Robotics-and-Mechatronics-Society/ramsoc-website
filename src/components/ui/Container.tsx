import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const outerContainerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-transparent",
      gradient: "bg-linear-to-b from-white via-primary-100 to-primary-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const innerContainerVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      default: "max-w-[1200px]",
      full: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof innerContainerVariants> {
  asChild?: boolean;
  outerProps?: React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof outerContainerVariants>;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, width, asChild = false, outerProps = {}, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    const {
      className: outerClassName,
      variant: outerVariant,
      ...restOuterProps
    } = outerProps;

    return (
      <div
        className={cn(
          outerContainerVariants({
            variant: outerVariant,
            className: outerClassName,
          }),
        )}
        {...restOuterProps}
      >
        <Comp
          className={cn(
            innerContainerVariants({
              width,
              className,
            }),
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </div>
    );
  },
);

Container.displayName = "Container";

export { Container, innerContainerVariants, outerContainerVariants };
