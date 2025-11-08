import Image from "next/image";
import type { ReactNode } from "react";

interface HeroProps {
  /**
   * The main title or content to display in the hero section
   */
  children: ReactNode;
  /**
   * Path to the background image (relative to public folder)
   */
  imageSrc: string;
  /**
   * Alt text for the background image
   */
  imageAlt: string;
  /**
   * Height of the hero section
   * @default "800px"
   */
  height?: string;
  /**
   * Opacity of the dark overlay (0-100)
   * @default 75
   */
  overlayOpacity?: number;
  /**
   * Whether to wrap children in an h1 element
   * @default true
   */
  wrapInHeading?: boolean;
}

export function Hero({
  children,
  imageSrc,
  imageAlt = "Collage of events held by RAMSoc",
  height = "800px",
  overlayOpacity = 75,
  wrapInHeading = true,
}: HeroProps) {
  return (
    <div
      className="relative mb-16 flex w-full items-center justify-center"
      style={{ height }}
    >
      <div className="absolute top-0 left-0 -z-10 size-full">
        <Image
          className="size-full object-cover"
          src={imageSrc}
          width={1920}
          height={700}
          priority
          alt={imageAlt}
        />
        <div
          className="bg-primary-950 absolute top-0 left-0 size-full"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {wrapInHeading ? (
        <h1 className="text-primary-50 block text-6xl md:contents xl:text-8xl">
          {children}
        </h1>
      ) : (
        children
      )}
    </div>
  );
}
