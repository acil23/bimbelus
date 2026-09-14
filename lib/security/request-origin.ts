import "server-only";
import { ApiError } from "@/lib/errors/api-error";

export function requireSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");

  if (!origin) {
    return;
  }

  // Gunakan URL produksi yang sudah pasti akurat
  const expectedOrigin = process.env.NEXT_PUBLIC_APP_URL;

  if (origin !== expectedOrigin) {
    // Console log opsional untuk memudahkan debugging di terminal PM2 jika masih gagal
    console.error(`Origin ditolak: menerima ${origin}, mengharapkan ${expectedOrigin}`);
    
    throw new ApiError(
      "FORBIDDEN",
      "Invalid request origin",
      403,
    );
  }
}