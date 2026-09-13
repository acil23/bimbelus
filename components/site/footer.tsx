// components/site/footer.tsx --- IGNORE ---

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-espresso text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
            <span className="font-display text-xl font-semibold">
              Bimbel YS
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70">
            Enabling students to advance in their education — mendampingi
            siswa SD hingga persiapan UTBK untuk tumbuh setahap demi setahap.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Jelajahi</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li><Link href="/program" className="hover:text-marigold">Program</Link></li>
            <li><Link href="/tutor" className="hover:text-marigold">Tutor</Link></li>
            <li><Link href="/prestasi" className="hover:text-marigold">Prestasi</Link></li>
            <li><Link href="/tentang-kami" className="hover:text-marigold">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Hubungi Kami</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li><Link href="/contact" className="hover:text-marigold">Info Kontak &amp; Cabang</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-xs text-paper/50">
          © {new Date().getFullYear()} Bimbel YS. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
