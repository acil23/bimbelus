import { z } from "zod";
export const adminResourceSchema = z.enum(["programs", "tutors", "achievements", "locations"]);
export const adminListSchema = z.object({
 page: z.coerce.number().int().min(1).max(1000000).default(1),
 pageSize: z.coerce.number().int().min(1).max(50).default(10),
 status: z.enum(["active", "archived", "all"]).default("active"),
 search: z.string().trim().max(150).default(""),
});
export type AdminResource = z.infer<typeof adminResourceSchema>;
export type AdminListQuery = z.infer<typeof adminListSchema>;
