// FILE: src/components/nav-bar/logo.tsx
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
      className="group flex items-center gap-3 font-mono"
    >
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className={cn(
          "size-8 transition-none",
          showLogo ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "flex flex-col leading-none transition-none",
          showText ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="text-[#1076eb] text-xs font-normal uppercase tracking-tight">RAMSOC</span>
        <span className="text-black text-[10px] font-normal uppercase tracking-tighter">
          UNSW
        </span>
      </div>
    </Link>
  );
}
