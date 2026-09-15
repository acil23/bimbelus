"use client";

import { useState } from "react";
import { initials, webUrl } from "@/lib/ui/format";

export function Media({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  const source = src && /^\/(?!\/)/.test(src) ? src : webUrl(src);

  return (
    <div className={`media ${className}`}>
      {source && source !== failedSource ? (
        // CMS images use native lazy loading so arbitrary Azure account hosts need no build-time configuration.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSource(source)}
        />
      ) : (
        <span className="media-fallback" role="img" aria-label={alt}>
          {initials(alt) || "YS"}
        </span>
      )}
    </div>
  );
}
