"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HiArrowRight, HiChevronDown } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
const RUBRIC_URL = "https://campus.hellorubric.com/?s=12676";

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-950"
    >
      {/* Background image — full bleed, parallax zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src="/home/hero.webp"
          alt="RAMSoc events collage"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        {/* Blue tint overlay */}
        <div className="absolute inset-0 bg-primary-700/50" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-primary-950/40" />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary-950 to-transparent" />
      </motion.div>

      {/* Content — centered */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 text-center md:px-12 lg:px-20"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo + university badge */}
        <motion.div
          className="mb-10 flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Image
            className="w-16 lg:w-20"
            src="/logo.svg"
            alt="RAMSoc logo"
            width={80}
            height={50}
            priority
          />
          <div className="h-10 w-px bg-white/20" />
          <span className="text-sm font-bold tracking-[0.35em] text-white/70 uppercase lg:text-base">
            UNSW
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants}>
          <h1 className="mb-2 text-7xl font-black tracking-tight text-white drop-shadow-lg md:text-9xl lg:text-[10rem]">
            RAMSoc
          </h1>
        </motion.div>

        {/* Accent line */}
        <motion.div
          className="mx-auto mb-6 h-1.5 w-16 bg-primary-400"
          variants={itemVariants}
        />

        {/* Subtitle */}
        <motion.p
          id="hero-subtitle"
          className="mx-auto mb-10 max-w-lg text-sm leading-relaxed font-bold tracking-[0.25em] text-white/70 uppercase md:text-base"
          variants={itemVariants}
        >
          Robotics &amp; Mechatronics Society
        </motion.p>

        {/* Description */}
        <motion.p
          className="mx-auto mb-12 max-w-md text-base leading-relaxed font-medium text-white/60"
          variants={itemVariants}
        >
          UNSW&apos;s largest mechatronics society — building the next generation
          of engineers through hands-on projects, competitions, and community.
        </motion.p>

        {/* CTA */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Button
            asChild
            size="none"
            className="group relative inline-flex items-center gap-3 rounded-none border-0 bg-transparent px-0 py-0 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-primary-400"
          >
            <Link href={RUBRIC_URL} target="_blank">
              <span className="flex size-12 items-center justify-center bg-primary-400 transition-colors group-hover:bg-primary-300">
                <HiArrowRight className="size-5 -rotate-45" />
              </span>
              Join Us On Rubric
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiChevronDown className="size-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
