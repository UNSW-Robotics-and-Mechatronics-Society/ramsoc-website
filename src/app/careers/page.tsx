"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  CareerCard,
  CareerCardLoading,
  CareerDetails,
} from "@/features/careers/components";
import { api } from "@/trpc/react";

export default function CareersPage() {
  const [activeId, setActiveId] = useState<string>();
  const utils = api.useUtils();

  const { data: CareerMetaDatas, isLoading: isLoadingCareerMetaDatas } =
    api.careers.getAll.useQuery(undefined, {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    });

  // Lock body scroll when dialog is open
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
        {
          staleTime: 60 * 60 * 1000,
        },
      );
    }
  };

  const jobCount = CareerMetaDatas ? Object.keys(CareerMetaDatas).length : 0;

  return (
    <>
      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 max-w-3xl overflow-hidden"
      >
        <h2 className="mb-4">Career Opportunities</h2>
        <p className="text-primary-700 mb-6 leading-relaxed">
          Explore exciting career opportunities in robotics, mechatronics, and
          engineering. We curate positions from leading companies and startups
          looking for talented individuals passionate about innovation and
          technology.
        </p>
        <div className="bg-primary-50 border-primary-200 rounded-lg border p-4">
          <p className="text-primary-900 text-lg font-semibold">
            {jobCount} {jobCount === 1 ? "Position" : "Positions"} Available
          </p>
        </div>
      </motion.div>

      {isLoadingCareerMetaDatas || !CareerMetaDatas ? (
        <div className="flex flex-col gap-8">
          <CareerCardLoading />
          <CareerCardLoading />
          <CareerCardLoading />
        </div>
      ) : (
        <>
          {/* Job Listings */}
          <div className="flex flex-col gap-8 overflow-hidden">
            {Object.entries(CareerMetaDatas).map(([id, meta], idx) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => handlePreloadCareer(id)}
              >
                <CareerCard career={meta} onClick={() => setActiveId(id)} />
              </motion.div>
            ))}
          </div>
          {/* Overlay for career details */}
          {activeId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
                <CareerDetails
                  activeId={activeId}
                  careerMeta={CareerMetaDatas[activeId]}
                  onBack={() => setActiveId(undefined)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
