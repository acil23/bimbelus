import { NextResponse } from "next/server";

export function successResponse<T>(
  data: T,
  status = 200,
  message?: string,
) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    { status },
  );
}

export function errorResponse(
  code: string,
  message: string,
  status: number,
  details?: unknown,
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined ? { details } : {}),
      },
    },
    { status },
  );
}
