import { z } from "zod";

const yearSchema = z
  .number()
  .int("Year must be an integer")
  .min(1900, "Year must be at least 1900")
  .max(2100, "Year must be at most 2100");

const experienceFields = {
  organization: z
    .string()
    .trim()
    .min(1, "Organization is required")
    .max(255, "Organization must be at most 255 characters"),

  position: z
    .string()
    .trim()
    .max(150, "Position must be at most 150 characters")
    .nullable()
    .optional(),

  start_year: yearSchema.nullable().optional(),

  end_year: yearSchema.nullable().optional(),

  description: z
    .string()
    .trim()
    .max(5000, "Description must be at most 5000 characters")
    .nullable()
    .optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
};

const validateYearRange = (
  data: {
    start_year?: number | null;
    end_year?: number | null;
  },
  ctx: z.RefinementCtx,
) => {
  if (
    data.start_year != null &&
    data.end_year != null &&
    data.end_year < data.start_year
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End year must be greater than or equal to start year",
      path: ["end_year"],
    });
  }
};

export const createExperienceSchema = z
  .object(experienceFields)
  .superRefine(validateYearRange);

export const updateExperienceSchema = z
  .object(experienceFields)
  .partial()
  .superRefine(validateYearRange);

export const experienceIdSchema = z
  .string()
  .uuid("Invalid experience ID");