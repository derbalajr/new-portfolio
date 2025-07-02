import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto px-3 sm:px-5 lg:px-10 overflow-clip">
      <div className="max-w-7xl w-full space-y-16 md:space-y-20 lg:space-y-24">
        <FloatingNav navItems={navItems} />
        
        {/* Hero Section */}
        <section className="animate-fade-in">
          <Hero />
        </section>
        
        {/* About Section */}
        <section className="animate-slide-up section-glow rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
          <Grid />
        </section>
        
        {/* Projects Section */}
        <section className="animate-slide-up">
          <RecentProjects />
        </section>
        
        {/* Experience Section */}
        <section className="animate-slide-up">
          <Experience />
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
