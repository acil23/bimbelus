import Link from "next/link";
import type { ReactNode } from "react";

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
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
            <ol className="breadcrumbs-list">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={`${item.label}-${index}`}>
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {isLast || !item.href ? (
                      <span>{item.label}</span>
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
        {description && <p className="lead">{description}</p>}
        {children}
      </div>
    </header>
  );
}
