import { createTRPCRouter } from "@/server/api/trpc";

import { getInfiniteProcedure } from "./procedures";

export const eventsRouter = createTRPCRouter({
  getInfinite: getInfiniteProcedure,
});
