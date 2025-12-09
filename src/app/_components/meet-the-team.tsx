"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import { Button } from "@/components/ui/button";

export default function MeetTheTeam() {
  return (
    <section className="bg-white py-16 border-b border-[#d4d4d4]">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-black mb-4 text-2xl font-normal font-mono uppercase tracking-tight border-b-4 border-[#1076eb] pb-2 inline-block">
            Meet Our 2025 Team
          </h2>
          <p className="text-black text-sm leading-relaxed font-mono mt-4 max-w-2xl mx-auto">
            Our passionate team of students dedicated to creating amazing
            experiences for the mechatronics community at UNSW.
          </p>
        </motion.div>

        {/* Image - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 md:h-[500px] border-2 border-[#d4d4d4] overflow-hidden mb-8"
        >
          <Image
            className="size-full object-cover"
            src="/home/team.webp"
            width={1200}
            height={600}
            priority
            alt="Our team members"
          />
        </motion.div>

        {/* Info Grid - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#d4d4d4] mb-8"
        >
          <div className="flex flex-col items-center justify-center py-6 px-4 border-r border-b md:border-b-0 border-[#d4d4d4] text-center">
            <span className="text-xs font-mono uppercase tracking-tight text-[#999999] mb-2">
              Executive Team
            </span>
            <span className="text-xs font-mono text-black">
              Driving society vision and operations
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-6 px-4 border-r border-b md:border-b-0 border-[#d4d4d4] text-center">
            <span className="text-xs font-mono uppercase tracking-tight text-[#999999] mb-2">
              Directors
            </span>
            <span className="text-xs font-mono text-black">
              Managing events, workshops, and partnerships
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            <span className="text-xs font-mono uppercase tracking-tight text-[#999999] mb-2">
              Subcommittee
            </span>
            <span className="text-xs font-mono text-black">
              Supporting day-to-day activities
            </span>
          </div>
        </motion.div>

        {/* Button - Centered */}
        <div className="text-center">
          <Button asChild variant="outline" size="default">
            <Link href="/team" className="gap-2">
              View Full Team <HiArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
