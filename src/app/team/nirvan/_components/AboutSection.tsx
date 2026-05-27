"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { label: "University", value: "UNSW Sydney" },
  { label: "Degree", value: "B. Computer Sci." },
  { label: "Year", value: "2nd Year" },
  { label: "Focus", value: "Robotics & AI" },
] as const;

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#030a18] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary-400 mb-10 block font-mono text-xs font-bold tracking-[0.3em] uppercase"
        >
          // 01 — about
        </motion.span>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Building systems,
              <br />
              <span className="text-primary-400">solving problems.</span>
            </h2>
            <p className="mb-5 text-base leading-relaxed text-white/60">
              I&apos;m a second-year EE and CS student at UNSW, deeply
              interested in robotics and artificial intelligence. I love
              building things from the ground up — autonomous systems, machine
              learning pipelines, or full-stack web applications.
            </p>
            <p className="text-base leading-relaxed text-white/60">
              Outside the lab, you&apos;ll find me hiking trails around Sydney,
              getting lost in story-driven games, or picking up a new
              programming language just to see how it works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="self-center"
          >
            <div className="grid grid-cols-2 gap-px bg-white/8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#030a18] p-6 transition-colors duration-200 hover:bg-white/4"
                >
                  <span className="mb-1 block font-mono text-xs tracking-[0.2em] text-white/35 uppercase">
                    {stat.label}
                  </span>
                  <span className="block text-xl font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-6">
              <a
                href="https://github.com/Norvan26"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 font-mono text-xs tracking-[0.2em] text-white/40 uppercase transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:nirvan.pulakhandam@gmail.com"
                className="hover:text-primary-400 font-mono text-xs tracking-[0.2em] text-white/40 uppercase transition-colors"
              >
                Email ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
