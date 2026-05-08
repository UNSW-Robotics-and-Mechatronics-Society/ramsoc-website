"use client";

import Image from "next/image";
import { type ReactNode } from "react";

type LogoButtonProps = {
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
  imageClassName?: string;
  linkClassName?: string;
  containerClassName?: string;
  hoverHintText?: string;
  children?: ReactNode;
};

export default function LogoButton({
  href,
  src,
  alt,
  ariaLabel,
  imageClassName = "h-full w-full object-cover",
  linkClassName = "flex size-28 items-center justify-center overflow-hidden rounded-full bg-[#222a34] shadow-xl transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 md:size-36",
  containerClassName,
  hoverHintText = "Click me!",
  children,
}: LogoButtonProps) {
  return (
    <div className={containerClassName}>
      <div className="group flex flex-col items-center">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
          aria-label={ariaLabel}
        >
          <Image
            src={src}
            alt={alt}
            width={144}
            height={144}
            className={imageClassName}
          />
        </a>

        <span className="mt-2 text-xs font-semibold tracking-[0.14em] whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          {hoverHintText}
        </span>
      </div>

      {children}
    </div>
  );
}
