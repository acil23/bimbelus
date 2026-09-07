import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createTutorSchema = z.object({
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

  title: z
    .string()
    .trim()
    .max(100, "Title must be at most 100 characters")
    .nullable()
    .optional(),

  photo_url: z
    .string()
    .trim()
    .url("Photo URL must be a valid URL")
    .nullable()
    .optional(),

  specialization: z
    .string()
    .trim()
    .max(255, "Specialization must be at most 255 characters")
    .nullable()
    .optional(),

  bio: z
    .string()
    .trim()
    .max(10000, "Bio must be at most 10000 characters")
    .nullable()
    .optional(),

  is_active: z.boolean().optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
});

export const updateTutorSchema = createTutorSchema.partial();

export const tutorIdSchema = z.string().uuid("Invalid tutor ID");
