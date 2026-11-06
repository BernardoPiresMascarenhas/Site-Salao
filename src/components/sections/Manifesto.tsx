"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

type Token = string | { img: string; alt: string };

const STATEMENT: Token[] = [
  "Mais", "do", "que", "transformar", "cabelos,",
  { img: "/images/manifesto-detail.jpg", alt: "" },
  "criamos", "experiências", "que", "valorizam",
  { img: "/images/service-manicure.jpg", alt: "" },
  "quem", "você", "já", "é.",
];

const PRINCIPLES = [
  { title: "Escuta", text: "Entender antes de propor. A consulta é parte do serviço, não um formulário." },
  { title: "Técnica", text: "Precisão em cada linha, cada tom, cada acabamento." },
  { title: "Cuidado", text: "A saúde dos fios vem antes de qualquer tendência." },
];

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block indent-0">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.5"] });
  const total = STATEMENT.length;

  return (
    <section id="studio" aria-labelledby="manifesto-title" className="relative bg-linho py-24 text-cacau-900 sm:py-32 lg:py-44">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="01">Manifesto</SectionLabel>
          <p className="label hidden text-cacau-900/45 md:block">Studio · Filosofia</p>
        </div>

        <h2
          id="manifesto-title"
          ref={textRef}
          className="display relative mt-10 max-w-[18ch] text-[clamp(2.1rem,7.4vw,3.4rem)] leading-[1.08] sm:max-w-none md:mt-14 md:text-[clamp(3rem,6.2vw,6.1rem)] md:leading-[1.02] md:indent-[16%]"
        >
          {STATEMENT.map((token, i) => {
            const range: [number, number] = [i / total, Math.min(1, (i + 2) / total)];
            if (typeof token === "string") {
              const isAccent = token === "experiências";
              const content = isAccent ? <em className="italic text-bronze-600">{token}</em> : token;
              return (
                <span key={i}>
                  {reduce ? <span className="inline-block indent-0">{content}</span> : <Word progress={scrollYProgress} range={range}>{content}</Word>}{" "}
                </span>
              );
            }
            return (
              <span key={i}>
                <span
                  aria-hidden
                  className="relative mx-[0.04em] inline-block h-[0.72em] indent-0 w-[1.5em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline"
                >
                  <Image src={token.img} alt={token.alt} fill sizes="160px" className="object-cover" />
                </span>{" "}
              </span>
            );
          })}
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-y-14 md:mt-28 md:grid-cols-12 md:gap-x-8 lg:mt-36">
          <div className="relative md:col-span-6 lg:col-span-5">
            <ParallaxImage
              src="/images/manifesto-curls.jpg"
              alt="Retrato de mulher com cabelo crespo volumoso, ombro à mostra e camisa acetinada cor bronze"
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full"
              position="50% 20%"
              strength={7}
            />
            <p className="label mt-4 flex justify-between text-cacau-900/50">
              <span>Textura natural</span>
              <span>Fig. 01</span>
            </p>

            {/* Detalhe sobreposto — composição em camadas */}
            <Reveal
              delay={0.2}
              className="absolute -bottom-10 right-0 w-[42%] border-[6px] border-linho sm:w-[38%] md:-right-[22%] md:bottom-24 md:w-[44%] lg:-right-[30%]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/manifesto-detail.jpg"
                  alt="Mulher de costas com cabelos castanhos longos e ondulados em movimento"
                  fill
                  sizes="(min-width: 768px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="text-lg leading-relaxed text-cacau-900/80 md:text-[1.0625rem]">
                O AURÉ nasce da ideia de que um salão também pode ser um lugar de pausa. Um atelier onde técnica e
                sensibilidade caminham juntas — e onde o resultado é desenhado para a sua vida, não para uma tendência
                passageira.
              </p>
            </Reveal>

            <ol className="mt-12 border-t border-cacau-900/15">
              {PRINCIPLES.map((p, i) => (
                <Reveal as="li" key={p.title} delay={0.08 * i} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-cacau-900/15 py-6">
                  <span className="font-display text-sm italic text-bronze-600">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cacau-900/65">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
