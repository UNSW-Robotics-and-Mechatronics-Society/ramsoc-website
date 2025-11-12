"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    <section className="bg-primary-50/30 py-20">
      <Container className="overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">About Us</h2>
          <p className="text-primary-700 mx-auto max-w-3xl text-lg leading-relaxed">
            Building the future of mechatronics engineering through innovation,
            collaboration, and hands-on experience. We're UNSW's largest
            mechatronics-related society, dedicated to empowering students with
            practical skills and industry connections.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="bg-primary-100/30 group-hover:bg-primary-200/50 absolute inset-0 -z-10 transition-colors duration-300" />
              <div className="bg-primary-100/50 text-primary-600 group-hover:bg-primary-500 mx-auto mb-4 inline-flex rounded-xl p-3 transition-colors duration-300 group-hover:text-white">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <div className="text-primary-900 mb-1 text-4xl font-bold">
                {stat.number}
              </div>
              <div className="text-primary-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights with Images */}
        <div className="space-y-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="group relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={highlight.image}
                    alt={highlight.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="bg-primary-900/20 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" />
                </div>
                {/* Decorative element */}
                <div className="bg-primary-500/10 absolute -right-4 -bottom-4 -z-10 h-32 w-32 rounded-full blur-3xl" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <h3 className="text-primary-900 mb-4 text-3xl font-bold">
                  {highlight.title}
                </h3>
                <p className="text-primary-700 text-lg leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="from-primary-500 to-primary-700 mt-20 rounded-3xl bg-linear-to-br p-8 text-center text-white shadow-2xl md:p-12"
        >
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-4 text-3xl font-bold">
              Innovation & Growth Through Community
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-white/90">
              Through competitions, workshops, and social events, we cultivate a
              thriving community where students can develop both technically and
              professionally. Join us in shaping the future of mechatronics
              engineering.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
