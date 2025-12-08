import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Differentials } from "@/components/Differentials";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <Differentials />
          <Process />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </HelmetProvider>
  );
};

export default Index;
