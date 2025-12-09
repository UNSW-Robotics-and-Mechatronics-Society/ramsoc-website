"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroProps {
  /**
   * The main title or content to display in the hero section
   */
  children: ReactNode;
  /**
   * Path to the background image (relative to public folder) - NOT USED in minimalist design
   */
  imageSrc?: string;
  /**
   * Alt text for the background image - NOT USED in minimalist design
   */
  imageAlt?: string;
  /**
   * Height of the hero section
   * @default "300px"
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
  height = "300px",
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
      className="relative flex w-full items-center justify-center overflow-hidden bg-white border-b-2 border-[#d4d4d4]"
      style={{ height }}
    >
      {/* Content - Terminal style */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="relative z-10 px-4 text-center"
      >
        {wrapInHeading ? (
          <h1 className="text-4xl md:text-5xl font-normal tracking-tighter text-black font-mono uppercase border-b-4 border-[#1076eb] pb-2 inline-block">
            {children}
          </h1>
        ) : (
          children
        )}
      </motion.div>
    </section>
  );
}
