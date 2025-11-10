import { z } from "zod";

export const getInfiniteEventsInput = z.object({
  cursor: z.string().optional(),
});

export type GetInfiniteEventsInput = z.infer<typeof getInfiniteEventsInput>;
