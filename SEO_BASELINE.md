# SEO Baseline Checklist

Checklist ini untuk Bimbel YS yang sedang mulai dari nol. Urutan kerja yang benar adalah Google Business Profile terlebih dulu, lalu Search Console, lalu pengecekan indexing dan monitoring.

## Status Saat Ini

- [x] Website publik utama sudah punya metadata dasar.
- [x] Sitemap tersedia di `/sitemap.xml`.
- [x] Robots tersedia di `/robots.txt`.
- [x] Admin area sudah diset `noindex`.
- [x] Halaman publik utama sudah tersedia: beranda, program, tutor, prestasi, tentang kami, contact.
- [x] Halaman detail program, tutor, dan prestasi sudah punya metadata dinamis.
- [ ] Google Business Profile belum disetup penuh.
- [ ] Search Console belum diverifikasi untuk domain property.
- [ ] Sitemap belum disubmit ke Search Console.

## D-0: Google Business Profile

Tujuan: membuat identitas lokal yang benar sebelum masuk ke indexing.

- [ ] Pastikan email owner yang dipakai aman dan bisa diakses jangka panjang.
- [ ] Jika email sekarang adalah email pribadi, putuskan apakah akan dipakai sebagai owner sementara atau dibuat email bisnis baru.
- [ ] Aktifkan verifikasi 2 langkah pada akun owner.
- [ ] Tentukan jumlah lokasi nyata yang akan diprofile-kan.
- [ ] Jika Sungai Kambut dan Sungai Duo adalah dua lokasi fisik berbeda, siapkan 2 profile terpisah.
- [ ] Jika hanya satu lokasi fisik, jangan buat profile kedua.
- [ ] Buka Google Business Profile Manager.
- [ ] Buat profile bisnis dengan nama yang konsisten dengan branding website.
- [ ] Isi alamat lokasi fisik yang benar-benar bisa dikunjungi.
- [ ] Isi kategori bisnis yang paling tepat.
- [ ] Isi nomor telepon, jam buka, dan website.
- [ ] Verifikasi profile menggunakan metode yang disediakan Google.
- [ ] Upload foto asli lokasi, papan nama, ruang belajar, dan aset bisnis lain.
- [ ] Tambahkan akun cadangan sebagai manager/admin.
- [ ] Pastikan data di GBP konsisten dengan website.

## D-1: Konsistensi Website

Tujuan: memastikan halaman situs mendukung profile lokal dan tidak saling bertentangan.

- [x] Nama bisnis di website konsisten dengan GBP.
- [x] Metadata title dan description sudah ada di halaman publik utama.
- [x] Halaman Contact menampilkan lokasi yang dapat dirujuk dengan anchor `#sungai-kambut` dan `#sungai-duo`.
- [x] Structured data bisnis sudah ada.
- [x] Admin area tidak ikut terindeks.
- [ ] Pastikan alamat, nomor telepon, dan jam buka di website sama dengan data GBP.
- [ ] Pastikan semua konten lokasi memakai penamaan yang konsisten.
- [ ] Pastikan tidak ada halaman publik yang menampilkan data lama atau konflik lokasi.
- [ ] Pastikan semua URL penting bisa diakses tanpa login.

## D-2: Search Console Setup

Tujuan: membawa domain masuk ke Google Search Console dan memberi sinyal sitemap.

- [ ] Tambahkan domain property di Google Search Console.
- [ ] Verifikasi domain property.
- [ ] Pastikan `https://bimbelys.me/sitemap.xml` dapat diakses.
- [ ] Submit sitemap ke Search Console.
- [ ] Tunggu status sitemap menjadi `Success`.
- [ ] Cek apakah Google membaca sitemap tanpa error.

## D-3: Inspection Awal

Tujuan: memastikan URL utama siap diajukan ke indeks.

- [ ] Inspect homepage.
- [ ] Inspect halaman `/program`.
- [ ] Inspect halaman `/tutor`.
- [ ] Inspect halaman `/prestasi`.
- [ ] Inspect halaman `/tentang-kami`.
- [ ] Inspect halaman `/contact`.
- [ ] Inspect halaman detail program yang penting.
- [ ] Inspect halaman detail tutor yang penting.
- [ ] Inspect halaman detail prestasi yang penting.
- [ ] Request indexing hanya untuk halaman yang benar-benar final.
- [ ] Cek apakah ada halaman penting yang terkena `noindex` tanpa sengaja.

## D-4: Validasi Teknis

Tujuan: meminimalkan masalah crawling dan indeks.

- [x] `robots.txt` mengizinkan halaman publik.
- [x] `robots.txt` memblokir `/admin` dan `/api`.
- [x] Sitemap hanya berisi halaman publik dan halaman detail yang memang ingin diindeks.
- [x] Halaman admin sudah `noindex`.
- [ ] Pastikan canonical mengarah ke URL utama yang benar.
- [ ] Pastikan tidak ada redirect aneh.
- [ ] Pastikan tidak ada 404 penting pada URL publik.
- [ ] Pastikan tidak ada duplicated content yang tidak perlu.
- [ ] Pastikan halaman mobile-friendly.
- [ ] Pastikan halaman publik bisa dirender tanpa error di browser.

## D-5: Monitoring Awal

Tujuan: melihat sinyal awal dari Google dan memperbaiki masalah lebih cepat.

- [ ] Cek laporan Performance di Search Console.
- [ ] Cek halaman mana yang mulai mendapat impressions.
- [ ] Cek halaman mana yang mulai mendapat clicks.
- [ ] Cek laporan Pages/Coverage untuk error indexing.
- [ ] Catat URL yang lambat terindeks atau ditolak Google.
- [ ] Perbaiki masalah teknis yang muncul sebelum optimasi konten lanjutan.

## D-6: Baseline Final

Tujuan: menutup fase setup awal dan memastikan fondasi SEO sudah rapi.

- [ ] Domain property verified.
- [ ] Sitemap submitted.
- [ ] Sitemap status `Success`.
- [ ] Homepage inspected.
- [ ] Main pages inspected.
- [ ] Dynamic pages inspected.
- [ ] Admin noindex verified.
- [ ] Page indexing checked.
- [ ] Performance report checked.
- [ ] SEO_BASELINE.md created.

## Kriteria Selesai

Checklist ini dianggap selesai jika semua poin berikut terpenuhi.

- [ ] GBP aktif dan terverifikasi.
- [ ] Search Console aktif dan domain property terverifikasi.
- [ ] Sitemap berhasil diproses.
- [ ] Halaman publik utama bisa diindeks.
- [ ] Halaman admin tidak muncul di indeks.
- [ ] Website konsisten dengan profil bisnis lokal.
- [ ] Tidak ada konflik lokasi antara GBP, website, dan metadata.

## Urutan Eksekusi yang Disarankan

1. Selesaikan GBP dulu.
2. Pastikan website konsisten dengan GBP.
3. Verifikasi domain property di Search Console.
4. Submit sitemap.
5. Inspect homepage dan halaman utama.
6. Request indexing untuk halaman final.
7. Monitor performance dan error indexing.

## Catatan Praktis

- GBP tidak menggantikan Search Console; keduanya saling melengkapi.
- Jangan membuat profile Google baru untuk lokasi yang belum pasti ada.
- Jangan minta indexing untuk halaman yang masih setengah jadi.
- Fokus awal adalah konsistensi data bisnis, sitemap bersih, dan halaman publik yang final.
