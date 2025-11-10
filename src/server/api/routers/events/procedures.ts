import { publicProcedure } from "@/server/api/trpc";

import { getInfiniteEventsInput } from "./schemas";
import { getInfiniteEvents } from "./service";

export const getInfiniteProcedure = publicProcedure
  .input(getInfiniteEventsInput)
  .query(async ({ input }) => {
    return await getInfiniteEvents(input);
  });
