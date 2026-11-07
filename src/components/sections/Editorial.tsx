"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useScrollContainer } from "@/lib/scrollContainer";
import { useRef } from "react";

const MARQUEE = ["Corte", "Cor", "Cuidado", "Essência", "Atelier"];

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, layoutEffect: false, target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);
  const words = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden border-y border-linho/10 py-6 sm:py-8">
      <motion.div style={{ x }} className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform sm:gap-12">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            <span
              className={
                i % 2 === 0
                  ? "display text-[clamp(3rem,9vw,8rem)] leading-none text-linho"
                  : "display text-outline text-[clamp(3rem,9vw,8rem)] italic leading-none text-bronze-300"
              }
            >
              {w}
            </span>
            <span className="h-2.5 w-2.5 rotate-45 bg-bronze-500" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, layoutEffect: false, target: ref, offset: ["start start", "end end"] });

  const clip = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(14% 12% 14% 12%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.6], reduce ? [1, 1] : [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.65], reduce ? ["0%", "0%"] : ["30%", "0%"]);
  const captionOpacity = useTransform(scrollYProgress, [0.5, 0.7], reduce ? [1, 1] : [0, 1]);

  return (
    <section aria-labelledby="editorial-title" className="relative bg-cacau-950 text-linho">
      <Marquee />

      <div ref={ref} className="relative h-[200svh] motion-reduce:h-auto">
        <div className="sticky top-0 flex h-screen-safe items-end overflow-hidden motion-reduce:relative">
          <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
            <motion.div className="absolute inset-0 will-change-transform" style={{ scale }}>
              <Image
                src="/images/editorial-desktop-hd.jpg"
                alt="Retrato em luz baixa de mulher de cabelos longos e castanho-acobreados sobre fundo marrom escuro"
                fill
                // Fundo escuro e liso: com a qualidade padrão (75) o AVIF borrava pele e fios.
                // 125vw cobre o zoom inicial de 1.25 da expansão.
                quality={90}
                sizes="125vw"
                className="hidden object-cover object-[50%_12%] landscape:block"
              />
              <Image
                src="/images/editorial-mobile.jpg"
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="object-cover object-[50%_35%] landscape:hidden"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-cacau-950/90 via-cacau-950/10 via-50% to-cacau-950/30" />
          </motion.div>

          <motion.p
            style={{ opacity: captionOpacity }}
            className="label absolute right-5 top-[calc(var(--header-h)+1.5rem)] text-linho/70 md:right-10 xl:right-14"
          >
            Campanha conceitual <span className="text-bronze-300">—</span> Coleção Essência
          </motion.p>

          <motion.div style={{ opacity: textOpacity, y: textY }} className="container-site relative pb-[max(3.5rem,var(--safe-bottom))] md:pb-20">
            <h2
              id="editorial-title"
              className="display max-w-[14ch] text-[clamp(2.6rem,10.5vw,4.25rem)] leading-[1.02] md:text-[clamp(4rem,7.4vw,8rem)]"
            >
              A beleza mais rara é aquela que <em className="italic text-bronze-300">não tenta ser outra.</em>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
