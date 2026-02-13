"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiBriefcase } from "react-icons/hi2";

import { Button } from "@/components/ui/button";

export default function CareersPreview() {
  return (
    <section className="relative overflow-hidden bg-white text-primary-950">
      {/* Split background — decorative lines */}
      <div className="pointer-events-none absolute inset-0">
        {/* Vertical accent lines */}
        <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
        <div className="absolute top-0 left-[50%] h-full w-px bg-neutral-100" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
        {/* Blue block accent in corner */}
        <div className="absolute right-0 bottom-0 h-1/3 w-1/4 bg-primary-500/3" />
      </div>

      {/* Top border accent */}
      <div className="h-1 w-full bg-primary-500" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-5 lg:items-center">
          {/* Left content — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex size-10 items-center justify-center bg-primary-500 text-white">
                <HiBriefcase className="size-5" />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
                // 03 — Opportunities
              </span>
            </div>

            <h2 className="mb-6 text-5xl font-bold md:text-6xl lg:text-8xl">
              Launch Your
              <br />
              <span className="text-primary-500">Career</span>
            </h2>

            <p className="mb-12 max-w-lg text-base leading-relaxed text-neutral-500">
              Explore exciting opportunities in robotics, mechatronics, and
              engineering. We connect our members with internships, graduate
              positions, and career opportunities from leading companies and
              innovative startups.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="none"
                className="group inline-flex items-center gap-3 rounded-none border-0 bg-transparent px-0 text-sm font-bold uppercase tracking-[0.2em] text-primary-950 transition-colors hover:bg-transparent hover:text-primary-500"
              >
                <Link href="/careers">
                  <span className="flex size-12 items-center justify-center bg-primary-500 text-white transition-colors group-hover:bg-primary-400">
                    <HiArrowRight className="size-5" />
                  </span>
                  View Opportunities
                </Link>
              </Button>
              <Button
                asChild
                size="none"
                className="group inline-flex items-center gap-3 rounded-none border-0 bg-transparent px-0 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:bg-transparent hover:text-primary-950"
              >
                <Link href="/events">
                  <span className="flex size-12 items-center justify-center border border-neutral-200 transition-colors group-hover:border-neutral-400">
                    <HiArrowRight className="size-4 -rotate-45" />
                  </span>
                  Attend Our Events
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — stat blocks stacked vertically */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="border-l-2 border-primary-500 bg-primary-50/50 p-8">
              <div className="mb-1 text-5xl font-black text-primary-950">
                Year-Round
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                Networking Events
              </p>
            </div>
            <div className="border-l-2 border-primary-500 bg-primary-50/50 p-8">
              <div className="mb-1 text-5xl font-black text-primary-950">
                Real-Time
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                Job Updates
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
