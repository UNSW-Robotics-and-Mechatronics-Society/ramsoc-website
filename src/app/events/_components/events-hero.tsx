"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function EventsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-primary-950"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 -z-0" style={{ scale }}>
        <Image
          src="/events/hero.webp"
          alt="Collage of events at RAMSoc"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-primary-700/50" />
      <div className="absolute inset-0 bg-primary-950/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-white to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:px-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase"
        >
          // Events
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="text-7xl font-bold text-white md:text-8xl lg:text-9xl"
        >
          Our
          <br />
          <span className="text-primary-400">Events</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.35 }}
          className="my-6 h-1.5 w-16 origin-left bg-primary-400"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="max-w-md text-base leading-relaxed text-white/60"
        >
          Workshops, competitions, and networking opportunities throughout the
          year.
        </motion.p>
      </div>
    </section>
  );
}
