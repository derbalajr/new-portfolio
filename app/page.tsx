import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Nav />
      <Hero />
      <Ticker />
      <Footer />
    </div>
  );
}
