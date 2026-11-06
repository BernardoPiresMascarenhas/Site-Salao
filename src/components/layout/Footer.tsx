import { nav, site } from "@/data/site";
import { services } from "@/data/services";
import { Arrow } from "@/components/ui/Arrow";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cacau-950 text-linho" style={{ paddingBottom: "var(--safe-bottom)" }}>
      <div className="container-site pt-20 sm:pt-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="font-display text-3xl leading-tight sm:text-4xl">
              {site.positioning.replace("essência.", "")}
              <em className="italic text-bronze-300">essência.</em>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-linho/55">{site.disclaimer}</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-2 md:col-start-7">
            <p className="label text-bronze-300">Navegação</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-draw py-1 text-sm text-linho/75 hover:text-linho">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#agendamento" className="link-draw py-1 text-sm text-linho/75 hover:text-linho">
                  Agendamento
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label text-bronze-300">Serviços</p>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#servicos" className="link-draw py-1 text-sm text-linho/75 hover:text-linho">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <p className="label text-bronze-300">Contato</p>
            <p className="mt-5 text-sm leading-relaxed text-linho/60">
              Canais de atendimento, endereço e redes sociais entram na versão personalizada para o seu salão.
            </p>
          </div>
        </div>
      </div>

      {/* Assinatura em grande escala */}
      <div aria-hidden className="mt-16 select-none overflow-hidden sm:mt-24">
        <p className="display translate-y-[0.18em] whitespace-nowrap text-center text-[25.5vw] leading-[0.8] tracking-[-0.03em] text-linho/[0.08]">
          AURÉ
        </p>
      </div>

      <div className="border-t border-linho/10">
        <div className="container-site flex flex-col gap-5 py-7 text-xs text-linho/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — projeto fictício para portfólio. {site.photoCredit.split(".")[0]}.
          </p>
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <a
              href={site.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw py-1 text-linho/80 hover:text-linho"
            >
              {site.credit.label}
            </a>
            <a href="#inicio" className="flex items-center gap-2 py-1 text-linho/70 hover:text-linho" aria-label="Voltar ao topo">
              Topo <Arrow direction="up" className="w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
