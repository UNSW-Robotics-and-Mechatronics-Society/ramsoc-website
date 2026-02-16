"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  CareerCard,
  CareerCardLoading,
  CareerDetails,
} from "@/features/careers/components";
import { api } from "@/trpc/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareersPage() {
  const [activeId, setActiveId] = useState<string>();
  const utils = api.useUtils();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const { data: CareerMetaDatas, isLoading: isLoadingCareerMetaDatas } =
    api.careers.getAll.useQuery(undefined, {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    });

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeId]);

  const handlePreloadCareer = (id: string) => {
    if (CareerMetaDatas?.[id]?.hasDetails) {
      void utils.careers.getById.prefetch(
        { id },
        { staleTime: 60 * 60 * 1000 },
      );
    }
  };

  const jobCount = CareerMetaDatas ? Object.keys(CareerMetaDatas).length : 0;

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-center overflow-hidden bg-primary-950"
      >
        <motion.div className="absolute inset-0 -z-0" style={{ scale: heroScale }}>
          <Image
            src="/careers/hero.webp"
            alt="Collage of careers at RAMSoc"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-primary-700/50" />
        <div className="absolute inset-0 bg-primary-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:px-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase"
          >
            // Opportunities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-7xl font-bold text-white md:text-8xl lg:text-9xl"
          >
            Career
            <br />
            <span className="text-primary-400">Board</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.35 }}
            className="my-6 h-1.5 w-16 origin-left bg-primary-400"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.45 }}
            className="max-w-md text-base leading-relaxed text-white/60"
          >
            Explore exciting career opportunities in robotics, mechatronics, and
            engineering from leading companies and startups.
          </motion.p>
        </div>
      </section>

      {/* ── Job Listings ── */}
      <section className="relative overflow-hidden bg-[#030a18] py-28 text-white md:py-36">
        {/* Decorative lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              // 01 — Open Positions
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Available
              <br />
              <span className="text-primary-400">Roles</span>
            </h2>
            <div className="mt-6 border-l-2 border-primary-500 pl-5">
              <span className="text-3xl font-black text-white">
                {jobCount}
              </span>
              <span className="ml-2 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                {jobCount === 1 ? "Position" : "Positions"} Available
              </span>
            </div>
          </motion.div>

          {isLoadingCareerMetaDatas || !CareerMetaDatas ? (
            <div className="flex flex-col gap-6">
              <CareerCardLoading />
              <CareerCardLoading />
              <CareerCardLoading />
            </div>
          ) : Object.keys(CareerMetaDatas).length === 0 ? (
            <div className="border border-white/10 px-8 py-16 text-center">
              <p className="text-sm tracking-wider text-white/30 uppercase">
                No positions available at this time
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(CareerMetaDatas).map(([id, meta], idx) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseEnter={() => handlePreloadCareer(id)}
                >
                  <CareerCard career={meta} onClick={() => setActiveId(id)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          01
        </motion.span>
      </section>

      {/* Career details overlay */}
      {activeId && CareerMetaDatas && (
        <CareerDetails
          activeId={activeId}
          careerMeta={CareerMetaDatas[activeId]}
          onBack={() => setActiveId(undefined)}
        />
      )}
    </>
  );
}
