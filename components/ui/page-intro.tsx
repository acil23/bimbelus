import Link from "next/link";
import type { ReactNode } from "react";
export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string | null; children?: ReactNode }) {
  return <header className="page-intro"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></nav><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p className="lead">{description}</p>}{children}</div></header>;
}
