import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <About />
      <Projects />
      <Packages />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}
