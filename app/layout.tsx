import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = { title: { default: "Bimbel YS — Belajar Terarah, Melangkah Lebih Jauh", template: "%s | Bimbel YS" }, description: "Temukan program bimbingan belajar, kenali tutor, dan lihat perjalanan prestasi siswa Bimbel YS." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id" className={jakarta.variable}><body>{children}</body></html>; }
