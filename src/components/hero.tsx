"use client";

import { motion } from "framer-motion";
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
   * @default "500px"
   */
  height?: string;
  /**
   * Whether to wrap children in an h1 element
   * @default true
   */
  wrapInHeading?: boolean;
}

export function Hero({
  children,
  imageSrc,
  imageAlt = "RAMSoc events",
  height = "500px",
  wrapInHeading = true,
}: HeroProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      className="relative mb-16 flex w-full items-center justify-center overflow-hidden"
      style={{ height }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          className="size-full object-cover"
          src={imageSrc}
          width={1920}
          height={700}
          loading="lazy"
          alt={imageAlt}
          quality={90}
        />
        {/* Gradient overlay */}
        <div className="from-primary-950/95 via-primary-900/90 to-primary-800/85 absolute inset-0 bg-linear-to-br" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="relative z-10 px-4 text-center"
      >
        {wrapInHeading ? (
          <h1 className="text-6xl font-bold text-white drop-shadow-lg md:text-7xl lg:text-8xl">
            {children}
          </h1>
        ) : (
          children
        )}
      </motion.div>
    </section>
  );
}
