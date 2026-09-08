import { z } from "zod";

export const updateContactInformationSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email must be valid")
    .max(255, "Email must be at most 255 characters")
    .nullable()
    .optional(),

  instagram_url: z
    .string()
    .trim()
    .url("Instagram URL must be valid")
    .nullable()
    .optional(),

  facebook_url: z
    .string()
    .trim()
    .url("Facebook URL must be valid")
    .nullable()
    .optional(),

  tiktok_url: z
    .string()
    .trim()
    .url("TikTok URL must be valid")
    .nullable()
    .optional(),

  youtube_url: z
    .string()
    .trim()
    .url("YouTube URL must be valid")
    .nullable()
    .optional(),
});

const contactLocationFields = {
  label: z
    .string()
    .trim()
    .max(100, "Label must be at most 100 characters")
    .nullable()
    .optional(),

  address: z
    .string()
    .trim()
    .min(1, "Address is required"),

  phone: z
    .string()
    .trim()
    .max(30, "Phone must be at most 30 characters")
    .nullable()
    .optional(),

  whatsapp: z
    .string()
    .trim()
    .max(30, "WhatsApp must be at most 30 characters")
    .nullable()
    .optional(),

  contact_person: z
    .string()
    .trim()
    .max(150, "Contact person must be at most 150 characters")
    .nullable()
    .optional(),

  google_maps_url: z
    .string()
    .trim()
    .url("Google Maps URL must be valid")
    .nullable()
    .optional(),

  is_active: z.boolean().optional(),

  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be greater than or equal to 0")
    .optional(),
};

export const createContactLocationSchema =
  z.object(contactLocationFields);

export const updateContactLocationSchema =
  createContactLocationSchema.partial();

export const contactLocationIdSchema = z
  .string()
  .uuid("Invalid contact location ID");
