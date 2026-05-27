"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILLS = [
  { category: "Languages", items: ["Python", "TypeScript", "C++", "Java"] },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "ROS 2", "PyTorch", "FastAPI"],
  },
  { category: "Tools", items: ["Git", "Docker", "Linux", "Figma"] },
] as const;

const COURSES = [
  "Algorithms & Data Structures",
  "Machine Learning",
  "Computer Vision",
  "Operating Systems",
  "Database Systems",
  "Computer Networks",
] as const;

export default function SkillsSection() {
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
          className="mb-10 block font-mono text-xs font-bold tracking-[0.3em] text-primary-400 uppercase"
        >
          // 02 — skills & education
        </motion.span>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden border border-white/10 p-8 transition-colors hover:border-primary-400/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(41,171,226,0.04) 0%, transparent 60%)",
              }}
            >
              <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-primary-400/50 via-primary-400/20 to-transparent" />

              <span className="mb-1 block font-mono text-xs tracking-[0.2em] text-primary-400/70 uppercase">
                Education
              </span>
              <h3 className="mb-1 text-2xl font-bold text-white">
                UNSW Sydney
              </h3>
              <p className="mb-1 text-base font-medium text-white/70">
                Bachelor of Computer Science
              </p>
              <p className="mb-7 font-mono text-sm text-white/35">
                2024 – 2027 · Sydney, Australia
              </p>

              <span className="mb-3 block font-mono text-xs tracking-[0.15em] text-white/35 uppercase">
                Relevant Courses
              </span>
              <div className="flex flex-wrap gap-2">
                {COURSES.map((course) => (
                  <span
                    key={course}
                    className="border border-white/10 px-2.5 py-1 font-mono text-xs text-white/45"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center space-y-8"
          >
            {SKILLS.map((group) => (
              <div key={group.category}>
                <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-white/35 uppercase">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border border-primary-400/20 bg-primary-500/5 px-3 py-1.5 font-mono text-sm text-primary-400/75 transition-colors hover:border-primary-400/40 hover:bg-primary-500/10 hover:text-primary-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
