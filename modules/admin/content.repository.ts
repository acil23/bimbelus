import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { AdminListQuery, AdminResource } from "./content.validation";

export async function findAdminContent(resource: AdminResource, query: AdminListQuery) {
 const active = query.status === "all" ? {} : { is_active: query.status === "active" };
 const contains = { contains: query.search, mode: "insensitive" as const };
 const orderBy = [{ display_order: "asc" as const }, { id: "asc" as const }];
 // Count and page are read from the same snapshot. Clamping avoids empty pages after archiving the final row.
 return prisma.$transaction(async (tx) => {
  const paginate = (total: number) => { const pages = Math.max(1, Math.ceil(total / query.pageSize)); const page = Math.min(query.page, pages); return { total, pages, page, pageSize: query.pageSize }; };
  switch (resource) {
   case "programs": {
    const where = { ...active, ...(query.search ? { OR: [{ name: contains }, { slug: contains }, { description: contains }] } : {}) };
    const pagination = paginate(await tx.programs.count({ where }));
    const items = await tx.programs.findMany({ where, orderBy, skip: (pagination.page - 1) * query.pageSize, take: query.pageSize, include: { program_packages: { orderBy } } });
    return { items, pagination };
   }
   case "tutors": {
    const where = { ...active, ...(query.search ? { OR: [{ name: contains }, { slug: contains }, { specialization: contains }] } : {}) };
    const pagination = paginate(await tx.tutors.count({ where }));
    const items = await tx.tutors.findMany({ where, orderBy, skip: (pagination.page - 1) * query.pageSize, take: query.pageSize, include: { tutor_educations: { orderBy }, tutor_experiences: { orderBy } } });
    return { items, pagination };
   }
   case "achievements": {
    const where = { ...active, ...(query.search ? { OR: [{ title: contains }, { student_name: contains }, { student_school: contains }, { destination: contains }] } : {}) };
    const pagination = paginate(await tx.achievements.count({ where }));
    const items = await tx.achievements.findMany({ where, orderBy, skip: (pagination.page - 1) * query.pageSize, take: query.pageSize });
    return { items, pagination };
   }
   case "locations": {
    const where = { ...active, ...(query.search ? { OR: [{ label: contains }, { address: contains }, { contact_person: contains }] } : {}) };
    const pagination = paginate(await tx.contact_locations.count({ where }));
    const items = await tx.contact_locations.findMany({ where, orderBy, skip: (pagination.page - 1) * query.pageSize, take: query.pageSize });
    return { items, pagination };
   }
  }
 }, { isolationLevel: "RepeatableRead" });
}
