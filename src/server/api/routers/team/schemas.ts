import { z } from "zod";

/**
 * Input schema for fetching team data by year
 */
export const getTeamByYearInput = z.object({
  year: z.number().int().min(2000).max(2100),
});

/**
 * Schema for team member
 */
export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  year: z.number(),
  selfie: z.string(),
  email: z.string(),
  linkedin: z.string(),
});

/**
 * Schema for subcommittee portfolio data
 */
export const subcomProfileSchema = z.object({
  portfolio: z.string(),
  members: z.array(z.string()),
});

/**
 * Schema for team structure
 */
export const teamStructureSchema = z.object({
  executives: z.array(teamMemberSchema),
  directors: z.array(teamMemberSchema),
  subcommittees: z.array(subcomProfileSchema),
});

export type GetTeamByYearInput = z.infer<typeof getTeamByYearInput>;
export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;
export type SubcomProfileSchema = z.infer<typeof subcomProfileSchema>;
export type TeamStructureSchema = z.infer<typeof teamStructureSchema>;
