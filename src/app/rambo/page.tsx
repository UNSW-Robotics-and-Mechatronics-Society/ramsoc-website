"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiArrowRight,
  HiCake,
  HiHeart,
  HiSparkles,
  HiStar,
} from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { label: "Birthday", value: "28th March", icon: HiCake },
  { label: "Height", value: '6ft (true i promise)', icon: HiStar },
  { label: "Star Sign", value: "Aries \u2648", icon: HiSparkles },
  { label: "Species", value: "Robot-Ram Hybrid", icon: HiHeart },
];

const FUN_FACTS = [
  "Rambo's golden horns are made from recycled circuit boards",
  "He's been the official RAMSoc mascot since 2025",
  "That antenna on his head picks up WiFi from 3 buildings away",
  "He's got the RAMSoc logo tattooed on his chest (it's not a sticker, he swears)",
  "His favourite hobby is cheering on Sumobots competitors",
  "He can bench press 2 entire Sumobots arenas",
];

const POSES = [
  { src: "/rambo/rambo-front.png", alt: "Rambo front view", label: "Front View" },
  { src: "/rambo/rambo-wave.png", alt: "Rambo waving", label: "The Wave" },
  { src: "/rambo/rambo-back.png", alt: "Rambo back view", label: "Back View" },
];

export default function RamboPage() {
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  const nextFact = () => {
    setActiveFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030a18]">
      {/* Subtle decorative lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
                // Meet the Mascot
              </span>
              <h1 className="mb-6 text-7xl font-black leading-none text-white md:text-8xl lg:text-9xl">
                RAM
                <span className="text-primary-400">BO</span>
              </h1>
              <div className="mb-8 h-1.5 w-16 bg-primary-400" />
              <p className="mb-10 max-w-md text-base leading-relaxed text-white/60">
                The official mascot of the Robotics and Mechatronics Society at
                UNSW. Half robot, half ram, 100% legend.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-px bg-white/8">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="bg-[#030a18] px-5 py-4"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <stat.icon className="size-3.5 text-primary-400" />
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/30 uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Rambo image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mx-auto h-[400px] w-[400px] md:h-[500px] md:w-[500px]"
            >
              <Image
                src="/rambo/rambo-wave.png"
                alt="Rambo the RAMSoc mascot waving"
                width={500}
                height={500}
                className="size-full object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Character Sheet / Poses ── */}
      <section className="relative z-10 border-t border-white/8 py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              // 01 — Character Sheet
            </span>
            <h2 className="text-5xl font-bold text-white md:text-6xl lg:text-8xl">
              Strike a
              <br />
              <span className="text-primary-400">Pose</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-white/8 md:grid-cols-3">
            {POSES.map((pose, i) => (
              <motion.div
                key={pose.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden bg-[#030a18] p-8 transition-colors hover:bg-white/5"
              >
                <div className="relative mx-auto h-72 w-72">
                  <Image
                    src={pose.src}
                    alt={pose.alt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-6 text-center text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
                  {pose.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          01
        </motion.span>
      </section>

      {/* ── ID Card + Fun Facts ── */}
      <section className="relative z-10 border-t border-white/8 py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* ID card image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="overflow-hidden border border-white/8">
                <Image
                  src="/rambo/rambo-id-card.png"
                  alt="Rambo's official RAMSoc ID card"
                  width={800}
                  height={500}
                  className="w-full"
                />
              </div>
            </motion.div>

            {/* Fun facts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
                // 02 — Did You Know?
              </span>
              <h2 className="mb-10 text-5xl font-bold text-white md:text-6xl lg:text-8xl">
                Fun
                <br />
                <span className="text-primary-400">Facts</span>
              </h2>

              <div className="relative min-h-[120px] border-l-2 border-primary-500 bg-white/5 p-6">
                <p className="text-lg leading-relaxed text-white/70">
                  &ldquo;{FUN_FACTS[activeFactIndex]}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-[0.15em] text-white/20 uppercase">
                    {activeFactIndex + 1} / {FUN_FACTS.length}
                  </span>
                  <button
                    onClick={nextFact}
                    className="group flex items-center gap-2 text-sm font-bold tracking-[0.15em] text-primary-400 uppercase transition-colors hover:text-primary-300"
                  >
                    Next
                    <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Fact dots */}
              <div className="mt-6 flex gap-2">
                {FUN_FACTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFactIndex(i)}
                    className={`h-1 transition-all ${
                      i === activeFactIndex
                        ? "w-8 bg-primary-400"
                        : "w-2 bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          02
        </motion.span>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 border-t border-white/8 py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              // Join Us
            </span>
            <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Want to hang with{" "}
              <span className="text-primary-400">Rambo</span>?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base text-white/40">
              Join RAMSoc and you might just spot him at our next event. He loves
              Sumobots, hackathons, and making new friends.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://campus.hellorubric.com/?s=12676"
                target="_blank"
                className="group inline-flex items-center gap-3 bg-primary-500 px-8 py-3 text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-primary-400"
              >
                <HiArrowRight className="size-4" />
                Join RAMSoc
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 text-xs font-bold tracking-[0.2em] text-white/60 uppercase transition-all hover:border-primary-500/30 hover:text-white"
              >
                See Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
