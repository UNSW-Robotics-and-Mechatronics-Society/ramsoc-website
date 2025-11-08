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

// Type exports derived from tRPC responses
export type TeamByYearQueryResult = ReturnType<typeof useTeamByYear>;
export type TeamStructure = NonNullable<TeamByYearQueryResult["data"]>;
export type TeamMember = NonNullable<TeamStructure["executives"]>[number];
export type SubcomProfileData = NonNullable<
  TeamStructure["subcommittees"]
>[number];

export type AvailableYearsQueryResult = ReturnType<
  typeof useAvailableTeamYears
>;
export type AvailableYears = NonNullable<AvailableYearsQueryResult["data"]>;
