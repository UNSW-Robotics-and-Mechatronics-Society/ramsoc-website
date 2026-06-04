"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";

import { BUILDATHON_URL, SUMOBOTS_URL } from "@/lib/constants";

const flagshipEvents = [
  {
    name: "Sumobots",
    index: "01",
    imageSrc: "/home/sumobots-finals.webp",
    url: SUMOBOTS_URL,
    description:
      "Sumobots is a competition where robots are designed to push each other out of a ring. The robots are autonomous and must be able to detect the edge of the ring and the opponent.",
    tagline: "Build. Battle. Dominate.",
  },
  {
    name: "Buildathon",
    index: "02",
    imageSrc: "/home/buildathon-finals.webp",
    url: BUILDATHON_URL,
    description:
      "Buildathon is a competition where teams are given a problem statement and are required to build a solution within a limited time frame. The teams are judged based on the creativity, feasibility, and scalability of their solution.",
    tagline: "Ideate. Create. Innovate.",
  },
];

function FlagshipCard({
  event,
  reversed,
}: {
  event: (typeof flagshipEvents)[number];
  reversed?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-stretch gap-0 xl:grid-cols-12 ${reversed ? "direction-rtl" : ""}`}
      style={{ direction: "ltr" }}
    >
      {/* Image panel */}
      <div
        className={`group relative overflow-hidden ${
          reversed ? "xl:order-2 xl:col-span-7 xl:col-start-6" : "xl:col-span-7"
        }`}
      >
        <Link
          href={event.url}
          target="_blank"
          className="relative block aspect-4/3 overflow-hidden xl:aspect-auto xl:h-full xl:min-h-[500px]"
        >
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src={event.imageSrc}
              alt={event.name}
              fill
              className="scale-[1.15] object-cover transition-transform duration-700 group-hover:scale-[1.2]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              quality={85}
            />
          </motion.div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-[#030a18] via-transparent to-transparent opacity-80" />
          <div
            className={`absolute inset-0 bg-linear-to-r ${reversed ? "from-transparent to-[#030a18]/70" : "from-[#030a18]/70 to-transparent"}`}
          />

          {/* Hover CTA */}
          <div className="bg-primary-500/0 group-hover:bg-primary-500/10 absolute inset-0 flex items-center justify-center transition-colors duration-500">
            <motion.div className="flex items-center gap-3 border border-white/0 px-6 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase opacity-0 backdrop-blur-none transition-all duration-500 group-hover:border-white/30 group-hover:opacity-100 group-hover:backdrop-blur-sm">
              Explore
              <HiArrowRight className="size-4" />
            </motion.div>
          </div>

          {/* Index number on image */}
          <span className="absolute right-6 bottom-6 text-8xl leading-none font-black text-white/5 lg:text-[10rem]">
            {event.index}
          </span>
        </Link>
      </div>

      {/* Content panel */}
      <div
        className={`relative flex flex-col justify-center overflow-hidden px-6 py-12 md:px-12 xl:py-20 ${
          reversed
            ? "xl:order-1 xl:col-span-5 xl:pr-16 xl:pl-0"
            : "xl:col-span-5 xl:pr-0 xl:pl-16"
        }`}
      >
        {/* Vertical accent line */}
        <div
          className={`absolute top-0 hidden h-full w-px bg-white/8 xl:block ${
            reversed ? "right-0" : "left-0"
          }`}
        />

        <span className="text-primary-400/60 mb-6 text-[0.6rem] font-bold tracking-[0.4em] uppercase">
          Flagship Event {event.index}
        </span>

        <h3 className="mb-2 text-6xl leading-[0.85] font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
          {event.name.toUpperCase()}
        </h3>

        <p className="text-primary-400 mb-8 text-xs font-bold tracking-[0.3em] uppercase">
          {event.tagline}
        </p>

        <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/40">
          {event.description}
        </p>

        <Link
          href={event.url}
          target="_blank"
          className="group/link hover:text-primary-400 inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors"
        >
          <span className="bg-primary-500 group-hover/link:bg-primary-400 flex size-12 items-center justify-center transition-colors">
            <HiArrowRight className="size-5 transition-transform group-hover/link:translate-x-0.5" />
          </span>
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}

export default function FlagshipEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#030a18] text-white"
    >
      {/* Top divider — scrolling text marquee */}
      <div className="border-primary-500/20 bg-primary-500 relative overflow-hidden border-y py-4">
        <motion.div className="flex whitespace-nowrap" style={{ x: marqueeX }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 text-3xl font-black tracking-tight text-white/90 italic md:text-4xl"
            >
              FLAGSHIP EVENTS
            </span>
          ))}
        </motion.div>
      </div>

      {/* Section header */}
      <div className="relative mx-auto max-w-[1400px] px-6 pt-24 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-primary-400 mb-4 block text-xs font-bold tracking-[0.3em] uppercase">
            // The Main Events
          </span>
          <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
            Our
            <br />
            <span className="text-primary-400">Flagships</span>
          </h2>
        </motion.div>
      </div>

      {/* Event cards — staggered editorial layout */}
      <div className="relative mx-auto max-w-[1400px] space-y-0">
        {flagshipEvents.map((event, index) => (
          <FlagshipCard
            key={event.name}
            event={event}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* Bottom divider — scrolling text marquee (reverse) */}
      <div className="border-primary-500/20 bg-primary-500 relative overflow-hidden border-y py-4">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 text-3xl font-black tracking-tight text-white/90 italic md:text-4xl"
            >
              FLAGSHIP EVENTS
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
