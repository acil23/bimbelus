import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";
import {
  uploadPublicImageService,
  type UploadFolder,
} from "@/modules/uploads/upload.service";
import {
  ImageUploadValidationError,
} from "@/lib/storage/image-upload";

const folders = new Set<UploadFolder>([
  "branding",
  "programs",
  "tutors",
  "achievements",
]);

export async function POST(request: NextRequest) {
  try {
    await requireSameOrigin(request);
    await requireAdmin();

    const formData = await request.formData();

    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "File is required",
            details: {},
          },
        },
        { status: 400 },
      );
    }

    if (
      typeof folder !== "string" ||
      !folders.has(folder as UploadFolder)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid upload folder",
            details: {},
          },
        },
        { status: 400 },
      );
    }

    const result = await uploadPublicImageService(
      file,
      folder as UploadFolder,
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "File uploaded successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ImageUploadValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.message,
            details: {},
          },
        },
        { status: 400 },
      );
    }

    console.error("POST /api/uploads failed", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to upload file",
          details: {},
        },
      },
      { status: 500 },
    );
  }
}