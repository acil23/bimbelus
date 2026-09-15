import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke konten
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </>
  );
}
