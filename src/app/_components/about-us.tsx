"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LuBookOpenText, LuBuilding2, LuRocket, LuUsers } from "react-icons/lu";

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const stats = [
    { icon: LuUsers, number: "900+", label: "Active Members" },
    { icon: LuBookOpenText, number: "50+", label: "Workshops Annually" },
    { icon: LuBuilding2, number: "20+", label: "Industry Partners" },
    { icon: LuRocket, number: "30+", label: "Annual Events" },
  ];

  const highlights = [
    {
      title: "Hands-On Learning",
      description:
        "We provide hands-on workshops and practical projects, enabling students to bridge the gap between theoretical knowledge and real-world applications.",
      image: "/home/buildathon-workshop.webp",
      alt: "Students working on robotics projects",
    },
    {
      title: "Industry Connections",
      description:
        "Our industry nights create valuable connections between students and leading companies, opening pathways to future career opportunities.",
      image: "/team/hero.webp",
      alt: "Industry networking event",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-32 text-primary-950">
      {/* Faint grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header — huge outlined text as decorative bg element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-24"
        >
          {/* Giant decorative "ABOUT" behind content */}
          <motion.span
            className="pointer-events-none absolute -top-16 -left-4 hidden select-none text-[10rem] font-black leading-none tracking-tighter text-transparent lg:block"
            style={{
              WebkitTextStroke: "1px rgba(51, 102, 255, 0.1)",
              y: bgY,
            }}
          >
            ABOUT
          </motion.span>

          <span className="relative mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
            // 01 — Who We Are
          </span>
          <h2 className="relative mb-6 text-4xl font-bold md:text-5xl lg:text-7xl">
            About Us
          </h2>
          <p className="relative max-w-2xl text-lg leading-relaxed text-neutral-500">
            Building the future of mechatronics engineering through innovation,
            collaboration, and hands-on experience. We&apos;re UNSW&apos;s largest
            mechatronics-related society, dedicated to empowering students with
            practical skills and industry connections.
          </p>
        </motion.div>

        {/* Stats — large numbers, horizontal layout with vertical dividers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                className="group relative border-l border-neutral-200 px-6 py-6 first:border-l-0 lg:px-8"
              >
                <stat.icon
                  size={18}
                  strokeWidth={1.5}
                  className="mb-4 text-primary-500 transition-colors group-hover:text-primary-400"
                />
                <div className="mb-1 text-5xl font-black tracking-tight text-primary-950 md:text-7xl">
                  {stat.number}
                </div>
                <div className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights — stacked, image-heavy, asymmetric */}
        <div className="space-y-32">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Image — full bleed feel */}
              <div
                className={`relative ${
                  index % 2 === 1
                    ? "lg:order-2 lg:col-span-8 lg:col-start-5"
                    : "lg:col-span-8"
                }`}
              >
                <div className="group relative aspect-video overflow-hidden">
                  <Image
                    src={highlight.image}
                    alt={highlight.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {/* Blue overlay on hover */}
                  <div className="absolute inset-0 bg-primary-600/0 transition-colors duration-500 group-hover:bg-primary-600/10" />
                </div>
                {/* Blue accent strip */}
                <div className={`absolute ${index % 2 === 0 ? "-right-3" : "-left-3"} top-6 h-16 w-1 bg-primary-500`} />
              </div>

              {/* Content */}
              <div
                className={
                  index % 2 === 1
                    ? "lg:order-1 lg:col-span-4"
                    : "lg:col-span-4"
                }
              >
                <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
                  0{index + 1}
                </span>
                <h3 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                  {highlight.title}
                </h3>
                <p className="text-base leading-relaxed text-neutral-500">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community statement — full-width blue accent block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-32 border-l-4 border-primary-500 py-10 pl-8 md:pl-12"
        >
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">
            Innovation & Growth Through Community
          </h3>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-500">
            Through competitions, workshops, and social events, we cultivate a
            thriving community where students can develop both technically and
            professionally. Join us in shaping the future of mechatronics
            engineering.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
