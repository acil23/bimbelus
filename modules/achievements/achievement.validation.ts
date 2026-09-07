import { z } from "zod";

const yearSchema = z
  .number()
  .int("Year must be an integer")
  .min(1900, "Year must be at least 1900")
  .max(2100, "Year must be at most 2100");

export const createAchievementSchema = z.object({
  student_name: z
    .string()
    .trim()
    .min(1, "Student name is required")
    .max(150, "Student name must be at most 150 characters"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),

  description: z
    .string()
    .trim()
    .max(10000, "Description must be at most 10000 characters")
    .nullable()
    .optional(),

  student_school: z
    .string()
    .trim()
    .max(255, "Student school must be at most 255 characters")
    .nullable()
    .optional(),

  destination: z
    .string()
    .trim()
    .max(255, "Destination must be at most 255 characters")
    .nullable()
    .optional(),

  subject: z
    .string()
    .trim()
    .max(150, "Subject must be at most 150 characters")
    .nullable()
    .optional(),

  competition_name: z
    .string()
    .trim()
    .max(255, "Competition name must be at most 255 characters")
    .nullable()
    .optional(),

  competition_level: z
    .string()
    .trim()
    .max(150, "Competition level must be at most 150 characters")
    .nullable()
    .optional(),

  achievement_type: z.enum([
    "COMPETITION",
    "ADMISSION",
    "ACADEMIC",
    "OTHER",
  ]),

  year: yearSchema.nullable().optional(),

  image_url: z
    .string()
    .trim()
    .url("Image URL must be a valid URL")
    .nullable()
    .optional(),

  is_featured: z.boolean().optional(),

  is_active: z.boolean().optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
});

export const updateAchievementSchema =
  createAchievementSchema.partial();

export const achievementIdSchema = z
  .string()
  .uuid("Invalid achievement ID");
