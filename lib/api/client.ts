export class ApiClientError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string;
      details?: unknown;
    },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not configured");
  }

  return baseUrl;
}

export async function apiClient<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),
      ...init?.headers,
    },
    cache: "no-store",
  });

  let payload: ApiResponse<T>;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiClientError("Invalid API response", {
      status: response.status,
    });
  }

  if (!response.ok) {
    if (!payload.success) {
      throw new ApiClientError(payload.error.message, {
        status: response.status,
        code: payload.error.code,
        details: payload.error.details,
      });
    }

    throw new ApiClientError("API request failed", {
      status: response.status,
    });
  }

  if (!payload.success) {
    throw new ApiClientError(payload.error.message, {
      status: response.status,
      code: payload.error.code,
      details: payload.error.details,
    });
  }

  return payload.data;
}