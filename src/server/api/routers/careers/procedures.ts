import { publicProcedure } from "../../trpc";
import { getCareerByIdInput } from "./schemas";
import { getCareerById, getCareers } from "./service";

/**
 * Procedure to fetch all careers
 */
export const getCareersProcedure = publicProcedure.query(async () => {
  return await getCareers();
});

/**
 * Procedure to fetch a specific career page by ID
 */
export const getCareerByIdProcedure = publicProcedure
  .input(getCareerByIdInput)
  .query(async ({ input }) => {
    return await getCareerById(input.id);
  });
