import { createTRPCRouter } from "../../trpc";
import { getCareerByIdProcedure, getCareersProcedure } from "./procedures";

/**
 * Careers router for handling career-related queries
 */
export const careersRouter = createTRPCRouter({
  getAll: getCareersProcedure,
  getById: getCareerByIdProcedure,
});
