import { publicProcedure } from "../../trpc";
import { getTeamByYearInput } from "./schemas";
import { getAvailableYears, getTeamByYear } from "./service";

/**
 * Procedure to fetch team data for a specific year
 */
export const getTeamByYearProcedure = publicProcedure
  .input(getTeamByYearInput)
  .query(async ({ input }) => {
    return await getTeamByYear(input.year);
  });

/**
 * Procedure to fetch all available team years
 */
export const getAvailableYearsProcedure = publicProcedure.query(async () => {
  return await getAvailableYears();
});
