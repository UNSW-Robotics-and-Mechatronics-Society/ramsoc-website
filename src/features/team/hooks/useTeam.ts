"use client";

import { api } from "@/trpc/react";

/**
 * Custom hook for fetching team data by year
 */
export const useTeamByYear = (year: number) => {
  return api.team.getByYear.useQuery(
    { year },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: 2,
    },
  );
};

/**
 * Custom hook for fetching available team years
 */
export const useAvailableTeamYears = () => {
  return api.team.getAvailableYears.useQuery(undefined, {
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
};
