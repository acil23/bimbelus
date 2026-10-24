import { Search } from "lucide-react";

export function EmptyState({
  title = "Belum ada konten",
  description = "Informasi akan ditampilkan di sini setelah tersedia.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="empty-state">
      <div className="font-mono-tech text-xs text-amber-400/80 uppercase tracking-widest">
        ✦ Ruang Informasi Akademik
      </div>
      <Search size={32} aria-hidden="true" />
      <h3>{title}</h3>
      <p className="max-w-md">{description}</p>
    </div>
  );
}
