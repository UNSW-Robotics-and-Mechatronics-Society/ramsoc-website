"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function MeetTheTeam() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0">
        <Image
          className="size-full object-cover"
          src="/home/team.webp"
          width={1920}
          height={700}
          priority
          alt="Our team members"
        />
        <div className="from-primary-950/90 to-primary-900/90 absolute inset-0 bg-linear-to-br" />
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <Container className="relative z-10 overflow-hidden">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-block py-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-primary-400/20 text-primary-200 rounded-full px-4 py-2 text-sm font-semibold tracking-wider">
              THE PEOPLE BEHIND RAMSOC
            </span>
          </motion.div>

          <h2 className="text-primary-50 mb-6">Meet Our 2025 Team!</h2>
          <p className="text-primary-200 mb-10 text-lg leading-relaxed">
            Our passionate team of students dedicated to creating amazing
            experiences for the mechatronics community at UNSW
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary-500 hover:bg-primary-400 hover:shadow-primary-500/30 px-8 py-6 text-base font-semibold shadow-2xl transition-all hover:shadow-2xl"
            >
              <Link href="/team">
                Learn More
                <HiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
