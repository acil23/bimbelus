export const categoryLabels: Record<string, string> = { REGULER: "Reguler", OLIMPIADE: "Olimpiade", PROGRAM_TAHUNAN: "Program Tahunan", LAINNYA: "Lainnya" };
export const achievementLabels: Record<string, string> = { COMPETITION: "Kompetisi", ADMISSION: "Penerimaan", ACADEMIC: "Akademik", OTHER: "Lainnya" };
export const priceUnits: Record<string, string> = { PER_SEMESTER: "per semester", PER_PERIODE: "per periode", PER_BULAN: "per bulan", PER_PERTEMUAN: "per pertemuan", SEKALI_BAYAR: "sekali bayar" };
export function formatPrice(value: number) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value); }
export function initials(value: string) { return value.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase(); }
export function webUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
export function whatsappUrl(value?: string | null) {
  let number = value?.replace(/\D/g, "") ?? "";
  if (number.startsWith("0")) number = `62${number.slice(1)}`;
  return number.length >= 8 && number.length <= 15 ? `https://wa.me/${number}` : undefined;
}
