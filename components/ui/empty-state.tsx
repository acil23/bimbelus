import { Search } from "lucide-react";
export function EmptyState({ title = "Belum ada konten", description = "Informasi akan ditampilkan di sini setelah tersedia." }: { title?: string; description?: string }) {
  return <div className="empty-state"><Search size={32} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></div>;
}
