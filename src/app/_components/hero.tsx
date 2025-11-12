"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { JOIN_US_URL } from "@/lib/constants";

export default function HomeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/home/hero.webp"
          alt="RAMSoc events collage"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="from-primary-950/95 via-primary-900/90 to-primary-800/85 absolute inset-0 bg-linear-to-br" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-10 px-4 py-32 text-white md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8"
          variants={itemVariants}
        >
          <Image
            className="w-[180px] drop-shadow-2xl sm:w-[220px] lg:w-[280px]"
            src="/logo.svg"
            alt="RAMSoc logo"
            width={280}
            height={173}
            priority
          />

          <div className="flex flex-row items-baseline gap-2 text-7xl font-bold sm:text-8xl md:flex-col lg:text-9xl">
            <span className="text-white">RAM</span>
            <span className="text-primary-200 font-light">SOC</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary-300/50 h-px w-full max-w-2xl"
          variants={itemVariants}
        />

        <motion.h1
          id="hero-subtitle"
          className="max-w-3xl text-center text-base font-medium tracking-widest sm:text-lg lg:text-xl"
          variants={itemVariants}
        >
          UNSW ROBOTICS AND MECHATRONICS SOCIETY
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className="bg-primary-500 hover:bg-primary-400 px-8 py-6 text-base font-semibold shadow-xl transition-all hover:shadow-2xl"
          >
            <Link href={JOIN_US_URL} target="_blank">
              Join Us On SpArc
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiChevronDown className="text-primary-200 size-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
