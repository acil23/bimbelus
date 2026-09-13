// components/site/cta-band.tsx --- IGNORE ---

import Link from "next/link";

export function CtaBand({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="rounded-3xl bg-espresso px-8 py-14 text-center sm:px-16">
        <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-paper/70">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-marigold-dark"
          >
            Daftar Sekarang
          </Link>
          <Link
            href="/program"
            className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
          >
            Lihat Program
          </Link>
        </div>
      </div>
    </section>
  );
}
