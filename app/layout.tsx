// app/layout.tsx --- IGNORE ---

import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bimbel YS — Enabling Students To Advance In Their Education",
    template: "%s | Bimbel YS",
  },
  description:
    "Bimbel YS mendampingi siswa SD hingga persiapan UTBK untuk berkembang setahap demi setahap menuju kampus dan sekolah impian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-body text-espresso">
        {children}
      </body>
    </html>
  );
}
