import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-10">
        <About />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
