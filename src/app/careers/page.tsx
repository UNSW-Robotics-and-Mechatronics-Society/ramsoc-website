"use client";

import { useState } from "react";

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

  if (isLoadingCareerMetaDatas || !CareerMetaDatas) {
    return (
      <div className="flex flex-col gap-8">
        <CareerCardLoading />
        <CareerCardLoading />
        <CareerCardLoading />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-xl font-bold">
        {Object.keys(CareerMetaDatas).length} Jobs Found
      </div>

      <div className="flex flex-col gap-8">
        {Object.entries(CareerMetaDatas).map(([id, meta]) => (
          <div key={id} onMouseEnter={() => handlePreloadCareer(id)}>
            <CareerCard onClick={() => setActiveId(id)} {...meta} />
          </div>
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
  );
}
