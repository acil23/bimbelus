import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Users, Trophy, CheckCircle } from "lucide-react";
import { getCompany } from "@/lib/api/company";
import { getPrograms } from "@/lib/api/programs";
import { getTutors } from "@/lib/api/tutors";
import { getAchievements } from "@/lib/api/achievements";
import { getContact } from "@/lib/api/contact";
import { whatsappUrl } from "@/lib/ui/format";
import { HeroMark } from "@/components/site/hero-mark";
import { SectionHeading } from "@/components/site/section-heading";
import { ProgramCard } from "@/components/site/program-card";
import { TutorCarousel, AchievementMarquee } from "@/components/site/showcases";
import { CtaBand } from "@/components/site/cta-band";
import { EmptyState } from "@/components/ui/empty-state";
const benefits = [
 { icon: Compass, title: "Temukan arah belajarmu", text: "Pilih program sesuai kebutuhan dan tujuan yang ingin kamu capai." },
 { icon: Users, title: "Kenali pendampingmu", text: "Pelajari spesialisasi, pendidikan, dan pengalaman tutor sebelum memilih." },
 { icon: BookOpen, title: "Pilihan yang jelas", text: "Bandingkan paket, durasi, dan biaya belajar secara terbuka." },
 { icon: Trophy, title: "Terinspirasi untuk maju", text: "Temukan semangat baru dari perjalanan dan pencapaian siswa kami." },
];
export default async function HomePage() {
 const [company,programs,tutors,achievements,contact] = await Promise.all([getCompany(),getPrograms(),getTutors(),getAchievements(),getContact()]);
 const whatsapp = contact.contact_locations.map((location) => whatsappUrl(location.whatsapp)).find(Boolean);
 const highlights = [...achievements].sort((a,b) => Number(b.is_featured) - Number(a.is_featured)).slice(0,12);
 return <>
  <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">{company.name} · Bimbingan Belajar</span><h1>Belajar terarah.<br /><em>Melangkah lebih jauh.</em></h1><p className="lead">{company.tagline || "Setiap impian punya langkah pertama. Mulai perjalanan belajarmu bersama Bimbel YS."}</p>{company.description && <p className="lead clamp-3">{company.description}</p>}<div className="actions"><Link href="/program" className="btn btn-gold">Lihat Program <ArrowRight size={18} aria-hidden="true" /></Link><Link href="/contact" className="btn btn-light">Hubungi Kami</Link></div><p className="hero-note"><CheckCircle size={18} aria-hidden="true" />Program, tutor, dan informasi belajar dalam satu tempat.</p></div><HeroMark logo={company.logo_url} /></div></section>
  <section className="section section-white"><div className="container"><div className="section-head"><SectionHeading eyebrow="Program pilihan" title="Rancang perjalanan belajarmu." description="Temukan program dan paket yang sesuai dengan kebutuhanmu." /><Link className="text-link" href="/program">Semua program <ArrowRight size={18} aria-hidden="true" /></Link></div>{programs.length ? <div className="grid-3">{programs.slice(0,3).map((program) => <ProgramCard key={program.id} program={program} />)}</div> : <EmptyState title="Program segera tersedia" description="Hubungi kami untuk informasi program belajar." />}</div></section>
  <section className="section"><div className="container"><div className="section-head"><SectionHeading eyebrow="Mengapa Bimbel YS" title="Lebih dari sekadar tempat belajar." description="Buat keputusan belajar dengan informasi yang jelas dan pendamping yang tepat." /></div><div className="grid-4">{benefits.map(({icon: Icon,title,text}) => <article className="card feature-card" key={title}><span className="feature-icon"><Icon size={24} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section section-blue"><div className="container"><div className="section-head"><SectionHeading eyebrow="Tim pengajar" title="Kenali orang di balik proses belajarmu." description="Lihat profil dan latar belakang tutor Bimbel YS." /><Link className="text-link" href="/tutor">Semua tutor <ArrowRight size={18} aria-hidden="true" /></Link></div><TutorCarousel tutors={tutors} /></div></section>
  <section className="section section-dark"><div className="container"><div className="section-head"><SectionHeading eyebrow="Jejak prestasi" title="Setiap pencapaian punya cerita." description="Rayakan langkah siswa kami dalam meraih tujuan pendidikan mereka." /><Link className="text-link" href="/prestasi">Semua prestasi <ArrowRight size={18} aria-hidden="true" /></Link></div><AchievementMarquee achievements={highlights} /></div></section>
  <section className="section section-white"><div className="container grid-2"><div className="stack"><SectionHeading eyebrow="Tentang kami" title={`Bertumbuh bersama ${company.name}.`} description="Mengenal lebih dekat tujuan dan perjalanan lembaga kami." /><Link href="/tentang-kami" className="text-link">Kenali Bimbel YS <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="stack">{company.vision && <article className="card rich-panel"><h3>Visi kami</h3><p className="pre-line muted" style={{ marginTop: "1rem" }}>{company.vision}</p></article>}{company.mission && <article className="card rich-panel"><h3>Misi kami</h3><p className="pre-line muted" style={{ marginTop: "1rem" }}>{company.mission}</p></article>}{!company.vision && !company.mission && <p className="lead">{company.description || company.tagline || "Kenali profil dan perjalanan Bimbel YS."}</p>}</div></div></section>
  <CtaBand />
  {whatsapp && <div className="container actions" style={{ justifyContent: "center", paddingBottom: "3rem" }}><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Konsultasi melalui WhatsApp <ArrowRight size={18} aria-hidden="true" /></a></div>}
 </>;
}
