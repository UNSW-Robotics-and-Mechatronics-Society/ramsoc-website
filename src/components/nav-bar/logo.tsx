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
        className="size-14"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold opacity-80">UNSW</span>
        <span className="text-xs opacity-70">
          <span className="font-bold">R</span>obotics{" "}
          <span className="font-bold">A</span>nd{" "}
          <span className="font-bold">M</span>echatronics{" "}
          <span className="font-bold">Soc</span>iety
        </span>
      </div>
    </Link>
  );
}
