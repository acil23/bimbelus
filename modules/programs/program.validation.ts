import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProgramSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(180, "Slug must be at most 180 characters")
    .regex(
      slugRegex,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  category: z.enum([
    "REGULER",
    "OLIMPIADE",
    "PROGRAM_TAHUNAN",
    "LAINNYA",
  ]),

  description: z
    .string()
    .trim()
    .max(5000, "Description must be at most 5000 characters")
    .nullable()
    .optional(),

  image_url: z
    .string()
    .trim()
    .url("Image URL must be a valid URL")
    .nullable()
    .optional(),

  is_active: z.boolean().optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
});

export const updateProgramSchema = createProgramSchema.partial();

export const programIdSchema = z.string().uuid("Invalid program ID");
