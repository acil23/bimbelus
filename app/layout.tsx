import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bimbelys.me"),

  title: {
    default: "Bimbel YS | Bimbingan Belajar di Dharmasraya",
    template: "%s | Bimbel YS",
  },

  description:
    "Bimbel YS menyediakan program bimbingan belajar untuk siswa SD, SMP, SMA, olimpiade, dan persiapan pendidikan di Dharmasraya.",

  applicationName: "Bimbel YS",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}