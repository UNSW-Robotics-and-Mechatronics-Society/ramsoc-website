import { cn } from "@/lib/utils";

interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Animated hamburger menu button that transforms into an X when open.
 * Based on: https://codepen.io/ainalem/pen/GeMqdP (plate4 design)
 */
export function AnimatedMenuButton({
  isOpen,
  onClick,
  className,
}: AnimatedMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative size-16 transition-opacity hover:opacity-80",
        className,
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        className="burger absolute inset-0 size-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          className={cn(
            "line line1",
            "fill-none stroke-white stroke-[6px] transition-transform duration-400",
            isOpen &&
              "translate-x-[18px] -translate-y-[3px] scale-[0.7] -rotate-45 transition-transform duration-400",
          )}
          d="M 50,35 H 30"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
        <path
          className={cn(
            "line line2",
            "fill-none stroke-white stroke-[6px] transition-transform delay-100 duration-400",
            isOpen &&
              "translate-x-[-18px] -translate-y-[3px] scale-[0.7] rotate-45 transition-transform delay-0 duration-400",
          )}
          d="M 50,35 H 70"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
        <path
          className={cn(
            "line line3",
            "fill-none stroke-white stroke-[6px] transition-transform delay-100 duration-400",
            isOpen &&
              "scale-[0.7] rotate-45 transition-transform delay-0 duration-400",
          )}
          d="M 50,50 H 30"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
        <path
          className={cn(
            "line line4",
            "fill-none stroke-white stroke-[6px] transition-transform delay-100 duration-400",
            isOpen &&
              "scale-[0.7] -rotate-45 transition-transform delay-0 duration-400",
          )}
          d="M 50,50 H 70"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
        <path
          className={cn(
            "line line5",
            "fill-none stroke-white stroke-[6px] transition-transform delay-100 duration-400",
            isOpen &&
              "translate-x-[18px] translate-y-[3px] scale-[0.7] rotate-45 transition-transform delay-0 duration-400",
          )}
          d="M 50,65 H 30"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
        <path
          className={cn(
            "line line6",
            "fill-none stroke-white stroke-[6px] transition-transform delay-100 duration-400",
            isOpen &&
              "translate-x-[-18px] translate-y-[3px] scale-[0.7] -rotate-45 transition-transform delay-0 duration-400",
          )}
          d="M 50,65 H 70"
          style={{ transformOrigin: "50% 50%", strokeLinecap: "round" }}
        />
      </svg>
      <svg
        className={cn(
          "x absolute inset-0 size-full transition-transform duration-400",
          isOpen
            ? "scale-100 transition-transform delay-100 duration-400"
            : "scale-0",
        )}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          className="line fill-none stroke-white stroke-[5.5px]"
          d="M 34,32 L 66,68"
          style={{ strokeLinecap: "round" }}
        />
        <path
          className="line fill-none stroke-white stroke-[5.5px]"
          d="M 66,32 L 34,68"
          style={{ strokeLinecap: "round" }}
        />
      </svg>
    </button>
  );
}
