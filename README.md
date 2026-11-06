# AURÉ STUDIO — Hair & Beauty Atelier

Protótipo conceitual de site premium para salão de beleza, desenvolvido como peça de portfólio por
**Bernardo Pires** — [bernardopiresdev.com.br](https://www.bernardopiresdev.com.br/).

> AURÉ STUDIO é uma marca **fictícia**. Equipe, imagens, datas e horários são ilustrativos.
> O agendamento é uma simulação: nenhum dado é coletado, enviado ou armazenado.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS 3 · Framer Motion 11
- Fontes auto-hospedadas via `next/font/local` (Bodoni Moda + Manrope, arquivos do Fontsource) —
  o build não depende de acesso ao Google Fonts.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint && npm run typecheck
```

Pronto para deploy na Vercel (sem variáveis de ambiente, backend ou banco de dados).

## Estrutura

```
src/
  app/            layout, página, estilos globais, favicon, imagem Open Graph, fontes
  components/
    layout/       Header (com menu mobile) e Footer
    sections/     Hero, Manifesto, Services, Experience, Gallery (+ Lightbox),
                  Editorial, Team, Booking, Faq, FinalCta
    ui/           RevealLines, Reveal, ParallaxImage, SectionLabel, Arrow, Logo
    providers/    Providers (MotionConfig + contexto do agendamento)
  data/           conteúdo editável: site, serviços, equipe, experiência, galeria, FAQ
  lib/            fontes, curvas de animação, utilitários
public/images/    fotografias otimizadas localmente
```

## Personalização comercial

Todo o conteúdo fica em `src/data/`. Para adaptar a um salão real:

1. `site.ts` — nome, assinatura, URL, textos institucionais, navegação.
2. `services.ts`, `team.ts`, `gallery.ts`, `faq.ts` — conteúdo e imagens.
3. `components/sections/Booking.tsx` — substituir a tela de conclusão por um link
   `https://wa.me/<número>?text=...` com os dados escolhidos, ou integrar uma plataforma de agenda.
4. `app/layout.tsx` — remover `robots: { index: false }` quando o site representar um negócio real.

## Acessibilidade e movimento

- HTML semântico, hierarquia de títulos, "pular para o conteúdo", foco visível.
- Menu mobile e lightbox com trava de rolagem, `Escape`, foco preso e restaurado.
- Lightbox: setas do teclado, swipe, botões e toque fora da foto para fechar.
- `prefers-reduced-motion` respeitado (animações instantâneas, conteúdo sempre visível).
- Sem scroll hijacking: efeitos de rolagem usam `position: sticky` e transformações leves.

## Créditos das imagens

Fotografias do [Unsplash](https://unsplash.com) ([Unsplash License](https://unsplash.com/license)) e do
[Pexels](https://www.pexels.com) ([Pexels License](https://www.pexels.com/license/)). Ambas permitem uso
gratuito, inclusive comercial, sem atribuição obrigatória — os créditos abaixo são uma cortesia. Nenhuma
imagem Unsplash+ (licença paga) foi utilizada, e foram evitadas fotos com marcas de produtos visíveis.

> As imagens marcadas como "Curadoria do autor" foram fornecidas separadamente e **não têm origem/licença
> verificada** neste repositório. Confirme os direitos de uso antes da publicação.

As imagens foram recortadas, redimensionadas e, quando indicado, receberam ajuste de tom. São ilustrativas
e **não representam trabalhos reais** da marca fictícia.

| Arquivo | Banco | Origem | Fotógrafo / observação |
| --- | --- | --- | --- |
| `hero-portrait.jpg` | Unsplash | https://unsplash.com/photos/qUZCmjBmAN0 | Hamed Farahpour |
| `manifesto-curls.jpg` | Curadoria do autor (`public/curadoria`) | `modelo1.jpg` | procedência/licença a confirmar |
| `manifesto-detail.jpg` | Pexels | https://www.pexels.com/photo/13543276/ | Mathilde Langevin |
| `service-corte.jpg` | Unsplash | https://unsplash.com/photos/FMOzVayHzDE |  |
| `service-coloracao.jpg` | Curadoria do autor (`public/curadoria`) | `modelo2.jpg` | procedência/licença a confirmar |
| `service-tratamento-lavatorio.jpg` | Curadoria do autor (`public/curadoria`) | `tratamentocapilar.jpg` | procedência/licença a confirmar |
| `service-escova.jpg` | Curadoria do autor (`public/curadoria`) | `mulhernosalao.jpg` | procedência/licença a confirmar |
| `service-manicure.jpg` | Pexels | https://www.pexels.com/photo/17280274/ | Melih Can |
| `service-eventos.jpg` | Pexels | https://www.pexels.com/photo/10561323/ |  |
| `experience-01-estilo.jpg` | Curadoria do autor (`public/curadoria`) | `descubraseuestilo.jpg` (recortada; logotipo do secador desfocado) | procedência/licença a confirmar |
| `experience-02-cuidado.jpg` | Curadoria do autor (`public/curadoria`) | `vivaocuidado.jpg` (recortada; assinatura removida no recorte) | procedência/licença a confirmar |
| `experience-03-revele.jpg` | Curadoria do autor (`public/curadoria`) | `revelesuamelhorversao.jpg` (recortada; logotipo removido no recorte) | procedência/licença a confirmar |
| `editorial-desktop-hd.jpg`, `editorial-mobile.jpg` | Curadoria do autor (`public/curadoria`: desktop2.png, imgMobile.png) | imagem gerada por IA; procedência/licença a confirmar |  |
| `cta-studio.jpg` | Curadoria do autor (`public/curadoria`) | `salao.jpg` | procedência/licença a confirmar |
| `gallery-ondas.jpg` | Unsplash | https://unsplash.com/photos/nRUce1m2E5I | Venti Views |
| `gallery-ruivo-acobreado.jpg` | Curadoria do autor (`public/curadoria`) | `ruivoacobreado.jpg` | procedência/licença a confirmar |
| `gallery-unhas.jpg` | Unsplash | https://images.unsplash.com/photo-1604654894610-df63bc536371 |  |
| `gallery-studio.jpg` | Unsplash | https://images.unsplash.com/photo-1600948836101-f9ffda59d250 |  |
| `gallery-serum.jpg` | Unsplash | https://images.unsplash.com/photo-1617897903246-719242758050 |  |
| `gallery-modelagem.jpg` | Pexels | https://www.pexels.com/photo/3065171/ | Engin Akyurt |
| `gallery-cachos-salao.jpg` | Curadoria do autor (`public/curadoria`) | `cachos.jpg` | procedência/licença a confirmar |
| `gallery-loiro-iluminado.jpg` | Curadoria do autor (`public/curadoria`) | `loiroiluminado.jpg` | procedência/licença a confirmar |
| `gallery-oleo.jpg` | Unsplash | https://images.unsplash.com/photo-1515377905703-c4788e51af15 |  |
| `gallery-noiva.jpg` | Unsplash | https://unsplash.com/photos/2CpMzlIBuN4 |  |
| `gallery-morena.jpg` | Curadoria do autor (`public/curadoria`) | `modelo3.jpg` | procedência/licença a confirmar |
| `gallery-manicure-salao.jpg` | Curadoria do autor (`public/curadoria`) | `fazendounha.jpg` | procedência/licença a confirmar |
| `gallery-arcos.jpg` | Unsplash | https://unsplash.com/photos/_Fy7Kq0w6OI | Barney Goodman (tom aquecido aplicado) |
| `team-01.jpg` | Unsplash | https://images.unsplash.com/photo-1607746882042-944635dfe10e | (monocromático quente) |
| `team-02.jpg` | Unsplash | https://images.unsplash.com/photo-1611042553365-9b101441c135 | (monocromático quente) |
| `team-03.jpg` | Unsplash | https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1 | (monocromático quente) |
| `team-04.jpg` | Unsplash | https://images.unsplash.com/photo-1506863530036-1efeddceb993 | (monocromático quente) |
