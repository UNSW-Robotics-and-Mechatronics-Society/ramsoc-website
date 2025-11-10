import type { RouterOutputs } from "@/trpc/react";

export type TeamStructure = RouterOutputs["team"]["getByYear"];
export type TeamMember = TeamStructure["executives"][number];
export type SubcomProfile = TeamStructure["subcommittees"][number];
export type AvailableYears = RouterOutputs["team"]["getAvailableYears"];
