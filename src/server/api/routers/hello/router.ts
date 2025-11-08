import { createTRPCRouter } from "@/server/api/trpc";
import { helloProcedure } from "./procedures";

export const helloRouter = createTRPCRouter({
  hello: helloProcedure,
});
