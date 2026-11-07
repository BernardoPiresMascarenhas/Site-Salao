export type Service = {
  id: string;
  number: string;
  name: string;
  short: string;
  description: string;
  highlights: string[];
  image: { src: string; alt: string; position?: string };
};

export const services: Service[] = [
  {
    id: "coloracao",
    number: "01",
    name: "Coloração & Mechas",
    short: "Cor construída para a sua pele.",
    description:
      "Da cor que ilumina discretamente à transformação completa. Diagnóstico da fibra, técnica precisa e tons escolhidos para valorizar o seu tom de pele.",
    highlights: ["Mechas e iluminados", "Coloração global", "Correção de cor"],
    image: {
      src: "/images/service-coloracao.jpg",
      alt: "Modelo com cabelos longos em ondas e mechas loiras iluminadas, vestindo bege acetinado",
      position: "45% 30%",
    },
  },
  {
    id: "corte",
    number: "02",
    name: "Corte & Styling",
    short: "Linhas desenhadas para você.",
    description:
      "Cortes pensados a partir do formato do rosto, da textura dos fios e da rotina que você vive. Nada de fórmula: cada linha tem intenção.",
    highlights: ["Consultoria de visagismo", "Corte personalizado", "Styling"],
    image: {
      src: "/images/service-corte.jpg",
      alt: "Retrato de mulher com corte chanel loiro e repartido ao meio, de gola alta preta sobre fundo escuro",
      position: "50% 25%",
    },
  },
  {
    id: "tratamentos",
    number: "03",
    name: "Tratamentos Capilares",
    short: "O que o seu cabelo realmente pede.",
    description:
      "Protocolos de reconstrução, nutrição e hidratação definidos depois de entender o histórico dos fios — sem pacotes prontos.",
    highlights: ["Avaliação capilar", "Reconstrução e nutrição", "Terapia do couro cabeludo"],
    image: {
      src: "/images/service-tratamento-lavatorio.jpg",
      alt: "Cliente de olhos fechados recebendo lavagem e tratamento com espuma no lavatório, envolta em toalha branca",
      position: "45% 40%",
    },
  },
  {
    id: "escova",
    number: "04",
    name: "Escova & Finalização",
    short: "Movimento que dura além do dia.",
    description:
      "Brilho, volume e acabamento sob medida — do liso polido às ondas naturais, com técnicas que respeitam a saúde da fibra.",
    highlights: ["Escova modelada", "Ondas e babyliss", "Finalização de cachos"],
    image: {
      src: "/images/service-escova.jpg",
      alt: "Cabeleireira finalizando escova com secador e escova redonda em cabelos castanhos longos e brilhantes",
      position: "50% 40%",
    },
  },
  {
    id: "unhas",
    number: "05",
    name: "Manicure & Nail Care",
    short: "Detalhe também é assinatura.",
    description:
      "Cuidado minucioso das cutículas ao acabamento. Esmaltação clássica, gel e nail art discreta para acompanhar o seu estilo.",
    highlights: ["Manicure & pedicure", "Esmaltação em gel", "Nail art"],
    image: {
      src: "/images/service-manicure.jpg",
      alt: "Mãos com unhas amendoadas em tom nude e glitter, sobre fundo marrom",
      position: "50% 45%",
    },
  },
  {
    id: "eventos",
    number: "06",
    name: "Produção para Eventos",
    short: "Para os dias que ficam na memória.",
    description:
      "Penteados e beleza para casamentos, ensaios e celebrações — com prova prévia, cronograma combinado e atendimento dedicado.",
    highlights: ["Penteados", "Noivas & madrinhas", "Prova de produção"],
    image: {
      src: "/images/service-eventos.jpg",
      alt: "Penteado preso de noiva, com coque baixo ondulado e rosas naturais",
      position: "50% 30%",
    },
  },
];
