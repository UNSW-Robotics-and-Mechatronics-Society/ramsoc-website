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
        className="size-10"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-bold tracking-[0.15em] text-primary-950 uppercase">
          RAMSoc
        </span>
        <span className="text-[0.6rem] tracking-[0.1em] text-neutral-400 uppercase">
          UNSW Robotics
        </span>
      </div>
    </Link>
  );
}
