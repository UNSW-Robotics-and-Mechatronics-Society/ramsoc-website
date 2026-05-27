"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    number: "01",
    title: "Autonomous Ground Vehicle",
    description:
      "Built an autonomous ground vehicle for RAMSoc Robotics using ROS 2. Implemented SLAM, obstacle avoidance, and sensor fusion pipelines for real-time navigation.",
    tags: ["ROS 2", "Python", "C++", "OpenCV", "SLAM"],
    link: "#",
  },
  {
    number: "02",
    title: "Neural Path Planner",
    description:
      "Developed a reinforcement learning-based path planning system for robotic manipulation tasks using PyTorch. Trained on procedurally generated environments.",
    tags: ["PyTorch", "Python", "RL", "Robotics"],
    link: "#",
  },
  {
    number: "03",
    title: "RAMSoc Website",
    description:
      "Contributing to the official RAMSoc website — a full-stack Next.js app with tRPC, Contentful CMS integration, and a fully type-safe API layer.",
    tags: ["Next.js", "TypeScript", "tRPC", "Tailwind CSS"],
    link: "https://github.com/Norvan26",
  },
] as const;

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#030a18] py-28 md:py-36"
    >
      <div className="absolute top-0 left-0 h-px w-full bg-white/8" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-2 block font-mono text-xs font-bold tracking-[0.3em] text-primary-400 uppercase"
        >
          // 03 — selected work
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-12 font-mono text-sm text-white/30"
        >
          Projects built at RAMSoc and in personal time.
        </motion.p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.number}
              href={project.link}
              target={project.link !== "#" ? "_blank" : undefined}
              rel={project.link !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden border border-white/10 p-6 transition-all duration-300 hover:border-primary-400/30 hover:shadow-[0_8px_40px_rgba(41,171,226,0.07)]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Animated top line on hover */}
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-primary-400 to-transparent transition-all duration-500 group-hover:w-full" />

              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/20">
                  {project.number}
                </span>
                <span className="font-mono text-sm text-white/20 transition-colors duration-200 group-hover:text-primary-400">
                  ↗
                </span>
              </div>

              <h3 className="mb-3 text-lg font-bold text-white transition-colors duration-200 group-hover:text-primary-400">
                {project.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 px-2 py-0.5 font-mono text-xs text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
