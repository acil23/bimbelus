import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <div className="section">
      <nav
        aria-label="Breadcrumb"
        className="container text-sm"
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}

                {isLast || !item.href ? (
                  <span aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
