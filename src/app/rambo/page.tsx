"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiCake,
  HiHeart,
  HiSparkles,
  HiStar,
  HiArrowRight,
} from "react-icons/hi2";

const STATS = [
  { label: "Birthday", value: "28th March", icon: HiCake },
  { label: "Height", value: '6ft (true i promise)', icon: HiStar },
  { label: "Star Sign", value: "Aries ♈", icon: HiSparkles },
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

function FloatingImage({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="size-full object-contain drop-shadow-2xl"
        priority
      />
    </motion.div>
  );
}

export default function RamboPage() {
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  const nextFact = () => {
    setActiveFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-primary-950 via-primary-900 to-primary-950 pt-28">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-500/10 blur-3xl" />
        <div
          className="absolute right-1/3 top-1/2 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl"
          style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite 0.5s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pb-20 pt-12 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-4 inline-block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
                Meet the Mascot
              </span>
              <h1 className="mb-6 text-7xl font-black leading-none text-white md:text-8xl lg:text-9xl">
                RAM
                <span className="bg-linear-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                  BO
                </span>
              </h1>
              <p className="mb-8 max-w-md text-lg leading-relaxed text-primary-200/70">
                The official mascot of the Robotics and Mechatronics Society at
                UNSW. Half robot, half ram, 100% legend.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="rounded-xl border border-primary-500/20 bg-white/5 px-4 py-3 backdrop-blur-sm"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <stat.icon className="size-4 text-primary-400" />
                      <span className="text-[0.65rem] font-semibold tracking-[0.15em] text-primary-300/60 uppercase">
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
            <FloatingImage
              src="/rambo/rambo-wave.png"
              alt="Rambo the RAMSoc mascot waving"
              className="relative mx-auto h-[400px] w-[400px] md:h-[500px] md:w-[500px]"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Gallery / Poses Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              Character Sheet
            </span>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              Strike a Pose
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Front view */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="group relative overflow-hidden rounded-2xl border border-primary-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-primary-400/40 hover:bg-white/10"
            >
              <div className="relative mx-auto h-72 w-72">
                <Image
                  src="/rambo/rambo-front.png"
                  alt="Rambo front view"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold tracking-wider text-primary-300 uppercase">
                Front View
              </p>
            </motion.div>

            {/* Wave pose */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-primary-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-primary-400/40 hover:bg-white/10"
            >
              <div className="relative mx-auto h-72 w-72">
                <Image
                  src="/rambo/rambo-wave.png"
                  alt="Rambo waving"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold tracking-wider text-primary-300 uppercase">
                The Wave
              </p>
            </motion.div>

            {/* Back view */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-primary-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-primary-400/40 hover:bg-white/10"
            >
              <div className="relative mx-auto h-72 w-72">
                <Image
                  src="/rambo/rambo-back.png"
                  alt="Rambo back view"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold tracking-wider text-primary-300 uppercase">
                Back View
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ID Card Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* ID card image */}
            <motion.div
              initial={{ opacity: 0, rotate: -3 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-primary-500/20">
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
                Did You Know?
              </span>
              <h2 className="mb-8 text-4xl font-black text-white md:text-5xl">
                Fun Facts
              </h2>

              <div className="relative min-h-[120px] rounded-xl border border-primary-500/20 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-lg leading-relaxed text-primary-100/80">
                  &ldquo;{FUN_FACTS[activeFactIndex]}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-primary-400/50">
                    {activeFactIndex + 1} / {FUN_FACTS.length}
                  </span>
                  <button
                    onClick={nextFact}
                    className="group flex items-center gap-2 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300"
                  >
                    Next fact
                    <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Fact dots */}
              <div className="mt-4 flex gap-2">
                {FUN_FACTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFactIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeFactIndex
                        ? "w-6 bg-primary-400"
                        : "w-1.5 bg-primary-600/50 hover:bg-primary-500/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              Want to hang with Rambo?
            </h2>
            <p className="mb-8 text-primary-200/60">
              Join RAMSoc and you might just spot him at our next event. He loves
              Sumobots, hackathons, and making new friends.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://campus.hellorubric.com/?s=12676"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-primary-500 to-cyan-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl hover:shadow-primary-500/40"
              >
                Join RAMSoc
                <HiArrowRight className="size-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-500/30 px-8 py-3 text-sm font-bold text-primary-200 transition-all hover:border-primary-400/50 hover:bg-white/5"
              >
                See Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative bottom element */}
      <motion.span
        className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        🐏
      </motion.span>
    </main>
  );
}
