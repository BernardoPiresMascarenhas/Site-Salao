export type GalleryCategory = "cabelo" | "cor" | "unhas" | "studio" | "detalhes";

export const galleryFilters: { id: "todos" | GalleryCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "cabelo", label: "Cabelo" },
  { id: "cor", label: "Cor" },
  { id: "unhas", label: "Unhas" },
  { id: "studio", label: "Studio" },
  { id: "detalhes", label: "Detalhes" },
];

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  category: GalleryCategory;
  /** Forma no grid: retrato (alto), paisagem (largo) ou quadrado */
  shape: "tall" | "wide" | "square";
};

export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery-ondas.jpg", width: 1600, height: 1067, alt: "Mulher de cabelos ondulados em camadas, iluminada por luz quente sobre fundo escuro", title: "Ondas em luz quente", category: "cabelo", shape: "wide" },
  { id: "g2", src: "/images/gallery-ruivo-acobreado.jpg", width: 736, height: 1311, alt: "Retrato de mulher com cabelos longos e ondulados em tom ruivo acobreado, vestindo preto sobre fundo claro", title: "Ruivo acobreado", category: "cor", shape: "tall" },
  { id: "g3", src: "/images/gallery-unhas.jpg", width: 1200, height: 1206, alt: "Mão com unhas esmaltadas em preto e efeito tartaruga, com anéis dourados", title: "Esmaltação escura", category: "unhas", shape: "square" },
  { id: "g4", src: "/images/gallery-arcos.jpg", width: 1100, height: 1486, alt: "Salão minimalista com espelhos em arco, poltronas claras e piso de madeira", title: "Espelhos em arco", category: "studio", shape: "tall" },
  { id: "g5", src: "/images/gallery-serum.jpg", width: 1100, height: 1650, alt: "Frasco de sérum com conta-gotas sobre bandeja e eucalipto", title: "Ritual de tratamento", category: "detalhes", shape: "tall" },
  { id: "g6", src: "/images/gallery-modelagem.jpg", width: 1600, height: 1067, alt: "Cabeleireiro modelando cachos longos com mechas loiras em uma cliente", title: "Cachos modelados", category: "cabelo", shape: "wide" },
  { id: "g7", src: "/images/gallery-cachos-salao.jpg", width: 736, height: 1104, alt: "Cabeleireira cortando os cabelos cacheados e volumosos de uma cliente em um salão claro", title: "Cachos definidos", category: "cabelo", shape: "tall" },
  { id: "g8", src: "/images/gallery-loiro-iluminado.jpg", width: 736, height: 920, alt: "Mulher de cabelos longos, volumosos e repicados em loiro iluminado com mechas douradas", title: "Loiro iluminado", category: "cor", shape: "square" },
  { id: "g9", src: "/images/gallery-oleo.jpg", width: 1600, height: 1067, alt: "Gota de óleo caindo de um frasco sobre a palma da mão", title: "Óleos e nutrição", category: "detalhes", shape: "wide" },
  { id: "g10", src: "/images/gallery-noiva.jpg", width: 1600, height: 1067, alt: "Noiva de cabelos cacheados com véu sendo preparada para a cerimônia", title: "Preparação da noiva", category: "cabelo", shape: "wide" },
  { id: "g11", src: "/images/gallery-morena.jpg", width: 540, height: 676, alt: "Perfil de mulher morena com cabelos longos, brilhantes e ondulados sobre fundo bege", title: "Ondas brilhantes", category: "cabelo", shape: "tall" },
  { id: "g12", src: "/images/gallery-manicure-salao.jpg", width: 736, height: 920, alt: "Manicure de luvas lixando as unhas de uma cliente com anéis dourados, em salão de luz quente", title: "Cuidado em cada gesto", category: "unhas", shape: "wide" },
  { id: "g13", src: "/images/gallery-studio.jpg", width: 1600, height: 1111, alt: "Interior de salão com espelhos redondos e parede escura", title: "O espaço", category: "studio", shape: "wide" },
];
