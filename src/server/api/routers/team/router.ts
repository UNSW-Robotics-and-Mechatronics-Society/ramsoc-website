import { createTRPCRouter } from "../../trpc";
import {
  getAvailableYearsProcedure,
  getTeamByYearProcedure,
} from "./procedures";

/**
 * Team router for handling team-related queries
 */
export const teamRouter = createTRPCRouter({
  getByYear: getTeamByYearProcedure,
  getAvailableYears: getAvailableYearsProcedure,
});
