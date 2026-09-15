export function LoadingState() {
  return (
    <div className="container section stack" role="status" aria-live="polite">
      <p className="muted">Memuat konten…</p>

      <div className="skeleton" style={{ minHeight: 80 }} />

      <div className="grid-3">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </div>
  );
}
