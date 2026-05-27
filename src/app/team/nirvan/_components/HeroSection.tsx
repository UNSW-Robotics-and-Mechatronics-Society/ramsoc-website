"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PHRASES = ["software engineer", "electrical engineer"] as const;
const TYPE_MS = 80;
const DELETE_MS = 45;
const PAUSE_FULL = 2200;
const PAUSE_EMPTY = 350;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx] ?? "";

    if (!deleting && typed === phrase) {
      const t = setTimeout(() => setDeleting(true), PAUSE_FULL);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
      }, PAUSE_EMPTY);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () =>
        setTyped(
          deleting
            ? typed.slice(0, -1)
            : phrase.slice(0, typed.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [typed, deleting, phraseIdx]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#030a18]">
      <style>{`@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }`}</style>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(41,171,226,0.18) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 20% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Large glow — left side behind name */}
      <div
        className="pointer-events-none absolute top-0 -left-20 h-full w-[55%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 55%, rgba(41,171,226,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating orb 1 */}
      <motion.div
        className="pointer-events-none absolute top-[15%] right-[8%] h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(41,171,226,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />

      {/* Floating orb 2 */}
      <motion.div
        className="pointer-events-none absolute bottom-[8%] left-[2%] h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(76,198,237,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Label + cursor */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center gap-2"
          >
            <span className="text-primary-400 font-mono text-xs font-bold tracking-[0.3em] uppercase">
              // {typed}
            </span>
            <span
              className="bg-primary-400 inline-block h-3.5 w-0.5"
              style={{ animation: "blink 1.2s step-end infinite" }}
            />
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1
              className="leading-[0.88] font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
            >
              NIRVAN
            </h1>
            <h2
              className="text-primary-400 leading-none font-bold tracking-tighter"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
            >
              PULAKHANDAM
            </h2>
          </motion.div>

          {/* Accent line */}
          <motion.div
            variants={fadeUp}
            className="bg-primary-400 mb-8 h-px w-20"
          />

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-lg text-base leading-relaxed text-white/55"
          >
            Electrical Engineering and Computer Science student at UNSW Sydney ·
            Exploring the intersection of robotics, AI, and full-stack
            engineering.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Norvan26"
              target="_blank"
              rel="noopener noreferrer"
              className="border-primary-400/40 bg-primary-500/10 text-primary-400 hover:border-primary-400 hover:bg-primary-500/20 inline-flex items-center gap-2 border px-6 py-3 font-mono text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:shadow-[0_0_24px_rgba(41,171,226,0.15)]"
            >
              GitHub ↗
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 font-mono text-sm font-semibold tracking-[0.1em] text-white/45 uppercase transition-all hover:border-white/20 hover:text-white/70"
            >
              About Me ↓
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="to-primary-400/35 h-12 w-px bg-gradient-to-b from-transparent" />
          <div className="bg-primary-400/35 h-1 w-1 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
