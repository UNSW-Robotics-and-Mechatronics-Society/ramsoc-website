"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import { Button } from "@/components/ui/button";

export default function MeetTheTeam() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed image background */}
      <div className="absolute inset-0">
        <Image
          className="size-full object-cover"
          src="/home/team.webp"
          width={1920}
          height={700}
          priority
          alt="Our team members"
        />
        {/* Heavy dark overlay for readability */}
        <div className="absolute inset-0 bg-[#030a18]/85" />
        {/* Blue tint overlay */}
        <div className="absolute inset-0 bg-primary-600/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-36 md:px-12 md:py-44 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="mb-6 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
            // 04 — The People Behind RAMSoc
          </span>

          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-8xl">
            Meet Our
            <br />
            <span className="text-primary-400">2025 Team!</span>
          </h2>

          <p className="mb-12 max-w-lg text-base leading-relaxed text-white/40">
            Our passionate team of students dedicated to creating amazing
            experiences for the mechatronics community at UNSW
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="none"
              className="group inline-flex items-center gap-3 rounded-none border-0 bg-transparent px-0 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-primary-400"
            >
              <Link href="/team">
                <span className="flex size-12 items-center justify-center bg-primary-500 transition-colors group-hover:bg-primary-400">
                  <HiArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                </span>
                Learn More
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative large number */}
      <motion.span
        className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        04
      </motion.span>
    </section>
  );
}
