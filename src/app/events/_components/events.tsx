"use client";

import { motion } from "framer-motion";

import { CurrentEvents, PastEvents } from "@/features/events";

export default function Events() {
  return (
    <section className="relative overflow-hidden bg-white text-primary-950">
      {/* Decorative vertical lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
      </div>

      {/* Faint grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Upcoming Events Section */}
      <div className="relative py-28 md:py-36">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 01 — Upcoming
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Upcoming
              <br />
              <span className="text-primary-500">Events</span>
            </h2>
          </motion.div>
          <CurrentEvents />
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          01
        </motion.span>
      </div>

      {/* Past Events Section */}
      <div className="relative py-28 md:py-36">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 02 — Past Events
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Past
              <br />
              <span className="text-primary-500">Events</span>
            </h2>
          </motion.div>
          <PastEvents />
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          02
        </motion.span>
      </div>
    </section>
  );
}
