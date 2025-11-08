"use client";

import { api } from "@/trpc/react";

/**
 * Custom hook for fetching careers data
 */
export const useCareers = () => {
  return api.careers.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export type CareersQueryResult = ReturnType<typeof useCareers>;
export type Careers = NonNullable<CareersQueryResult["data"]>;
export type Career = NonNullable<Careers>[string];
