import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { AmbientBackground } from "@/components/site/ambient-background";
import { PageTransition } from "@/components/animations/page-transition";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="soft-futurism-root">
      <AmbientBackground />
      <a href="#main-content" className="skip-link">
        Langsung ke konten
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
