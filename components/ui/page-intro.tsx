import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Sparkles } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string | null;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <div className="container page-intro-grid">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
              <ol className="breadcrumbs-list">
                <li aria-hidden="true" className="text-[#F4A261]">
                  <BookOpen size={13} />
                </li>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={`${item.label}-${index}`}>
                      {index > 0 && <span aria-hidden="true">/</span>}
                      {isLast || !item.href ? (
                        <span className="font-bold text-[#1F2937]">{item.label}</span>
                      ) : (
                        <Link href={item.href}>{item.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {children}
        </div>

        {description && (
          <div className="clay-card p-6 border border-white/90">
            <div className="flex items-center justify-between gap-2 mb-2.5 text-xs font-mono-tech font-bold text-[#2E8BC0]">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#F4A261]" aria-hidden="true" />
                <span>RINGKASAN HALAMAN</span>
              </span>
              <span>Bimbel YS</span>
            </div>
            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-medium">
              {description}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
