import { requireAdmin } from "@/lib/auth/current-user";
import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { getAdminContent } from "@/modules/admin/content.service";
import { adminListSchema, adminResourceSchema } from "@/modules/admin/content.validation";
export async function GET(request: Request, { params }: { params: Promise<{ resource: string }> }) {
 try {
  await requireAdmin();
  const { resource } = await params;
  const query = adminListSchema.parse(Object.fromEntries(new URL(request.url).searchParams));
  const result = await getAdminContent(adminResourceSchema.parse(resource), query);
  const response = successResponse(result);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
 } catch (error) { return handleApiError(error); }
}
