import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import MeetOurTeam from "@/components/MeetOurTeam";
import Packages from "@/components/Packages";
import WorkProcess from "@/components/WorkProcess";
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
      <MeetOurTeam />
      <Packages />
      <WorkProcess />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}
