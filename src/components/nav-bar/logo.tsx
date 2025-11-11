import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  ariaLabel: string;
  showText?: boolean;
}

export function Logo({
  src,
  alt,
  width,
  height,
  ariaLabel,
  showText = true,
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
        width={width}
        height={height}
        className="size-16 transition-transform duration-300"
      />
      {showText && (
        <div className="hidden flex-col leading-tight md:flex">
          <span className="text-primary-100 text-sm font-bold">UNSW</span>
          <span className="text-primary-50 text-xs">
            <span className="font-bold">R</span>obotics{" "}
            <span className="font-bold">A</span>nd{" "}
            <span className="font-bold">M</span>echatronics{" "}
            <span className="font-bold">Soc</span>iety
          </span>
        </div>
      )}
    </Link>
  );
}
