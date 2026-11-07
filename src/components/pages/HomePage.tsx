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
import { SafariDiag } from "@/components/dev/SafariDiag";
import { AppShell } from "@/lib/scrollContainer";

/**
 * Página inicial. Com `shell`, o conteúdo rola dentro de um contêiner interno (#scroll-root)
 * e o header fixo fica fora dele — versão de teste para o Safari iOS 26 (rota /teste-scroll).
 */
export function HomePage({ shell = false }: { shell?: boolean }) {
  const content = (
    <>
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
    </>
  );

  return (
    <Providers>
      {shell ? (
        <AppShell header={<Header />} overlay={<SafariDiag />}>
          {content}
        </AppShell>
      ) : (
        <>
          <Header />
          {content}
          {/* TEMPORÁRIO — ?teste=diag */}
          <SafariDiag />
        </>
      )}
    </Providers>
  );
}
