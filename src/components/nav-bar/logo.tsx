import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  src: string;
  alt: string;
  ariaLabel: string;
  showText?: boolean;
  showLogo?: boolean;
}

export function Logo({
  src,
  alt,
  ariaLabel,
  showText = true,
  showLogo = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="group flex items-center gap-3"
    >
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className={cn(
          "size-14 transition-opacity duration-300",
          showLogo ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "flex flex-col leading-tight transition-opacity duration-300",
          showText ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="text-primary-100 text-sm font-bold">UNSW</span>
        <span className="text-primary-50 text-xs">
          <span className="font-bold">R</span>obotics{" "}
          <span className="font-bold">A</span>nd{" "}
          <span className="font-bold">M</span>echatronics{" "}
          <span className="font-bold">Soc</span>iety
        </span>
      </div>
    </Link>
  );
}
