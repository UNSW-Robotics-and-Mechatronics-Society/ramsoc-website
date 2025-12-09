// FILE: src/app/_components/hero.tsx
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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white border-b border-[#d4d4d4]">
      <motion.div
        className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 md:px-12 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main content - centered */}
        <motion.div
          className="flex flex-col items-center gap-8 w-full text-center"
          variants={itemVariants}
        >
          {/* Title Section */}
          <motion.div
            className="flex flex-col gap-2 items-center"
            variants={itemVariants}
          >
            <h1
              id="hero-subtitle"
              className="text-4xl md:text-6xl font-normal tracking-tighter text-black font-mono uppercase border-b-4 border-[#1076eb] pb-2"
            >
              RAMSOC
            </h1>
            <p className="text-xs md:text-sm font-normal text-[#999999] font-mono uppercase tracking-tight mt-2">
              UNSW ROBOTICS AND MECHATRONICS SOCIETY
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            className="max-w-2xl"
            variants={itemVariants}
          >
            <p className="text-sm leading-relaxed text-black font-mono">
              Empowering students through hands-on learning, industry connections,
              and cutting-edge innovation in robotics and mechatronics
              engineering.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row justify-center"
            variants={itemVariants}
          >
            <Button asChild size="default" variant="default">
              <Link href={JOIN_US_URL} target="_blank">
                Join Us
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="default"
            >
              <Link href="/events">Events</Link>
            </Button>
          </motion.div>

          {/* Stats - grid format */}
          <motion.div
            className="mt-8 w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#d4d4d4]"
            variants={itemVariants}
          >
            {[
              { number: "900+", label: "Members" },
              { number: "50+", label: "Workshops" },
              { number: "20+", label: "Partners" },
              { number: "30+", label: "Events" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-6 px-4 border-r border-b border-[#d4d4d4] last:border-r-0 md:[&:nth-child(4)]:border-r-0 [&:nth-child(3)]:border-r-0 md:[&:nth-child(3)]:border-r [&:nth-child(n+3)]:border-b-0"
              >
                <span className="text-2xl font-mono font-normal text-[#1076eb] mb-1">
                  {stat.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-tight text-[#999999]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
