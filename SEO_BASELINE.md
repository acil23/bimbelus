# SEO Baseline Checklist

Checklist ini untuk Bimbel YS yang sedang mulai dari nol. Urutan kerja yang benar adalah Google Business Profile terlebih dulu, lalu Search Console, lalu pengecekan indexing dan monitoring.

## Status Saat Ini

- [x] Website publik utama sudah punya metadata dasar.
- [x] Sitemap tersedia di `/sitemap.xml`.
- [x] Robots tersedia di `/robots.txt`.
- [x] Admin area sudah diset `noindex`.
- [x] Halaman publik utama sudah tersedia: beranda, program, tutor, prestasi, tentang kami, contact.
- [x] Halaman detail program, tutor, dan prestasi sudah punya metadata dinamis.
- [x] Google Business Profile sudah di setup untuk 2 lokasi.
- [ ] Search Console belum diverifikasi untuk domain property.
- [ ] Sitemap belum disubmit ke Search Console.

## Keputusan Saat Ini

- [x] Gunakan email baru sebagai owner Google Business Profile.
- [x] Email yang sudah ada akan ditambahkan sebagai manager/admin.

## D-0: Google Business Profile

Tujuan: membuat identitas lokal yang benar sebelum masuk ke indexing.

- [x] Buat email baru untuk owner Google Business Profile.
- [x] Aktifkan verifikasi 2 langkah pada email owner baru.
- [x] Tambahkan email yang sudah ada sebagai manager/admin setelah profile dibuat.
- [x] Pastikan email owner yang dipakai aman dan bisa diakses jangka panjang.
- [x] Tentukan jumlah lokasi nyata yang akan diprofile-kan.
- [x] Jika Sungai Kambut dan Sungai Duo adalah dua lokasi fisik berbeda, siapkan 2 profile terpisah. // Sudah selesai menyiapkan 2 profile untuk kedua lokasi nya
- [x] Jika hanya satu lokasi fisik, jangan buat profile kedua. // Dua profile
- [x] Buka Google Business Profile Manager.
- [x] Buat profile bisnis dengan nama yang konsisten dengan branding website.
- [x] Isi alamat lokasi fisik yang benar-benar bisa dikunjungi.
- [x] Isi kategori bisnis yang paling tepat.
- [x] Isi nomor telepon, jam buka, dan website.
- [x] Verifikasi profile menggunakan metode yang disediakan Google.
- [x] Upload foto asli lokasi, papan nama, ruang belajar, dan aset bisnis lain.
- [x] Tambahkan akun cadangan sebagai manager/admin.
- [x] Pastikan data di GBP konsisten dengan website.

## D-1: Konsistensi Website

Tujuan: memastikan halaman situs mendukung profile lokal dan tidak saling bertentangan.

- [x] Nama bisnis di website konsisten dengan GBP.
- [x] Metadata title dan description sudah ada di halaman publik utama.
- [x] Halaman Contact menampilkan lokasi yang dapat dirujuk dengan anchor `#sungai-kambut` dan `#sungai-duo`.
- [x] Structured data bisnis sudah ada.
- [x] Admin area tidak ikut terindeks.
- [x] Pastikan alamat, nomor telepon, dan jam buka di website sama dengan data GBP.
- [x] Pastikan semua konten lokasi memakai penamaan yang konsisten.
- [x] Pastikan tidak ada halaman publik yang menampilkan data lama atau konflik lokasi.
- [x] Pastikan semua URL penting bisa diakses tanpa login.

## D-2: Search Console Setup

Tujuan: membawa domain masuk ke Google Search Console dan memberi sinyal sitemap.

- [x] Tambahkan domain property di Google Search Console.
- [x] Verifikasi domain property.
- [x] Pastikan `https://bimbelys.me/sitemap.xml` dapat diakses.
- [x] Submit sitemap ke Search Console.
- [x] Tunggu status sitemap menjadi `Success`.
- [x] Cek apakah Google membaca sitemap tanpa error.

## D-3: Inspection Awal

Tujuan: memastikan URL utama siap diajukan ke indeks.

- [x] Inspect homepage.
- [x] Inspect halaman `/program`.
- [x] Inspect halaman `/tutor`.
- [x] Inspect halaman `/prestasi`.
- [x] Inspect halaman `/tentang-kami`.
- [x] Inspect halaman `/contact`.
- [x] Inspect halaman detail program yang penting.
- [x] Inspect halaman detail tutor yang penting.
- [x] Inspect halaman detail prestasi yang penting.
- [x] Request indexing hanya untuk halaman yang benar-benar final.
- [x] Cek apakah ada halaman penting yang terkena `noindex` tanpa sengaja.

## D-4: Validasi Teknis

Tujuan: meminimalkan masalah crawling dan indeks.

- [x] `robots.txt` mengizinkan halaman publik.
- [x] `robots.txt` memblokir `/admin` dan `/api`.
- [x] Sitemap hanya berisi halaman publik dan halaman detail yang memang ingin diindeks.
- [x] Halaman admin sudah `noindex`.
- [x] Pastikan canonical mengarah ke URL utama yang benar.
- [x] Pastikan tidak ada redirect aneh.
- [x] Pastikan tidak ada 404 penting pada URL publik.
- [x] Pastikan tidak ada duplicated content yang tidak perlu.
- [x] Pastikan halaman mobile-friendly.
- [x] Pastikan halaman publik bisa dirender tanpa error di browser.

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
- [x] SEO_BASELINE.md created.
- [ ] Search Console baseline metrics recorded.

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

## Rencana Kerja Praktis
<!-- -->
### Hari 1: Setup Identitas Lokal

- [x] Buat email owner baru untuk Google Business Profile.
- [x] Simpan recovery email dan nomor HP yang benar.
- [x] Aktifkan verifikasi 2 langkah pada email owner baru.
- [x] Pastikan email owner baru bisa diakses jangka panjang.
- [ ] Pastikan jumlah lokasi fisik sudah final.
- [ ] Siapkan data lokasi, nomor telepon, jam buka, dan foto lokasi.
- [ ] Buat atau lanjutkan Google Business Profile yang benar.
- [ ] Verifikasi profile Google Business.
- [ ] Tambahkan admin cadangan.

### Langkah Berikutnya

- [ ] Masuk ke Google Business Profile Manager dengan email owner baru.
- [ ] Buat profile bisnis pertama jika belum ada.
- [ ] Setelah profile jadi, tambahkan email lama sebagai manager/admin.

### Hari 1a: Data yang Harus Disiapkan

- [x] Nama bisnis final.
- [x] Email owner baru.
- [x] Email lama untuk manager/admin.
- [x] Alamat lokasi yang valid.
- [x] Nomor telepon utama.
- [x] Jam operasional.
- [x] Foto logo dan foto lokasi.
- [x] Deskripsi singkat bisnis.

### Hari 2: Rapikan Website untuk Lokasi

- [ ] Cocokkan nama bisnis di website dan GBP.
- [ ] Cocokkan alamat, telepon, dan jam operasional di semua tempat yang menampilkan data bisnis.
- [ ] Pastikan halaman Contact sudah menampilkan anchor lokasi yang benar.
- [ ] Pastikan structured data bisnis masih valid.
- [ ] Pastikan halaman publik utama tidak memiliki data lokasi yang bertentangan.

### Hari 3: Search Console

- [ ] Tambahkan domain property di Google Search Console.
- [ ] Lakukan verifikasi domain property.
- [ ] Pastikan sitemap dapat dibuka di browser.
- [ ] Submit sitemap ke Search Console.
- [ ] Pastikan tidak ada error saat Google memproses sitemap.

### Hari 4: Inspect URL Penting

- [ ] Inspect homepage.
- [ ] Inspect halaman `/program`.
- [ ] Inspect halaman `/tutor`.
- [ ] Inspect halaman `/prestasi`.
- [ ] Inspect halaman `/tentang-kami`.
- [ ] Inspect halaman `/contact`.
- [ ] Inspect detail page yang paling penting.
- [ ] Request indexing hanya untuk halaman final.

### Hari 5: Validasi Teknis

- [ ] Pastikan halaman admin tetap `noindex`.
- [ ] Pastikan `/admin` dan `/api` tidak masuk indeks.
- [ ] Pastikan canonical mengarah ke URL utama.
- [ ] Pastikan tidak ada 404 penting di URL publik.
- [ ] Pastikan mobile rendering aman.
- [ ] Pastikan halaman publik dapat dibuka tanpa login.

### Hari 6: Monitoring Awal

- [ ] Cek laporan Performance di Search Console.
- [ ] Cek laporan Pages/Coverage untuk error.
- [ ] Catat URL yang belum terindeks.
- [ ] Catat URL yang tertolak atau dianggap duplikat.
- [ ] Perbaiki masalah yang ditemukan.

### Hari 7: Baseline Final

- [ ] Semua langkah GBP selesai.
- [ ] Domain property sudah terverifikasi.
- [ ] Sitemap status Success.
- [ ] Halaman utama sudah di-inspect.
- [ ] Halaman dinamis penting sudah di-inspect.
- [ ] Admin noindex sudah diverifikasi.
- [ ] Performance report sudah dicek.
- [ ] SEO baseline siap dipakai sebagai acuan kerja berikutnya.

## Catatan Praktis

- GBP tidak menggantikan Search Console; keduanya saling melengkapi.
- Jangan membuat profile Google baru untuk lokasi yang belum pasti ada.
- Jangan minta indexing untuk halaman yang masih setengah jadi.
- Fokus awal adalah konsistensi data bisnis, sitemap bersih, dan halaman publik yang final.


## Definition of Status

- `[x]` = sudah selesai dan diverifikasi.
- `[ ]` = belum selesai.
- Jangan centang task hanya karena konfigurasi sudah dicoba.
- Untuk Google Business Profile dan Search Console, status dianggap selesai setelah hasil akhirnya dapat diverifikasi dari dashboard terkait.