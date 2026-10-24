import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Giantrex from "@/components/Giantrex";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import { getContent, type Locale } from "@/data";

export default function Home({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  // Client components get only the slices they render, so the RSC payload
  // doesn't carry the whole dictionary once per island.
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav items={c.navItems} ui={c.ui} contact={c.contact} />
      <Hero hero={c.heroData} />
      <Ticker items={c.ticker} />
      {/* About, Giantrex, Work, Stack and Path share one padded container.
          References and Contact sit outside it — they bleed to the viewport
          edge. */}
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About about={c.about} stats={c.stats} />
        <Giantrex giantrex={c.giantrex} projects={c.projects} ui={c.ui} />
        <Projects work={c.work} projects={c.projects} ui={c.ui} />
        <Skills section={c.skillsSection} skills={c.skills} />
        <Experience section={c.experience} roles={c.roles} ui={c.ui} />
      </main>
      <Testimonials
        section={c.testimonialsSection}
        testimonials={c.testimonials}
      />
      <Contact contact={c.contact} />
      <Footer footer={c.footer} ui={c.ui} />
      <MobileCta contact={c.contact} />
    </div>
  );
}
