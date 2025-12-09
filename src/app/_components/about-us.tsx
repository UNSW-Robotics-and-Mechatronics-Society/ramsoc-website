// FILE: src/app/_components/about-us.tsx
"use client";

import { motion } from "framer-motion";
import { LuBookOpenText, LuBuilding2, LuRocket, LuUsers } from "react-icons/lu";

import { Container } from "@/components/ui/container";

export default function AboutUs() {
  const stats = [
    {
      icon: LuUsers,
      number: "900+",
      label: "Active Members",
    },
    {
      icon: LuBookOpenText,
      number: "50+",
      label: "Workshops Annually",
    },
    {
      icon: LuBuilding2,
      number: "20+",
      label: "Industry Partners",
    },
    {
      icon: LuRocket,
      number: "30+",
      label: "Annual Events",
    },
  ];

  const pillars = [
    {
      icon: LuBookOpenText,
      title: "Hands-On Learning",
      description:
        "We provide hands-on workshops and practical projects, enabling students to bridge the gap between theoretical knowledge and real-world applications.",
    },
    {
      icon: LuBuilding2,
      title: "Industry Connections",
      description:
        "Our industry nights create valuable connections between students and leading companies, opening pathways to future career opportunities.",
    },
    {
      icon: LuRocket,
      title: "Innovation & Community",
      description:
        "Through competitions, workshops, and social events, we cultivate a thriving community where students develop both technically and professionally.",
    },
  ];

  return (
    <section className="bg-white py-16 border-b border-[#d4d4d4]">
      <Container className="overflow-hidden">
        {/* Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-black mb-4 text-2xl font-normal font-mono uppercase tracking-tight border-b-4 border-[#1076eb] pb-2 inline-block">
            About Us
          </h2>
          <p className="text-black text-sm leading-relaxed font-mono mt-4">
            Building the future of mechatronics engineering through innovation,
            collaboration, and hands-on experience. We're UNSW's largest
            mechatronics-related society, dedicated to empowering students with
            practical skills and industry connections.
          </p>
        </motion.div>

        {/* Stats - Grid format centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#d4d4d4]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center justify-center py-8 px-4 border-r border-b border-[#d4d4d4] hover:bg-[#f5f5f5] transition-none last:border-r-0 md:[&:nth-child(4)]:border-r-0 [&:nth-child(3)]:border-r-0 md:[&:nth-child(3)]:border-r [&:nth-child(n+3)]:border-b-0"
            >
              <stat.icon size={24} strokeWidth={1.5} className="text-[#1076eb] mb-3" />
              <span className="text-2xl font-mono text-[#1076eb] mb-1">
                {stat.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-tight text-[#999999]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h3 className="text-black text-xl font-normal font-mono uppercase tracking-tight border-b-4 border-[#1076eb] pb-2 inline-block">
            Our Three Pillars
          </h3>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#d4d4d4]">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="border-r border-[#d4d4d4] last:border-r-0 py-8 px-6 hover:bg-[#f5f5f5] transition-none text-center"
            >
              <pillar.icon size={28} strokeWidth={1.5} className="text-[#1076eb] mx-auto mb-4" />
              <h4 className="text-black mb-3 text-sm font-normal font-mono uppercase tracking-tight">
                {pillar.title}
              </h4>
              <p className="text-[#999999] text-xs leading-relaxed font-mono">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
