import { getPrograms } from "@/lib/api/programs";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";
export const metadata = { title: "Program Belajar" };
export default async function ProgramsPage() {
    const programs = await getPrograms();
    return <>
        <PageIntro eyebrow="Program" title="Satu tujuan. Banyak cara untuk bertumbuh." description="Jelajahi kategori program dan pilih paket belajar yang sesuai kebutuhanmu." /><section className="section container">
            <Catalog kind="programs" items={programs} /></section>
        <CtaBand title="Masih mencari program yang tepat?" /></>;
}
