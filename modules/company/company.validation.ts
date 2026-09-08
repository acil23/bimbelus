import { z } from "zod";

export const createCompanyProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),

  tagline: z
    .string()
    .trim()
    .max(255, "Tagline must be at most 255 characters")
    .nullable()
    .optional(),

  description: z
    .string()
    .trim()
    .max(10000, "Description must be at most 10000 characters")
    .nullable()
    .optional(),

  history: z
    .string()
    .trim()
    .max(10000, "History must be at most 10000 characters")
    .nullable()
    .optional(),

  vision: z
    .string()
    .trim()
    .max(5000, "Vision must be at most 5000 characters")
    .nullable()
    .optional(),

  mission: z
    .string()
    .trim()
    .max(10000, "Mission must be at most 10000 characters")
    .nullable()
    .optional(),

  logo_url: z
    .string()
    .trim()
    .max(2048, "Logo URL must be at most 2048 characters")
    .nullable()
    .optional(),
});

export const updateCompanyProfileSchema =
  createCompanyProfileSchema.partial();
