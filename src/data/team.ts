/** Equipe fictícia — nomes, funções e retratos são ilustrativos. */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  services: string[];
  image: { src: string; alt: string };
};

export const team: TeamMember[] = [
  {
    id: "helena",
    name: "Helena Duarte",
    role: "Direção criativa & Corte",
    bio: "Conduz a consultoria de estilo e desenha cortes que respeitam a textura natural dos fios.",
    specialties: ["Visagismo", "Cortes autorais"],
    services: ["corte", "escova"],
    image: { src: "/images/team-01.jpg", alt: "Retrato de Helena Duarte, sorrindo, com cabelos escuros na altura dos ombros" },
  },
  {
    id: "livia",
    name: "Lívia Arantes",
    role: "Colorista",
    bio: "Trabalha cor como luz: mechas suaves, transições naturais e correções cuidadosas.",
    specialties: ["Iluminados", "Correção de cor"],
    services: ["coloracao", "tratamentos"],
    image: { src: "/images/team-02.jpg", alt: "Retrato de Lívia Arantes usando chapéu, com a mão apoiada no rosto" },
  },
  {
    id: "theo",
    name: "Theo Nakamura",
    role: "Styling & Eventos",
    bio: "Especialista em finalizações e penteados que acompanham o ritmo de um dia inteiro.",
    specialties: ["Penteados", "Finalização"],
    services: ["escova", "eventos", "corte"],
    image: { src: "/images/team-03.jpg", alt: "Retrato de perfil de Theo Nakamura, de óculos e gorro" },
  },
  {
    id: "clara",
    name: "Clara Menezes",
    role: "Terapia capilar & Nail care",
    bio: "Une olhar técnico e delicadeza nos tratamentos de fios, couro cabeludo e unhas.",
    specialties: ["Avaliação capilar", "Nail design"],
    services: ["tratamentos", "unhas", "eventos"],
    image: { src: "/images/team-04.jpg", alt: "Retrato frontal de Clara Menezes, com cabelo curto e sardas" },
  },
];
