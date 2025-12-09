"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BUILDATHON_URL, SUMOBOTS_URL } from "@/lib/constants";
import { FaArrowRight } from "react-icons/fa6";

interface EventCardProps {
  name: string;
  imageSrc: string;
  url: string;
  description: string;
  details: string[];
}

const FlagshipEventCard = ({
  name,
  imageSrc,
  url,
  description,
  details,
}: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-b border-[#d4d4d4] py-8 hover:bg-[#f5f5f5] transition-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image */}
        <div className="relative h-64 lg:h-80 border border-[#d4d4d4] overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            priority
            quality={85}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-normal font-mono uppercase tracking-tight text-black border-l-4 border-[#1076eb] pl-4">
            {name}
          </h3>

          <p className="text-xs leading-relaxed text-black font-mono pl-5">
            {description}
          </p>

          {/* Details list */}
          <div className="pl-5 border-t border-[#d4d4d4] pt-4 mt-2">
            {details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-2 border-b border-[#d4d4d4] last:border-b-0"
              >
                <span className="text-[#1076eb] text-xs font-mono mt-0.5">→</span>
                <span className="text-xs font-mono text-[#999999] flex-1">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          <div className="pl-5 mt-2">
            <Button asChild variant="outline" size="sm">
              <a href={url} target="_blank" rel="noopener noreferrer" className="gap-2">
                Learn More <FaArrowRight className="size-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FlagshipEvents = () => {
  return (
    <section className="bg-white py-16 border-b border-[#d4d4d4]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-black mb-4 text-2xl font-normal font-mono uppercase tracking-tight border-b-4 border-[#1076eb] pb-2 inline-block">
            Flagship Events
          </h2>
          <p className="text-black text-sm leading-relaxed font-mono mt-4 max-w-3xl mx-auto">
            Our signature annual competitions that challenge students to push the boundaries
            of robotics and engineering innovation.
          </p>
        </motion.div>

        {/* Events */}
        <div className="border-t border-[#d4d4d4]">
          <FlagshipEventCard
            name="Sumobots"
            imageSrc="/home/sumobots-finals.webp"
            url={SUMOBOTS_URL}
            description="An autonomous robot combat competition where custom-built bots battle to push opponents out of the ring. Competitors design, build, and program their robots from scratch."
            details={[
              "Design autonomous robots with edge detection and opponent tracking",
              "Build custom mechanical systems optimized for pushing power",
              "Program intelligent competition strategies and behaviors",
              "Compete in knockout-style tournament brackets",
              "Win prizes and recognition for engineering excellence"
            ]}
          />
          <FlagshipEventCard
            name="Buildathon"
            imageSrc="/home/buildathon-finals.webp"
            url={BUILDATHON_URL}
            description="A rapid prototyping challenge where teams tackle real-world engineering problems under time constraints. Teams pitch and build creative solutions judged on innovation and feasibility."
            details={[
              "Solve industry-relevant engineering challenges",
              "Collaborate in cross-functional teams",
              "Rapid prototype hardware and software solutions",
              "Present to judges from leading tech companies",
              "Network with industry partners and mentors"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FlagshipEvents;
