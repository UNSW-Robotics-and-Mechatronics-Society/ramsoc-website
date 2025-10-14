"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import { useCareerMetaDatas } from "@/hooks/useCareers";

import { CareerCard } from "./_components/CareerCard";
import { CareerCardLoading } from "./_components/CareerCardLoading";
import { CareerDetails } from "./_components/CareerDetails";

export default function CareersPage() {
  const [activeId, setActiveId] = useState<string>();
  const queryClient = useQueryClient();

  const { data: CareerMetaDatas, isLoading: isLoadingCareerMetaDatas } =
    useCareerMetaDatas();

  const handlePreloadCareer = (id: string) => {
    if (CareerMetaDatas?.[id]?.hasDetails) {
      queryClient.prefetchQuery({
        queryKey: ["notion", "page", id],
        queryFn: async () => {
          const res = await axios.get(`/api/notion/page/${id}`);
          return res.data;
        },
        staleTime: 60 * 60 * 1000,
      });
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
