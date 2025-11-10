import { publicProcedure } from "@/server/api/trpc";
import z from "zod";

export const helloProcedure = publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });
