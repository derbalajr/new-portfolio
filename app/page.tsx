import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const Projects = dynamic(() => import("@/components/Projects"));
const Skills = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Experience"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl overflow-x-hidden">
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Footer />
    </main>
  );
}
