import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Gallery } from "@/components/sections/Gallery";
import { Editorial } from "@/components/sections/Editorial";
import { Team } from "@/components/sections/Team";
import { Booking } from "@/components/sections/Booking";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <Providers>
        <Header />
        <main id="conteudo">
          <Hero />
          <Manifesto />
          <Services />
          <Experience />
          <Gallery />
          <Editorial />
          <Team />
          <Booking />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
    </Providers>
  );
}
