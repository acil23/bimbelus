import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  createProgram,
  getActivePrograms,
} from "@/modules/programs/program.service";
import { createProgramSchema } from "@/modules/programs/program.validation";
import { requireAdmin } from "@/lib/auth/current-user";

export async function GET() {
  try {
    const programs = await getActivePrograms();

    return successResponse(programs);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    
    const body: unknown = await request.json();

    const validatedData = createProgramSchema.parse(body);

    const program = await createProgram(validatedData);

    return successResponse(program, 201, "Program created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}