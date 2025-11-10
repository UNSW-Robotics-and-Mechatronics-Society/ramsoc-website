import { z } from "zod";

/**
 * Input schema for fetching career details by ID
 */
export const getCareerByIdInput = z.object({
  id: z.string().min(1),
});

/**
 * Schema for career metadata
 */
export const careerMetaDataSchema = z.object({
  id: z.string(),
  logo: z.string(),
  company: z.string().nullable(),
  deadline: z.string().nullable(),
  email: z.string().nullable(),
  position: z.string().nullable(),
  ctaUrl: z.string().nullable(),
  location: z.string().nullable().optional(),
  pay: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  type: z.string().optional(),
  tags: z.array(z.string()),
  hasDetails: z.boolean(),
});

/**
 * Schema for careers response (keyed by ID)
 */
export const careersResponseSchema = z.record(z.string(), careerMetaDataSchema);

export type GetCareerByIdInput = z.infer<typeof getCareerByIdInput>;
export type CareerMetaDataSchema = z.infer<typeof careerMetaDataSchema>;
export type CareersResponseSchema = z.infer<typeof careersResponseSchema>;
