import { z } from "zod";

export const createPackageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),

  description: z
    .string()
    .trim()
    .max(5000, "Description must be at most 5000 characters")
    .nullable()
    .optional(),

  price: z
    .number()
    .int("Price must be an integer")
    .min(0, "Price must be greater than or equal to 0"),

  price_unit: z.enum([
    "PER_SEMESTER",
    "PER_PERIODE",
    "PER_BULAN",
    "PER_PERTEMUAN",
    "SEKALI_BAYAR",
  ]),

  duration: z
    .string()
    .trim()
    .max(100, "Duration must be at most 100 characters")
    .nullable()
    .optional(),

  is_active: z.boolean().optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
});

export const updatePackageSchema = createPackageSchema.partial();

export const packageIdSchema = z.string().uuid("Invalid package ID");

export const programIdSchema = z.string().uuid("Invalid program ID");
