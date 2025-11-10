import type { RouterOutputs } from "@/trpc/react";

export type CareersResponse = RouterOutputs["careers"]["getAll"];
export type Career = NonNullable<CareersResponse[string]>;
export type CareerPage = RouterOutputs["careers"]["getById"];
