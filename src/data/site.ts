/**
 * Configuração central da marca. Para adaptar o projeto a um salão real,
 * comece por aqui: nome, assinatura, navegação e textos institucionais.
 */
export const site = {
  name: "AURÉ STUDIO",
  shortName: "AURÉ",
  tagline: "Hair & Beauty Atelier",
  positioning: "Beleza que revela sua essência.",
  description:
    "AURÉ STUDIO é um atelier conceitual de cabelo e beleza — corte, coloração, tratamentos, nail care e produção para eventos. Projeto fictício desenvolvido para portfólio.",
  url: "https://aure-studio.vercel.app",
  locale: "pt_BR",
  credit: {
    label: "Design & Development — Bernardo Pires",
    href: "https://www.bernardopiresdev.com.br/",
  },
  disclaimer:
    "AURÉ STUDIO é uma marca fictícia. Projeto conceitual desenvolvido para fins de portfólio — não representa um salão em funcionamento.",
  photoCredit:
    "Fotografias ilustrativas de bancos de imagens (Unsplash License). Não representam trabalhos reais da marca.",
} as const;

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Galeria", href: "#galeria" },
  { label: "Equipe", href: "#equipe" },
  { label: "FAQ", href: "#faq" },
] as const;

export const BOOKING_HREF = "#agendamento";
